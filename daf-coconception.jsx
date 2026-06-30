// daf-coconception.jsx — Section "Conçu avec des DAF"
//   Message : Vyzor est façonné avec un panel de DAF qui testent l'outil
//   et remontent leurs retours sur les fonctionnalités.
//   Vocabulaire visuel identique au reste de la page :
//   or #f0c949, panneau verre, titres Inter (toute la section est en Inter).

// —— "Lux" des cartes verbatim : bordure dorée animée (glow) + halo en bloom.
//    Structure CardCanvas/Card : .card-backdrop (surface sombre) + 4 .border-element
//    (une bordure conique nette + 3 copies floutées qui forment le halo) + .card-content.
(function injectVerbatimGlowStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("vz-verbatim-glow-styles")) return;
  const style = document.createElement("style");
  style.id = "vz-verbatim-glow-styles";
  style.textContent = `
    @property --vzg-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

    .vz-verbatim-card.card-canvas {
      position: relative;
      border-radius: 20px;
      isolation: isolate;
      display: block;
      transition: transform 280ms cubic-bezier(.22,1,.36,1);
    }
    .vz-verbatim-card .card-backdrop {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        radial-gradient(130% 90% at 50% -10%, rgba(240,201,73,0.05), transparent 55%),
        linear-gradient(150deg, #101218 0%, #0b0c10 100%);
      z-index: 0;
      transition: background 320ms ease;
    }
    .vz-verbatim-card .glow-card {
      position: relative;
      border-radius: inherit;
      height: 100%;
      z-index: 1;
    }
    .vz-verbatim-card .border-element {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      pointer-events: none;
      background: conic-gradient(from var(--vzg-angle) at 50% 50%,
        rgba(240,201,73,0)    0deg,
        rgba(240,201,73,0)    72deg,
        rgba(249,224,138,0.7) 112deg,
        #fff3c8               136deg,
        rgba(249,224,138,0.7) 160deg,
        rgba(240,201,73,0)    200deg,
        rgba(240,201,73,0)    360deg);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      animation: vzg-spin 6.5s linear infinite;
    }
    /* La bordure nette + 3 copies floutées = halo en bloom autour du comète doré */
    .vz-verbatim-card .border-left   { z-index: 4; }
    .vz-verbatim-card .border-right  { z-index: 3; filter: blur(2px);  opacity: 0.85; }
    .vz-verbatim-card .border-top    { z-index: 2; filter: blur(7px);  opacity: 0.6; }
    .vz-verbatim-card .border-bottom { z-index: 1; filter: blur(15px); opacity: 0.45; }

    .vz-verbatim-card .card-content {
      position: relative;
      z-index: 5;
      border-radius: inherit;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 34px 34px 28px;
    }

    .vz-verbatim-card:hover { transform: translateY(-4px); }
    .vz-verbatim-card:hover .border-element { animation-duration: 3.2s; }
    .vz-verbatim-card:hover .card-backdrop {
      background:
        radial-gradient(130% 90% at 50% -10%, rgba(240,201,73,0.11), transparent 55%),
        linear-gradient(150deg, #13151d 0%, #0b0c10 100%);
    }
    .vz-verbatim-card:hover .vz-verbatim-li { color: #fff !important; background: #0a66c2 !important; }

    @keyframes vzg-spin { to { --vzg-angle: 360deg; } }

    @media (prefers-reduced-motion: reduce) {
      .vz-verbatim-card .border-element { animation: none !important; --vzg-angle: 130deg; }
    }
  `;
  document.head.appendChild(style);
})();

const DAFCoConception = () => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const subtle = "rgba(255,255,255,0.08)";
  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
  const sans = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

  // La boucle de co-conception
  const loop = [
    {
      n: "01",
      t: "On leur fait tester l'outil",
      d: "Chaque DAF du panel a un accès complet et travaille sur ses propres chiffres, en conditions réelles.",
    },
    {
      n: "02",
      t: "On recueille leurs retours",
      d: "Échanges réguliers, sessions de revue et remontées fonctionnalité par fonctionnalité — ce qui manque, ce qui gêne, ce qui aide.",
    },
    {
      n: "03",
      t: "On intègre au produit",
      d: "Les retours qui font consensus passent en roadmap et reviennent en test au sprint suivant. La boucle recommence.",
    },
  ];

  // Verbatims — retours réels du panel. Cliquer ouvre le profil LinkedIn.
  const verbatims = [
    {
      q: "Une solution comme Vyzor a énormément de sens pour les PME. Partir du FEC, le seul format vraiment auditable, et l'exploiter proprement : c'est exactement ce dont un DAF a besoin pour gagner du temps dès l'onboarding.",
      name: "Benoit Gros",
      role: "DAF externalisé & Corporate Finance Advisor · CoPilot Performance",
      initials: "BG",
      photo: "verbatim-benoit-gros.png",
      linkedin: "https://www.linkedin.com/in/benoitgrosdafexternalise/",
    },
    {
      q: "Après avoir piloté la performance financière au sein de grands groupes, je mesure à quel point l'accès à une information fiable et régulièrement actualisée est déterminant pour prendre les bonnes décisions. Vyzor permet aux PME et aux entreprises en croissance de bénéficier d'une visibilité beaucoup plus fréquente sur leurs indicateurs clés, sans attendre les reportings comptables trimestriels ou semestriels.",
      name: "Alexis Duquesne",
      role: "Director Financial Planning & Analysis — CFO · Manager de Transition",
      initials: "AD",
      photo: "verbatim-alexis-duquesne.png",
      linkedin: "https://www.linkedin.com/in/alexisduquesne/",
    },
  ];

  return (
    <section id="co-conception" style={{ position: "relative", marginBottom: 112 }}>
      {/* Header — éditorial */}
      <div className="vz-daf-header" style={{ marginBottom: 44 }}>
        <h2 style={{
          fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.02,
          textWrap: "balance",
        }}>
          Conçu avec des experts de la finance.{" "}
          <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>Pas seulement pour eux.</span>
        </h2>
      </div>

      {/* Corps — la boucle de co-conception, en flux horizontal */}
      <div className="vz-daf-panel" style={{
        background: "linear-gradient(140deg, #0e1015, #0c0d11)",
        border: `1px solid ${subtle}`, borderTop: `1px solid rgba(240,201,73,0.20)`,
        borderRadius: 20, overflow: "hidden", position: "relative",
        padding: "44px 48px",
      }}>
        {/* halo doré discret */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(60% 90% at 50% -10%, rgba(240,201,73,0.07), transparent 60%)",
        }} />

        <div className="vz-daf-loop-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          position: "relative", zIndex: 1,
        }}>
          {/* rail horizontal reliant les 3 étapes */}
          <div aria-hidden="true" className="vz-daf-rail" style={{
            position: "absolute", top: 27, left: "16.66%", right: "16.66%", height: 1,
            background: "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(240,201,73,0.45), rgba(255,255,255,0.06))",
          }} />
          {loop.map((s, i) => (
            <div key={s.n} className="vz-daf-step" style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              padding: i === 0 ? "0 32px 0 0" : i === loop.length - 1 ? "0 0 0 32px" : "0 32px",
              borderLeft: i === 0 ? "none" : `1px solid ${subtle}`,
              position: "relative",
            }}>
              <span style={{
                width: 54, height: 54, flexShrink: 0, borderRadius: 999,
                display: "grid", placeItems: "center",
                fontFamily: sans, fontSize: 15, fontWeight: 700,
                color: "#111", background: goldGrad,
                border: "1px solid #f2d782",
                boxShadow: "0 8px 22px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
                marginBottom: 22, position: "relative", zIndex: 1,
              }}>{s.n}</span>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: text, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Verbatims — retours réels du panel · cliquables vers LinkedIn */}
      <div className="vz-daf-verbatims" style={{ marginTop: 56 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 26,
        }}>
          <span style={{
            fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 700, color: gold,
          }}>Ce qu'ils en disent</span>
          <span aria-hidden="true" style={{
            flex: 1, height: 1, background: subtle,
          }} />
        </div>

        <div className="vz-verbatim-grid" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(verbatims.length, 2)}, 1fr)`,
          gap: 20,
        }}>
          {verbatims.map((v) => (
            <a
              key={v.name}
              href={v.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title={`Voir le profil LinkedIn de ${v.name}`}
              className="vz-verbatim-card card-canvas"
              style={{ textDecoration: "none", color: text, display: "block", height: "100%" }}
            >
              <span className="card-backdrop" aria-hidden="true" />
              <span className="glow-card">
                <span className="border-element border-left" aria-hidden="true" />
                <span className="border-element border-right" aria-hidden="true" />
                <span className="border-element border-top" aria-hidden="true" />
                <span className="border-element border-bottom" aria-hidden="true" />
                <div className="card-content">

              {/* Guillemet ouvrant décoratif */}
              <span aria-hidden="true" style={{
                fontFamily: '"Georgia", serif', fontSize: 72, lineHeight: 0.7,
                color: "rgba(240,201,73,0.28)", fontWeight: 700,
                display: "block", marginBottom: 8,
              }}>“</span>

              <p style={{
                margin: 0, fontSize: 18, lineHeight: 1.62, color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.01em", position: "relative", zIndex: 1,
                textWrap: "pretty", flex: 1, fontWeight: 400,
              }}>{v.q}</p>

              <div style={{
                display: "flex", alignItems: "center", gap: 14, marginTop: 28,
                paddingTop: 22, borderTop: `1px solid ${subtle}`,
              }}>
                {v.photo ? (
                  <img
                    src={v.photo}
                    alt={v.name}
                    width="44"
                    height="44"
                    loading="lazy"
                    style={{
                      width: 44, height: 44, flexShrink: 0, borderRadius: 999,
                      objectFit: "cover", display: "block",
                      border: "1px solid rgba(240,201,73,0.45)",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.45)",
                    }}
                  />
                ) : (
                  <span style={{
                    width: 44, height: 44, flexShrink: 0, borderRadius: 999,
                    display: "grid", placeItems: "center",
                    fontFamily: sans, fontSize: 14, fontWeight: 700, color: "#111",
                    background: goldGrad, border: "1px solid #f2d782",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
                  }}>{v.initials}</span>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: text, letterSpacing: "-0.005em" }}>{v.name}</div>
                  <div style={{ fontSize: 12.5, color: muted, marginTop: 2, lineHeight: 1.4 }}>{v.role}</div>
                </div>
                {/* Badge LinkedIn — vire au bleu LinkedIn au survol */}
                <span className="vz-verbatim-li" style={{
                  display: "flex", alignItems: "center", gap: 7, flexShrink: 0,
                  padding: "6px 12px 6px 9px", borderRadius: 999,
                  fontSize: 12, fontWeight: 600,
                  color: "#0a66c2", background: "rgba(10,102,194,0.12)",
                  transition: "color 220ms ease, background 220ms ease",
                }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
                  </svg>
                  Profil
                </span>
              </div>
                </div>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { DAFCoConception });
