// home-narrative.jsx — Sections de l'accueil (refonte du 17/11/2026, validée par Antoine).
// Phrases reprises du document « Vyzor Pitches » (brain/) : douleur,
// fonctionnalité clé, script du rendez-vous, ligne rouge « l'IA ne fait jamais les calculs ».
// Cinq blocs, une seule action : analyser ses données avec son équipe financière.

const VZH = { gold: "#f0c949", muted: "rgba(255,255,255,0.58)", line: "rgba(255,255,255,0.08)" };

// —— 2. Le constat, et ce que vous obtenez : une équipe, des spécialistes ——
const VZH_ROLES = [
  { t: "L'analyste", d: "Marges, rentabilité, budget.", ic: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  { t: "Le trésorier", d: "Encaissements, prévisions, relances.", ic: <g><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></g> },
  { t: "Le juriste", d: "Documents officiels, droit des sociétés.", ic: <g><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></g> },
  { t: "Le fiscaliste", d: "TVA, impôts, échéances.", ic: <g><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 19h0" /></g> },
];
const HomePain = ({ id = "constat" }) => (
  <section id={id} className="vz-hpain" style={{ position: "relative", marginBottom: 96 }}>
    <div style={{ maxWidth: 780 }}>
      <h2 style={{ fontSize: 40, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.12, textWrap: "balance" }}>
        Les grands groupes ont une équipe financière.{" "}
        <span style={{ color: VZH.gold }}>Votre PME aussi, désormais.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.6, color: VZH.muted, margin: "18px 0 0", textWrap: "pretty" }}>
        Un analyste, un trésorier, un juriste, un fiscaliste : chacun spécialiste, tous sur vos chiffres.
      </p>
    </div>
    <ul className="vz-hroles" style={{ listStyle: "none", margin: "32px 0 0", padding: 0, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
      {VZH_ROLES.map((r) => (
        <li key={r.t} style={{ padding: "18px 18px 20px", borderRadius: 16, background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: "1px solid rgba(140,160,255,0.14)" }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", background: "rgba(240,201,73,0.08)", border: "1px solid rgba(240,201,73,0.24)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c949" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{r.ic}</svg>
          </span>
          <span style={{ display: "block", marginTop: 14, fontSize: 16, fontWeight: 600, color: "#fff" }}>{r.t}</span>
          <span style={{ display: "block", marginTop: 4, fontSize: 14, lineHeight: 1.5, color: VZH.muted }}>{r.d}</span>
        </li>
      ))}
    </ul>
    <style>{`
      @media (max-width: 920px) { .vz-hpain h2 { font-size: 32px !important; } .vz-hroles { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      @media (max-width: 560px) { .vz-hpain h2 { font-size: 25px !important; } .vz-hpain p { font-size: 16px !important; } .vz-hroles { gap: 10px !important; } .vz-hroles li { padding: 14px !important; } }
    `}</style>
  </section>
);

// —— 3. La preuve : la génération d'une page ——
const HomeDemo = ({ id = "produit" }) => (
  <section id={id} className="vz-hdemo" style={{ position: "relative", marginBottom: 120 }}>
    <div style={{ maxWidth: 820, marginBottom: 36 }}>
      <h2 style={{ fontSize: 48, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.1 }}>
        <span style={{ display: "block" }}>Une phrase.</span>{" "}
        <span style={{ display: "block", color: VZH.gold }}>Un tableau de bord sur mesure.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: VZH.muted, margin: "22px 0 0", maxWidth: 680, textWrap: "pretty" }}>
        Demandez à votre équipe financière les indicateurs dont vous avez besoin : votre tableau de bord se construit en temps réel, avec les actions à mener, dans votre boîte mail chaque matin.
      </p>
    </div>
    <div style={{ maxWidth: 920, margin: "0 auto" }}><GenUiVideo /></div>
    <style>{`
      @media (max-width: 920px) { .vz-hdemo h2 { font-size: 34px !important; } }
      @media (max-width: 560px) { .vz-hdemo h2 { font-size: 26px !important; } .vz-hdemo p { font-size: 16px !important; } }
    `}</style>
  </section>
);

// —— Preuve : ce qu'en disent les directeurs financiers qui testent Vyzor (extraits fidèles des verbatims) ——
const HomeProof = () => {
  const items = [
    { q: "Une solution comme Vyzor a énormément de sens pour les PME.", name: "Benoit Gros", role: "Directeur financier externalisé", photo: "/verbatim-benoit-gros.png", url: "https://www.linkedin.com/in/benoitgrosdafexternalise/" },
    { q: "Vyzor permet aux PME […] de bénéficier d'une visibilité beaucoup plus fréquente sur leurs indicateurs clés.", name: "Alexis Duquesne", role: "Directeur financier de transition", photo: "/verbatim-alexis-duquesne.png", url: "https://www.linkedin.com/in/alexisduquesne/" },
  ];
  return (
    <section className="vz-hproof" aria-label="Témoignages" style={{ marginBottom: 72 }}>
      <div className="vz-hproof-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {items.map((t) => (
          <figure key={t.name} style={{ margin: 0, padding: "20px 22px", borderRadius: 16, background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: "1px solid rgba(140,160,255,0.14)", display: "flex", flexDirection: "column", gap: 14 }}>
            <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#fff", textWrap: "pretty" }}>
              <span aria-hidden="true" style={{ color: VZH.gold, fontWeight: 700, marginRight: 4 }}>«</span>{t.q}<span aria-hidden="true" style={{ color: VZH.gold, fontWeight: 700, marginLeft: 4 }}>»</span>
            </blockquote>
            <figcaption style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
              <img src={t.photo} alt="" width="32" height="32" loading="lazy" style={{ width: 32, height: 32, borderRadius: 99, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ minWidth: 0, lineHeight: 1.3 }}>
                <a className="vz-hproof-name" href={t.url} target="_blank" rel="noopener" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.name}</a>
                <div className="vz-hproof-role" style={{ fontSize: 12, color: VZH.muted }}>{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <style>{`@media (max-width: 640px) {
        .vz-hproof .vz-hproof-grid { gap: 8px !important; }
        .vz-hproof figure { padding: 12px !important; gap: 10px !important; border-radius: 12px !important; }
        .vz-hproof blockquote { font-size: 12.5px !important; line-height: 1.45 !important; }
        .vz-hproof img { display: none; }
        .vz-hproof-name { font-size: 12px !important; min-height: 0 !important; padding: 0 !important; display: block !important; }
        .vz-hproof-role { font-size: 10.5px !important; }
      }`}</style>
    </section>
  );
};

// —— 4. Comment tester : trois étapes sur une ligne ——
const HomeSteps = ({ id = "comment" }) => {
  const steps = [
    { t: "Créer votre compte", d: "En quelques secondes, pendant le rendez-vous." },
    { t: "Connecter vos données", d: "Pennylane en lecture seule, ou un export FEC." },
    { t: "Construire votre tableau de bord", d: "Vos indicateurs, selon vos besoins." },
  ];
  return (
    <section id={id} className="vz-hsteps" style={{ position: "relative", marginBottom: 56 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>Obtenez votre équipe financière en quelques secondes.</h2>
      </div>
      <ol className="vz-hsteps-row" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {steps.map((s, i) => (
          <li key={s.t} className="vz-hstep" style={{ display: "grid", gridTemplateColumns: "30px 1fr", gap: 10, alignItems: "start" }}>
            <span style={{ width: 30, height: 30, borderRadius: 99, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13.5, color: "#0d1430", background: VZH.gold }}>{i + 1}</span>
            <span>
              <span className="vz-hstep-t" style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{s.t}</span>
              <span className="vz-hstep-d" style={{ display: "block", fontSize: 13, lineHeight: 1.45, color: VZH.muted, marginTop: 3 }}>{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
      <style>{`@media (max-width: 640px) {
        .vz-hsteps h2 { font-size: 18px !important; }
        .vz-hsteps-sub { font-size: 12px !important; }
        .vz-hsteps .vz-hsteps-row { gap: 8px !important; }
        .vz-hstep { grid-template-columns: 1fr !important; justify-items: center; text-align: center; gap: 6px !important; }
        .vz-hstep-t { font-size: 12.5px !important; }
        .vz-hstep-d { display: none !important; }
      }`}</style>
    </section>
  );
};

// —— 5. Dernier appel ——
const HomeFinalCta = () => (
  <section className="vz-final" style={{
    position: "relative", overflow: "hidden", textAlign: "center",
    margin: "0 0 40px", padding: "52px clamp(20px, 5vw, 56px)", borderRadius: 24,
    background: "radial-gradient(ellipse 70% 90% at 50% 0%, #1a2656 0%, #0f1636 45%, #0a0f24 100%)",
    border: "1px solid rgba(140,160,255,0.18)",
  }}>
    <h2 style={{ position: "relative", margin: "0 auto", maxWidth: 820, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, color: "#fff", textWrap: "balance" }}>
      Vos chiffres ont des réponses.{" "}
      <span style={{ color: VZH.gold }}>Votre équipe financière les trouve.</span>
    </h2>
    <p style={{ position: "relative", margin: "22px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: VZH.muted }}>
      Votre premier tableau de bord, prêt en quelques secondes.
    </p>
    <div style={{ position: "relative", marginTop: 32 }}>
      <VzCtaLink>Construisez votre tableau de bord sur mesure</VzCtaLink>
    </div>
  </section>
);

Object.assign(window, { HomePain, HomeDemo, HomeProof, HomeSteps, HomeFinalCta });
