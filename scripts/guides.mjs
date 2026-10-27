// guides.mjs — Construit la rubrique Guides (SEO + visibilité dans les IA) à partir de content/guides/*.md.
//
// Un guide = un fichier Markdown avec un en-tête YAML (voir content/guides/README.md pour le format).
// Produit dist/guides.html (sommaire) et dist/guides/<slug>.html, au thème des calculateurs
// (styles repris de calculateurs.html), avec données structurées Article, FAQPage et BreadcrumbList,
// puis ajoute les guides à dist/sitemap.xml et dist/llms.txt. Aucun script intégré : la CSP ne change pas.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";

const SITE = "https://www.vyzor.fr";
const MIN_WORDS = 700;

export const TOOLS = {
  bfr: { href: "/calculateurs/bfr", name: "Simulateur de BFR", pitch: "Calculez votre besoin en fonds de roulement à partir de vos délais clients, fournisseurs et stocks, et voyez combien de trésorerie vous libérez en les réduisant.", cta: "Simuler mon BFR" },
  breakeven: { href: "/calculateurs/breakeven", name: "Calculateur de seuil de rentabilité", pitch: "Trouvez en 30 secondes le chiffre d'affaires qui couvre tous vos coûts, et votre marge de sécurité.", cta: "Calculer mon point mort" },
  fiscal: { href: "/calculateurs/fiscal", name: "Simulateur fiscal", pitch: "Comparez l'impôt et les cotisations selon le statut : SAS, SARL, EURL, micro-entreprise. Barèmes 2026.", cta: "Comparer les statuts" },
  reporting: { href: "/calculateurs/reporting", name: "Coût du reporting manuel", pitch: "Mesurez les heures et l'argent que vous coûtent vos tableaux de bord faits à la main.", cta: "Calculer le coût caché" },
  valorisation: { href: "/calculateurs/valorisation", name: "Valorisation d'entreprise", pitch: "Estimez la valeur de votre société selon 4 méthodes croisées : multiples de CA et d'EBITDA, DCF, patrimoniale.", cta: "Estimer ma valorisation" },
};

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const frDate = (d) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
const words = (html) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const slugify = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parse(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file} : en-tête YAML manquant`);
  const meta = yaml.load(m[1]);
  for (const k of ["title", "seo_title", "description", "slug", "date", "category", "essentiel", "faq", "sources"]) {
    if (!meta[k] || (Array.isArray(meta[k]) && !meta[k].length)) throw new Error(`${file} : champ « ${k} » manquant`);
  }
  if (!/^[a-z0-9-]+$/.test(meta.slug)) throw new Error(`${file} : slug invalide`);
  if (meta.tool && !TOOLS[meta.tool]) throw new Error(`${file} : outil inconnu « ${meta.tool} »`);
  if (meta.description.length > 160) throw new Error(`${file} : description de ${meta.description.length} caractères (160 max)`);
  if (meta.seo_title.length > 62) throw new Error(`${file} : seo_title de ${meta.seo_title.length} caractères (62 max, « — Vyzor » ajouté)`);
  meta.date = String(meta.date instanceof Date ? meta.date.toISOString().slice(0, 10) : meta.date);
  meta.updated = meta.updated ? String(meta.updated instanceof Date ? meta.updated.toISOString().slice(0, 10) : meta.updated) : meta.date;
  // Titres h2 avec ancres (sommaire), tableaux enveloppés pour le défilement sur mobile.
  const toc = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = slugify(text.replace(/<[^>]+>/g, ""));
    if (depth === 2) toc.push({ id, text });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  const table = renderer.table.bind(renderer);
  renderer.table = (t) => `<div class="tbl">${table(t)}</div>`;
  const link = renderer.link.bind(renderer);
  renderer.link = (t) => {
    const out = link(t);
    return /^https?:\/\//.test(t.href) && !t.href.startsWith(SITE) ? out.replace("<a ", '<a rel="noopener" target="_blank" ') : out;
  };
  const body = marked.parse(m[2], { renderer, gfm: true });
  if (/<h1[\s>]/.test(body)) throw new Error(`${file} : pas de titre h1 dans le corps (le titre vient de l'en-tête)`);
  const n = words(body);
  if (n < MIN_WORDS) throw new Error(`${file} : ${n} mots (minimum ${MIN_WORDS})`);
  return { ...meta, body, toc, words: n, minutes: Math.max(3, Math.round(n / 220)) };
}

function shell({ css, mark }, { title, description, canonical, ogType, jsonld, body }) {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/svg+xml" href="/vyzor-mark.svg" />
  <meta name="theme-color" content="#070a14" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="fr-FR" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${canonical}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="VYZOR" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${SITE}/og-image.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/fonts/fonts.css" />
  <link rel="stylesheet" href="/responsive.css" />
  <style>${css}${GUIDE_CSS}</style>
  ${jsonld.map(ld).join("\n  ")}
  <script defer src="/js/subscribe.js"></script>
</head>
<body>
  <a href="#contenu" class="vz-skip">Aller au contenu</a>
  <div class="ambient"><div class="blob3"></div></div>
  <div class="grain"></div>
  <nav class="nav calc-nav-pill" aria-label="Navigation principale">
    <a class="nav-brand" href="/">${mark}<div class="nav-name">VYZOR</div></a>
    <span class="nav-sep calc-nav-links"></span>
    <a class="nav-link calc-nav-links" href="/#produit">Le produit</a>
    <a class="nav-link calc-nav-links" href="/fonctionnalites">Fonctionnalités</a>
    <a class="nav-link calc-nav-links" href="/calculateurs">Calculateurs</a>
    <a class="nav-link active calc-nav-links" href="/guides">Guides</a>
    <span class="nav-sep calc-nav-links"></span>
    <a class="nav-cta" href="/?contact=1#beta" data-contact>Rejoindre la bêta</a>
  </nav>
  <div class="shell calc-shell">
    <main id="contenu" tabindex="-1">
${body}
    </main>
    <footer class="gfoot">
      <div class="gfoot-cols">
        <div><div class="gfoot-h">Outils gratuits</div>${Object.values(TOOLS).map((t) => `<a href="${t.href}">${esc(t.name)}</a>`).join("")}</div>
        <div><div class="gfoot-h">Vyzor</div><a href="/">Accueil</a><a href="/fonctionnalites">Fonctionnalités</a><a href="/guides">Guides</a><a href="/faq">FAQ</a><a href="/a-propos">À propos</a><a href="/securite">Sécurité</a></div>
        <div><div class="gfoot-h">Légal</div><a href="/mentions-legales">Mentions légales</a><a href="/confidentialite">Confidentialité</a><a href="mailto:contact@vyzor.fr">contact@vyzor.fr</a></div>
      </div>
      <div class="gfoot-b">© ${new Date().getFullYear()} Vyzor — pilotage financier des PME</div>
    </footer>
  </div>
</body>
</html>
`;
}

const subscribeForm = (source) => `
      <section class="sub" aria-labelledby="sub-h">
        <div class="eyebrow">Guides Vyzor</div>
        <h2 id="sub-h">Recevez les prochains guides</h2>
        <p>Un guide pratique de pilotage financier, écrit pour les dirigeants de PME. Pas de spam ; un email à contact@vyzor.fr suffit pour ne plus rien recevoir.</p>
        <form data-vz-subscribe="${esc(source)}" novalidate>
          <label for="sub-email" class="sr">Votre email professionnel</label>
          <input id="sub-email" type="email" name="email" required autocomplete="email" placeholder="vous@entreprise.fr" />
          <input type="checkbox" name="botcheck" class="sr" tabindex="-1" aria-hidden="true" />
          <button type="submit">Recevoir les guides</button>
          <p class="sub-msg" data-vz-msg role="status"></p>
        </form>
        <p class="sub-legal">Votre adresse sert uniquement à vous écrire au sujet de Vyzor. <a href="/confidentialite">Confidentialité</a></p>
      </section>`;

const toolCard = (key) => {
  const t = TOOLS[key];
  return `
      <aside class="tool" aria-label="Outil gratuit">
        <div class="eyebrow">Outil gratuit</div>
        <div class="tool-t">${esc(t.name)}</div>
        <p>${esc(t.pitch)}</p>
        <a class="tool-cta" href="${t.href}">${esc(t.cta)} →</a>
      </aside>`;
};

function articlePage(theme, g, all) {
  const url = `${SITE}/guides/${g.slug}`;
  const related = all.filter((o) => o.slug !== g.slug).sort((a, b) => (b.category === g.category) - (a.category === g.category) || b.date.localeCompare(a.date)).slice(0, 3);
  // Encart outil placé avant la 3e section (ou en fin d'article si l'article est court en sections).
  let body = g.body;
  if (g.tool) {
    const h2s = [...body.matchAll(/<h2 /g)];
    const at = h2s[2]?.index ?? h2s[1]?.index;
    body = at ? body.slice(0, at) + toolCard(g.tool) + "\n" + body.slice(at) : body + toolCard(g.tool);
  }
  const jsonld = [
    {
      "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description,
      datePublished: g.date, dateModified: g.updated, inLanguage: "fr-FR", mainEntityOfPage: url, url,
      image: `${SITE}/og-image.png`, articleSection: g.category, keywords: g.keyword || undefined, wordCount: g.words,
      author: { "@type": "Organization", name: "Vyzor", url: SITE + "/a-propos" },
      publisher: { "@type": "Organization", name: "Vyzor", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` } },
      citation: g.sources.map((s) => s.url),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: SITE + "/guides" },
      { "@type": "ListItem", position: 3, name: g.title, item: url },
    ] },
  ];
  const html = `
      <article class="guide">
        <header>
          <nav class="crumb" aria-label="Fil d'Ariane"><a href="/">Accueil</a> / <a href="/guides">Guides</a> / <b>${esc(g.category)}</b></nav>
          <h1>${esc(g.title)}</h1>
          <p class="lede">${esc(g.description)}</p>
          <p class="meta">Par l'équipe Vyzor · <time datetime="${g.updated}">${g.updated !== g.date ? "Mis à jour le " : ""}${frDate(g.updated)}</time> · ${g.minutes} min de lecture</p>
        </header>
        <section class="essentiel" aria-label="L'essentiel">
          <div class="essentiel-h">L'essentiel</div>
          <ul>${g.essentiel.map((e) => `<li>${marked.parseInline(e)}</li>`).join("")}</ul>
        </section>
        ${g.toc.length >= 3 ? `<nav class="toc" aria-label="Sommaire"><div class="toc-h">Sommaire</div><ol>${g.toc.map((t) => `<li><a href="#${t.id}">${t.text}</a></li>`).join("")}</ol></nav>` : ""}
        <div class="prose">
${body}
        </div>
        <section class="faq" aria-labelledby="faq-h">
          <h2 id="faq-h">Questions fréquentes</h2>
          ${g.faq.map((f) => `<details><summary>${esc(f.q)}</summary><div>${marked.parseInline(f.a)}</div></details>`).join("\n          ")}
        </section>
        <section class="sources" aria-labelledby="src-h">
          <h2 id="src-h">Sources</h2>
          <ol>${g.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a></li>`).join("")}</ol>
          <p class="disclaimer">Contenu informatif, à jour à la date indiquée ; il ne remplace pas l'avis de votre expert-comptable ou de votre avocat.</p>
        </section>
      </article>
${subscribeForm("guide/" + g.slug)}
      ${related.length ? `<section class="related" aria-labelledby="rel-h"><h2 id="rel-h">À lire aussi</h2><div class="ggrid">${related.map(cardHtml).join("")}</div></section>` : ""}`;
  return shell(theme, { title: `${g.seo_title} — Vyzor`, description: g.description, canonical: url, ogType: "article", jsonld, body: html });
}

const cardHtml = (g) => `
          <a class="card gcard" href="/guides/${g.slug}">
            <div class="gcard-cat">${esc(g.category)}</div>
            <h3 class="card-title">${esc(g.title)}</h3>
            <p class="card-desc">${esc(g.description)}</p>
            <span class="card-cta">Lire le guide · ${g.minutes} min</span>
          </a>`;

function indexPage(theme, all) {
  const url = `${SITE}/guides`;
  const cats = [...new Set(all.map((g) => g.category))];
  const jsonld = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Guides du pilotage financier", url, inLanguage: "fr-FR", description: "Guides pratiques de pilotage financier pour dirigeants de PME : trésorerie, BFR, rentabilité, fiscalité, lecture des comptes.",
      hasPart: all.map((g) => ({ "@type": "Article", headline: g.title, url: `${SITE}/guides/${g.slug}`, datePublished: g.date })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: url },
    ] },
  ];
  const body = `
      <nav class="crumb" aria-label="Fil d'Ariane"><a href="/">Accueil</a> / <b>Guides</b></nav>
      <h1>Guides du <em>pilotage financier</em></h1>
      <p class="lede">Trésorerie, BFR, rentabilité, fiscalité, lecture des comptes : des guides concrets pour dirigeants de PME, avec des exemples chiffrés, des sources officielles et un outil gratuit pour passer à vos propres chiffres.</p>
      ${cats.map((c) => `<section class="gcat" aria-labelledby="cat-${slugify(c)}"><h2 id="cat-${slugify(c)}">${esc(c)}</h2><div class="ggrid">${all.filter((g) => g.category === c).map(cardHtml).join("")}</div></section>`).join("\n")}
${subscribeForm("guides")}`;
  return shell(theme, { title: "Guides du pilotage financier pour dirigeants de PME — Vyzor", description: "Guides pratiques pour piloter une PME : trésorerie, BFR, seuil de rentabilité, fiscalité, lecture du bilan. Exemples chiffrés et outils gratuits.", canonical: url, ogType: "website", jsonld, body });
}

const GUIDE_CSS = `
    .vz-skip{position:absolute;left:-9999px;top:8px;z-index:100000;padding:10px 16px;background:#0a0a0a;color:#f0c949;border:2px solid #f0c949;border-radius:8px;font:600 14px Inter,system-ui,sans-serif}
    .vz-skip:focus{left:12px}
    .sr{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}
    main{outline:none}
    .nav-cta{white-space:nowrap}
    .crumb a{color:rgba(255,255,255,0.55)} .crumb a:hover{color:var(--brand-gold)}
    .guide{max-width:760px;margin:0 auto}
    .guide h1{font-size:clamp(34px,5vw,56px);line-height:1.06}
    .guide .lede{margin-bottom:16px;font-size:19px}
    .meta{font-size:13px;color:rgba(255,255,255,0.45);margin:0 0 36px}
    .essentiel,.toc,.tool,.sub{position:relative;border-radius:20px;border:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 30%,rgba(0,0,0,0.20) 100%),rgba(15,15,18,0.55);backdrop-filter:blur(24px) saturate(170%);-webkit-backdrop-filter:blur(24px) saturate(170%);box-shadow:0 18px 56px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.10)}
    .essentiel{padding:24px 28px;margin:0 0 24px;border-color:rgba(197,160,89,0.28)}
    .essentiel-h,.toc-h{font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:var(--brand-gold);font-weight:600;margin-bottom:12px}
    .essentiel ul{margin:0;padding-left:20px;color:var(--text-secondary);line-height:1.65;font-size:15.5px} .essentiel li{margin:6px 0}
    .toc{padding:20px 28px;margin:0 0 40px} .toc ol{margin:0;padding-left:20px;line-height:1.9;font-size:14.5px} .toc a{color:rgba(255,255,255,0.7)} .toc a:hover{color:var(--brand-gold)}
    .prose{font-size:17px;line-height:1.75;color:rgba(255,255,255,0.78)}
    .prose h2,.faq h2,.sources h2,.related h2,.gcat h2{font-size:clamp(24px,3vw,30px);line-height:1.2;letter-spacing:-0.02em;color:#fff;font-weight:600;margin:56px 0 16px;scroll-margin-top:110px}
    .prose h3{font-size:20px;color:#fff;font-weight:600;margin:36px 0 10px;scroll-margin-top:110px}
    .prose p{margin:0 0 18px} .prose strong{color:#fff;font-weight:600}
    .prose a,.faq a,.essentiel a{color:#f3dca5;text-decoration:underline;text-decoration-color:rgba(197,160,89,0.45);text-underline-offset:3px} .prose a:hover{color:var(--brand-gold)}
    .prose ul,.prose ol{padding-left:22px;margin:0 0 18px} .prose li{margin:6px 0}
    .prose blockquote{margin:24px 0;padding:16px 22px;border-left:3px solid var(--brand-gold);background:rgba(197,160,89,0.07);border-radius:0 14px 14px 0;color:rgba(255,255,255,0.85)}
    .prose blockquote p{margin:0}
    .prose code{font-family:'JetBrains Mono',monospace;font-size:0.88em;background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:6px}
    .tbl{overflow-x:auto;margin:24px 0;border:1px solid rgba(255,255,255,0.08);border-radius:14px}
    .prose table{border-collapse:collapse;width:100%;font-size:15px;min-width:480px}
    .prose th,.prose td{padding:11px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.06);vertical-align:top}
    .prose th{color:#fff;font-weight:600;background:rgba(255,255,255,0.03)} .prose tr:last-child td{border-bottom:0}
    .tool{margin:40px 0;padding:28px;border-color:rgba(197,160,89,0.32)}
    .tool .eyebrow,.sub .eyebrow{margin-bottom:10px}
    .tool-t{font-size:22px;font-weight:600;color:#fff;margin-bottom:8px} .tool p{margin:0 0 18px;font-size:15px;color:rgba(255,255,255,0.65)}
    .tool-cta,.sub button{display:inline-block;padding:12px 20px;border-radius:12px;font-weight:700;font-size:14.5px;color:#000;background:linear-gradient(135deg,var(--brand-gold) 0%,var(--brand-gold-dark) 100%);border:1px solid rgba(255,255,255,0.30);box-shadow:0 10px 32px rgba(197,160,89,0.30),inset 0 1px 0 rgba(255,255,255,0.45);cursor:pointer;font-family:inherit;text-decoration:none!important}
    .faq{margin-top:16px} .faq details{border-bottom:1px solid rgba(255,255,255,0.08);padding:16px 0}
    .faq summary{cursor:pointer;color:#fff;font-weight:600;font-size:16.5px;list-style:none;display:flex;justify-content:space-between;gap:16px}
    .faq summary::-webkit-details-marker{display:none} .faq summary::after{content:"+";color:var(--brand-gold);font-weight:400;font-size:20px;line-height:1} .faq details[open] summary::after{content:"–"}
    .faq details>div{margin-top:10px;color:rgba(255,255,255,0.72);line-height:1.7;font-size:15.5px}
    .sources ol{padding-left:20px;font-size:14px;line-height:1.8;color:rgba(255,255,255,0.6)} .sources a{color:rgba(255,255,255,0.7);text-decoration:underline;text-decoration-color:rgba(255,255,255,0.25)}
    .disclaimer{font-size:12.5px;color:rgba(255,255,255,0.4);margin-top:18px}
    .sub{max-width:760px;margin:64px auto 0;padding:32px}
    .sub h2{font-size:26px;color:#fff;margin:0 0 10px;font-weight:600} .sub>p{color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;margin:0 0 20px}
    .sub form{display:flex;flex-wrap:wrap;gap:10px} .sub input[type=email]{flex:1 1 240px;padding:13px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.4);border-radius:12px;color:#fff;font-size:15px;font-family:inherit}
    .sub input[type=email]:focus{outline:2px solid var(--brand-gold);outline-offset:1px}
    .sub-msg{flex-basis:100%;margin:4px 0 0;font-size:14px;color:#f3dca5;min-height:20px}
    .sub form.is-done input,.sub form.is-done button{display:none}
    .sub-legal{font-size:12px;color:rgba(255,255,255,0.4);margin:12px 0 0} .sub-legal a{color:rgba(255,255,255,0.5);text-decoration:underline}
    .related,.gcat{margin-top:24px}
    .ggrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px} @media (max-width:980px){.ggrid{grid-template-columns:repeat(2,1fr)}} @media (max-width:640px){.ggrid{grid-template-columns:1fr}}
    .gcard{min-height:0;padding:26px} .gcard .card-title{font-size:19px;line-height:1.3}
    .gcard-cat{font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:var(--brand-gold);margin-bottom:12px;position:relative;z-index:1}
    .gfoot{margin-top:96px;padding-top:36px;border-top:1px solid var(--border-subtle);font-size:13.5px}
    .gfoot-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px} @media (max-width:640px){.gfoot-cols{grid-template-columns:1fr}}
    .gfoot-cols a{display:block;color:rgba(255,255,255,0.55);padding:5px 0} .gfoot-cols a:hover{color:var(--brand-gold)}
    .gfoot-h{color:#fff;font-weight:600;margin-bottom:8px}
    .gfoot-b{margin-top:28px;color:rgba(255,255,255,0.4);font-size:12.5px}

    /* —— Thème actuel de la landing (fond bleu nuit #070a14, or #f0c949) : prime sur les styles hérités —— */
    :root{--bg-base:#070a14;--bg-surface:#0c1020;--brand-gold:#f0c949;--brand-gold-dark:#c89a2f;--brand-gold-soft:rgba(240,201,73,0.16);--border-subtle:rgba(255,255,255,0.08)}
    html,body{background:#070a14}
    body{color:rgba(255,255,255,0.92)}
    ::selection{background:rgba(240,201,73,0.35);color:#fff}
    .ambient,.grain{display:none}
    .nav{background:rgba(15,17,21,0.55);border:1px solid rgba(255,255,255,0.10);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);box-shadow:0 8px 30px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.05)}
    .nav-link{color:rgba(255,255,255,0.55)}
    .nav-link.active{color:#f0c949;background:rgba(240,201,73,0.10);border-color:rgba(240,201,73,0.30)}
    .nav-cta,.tool-cta,.sub button{background:#f0c949;background-image:linear-gradient(#f0c949,#f0c949);color:#111;font-weight:600;border:0;box-shadow:0 1px 2px rgba(0,0,0,0.3)}
    .nav-cta:hover,.tool-cta:hover,.sub button:hover{transform:translateY(-1px)}
    .eyebrow,.crumb b,.gcard-cat,.essentiel-h,.toc-h{color:#f0c949}
    h1 em{background:linear-gradient(135deg,#f6dfa1 0%,#f0c949 50%,#c89a2f 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
    .card,.essentiel,.toc,.tool,.sub{border-radius:16px;border:1px solid rgba(255,255,255,0.08);background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015));backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);box-shadow:0 1px 2px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.05)}
    .card::before{background:linear-gradient(180deg,rgba(255,255,255,0.06),transparent 45%);opacity:0.7;mix-blend-mode:normal}
    .card::after{background:radial-gradient(320px circle at var(--mx,50%) var(--my,0%),rgba(240,201,73,0.10),transparent 60%)}
    .card:hover{border-color:rgba(240,201,73,0.42);background:linear-gradient(160deg,rgba(240,201,73,0.06),rgba(240,201,73,0.015));box-shadow:0 1px 2px rgba(0,0,0,0.3),0 0 0 1px rgba(240,201,73,0.10) inset}
    .card-cta{color:#f0c949}
    .essentiel,.tool{border-color:rgba(240,201,73,0.32)}
    .prose a,.faq a,.essentiel a,.sub-msg{color:#f6dfa1;text-decoration-color:rgba(240,201,73,0.45)}
    .prose a:hover,.toc a:hover,.gfoot-cols a:hover,.crumb a:hover{color:#f0c949}
    .prose blockquote{border-left-color:#f0c949;background:rgba(240,201,73,0.06)}
    .faq summary::after{color:#f0c949}
    .sub input[type=email]{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.4)}
    .sub input[type=email]:focus{outline-color:#f0c949}
    @media (max-width:640px){.guide .lede{font-size:17px}.prose{font-size:16px}.essentiel,.toc,.tool,.sub{padding:22px 20px}.guide h1{font-size:32px}}
`;

export function buildGuides(ROOT, DIST) {
  const dir = join(ROOT, "content", "guides");
  if (!existsSync(dir)) return { count: 0, report: [] };
  const all = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md").map((f) => parse(join(dir, f)));
  const today = new Date().toISOString().slice(0, 10);
  const live = all.filter((g) => g.date <= today).sort((a, b) => b.date.localeCompare(a.date));
  const seen = new Set();
  for (const g of live) { if (seen.has(g.slug)) throw new Error(`guides : slug en double « ${g.slug} »`); seen.add(g.slug); }
  if (!live.length) return { count: 0, report: [] };

  const hub = readFileSync(join(ROOT, "calculateurs.html"), "utf8");
  const css = hub.match(/<style>([\s\S]*?)<\/style>/)[1];
  const mark = hub.match(/<svg class="nav-mark"[\s\S]*?<\/svg>/)[0];
  const theme = { css, mark };

  mkdirSync(join(DIST, "guides"), { recursive: true });
  for (const g of live) writeFileSync(join(DIST, "guides", `${g.slug}.html`), articlePage(theme, g, live));
  writeFileSync(join(DIST, "guides.html"), indexPage(theme, live));

  // Sitemap et llms.txt publiés : les guides y sont ajoutés (les sources restent inchangées).
  const sm = join(DIST, "sitemap.xml");
  const urls = [{ loc: `${SITE}/guides`, lastmod: live[0].updated }, ...live.map((g) => ({ loc: `${SITE}/guides/${g.slug}`, lastmod: g.updated }))];
  writeFileSync(sm, readFileSync(sm, "utf8").replace("</urlset>", urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>\n`).join("") + "</urlset>"));
  const llms = join(DIST, "llms.txt");
  const section = `\n## Guides du pilotage financier\n\n- [Guides (sommaire)](${SITE}/guides): guides pratiques pour dirigeants de PME, avec exemples chiffrés et sources officielles.\n${live.map((g) => `- [${g.title}](${SITE}/guides/${g.slug}): ${g.description}`).join("\n")}\n`;
  const text = readFileSync(llms, "utf8");
  writeFileSync(llms, text.includes("\n## Optional") ? text.replace("\n## Optional", section + "\n## Optional") : text + section);

  return { count: live.length, report: live.map((g) => `guides/${g.slug}.html : ${g.words} mots`) };
}
