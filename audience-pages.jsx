// audience-pages.jsx — Pages par cible (refonte du 27/10/2026).
//   • /pennylane : la page vers laquelle pointent la prospection et le SEO « Pennylane ».
//   • /cabinets  : le canal experts-comptables (objectif : qu'un cabinet présente un client bêta).
// Réutilise les sections de l'accueil ; seul le discours change.

const VzPageHero = ({ title, accent, lede, cta, note }) => (
  <header className="pg-hero vz-reveal in" style={{ marginBottom: 120 }}>
    <h1 className="pg-title">{title} <em>{accent}</em></h1>
    <p className="pg-lede">{lede}</p>
    <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
      <VzCtaLink size="lg">{cta}</VzCtaLink>
      <a href="/agentic-twin" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", padding: "15px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.92)", fontSize: 15.5, fontWeight: 500, textDecoration: "none" }}>Voir la démo</a>
      <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>{note}</span>
    </div>
  </header>
);

const VzCompare = ({ left, right, gold, muted }) => {
  const col = (c, strong) => (
    <div style={{
      position: "relative", borderRadius: 20, padding: "28px 30px 30px",
      background: strong ? "linear-gradient(180deg, #16204a 0%, #0c1230 100%)" : "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)",
      border: strong ? "1px solid rgba(240,201,73,0.3)" : "1px solid rgba(140,160,255,0.12)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: strong ? gold : muted, marginBottom: 6 }}>{c.kicker}</div>
      <h3 style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{c.title}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {c.items.map((it) => (
          <li key={it} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5, color: strong ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.62)" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={strong ? gold : "rgba(255,255,255,0.4)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}><path d="m5 12 5 5 9-10"/></svg>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="vz-compare" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {col(left, false)}
      {col(right, true)}
      <style>{`@media (max-width: 860px) { .vz-compare { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};

const VzSectionHead = ({ a, b, muted }) => (
  <div style={{ maxWidth: 820, marginBottom: 40 }}>
    <h2 className="vz-sec-h2" style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
      <span style={{ display: "block" }}>{a}</span>{" "}
      <span style={{ display: "block", color: muted }}>{b}</span>
    </h2>
    <style>{`@media (max-width: 920px) { .vz-sec-h2 { font-size: 38px !important; } } @media (max-width: 560px) { .vz-sec-h2 { font-size: 32px !important; } }`}</style>
  </div>
);

// —— /pennylane ——
const PennylanePageBody = ({ gold, text, muted, subtle }) => (
  <React.Fragment>
    <VzPageHero
      title="Pennylane tient vos comptes."
      accent="Vyzor vous dit quoi en faire."
      lede="Avec Pennylane, vos données sont propres et à jour. Il manque la lecture. Vyzor s'y connecte en lecture seule et transforme vos écritures en réponses : où part votre argent, ce qu'il vous restera dans 12 mois, quoi faire en premier."
      cta="Réserver ma place dans la bêta"
      note={`Gratuit · ${(window.VZ_BETA && window.VZ_BETA.places) || 10} places · connecté en quelques minutes`}
    />
    <div className="vz-page-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>
      <section className="vz-reveal" style={{ marginBottom: 120 }}>
        <VzSectionHead a="Votre comptabilité est prête." b="Vos décisions, pas encore." muted={muted} />
        <VzCompare gold={gold} muted={muted}
          left={{ kicker: "Ce que vous avez déjà", title: "Pennylane", items: [
            "Votre comptabilité tenue et à jour",
            "Factures et justificatifs centralisés",
            "Le travail de votre cabinet, au même endroit",
          ] }}
          right={{ kicker: "Ce que Vyzor ajoute", title: "Vyzor, branché sur Pennylane", items: [
            "Vos marges et vos coûts lus poste par poste, avec ce qui dérive",
            "Votre trésorerie projetée à 12 mois, point bas daté",
            "Des alertes classées par impact en euros, avec l'action à mener",
            "Un assistant qui répond à vos questions en français, chiffres et sources à l'appui",
          ] }}
        />
      </section>
      <div className="vz-reveal"><OutcomesSection id="resultats" gold={gold} muted={muted} /></div>
      <div className="vz-reveal"><HowItWorksSection id="comment" gold={gold} text={text} muted={muted} subtle={subtle} /></div>
      <div className="vz-reveal"><BetaFormGlass /></div>
      <div className="vz-reveal" style={{ marginTop: 120 }}><ObjectionsSection id="questions" gold={gold} muted={muted} /></div>
      <div className="vz-reveal"><FinalCtaSection gold={gold} muted={muted} /></div>
    </div>
  </React.Fragment>
);

// —— /cabinets ——
const CabinetsPageBody = ({ gold, text, muted, subtle }) => {
  const persona = (window.VZ_PERSONAS || []).find((p) => p.short === "cabinet");
  const blocks = [
    { t: "Une vue portefeuille", d: "Tous vos dossiers au même endroit, avec l'état de synchronisation de chacun visible en un coup d'œil." },
    { t: "Votre analyse reste la vôtre", d: "Comptes cabinet et comptes dirigeant sont cloisonnés : votre travail d'analyse n'est pas visible par vos clients." },
    { t: "Des comptes-rendus déjà rédigés", d: "Depuis un tableau de bord, Vyzor rédige un compte-rendu chiffré que vous relisez et envoyez, rapport PDF joint." },
  ];
  return (
    <React.Fragment>
      <VzPageHero
        title="Offrez du conseil à vos clients."
        accent="Sans y passer vos soirées."
        lede="Vyzor lit la comptabilité de vos dossiers et en tire, pour chaque client, les indicateurs, la trésorerie prévisionnelle et les alertes qui comptent. Vous arrivez au rendez-vous avec l'analyse déjà faite."
        cta="Présenter un client pour la bêta"
        note="Gratuit pour votre client · sans engagement pour le cabinet"
      />
      <div className="vz-page-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>
        {persona ? (
          <section className="vz-reveal" style={{ marginBottom: 120 }}>
            <VzSectionHead a="Le conseil, tout le monde le veut." b="Personne n'a le temps de le faire." muted={muted} />
            <PainSplit persona={persona} gold={gold} text={text} muted={muted} subtle={subtle} />
          </section>
        ) : null}
        <section className="vz-reveal" style={{ marginBottom: 120 }}>
          <VzSectionHead a="Ce que Vyzor fait" b="pour votre cabinet." muted={muted} />
          <ol className="vz-cab-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {blocks.map((b, i) => (
              <li key={b.t} style={{ borderRadius: 20, padding: "28px 28px 30px", background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: "1px solid rgba(140,160,255,0.12)" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: gold }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ margin: "12px 0 10px", fontSize: 21, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{b.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted }}>{b.d}</p>
              </li>
            ))}
          </ol>
          <style>{`@media (max-width: 920px) { .vz-cab-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>
        <section className="vz-reveal" style={{
          textAlign: "center", padding: "64px clamp(20px, 5vw, 64px)", borderRadius: 28, marginBottom: 40,
          background: "radial-gradient(ellipse 70% 90% at 50% 0%, #1a2656 0%, #0f1636 45%, #0a0f24 100%)",
          border: "1px solid rgba(140,160,255,0.18)",
        }}>
          <h2 style={{ margin: "0 auto", maxWidth: 780, fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", textWrap: "balance" }}>
            Un client qui veut enfin comprendre ses chiffres ? <span style={{ color: gold }}>Présentez-le-nous.</span>
          </h2>
          <p style={{ margin: "20px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: muted }}>
            Il entre dans la bêta gratuitement, avec un diagnostic financier dès le premier rendez-vous. Vous restez son conseil : Vyzor lit votre travail, il ne le remplace pas.
          </p>
          <div style={{ marginTop: 30 }}><VzCtaLink size="lg">Présenter un client pour la bêta</VzCtaLink></div>
        </section>
        <BetaFormGlass modalOnly />
      </div>
    </React.Fragment>
  );
};

Object.assign(window, { VzPageHero, VzCompare, VzSectionHead, PennylanePageBody, CabinetsPageBody });
