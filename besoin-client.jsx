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

const VZ_GOLD_GRAD = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
const VZ_EMBER = "#f0905a";
const VZ_EMBER_SOFT = "rgba(240,144,90,0.12)";
const VZ_EMBER_LINE = "rgba(240,144,90,0.30)";
const VZ_CARD_BG = "linear-gradient(150deg, #11141b, #0c0d11)";
const VZ_CARD_H = 480; // hauteur fixe identique pour les deux faces

// —— Carte retournable (flip 3D) ——
const PainFlipCard = ({ persona, gold, text, muted, subtle, initialFlipped = false }) => {
  const [flipped, setFlipped] = React.useState(initialFlipped);
  const p = persona;

  const faceBase = {
    position: "absolute", inset: 0,
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    borderRadius: 24, overflow: "hidden",
    background: VZ_CARD_BG,
    border: `1px solid ${subtle}`, borderTop: `1px solid ${VZ_EMBER_LINE}`,
    boxShadow: "0 30px 70px -34px rgba(0,0,0,0.85)",
    display: "flex", flexDirection: "column",
  };

  return (
    <div
      className="vz-flip"
      style={{ position: "relative", height: VZ_CARD_H, perspective: 2000, cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      aria-label={`${p.tab} — voir ce qui le bloque`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((v) => !v); } }}
    >
      <div className="vz-flip-inner" style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 700ms cubic-bezier(0.4,0.0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* ——— FACE AVANT : le coup au cœur ——— */}
        <div style={{ ...faceBase, transform: "rotateY(0deg)", padding: "38px 38px 30px" }}>
          <span aria-hidden="true" style={{
            position: "absolute", top: -80, right: -60, width: 260, height: 260, borderRadius: "50%",
            background: `radial-gradient(circle, ${VZ_EMBER_SOFT}, transparent 62%)`, pointerEvents: "none",
          }}/>

          {/* En-tête profil */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              width: 48, height: 48, borderRadius: 13, flexShrink: 0,
              display: "grid", placeItems: "center",
              backgroundImage: VZ_GOLD_GRAD, color: "#111",
              boxShadow: "0 8px 20px rgba(216,172,47,0.28), inset 0 1px 0 rgba(255,255,255,0.45)",
            }}>{p.icon}</span>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700, color: gold, marginBottom: 3 }}>{p.tab}</div>
              <div style={{ fontSize: 13, color: muted }}>{p.role}</div>
            </div>
          </div>

          {/* Sa phrase intérieure — centrée, dominante */}
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 64, lineHeight: 0, color: VZ_EMBER_LINE, display: "block", height: 30,
            }} aria-hidden="true">“</span>
            <p style={{
              fontSize: 29, lineHeight: 1.32, margin: "16px 0 0", letterSpacing: "-0.02em",
              fontWeight: 500, color: text, fontStyle: "italic",
            }}>{p.quote}</p>
          </div>

          {/* Indice de retournement */}
          <div className="vz-flip-hint" style={{
            display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start",
            padding: "9px 15px", borderRadius: 999,
            background: VZ_EMBER_SOFT, border: `1px solid ${VZ_EMBER_LINE}`,
            fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: VZ_EMBER,
            transition: "background 220ms ease",
          }}>
            Ce qui le bloque vraiment
            <svg className="vz-flip-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transition: "transform 220ms ease" }}>
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </div>
        </div>

        {/* ——— FACE ARRIÈRE : les frictions concrètes ——— */}
        <div style={{
          ...faceBase, transform: "rotateY(180deg)", padding: "30px 36px 28px",
          background: "linear-gradient(150deg, #14110d, #0c0d11)",
          borderTop: `1px solid ${VZ_EMBER_LINE}`,
        }}>
          <span aria-hidden="true" style={{
            position: "absolute", top: -90, left: -50, width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${VZ_EMBER_SOFT}, transparent 60%)`, pointerEvents: "none",
          }}/>

          {/* mini en-tête : on sait de qui on parle */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{
              width: 30, height: 30, borderRadius: 9, flexShrink: 0,
              display: "grid", placeItems: "center",
              background: VZ_EMBER_SOFT, color: VZ_EMBER, border: `1px solid ${VZ_EMBER_LINE}`,
            }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: VZ_EMBER }}>
              Ce qui bloque le {p.short}
            </span>
          </div>

          {/* Frictions */}
          <ul style={{ position: "relative", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", flex: 1 }}>
            {p.pains.map((pain, k) => (
              <li key={pain.ask} style={{
                display: "flex", gap: 13, padding: "13px 0",
                borderBottom: k < p.pains.length - 1 ? `1px solid ${subtle}` : "none",
              }}>
                <span aria-hidden="true" style={{
                  flexShrink: 0, marginTop: 6, width: 8, height: 8, borderRadius: "50%",
                  background: VZ_EMBER, boxShadow: `0 0 0 4px ${VZ_EMBER_SOFT}`,
                }}/>
                <span>
                  <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: text, letterSpacing: "-0.01em" }}>{pain.ask}</span>
                  <span style={{ display: "block", fontSize: 13, lineHeight: 1.45, color: muted, marginTop: 2, textWrap: "pretty" }}>{pain.hurt}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Coût du statu quo */}
          <div style={{
            position: "relative", marginTop: 16,
            display: "flex", gap: 12, alignItems: "flex-start",
            padding: "13px 16px", borderRadius: 13,
            background: VZ_EMBER_SOFT, border: `1px solid ${VZ_EMBER_LINE}`,
          }}>
            <span aria-hidden="true" style={{ flexShrink: 0, color: VZ_EMBER, marginTop: 1 }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
              </svg>
            </span>
            <p style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0, color: text, textWrap: "pretty" }}>{p.cost}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const BesoinClientSection = ({ id = "constat", gold, text, muted, subtle }) => {
  const personas = [
    {
      tab: "Dirigeant / CEO",
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
      cost: "Le coût du flou : des économies bien réelles qui dorment dans ses chiffres — et un ROI qu'il ne voit jamais venir.",
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

  return (
    <section id={id} className="vz-constat" style={{ position: "relative", marginBottom: 120 }}>
      {/* En-tête éditorial — nomme la douleur PARTAGÉE */}
      <div className="vz-constat-header" style={{ maxWidth: 820, marginBottom: 48 }}>
        <h2 style={{
          fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.05, textWrap: "balance",
        }}>
          La donnée ne manque pas.{" "}
          <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>Le temps d'en tirer de l'argent, si.</span>
        </h2>

        <p style={{ fontSize: 18, lineHeight: 1.6, color: muted, marginTop: 22, maxWidth: 720, textWrap: "pretty" }}>
          Dirigeant ou expert-comptable, c'est la <span style={{ color: text }}>même frustration</span> : tout est dans les chiffres,
          mais les transformer en décisions qui rapportent demande des heures que personne n'a.
        </p>
      </div>

      {/* Deux mondes côte à côte — cartes retournables */}
      <div className="vz-constat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {personas.map((p) => (
          <PainFlipCard key={p.tab} persona={p} gold={gold} text={text} muted={muted} subtle={subtle} />
        ))}
      </div>

      {/* Passerelle vers « trois temps » */}
      <div className="vz-constat-bridge" style={{
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
        marginTop: 26, padding: "22px 26px", borderRadius: 16,
        background: "rgba(240,201,73,0.05)", border: `1px solid rgba(240,201,73,0.18)`,
      }}>
        <span style={{
          flexShrink: 0, width: 42, height: 42, borderRadius: "50%",
          display: "grid", placeItems: "center",
          backgroundImage: VZ_GOLD_GRAD, color: "#111", fontSize: 19, lineHeight: 1, fontWeight: 700,
          boxShadow: "0 8px 20px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
        }} aria-hidden="true">↓</span>
        <p style={{ fontSize: 16.5, lineHeight: 1.5, margin: 0, color: text, letterSpacing: "-0.01em", flex: "1 1 320px" }}>
          Une seule frustration, deux métiers. <span style={{ color: gold, fontWeight: 600 }}>La réponse tient en trois temps</span> — on vous montre.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="#produit" style={{
            padding: "12px 18px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            border: `1px solid ${subtle}`, color: text, textDecoration: "none",
            transition: "border-color 200ms ease, color 200ms ease",
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(240,201,73,0.4)"; e.currentTarget.style.color = gold; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = subtle; e.currentTarget.style.color = text; }}
          >Voir la méthode</a>
          <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "12px 20px", borderRadius: 999,
            border: "1px solid #f2d782", backgroundImage: VZ_GOLD_GRAD,
            color: "#111", fontWeight: 600, fontSize: 14, textDecoration: "none",
            boxShadow: "0 10px 24px rgba(216,172,47,0.28), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}>
            Rejoindre la bêta
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Réglages */}
      <style>{`
        .vz-constat .vz-flip:hover .vz-flip-hint { background: rgba(240,144,90,0.20); }
        .vz-constat .vz-flip:hover .vz-flip-arrow { transform: translateX(3px); }
        @media (max-width: 920px) {
          .vz-constat .vz-constat-grid { grid-template-columns: 1fr !important; }
          .vz-constat .vz-constat-header h2 { font-size: 38px !important; }
        }
        @media (max-width: 560px) {
          .vz-constat .vz-constat-header h2 { font-size: 32px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vz-constat .vz-flip-inner { transition: none !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { BesoinClientSection, PainFlipCard });
