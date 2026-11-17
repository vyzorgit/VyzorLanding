// home-narrative.jsx — Sections de l'accueil (refonte du 17/11/2026, validée par Antoine).
// Phrases reprises du document « Vyzor Pitches » (brain/) : douleur, métaphore du GPS,
// fonctionnalité clé, script du rendez-vous, ligne rouge « l'IA ne fait jamais les calculs ».
// Cinq blocs, une seule action : tester Vyzor sur ses chiffres.

const VZH = { gold: "#f0c949", muted: "rgba(255,255,255,0.58)", line: "rgba(255,255,255,0.08)" };

// —— Schéma : la carte papier et le GPS ——
// Carte papier : rues denses, obstacles partout, un trajet qui serpente et des points d'interrogation.
// GPS : la même ville estompée, obstacles signalés, une seule route nette de A à B.
const VZ_GPS_OBSTACLES = [[80, 150], [160, 190], [240, 190], [240, 150], [160, 70], [80, 70], [280, 190]];
const GpsSchema = () => {
  const xs = [40, 80, 120, 160, 200, 240, 280, 320], ys = [30, 70, 110, 150, 190, 230];
  const streets = (op) => (
    <g stroke={`rgba(255,255,255,${op})`} strokeWidth="7" strokeLinecap="round" fill="none">
      {xs.map((x) => <path key={"x" + x} d={`M${x} 30 V230`} />)}
      {ys.map((y) => <path key={"y" + y} d={`M40 ${y} H320`} />)}
    </g>
  );
  const obstacle = (x, y, gps) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
      <rect x="-10" y="-10" width="20" height="20" rx="5" fill={gps ? "rgba(255,255,255,0.05)" : "rgba(251,113,133,0.2)"} stroke={gps ? "rgba(255,255,255,0.14)" : "#fb7185"} strokeWidth="1.3" />
      <path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke={gps ? "rgba(255,255,255,0.25)" : "#fb7185"} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
  const pin = (x, y, label, color) => (
    <g>
      <circle cx={x} cy={y} r="11" fill={color} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0d1430">{label}</text>
    </g>
  );
  const ask = (x, y) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" fill="#141c40" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
      <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.8)">?</text>
    </g>
  );
  const Panel = ({ gps }) => (
    <figure style={{ margin: 0, borderRadius: 18, padding: "18px 18px 16px", background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: `1px solid ${gps ? "rgba(240,201,73,0.32)" : "rgba(140,160,255,0.12)"}` }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: gps ? VZH.gold : VZH.muted, marginBottom: 10 }}>
        {gps ? "Le GPS : Vyzor" : "La carte papier : tableurs et exports"}
      </div>
      <svg viewBox="0 0 360 260" width="100%" role="img" aria-label={gps ? "Avec Vyzor, une seule route claire de A à B, les obstacles sont signalés" : "Sur la carte papier, un trajet sinueux entre de nombreux obstacles"} style={{ display: "block" }}>
        <rect x="0" y="0" width="360" height="260" rx="12" fill={gps ? "rgba(240,201,73,0.03)" : "rgba(255,255,255,0.015)"} />
        {streets(gps ? 0.05 : 0.11)}
        {VZ_GPS_OBSTACLES.map(([x, y]) => obstacle(x, y, gps))}
        {gps ? (
          <g>
            <path d="M40 230 V46 Q40 30 56 30 H320" fill="none" stroke="rgba(240,201,73,0.25)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 230 V46 Q40 30 56 30 H320" fill="none" stroke={VZH.gold} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <g transform="translate(180 54)">
              <rect x="-50" y="-11" width="100" height="22" rx="11" fill={VZH.gold} />
              <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0d1430">Meilleure route</text>
            </g>
            <g transform="translate(232 120)">
              <rect x="-100" y="-12" width="200" height="24" rx="12" fill="#141c40" stroke="#fb7185" strokeWidth="1" />
              <text y="4" textAnchor="middle" fontSize="11" fill="#fff">Trésorerie tendue en mars : signalée</text>
            </g>
          </g>
        ) : (
          <g>
            <path d="M40 230 V190 H120 V230 H200 V150 H120 V110 H200 V70 H280 V110 H320 V30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="7 5" />
            {ask(120, 170)}{ask(200, 130)}{ask(280, 90)}
          </g>
        )}
        {pin(40, 230, "A", "rgba(255,255,255,0.85)")}
        {pin(320, 30, "B", gps ? VZH.gold : "rgba(255,255,255,0.85)")}
      </svg>
      <figcaption style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, color: gps ? "#fff" : VZH.muted }}>
        {gps ? "Il repère les obstacles, fait les calculs et vous indique la meilleure route." : "Des détours, des calculs à refaire, et des obstacles découverts en chemin."}
      </figcaption>
    </figure>
  );
  return (
    <div className="vz-gps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <Panel />
      <Panel gps />
    </div>
  );
};

// —— 2. La douleur, et la métaphore ——
const HomePain = ({ id = "constat" }) => (
  <section id={id} className="vz-hpain" style={{ position: "relative", marginBottom: 120 }}>
    <div style={{ maxWidth: 860, marginBottom: 40 }}>
      <h2 style={{ fontSize: 48, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.1, textWrap: "balance" }}>
        <span style={{ display: "block" }}>Chaque analyse se construit à la main et prend des heures.</span>{" "}
        <span style={{ display: "block", color: VZH.muted }}>Quand le temps manque ou qu'un nouveau scénario se présente, vos outils n'ont pas de réponse.</span>
      </h2>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: VZH.muted, margin: "26px 0 0", maxWidth: 700, textWrap: "pretty" }}>
        Piloter une entreprise avec des tableurs revient à naviguer avec une carte papier : on atteint sa destination, à condition de savoir la lire. Mais le jour où la route change, la carte ne vous prévient pas.{" "}
        <span style={{ color: "#fff", fontWeight: 600 }}>Vyzor est le GPS de vos finances.</span>
      </p>
    </div>
    <GpsSchema />
    <style>{`
      @media (max-width: 920px) { .vz-hpain .vz-gps-grid { grid-template-columns: 1fr !important; } .vz-hpain h2 { font-size: 34px !important; } }
      @media (max-width: 560px) { .vz-hpain h2 { font-size: 28px !important; } }
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
        Décrivez ce dont vous avez besoin. Vyzor collecte vos données, les analyse et compose la page en quelques secondes, prête à exporter ou à personnaliser.
      </p>
    </div>
    <GenUiDemo />
    <style>{`
      @media (max-width: 920px) { .vz-hdemo h2 { font-size: 34px !important; } }
      @media (max-width: 560px) { .vz-hdemo h2 { font-size: 28px !important; } }
    `}</style>
  </section>
);

// —— Preuve : ce qu'en disent les directeurs financiers qui testent Vyzor (extraits fidèles des verbatims) ——
const HomeProof = () => {
  const items = [
    { q: "Une solution comme Vyzor a énormément de sens pour les PME.", name: "Benoit Gros", role: "Directeur financier externalisé, CoPilot Performance", photo: "/verbatim-benoit-gros.png", url: "https://www.linkedin.com/in/benoitgrosdafexternalise/" },
    { q: "Vyzor permet aux PME […] de bénéficier d'une visibilité beaucoup plus fréquente sur leurs indicateurs clés.", name: "Alexis Duquesne", role: "Directeur financier de transition", photo: "/verbatim-alexis-duquesne.png", url: "https://www.linkedin.com/in/alexisduquesne/" },
  ];
  return (
    <section className="vz-hproof" aria-label="Témoignages" style={{ marginBottom: 28 }}>
      <div className="vz-hproof-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {items.map((t) => (
          <figure key={t.name} style={{ margin: 0, padding: "22px 24px", borderRadius: 18, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(140,160,255,0.12)", display: "flex", flexDirection: "column", gap: 16 }}>
            <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#fff", letterSpacing: "-0.01em", textWrap: "pretty" }}>« {t.q} »</blockquote>
            <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
              <img src={t.photo} alt="" width="40" height="40" loading="lazy" style={{ width: 40, height: 40, borderRadius: 99, objectFit: "cover", flexShrink: 0 }} />
              <span style={{ display: "flex", flexDirection: "column" }}>
                <a href={t.url} target="_blank" rel="noopener" style={{ fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.name}</a>
                <span style={{ fontSize: 12.5, color: VZH.muted }}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <style>{`@media (max-width: 860px) { .vz-hproof .vz-hproof-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

// —— 4. Comment tester : trois étapes sur une ligne ——
const HomeSteps = ({ id = "comment" }) => {
  const steps = [
    { t: "Vous créez votre compte", d: "En deux minutes, pendant le rendez-vous." },
    { t: "On connecte vos données", d: "Pennylane en lecture seule, ou un export FEC." },
    { t: "Votre tableau de bord, en direct", d: "Construit devant vous, selon vos besoins." },
  ];
  return (
    <section id={id} className="vz-hsteps" style={{
      position: "relative", marginBottom: 40, padding: "34px clamp(20px, 4vw, 40px)", borderRadius: 22,
      background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: "1px solid rgba(140,160,255,0.14)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>Testez Vyzor en 30 minutes, avec nous.</h2>
        <span style={{ fontSize: 14, color: VZH.muted }}>En visio · gratuit pendant la bêta · l'IA ne fait jamais les calculs</span>
      </div>
      <ol className="vz-hsteps-row" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, position: "relative" }}>
        {steps.map((s, i) => (
          <li key={s.t} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14, alignItems: "start" }}>
            <span style={{ width: 40, height: 40, borderRadius: 99, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 15, color: "#0d1430", background: VZH.gold }}>{i + 1}</span>
            <span>
              <span style={{ display: "block", fontSize: 16.5, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{s.t}</span>
              <span style={{ display: "block", fontSize: 14, lineHeight: 1.5, color: VZH.muted, marginTop: 4 }}>{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
      <style>{`@media (max-width: 860px) { .vz-hsteps .vz-hsteps-row { grid-template-columns: 1fr !important; gap: 18px !important; } }`}</style>
    </section>
  );
};

// —— 5. Dernier appel ——
const HomeFinalCta = () => (
  <section className="vz-final" style={{
    position: "relative", overflow: "hidden", textAlign: "center",
    margin: "0 0 40px", padding: "72px clamp(20px, 5vw, 64px)", borderRadius: 28,
    background: "radial-gradient(ellipse 70% 90% at 50% 0%, #1a2656 0%, #0f1636 45%, #0a0f24 100%)",
    border: "1px solid rgba(140,160,255,0.18)",
  }}>
    <h2 style={{ position: "relative", margin: "0 auto", maxWidth: 820, fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", textWrap: "balance" }}>
      Quelle décision devez-vous prendre ce mois-ci ?{" "}
      <span style={{ color: VZH.gold }}>Posez la question à Vyzor, sur vos propres chiffres.</span>
    </h2>
    <p style={{ position: "relative", margin: "22px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: VZH.muted }}>
      En 30 minutes, vous repartez avec votre premier tableau de bord. Gratuit pendant la bêta.
    </p>
    <div style={{ position: "relative", marginTop: 32 }}>
      <VzCtaLink size="lg">Tester Vyzor sur mes chiffres</VzCtaLink>
    </div>
  </section>
);

Object.assign(window, { HomePain, HomeDemo, HomeProof, HomeSteps, HomeFinalCta, GpsSchema });
