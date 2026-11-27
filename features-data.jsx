// features-data.jsx — Catalogue unique des fonctionnalités Vyzor + visuels de fond (bento & sous-pages)

const VZF_GOLD = "#f0c949";
const VZF_MUTED = "rgba(255,255,255,0.55)";
const VZF_LINE = "rgba(255,255,255,0.08)";

const VzfIcon = ({ name, size = 18 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "conseil": return <svg {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>;
    case "tresorerie": return <svg {...p}><path d="M3 17l5-5 4 3 8-8"/><path d="M15 7h5v5"/></svg>;
    case "juridique": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>;
    case "analyse": return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case "cabinet": return <svg {...p}><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case "connexions": return <svg {...p}><path d="M9 7H6a4 4 0 0 0 0 8h3M15 7h3a4 4 0 0 1 0 8h-3M8 11h8"/></svg>;
    case "alertes": return <svg {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/></svg>;
    case "fiscal": return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M16 11v4"/></svg>;
    case "budget": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6.4 6.4"/></svg>;
    default: return null;
  }
};

// —— Visuels ——
const vzfCard = { background: "rgba(255,255,255,0.03)", border: `1px solid ${VZF_LINE}`, borderRadius: 12 };

const VisConseil = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 22px 0" }}>
    <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "rgba(255,255,255,0.06)", fontSize: 13, color: "#fff" }}>Puis-je recruter deux CDI en mars ?</div>
    <div style={{ ...vzfCard, maxWidth: "88%", padding: "12px 14px", borderRadius: "14px 14px 14px 4px", fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
      Oui. Votre trésorerie reste positive sur 12 mois, avec un point bas à <span style={{ color: VZF_GOLD, fontWeight: 600 }}>+38 k€</span> en novembre.
      <div style={{ marginTop: 8, fontSize: 11.5, color: VZF_MUTED }}>Source : comptes 512, 64x et échéanciers</div>
    </div>
    <div style={{ alignSelf: "flex-end", maxWidth: "70%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "rgba(255,255,255,0.06)", fontSize: 13, color: "#fff" }}>Et si je décale à janvier ?</div>
  </div>
);

const VisTresorerie = () => {
  const pts = [62, 58, 66, 61, 54, 49, 52, 44, 38, 46, 55, 60];
  const W = 420, H = 150, step = W / (pts.length - 1);
  const y = (v) => H - (v / 80) * H;
  const d = pts.map((v, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div style={{ padding: "22px 22px 0" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12.5, color: VZF_MUTED }}>Trésorerie prévisionnelle, 12 mois</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>214 k€</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
        <defs><linearGradient id="vzfArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={VZF_GOLD} stopOpacity="0.22"/><stop offset="1" stopColor={VZF_GOLD} stopOpacity="0"/></linearGradient></defs>
        {[0.25, 0.5, 0.75].map((r) => <line key={r} x1="0" x2={W} y1={H * r} y2={H * r} stroke={VZF_LINE} />)}
        <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#vzfArea)" />
        <path d={d} fill="none" stroke={VZF_GOLD} strokeWidth="2" />
        <circle cx={8 * step} cy={y(38)} r="4" fill="#0d1430" stroke={VZF_GOLD} strokeWidth="2" />
      </svg>
    </div>
  );
};

const VZF_DOCS = [
  { n: "PV d'AG 2025", b: "Approbation des comptes et affectation du résultat, résumées." },
  { n: "Statuts", b: "Version déposée au registre, lue même quand elle est scannée." },
  { n: "Comptes annuels 2025", b: "Importés automatiquement dans votre analyse financière." },
  { n: "Annonce BODACC", b: "Dépôt des comptes publié, avec sa date." },
  { n: "Bénéficiaires effectifs", b: "Tels qu'ils sont publiés au registre national." },
];
const VisJuridique = () => (
  <div className="vzf-marquee" style={{ paddingTop: 26, overflow: "hidden" }}>
    <div className="vzf-marquee-track" style={{ display: "flex", gap: 12, width: "max-content" }}>
      {[...VZF_DOCS, ...VZF_DOCS].map((f, i) => (
        <figure key={i} style={{ ...vzfCard, margin: 0, width: 168, padding: 14, flexShrink: 0 }}>
          <figcaption style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{f.n}</figcaption>
          <blockquote style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.45, color: VZF_MUTED }}>{f.b}</blockquote>
        </figure>
      ))}
    </div>
  </div>
);

const vzfLbl = { fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: VZF_MUTED, marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 8 };
const VisJuridiqueDetail = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 20px 0" }}>
    <div style={vzfLbl}><span>Documents officiels de votre société</span></div>
    {VZF_DOCS.map((f) => (
      <div key={f.n} style={{ ...vzfCard, display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px" }}>
        <span style={{ color: VZF_GOLD, display: "grid", placeItems: "center", marginTop: 1 }}><VzfIcon name="juridique" size={14} /></span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fff" }}>{f.n}</span>
          <span style={{ display: "block", fontSize: 12, lineHeight: 1.45, color: VZF_MUTED }}>{f.b}</span>
        </span>
      </div>
    ))}
  </div>
);

const VisFiscal = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "18px 20px 0" }}>
    <div style={vzfLbl}><span>Calendrier des échéances</span></div>
    {[["24/06", "Déclaration de TVA (CA3)", "J-6", "#f0905a"], ["15/07", "Cotisations URSSAF", "J-27", VZF_GOLD], ["31/07", "Dépôt des comptes", "J-43", VZF_GOLD], ["15/09", "Acompte d'IS", "J-89", VZF_MUTED]].map(([dt, t, j, c]) => (
      <div key={t} style={{ ...vzfCard, display: "flex", alignItems: "center", gap: 12, padding: "7px 12px" }}>
        <span style={{ width: 42, fontSize: 12.5, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{dt}</span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: c, whiteSpace: "nowrap" }}>{j}</span>
      </div>
    ))}
  </div>
);

const VisAnalyse = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "20px 20px 0" }}>
    {[["Marge brute", "57 %", "−5 pts", false], ["EBITDA", "182 k€", "+9 %", true], ["BFR", "41 j", "−6 j", true], ["CA", "1,8 M€", "+12 %", true]].map(([k, v, d, up]) => (
      <div key={k} style={{ ...vzfCard, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, color: VZF_MUTED }}>{k}</div>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginTop: 4, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}</div>
        <div style={{ fontSize: 12, marginTop: 2, color: up ? "#5fd4a8" : "#f0905a", fontWeight: 600 }}>{d}</div>
      </div>
    ))}
  </div>
);

const VisCabinet = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 22px 0" }}>
    {[["Verdier Holding", "Groupe", 74], ["Menuiserie Verdier", "Saine", 86], ["Verdier Agencement", "À surveiller", 58], ["Verdier Immobilier", "Saine", 79]].map(([n, s, sc]) => (
      <div key={n} style={{ ...vzfCard, display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
        <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: "#fff", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}</span>
        <span style={{ whiteSpace: "nowrap", fontSize: 12, color: sc < 50 ? "#f0905a" : sc < 70 ? VZF_GOLD : VZF_MUTED }}>{s}</span>
        <span style={{ width: 34, textAlign: "right", fontSize: 13, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{sc}</span>
      </div>
    ))}
  </div>
);

const VisConnexions = () => {
  const src = ["FEC", "Pennylane", "Compte bancaire", "Excel", "data.gouv"];
  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)", alignItems: "center", gap: 14, padding: "24px 20px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {src.slice(0, 3).map((s) => <span key={s} style={{ ...vzfCard, padding: "8px 6px", fontSize: 12.5, color: "#fff", textAlign: "center", whiteSpace: "nowrap" }}>{s}</span>)}
      </div>
      <div style={{ position: "relative", width: 56, height: 56, borderRadius: 14, display: "grid", placeItems: "center", background: "#0d1430", border: "1px solid rgba(240,201,73,0.35)" }}>
        <span className="vzf-beam vzf-beam-l" aria-hidden="true" />
        <span className="vzf-beam vzf-beam-r" aria-hidden="true" />
        <VyzorLogo size={30} color={VZF_GOLD} bg="transparent" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {src.slice(3).map((s) => <span key={s} style={{ ...vzfCard, padding: "8px 6px", fontSize: 12.5, color: "#fff", textAlign: "center", whiteSpace: "nowrap" }}>{s}</span>)}
      </div>
    </div>
  );
};

const VZF_ALERTS = [
  { t: "Trésorerie", d: "Point bas prévu à 9 k€ en janvier.", c: "#f0905a" },
  { t: "Client", d: "Bâtisseurs SARL : 32 jours de retard.", c: VZF_GOLD },
  { t: "TVA", d: "CA3 de juin : 8 580 € à régler le 15/07.", c: VZF_MUTED },
  { t: "Fournisseur", d: "Texol : +11 % depuis mars, sans avenant.", c: "#f0905a" },
  { t: "Marge", d: "Marge brute T2 en recul de 5 points.", c: VZF_GOLD },
];
const VisAlertes = () => {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setN((v) => v + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const list = [0, 1, 2, 3].map((k) => ({ ...VZF_ALERTS[(n + VZF_ALERTS.length - k) % VZF_ALERTS.length], key: n - k }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 22px 0" }}>
      {list.map((a, i) => (
        <div key={a.key} className={i === 0 ? "vzf-pop" : ""} style={{ ...vzfCard, display: "flex", alignItems: "center", gap: 12, padding: "11px 14px" }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: "grid", placeItems: "center", color: a.c, background: "rgba(255,255,255,0.04)" }}><VzfIcon name="alertes" size={15} /></span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#fff" }}>{a.t}</span>
            <span style={{ display: "block", fontSize: 12.5, color: VZF_MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.d}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

const VisBudget = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 22px 0" }}>
    {[["Achats matières", 92, 104], ["Masse salariale", 88, 86], ["Sous-traitance", 60, 71], ["Frais généraux", 45, 41]].map(([k, b, r]) => (
      <div key={k}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{k}</span>
          <span style={{ color: r > b ? "#f0905a" : VZF_MUTED, fontVariantNumeric: "tabular-nums" }}>{r > b ? `+${r - b} %` : `${r - b} %`}</span>
        </div>
        <div style={{ position: "relative", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>
          <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min(r, 110) / 1.1}%`, borderRadius: 4, background: r > b ? "rgba(240,144,90,0.75)" : VZF_GOLD }} />
          <span style={{ position: "absolute", top: -3, bottom: -3, left: `${b / 1.1}%`, width: 2, background: "#fff", opacity: 0.6 }} />
        </div>
      </div>
    ))}
  </div>
);

// —— Catalogue ——
const VZ_FEATURES = [
  { slug: "conseil", icon: "conseil", role: true, name: "Le directeur financier", desc: "Répond à vos questions, chiffres et sources à l'appui, et mobilise toute l'équipe.", Visual: VisConseil,
    lead: "Votre directeur financier, disponible à tout moment : il répond à vos questions à partir de vos données comptables réelles, avec les chiffres, la source et la recommandation.",
    points: [
      ["Analyse vos chiffres en détail", "Marges, rentabilité, évolution des coûts : une lecture complète, expliquée poste par poste."],
      ["Vous propose un plan d'action", "Priorités, effet attendu chiffré, et actions prêtes à lancer : rien ne part sans votre clic."],
      ["Simule vos scénarios", "Sur vos propres chiffres, pour vérifier qu'ils sont viables dans votre situation."],
      ["Prépare vos e-mails et documents", "Relances, dossier pour la banque, synthèse financière : prêts à relire, en Word ou en PDF."],
    ] },
  { slug: "analyse-financiere", icon: "analyse", role: true, name: "L'analyste", desc: "Calcule et explique vos marges, votre EBITDA, votre BFR et votre rentabilité.", Visual: VisAnalyse,
    lead: "Vos indicateurs clés calculés à partir de vos données comptables, organisés en quatre piliers, expliqués et comparés à votre secteur.",
    points: [
      ["Calcule vos indicateurs clés", "Marge brute, EBITDA, BFR, rentabilité par activité."],
      ["Explique chaque écart", "Chaque variation est rattachée aux postes qui la provoquent."],
      ["Produit vos états financiers", "Bilan, compte de résultat et flux de trésorerie, exportables en PDF ou en Word."],
      ["Vous compare à votre secteur", "Vos ratios face à ceux des entreprises de votre secteur."],
    ] },
  { slug: "tresorerie", icon: "tresorerie", role: true, name: "Le trésorier", desc: "Prévoit votre trésorerie à 12 mois et anticipe le point bas.", Visual: VisTresorerie,
    lead: "Sachez ce que vous avez en banque, ce que vous aurez dans 13 semaines comme dans 12 mois, testez vos décisions avant de les prendre et récupérez plus vite ce qui vous est dû.",
    points: [
      ["Prévoit votre trésorerie en continu", "Projection mise à jour à chaque synchronisation comptable."],
      ["Anticipe le point bas", "Les tensions repérées plusieurs mois à l'avance."],
      ["Vous dit qui vous doit de l'argent", "Factures en retard par client, depuis combien de temps, et brouillon de relance prêt à relire."],
      ["Teste vos décisions", "Embauche, investissement, emprunt, retard client, baisse du chiffre d'affaires : votre trésorerie avec et sans."],
    ] },
  { slug: "budget", icon: "budget", role: true, name: "Le contrôleur de gestion", desc: "Compare votre budget au réel et détecte les dérives poste par poste.", Visual: VisBudget,
    lead: "Construisez votre budget, comparez-le au réel chaque mois et identifiez les postes qui dérivent avant qu'ils ne pèsent sur l'année.",
    points: [
      ["Construit votre budget prévisionnel", "À partir de votre historique, ajustable en quelques minutes."],
      ["Compare budget et réel", "Poste par poste, avec les dépenses qui dérapent signalées en premier."],
      ["Analyse vos coûts", "Vos plus gros postes de dépense et leur évolution."],
      ["Calcule votre point mort", "Le chiffre d'affaires à atteindre pour couvrir vos coûts, et votre marge de sécurité."],
    ] },
  { slug: "juridique", icon: "juridique", role: true, DetailVisual: VisJuridiqueDetail,
    steps: [["Votre juriste rassemble", "Statuts, PV d'AG, comptes annuels et annonces légales récupérés aux registres publics."], ["Il les lit pour vous", "Même scannés, résumés et rattachés à votre société."], ["Vous posez vos questions", "Réponses sourcées, avec les liens vers les textes officiels."]],
    name: "Le juriste", desc: "Récupère vos documents officiels et répond à vos questions juridiques, textes à l'appui.", Visual: VisJuridique,
    lead: "Votre juriste récupère les documents officiels de votre société aux registres publics (INPI, BODACC, annuaire des entreprises), les lit et répond à vos questions de droit des sociétés avec les textes officiels.",
    points: [
      ["Récupère vos documents officiels", "Statuts, actes, comptes déposés et annonces BODACC, lus et résumés, même scannés."],
      ["Répond avec les textes officiels", "Vos questions juridiques, réponses sourcées et liens vers les textes."],
      ["Suit la vie de votre société", "Approbation des comptes, dépôt au greffe : les dates calculées pour votre société."],
      ["Travaille avec le reste de l'équipe", "Dividende, financement, cession : il croise vos documents avec vos chiffres."],
    ] },
  { slug: "fiscalite", icon: "fiscal", role: true, DetailVisual: VisFiscal,
    steps: [["Votre fiscaliste lit votre profil", "Forme juridique, régime de TVA, date de clôture : récupérés aux registres, confirmés par vous."], ["Il calcule votre calendrier", "TVA, URSSAF, impôt sur les sociétés : les dates propres à votre société."], ["Vous êtes prévenu", "Un rappel avant chaque échéance, et vos questions fiscales à tout moment."]],
    name: "Le fiscaliste", desc: "Calcule vos échéances fiscales et repère vos optimisations.", Visual: VisFiscal,
    lead: "Votre fiscaliste calcule le calendrier fiscal et social de votre société, répond à vos questions fiscales avec les textes officiels et repère les optimisations à étudier avec votre expert-comptable.",
    points: [
      ["Calcule vos échéances", "TVA, URSSAF, impôt sur les sociétés : un calendrier propre à votre forme juridique et à votre régime."],
      ["Vous rappelle chaque échéance", "Un rappel avant chaque date, et le calendrier dans votre agenda."],
      ["Répond avec les textes officiels", "Vos questions fiscales, réponses sourcées et liens vers les textes."],
      ["Repère vos optimisations fiscales", "Opportunités et points de vigilance selon votre régime, à valider avec votre expert-comptable."],
    ] },
  { slug: "alertes", icon: "alertes",
    steps: [["Votre assistant surveille", "Trésorerie, marges, retards clients et échéances suivis en continu."], ["Un signal apparaît", "Vous êtes prévenu avec la cause précise et les chiffres concernés."], ["Vous agissez", "Chaque alerte propose l'action à mener, prête à être lancée."]], role: true, name: "L'assistant administratif", desc: "Surveille vos chiffres et vous prévient des retards, tensions et échéances.", Visual: VisAlertes,
    lead: "Votre assistant administratif surveille vos chiffres en continu et vous prévient dès qu'un signal mérite votre attention.",
    points: [
      ["Surveille vos chiffres en continu", "Trésorerie, marges, retards clients et échéances fiscales."],
      ["S'adapte à vos seuils", "Vous définissez ce qui déclenche une alerte."],
      ["Vous prévient où vous voulez", "Cloche, récapitulatif par e-mail, e-mail immédiat pour l'urgent, notification sur téléphone."],
      ["Garde l'historique", "Toutes vos alertes, filtrées par type et gravité."],
    ] },
  { slug: "multi-societes", icon: "cabinet",
    steps: [["Ajoutez vos sociétés", "Holding, filiales : chacune avec sa comptabilité, connectée ou importée."], ["Votre équipe financière calcule", "Indicateurs, trésorerie et échéances pour chaque société, strictement séparés."], ["Vous pilotez", "Vous passez d'une société à l'autre en un clic, et votre cabinet suit celles que vous partagez."]], name: "Multi-sociétés", desc: "Toutes vos sociétés. Un seul écran.", Visual: VisCabinet,
    lead: "Holding, filiales, participations : chaque société garde ses propres chiffres, et vous passez de l'une à l'autre en un clic. Groupes, fonds d'investissement et cabinets comptables suivent toutes leurs sociétés au même endroit.",
    points: [
      ["Sélecteur de société", "En haut de l'écran, pour passer d'une société à l'autre."],
      ["La bonne information, à la bonne personne", "Vous choisissez, société par société, qui y a accès : votre expert-comptable, vos collaborateurs."],
      ["Un portefeuille pour les cabinets comptables", "Tous les dossiers clients, leur état et leurs chiffres, au même endroit."],
      ["Cloisonne chaque dossier", "Les chiffres d'une société ne se mélangent jamais avec ceux d'une autre."],
    ] },
];

const vzFeatureHref = (slug) => `/fonctionnalite-${slug}`;

(function injectVzfStyles() {
  if (document.getElementById("vzf-styles")) return;
  const st = document.createElement("style");
  st.id = "vzf-styles";
  st.textContent = `
    .vzb-ic { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; color: #f0c949; background: rgba(240,201,73,0.06); border: 1px solid rgba(240,201,73,0.22); margin-bottom: 14px; }
    @keyframes vzfMarquee { to { transform: translateX(-50%); } }
    .vzf-marquee-track { animation: vzfMarquee 28s linear infinite; }
    .vzf-marquee:hover .vzf-marquee-track { animation-play-state: paused; }
    @keyframes vzfPop { from { opacity: 0; transform: translateY(-8px) scale(0.98); } to { opacity: 1; transform: none; } }
    .vzf-pop { animation: vzfPop 420ms cubic-bezier(0.22,1,0.36,1) both; }
    .vzf-beam { position: absolute; top: 50%; height: 1px; width: 14px; background: linear-gradient(90deg, rgba(240,201,73,0), rgba(240,201,73,0.7)); }
    .vzf-beam-l { right: 100%; }
    .vzf-beam-r { left: 100%; transform: scaleX(-1); }
    @media (prefers-reduced-motion: reduce) { .vzf-marquee-track, .vzf-pop { animation: none !important; } }
  `;
  document.head.appendChild(st);
})();

Object.assign(window, { VZ_FEATURES, VzfIcon, vzFeatureHref });
