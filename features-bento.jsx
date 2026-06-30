// features-bento.jsx — Refonte de la section "Fonctionnalités"
//   Remplace la timeline orbitale par une grille éditoriale "bento" :
//     • Chaque fonctionnalité est lisible IMMÉDIATEMENT (icône + titre + description).
//     • Une carte "flagship" par persona, mise en avant sur 2 colonnes.
//     • Switcher de profil conservé (Comptable / DAF / Dirigeant).
//     • Charte VYZOR : navy #070a14 + or #f0c949, liquid glass discret, Inter + JetBrains Mono.
//   Dépend de features-orbital.jsx pour OrbIcon + ORBITAL_ROLES (mêmes données).

(function injectBentoStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("features-bento-styles")) return;
  const s = document.createElement("style");
  s.id = "features-bento-styles";
  s.textContent = `
    @keyframes bentoRise {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Switcher de profil (3 tuiles glass) ── */
    .bn-switch { display: flex; gap: 10px; flex-wrap: wrap; }
    .bn-switch__tile {
      position: relative; overflow: hidden;
      display: flex; align-items: center; gap: 13px;
      padding: 12px 20px 12px 13px; border-radius: 14px; cursor: pointer;
      background: linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015));
      border: 1px solid rgba(255,255,255,0.10);
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      text-align: left;
      transition: border-color 280ms ease, background 280ms ease, transform 280ms ease, box-shadow 280ms ease;
    }
    .bn-switch__tile:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
    .bn-switch__tile.active {
      border-color: rgba(240,201,73,0.42);
      background: linear-gradient(160deg, rgba(240,201,73,0.10), rgba(240,201,73,0.02));
      box-shadow: 0 16px 38px -16px rgba(216,172,47,0.34), inset 0 1px 0 rgba(255,255,255,0.12);
    }
    .bn-switch__ic {
      width: 40px; height: 40px; border-radius: 11px;
      display: grid; place-items: center; flex-shrink: 0;
      color: rgba(255,255,255,0.62);
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      transition: color 280ms ease, background 280ms ease, border-color 280ms ease;
    }
    .bn-switch__tile.active .bn-switch__ic {
      color: #1a1410; border-color: #f2d782;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      box-shadow: 0 6px 16px rgba(216,172,47,0.34), inset 0 1px 0 rgba(255,255,255,0.5);
    }
    .bn-switch__ic svg { width: 20px; height: 20px; }
    .bn-switch__txt { display: flex; flex-direction: column; line-height: 1.15; }
    .bn-switch__name {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 14.5px; font-weight: 600; letter-spacing: -0.01em;
      color: rgba(255,255,255,0.92); transition: color 280ms ease;
    }
    .bn-switch__tile.active .bn-switch__name { color: #f5e0a0; }
    .bn-switch__sub { font-size: 11.5px; color: rgba(255,255,255,0.45); margin-top: 2px; }

    /* ── Grille bento ── */
    .bn-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .bn-card {
      position: relative;
      grid-column: span 1;
      display: flex; flex-direction: column;
      padding: 28px 26px;
      border-radius: 18px;
      background: linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012));
      border: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(12px) saturate(130%);
      -webkit-backdrop-filter: blur(12px) saturate(130%);
      text-align: left; cursor: pointer; width: 100%;
      transition: border-color 320ms ease, background 320ms ease,
                  transform 360ms cubic-bezier(0.22,1,0.36,1), box-shadow 360ms ease;
      animation: bentoRise 460ms cubic-bezier(0.22,1,0.36,1) both;
    }
    .bn-card:hover {
      transform: translateY(-3px);
      border-color: rgba(240,201,73,0.34);
      background: linear-gradient(160deg, rgba(240,201,73,0.05), rgba(255,255,255,0.012));
      box-shadow: 0 22px 48px -22px rgba(216,172,47,0.28), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .bn-card:focus-visible { outline: 2px solid rgba(240,201,73,0.6); outline-offset: 3px; }

    /* Carte flagship : 2 colonnes, plus contrastée */
    .bn-card.flagship {
      grid-column: span 2;
      background:
        radial-gradient(120% 140% at 0% 0%, rgba(240,201,73,0.10), transparent 52%),
        linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
      border-color: rgba(240,201,73,0.22);
    }

    .bn-card__ic {
      width: 46px; height: 46px; border-radius: 13px;
      display: grid; place-items: center; flex-shrink: 0;
      color: #f0c949;
      background: rgba(240,201,73,0.08);
      border: 1px solid rgba(240,201,73,0.22);
      margin-bottom: 18px;
      transition: transform 360ms cubic-bezier(0.22,1,0.36,1);
    }
    .bn-card:hover .bn-card__ic { transform: scale(1.06) rotate(-3deg); }
    .bn-card__ic svg { width: 23px; height: 23px; }

    .bn-card__tag {
      font-family: "Bricolage Grotesque", "Inter", system-ui, sans-serif;
      font-size: 12px; font-weight: 600; letter-spacing: 0.01em; text-transform: none;
      color: rgba(240,201,73,0.85); margin-bottom: 9px;
    }
    .bn-card__title {
      font-family: "Bricolage Grotesque", "Inter", system-ui, sans-serif;
      font-size: 18.5px; font-weight: 600; letter-spacing: -0.01em;
      line-height: 1.22; color: #fff; margin: 0 0 10px;
      text-wrap: balance;
    }
    .bn-card.flagship .bn-card__title { font-size: 22px; }
    .bn-card__sub {
      font-size: 13.5px; line-height: 1.62; color: rgba(255,255,255,0.6);
      margin: 0; text-wrap: pretty;
    }
    .bn-card.flagship .bn-card__sub { font-size: 14.5px; max-width: 560px; }

    .bn-card__more {
      display: inline-flex; align-items: center; gap: 7px;
      margin-top: 18px;
      font-family: "Inter", system-ui, sans-serif;
      font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em;
      color: rgba(255,255,255,0.5);
      transition: color 280ms ease, gap 280ms ease;
    }
    .bn-card:hover .bn-card__more { color: #f5e0a0; gap: 11px; }
    .bn-card__more svg { width: 14px; height: 14px; }

    /* Barre CTA en pied de section */
    .bn-cta {
      margin-top: 26px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px; flex-wrap: wrap;
      padding: 26px 30px;
      border-radius: 18px;
      background:
        radial-gradient(120% 200% at 100% 0%, rgba(240,201,73,0.10), transparent 55%),
        linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012));
      border: 1px solid rgba(240,201,73,0.18);
    }
    .bn-cta__txt { display: flex; flex-direction: column; gap: 5px; }
    .bn-cta__h {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 18px; font-weight: 600; letter-spacing: -0.015em; color: #fff;
    }
    .bn-cta__p { font-size: 13.5px; color: rgba(255,255,255,0.55); }
    .bn-cta__btn {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 12px 22px; border-radius: 999px; cursor: pointer;
      font-family: "Inter", system-ui, sans-serif;
      font-size: 13.5px; font-weight: 600; letter-spacing: 0.01em;
      color: #1a1410; border: none; white-space: nowrap;
      background: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      box-shadow: 0 10px 26px -10px rgba(216,172,47,0.5), inset 0 1px 0 rgba(255,255,255,0.6);
      transition: transform 220ms ease, box-shadow 220ms ease;
    }
    .bn-cta__btn:hover { transform: translateY(-1px); box-shadow: 0 14px 32px -10px rgba(216,172,47,0.62), inset 0 1px 0 rgba(255,255,255,0.6); }
    .bn-cta__btn svg { width: 16px; height: 16px; transition: transform 220ms ease; }
    .bn-cta__btn:hover svg { transform: translateX(3px); }

    @media (max-width: 980px) {
      .bn-grid { grid-template-columns: repeat(2, 1fr); }
      .bn-card.flagship { grid-column: span 2; }
    }
    @media (max-width: 620px) {
      .bn-grid { grid-template-columns: 1fr; }
      .bn-card, .bn-card.flagship { grid-column: span 1; }
      .bn-switch__sub { display: none; }
      .bn-switch__tile { padding: 10px 16px 10px 10px; gap: 10px; flex: 1; }
      .bn-card { padding: 24px 22px; }
    }
  `;
  document.head.appendChild(s);
})();

// Copy éditoriale par persona (titre + intro). Items repris de ORBITAL_ROLES.
const BENTO_COPY = {
  comptable: {
    headline: "Un diagnostic client,",
    accent: "livré en moins de 5 minutes.",
    intro:
      "Connectez Pennylane, MyUnisoft ou Odoo — ou importez un FEC. Vyzor calcule le score, génère le plan d'action et vous donne une vue cabinet sur tous vos dossiers.",
  },
  daf: {
    headline: "Le pilotage qu'on vous demandait,",
    accent: "sans le tableur du dimanche.",
    intro:
      "Tableaux de bord personnalisables, simulation What-If, données live Pennylane synchronisées en continu. Le pack Excel devient un cockpit partageable.",
  },
  dirigeant: {
    headline: "Vos chiffres, expliqués.",
    accent: "Vos décisions, éclairées.",
    intro:
      "Un Vyzor Score lisible en 10 secondes, des alertes qui appellent à l'action, un assistant IA qui répond en français. Pas de jargon, pas de tableau croisé.",
  },
};

const BENTO_ORDER = ["comptable", "daf", "dirigeant"];

const bentoOpenContact = () => {
  window.dispatchEvent(new CustomEvent("vyzor:open-contact"));
};

const BentoSwitcher = ({ value, onChange }) => (
  <div className="bn-switch" role="tablist" aria-label="Profil utilisateur">
    {BENTO_ORDER.map((id) => {
      const r = ORBITAL_ROLES[id];
      const active = value === id;
      return (
        <button
          key={id}
          role="tab"
          aria-selected={active}
          className={`bn-switch__tile ${active ? "active" : ""}`}
          onClick={() => onChange(id)}
        >
          <span className="bn-switch__ic"><OrbIcon name={r.icon} /></span>
          <span className="bn-switch__txt">
            <span className="bn-switch__name">{r.label}</span>
            <span className="bn-switch__sub">{r.sub}</span>
          </span>
        </button>
      );
    })}
  </div>
);

const BentoCard = ({ item, flagship, delay }) => (
  <button
    className={`bn-card ${flagship ? "flagship" : ""}`}
    style={{ animationDelay: `${delay}ms` }}
    onClick={bentoOpenContact}
    aria-label={item.title}
  >
    <span className="bn-card__ic"><OrbIcon name={item.icon} /></span>
    <span className="bn-card__tag">{item.tag}</span>
    <span className="bn-card__title">{item.title}</span>
    <span className="bn-card__sub">{item.sub}</span>
    <span className="bn-card__more">
      En savoir plus
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  </button>
);

const FeaturesBento = () => {
  const [role, setRole] = React.useState("dirigeant");
  const [renderKey, setRenderKey] = React.useState(0);

  React.useEffect(() => { setRenderKey((k) => k + 1); }, [role]);

  const data = ORBITAL_ROLES[role];
  const copy = BENTO_COPY[role];
  const items = data.items;

  return (
    <section id="fonctionnalites" style={{ position: "relative", marginTop: 56, marginBottom: 72 }}>
      {/* En-tête : switcher + titre éditorial par persona */}
      <div
        className="vz-bento-head"
        style={{
          display: "flex", flexDirection: "column", gap: 28, marginBottom: 36,
        }}
      >
        <BentoSwitcher value={role} onChange={setRole} />
        <div style={{ maxWidth: 720 }}>
          <h2
            key={`h-${renderKey}`}
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: "clamp(30px, 4vw, 48px)", margin: 0,
              letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.06, color: "#fff",
              animation: "bentoRise 420ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {copy.headline}{" "}
            <span style={{ color: "rgba(255,255,255,0.42)" }}>{copy.accent}</span>
          </h2>
          <p
            key={`p-${renderKey}`}
            style={{
              fontSize: 16, lineHeight: 1.62, color: "rgba(255,255,255,0.58)",
              maxWidth: 600, marginTop: 16, marginBottom: 0,
              animation: "bentoRise 420ms cubic-bezier(0.22,1,0.36,1) 70ms both",
            }}
          >
            {copy.intro}
          </p>
        </div>
      </div>

      {/* Grille bento — re-mount au changement de rôle pour rejouer le stagger */}
      <div key={renderKey} className="bn-grid">
        {items.map((it, i) => (
          <BentoCard
            key={`${role}-${i}`}
            item={it}
            flagship={i === 0}
            delay={i * 55}
          />
        ))}
      </div>

      {/* CTA de pied de section */}
      <div className="bn-cta">
        <div className="bn-cta__txt">
          <span className="bn-cta__h">Envie de voir Vyzor sur vos propres chiffres&nbsp;?</span>
          <span className="bn-cta__p">Une démo de 30 minutes, sans engagement — on branche un de vos dossiers en direct.</span>
        </div>
        <button
          className="bn-cta__btn"
          onClick={() => window.open("https://calendly.com/admin-vyzor/30min", "_blank", "noopener")}
        >
          Réserver une démo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

Object.assign(window, { FeaturesBento, BentoSwitcher, BentoCard });
