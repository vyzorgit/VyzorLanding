// features-orbital.jsx — "Timeline orbitale" des fonctionnalités VYZOR
//   • Les fonctionnalités gravitent comme des nœuds lumineux autour d'un hub central
//     qui représente le profil actif (Comptable / DAF / Dirigeant).
//   • Rotation automatique douce (rAF), pausable.
//   • Clic sur un nœud → la roue pivote pour l'amener en haut, focus "spotlight"
//     (les autres nœuds s'estompent) et une carte détail glass se déploie en bas.
//   • Switcher de profil repensé : 3 tuiles glass avec icône + libellé.
//   • Charte VYZOR : navy + or #f0c949, liquid glass, Inter + JetBrains Mono.
//
//   Props (pilotés par les Tweaks au niveau App) :
//     autoRotate (bool), speed (deg/frame@60fps), radius (px max),
//     showRing (bool), labelsMode ('always' | 'hover')

(function injectOrbitalStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("features-orbital-styles")) return;
  const s = document.createElement("style");
  s.id = "features-orbital-styles";
  s.textContent = `
    @keyframes orbPing {
      0%   { transform: scale(1);   opacity: 0.55; }
      70%  { transform: scale(1.9); opacity: 0; }
      100% { transform: scale(1.9); opacity: 0; }
    }
    @keyframes orbRise {
      from { opacity: 0; transform: translateY(14px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes orbHubFloat {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-5px); }
    }

    .orb-stage {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
      touch-action: manipulation;
    }
    .orb-spin { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }

    /* Anneau d'orbite */
    .orb-ring {
      position: absolute;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.07);
      box-shadow: inset 0 0 60px rgba(240,201,73,0.04);
      pointer-events: none;
    }
    .orb-ring::after {
      content: "";
      position: absolute; inset: -1px;
      border-radius: 999px;
      border: 1px dashed rgba(240,201,73,0.10);
    }

    /* Hub central */
    .orb-hub {
      position: absolute;
      display: grid; place-items: center;
      border-radius: 999px;
      z-index: 60;
      animation: orbHubFloat 7s ease-in-out infinite;
      transition: opacity 420ms ease, filter 420ms ease;
    }
    .orb-hub__glow {
      position: absolute; inset: -38%;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(240,201,73,0.34) 0%, rgba(240,201,73,0.10) 42%, transparent 70%);
      filter: blur(6px);
      pointer-events: none;
    }
    .orb-hub__ping {
      position: absolute; inset: 0;
      border-radius: 999px;
      border: 1px solid rgba(240,201,73,0.45);
      animation: orbPing 3.4s cubic-bezier(0.22,1,0.36,1) infinite;
      pointer-events: none;
    }
    .orb-hub__ping.d2 { animation-delay: 1.7s; }
    .orb-hub__core {
      position: relative;
      width: 100%; height: 100%;
      border-radius: 999px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 5px;
      text-align: center;
      padding: 0 14px;
      background:
        radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 55%),
        linear-gradient(160deg, rgba(18,20,34,0.78), rgba(10,12,22,0.72));
      border: 1px solid rgba(240,201,73,0.30);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.16),
        inset 0 0 26px rgba(240,201,73,0.10),
        0 22px 60px -18px rgba(0,0,0,0.7);
    }
    .orb-hub__icon {
      width: 30px; height: 30px; border-radius: 999px;
      display: grid; place-items: center;
      color: #1a1410;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      box-shadow: 0 6px 18px rgba(216,172,47,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
    }
    .orb-hub__label {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
      color: #fff; line-height: 1.1;
    }
    .orb-hub__tag {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(240,201,73,0.85);
    }
    .orb-stage[data-focus="1"] .orb-hub { opacity: 0.32; filter: saturate(0.6); }

    /* Nœud feature */
    .orb-node {
      position: absolute;
      will-change: transform;
    }
    .orb-node__hit {
      position: relative;
      display: block;
      width: 56px; height: 56px;
      padding: 0; margin: 0;
      border: none; background: none; cursor: pointer;
    }
    .orb-node__halo {
      position: absolute; inset: -10px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(240,201,73,0.22) 0%, transparent 68%);
      opacity: 0;
      transition: opacity 320ms ease;
      pointer-events: none;
    }
    .orb-node__circle {
      position: relative;
      width: 56px; height: 56px;
      border-radius: 999px;
      display: grid; place-items: center;
      color: rgba(255,255,255,0.82);
      background: linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
      border: 1px solid rgba(255,255,255,0.14);
      backdrop-filter: blur(12px) saturate(140%);
      -webkit-backdrop-filter: blur(12px) saturate(140%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 10px 26px -12px rgba(0,0,0,0.6);
      transition:
        transform 300ms cubic-bezier(0.22,1,0.36,1),
        border-color 300ms ease, color 300ms ease,
        background 300ms ease, box-shadow 300ms ease;
    }
    .orb-node__hit:hover .orb-node__circle {
      transform: scale(1.12);
      color: #f5e0a0;
      border-color: rgba(240,201,73,0.5);
      background: linear-gradient(160deg, rgba(240,201,73,0.12), rgba(240,201,73,0.02));
    }
    .orb-node__hit:hover .orb-node__halo { opacity: 1; }
    .orb-node__circle.active {
      transform: scale(1.34);
      color: #1a1410;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      border-color: #f2d782;
      box-shadow: 0 14px 34px -8px rgba(216,172,47,0.6), inset 0 1px 0 rgba(255,255,255,0.6);
    }
    .orb-node__dot {
      position: absolute; top: -3px; right: -3px;
      width: 9px; height: 9px; border-radius: 999px;
      background: #f0c949; box-shadow: 0 0 10px #f0c949;
      opacity: 0; transition: opacity 300ms ease;
    }
    .orb-node__circle.active .orb-node__dot { opacity: 0; }

    .orb-node__label {
      position: absolute;
      top: calc(50% + 38px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-family: "Inter", system-ui, sans-serif;
      font-size: 11.5px; font-weight: 500; letter-spacing: 0.01em;
      color: rgba(255,255,255,0.62);
      transition: opacity 300ms ease, color 300ms ease;
      pointer-events: none;
      text-shadow: 0 1px 8px rgba(0,0,0,0.5);
    }
    .orb-node__hit:hover + .orb-node__label,
    .orb-node__label.active { color: #f5e0a0; }
    .orb-node__label.is-hidden { opacity: 0; }

    /* Carte détail */
    .orb-detail {
      position: absolute;
      left: 50%; bottom: 14px;
      transform: translateX(-50%);
      width: clamp(290px, 92%, 470px);
      z-index: 120;
      border-radius: 18px;
      padding: 20px 22px 22px;
      background:
        radial-gradient(120% 120% at 10% 0%, rgba(240,201,73,0.08), transparent 50%),
        linear-gradient(160deg, rgba(16,18,30,0.9), rgba(10,12,20,0.86));
      border: 1px solid rgba(240,201,73,0.30);
      backdrop-filter: blur(22px) saturate(160%);
      -webkit-backdrop-filter: blur(22px) saturate(160%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.12),
        0 30px 70px -22px rgba(0,0,0,0.8),
        0 0 0 1px rgba(240,201,73,0.06);
      animation: orbRise 360ms cubic-bezier(0.22,1,0.36,1) both;
    }
    .orb-detail__top {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      margin-bottom: 12px;
    }
    .orb-detail__badge {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(240,201,73,0.9);
      padding: 5px 10px 5px 6px; border-radius: 999px;
      background: rgba(240,201,73,0.08);
      border: 1px solid rgba(240,201,73,0.22);
    }
    .orb-detail__badge svg { width: 13px; height: 13px; }
    .orb-detail__x {
      flex-shrink: 0;
      width: 28px; height: 28px; border-radius: 999px;
      display: grid; place-items: center;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.6);
      cursor: pointer; font-size: 14px; line-height: 1;
      transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
    }
    .orb-detail__x:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.22); }
    .orb-detail__title {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 19px; font-weight: 600; letter-spacing: -0.015em;
      line-height: 1.22; color: #fff; margin: 0 0 8px;
    }
    .orb-detail__sub {
      font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.66);
      margin: 0 0 16px;
    }
    .orb-detail__cta {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 9px 16px; border-radius: 999px; cursor: pointer;
      font-family: "Inter", system-ui, sans-serif;
      font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em;
      color: #1a1410; border: none;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      box-shadow: 0 8px 22px -8px rgba(216,172,47,0.5), inset 0 1px 0 rgba(255,255,255,0.6);
      transition: transform 220ms ease, box-shadow 220ms ease;
    }
    .orb-detail__cta:hover { transform: translateY(-1px); box-shadow: 0 12px 28px -8px rgba(216,172,47,0.6), inset 0 1px 0 rgba(255,255,255,0.6); }
    .orb-detail__cta svg { width: 15px; height: 15px; transition: transform 220ms ease; }
    .orb-detail__cta:hover svg { transform: translateX(3px); }

    /* Switcher de profil repensé */
    .orb-switch {
      display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
    }
    .orb-switch__tile {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 12px;
      padding: 11px 18px 11px 12px; border-radius: 14px; cursor: pointer;
      background: linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015));
      border: 1px solid rgba(255,255,255,0.10);
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      text-align: left;
      transition: border-color 280ms ease, background 280ms ease, transform 280ms ease, box-shadow 280ms ease;
    }
    .orb-switch__tile:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
    .orb-switch__tile.active {
      border-color: rgba(240,201,73,0.42);
      background: linear-gradient(160deg, rgba(240,201,73,0.10), rgba(240,201,73,0.02));
      box-shadow: 0 16px 38px -16px rgba(216,172,47,0.34), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .orb-switch__ic {
      width: 38px; height: 38px; border-radius: 11px;
      display: grid; place-items: center; flex-shrink: 0;
      color: rgba(255,255,255,0.62);
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      transition: color 280ms ease, background 280ms ease, border-color 280ms ease;
    }
    .orb-switch__tile.active .orb-switch__ic {
      color: #1a1410; border-color: #f2d782;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      box-shadow: 0 6px 16px rgba(216,172,47,0.34), inset 0 1px 0 rgba(255,255,255,0.5);
    }
    .orb-switch__ic svg { width: 19px; height: 19px; }
    .orb-switch__txt { display: flex; flex-direction: column; line-height: 1.15; }
    .orb-switch__name {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
      color: rgba(255,255,255,0.92);
      transition: color 280ms ease;
    }
    .orb-switch__tile.active .orb-switch__name { color: #f5e0a0; }
    .orb-switch__sub {
      font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 1px;
    }

    .orb-hint {
      text-align: center;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(255,255,255,0.34);
      transition: opacity 320ms ease;
    }

    @media (max-width: 560px) {
      .orb-switch__sub { display: none; }
      .orb-switch__tile { padding: 9px 14px 9px 9px; gap: 9px; }
      .orb-node__hit { width: 50px; height: 50px; }
      .orb-node__circle { width: 50px; height: 50px; }
    }
  `;
  document.head.appendChild(s);
})();

// ── Icônes (stroke, style lucide) ───────────────────────────────────────────
const ORB_ICONS = {
  briefcase: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  lineChart: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>),
  compass: (<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" /></>),
  layers: (<><path d="m12 2 10 5-10 5L2 7l10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>),
  plug: (<><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 0 1 0 10h-2" /><line x1="8" y1="12" x2="16" y2="12" /></>),
  file: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  sparkles: (<><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>),
  dashboard: (<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>),
  sliders: (<><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></>),
  sync: (<><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></>),
  barChart: (<><line x1="6" y1="20" x2="6" y2="14" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="18" y1="20" x2="18" y2="10" /></>),
  gauge: (<><path d="M12 14 8.5 9.5" /><circle cx="12" cy="14" r="9" /><path d="M3.5 14a8.5 8.5 0 0 1 17 0" /></>),
  message: (<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" /></>),
  alert: (<><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>),
  wallet: (<><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>),
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>),
};

const OrbIcon = ({ name, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {ORB_ICONS[name] || ORB_ICONS.sparkles}
  </svg>
);

// ── Données : profils + fonctionnalités (icône + libellé court par nœud) ─────
const ORBITAL_ROLES = {
  comptable: {
    label: "Expert-Comptable", sub: "Cabinet", icon: "briefcase",
    tagline: "Cabinet",
    items: [
      { tag: "Vue cabinet", icon: "layers", title: "Vue cabinet multi-dossiers", sub: "Tous vos clients, leur Vyzor Score, leurs alertes rouges, sur un seul écran. Switch dossier en un clic." },
      { tag: "Connexions", icon: "plug", title: "Connexion comptable & import FEC", sub: "Pennylane, MyUnisoft, Odoo en automatique. Tiime arrive bientôt. Sinon, FEC ou PDF : le parser V2 fait le reste." },
      { tag: "États financiers", icon: "file", title: "États financiers détaillés", sub: "Compte de résultat et bilan complets avec références FP, FQ, GA. La granularité dont vous avez besoin pour vérifier." },
      { tag: "Alertes", icon: "bell", title: "Alertes par dossier", sub: "EBE négatif, DSO qui dérape, runway critique : Vyzor remonte ce qui doit déclencher un appel à votre client." },
      { tag: "Assistant IA", icon: "sparkles", title: "Assistant IA de diagnostic", sub: "« Pourquoi l'EBITDA est-il négatif ce trimestre ? » — réponse contextualisée sur les chiffres du dossier ouvert." },
    ],
  },
  daf: {
    label: "DAF", sub: "Direction financière", icon: "lineChart",
    tagline: "Pilotage",
    items: [
      { tag: "Dashboards", icon: "dashboard", title: "Tableaux de bord personnalisables", sub: "Création de valeur, investissement, financement, rentabilité, trésorerie — ou vos propres onglets. Drag & drop des widgets." },
      { tag: "What-If", icon: "sliders", title: "Simulation What-If", sub: "Embauche, hausse des prix, nouvel emprunt, perte d'un client majeur. Slider −30 % à +30 %, impact temps réel sur EBITDA, point mort, CAF." },
      { tag: "Données live", icon: "sync", title: "Données live Pennylane", sub: "Sélecteur jour / semaine / mois / trimestre / année. Indicateur de sync, nombre d'écritures. Plus de gel à fin de mois." },
      { tag: "KPIs", icon: "barChart", title: "Bibliothèque de KPIs financiers", sub: "BFR, DSO, DPO, DIO, gearing, capacité de remboursement, runway, liquidité générale / réduite / immédiate. Tout est calculé, tout est filtrable." },
      { tag: "Reco IA", icon: "sparkles", title: "Recommandations & plan d'action", sub: "L'agent Vyzor génère un narratif et des actions concrètes — relance commerciale ciblée, optimisation BFR. Vous validez, vous exécutez." },
      { tag: "Compte-rendu email", icon: "mail", title: "Compte-rendu financier par email", sub: "Depuis n'importe quel dashboard, générez un email contextuel sur les KPI affichés, choisissez le ton, puis envoyez-le depuis votre Gmail — rapport PDF joint, traçé dans vos « Envoyés »." },
      { tag: "Budget", icon: "target", title: "Budget prévisionnel vs réalisé", sub: "Import du budget par exercice, comparaison poste par poste avec les mêmes formules de KPI. Bascule « N-1 ↔ Budget » sur les écrans KPI et la Synthèse." },
      { tag: "Trésorerie", icon: "wallet", title: "Trésorerie temps réel", sub: "Burn rate, cash-flow net, runway, projection à 30/60/90 jours, jours critiques et score de santé trésorerie. Connexion bancaire Bridge ou import Excel." },
    ],
  },
  dirigeant: {
    label: "Chef d'entreprise", sub: "Dirigeant de PME", icon: "compass",
    tagline: "Décision",
    items: [
      { tag: "Vyzor Score", icon: "gauge", title: "Vyzor Score sur 100", sub: "Rentabilité, solvabilité, liquidité, efficacité — quatre sous-scores et un commentaire synthétique. Vous savez où vous en êtes." },
      { tag: "What-If", icon: "sliders", title: "Simulation What-If", sub: "« Et si j'embauche ? » « Et si je perds mon plus gros client ? » Sept scénarios, slider de variation, impact immédiat sur 6 KPIs clés." },
      { tag: "Assistant IA", icon: "message", title: "Assistant IA en français", sub: "Posez la question business du jour : leviers BFR, hausse de prix, comparaison vs an dernier. Réponse contextualisée sur vos chiffres réels." },
      { tag: "Alertes", icon: "alert", title: "Alertes & plan d'action", sub: "EBE négatif, trésorerie tendue : Vyzor remonte les risques et propose les actions concrètes à lancer ce mois-ci, priorisées et chiffrées." },
      { tag: "Cash live", icon: "wallet", title: "Cash en temps réel", sub: "Open Banking PSD2 via Bridge ou import Excel : trésorerie nette, burn rate, runway, projection 30/60/90 jours et score de santé. Vous voyez vivre votre cash, pas une photo d'il y a trois mois." },
      { tag: "Compte-rendu email", icon: "mail", title: "Compte-rendu par email", sub: "L'IA rédige votre compte-rendu financier à partir de vos KPI. Vous le relisez et l'envoyez depuis votre messagerie — ton au choix : professionnel, chaleureux ou concis, PDF joint." },
      { tag: "Budget", icon: "target", title: "Budget prévisionnel vs réalisé", sub: "Importez votre budget de l'année et suivez l'écart au réel poste par poste. Une référence de comparaison bien plus parlante que le simple N-1." },
    ],
  },
};

const ORBITAL_ORDER = ["comptable", "daf", "dirigeant"];
const TOP_ANGLE = 270; // sin = -1 → sommet

const openVyzorContact = () => {
  window.dispatchEvent(new CustomEvent("vyzor:open-contact"));
};

// ── Switcher repensé ─────────────────────────────────────────────────────────
const OrbitalSwitcher = ({ value, onChange }) => (
  <div className="orb-switch" role="tablist" aria-label="Profil utilisateur">
    {ORBITAL_ORDER.map((id) => {
      const r = ORBITAL_ROLES[id];
      const active = value === id;
      return (
        <button
          key={id}
          role="tab"
          aria-selected={active}
          className={`orb-switch__tile ${active ? "active" : ""}`}
          onClick={() => onChange(id)}
        >
          <span className="orb-switch__ic"><OrbIcon name={r.icon} /></span>
          <span className="orb-switch__txt">
            <span className="orb-switch__name">{r.label}</span>
            <span className="orb-switch__sub">{r.sub}</span>
          </span>
        </button>
      );
    })}
  </div>
);

// ── Composant principal ───────────────────────────────────────────────────────
const FeaturesOrbital = ({
  autoRotate = true,
  speed = 0.1,
  radius = 210,
  showRing = true,
  labelsMode = "always",
}) => {
  const [role, setRole] = React.useState("dirigeant");
  const [expandedIdx, setExpandedIdx] = React.useState(null);
  const [rotation, setRotation] = React.useState(0);
  const [effRadius, setEffRadius] = React.useState(radius);
  const [hovering, setHovering] = React.useState(false);

  const stageRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const rotRef = React.useRef(0);
  const tweenRef = React.useRef(null);
  const [cardPos, setCardPos] = React.useState(null);

  const data = ORBITAL_ROLES[role];
  const items = data.items;
  const total = items.length;
  const focused = expandedIdx != null;

  // Rayon effectif selon la largeur dispo
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const maxByWidth = Math.max(120, w / 2 - 78);
      setEffRadius(Math.min(radius, maxByWidth));
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius]);

  // Rotation automatique (rAF)
  React.useEffect(() => {
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = now - last; last = now;
      if (autoRotate && !focused && !hovering) {
        rotRef.current = (rotRef.current + speed * (dt / 16.67)) % 360;
        setRotation(rotRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, focused, hovering, speed]);

  // Amène en douceur le nœud cliqué au sommet du cercle (chemin le plus court)
  const animateRotationTo = (target) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const start = rotRef.current;
    const delta = ((target - start + 540) % 360) - 180;
    const dur = 620;
    const t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const v = start + delta * ease(p);
      rotRef.current = ((v % 360) + 360) % 360;
      setRotation(rotRef.current);
      if (p < 1) { tweenRef.current = requestAnimationFrame(step); }
      else { tweenRef.current = null; }
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  const handleSelect = (idx) => {
    if (expandedIdx === idx) {
      setExpandedIdx(null);
      return;
    }
    setExpandedIdx(idx);
    // Rotation cible : ce nœud doit arriver au sommet (TOP_ANGLE)
    const target = (((TOP_ANGLE - (idx / total) * 360) % 360) + 360) % 360;
    animateRotationTo(target);
  };

  const closeDetail = () => setExpandedIdx(null);

  React.useEffect(() => () => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
  }, []);

  // Positionne la carte juste à côté du nœud cliqué (clampée dans la scène)
  React.useLayoutEffect(() => {
    if (expandedIdx == null) { setCardPos(null); return; }
    const stage = stageRef.current, card = cardRef.current;
    if (!stage || !card) return;
    const sw = stage.clientWidth, sh = stage.clientHeight;
    const { x, y } = nodePos(expandedIdx);
    const cw = card.offsetWidth, ch = card.offsetHeight;
    const ncx = sw / 2 + x, ncy = sh / 2 + y;
    const NODE_R = 30, GAP = 16;
    let left = x <= 0 ? ncx + NODE_R + GAP : ncx - cw - NODE_R - GAP;
    let top = ncy - ch / 2;
    left = Math.max(14, Math.min(sw - cw - 14, left));
    top = Math.max(14, Math.min(sh - ch - 14, top));
    setCardPos({ left, top });
  }, [expandedIdx, effRadius, rotation, role]);

  // Au changement de profil : reset
  React.useEffect(() => { setExpandedIdx(null); }, [role]);

  const nodePos = (i) => {
    const angle = ((i / total) * 360 + rotation) % 360;
    const rad = (angle * Math.PI) / 180;
    const x = effRadius * Math.cos(rad);
    const y = effRadius * Math.sin(rad);
    const depth = (Math.sin(rad) + 1) / 2; // 0 (haut) → 1 (bas)
    const zIndex = Math.round(20 + 30 * depth);
    const opacity = 0.5 + 0.5 * depth;
    return { x, y, zIndex, opacity };
  };

  const stageHeight = Math.round(effRadius * 2 + 188);
  const ringSize = effRadius * 2;
  const hubSize = Math.max(108, Math.min(132, effRadius * 0.62));

  return (
    <section id="fonctionnalites" style={{ position: "relative", marginTop: 64, marginBottom: 72 }}>
      {/* En-tête + switcher */}
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <h2 style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "clamp(30px, 4vw, 46px)", margin: "0 auto 14px",
          letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.06,
          color: "#fff", maxWidth: 760,
        }}>
          Tout gravite autour de <span style={{ color: "rgba(255,255,255,0.42)" }}>votre métier.</span>
        </h2>
        <div style={{ marginTop: 26 }}>
          <OrbitalSwitcher value={role} onChange={setRole} />
        </div>
      </div>

      {/* Scène orbitale */}
      <div
        ref={stageRef}
        className="orb-stage"
        data-focus={focused ? "1" : "0"}
        style={{ height: stageHeight }}
        onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains("orb-spin")) closeDetail(); }}
      >
        <div className="orb-spin">
          {/* Anneau */}
          {showRing && (
            <div className="orb-ring" style={{ width: ringSize, height: ringSize }} />
          )}

          {/* Hub central */}
          <div className="orb-hub" style={{ width: hubSize, height: hubSize }}>
            <div className="orb-hub__glow" />
            <div className="orb-hub__ping" />
            <div className="orb-hub__ping d2" />
            <div className="orb-hub__core">
              <span className="orb-hub__icon"><OrbIcon name={data.icon} size={17} /></span>
              <span className="orb-hub__label">{data.label}</span>
              <span className="orb-hub__tag">{data.tagline}</span>
            </div>
          </div>

          {/* Nœuds */}
          {items.map((it, i) => {
            const p = nodePos(i);
            const isActive = expandedIdx === i;
            const dimmed = focused && !isActive;
            const labelHidden = labelsMode === "hover" && !isActive;
            return (
              <div
                key={`${role}-${i}`}
                className="orb-node"
                style={{
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  zIndex: isActive ? 80 : p.zIndex,
                  opacity: dimmed ? 0.22 : p.opacity,
                  pointerEvents: dimmed ? "none" : "auto",
                }}
              >
                <button
                  className="orb-node__hit"
                  onClick={(e) => { e.stopPropagation(); handleSelect(i); }}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  aria-label={it.title}
                  aria-expanded={isActive}
                >
                  <span className="orb-node__halo" />
                  <span className={`orb-node__circle ${isActive ? "active" : ""}`}>
                    <OrbIcon name={it.icon} size={22} />
                    <span className="orb-node__dot" />
                  </span>
                </button>
                <span className={`orb-node__label ${isActive ? "active" : ""} ${labelHidden ? "is-hidden" : ""}`}>
                  {it.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Carte détail */}
        {focused && (
          <div
            ref={cardRef}
            className="orb-detail"
            style={{
              left: cardPos ? cardPos.left : 0,
              top: cardPos ? cardPos.top : 0,
              bottom: "auto",
              transform: "none",
              visibility: cardPos ? "visible" : "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orb-detail__top">
              <span className="orb-detail__badge">
                <OrbIcon name={data.icon} /> {data.label}
              </span>
              <button className="orb-detail__x" onClick={closeDetail} aria-label="Fermer">✕</button>
            </div>
            <h3 className="orb-detail__title">{items[expandedIdx].title}</h3>
            <p className="orb-detail__sub">{items[expandedIdx].sub}</p>
            <button className="orb-detail__cta" onClick={() => window.open("https://calendly.com/admin-vyzor/30min", "_blank", "noopener")}>
              Rejoindre la bêta
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

Object.assign(window, { FeaturesOrbital, OrbitalSwitcher, OrbIcon, ORBITAL_ROLES });
