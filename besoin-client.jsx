// besoin-client.jsx — Section « Le constat » : la DOULEUR que Vyzor traite.
// Première section après le hero. Objectif : qu'un dirigeant OU un expert-comptable
// comprenne en un coup d'œil à quelle frustration on répond.
//
// UX : deux mondes côte à côte (Dirigeant | Cabinet) sous forme de cartes 3D
// retournables. La FACE AVANT délivre le coup au cœur (profil + la phrase qu'il
// se dit vraiment). Au survol — ou au tap sur mobile — la carte se retourne et
// révèle les 3 frictions concrètes + le coût du statu quo.
// Ton : direct ET empathique. Douleur pure — le soulagement vient ensuite.
//
// Vocabulaire fidèle : or/noir, glass. Accent « friction » = ambre chaud (ember).

const VZ_GOLD_GRAD = "linear-gradient(#f0c949,#f0c949)";
const VZ_EMBER = "#f0905a";
const VZ_EMBER_SOFT = "rgba(240,144,90,0.12)";
const VZ_EMBER_LINE = "rgba(240,144,90,0.30)";
const VZ_CARD_BG = "linear-gradient(150deg, #11141b, #0c0d11)";

// —— Carte retournable (flip 3D) ——
const PainFlipCard = ({ persona, gold, text, muted, subtle }) => {
  const [flipped, setFlipped] = React.useState(false);
  const p = persona;
  const face = {
    position: "relative", gridArea: "1 / 1", minHeight: "var(--vz-card-h, 400px)", boxSizing: "border-box",
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    borderRadius: 20, overflow: "hidden",
    background: "linear-gradient(180deg, #11141d 0%, #0b0d14 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.8)",
    display: "flex", flexDirection: "column", padding: "30px 32px 26px",
  };
  const Hairline = () => (
    <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 32, right: 32, height: 1, background: "linear-gradient(90deg, rgba(240,201,73,0), rgba(240,201,73,0.55), rgba(240,201,73,0))" }} />
  );
  const Head = ({ right }) => (
    <header style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center",
        color: gold, background: "rgba(240,201,73,0.06)", border: "1px solid rgba(240,201,73,0.22)",
      }}>{p.icon}</span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{p.tab}</span>
        <span style={{ fontSize: 13, color: muted }}>{p.role}</span>
      </span>
      {right}
    </header>
  );
  const fade = (on) => ({ opacity: on ? 1 : 0, transition: "opacity 0s linear 350ms" });
  return (
    <div className="vz-flip"
      style={{ position: "relative", minHeight: "var(--vz-card-h, 400px)", display: "grid", perspective: 2000, cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}
    >
      <div className="vz-flip-inner" style={{
        position: "relative", width: "100%", display: "grid", transformStyle: "preserve-3d",
        transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "none",
      }}>
        {/* Face avant */}
        <div style={{ ...face, ...fade(!flipped) }}>
          <Hairline />
          <Head />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px 0" }}>
            <span aria-hidden="true" style={{ display: "block", width: 28, height: 2, borderRadius: 2, background: gold, marginBottom: 22 }} />
            <p style={{
              margin: 0, fontSize: "clamp(28px, 2.9vw, 36px)", lineHeight: 1.22, fontWeight: 500, letterSpacing: "-0.03em",
              color: "#fff", textWrap: "pretty",
            }}>{p.quote}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 18, borderTop: `1px solid ${subtle}` }}>
            <span style={{ fontSize: 14, color: text, fontWeight: 500 }}>Ce qui le bloque vraiment</span>
            <span className="vz-flip-arrow" aria-hidden="true" style={{
              width: 36, height: 36, borderRadius: 999, display: "grid", placeItems: "center",
              border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontSize: 15,
              transition: "border-color 200ms ease, color 200ms ease, transform 200ms ease",
            }}>→</span>
          </div>
        </div>
        {/* Face arrière */}
        <div style={{ ...face, transform: "rotateY(180deg)", ...fade(flipped) }}>
          <Hairline />
          <Head />
          <ol style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "flex", flexDirection: "column", flex: 1 }}>
            {p.pains.map((pain, k) => (
              <li key={pain.ask} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 12, padding: "12px 0", borderTop: `1px solid ${subtle}` }}>
                <span style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: gold, paddingTop: 2 }}>{String(k + 1).padStart(2, "0")}</span>
                <span>
                  <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-0.005em" }}>{pain.ask}</span>
                  <span style={{ display: "block", fontSize: 13.5, lineHeight: 1.5, color: muted, marginTop: 3, textWrap: "pretty" }}>{pain.hurt}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* Commande : bouton réel, ne porte que le libellé d'action ; les deux faces restent lisibles */}
      <button type="button" className="vz-flip-btn" aria-expanded={flipped}
        onClick={() => setFlipped((v) => !v)}
        style={{
          position: "absolute", inset: 0, zIndex: 2, width: "100%", height: "100%",
          background: "transparent", border: 0, padding: 0, margin: 0, borderRadius: 20,
          cursor: "pointer", color: "transparent", fontSize: 0,
        }}
      >
        <span style={{
          position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden",
          clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0, fontSize: 14,
        }}>{flipped ? "Voir la citation" : "Voir les frictions"}</span>
      </button>
    </div>
  );
};

const VZ_PERSONAS = [
  {
    tab: "Dirigeant",
    role: "Dirigeant de PME",
    short: "dirigeant",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/>
        <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/>
      </svg>
    ),
    quote: "Je perds de l'argent quelque part. Je ne sais juste pas où.",
    pains: [
      { ask: "Où part vraiment mon argent ?", hurt: "Impossible de voir ses plus gros postes de dépense sans y passer des soirées dans des tableurs." },
      { ask: "Est-ce que mon modèle gagne assez ?", hurt: "Marges, rentabilité, business model — personne ne lui dit clairement où gagner plus." },
      { ask: "Quels leviers je laisse passer ?", hurt: "Sa fiscalité, il la subit. Les économies réelles restent invisibles, mois après mois." },
    ],
    cost: "Le coût du flou : des économies qui dorment dans ses chiffres, et des retards clients qu'il ne voit pas venir. En France, ils privent les PME et TPE d'environ 13 milliards d'euros de trésorerie (Banque de France, 2025).",
  },
  {
    tab: "Expert-comptable",
    role: "Cabinet & expert-comptable",
    short: "cabinet",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16v5H4z"/>
        <path d="M4 13h7v7H4z"/>
        <path d="M15 13h5v7h-5z"/>
      </svg>
    ),
    quote: "Mes clients attendent du conseil. Je n'ai le temps que pour la conformité.",
    pains: [
      { ask: "Le réglementaire mange tout.", hurt: "Aucune marge pour l'analyse à valeur ajoutée — le travail à fort impact passe à la trappe." },
      { ask: "En période de bilan, je suis submergé.", hurt: "La relation client passe toujours en dernier, au pire moment pour elle." },
      { ask: "Expliquer, relancer, échanger…", hurt: "Des heures perdues dossier par dossier — du temps de conseil jamais facturé." },
    ],
    cost: "Le coût du flou : des heures de conseil — donc du chiffre d'affaires — qui partent en saisie et en relances.",
  },
];

// —— Constat d'une cible : la phrase (gauche) et ses trois frictions + le coût (droite) ——
const PainSplit = ({ persona: p, gold, text, muted, subtle }) => {
  const card = {
    position: "relative", borderRadius: 20, overflow: "hidden", boxSizing: "border-box",
    background: "linear-gradient(180deg, #11141d 0%, #0b0d14 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.8)",
    display: "flex", flexDirection: "column", padding: "30px 32px 28px",
  };
  const Hairline = () => (
    <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 32, right: 32, height: 1, background: "linear-gradient(90deg, rgba(240,201,73,0), rgba(240,201,73,0.55), rgba(240,201,73,0))" }} />
  );
  return (
    <div className="vz-constat-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: 20 }}>
      <div style={card}>
        <Hairline />
        <header style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", color: gold, background: "rgba(240,201,73,0.06)", border: "1px solid rgba(240,201,73,0.22)" }}>{p.icon}</span>
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{p.tab}</span>
            <span style={{ fontSize: 13, color: muted }}>{p.role}</span>
          </span>
        </header>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 0 12px" }}>
          <span aria-hidden="true" style={{ display: "block", width: 28, height: 2, borderRadius: 2, background: gold, marginBottom: 22 }} />
          <p style={{ margin: 0, fontSize: "clamp(28px, 2.9vw, 36px)", lineHeight: 1.22, fontWeight: 500, letterSpacing: "-0.03em", color: "#fff", textWrap: "pretty" }}>« {p.quote} »</p>
        </div>
      </div>
      <div style={card}>
        <Hairline />
        <span style={{ fontSize: 14, fontWeight: 600, color: text }}>Ce qui le bloque vraiment</span>
        <ol style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column" }}>
          {p.pains.map((pain, k) => (
            <li key={pain.ask} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 12, padding: "14px 0", borderTop: `1px solid ${subtle}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: gold, paddingTop: 2 }}>{String(k + 1).padStart(2, "0")}</span>
              <span>
                <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-0.005em" }}>{pain.ask}</span>
                <span style={{ display: "block", fontSize: 14, lineHeight: 1.55, color: muted, marginTop: 4, textWrap: "pretty" }}>{pain.hurt}</span>
              </span>
            </li>
          ))}
        </ol>
        <p style={{ margin: "auto 0 0", paddingTop: 18, borderTop: `1px solid ${subtle}`, fontSize: 14.5, lineHeight: 1.55, color: "#f3b48d", textWrap: "pretty" }}>{p.cost}</p>
      </div>
    </div>
  );
};

const BesoinClientSection = ({ id = "constat", gold, text, muted, subtle, audience = "dirigeant", showBridge = true }) => {
  const personas = VZ_PERSONAS;

  return (
    <section id={id} className="vz-constat" style={{ position: "relative", marginBottom: 120 }}>
      {/* En-tête éditorial — nomme la douleur PARTAGÉE */}
      <div className="vz-constat-header" style={{ maxWidth: 820, marginBottom: 48 }}>
        <h2 style={{
          fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08,
        }}>
          <span style={{ display: "block" }}>Vous pilotez au rétroviseur.</span>{" "}
          <span style={{ display: "block", color: muted }}>Vyzor vous rend le pare-brise.</span>
        </h2>

        <p style={{ fontSize: 18, lineHeight: 1.65, color: muted, marginTop: 24, maxWidth: 640, textWrap: "pretty" }}>
          Bilan annuel, tableurs, reporting à J+30{"\u00a0"}: la plupart des PME décident sur des données déjà dépassées.
          Vyzor actualise vos indicateurs en continu pour <span style={{ color: text }}>anticiper la trésorerie, protéger vos marges et arbitrer au bon moment</span>.
        </p>
      </div>

      {/* Une cible par page (refonte 27/10/2026) : la phrase qu'il se dit, puis ce qui le bloque, visibles d'emblée */}
      <PainSplit persona={personas.find((p) => p.short === (audience === "cabinet" ? "cabinet" : "dirigeant"))} gold={gold} text={text} muted={muted} subtle={subtle} />

      {/* Passerelle vers l'offre */}
      {showBridge ? <div className="vz-constat-bridge" style={{
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
        marginTop: 26, padding: "22px 26px", borderRadius: 16,
        background: "rgba(240,201,73,0.05)", border: `1px solid rgba(240,201,73,0.18)`,
      }}>
        <span style={{
          flexShrink: 0, width: 42, height: 42, borderRadius: "50%",
          display: "grid", placeItems: "center",
          backgroundImage: VZ_GOLD_GRAD, color: "#111", fontSize: 19, lineHeight: 1, fontWeight: 700,
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }} aria-hidden="true">↓</span>
        <p style={{ fontSize: 16.5, lineHeight: 1.5, margin: 0, color: text, letterSpacing: "-0.01em", flex: "1 1 320px" }}>
          Ces questions ont une réponse, <span style={{ color: gold, fontWeight: 600 }}>et elle est déjà dans votre comptabilité</span>. Vyzor la met sous vos yeux, chaque semaine.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="#produit" style={{
            padding: "12px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            border: `1px solid ${subtle}`, color: text, textDecoration: "none",
            transition: "border-color 200ms ease, color 200ms ease",
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(240,201,73,0.4)"; e.currentTarget.style.color = gold; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = subtle; e.currentTarget.style.color = text; }}
          >Revoir la démo</a>
          <a href="/?contact=1#beta" data-contact style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "12px 20px", borderRadius: 999,
            backgroundImage: VZ_GOLD_GRAD,
            color: "#111", fontWeight: 600, fontSize: 14, textDecoration: "none",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}>
            Réserver ma place
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div> : null}

      {/* Réglages */}
      <style>{`
        .vz-constat { --vz-card-h: 400px; }
        @media (max-width: 1100px) { .vz-constat { --vz-card-h: 440px; } }
        @media (max-width: 920px) { .vz-constat { --vz-card-h: 400px; } }
        .vz-constat .vz-flip-btn:focus-visible { outline: 2px solid #f0c949; outline-offset: 3px; }
        .vz-constat .vz-flip:hover .vz-flip-arrow, .vz-constat .vz-flip:focus-within .vz-flip-arrow { border-color: rgba(240,201,73,0.5); color: #f0c949; }
        @media (prefers-reduced-motion: reduce) { .vz-constat .vz-flip-inner { transition: none !important; } }
        @media (max-width: 920px) {
          .vz-constat .vz-constat-grid { grid-template-columns: 1fr !important; }
          .vz-constat .vz-constat-header h2 { font-size: 38px !important; }
        }
        @media (max-width: 560px) {
          .vz-constat .vz-constat-header h2 { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { BesoinClientSection, PainFlipCard, PainSplit, VZ_PERSONAS });
