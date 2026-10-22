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
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { transform } from "esbuild";
import { Window } from "happy-dom";

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
const SKIPPED = new Set(["node_modules", "dist", "scripts", ".git", ".claude", ".vercel", "package.json", "package-lock.json", "vercel.json", ".gitignore", ".DS_Store"]);
const SKIPPED_EXT = [".jsx", ".bak", ".md"];
// Garde : une page pré-rendue doit contenir un vrai texte, sinon le pré-rendu a échoué.
const MIN_WORDS = 120;
// Garde : l'adresse de l'application n'est donnée qu'aux clients (décision du 22/10/2026) ;
// les exports Claude Design peuvent réintroduire le lien « Se connecter » de la barre de navigation.
const FORBIDDEN = [/app\.vyzor\.fr/i, /Se connecter/];
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
function prerender(code, pagePath) {
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
  return { html, styles };
}

async function buildReactPage(file, html) {
  const dir = dirname(join(ROOT, file));
  const sources = [];
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

  const pagePath = "/" + file.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  const { html: rendered, styles } = prerender(code, pagePath);
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

const fontFaces = buildFonts();
const hashes = [];
const report = [];
for (const file of walk(ROOT)) {
  if (SKIPPED_EXT.some((ext) => file.endsWith(ext)) || EXCLUDED_PAGES.has(file)) continue;
  const target = join(DIST, file);
  mkdirSync(dirname(target), { recursive: true });
  if (!file.endsWith(".html")) { cpSync(join(ROOT, file), target); continue; }
  let html = readFileSync(join(ROOT, file), "utf8");
  if (html.includes('type="text/babel"')) {
    const page = await buildReactPage(file, html);
    html = page.html;
    report.push(`${file} : ${page.words} mots pré-rendus, ${page.kb} Ko de script`);
  } else {
    report.push(`${file} : HTML statique`);
  }
  html = useLocalFonts(html);
  hashes.push(...inlineScriptHashes(html));
  writeFileSync(target, html);
}
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
