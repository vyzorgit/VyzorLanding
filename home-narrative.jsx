// home-narrative.jsx — Sections propres à l'accueil (refonte du 17/11/2026).
// Source : document « Vyzor Pitches » du 16/11/2026 (brain/) — cible, problème, douleur,
// métaphore du GPS, solution, tagline. Le récit de la page : la douleur (HomePain),
// le déclic (HomeGps), la réponse (démo, trois réponses), puis le passage à l'acte.
// Même vocabulaire visuel que le reste de l'accueil : verre bleu nuit, filet or.

const VZ_HOME_CARD = {
  position: "relative", borderRadius: 20, overflow: "hidden", boxSizing: "border-box",
  background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)",
  border: "1px solid rgba(140,160,255,0.12)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.8)",
  padding: "28px 28px 30px", display: "flex", flexDirection: "column", gap: 12,
};
const VzHomeHairline = ({ color = "rgba(240,201,73,0.55)" }) => (
  <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 28, right: 28, height: 1, background: `linear-gradient(90deg, rgba(0,0,0,0), ${color}, rgba(0,0,0,0))` }} />
);

// —— 1. La douleur : ce que le dirigeant ressent, dans ses mots ——
const HomePain = ({ id = "constat", gold, muted }) => {
  const pains = [
    { t: "Chaque analyse se fait à la main.", d: "Exporter, croiser, mettre en forme : des heures de tableur pour répondre à une seule question." },
    { t: "Quand le temps manque, on tranche à l'instinct.", d: "Embaucher, investir, relancer un client : la décision tombe avant que l'analyse soit prête." },
    { t: "Un nouveau scénario, et vos outils restent muets.", d: "Le banquier demande un prévisionnel, un gros client paie en retard : votre logiciel comptable enregistre, il ne répond pas." },
  ];
  return (
    <section id={id} className="vz-hpain" style={{ position: "relative", marginBottom: 120 }}>
      <div style={{ maxWidth: 820, marginBottom: 44 }}>
        <h2 style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
          <span style={{ display: "block" }}>Vous avez les données.</span>{" "}
          <span style={{ display: "block", color: muted }}>Il vous manque l'analyse.</span>
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: muted, margin: "24px 0 0", maxWidth: 660, textWrap: "pretty" }}>
          Comptabilité, banque, factures : tout est là. Mais dans une PME, personne n'a le temps de croiser ces chiffres et d'en tirer une décision.
        </p>
      </div>
      <ol className="vz-hpain-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
        {pains.map((p, i) => (
          <li key={p.t} style={VZ_HOME_CARD}>
            <VzHomeHairline color="rgba(240,144,90,0.55)" />
            <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "#f3b48d" }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, lineHeight: 1.25, color: "#fff", letterSpacing: "-0.015em", textWrap: "balance" }}>{p.t}</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted, textWrap: "pretty" }}>{p.d}</p>
          </li>
        ))}
      </ol>
      <style>{`
        @media (max-width: 920px) { .vz-hpain .vz-hpain-grid { grid-template-columns: 1fr !important; } .vz-hpain h2 { font-size: 38px !important; } }
        @media (max-width: 560px) { .vz-hpain h2 { font-size: 32px !important; } }
      `}</style>
    </section>
  );
};

// —— 2. Le déclic : la carte papier et le GPS ——
const HomeGps = ({ id = "gps", gold, muted }) => {
  const map = [
    "Vous arrivez à destination, à condition de savoir la lire.",
    "Chaque calcul, c'est à vous de le faire.",
    "Le jour où la route change, elle ne vous prévient pas.",
  ];
  const gps = [
    "L'analyse vient à vous, déjà faite.",
    "Il voit les bouchons avant vous : trésorerie qui se tend, marge qui dérive, client en retard.",
    "Il recalcule l'itinéraire dès que la situation change.",
  ];
  const Col = ({ title, items, on }) => (
    <div style={{ ...VZ_HOME_CARD, padding: "30px 32px 32px", gap: 0, borderColor: on ? "rgba(240,201,73,0.32)" : "rgba(140,160,255,0.12)" }}>
      {on ? <VzHomeHairline /> : null}
      <span style={{ fontSize: 14, fontWeight: 600, color: on ? gold : muted }}>{title}</span>
      <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
        {items.map((it, i) => (
          <li key={it} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, padding: "14px 0", borderTop: i ? "1px solid rgba(255,255,255,0.08)" : "none", fontSize: 16, lineHeight: 1.5, color: on ? "#fff" : "rgba(255,255,255,0.62)" }}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={on ? gold : "rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3 }}>
              {on ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <path d="M6 12h12" />}
            </svg>
            <span style={{ textWrap: "pretty" }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section id={id} className="vz-hgps" style={{ position: "relative", marginBottom: 120 }}>
      <div style={{ maxWidth: 820, marginBottom: 44 }}>
        <h2 style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
          <span style={{ display: "block" }}>Aujourd'hui, vous pilotez avec une carte papier.</span>{" "}
          <span style={{ display: "block", color: gold }}>Vyzor est votre GPS.</span>
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: muted, margin: "24px 0 0", maxWidth: 660, textWrap: "pretty" }}>
          Votre façon de faire fonctionne. Mais vous pourriez arriver plus vite, avec moins d'effort et moins d'erreurs.
        </p>
      </div>
      <div className="vz-hgps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Col title="La carte papier : tableurs et exports" items={map} />
        <Col title="Le GPS : Vyzor" items={gps} on />
      </div>
      <style>{`
        @media (max-width: 920px) { .vz-hgps .vz-hgps-grid { grid-template-columns: 1fr !important; } .vz-hgps h2 { font-size: 38px !important; } }
        @media (max-width: 560px) { .vz-hgps h2 { font-size: 32px !important; } }
      `}</style>
    </section>
  );
};

// —— 3. Dernier appel ——
const HomeFinalCta = ({ gold, muted }) => {
  const places = (window.VZ_BETA && window.VZ_BETA.places) || 10;
  return (
    <section className="vz-final" style={{
      position: "relative", overflow: "hidden", textAlign: "center",
      margin: "120px 0 40px", padding: "72px clamp(20px, 5vw, 64px)", borderRadius: 28,
      background: "radial-gradient(ellipse 70% 90% at 50% 0%, #1a2656 0%, #0f1636 45%, #0a0f24 100%)",
      border: "1px solid rgba(140,160,255,0.18)",
    }}>
      <h2 style={{ position: "relative", margin: "0 auto", maxWidth: 820, fontSize: "clamp(32px, 4.4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, color: "#fff", textWrap: "balance" }}>
        Votre prochaine décision mérite mieux qu'une intuition.{" "}
        <span style={{ color: gold }}>Voyez-la sur vos chiffres, en 30 minutes.</span>
      </h2>
      <p style={{ position: "relative", margin: "22px auto 0", maxWidth: 580, fontSize: 17, lineHeight: 1.6, color: muted }}>
        {vzL({
          fr: `Bêta gratuite, ${places} places : on branche vos données avec vous, en visio, et vous repartez avec votre premier tableau de bord.`,
          en: `Free beta, ${places} spots: we connect your data with you over video, and you leave with your first dashboard.`,
        })}
      </p>
      <div style={{ position: "relative", marginTop: 32 }}>
        <VzCtaLink size="lg">Tester Vyzor sur mes chiffres</VzCtaLink>
      </div>
    </section>
  );
};

Object.assign(window, { HomePain, HomeGps, HomeFinalCta });
