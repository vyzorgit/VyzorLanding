// routes.mjs — Paires de pages FR / EN du site (version anglaise, lot 1 du 05/11/2026).
// fr : fichier source ; path : adresse française ; en : adresse anglaise (sans .html, cleanUrls Vercel).
// Les pages absentes d'ici (guides, calculateurs…) n'existent qu'en français.
const FEATURES = [
  ["analyse-financiere", "financial-analysis"],
  ["tresorerie", "cash"],
  ["conseil", "council"],
  ["alertes", "alerts"],
  ["juridique", "legal"],
  ["multi-societes", "multi-entity"],
];

export const PAGES = [
  { fr: "index.html", path: "/", en: "/en" },
  { fr: "fonctionnalites.html", path: "/fonctionnalites", en: "/en/features" },
  ...FEATURES.map(([fr, en]) => ({ fr: `fonctionnalite-${fr}.html`, path: `/fonctionnalite-${fr}`, en: `/en/features/${en}` })),
  { fr: "integrations.html", path: "/integrations", en: "/en/integrations" },
  { fr: "securite.html", path: "/securite", en: "/en/security" },
  { fr: "cabinets.html", path: "/cabinets", en: "/en/accounting-firms" },
  { fr: "pennylane.html", path: "/pennylane", en: "/en/pennylane" },
  { fr: "faq.html", path: "/faq", en: "/en/faq" },
  { fr: "equipe.html", path: "/equipe", en: "/en/team" },
  { fr: "a-propos.html", path: "/a-propos", en: "/en/about" },
  { fr: "mentions-legales.html", path: "/mentions-legales", en: "/en/legal-notice" },
  { fr: "confidentialite.html", path: "/confidentialite", en: "/en/privacy" },
];

// Fichier publié dans dist/ pour une adresse anglaise (/en → en/index.html).
export const enFile = (en) => (en === "/en" ? "en/index.html" : en.slice(1) + ".html");
