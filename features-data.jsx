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
        <circle cx={8 * step} cy={y(38)} r="4" fill="#0b0d14" stroke={VZF_GOLD} strokeWidth="2" />
      </svg>
    </div>
  );
};

const VZF_DOCS = [
  { n: "PV d'AG 2025", b: "Approbation des comptes, affectation du résultat. À déposer avant le 31/07." },
  { n: "Statuts SAS", b: "Version à jour après l'augmentation de capital de mars." },
  { n: "Bail commercial", b: "Révision triennale du loyer prévue en septembre." },
  { n: "Pacte d'associés", b: "Clause de sortie conjointe, préemption et good leaver." },
  { n: "Extrait Kbis", b: "Généré il y a 12 jours. Validité de 3 mois pour vos dossiers." },
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

const VisJuridiqueDetail = () => {
  const lbl = { fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: VZF_MUTED, marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 8 };
  const node = (n, s, main) => (
    <div style={{ ...vzfCard, padding: "6px 8px", textAlign: "center", minWidth: 0, ...(main ? { borderColor: "rgba(240,201,73,0.45)" } : {}) }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}</div>
      <div style={{ fontSize: 11, color: VZF_MUTED, whiteSpace: "nowrap" }}>{s}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "18px 20px 0" }}>
      <div>
        <div style={lbl}><span>Documents publics centralisés</span><span style={{ color: VZF_GOLD, textTransform: "none", letterSpacing: 0 }}>→ agents juridique & fiscal</span></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Statuts", "PV d'AG", "Comptes annuels", "Kbis", "Bénéficiaires effectifs"].map((t) => (
            <span key={t} style={{ ...vzfCard, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", fontSize: 12, color: "#fff" }}>
              <span style={{ color: VZF_GOLD, display: "grid", placeItems: "center" }}><VzfIcon name="juridique" size={13} /></span>{t}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div style={lbl}><span>Montage du groupe</span></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ width: "46%" }}>{node("Holding Martin SAS", "Société mère", true)}</div>
          <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }}></div>
          <div style={{ width: "68%", height: 1, background: "rgba(255,255,255,0.2)" }}></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 8, width: "100%" }}>
            {[["Atelier Nord", "100 %"], ["Studio Sud", "80 %"], ["SCI Quais", "60 %"]].map(([n, s]) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.2)" }}></div>
                <div style={{ width: "100%" }}>{node(n, "Détenue à " + s)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={lbl}><span>Calendrier des échéances</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[["30/06", "AG d'approbation · Holding Martin", "J-12", "#f0905a"], ["31/07", "Dépôt des comptes · Studio Sud", "J-43", VZF_GOLD], ["15/09", "Révision du bail · SCI Quais", "J-89", VZF_MUTED]].map(([dt, t, j, c]) => (
            <div key={t} style={{ ...vzfCard, display: "flex", alignItems: "center", gap: 12, padding: "7px 12px" }}>
              <span style={{ width: 42, fontSize: 12.5, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{dt}</span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c, whiteSpace: "nowrap" }}>{j}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
      <div style={{ position: "relative", width: 56, height: 56, borderRadius: 14, display: "grid", placeItems: "center", background: "#0b0d14", border: "1px solid rgba(240,201,73,0.35)" }}>
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
  { slug: "conseil", icon: "conseil", name: "Conseil", desc: "Posez vos questions en français, obtenez une réponse chiffrée et sourcée.", Visual: VisConseil,
    lead: "Un interlocuteur financier disponible à tout moment. Vyzor répond à vos questions à partir de vos données comptables réelles, avec les chiffres, la source et la recommandation.",
    points: [
      ["Analyses détaillées", "Marges, rentabilité, évolution des coûts : une lecture complète, expliquée poste par poste."],
      ["Recherche instantanée", "Retrouvez en quelques secondes une facture, un montant, une clause ou une échéance."],
      ["Simulations", "Testez tous les scénarios sur vos propres chiffres et vérifiez s'ils sont viables dans votre situation."],
      ["E-mails", "Relances clients, échanges fournisseurs, demandes à votre comptable : rédigés et prêts à envoyer."],
      ["Documents financiers", "Dossiers pour votre banque, vos partenaires ou vos investisseurs, générés à partir de vos données."],
    ] },
  { slug: "tresorerie", icon: "tresorerie", name: "Trésorerie", desc: "Prévision à 12 mois, point bas anticipé, encaissements suivis.", Visual: VisTresorerie,
    lead: "Sachez à tout moment où en sera votre trésorerie dans 3, 6 ou 12 mois, testez vos décisions avant de les prendre et récupérez plus vite ce qui vous est dû.",
    points: [
      ["Prévision glissante", "Projection mise à jour à chaque synchronisation comptable."],
      ["Point bas anticipé", "Identifiez les tensions plusieurs mois à l'avance."],
      ["Suivi des encaissements", "Retards clients et relances prioritaires classés par montant."],
      ["Scénarios", "Comparez plusieurs hypothèses de croissance ou d'investissement."],
    ] },
  { slug: "juridique", icon: "juridique", DetailVisual: VisJuridiqueDetail,
    steps: [["Vyzor rassemble", "Statuts, PV d'AG, comptes annuels et actes publics récupérés et classés pour chaque société."], ["Les agents s'en nourrissent", "Vos agents juridique et fiscaliste s'appuient sur ces documents pour répondre avec précision."], ["Vous gardez le cap", "Le calendrier des échéances vous prévient à temps, société par société."]],
    name: "Juridique", desc: "Documents juridiques publics, montage du groupe et échéances centralisés.", Visual: VisJuridique,
    lead: "Vyzor centralise tous les documents juridiques publics de vos sociétés (comptes, PV d'AG, statuts…) pour nourrir directement vos agents juridique et fiscaliste.",
    points: [
      ["Documents centralisés", "Statuts, PV d'AG, comptes annuels, Kbis et actes publics réunis au même endroit."],
      ["Agents juridique & fiscal", "Ces documents alimentent les agents : leurs réponses s'appuient sur vos vrais actes."],
      ["Montage du groupe", "Visualisez les sociétés reliées, les participations, et retrouvez toutes leurs informations juridiques."],
      ["Calendrier des échéances", "AG, dépôts des comptes, révisions de bail et formalités rappelés à temps."],
    ] },
  { slug: "analyse-financiere", icon: "analyse", name: "Analyse financière", desc: "Marges, EBITDA, BFR et rentabilité, lus et expliqués.", Visual: VisAnalyse,
    lead: "Vos indicateurs clés calculés à partir de vos données comptables, organisés en quatre piliers, expliqués et comparés à votre secteur.",
    points: [
      ["Indicateurs clés", "Marge brute, EBITDA, BFR, rentabilité par activité."],
      ["Écarts expliqués", "Chaque variation est rattachée aux postes qui la provoquent."],
      ["Comparaison", "Mois par mois, année sur année, ou face à votre budget."],
      ["Vyzor Score", "Une note de santé financière synthétique et suivie dans le temps."],
    ] },
  { slug: "multi-societes", icon: "cabinet",
    steps: [["Ajoutez vos sociétés", "Connectez la comptabilité de chaque entité du groupe."], ["Vyzor calcule", "Indicateurs par société et score de santé global du groupe."], ["Vous pilotez", "Une seule vue pour suivre l'ensemble et intervenir là où il faut."]], name: "Multi-sociétés", desc: "Une vue groupe de toutes vos sociétés, avec un score de santé global.", Visual: VisCabinet,
    lead: "Holding, filiales, sociétés sœurs : suivez toutes vos entités depuis une seule vue, avec un score de santé global du groupe et le détail de chaque société.",
    points: [
      ["Vue groupe", "Toutes vos sociétés réunies dans un même tableau de bord."],
      ["Score de santé global", "Une note unique pour le groupe, pondérée par le poids de chaque société."],
      ["Suivi société par société", "Repérez immédiatement l'entité qui décroche et pourquoi."],
      ["Consolidation (bientôt)", "Comptes consolidés du groupe, éliminations intragroupe comprises."],
    ] },
  { slug: "alertes", icon: "alertes",
    steps: [["Vyzor surveille", "Trésorerie, marges, retards clients et échéances suivis en continu."], ["Un signal apparaît", "Vous êtes prévenu avec la cause précise et les chiffres concernés."], ["Vous agissez", "Chaque alerte propose l'action à mener, prête à être lancée."]], name: "Notifications & alertes", desc: "Retards, tensions, échéances : prévenu avant qu'il soit trop tard.", Visual: VisAlertes,
    lead: "Vyzor surveille vos chiffres en continu et vous prévient dès qu'un signal mérite votre attention.",
    points: [
      ["Surveillance continue", "Trésorerie, marges, retards clients et échéances fiscales."],
      ["Seuils personnalisés", "Définissez ce qui doit déclencher une alerte."],
      ["Action proposée", "Chaque alerte arrive avec la marche à suivre."],
      ["Historique", "Toutes vos alertes passées restent consultables et traçables."],
    ] },
  { slug: "budget", soon: true, icon: "budget", name: "Budget & analyse des coûts", desc: "Budget face au réel, dérives détectées poste par poste.", Visual: VisBudget,
    lead: "Construisez votre budget, comparez-le au réel chaque mois et identifiez les postes qui dérivent avant qu'ils ne pèsent sur l'année.",
    points: [
      ["Budget prévisionnel", "Construit à partir de votre historique, ajustable en quelques minutes."],
      ["Budget vs réel", "Écarts calculés automatiquement à chaque clôture."],
      ["Analyse des coûts", "Vos plus gros postes de dépense et leur évolution."],
      ["Pistes d'économies", "Hausses fournisseurs et doublons repérés pour vous."],
    ] },
];

const vzFeatureHref = (slug) => `fonctionnalite-${slug}.html`;

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
