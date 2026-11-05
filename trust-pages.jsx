// trust-pages.jsx — Refonte du 05/11/2026, inspirée de la composition des rubriques d'eloQ
// (askeloq.com) en gardant la DA Vyzor (bleu nuit, or, cartes #121a3a, tout en Inter) :
//   • GenerativeUiSection : la réponse du Conseil se compose à l'écran (page /fonctionnalites).
//   • IntegrationsPageBody : /integrations, outils rangés par catégorie avec un statut honnête.
//   • SecurityPageBody : /securite, badges, où sont vos données, chiffrement, isolation, IA, FAQ.
// Chaque fait publié ici vient du code de l'application (relevé du 05/11/2026) : rien d'inventé.

const VZT_GOLD = "#f0c949";
const VZT_MUTED = "rgba(255,255,255,0.6)";
const vztCard = {
  borderRadius: 20,
  background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)",
  border: "1px solid rgba(140,160,255,0.12)",
};

const VztIcon = ({ name, size = 20 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "eye": return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "lock": return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
    case "mask": return <svg {...p}><path d="M3 7c3 0 6-1 9-3 3 2 6 3 9 3v4c0 5-4 9-9 10-5-1-9-5-9-10V7Z"/><path d="M9 11h.01M15 11h.01"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "layers": return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>;
    case "key": return <svg {...p}><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case "doc": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>;
    case "spark": return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>;
    case "check": return <svg {...p}><path d="m5 12 5 5 9-10"/></svg>;
    case "bank": return <svg {...p}><path d="M3 10h18L12 4 3 10ZM5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/></svg>;
    case "plug": return <svg {...p}><path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0V8Z"/><path d="M12 17v5"/></svg>;
    case "card": return <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 20a7 7 0 0 0-4-6.3"/></svg>;
    case "file": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    default: return null;
  }
};

const VztIc = ({ name, size = 20, box = 42 }) => (
  <span style={{ width: box, height: box, borderRadius: 11, flexShrink: 0, display: "inline-grid", placeItems: "center", color: VZT_GOLD, background: "rgba(240,201,73,0.07)", border: "1px solid rgba(240,201,73,0.22)" }}>
    <VztIcon name={name} size={size} />
  </span>
);

// Styles communs (sans sélecteur « > » : le pré-rendu échappe le texte des <style>).
const VztStyles = () => (
  <style>{`
    .vzt-sec { margin-bottom: 120px; }
    .vzt-lift { transition: transform 260ms cubic-bezier(0.22,1,0.36,1), border-color 260ms ease, box-shadow 260ms ease; }
    .vzt-lift:hover { transform: translateY(-3px); border-color: rgba(240,201,73,0.3) !important; box-shadow: 0 18px 44px -26px rgba(240,201,73,0.35); }
    .vzt-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; }
    .vzt-badge.on { color: #8ee6b5; background: rgba(46,204,113,0.10); border: 1px solid rgba(46,204,113,0.28); }
    .vzt-badge.soon { color: #f5e0a0; background: rgba(240,201,73,0.08); border: 1px solid rgba(240,201,73,0.26); }
    .vzt-badge .dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; }
    .vzt-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14.5px; font-weight: 600; color: #f0c949; text-decoration: none; transition: gap 180ms ease, color 180ms ease; }
    .vzt-link:hover { gap: 9px; color: #f4d468; }
    .vzt-qa { border-bottom: 1px solid rgba(140,160,255,0.14); }
    .vzt-qa summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 20px 2px; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.9); }
    .vzt-qa summary::-webkit-details-marker { display: none; }
    .vzt-qa summary:focus-visible, .vzt-link:focus-visible { outline: 2px solid rgba(240,201,73,0.6); outline-offset: 3px; border-radius: 6px; }
    .vzt-pm { position: relative; width: 26px; height: 26px; flex-shrink: 0; border-radius: 999px; border: 1px solid rgba(255,255,255,0.16); }
    .vzt-pm::before, .vzt-pm::after { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 1.5px; background: #f0c949; transform: translate(-50%, -50%); transition: transform 220ms ease; }
    .vzt-pm::after { transform: translate(-50%, -50%) rotate(90deg); }
    .vzt-qa[open] .vzt-pm::after { transform: translate(-50%, -50%) rotate(0deg); }
    .vzt-qa p { margin: 0 0 22px; padding-right: 46px; font-size: 15.5px; line-height: 1.65; color: rgba(255,255,255,0.62); }
    .vzt-gen-bar { transform-origin: bottom; animation: vztGrow 900ms cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes vztGrow { from { transform: scaleY(0.2); opacity: 0.3; } to { transform: scaleY(1); opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .vzt-lift, .vzt-lift:hover { transition: none; transform: none; } .vzt-gen-bar { animation: none; } .vzt-pm::before, .vzt-pm::after { transition: none; } }
    @media (max-width: 980px) {
      .vzt-2col, .vzt-gen { grid-template-columns: 1fr !important; }
      .vzt-4col { grid-template-columns: 1fr 1fr !important; }
      .vzt-3col { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 640px) {
      .vzt-sec { margin-bottom: 88px; }
      .vzt-4col, .vzt-3col { grid-template-columns: 1fr !important; }
      .vzt-qa p { padding-right: 0; }
    }
  `}</style>
);

// —— UI générative : la réponse du Conseil se compose à l'écran ——
const VZT_BLOCKS = [
  "Réponse directe", "Indicateurs clés", "Décomposition", "Courbe dans le temps", "Simulation",
  "Comparaison d'options", "Barres", "Anneau", "Radar", "Cascade",
];

const GenerativeUiSection = ({ muted = VZT_MUTED }) => {
  const kpis = [["Trésorerie fin de mois", "84 k€"], ["Point bas", "+38 k€"], ["Marge brute", "41,2 %"]];
  const fall = [["CA", 100, "base"], ["Achats", -38, "neg"], ["Charges", -27, "neg"], ["Salaires", -21, "neg"], ["EBE", 14, "res"]];
  let run = 0;
  return (
    <section id="ui-generative" className="vzt-sec" style={{ scrollMarginTop: 110 }}>
      <VztStyles />
      <div className="vzt-gen" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: VZT_GOLD, marginBottom: 14 }}>Interface générative</div>
          <h2 className="vz-sec-h2" style={{ fontSize: 48, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.06, color: "#fff", textWrap: "balance" }}>
            L'écran se compose <span style={{ color: muted }}>autour de votre question.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: muted, margin: "20px 0 0", maxWidth: 520 }}>
            Un logiciel classique vous impose ses tableaux. Avec Vyzor, vous posez une question au Conseil et la réponse s'affiche sous la forme qui l'explique le mieux : indicateurs, cascade, simulation, comparaison d'options. Chaque chiffre vient du moteur de calcul, jamais de l'IA : l'IA choisit la présentation, pas les nombres.
          </p>
          <ul style={{ listStyle: "none", margin: "26px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {VZT_BLOCKS.map((b) => (
              <li key={b} style={{ padding: "6px 12px", borderRadius: 999, fontSize: 13, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(140,160,255,0.16)" }}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 26 }}><a className="vzt-link" href="/fonctionnalite-conseil">Découvrir le Conseil <span aria-hidden="true">→</span></a></div>
        </div>

        {/* Maquette : une question, puis les blocs que le Conseil a choisis */}
        <figure style={{ ...vztCard, margin: 0, padding: 22, border: "1px solid rgba(240,201,73,0.22)" }} aria-label="Exemple de réponse composée par le Conseil, données fictives">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <span style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "rgba(240,201,73,0.12)", border: "1px solid rgba(240,201,73,0.25)", fontSize: 14, color: "#fff" }}>
              Puis-je embaucher un commercial en mars ?
            </span>
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.9)", marginBottom: 14 }}>
            <strong style={{ color: VZT_GOLD }}>Oui</strong>, votre trésorerie le permet : le point bas reste positif sur les 13 prochaines semaines.
          </div>
          <div className="vzt-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
            {kpis.map(([l, v]) => (
              <div key={l} style={{ padding: "12px 12px", borderRadius: 12, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(140,160,255,0.12)" }}>
                <div style={{ fontSize: 11.5, color: VZT_MUTED }}>{l}</div>
                <div className="num" style={{ fontSize: 19, fontWeight: 600, color: "#fff", marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 14px 10px", borderRadius: 12, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(140,160,255,0.12)" }}>
            <div style={{ fontSize: 12, color: VZT_MUTED, marginBottom: 10 }}>Du chiffre d'affaires à l'EBE (cascade)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, alignItems: "end", height: 120 }} aria-hidden="true">
              {fall.map(([l, v, kind], i) => {
                const top = kind === "res" ? v : kind === "base" ? v : run;
                const bottom = kind === "neg" ? run + v : 0;
                if (kind !== "res") run = kind === "base" ? v : run + v;
                const h = Math.abs(top - bottom);
                return (
                  <div key={l} style={{ position: "relative", height: "100%" }}>
                    <div className="vzt-gen-bar" style={{
                      position: "absolute", left: 0, right: 0, bottom: `${bottom}%`, height: `${h}%`, borderRadius: 5,
                      background: kind === "neg" ? "rgba(255,255,255,0.18)" : VZT_GOLD,
                      animationDelay: `${i * 90}ms`,
                    }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 6 }}>
              {fall.map(([l]) => <div key={l} style={{ fontSize: 11, color: VZT_MUTED, textAlign: "center" }}>{l}</div>)}
            </div>
          </div>
          <figcaption style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Exemple fictif. Les blocs changent selon la question posée.</figcaption>
        </figure>
      </div>
    </section>
  );
};

// —— Badge de statut d'une intégration ——
const VztStatus = ({ s }) => {
  const m = { on: ["on", "Disponible"], ask: ["soon", "Sur demande"], soon: ["soon", "Bientôt"] }[s];
  return <span className={"vzt-badge " + m[0]} style={s === "soon" ? { color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)" } : null}><span className="dot" aria-hidden="true" />{m[1]}</span>;
};

// Statuts relevés dans le code de l'application le 05/11/2026 (catalogue des connecteurs et
// drapeaux de visibilité). « Sur demande » = activé société par société pendant la bêta.
const VZT_INTEGRATIONS = [
  { cat: "Comptabilité", icon: "doc", lead: "La source principale : vos écritures, lues sans ressaisie.", tools: [
    { n: "Pennylane", d: "Comptabilité et comptes bancaires synchronisés dans Pennylane, en lecture seule.", s: "on", href: "/pennylane" },
    { n: "MyUnisoft", d: "Connexion par jeton, avec l'accord de votre cabinet.", s: "ask" },
    { n: "Odoo", d: "Connexion par clé d'accès, selon votre abonnement Odoo.", s: "ask" },
    { n: "ACD", d: "Pour les cabinets équipés d'ACD : les dossiers de vos clients, sans export.", s: "ask" },
    { n: "Tiime", d: "Connecteur en préparation.", s: "soon" },
  ] },
  { cat: "Fichiers, tous logiciels", icon: "file", lead: "Votre logiciel n'a pas de connecteur ? Un export suffit.", tools: [
    { n: "FEC", d: "Le fichier légal que tout logiciel comptable français sait exporter.", s: "on" },
    { n: "Liasse fiscale PDF", d: "Lue automatiquement, sans ressaisie.", s: "on" },
    { n: "Excel et CSV", d: "Balance, grand livre ou budget prévisionnel.", s: "on" },
  ] },
  { cat: "Ventes et paiements", icon: "card", lead: "Ce qui va rentrer, avant que ce soit en comptabilité.", tools: [
    { n: "Stripe", d: "Encaissements, abonnements et revenus récurrents.", s: "ask" },
    { n: "HubSpot", d: "Affaires en cours et chiffre d'affaires à venir.", s: "ask" },
    { n: "Pipedrive", d: "Affaires en cours et chiffre d'affaires à venir.", s: "ask" },
  ] },
  { cat: "Messagerie", icon: "mail", lead: "Pour envoyer vos comptes-rendus depuis votre propre adresse.", tools: [
    { n: "Gmail", d: "Envoi seulement, révocable à tout moment.", s: "on" },
  ] },
];

const IntegrationsPageBody = ({ gold, muted }) => (
  <React.Fragment>
    <VztStyles />
    <VzPageHero
      title="Branché sur vos outils."
      accent="Sans rien ressaisir."
      lede="Vyzor lit la comptabilité que votre cabinet tient déjà, avec vos comptes bancaires via Pennylane, puis la croise avec vos ventes et vos encaissements. Toujours en lecture seule : Vyzor n'écrit jamais dans vos logiciels."
      cta="Rejoindre la bêta"
      note="Connexion en quelques minutes"
    />
    <div className="vz-page-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>
      <section className="vzt-sec vz-reveal">
        <VzSectionHead a="Trois façons de brancher Vyzor." b="Une seule lecture de vos chiffres." muted={muted} />
        <ol className="vzt-3col" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            ["plug", "Connecteur direct", "Vous autorisez l'accès depuis Vyzor. Les données se mettent à jour d'un clic, sans export."],
            ["file", "Dépôt de fichier", "FEC, liasse fiscale en PDF ou Excel : déposés en quelques secondes, quel que soit votre logiciel."],
            ["layers", "Croisement", "Comptabilité, banque, ventes : Vyzor rapproche les sources pour une seule lecture de votre situation."],
          ].map(([ic, t, d]) => (
            <li key={t} className="vzt-lift" style={{ ...vztCard, padding: "28px 26px 30px" }}>
              <VztIc name={ic} />
              <h3 style={{ margin: "20px 0 10px", fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: muted }}>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="vzt-sec vz-reveal" aria-label="Liste des intégrations">
        <VzSectionHead a="Toutes nos intégrations," b="et où elles en sont." muted={muted} />
        <p style={{ margin: "-16px 0 36px", fontSize: 15, lineHeight: 1.6, color: muted, maxWidth: 760 }}>
          <strong style={{ color: "#fff", fontWeight: 600 }}>Disponible</strong> : ouvert à tous. <strong style={{ color: "#fff", fontWeight: 600 }}>Sur demande</strong> : activé pour votre société pendant la bêta, sur simple demande. <strong style={{ color: "#fff", fontWeight: 600 }}>Bientôt</strong> : en préparation.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          {VZT_INTEGRATIONS.map((g) => (
            <div key={g.cat}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <VztIc name={g.icon} size={18} box={38} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{g.cat}</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 14, color: muted }}>{g.lead}</p>
                </div>
              </div>
              <ul className="vzt-3col" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {g.tools.map((t) => {
                  const inner = (
                    <React.Fragment>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                        <span style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>{t.n}</span>
                        <VztStatus s={t.s} />
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: muted }}>{t.d}</p>
                      {t.href ? <span className="vzt-link" style={{ marginTop: 12, fontSize: 13.5 }}>En savoir plus <span aria-hidden="true">→</span></span> : null}
                    </React.Fragment>
                  );
                  const st = { ...vztCard, borderRadius: 16, padding: "18px 18px 20px", display: "block", height: "100%", boxSizing: "border-box", textDecoration: "none", opacity: t.s === "soon" ? 0.78 : 1 };
                  return (
                    <li key={t.n}>
                      {t.href ? <a href={t.href} className="vzt-lift" style={st}>{inner}</a> : <div style={st}>{inner}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="vzt-sec vz-reveal">
        <div className="vzt-2col" style={{ ...vztCard, padding: "36px 36px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "center", border: "1px solid rgba(240,201,73,0.22)" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, color: "#fff" }}>Votre logiciel n'est pas dans la liste ?</h2>
            <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: muted }}>Le FEC fonctionne avec tous les logiciels comptables. Pour le reste, dites-nous ce que vous utilisez : les prochains connecteurs suivent les demandes des utilisateurs de la bêta.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "flex-end" }}>
            <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", padding: "14px 20px", borderRadius: 10, background: gold, color: "#111", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Prendre rendez-vous</a>
            <a href="mailto:admin@vyzor.fr" style={{ display: "inline-flex", alignItems: "center", padding: "14px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Nous écrire</a>
          </div>
        </div>
        <p style={{ margin: "18px 0 0", fontSize: 14, color: muted }}>Comment vos accès sont protégés : <a className="vzt-link" href="/securite">notre approche sécurité <span aria-hidden="true">→</span></a></p>
      </section>
      <BetaFormGlass modalOnly />
    </div>
  </React.Fragment>
);

// —— /securite ——
const VZT_SEC_FAQ = [
  ["Vyzor peut-il modifier ma comptabilité ou faire un virement ?", "Non. Tous les accès sont en lecture seule : Vyzor lit vos données pour les analyser, il n'écrit, ne modifie et ne supprime rien dans vos logiciels, et ne peut déclencher aucun paiement."],
  ["Où sont stockées mes données ?", "L'application tourne à Paris et la base de données est hébergée à Paris. La liste complète des sous-traitants et de leurs pays figure dans notre politique de confidentialité."],
  ["Mes données servent-elles à entraîner l'IA ?", "Non. Vos chiffres ne servent jamais à entraîner des modèles. Avant d'être transmis à l'IA, le nom de votre entreprise et ceux des personnes sont remplacés par des libellés anonymes."],
  ["Un autre client de Vyzor peut-il voir mes chiffres ?", "Non. Chaque donnée est rattachée à une société et la base de données elle-même refuse toute lecture hors de votre périmètre, en plus des contrôles faits par l'application."],
  ["Mon expert-comptable voit-il ce que je fais dans Vyzor ?", "Seulement si vous l'invitez. Un cabinet n'accède qu'aux dossiers qui lui sont rattachés, et ses analyses de travail restent séparées de votre espace dirigeant."],
  ["Comment récupérer ou supprimer mes données ?", "Depuis votre compte : vous exportez vos données ou supprimez votre compte à tout moment. Couper une connexion depuis Vyzor ou depuis votre logiciel arrête immédiatement l'accès."],
];

const SecurityPageBody = ({ gold, muted }) => {
  const badges = [
    ["globe", "Hébergé à Paris", "Application et base de données en France."],
    ["eye", "Lecture seule", "Aucune écriture, aucun virement possible."],
    ["key", "Chiffrement AES-256", "Vos accès aux logiciels connectés, chiffrés."],
    ["layers", "Isolation par société", "Imposée par la base de données elle-même."],
  ];
  const where = [
    ["Application", "Vercel", "Paris (France)"],
    ["Base de données et comptes", "Supabase, sur AWS", "Paris (France)"],
    ["Fichiers importés", "Supabase", "Stockage du projet Vyzor"],
    ["Assistant IA", "Anthropic (Claude)", "Données pseudonymisées avant envoi"],
  ];
  const blocks = [
    { icon: "lock", t: "Chiffrement", pts: [
      "Toutes les connexions passent en HTTPS, avec HSTS préchargé dans les navigateurs.",
      "Les accès à vos logiciels (jetons, clés) sont chiffrés en AES-256-GCM, avec une clé conservée hors de la base.",
      "La connexion entre l'application et la base de données est chiffrée et son certificat vérifié.",
    ] },
    { icon: "layers", t: "Isolation entre sociétés", pts: [
      "Chaque donnée est rattachée à une société.",
      "La base de données applique elle-même le cloisonnement (sécurité au niveau des lignes), et l'application tourne avec un rôle qui ne peut pas le contourner.",
      "Chaque requête vérifie en plus que vous êtes le dirigeant de la société ou membre du cabinet qui la suit.",
    ] },
    { icon: "user", t: "Accès et traçabilité", pts: [
      "Connexion par e-mail et mot de passe, ou avec votre compte Google.",
      "Espaces cabinet et dirigeant séparés : un cabinet ne voit que les dossiers qui lui sont confiés.",
      "Les événements de sécurité sont journalisés et conservés 12 mois ; les tentatives répétées sont limitées.",
    ] },
    { icon: "spark", t: "L'IA et vos données", pts: [
      "Les calculs sont faits par un moteur déterministe : l'IA explique et présente, elle ne calcule pas vos chiffres.",
      "Avant tout envoi à l'IA, le nom de votre entreprise et ceux des personnes sont remplacés par des libellés anonymes, puis restaurés à l'affichage.",
      "L'IA ne reçoit que les indicateurs utiles à votre question, jamais vos écritures brutes ni les données d'un autre dossier.",
    ] },
    { icon: "shield", t: "RGPD et conservation", pts: [
      "Export de vos données et suppression de votre compte, à tout moment, depuis l'application.",
      "Les comptes inactifs sont supprimés au bout de 3 ans ; des purges automatiques appliquent nos durées de conservation.",
      "Vos chiffres ne sont ni revendus, ni partagés, ni utilisés pour entraîner des modèles.",
    ] },
    { icon: "eye", t: "Connexions en lecture seule", pts: [
      "Les autorisations demandées à vos logiciels sont limitées à la lecture.",
      "Vous coupez une connexion d'un clic, depuis Vyzor ou depuis votre logiciel : l'accès s'arrête immédiatement.",
    ] },
  ];
  return (
    <React.Fragment>
      <VztStyles />
      <VzPageHero
        title="Vos chiffres restent les vôtres."
        accent="Et vous savez où ils sont."
        lede="Vyzor lit des données sensibles : votre comptabilité, votre trésorerie, vos clients. Voici précisément où elles sont, comment elles sont protégées et ce que l'IA en voit."
        cta="Rejoindre la bêta"
        note="Une question ? admin@vyzor.fr"
      />
      <div className="vz-page-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>
        <section className="vzt-sec vz-reveal" style={{ marginTop: -40 }}>
          <ul className="vzt-4col" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {badges.map(([ic, t, d]) => (
              <li key={t} className="vzt-lift" style={{ ...vztCard, padding: "22px 20px" }}>
                <VztIc name={ic} size={18} box={38} />
                <div style={{ fontSize: 16.5, fontWeight: 600, color: "#fff", margin: "16px 0 6px" }}>{t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: muted }}>{d}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="vzt-sec vz-reveal">
          <VzSectionHead a="Où sont vos données." b="Brique par brique." muted={muted} />
          <div style={{ ...vztCard, overflow: "hidden" }}>
            {where.map(([what, who, loc], i) => (
              <div key={what} className="vzt-where" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16, padding: "20px 26px", borderTop: i ? "1px solid rgba(140,160,255,0.12)" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 15.5, fontWeight: 600, color: "#fff" }}>{what}</span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{who}</span>
                <span style={{ fontSize: 14.5, color: muted }}>{loc}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.6, color: muted }}>
            La liste complète des sous-traitants (envoi d'e-mails, lecture des PDF, connecteurs) et leurs pays : <a className="vzt-link" href="/confidentialite">politique de confidentialité <span aria-hidden="true">→</span></a>
          </p>
          <style>{`@media (max-width: 640px) { .vzt-where { grid-template-columns: 1fr !important; gap: 4px !important; } }`}</style>
        </section>

        <section className="vzt-sec vz-reveal">
          <VzSectionHead a="Comment nous les protégeons." b="Sans jargon, sans promesse vague." muted={muted} />
          <div className="vzt-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {blocks.map((b) => (
              <article key={b.t} className="vzt-lift" style={{ ...vztCard, padding: "28px 26px 30px" }}>
                <VztIc name={b.icon} />
                <h3 style={{ margin: "18px 0 14px", fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{b.t}</h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {b.pts.map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.78)" }}>
                      <span style={{ color: gold, flexShrink: 0, marginTop: 2, display: "inline-flex" }}><VztIcon name="check" size={16} /></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="vzt-sec vz-reveal">
          <div className="vzt-2col" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.5fr", gap: 48, alignItems: "start" }}>
            <VzSectionHead a="Vos questions" b="sur la sécurité." muted={muted} />
            <div style={{ borderTop: "1px solid rgba(140,160,255,0.14)" }}>
              {VZT_SEC_FAQ.map(([q, a]) => (
                <details key={q} className="vzt-qa">
                  <summary><span>{q}</span><span className="vzt-pm" aria-hidden="true" /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="vz-reveal" style={{
          textAlign: "center", padding: "64px clamp(20px, 5vw, 64px)", borderRadius: 28, marginBottom: 40,
          background: "radial-gradient(ellipse 70% 90% at 50% 0%, #1a2656 0%, #0f1636 45%, #0a0f24 100%)",
          border: "1px solid rgba(140,160,255,0.18)",
        }}>
          <h2 style={{ margin: "0 auto", maxWidth: 760, fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", textWrap: "balance" }}>
            Une question de sécurité, <span style={{ color: gold }}>un questionnaire DSI ?</span>
          </h2>
          <p style={{ margin: "18px auto 0", maxWidth: 580, fontSize: 17, lineHeight: 1.6, color: muted }}>Nous répondons directement, avec le détail technique dont vous avez besoin.</p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:admin@vyzor.fr" style={{ display: "inline-flex", alignItems: "center", padding: "15px 22px", borderRadius: 10, background: gold, color: "#111", fontSize: 15.5, fontWeight: 600, textDecoration: "none" }}>Écrire à l'équipe</a>
            <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", padding: "15px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 15.5, fontWeight: 500, textDecoration: "none" }}>Prendre rendez-vous</a>
          </div>
        </section>
        <BetaFormGlass modalOnly />
      </div>
    </React.Fragment>
  );
};

Object.assign(window, { VztIcon, VztIc, VztStyles, vztCard, GenerativeUiSection, IntegrationsPageBody, SecurityPageBody });
