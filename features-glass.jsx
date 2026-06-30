// features-glass.jsx — Section "Fonctionnalités" avec switcher de profil
//   • 3 personas : Comptable / DAF / Chef d'entreprise
//   • Switcher pill animé (indicateur magnétique, style liquid glass)
//   • Liste de features inspirée du composant CategoryList :
//       - cartes en glass qui s'agrandissent au hover (h: 88 → 124)
//       - corner brackets dorés qui apparaissent
//       - icône qui se révèle à droite
//       - bordure qui passe en or, ombre dorée
//   • Cross-fade entre profils (240ms), stagger sur les cartes (40ms)

(function injectFeaturesStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("features-glass-styles")) return;
  const s = document.createElement("style");
  s.id = "features-glass-styles";
  s.textContent = `
    @keyframes featRise {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .feat-card {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.08);
      background:
        linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      cursor: pointer;
      height: 88px;
      transition:
        height 360ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 320ms ease,
        box-shadow 320ms ease,
        background 320ms ease,
        transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
      will-change: height, transform;
    }
    .feat-card::before {
      content: "";
      position: absolute; inset: 0;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(255,255,255,0.06), transparent 45%);
      opacity: 0.7;
    }
    .feat-card:hover {
      height: 132px;
      border-color: rgba(240,201,73,0.42);
      background: linear-gradient(160deg, rgba(240,201,73,0.06), rgba(240,201,73,0.015));
      box-shadow:
        0 18px 40px -12px rgba(216,172,47,0.22),
        0 0 0 1px rgba(240,201,73,0.10) inset,
        0 1px 0 rgba(255,255,255,0.10) inset;
    }
    .feat-card__inner {
      position: relative;
      height: 100%;
      padding: 0 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      z-index: 1;
    }
    .feat-card__title {
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 500;
      font-size: 18px;
      letter-spacing: -0.01em;
      line-height: 1.2;
      color: rgba(255,255,255,0.95);
      transition: color 280ms ease;
    }
    .feat-card:hover .feat-card__title { color: #f0c949; }
    .feat-card__sub {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      margin-top: 0;
      font-size: 13.5px;
      line-height: 1.55;
      color: rgba(255,255,255,0.62);
      transition:
        max-height 360ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 280ms ease 60ms,
        margin-top 280ms ease;
      max-width: 540px;
    }
    .feat-card:hover .feat-card__sub {
      max-height: 60px;
      opacity: 1;
      margin-top: 6px;
    }
    .feat-card__chevron {
      width: 36px; height: 36px; border-radius: 999px;
      display: grid; place-items: center;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.03);
      color: rgba(255,255,255,0.55);
      flex-shrink: 0;
      transition:
        transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
        background 320ms ease,
        border-color 320ms ease,
        color 320ms ease;
    }
    .feat-card:hover .feat-card__chevron {
      transform: translateX(4px);
      background: linear-gradient(135deg, #f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      border-color: #f2d782;
      color: #1a1410;
      box-shadow: 0 6px 18px rgba(216,172,47,0.32), inset 0 1px 0 rgba(255,255,255,0.5);
    }

    /* Corner brackets — révélés au hover */
    .feat-bracket {
      position: absolute;
      width: 14px; height: 14px;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.7);
      transition: opacity 280ms ease 80ms, transform 280ms ease 80ms;
      z-index: 2;
    }
    .feat-card:hover .feat-bracket { opacity: 1; transform: scale(1); }
    .feat-bracket.tl { top: 10px; left: 10px; }
    .feat-bracket.br { bottom: 10px; right: 10px; }
    .feat-bracket::before, .feat-bracket::after {
      content: ""; position: absolute;
      background: #f0c949;
      box-shadow: 0 0 8px rgba(240,201,73,0.45);
    }
    .feat-bracket.tl::before { top: 0; left: 0; width: 12px; height: 1.5px; }
    .feat-bracket.tl::after  { top: 0; left: 0; width: 1.5px; height: 12px; }
    .feat-bracket.br::before { bottom: 0; right: 0; width: 12px; height: 1.5px; }
    .feat-bracket.br::after  { bottom: 0; right: 0; width: 1.5px; height: 12px; }

    /* Switcher pill */
    .feat-switch {
      position: relative;
      display: inline-flex;
      padding: 6px;
      border-radius: 999px;
      background: rgba(15,17,21,0.55);
      border: 1px solid rgba(255,255,255,0.10);
      backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%);
      box-shadow:
        0 12px 36px rgba(0,0,0,0.35),
        inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .feat-switch__pill {
      position: absolute;
      top: 6px;
      height: calc(100% - 12px);
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(240,201,73,0.14), rgba(240,201,73,0.06));
      border: 1px solid rgba(240,201,73,0.32);
      box-shadow:
        0 6px 18px rgba(216,172,47,0.18),
        inset 0 1px 0 rgba(255,255,255,0.08);
      transition:
        left 480ms cubic-bezier(0.22, 1, 0.36, 1),
        width 480ms cubic-bezier(0.22, 1, 0.36, 1);
      z-index: 0;
    }
    .feat-switch__btn {
      position: relative;
      z-index: 1;
      padding: 10px 22px;
      border: none; background: transparent; cursor: pointer;
      font-family: "Inter", system-ui, sans-serif;
      font-size: 13px; font-weight: 500;
      letter-spacing: 0.01em;
      color: rgba(255,255,255,0.55);
      border-radius: 999px;
      display: inline-flex; align-items: center; gap: 8px;
      transition: color 280ms ease;
      white-space: nowrap;
    }
    .feat-switch__btn:hover { color: rgba(255,255,255,0.85); }
    .feat-switch__btn.active { color: #f5e0a0; }
    .feat-switch__btn .feat-switch__dot {
      width: 5px; height: 5px; border-radius: 999px;
      background: rgba(255,255,255,0.25);
      transition: background 280ms ease, box-shadow 280ms ease;
    }
    .feat-switch__btn.active .feat-switch__dot {
      background: #f0c949;
      box-shadow: 0 0 10px #f0c949;
    }

    .feat-list-wrap {
      position: relative;
    }
    .feat-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .feat-list--in {
      animation: featRise 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @media (max-width: 720px) {
      .feat-card { height: 96px; }
      .feat-card:hover { height: 152px; }
      .feat-card__inner { padding: 0 18px; }
      .feat-card__title { font-size: 16px; }
    }
  `;
  document.head.appendChild(s);
})();

// ───────────────────────────────────────────────────────────────────
// Données : features par persona, en s'appuyant sur ce qu'on sait de Vyzor
//   (Passé / Présent / Futur · Vyzor Score · projections 90j · FEC, etc.)
// ───────────────────────────────────────────────────────────────────
const FEATURES_BY_ROLE = {
  comptable: {
    label: "Expert-Comptable",
    sub: "Cabinet d'expertise",
    headline: "Un diagnostic client,",
    accent: "livré en moins de 5 minutes.",
    intro:
      "Connectez Pennylane, MyUnisoft ou Odoo — ou importez un FEC. Vyzor calcule le Vyzor Score, génère le plan d'action et vous donne une vue cabinet sur tous vos dossiers.",
    items: [
      {
        title: "Multi-dossiers, vue cabinet consolidée",
        sub: "Tous vos clients, leur Vyzor Score, leurs alertes rouges, sur un seul écran. Switch dossier en un clic.",
      },
      {
        title: "Connexion comptable native ou import FEC/PDF",
        sub: "Pennylane, MyUnisoft, Odoo en automatique. Tiime arrive bientôt. Sinon, FEC ou PDF : le parser V2 fait le reste.",
      },
      {
        title: "États financiers détaillés, lignes comptables",
        sub: "Compte de résultat et bilan complets avec références FP, FQ, GA. La granularité dont vous avez besoin pour vérifier.",
      },
      {
        title: "Alertes proactives par dossier",
        sub: "EBE négatif, DSO qui dérape, runway critique : Vyzor remonte ce qui doit déclencher un appel à votre client.",
      },
      {
        title: "Assistant IA pour diagnostic rapide",
        sub: "« Pourquoi l'EBITDA est-il négatif ce trimestre ? » — réponse contextualisée sur les chiffres du dossier ouvert.",
      },
      {
        title: "Compte-rendu client par email, rédigé par l'IA",
        sub: "En un clic, l'IA rédige un compte-rendu à partir des KPI du dossier. Vous le relisez, l'ajustez, puis l'envoyez depuis votre propre messagerie — rapport PDF en pièce jointe.",
      },
      {
        title: "Budget prévisionnel vs réalisé",
        sub: "Importez le budget Excel de votre client par exercice et comparez le réel au budget, poste par poste — plus seulement N vs N-1.",
      },
    ],
  },
  daf: {
    label: "DAF",
    sub: "Direction financière",
    headline: "Le pilotage qu'on vous demandait,",
    accent: "sans le tableur du dimanche.",
    intro:
      "Tableaux de bord personnalisables, simulation What-If sur 7 scénarios, données live Pennylane synchronisées en continu. Le pack Excel devient un cockpit partageable.",
    items: [
      {
        title: "Tableaux de bord personnalisables",
        sub: "Création de valeur, investissement, financement, rentabilité, trésorerie — ou vos propres onglets. Drag & drop des widgets, choix du type de visualisation.",
      },
      {
        title: "Simulation What-If sur 7 scénarios",
        sub: "Embauche, hausse des prix, nouvel emprunt, perte d'un client majeur. Slider -30 % à +30 %, impact temps réel sur EBITDA, point mort, CAF, masse salariale.",
      },
      {
        title: "Données live Pennylane, synchronisées en continu",
        sub: "Sélecteur jour / semaine / mois / trimestre / année. Indicateur de sync, nombre d'écritures sur la période. Plus de gel à fin de mois.",
      },
      {
        title: "Bibliothèque complète de KPIs financiers",
        sub: "BFR, DSO, DPO, DIO, gearing, capacité de remboursement, runway, liquidité générale / réduite / immédiate. Tout est calculé, tout est filtrable.",
      },
      {
        title: "Recommandation stratégique IA + plan d'action",
        sub: "L'agent Vyzor génère un narratif et des actions concrètes — relance commerciale ciblée, optimisation BFR. Vous validez, vous exécutez.",
      },
      {
        title: "Compte-rendu financier par email, rédigé par l'IA",
        sub: "Depuis n'importe quel dashboard, générez un email contextuel sur les KPI affichés, choisissez le ton, puis envoyez-le depuis votre Gmail — rapport PDF joint, tracé dans vos « Envoyés ».",
      },
      {
        title: "Budget prévisionnel vs réalisé",
        sub: "Import du budget par exercice, comparaison poste par poste avec les mêmes formules de KPI. Bascule « N-1 ↔ Budget » sur les écrans KPI et la Synthèse.",
      },
      {
        title: "Trésorerie & cash-flow temps réel",
        sub: "Burn rate, cash-flow net, runway, projection à 30/60/90 jours et score de santé trésorerie. Connexion bancaire Bridge ou import Excel.",
      },
    ],
  },
  dirigeant: {
    label: "Chef d'entreprise",
    sub: "Dirigeant de PME",
    headline: "Vos chiffres, expliqués.",
    accent: "Vos décisions, éclairées.",
    intro:
      "Un Vyzor Score lisible en 10 secondes, des alertes qui appellent à l'action, un assistant IA qui répond en français à vos questions business. Pas de jargon, pas de tableau croisé.",
    items: [
      {
        title: "Vyzor Score sur 100, santé en un coup d'œil",
        sub: "Rentabilité, solvabilité, liquidité, efficacité — quatre sous-scores et un commentaire synthétique. Excellent, bon, moyen, faible : vous savez où vous en êtes.",
      },
      {
        title: "Simulation What-If pour vos décisions stratégiques",
        sub: "« Et si j'embauche ? » « Et si je perds mon plus gros client ? » Sept scénarios, slider de variation, impact immédiat sur 6 KPIs clés.",
      },
      {
        title: "Assistant IA en français, 20 questions / jour",
        sub: "Posez la question business du jour : leviers BFR, hausse de prix, comparaison vs an dernier. Réponse contextualisée sur vos chiffres réels.",
      },
      {
        title: "Alertes critiques + plan d'action IA",
        sub: "EBE négatif, trésorerie tendue : Vyzor remonte les risques et propose les actions concrètes à lancer ce mois-ci, priorisées et chiffrées.",
      },
      {
        title: "Cash temps réel via connexion bancaire",
        sub: "Open Banking PSD2 via Bridge ou import Excel : trésorerie nette, burn rate, runway, projection 30/60/90 jours et score de santé. Vous voyez vivre votre cash, pas une photo d'il y a trois mois.",
      },
      {
        title: "Compte-rendu par email en un clic",
        sub: "L'IA rédige votre compte-rendu financier à partir de vos KPI. Vous le relisez et l'envoyez depuis votre messagerie — ton au choix : professionnel, chaleureux ou concis, PDF joint.",
      },
      {
        title: "Budget prévisionnel vs réalisé",
        sub: "Importez votre budget de l'année et suivez l'écart au réel poste par poste. Une référence de comparaison bien plus parlante que le simple N-1.",
      },
    ],
  },
};

const ROLE_ORDER = ["comptable", "daf", "dirigeant"];

// —— Bandeau "Nouvelle fonctionnalité" — adaptation du BadgeGroup (modern / brand / leading)
// d'Untitled UI à l'esthétique liquid-glass dorée de Vyzor. Au clic → ouvre le formulaire.
const FeatureBadge = ({ gold = "#f0c949", href = "#beta" }) => {
  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
  return (
    <a
      href={href}
      data-contact
      className="vz-feature-badge"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        maxWidth: "100%",
        padding: "5px 16px 5px 5px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow:
          "0 10px 30px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.28)",
        textDecoration: "none",
        color: "rgba(255,255,255,0.92)",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        lineHeight: 1.2,
        transition:
          "border-color 220ms ease, background 220ms ease, transform 220ms ease, box-shadow 220ms ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,201,73,0.42)";
        e.currentTarget.style.background = "rgba(240,201,73,0.06)";
        e.currentTarget.style.transform = "translateY(-1px)";
        const a = e.currentTarget.querySelector(".vz-fb-arrow");
        if (a) a.style.transform = "translateX(3px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        const a = e.currentTarget.querySelector(".vz-fb-arrow");
        if (a) a.style.transform = "translateX(0)";
      }}
    >
      <span
        style={{
          flexShrink: 0,
          padding: "4px 11px",
          borderRadius: 999,
          backgroundImage: goldGrad,
          color: "#1a1410",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 8px rgba(216,172,47,0.35)",
        }}
      >
        Nouveauté
      </span>
      <span className="vz-fb-text">
        Le portefeuille client &amp; les comptes cabinet
      </span>
      <span
        className="vz-fb-arrow"
        aria-hidden="true"
        style={{
          flexShrink: 0,
          color: gold,
          fontSize: 15,
          transition: "transform 220ms ease",
        }}
      >
        →
      </span>
    </a>
  );
};

// Switcher segmenté avec pill magnétique
const FeatureSwitcher = ({ value, onChange }) => {
  const refs = React.useRef({});
  const trackRef = React.useRef(null);
  const [pill, setPill] = React.useState({ left: 6, width: 0 });

  React.useLayoutEffect(() => {
    const el = refs.current[value];
    const track = trackRef.current;
    if (el && track) {
      const r = el.getBoundingClientRect();
      const tr = track.getBoundingClientRect();
      setPill({ left: r.left - tr.left, width: r.width });
    }
  }, [value]);

  return (
    <div ref={trackRef} className="feat-switch" role="tablist" aria-label="Profil utilisateur">
      <div
        className="feat-switch__pill"
        style={{ left: pill.left, width: pill.width }}
        aria-hidden
      />
      {ROLE_ORDER.map((id) => {
        const r = FEATURES_BY_ROLE[id];
        const active = value === id;
        return (
          <button
            key={id}
            ref={(el) => { refs.current[id] = el; }}
            className={`feat-switch__btn ${active ? "active" : ""}`}
            onClick={() => onChange(id)}
            role="tab"
            aria-selected={active}
          >
            <span className="feat-switch__dot" />
            {r.label}
          </button>
        );
      })}
    </div>
  );
};

// Carte feature — inspirée du composant CategoryList partagé.
// Au clic → ouvre la modale de candidature (formulaire de contact).
const openVyzorContact = () => {
  window.dispatchEvent(new CustomEvent("vyzor:open-contact"));
};

const FeatureCard = ({ title, sub, delay = 0 }) => (
  <div
    className="feat-card"
    role="button"
    tabIndex={0}
    onClick={openVyzorContact}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openVyzorContact();
      }
    }}
    style={{
      animation: `featRise 460ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
    }}
  >
    <span className="feat-bracket tl" aria-hidden />
    <span className="feat-bracket br" aria-hidden />
    <div className="feat-card__inner">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="feat-card__title">{title}</div>
        <div className="feat-card__sub">{sub}</div>
      </div>
      <div className="feat-card__chevron" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

const FeaturesGlass = () => {
  const [role, setRole] = React.useState("dirigeant");
  const [renderKey, setRenderKey] = React.useState(0);

  // re-trigger l'animation lors du switch
  React.useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [role]);

  const data = FEATURES_BY_ROLE[role];
  const gold = "#f0c949";
  const muted = "rgba(255,255,255,0.55)";

  return (
    <section id="fonctionnalites" style={{ position: "relative", marginTop: 96, marginBottom: 96 }}>
      {/* Bandeau d'intro */}
      <div
        className="vz-features-head"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <div style={{ marginBottom: 22 }}>
            <FeatureBadge gold={gold} />
          </div>
          <h2
            key={`headline-${renderKey}`}
            style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontSize: "clamp(36px, 4.4vw, 56px)",
              margin: 0,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#fff",
              animation: "featRise 420ms cubic-bezier(0.22, 1, 0.36, 1) both",
            }}
          >
            {data.headline}{" "}
            <span style={{ color: "rgba(255,255,255,0.45)" }}>{data.accent}</span>
          </h2>
          <p
            key={`intro-${renderKey}`}
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: muted,
              maxWidth: 560,
              marginTop: 18,
              marginBottom: 0,
              animation: "featRise 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both",
            }}
          >
            {data.intro}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 12,
          }}
        >
          <FeatureSwitcher value={role} onChange={setRole} />
        </div>
      </div>

      {/* Liste des cartes — re-mount à chaque changement de rôle pour rejouer le stagger */}
      <div className="feat-list-wrap">
        <div key={renderKey} className="feat-list">
          {data.items.map((it, i) => (
            <FeatureCard
              key={`${role}-${i}`}
              title={it.title}
              sub={it.sub}
              delay={i * 50}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

Object.assign(window, { FeaturesGlass, FeatureSwitcher, FeatureCard, FeatureBadge, FEATURES_BY_ROLE });
