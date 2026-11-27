// home-narrative.jsx — Sections de l'accueil (refonte du 17/11/2026, validée par Antoine).
// Phrases reprises du document « Vyzor Pitches » (brain/) : douleur,
// fonctionnalité clé, script du rendez-vous, ligne rouge « l'IA ne fait jamais les calculs ».
// Cinq blocs, une seule action : analyser ses données avec son équipe financière.

const VZH = { gold: "#f0c949", muted: "rgba(255,255,255,0.58)", line: "rgba(255,255,255,0.08)" };

// —— 2. Le constat, et ce que vous obtenez : une équipe, des spécialistes ——
const HomePain = ({ id = "constat" }) => (
  <section id={id} className="vz-hpain" style={{ position: "relative", marginBottom: 96 }}>
    <div style={{ maxWidth: 780 }}>
      <h2 style={{ fontSize: 40, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.12, textWrap: "balance" }}>
        Les grands groupes ont une équipe financière.{" "}
        <span style={{ color: VZH.gold }}>Votre PME aussi, désormais.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.6, color: VZH.muted, margin: "18px 0 0", textWrap: "pretty" }}>
        Un directeur financier et ses spécialistes : chacun dans son domaine, tous sur vos chiffres.
      </p>
    </div>
    <ul className="vz-hroles" style={{ listStyle: "none", margin: "32px 0 0", padding: 0 }}>
      {(window.VZ_FEATURES || []).filter((f) => f.role).map((f) => (
        <li key={f.slug}>
          <a href={vzFeatureHref(f.slug)} className={"vz-hrole" + (f.slug === "conseil" ? " lead" : "")}>
            <span className="vz-hrole-ic"><VzfIcon name={f.icon} size={18} /></span>
            <span className="vz-hrole-t">{f.name}</span>
            <span className="vz-hrole-go" aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
    <style>{`
      .vz-hroles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
      .vz-hroles li { display: flex; min-width: 0; }
      .vz-hroles li:first-child { grid-row: span 2; }
      .vz-hrole.lead { flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 28px; padding: 22px; border-color: rgba(240,201,73,0.32); background: linear-gradient(180deg, #19214a 0%, #0d1330 100%); }
      .vz-hrole.lead .vz-hrole-ic { width: 46px; height: 46px; border-radius: 13px; }
      .vz-hrole.lead .vz-hrole-t { flex: 0; font-size: 19px; line-height: 1.25; letter-spacing: -0.015em; max-width: 7.5em; }
      .vz-hrole.lead .vz-hrole-go { display: none; }
      .vz-hrole { flex: 1; display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-radius: 16px; text-decoration: none; background: linear-gradient(180deg, #121a3a 0%, #0b1026 100%); border: 1px solid rgba(140,160,255,0.14); transition: border-color 200ms ease, transform 200ms ease; }
      .vz-hrole:hover, .vz-hrole:focus-visible { border-color: rgba(240,201,73,0.45); transform: translateY(-2px); }
      .vz-hrole-ic { flex-shrink: 0; width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; color: #f0c949; background: rgba(240,201,73,0.08); border: 1px solid rgba(240,201,73,0.24); }
      .vz-hrole-t { flex: 1; min-width: 0; font-size: 16px; font-weight: 600; color: #fff; }
      .vz-hrole-go { color: rgba(255,255,255,0.35); transition: color 200ms ease, transform 200ms ease; }
      .vz-hrole:hover .vz-hrole-go { color: #f0c949; transform: translateX(3px); }
      @media (prefers-reduced-motion: reduce) { .vz-hrole, .vz-hrole-go { transition: none; } .vz-hrole:hover { transform: none; } }
      @media (max-width: 920px) { .vz-hpain h2 { font-size: 32px !important; } .vz-hroles { grid-template-columns: repeat(2, minmax(0, 1fr)); } .vz-hroles li:first-child { grid-row: auto; grid-column: 1 / -1; } .vz-hrole.lead { flex-direction: row; align-items: center; justify-content: flex-start; gap: 12px; padding: 16px 18px; } .vz-hrole.lead .vz-hrole-t { flex: 1; max-width: none; font-size: 16px; } .vz-hrole.lead .vz-hrole-ic { width: 38px; height: 38px; } .vz-hrole.lead .vz-hrole-go { display: inline; } }
      @media (max-width: 560px) { .vz-hpain h2 { font-size: 25px !important; } .vz-hpain p { font-size: 16px !important; } .vz-hroles { gap: 8px; margin-top: 24px !important; } .vz-hrole:not(.lead) { gap: 9px; padding: 10px; border-radius: 14px; } .vz-hrole:not(.lead) .vz-hrole-ic { width: 30px; height: 30px; border-radius: 9px; } .vz-hrole:not(.lead) .vz-hrole-t { font-size: 13.5px; line-height: 1.3; } .vz-hrole:not(.lead) .vz-hrole-go { display: none; } .vz-hrole.lead { padding: 14px 16px; } }
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
