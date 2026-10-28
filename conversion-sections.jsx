// conversion-sections.jsx — Sections de conversion de l'accueil (refonte du 27/10/2026).
// Grille Hormozi : résultat rêvé (OutcomesSection), objections (ObjectionsSection),
// raison de l'offre + urgence (dans beta-glass), dernier appel (FinalCtaSection),
// et un CTA toujours à portée (StickyBetaCta). Même vocabulaire visuel : verre sombre, or.

// —— Paramètre unique de l'offre : à mettre à jour à la main quand une place est prise ——
const VZ_BETA = { places: 10 };

const VzCtaLink = ({ children, size = "md", style }) => (
  <a href="/?contact=1#beta" data-contact className="vz-btn-primary" style={{
    display: "inline-flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
    padding: size === "lg" ? "16px 28px" : "13px 22px", borderRadius: 10,
    backgroundColor: "#f0c949", color: "#0b0d14",
    fontWeight: 600, fontSize: size === "lg" ? 16 : 15, textDecoration: "none",
    ...style,
  }}>
    {children} <span aria-hidden="true">→</span>
  </a>
);

// —— 1. Ce que vous obtenez : trois réponses, avec les mini-écrans des pages fonctionnalités ——
const OutcomesSection = ({ id = "resultats", gold, muted }) => {
  const find = (slug) => (window.VZ_FEATURES || []).find((f) => f.slug === slug);
  const items = [
    { slug: "analyse-financiere", q: "Où part mon argent ?", a: "Marges, coûts et dérives lus pour vous, poste par poste, avec ce qui a bougé depuis le mois dernier." },
    { slug: "tresorerie", q: "Combien il me restera ?", a: "Votre trésorerie projetée à 12 mois, le point bas daté, et la réponse à « et si j'embauche ? »." },
    { slug: "alertes", q: "Quoi faire en premier ?", a: "Des alertes classées par impact en euros, chacune avec sa cause et l'action à mener." },
  ].map((it) => ({ ...it, f: find(it.slug) })).filter((it) => it.f);

  return (
    <section id={id} className="vz-out" style={{ position: "relative", marginBottom: 120 }}>
      <div style={{ maxWidth: 820, marginBottom: 44 }}>
        <h2 style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
          <span style={{ display: "block" }}>Trois questions.</span>{" "}
          <span style={{ display: "block", color: muted }}>Trois réponses, chaque semaine.</span>
        </h2>
      </div>
      <div className="vz-out-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {items.map(({ f, q, a }) => {
          const V = f.Visual;
          return (
            <a key={f.slug} href={window.vzFeatureHref ? window.vzFeatureHref(f.slug) : "/fonctionnalites"} className="vz-out-card">
              <div className="vz-out-bg" aria-hidden="true"><V /></div>
              <div className="vz-out-body">
                <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em", color: "#fff" }}>{q}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", textWrap: "pretty" }}>{a}</p>
                <span style={{ display: "inline-flex", gap: 6, marginTop: 12, fontSize: 13.5, fontWeight: 600, color: gold }}>Voir en détail <span aria-hidden="true">→</span></span>
              </div>
            </a>
          );
        })}
      </div>
      <style>{`
        .vz-out-card {
          position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 420px;
          overflow: hidden; border-radius: 18px; text-decoration: none; color: inherit;
          background: linear-gradient(180deg, #10131b 0%, #0b0d14 100%);
          border: 1px solid rgba(255,255,255,0.07); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 200ms ease;
        }
        .vz-out-card:hover { border-color: rgba(240,201,73,0.35); }
        .vz-out-card:focus-visible { outline: 2px solid #f0c949; outline-offset: 3px; }
        .vz-out-bg {
          position: absolute; inset: 0 0 auto 0; height: 58%; overflow: hidden; pointer-events: none;
          -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 40%); mask-image: linear-gradient(to top, transparent 0%, #000 40%);
        }
        .vz-out-body { position: relative; z-index: 1; padding: 22px 24px 24px; }
        @media (max-width: 1020px) { .vz-out .vz-out-grid { grid-template-columns: 1fr !important; } .vz-out-card { min-height: 380px; } }
        @media (max-width: 920px) { .vz-out h2 { font-size: 38px !important; } }
        @media (max-width: 560px) { .vz-out h2 { font-size: 32px !important; } }
      `}</style>
    </section>
  );
};

// —— 2. Objections : les cinq questions qui bloquent le clic ——
const VZ_OBJECTIONS = [
  { q: "Est-ce que ça remplace mon expert-comptable ?", a: "Non. Vyzor ne tient pas votre comptabilité : il lit le travail de votre cabinet et le transforme en décisions. Votre comptable garde son rôle, vous gagnez la lecture." },
  { q: "Mes données sont-elles en sécurité ?", a: "Vyzor accède à votre comptabilité en lecture seule : il ne modifie, n'écrit ni ne supprime rien. Les données sont chiffrées, hébergées dans l'Union européenne, et ne servent jamais à entraîner une IA. Vous coupez l'accès en un clic." },
  { q: "Combien de temps ça me prend ?", a: "Quelques minutes pour connecter Pennylane, et on le fait avec vous au premier rendez-vous. Ensuite, Vyzor travaille seul : vous n'avez rien à saisir." },
  { q: "Je ne suis pas un financier, je vais m'y retrouver ?", a: "C'est fait pour. Vous posez vos questions en français (« est-ce que je peux embaucher ? ») et Vyzor répond avec vos chiffres, la source et une recommandation." },
  { q: "Et après la bêta, combien ça coûte ?", a: "La bêta est gratuite. Le tarif sera annoncé avant sa fin, et les bêta-testeurs gardent un tarif préférentiel à vie. Aucun engagement : vous partez quand vous voulez." },
  { q: "Je n'utilise pas Pennylane, c'est possible ?", a: "Oui. Un export FEC, que tous les logiciels comptables savent produire, suffit pour démarrer. Indiquez votre logiciel dans le formulaire, on vous dit ce qui est possible." },
];

const ObjectionsSection = ({ id = "questions", gold, muted }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id={id} className="vz-obj" style={{ position: "relative", marginBottom: 120 }}>
      <div className="vz-obj-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: 48, alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
            <span style={{ display: "block" }}>Vos questions,</span>{" "}
            <span style={{ display: "block", color: muted }}>sans détour.</span>
          </h2>
          <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.6, color: muted, maxWidth: 360 }}>
            Une autre question ? Toutes les réponses sont dans la <a href="/faq" style={{ color: gold, textUnderlineOffset: 3 }}>FAQ</a>, ou écrivez-nous à contact@vyzor.fr.
          </p>
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {VZ_OBJECTIONS.map((o, i) => {
            const on = open === i;
            return (
              <li key={o.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ margin: 0 }}>
                  <button type="button" className="vz-obj-q" aria-expanded={on} aria-controls={`vz-obj-${i}`} id={`vz-obj-q-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}>
                    <span>{o.q}</span>
                    <span aria-hidden="true" className="vz-obj-plus" style={{ color: on ? gold : "rgba(255,255,255,0.6)", transform: on ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                </h3>
                <div id={`vz-obj-${i}`} role="region" aria-labelledby={`vz-obj-q-${i}`} hidden={!on}>
                  <p style={{ margin: 0, padding: "0 40px 22px 0", fontSize: 15.5, lineHeight: 1.65, color: "rgba(255,255,255,0.7)", textWrap: "pretty" }}>{o.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        .vz-obj-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 0; background: transparent; border: 0; cursor: pointer; text-align: left; color: #fff; font: 600 17px "Inter", system-ui, sans-serif; letter-spacing: -0.01em; }
        .vz-obj-q:hover { color: #f0c949; }
        .vz-obj-q:focus-visible { outline: 2px solid #f0c949; outline-offset: 4px; border-radius: 6px; }
        .vz-obj-plus { font-size: 24px; font-weight: 300; line-height: 1; transition: transform 200ms ease, color 200ms ease; flex-shrink: 0; }
        @media (prefers-reduced-motion: reduce) { .vz-obj-plus { transition: none; } }
        @media (max-width: 920px) { .vz-obj .vz-obj-grid { grid-template-columns: 1fr !important; gap: 28px !important; } .vz-obj h2 { font-size: 38px !important; } }
        @media (max-width: 560px) { .vz-obj h2 { font-size: 32px !important; } }
      `}</style>
    </section>
  );
};

// —— 3. Dernier appel : projeter le visiteur dans les deux futurs ——
const FinalCtaSection = ({ gold, muted }) => (
  <section className="vz-final" style={{
    position: "relative", overflow: "hidden", textAlign: "center",
    margin: "120px 0 40px", padding: "72px clamp(20px, 5vw, 64px)", borderRadius: 28,
    background: "linear-gradient(180deg, rgba(240,201,73,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%), #0b0d14",
    border: "1px solid rgba(240,201,73,0.22)",
  }}>
    <span aria-hidden="true" style={{ position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)", width: 700, height: 320, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(240,201,73,0.16), transparent 68%)", filter: "blur(24px)", pointerEvents: "none" }} />
    <h2 style={{ position: "relative", margin: "0 auto", maxWidth: 820, fontSize: "clamp(32px, 4.4vw, 52px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, color: "#fff", textWrap: "balance" }}>
      Dans 12 mois, vous saurez où est passé votre argent.{" "}
      <span style={{ color: gold }}>Ou vous le découvrirez au bilan.</span>
    </h2>
    <p style={{ position: "relative", margin: "22px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: muted }}>
      Vyzor ouvre {VZ_BETA.places} places de bêta : gratuit, avec vos vrais chiffres et une ligne directe avec les fondateurs.
    </p>
    <div style={{ position: "relative", marginTop: 32 }}>
      <VzCtaLink size="lg">Réserver ma place dans la bêta</VzCtaLink>
    </div>
    <p style={{ position: "relative", margin: "14px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
      Gratuit · sans engagement · réponse sous 48 h
    </p>
  </section>
);

// —— 4. CTA collant : apparaît une fois le hero passé, disparaît sur l'offre ——
const StickyBetaCta = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY, h = window.innerHeight;
      const beta = document.getElementById("beta");
      const betaTop = beta ? beta.getBoundingClientRect().top : Infinity;
      setShow(y > h * 0.9 && betaTop > h * 0.6 && !document.querySelector(".beta-modal-overlay"));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="vz-sticky" data-show={show ? "true" : "false"} aria-hidden={!show}>
      <span className="vz-sticky-txt">Bêta gratuite · {VZ_BETA.places} places</span>
      <a href="/?contact=1#beta" data-contact tabIndex={show ? 0 : -1}>Réserver ma place <span aria-hidden="true">→</span></a>
      <style>{`
        .vz-sticky { position: fixed; left: 50%; bottom: 18px; z-index: 900; display: flex; align-items: center; gap: 14px;
          padding: 8px 8px 8px 18px; border-radius: 999px; background: rgba(12,14,20,0.92);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(240,201,73,0.3); box-shadow: 0 18px 50px rgba(0,0,0,0.55);
          transform: translate(-50%, 140%); opacity: 0; pointer-events: none;
          transition: transform 280ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease; }
        .vz-sticky[data-show="true"] { transform: translate(-50%, 0); opacity: 1; pointer-events: auto; }
        .vz-sticky-txt { font-size: 13.5px; color: rgba(255,255,255,0.8); white-space: nowrap; }
        .vz-sticky a { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; background: #f0c949; color: #0b0d14; font-weight: 600; font-size: 14px; text-decoration: none; white-space: nowrap; }
        .vz-sticky a:hover { background: #f4d468; }
        .vz-sticky a:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
        @media (max-width: 420px) { .vz-sticky-txt { display: none; } .vz-sticky { padding: 6px; } }
        @media (prefers-reduced-motion: reduce) { .vz-sticky { transition: none; } }
      `}</style>
    </div>
  );
};

// —— 5. Qui est derrière : des visages, une raison, un engagement ——
const VZ_FOUNDERS = [
  { name: "Antoine Cayer", role: "Co-fondateur, CEO", img: "/img/fondateur-antoine.webp",
    bio: "MSc Data for Finance, Mines Paris–PSL. Passé par Air Liquide et LVMH." },
  { name: "Louis Chevalier", role: "Co-fondateur, acquisition", img: "/img/fondateur-louis.webp",
    bio: "MSc Data for Finance, Mines Paris–PSL. Passé par Natixis CIB et Kano." },
];

const FoundersSection = ({ id = "fondateurs", gold, muted }) => (
  <section id={id} className="vz-found" style={{ position: "relative", marginBottom: 96 }}>
    <div className="vz-found-grid" style={{
      display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 40, alignItems: "center",
      padding: "40px clamp(24px, 4vw, 48px)", borderRadius: 24,
      background: "linear-gradient(180deg, #11141d 0%, #0b0d14 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.8)",
    }}>
      <div>
        <h2 style={{ fontSize: 40, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.1, color: "#fff" }}>
          Pendant la bêta, <span style={{ color: gold }}>c'est nous que vous avez au téléphone.</span>
        </h2>
        <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.65, color: muted, maxWidth: 480, textWrap: "pretty" }}>
          Les grands groupes ont des équipes entières pour lire leurs chiffres. Les PME ont un bilan par an.
          Nous avons créé Vyzor pour donner au dirigeant de PME la même lecture, sans l'équipe.
          Accompagnés par l'incubateur Prodiges.
        </p>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {VZ_FOUNDERS.map((f) => (
          <li key={f.name}>
            <img src={f.img} alt={`Portrait de ${f.name}`} width="320" height="320" loading="lazy" decoding="async" style={{
              display: "block", width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover",
              borderRadius: 18, border: "1px solid rgba(240,201,73,0.22)",
            }} />
            <div style={{ marginTop: 14, fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{f.name}</div>
            <div style={{ marginTop: 2, fontSize: 13.5, fontWeight: 600, color: gold }}>{f.role}</div>
            <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.5, color: muted }}>{f.bio}</div>
          </li>
        ))}
      </ul>
    </div>
    <style>{`
      @media (max-width: 920px) { .vz-found .vz-found-grid { grid-template-columns: 1fr !important; gap: 28px !important; } .vz-found h2 { font-size: 32px !important; } }
    `}</style>
  </section>
);

Object.assign(window, { VZ_BETA, VzCtaLink, OutcomesSection, ObjectionsSection, FinalCtaSection, StickyBetaCta, FoundersSection, VZ_FOUNDERS });
