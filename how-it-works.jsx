// how-it-works.jsx — Section « Comment ça marche » (refonte du 27/10/2026).
// Rôle : faire tomber le délai et l'effort perçus (équation de valeur de Hormozi).
// Trois étapes, même vocabulaire visuel que les cartes du constat : verre sombre, or.

const HowItWorksSection = ({ id = "comment", gold, text, muted, subtle }) => {
  const steps = [
    {
      title: "Connectez Pennylane",
      body: "Accès en lecture seule : Vyzor ne modifie jamais rien. Pas sous Pennylane ? Un export FEC suffit, on s'en occupe avec vous.",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 7H6a4 4 0 0 0 0 8h3"/><path d="M15 7h3a4 4 0 0 1 0 8h-3"/><path d="M8 11h8"/>
        </svg>
      ),
    },
    {
      title: "Vyzor analyse",
      body: "Plus de 35 indicateurs, votre score de santé financière et vos alertes, calculés dès la première synchronisation.",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 14 4-4 3 3 5-6"/>
        </svg>
      ),
    },
    {
      title: "Vous savez quoi faire",
      body: "Vos priorités classées par impact en euros, et un assistant qui répond à vos questions en français, chiffres à l'appui.",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>
        </svg>
      ),
    },
  ];

  return (
    <section id={id} className="vz-how" style={{ position: "relative", marginBottom: 120 }}>
      <div style={{ maxWidth: 820, marginBottom: 44 }}>
        <h2 style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
          <span style={{ display: "block" }}>Opérationnel en quelques minutes.</span>{" "}
          <span style={{ display: "block", color: muted }}>Sans ressaisie, sans tableur.</span>
        </h2>
      </div>

      <ol className="vz-how-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {steps.map((st, i) => (
          <li key={st.title} style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            background: "linear-gradient(180deg, #11141d 0%, #0b0d14 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.8)",
            padding: "28px 28px 30px", display: "flex", flexDirection: "column", gap: 16,
          }}>
            <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 28, right: 28, height: 1, background: "linear-gradient(90deg, rgba(240,201,73,0), rgba(240,201,73,0.55), rgba(240,201,73,0))" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                width: 44, height: 44, borderRadius: 12, display: "grid", placeItems: "center",
                color: gold, background: "rgba(240,201,73,0.06)", border: "1px solid rgba(240,201,73,0.22)",
              }}>{st.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: gold }}>
                Étape {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{st.title}</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted, textWrap: "pretty" }}>{st.body}</p>
          </li>
        ))}
      </ol>

      <style>{`
        @media (max-width: 920px) {
          .vz-how .vz-how-grid { grid-template-columns: 1fr !important; }
          .vz-how h2 { font-size: 38px !important; }
        }
        @media (max-width: 560px) {
          .vz-how h2 { font-size: 32px !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { HowItWorksSection });
