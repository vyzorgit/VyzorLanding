// build.mjs — Construit le site publié dans dist/.
//
// Les sources restent les fichiers .html + .jsx exportés de Claude Design. Pour chaque page
// qui chargeait React + Babel depuis unpkg :
//   1. les scripts text/babel sont compilés (esbuild) et réunis en un seul fichier par page ;
//   2. la page est rendue une fois en HTML (React côté serveur, DOM simulé par happy-dom),
//      ce HTML est inséré dans #root et les styles injectés par les composants vont dans <head> ;
//   3. dans le navigateur, React « hydrate » ce HTML au lieu de reconstruire la page.
// Les pages déjà en HTML pur sont copiées telles quelles. Enfin, la CSP de vercel.json doit
// lister l'empreinte de chaque script intégré restant (mise à jour en local, erreur sur Vercel).

import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { transform } from "esbuild";
import { Window } from "happy-dom";
import { buildGuides } from "./guides.mjs";
import { PAGES, enFile } from "../i18n/routes.mjs";

const require = createRequire(import.meta.url);
const React = require("react");
const ReactDOM = require("react-dom");
const ReactDOMClient = require("react-dom/client");
const ReactDOMServer = require("react-dom/server");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE = "https://www.vyzor.fr";
const REACT_VERSION = React.version;

// Anciennes variantes : plus publiées, redirigées vers /fonctionnalites.html (vercel.json).
const EXCLUDED_PAGES = new Set(["fonctionnalites-v2.html", "fonctionnalites-orbital.html"]);
// Outil d'édition de Claude Design, inutile en production (réapparaît dans les exports).
const IGNORED_SCRIPTS = new Set(["tweaks-panel.jsx"]);
// Non publiés : sources, outillage, configuration.
const SKIPPED = new Set(["node_modules", "dist", "scripts", "content", "i18n", ".git", ".claude", ".vercel", "package.json", "package-lock.json", "vercel.json", ".gitignore", ".DS_Store"]);
const SKIPPED_EXT = [".jsx", ".bak", ".md"];
// Garde : une page pré-rendue doit contenir un vrai texte, sinon le pré-rendu a échoué.
const MIN_WORDS = 120;
// Garde : l'adresse de l'application n'est donnée qu'aux clients (décision du 22/10/2026) ;
// les exports Claude Design peuvent réintroduire le lien « Se connecter » de la barre de navigation.
const FORBIDDEN = [/app\.vyzor\.fr/i, /Se connecter/, /\b(Sign in|Log in)\b/i];
// Polices hébergées sur le site (Fontsource) à la place de Google Fonts : aucune adresse IP
// transmise à Google, une requête de moins. Seuls les jeux latin et latin étendu sont publiés.
const FONT_SOURCES = [
  ["@fontsource-variable/inter/wght.css", "Inter Variable", "Inter"],
  ["@fontsource-variable/hanken-grotesk/wght.css", "Hanken Grotesk Variable", "Hanken Grotesk"],
  ...["400", "500", "700"].map((w) => [`@fontsource/jetbrains-mono/${w}.css`]),
  ...["400", "500", "600", "700"].map((w) => [`@fontsource/ibm-plex-mono/${w}.css`]),
];
const FONTS_HEAD = [
  '<link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />',
  '<link rel="stylesheet" href="/fonts/fonts.css" />',
].join("\n  ");
const TEXT_EXT = [".html", ".js", ".css", ".txt", ".xml", ".json", ".webmanifest"];

const MOUNT_CALL = 'ReactDOM.createRoot(document.getElementById("root")).render(';
const CLIENT_PRELUDE = `window.__vzMount = function (el) {
  var root = document.getElementById("root");
  if (root.firstElementChild) ReactDOM.hydrateRoot(root, el);
  else ReactDOM.createRoot(root).render(el);
};\n`;

// —— Version anglaise (05/11/2026) : pages /en/ générées depuis les pages françaises (i18n/routes.mjs),
// textes traduits par le dictionnaire i18n/en/*.json (clé = texte français), voir i18n/runtime.js.
const I18N_RUNTIME = readFileSync(join(ROOT, "i18n/runtime.js"), "utf8");
const EN_DICT = {};
for (const name of readdirSync(join(ROOT, "i18n/en")).filter((n) => n.endsWith(".json")).sort()) {
  const part = JSON.parse(readFileSync(join(ROOT, "i18n/en", name), "utf8"));
  for (const [k, v] of Object.entries(part)) {
    const key = k.replace(/\s+/g, " ").trim();
    if (typeof v !== "string") throw new Error(`i18n/en/${name} : « ${k} » n'a pas une traduction texte`);
    if (EN_DICT[key] !== undefined && EN_DICT[key] !== v) throw new Error(`i18n/en/${name} : « ${key} » traduit deux fois différemment`);
    EN_DICT[key] = v;
  }
}
const ROUTES = Object.fromEntries(PAGES.map((p) => [p.path, p.en]));
const PAGE_BY_FR = Object.fromEntries(PAGES.map((p) => [p.fr, p]));
const missingEn = {};
const trEn = (s, page) => {
  const key = s.replace(/\s+/g, " ").trim();
  if (!/[A-Za-zÀ-ÿ]/.test(key)) return s;
  if (EN_DICT[key] === undefined) { (missingEn[page] = missingEn[page] || new Set()).add(key); return s; }
  return EN_DICT[key];
};
const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const unescAttr = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const hreflangLinks = (p) => [
  `<link rel="alternate" hreflang="fr-FR" href="${SITE}${p.path}" />`,
  `<link rel="alternate" hreflang="en" href="${SITE}${p.en}" />`,
  `<link rel="alternate" hreflang="x-default" href="${SITE}${p.path}" />`,
].join("\n  ");
function withHreflang(html, p) {
  html = html.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n?/g, "");
  return html.replace("</head>", `  ${hreflangLinks(p)}\n</head>`);
}
// Données structurées : textes traduits, langue « en » ; adresses, identifiants et types inchangés.
const LD_KEEP = new Set(["@context", "@type", "@id", "url", "logo", "email", "sameAs", "image", "priceCurrency", "price", "applicationCategory", "operatingSystem", "contentUrl", "thumbnailUrl", "uploadDate", "duration", "datePublished", "dateModified", "item"]);
function trJsonLd(node, page, key) {
  if (typeof node === "string") {
    if (key === "inLanguage") return "en";
    if (LD_KEEP.has(key) || /^(https?:|mailto:)/.test(node)) return node;
    return trEn(node, page);
  }
  if (Array.isArray(node)) return node.map((n) => trJsonLd(n, page, key));
  if (node && typeof node === "object") return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, trJsonLd(v, page, k)]));
  return node;
}
// Coquille HTML anglaise d'une page française : langue, métadonnées, adresses absolues, hreflang.
function makeEnShell(html, p) {
  const page = p.en;
  html = html.replace('<html lang="fr">', '<html lang="en">');
  html = html.replace(/<title>([\s\S]*?)<\/title>/, (_, t) => `<title>${escAttr(trEn(unescAttr(t), page))}</title>`);
  html = html.replace(/(<meta (?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description|og:image:alt)" content=")([^"]*)(")/g,
    (_, a, c, b) => a + escAttr(trEn(unescAttr(c), page)) + b);
  html = html.replace('content="fr_FR"', 'content="en_US"');
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE}${p.en}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${p.en}$2`);
  html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, a, json, b) =>
    a + "\n  " + JSON.stringify(trJsonLd(JSON.parse(json), page), null, 2).replace(/\n/g, "\n  ") + "\n  " + b);
  // Les pages anglaises sont dans /en/ : les ressources relatives deviennent absolues.
  html = html.replace(/(\s(?:href|src)=")(?!\/|https?:|#|mailto:|data:)([^"]+")/g, "$1/$2");
  html = html.replace(/(<a href="#contenu"[^>]*>)([^<]*)(<\/a>)/, (_, a, t, b) => a + trEn(t, page) + b);
  return withHreflang(html, p);
}

const sha = (s, alg = "sha256", enc = "base64") => createHash(alg).update(s).digest(enc);
const wordCount = (html) =>
  html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIPPED.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(relative(ROOT, p));
  }
  return out;
}

// Exécute le code compilé dans un DOM simulé à l'adresse de la page et renvoie le HTML rendu
// ainsi que les <style> que les composants ont ajoutés au <head> au chargement.
function prerender(code, pagePath, globals = {}) {
  const win = new Window({ url: SITE + pagePath, width: 1440, height: 900 });
  const doc = win.document;
  const headBefore = new Set(doc.head.children);
  let element = null;
  const ctx = {
    document: doc,
    location: win.location,
    navigator: win.navigator,
    matchMedia: (q) => win.matchMedia(q),
    getComputedStyle: (el) => win.getComputedStyle(el),
    scrollY: 0,
    innerWidth: 1440,
    innerHeight: 900,
    devicePixelRatio: 1,
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame() {},
    setTimeout, clearTimeout, setInterval, clearInterval,
    performance, console, URL, URLSearchParams,
    // useLayoutEffect ne s'exécute pas au pré-rendu : même comportement, sans l'avertissement de React.
    React: { ...React, useLayoutEffect: React.useEffect },
    ReactDOM: { ...ReactDOM, ...ReactDOMClient },
    __vzMount: (el) => { element = el; },
    ...globals,
  };
  ctx.window = ctx;
  ctx.self = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: pagePath });
  if (!element) throw new Error(`${pagePath} : aucun composant monté`);
  // React 18 échappe le texte des <style> (&quot;, &gt;…), que le navigateur lit pourtant tel quel :
  // CSS faux et écart à l'hydratation. On rétablit le texte brut (CSS des composants, sans </style>).
  const html = ReactDOMServer.renderToString(element).replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, css, close) =>
    open + css.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") + close);
  const styles = [...doc.head.children].filter((el) => !headBefore.has(el) && el.tagName === "STYLE").map((el) => el.outerHTML);
  win.close();
  return { html, styles, missing: Object.keys(ctx.__vzMissing || {}) };
}

async function buildReactPage(file, html, opts = {}) {
  const lang = opts.lang || "fr";
  const dir = opts.srcDir || dirname(join(ROOT, file));
  const pagePath = opts.pagePath || "/" + file.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  const pair = opts.pair;
  const preamble = [
    `window.VZ_LANG=${JSON.stringify(lang)};`,
    `window.VZ_FR_PATH=${JSON.stringify(pair ? pair.path : pagePath)};`,
    pair ? `window.VZ_ALT=${JSON.stringify(lang === "en" ? pair.path : pair.en)};` : "",
    lang === "en" ? `window.VZ_ROUTES=${JSON.stringify(ROUTES)};` : "",
  ].join("");
  const sources = [{ name: "i18n", code: preamble + "\n" + I18N_RUNTIME }];
  // Scripts exécutables intégrés (ex. window.VZ_FEATURE_SLUG) : ils s'exécutaient avant Babel.
  html = html.replace(/<script>([\s\S]*?)<\/script>\s*/g, (_, body) => { sources.push({ name: "inline", code: body }); return ""; });
  html = html.replace(/<script type="text\/babel"(?: src="([^"]+)")?>([\s\S]*?)<\/script>\s*/g, (_, src, body) => {
    if (src && IGNORED_SCRIPTS.has(src)) return "";
    sources.push({ name: src || "page", code: src ? readFileSync(join(dir, src), "utf8") : body, jsx: true });
    return "";
  });
  html = html.replace(/<script src="https:\/\/unpkg\.com\/[^"]+"[^>]*><\/script>\s*/g, "");

  const mounts = sources.filter((s) => s.code.includes(MOUNT_CALL)).length;
  if (mounts !== 1) throw new Error(`${file} : ${mounts} montage(s) React au lieu d'un`);
  const parts = [];
  for (const s of sources) {
    const code = s.code.replace(MOUNT_CALL, "__vzMount(");
    const out = s.jsx
      ? (await transform(code, { loader: "jsx", jsxFactory: "React.createElement", jsxFragment: "React.Fragment", target: "es2019", sourcefile: s.name })).code
      : code;
    parts.push(`// ${s.name}\n${out}`);
  }
  const code = parts.join("\n;\n");

  const { html: rendered, styles, missing } = prerender(code, pagePath, lang === "en" ? { VZ_DICT: EN_DICT } : {});
  for (const m of missing) (missingEn[pagePath] = missingEn[pagePath] || new Set()).add(m);
  if (!/<h1[\s>]/.test(rendered)) throw new Error(`${file} : pas de titre h1 dans le rendu`);
  const words = wordCount(rendered);
  if (words < MIN_WORDS) throw new Error(`${file} : ${words} mots rendus (minimum ${MIN_WORDS})`);

  const bundle = (await transform(CLIENT_PRELUDE + code, { minify: true, target: "es2019" })).code;
  const bundleName = `assets/${file.replace(/\.html$/, "").replace(/\//g, "-")}.${sha(bundle, "sha1", "hex").slice(0, 10)}.js`;
  mkdirSync(join(DIST, "assets"), { recursive: true });
  writeFileSync(join(DIST, bundleName), bundle);

  const head = [
    ...styles,
    "<noscript><style>.vz-reveal{opacity:1!important;transform:none!important;filter:none!important}</style></noscript>",
    `<script defer src="/vendor/react-${REACT_VERSION}.min.js"></script>`,
    `<script defer src="/vendor/react-dom-${REACT_VERSION}.min.js"></script>`,
    ...(lang === "en" ? [`<script defer src="/${EN_DICT_ASSET}"></script>`] : []),
    `<script defer src="/${bundleName}"></script>`,
  ].join("\n  ");
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>\s*/g, "");
  if (!html.includes('<div id="root"></div>')) throw new Error(`${file} : #root introuvable`);
  html = html.replace("</head>", `  ${head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  return { html, words, kb: Math.round(Buffer.byteLength(bundle) / 1024) };
}

// Écrit dist/fonts/fonts.css et ses fichiers woff2 à partir des feuilles Fontsource.
function buildFonts() {
  mkdirSync(join(DIST, "fonts"), { recursive: true });
  const blocks = [];
  for (const [css, from, to] of FONT_SOURCES) {
    const file = join(ROOT, "node_modules", css);
    for (const block of readFileSync(file, "utf8").match(/\/\* [^*]+ \*\/\s*@font-face \{[^}]+\}/g)) {
      if (!/-latin(-ext)?-/.test(block.split("*/")[0])) continue;
      let out = block.replace(/,\s*url\([^)]+\.woff\) format\('woff'\)/, "");
      if (from) out = out.replaceAll(`'${from}'`, `'${to}'`);
      out = out.replace(/url\(\.\/files\/([^)]+\.woff2)\)/, (_, name) => {
        cpSync(join(dirname(file), "files", name), join(DIST, "fonts", name));
        return `url(/fonts/${name})`;
      });
      blocks.push(out);
    }
  }
  writeFileSync(join(DIST, "fonts", "fonts.css"), blocks.join("\n\n") + "\n");
  return blocks.length;
}

// Remplace les liens Google Fonts d'une page (exports Claude Design) par les polices du site.
function useLocalFonts(html) {
  const before = html;
  html = html
    .replace(/[ \t]*<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\n?/g, "")
    .replace(/[ \t]*<link[^>]+href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*>\n?/g, "")
    .replace(/[ \t]*@import url\(['"]?https:\/\/fonts\.googleapis\.com\/[^)]*\);?\n?/g, "");
  if (html === before) return html;
  return html.replace("</title>", `</title>\n  ${FONTS_HEAD}`);
}

// Empreintes CSP des scripts exécutables intégrés (les blocs ld+json ne s'exécutent pas).
function inlineScriptHashes(html) {
  return [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => `'sha256-${sha(m[1])}'`);
}

function syncCsp(hashes) {
  const file = join(ROOT, "vercel.json");
  const config = JSON.parse(readFileSync(file, "utf8"));
  const header = config.headers.flatMap((h) => h.headers).find((h) => h.key === "Content-Security-Policy");
  const wanted = ["'self'", ...[...new Set(hashes)].sort()].join(" ");
  const current = header.value.match(/script-src ([^;]*)/)[1];
  if (current === wanted) return false;
  if (process.env.VERCEL) throw new Error("vercel.json : script-src n'a pas les empreintes à jour, lancer npm run build en local");
  header.value = header.value.replace(/script-src [^;]*/, `script-src ${wanted}`);
  writeFileSync(file, JSON.stringify(config, null, 2) + "\n");
  return true;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, "vendor"), { recursive: true });
cpSync(join(ROOT, "node_modules/react/umd/react.production.min.js"), join(DIST, `vendor/react-${REACT_VERSION}.min.js`));
cpSync(join(ROOT, "node_modules/react-dom/umd/react-dom.production.min.js"), join(DIST, `vendor/react-dom-${REACT_VERSION}.min.js`));

const enDictCode = `window.VZ_DICT=${JSON.stringify(EN_DICT)};`;
const EN_DICT_ASSET = `assets/i18n-en.${sha(enDictCode, "sha1", "hex").slice(0, 10)}.js`;
mkdirSync(join(DIST, "assets"), { recursive: true });
writeFileSync(join(DIST, EN_DICT_ASSET), enDictCode);

const fontFaces = buildFonts();
const hashes = [];
const report = [];
for (const file of walk(ROOT)) {
  if (SKIPPED_EXT.some((ext) => file.endsWith(ext)) || EXCLUDED_PAGES.has(file)) continue;
  const target = join(DIST, file);
  mkdirSync(dirname(target), { recursive: true });
  if (!file.endsWith(".html")) { cpSync(join(ROOT, file), target); continue; }
  let html = readFileSync(join(ROOT, file), "utf8");
  const pair = PAGE_BY_FR[file];
  const source = html;
  if (pair) html = withHreflang(html, pair);
  if (html.includes('type="text/babel"')) {
    const page = await buildReactPage(file, html, { pair });
    html = page.html;
    report.push(`${file} : ${page.words} mots pré-rendus, ${page.kb} Ko de script`);
  } else {
    report.push(`${file} : HTML statique`);
  }
  html = useLocalFonts(html);
  hashes.push(...inlineScriptHashes(html));
  writeFileSync(target, html);

  if (!pair) continue;
  const enName = enFile(pair.en);
  const en = await buildReactPage(enName, makeEnShell(source, pair), { lang: "en", pair, pagePath: pair.en, srcDir: ROOT });
  const enHtml = useLocalFonts(en.html);
  hashes.push(...inlineScriptHashes(enHtml));
  mkdirSync(dirname(join(DIST, enName)), { recursive: true });
  writeFileSync(join(DIST, enName), enHtml);
  report.push(`${enName} : ${en.words} words pre-rendered, ${en.kb} Ko de script`);
}
if (PAGES.length !== PAGES.filter((p) => existsSync(join(DIST, enFile(p.en)))).length) throw new Error("i18n/routes.mjs : page anglaise non construite");

// Plan du site : alternative anglaise sur chaque page traduite, puis les adresses anglaises.
{
  const file = join(DIST, "sitemap.xml");
  let xml = readFileSync(file, "utf8");
  const enUrls = [];
  for (const p of PAGES) {
    const loc = `<loc>${SITE}${p.path}</loc>`;
    const block = xml.match(new RegExp(`<url>\\s*${loc.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}[\\s\\S]*?</url>`));
    const alts = `<xhtml:link rel="alternate" hreflang="fr-FR" href="${SITE}${p.path}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${p.en}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p.path}" />`;
    let meta = "";
    if (block) {
      const updated = block[0].replace(/\s*<xhtml:link[^>]*\/>/g, "").replace("</url>", `  ${alts}\n  </url>`);
      xml = xml.replace(block[0], updated);
      meta = (block[0].match(/<lastmod>[\s\S]*?<priority>[^<]*<\/priority>/) || [""])[0];
    }
    enUrls.push(`  <url>\n    <loc>${SITE}${p.en}</loc>\n    ${meta}${meta ? "\n    " : ""}${alts}\n  </url>`);
  }
  xml = xml.replace("</urlset>", `\n${enUrls.join("\n\n")}\n\n</urlset>`);
  writeFileSync(file, xml);
}

// Garde : aucune page anglaise ne doit garder un texte français non traduit au pré-rendu.
const missingCount = Object.values(missingEn).reduce((n, s) => n + s.size, 0);
if (process.env.VZ_I18N_HARVEST) {
  writeFileSync(process.env.VZ_I18N_HARVEST, JSON.stringify(Object.fromEntries(Object.entries(missingEn).map(([k, s]) => [k, [...s]])), null, 2));
} else if (missingCount) {
  const lines = Object.entries(missingEn).map(([k, s]) => `${k} : ${[...s].slice(0, 5).map((x) => `« ${x.slice(0, 60)} »`).join(", ")}${s.size > 5 ? ` (+${s.size - 5})` : ""}`);
  throw new Error(`Textes sans traduction anglaise (i18n/en/*.json) : ${missingCount}\n  ${lines.join("\n  ")}`);
}
const guides = buildGuides(ROOT, DIST);
report.push(...guides.report);
const leaks = [];
for (const file of walk(DIST)) {
  if (!TEXT_EXT.some((ext) => file.endsWith(ext)) || file.includes("/vendor/")) continue;
  const text = readFileSync(join(ROOT, file), "utf8");
  for (const re of FORBIDDEN) if (re.test(text)) leaks.push(`${relative("dist", file)} (${re.source})`);
  if (/fonts\.(googleapis|gstatic)\.com/.test(text)) throw new Error(`${relative("dist", file)} : police encore chargée depuis Google Fonts`);
}
if (leaks.length) throw new Error(`Lien vers l'application publié sur le site, à retirer :\n  ${leaks.join("\n  ")}`);

const cspChanged = syncCsp(hashes);
console.log(report.join("\n"));
console.log(`polices : ${fontFaces} @font-face hébergées sur le site`);
console.log(cspChanged ? "vercel.json : empreintes CSP mises à jour" : "vercel.json : CSP à jour");
