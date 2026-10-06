// analyse-flow.jsx — Page « Analyse financière » : sources → moteur → 4 piliers → KPI expliqué → KPI perso → export

const AF_MUTED = "rgba(255,255,255,0.58)";
const AF_LINE = "rgba(255,255,255,0.08)";
const afPanel = { borderRadius: 20, background: "linear-gradient(180deg, #10131b 0%, #0b0d14 100%)", border: "1px solid rgba(255,255,255,0.07)" };
const afBox = { borderRadius: 12, border: `1px solid ${AF_LINE}`, background: "rgba(255,255,255,0.025)" };

const AfHead = ({ n, t, d }) => (
  <div style={{ maxWidth: 680 }}>
    <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>{t}</h2>
    <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: AF_MUTED, textWrap: "pretty" }}>{d}</p>
  </div>
);

// —— 1. Sources de données ——
const AF_SOURCES = {
  docs: { t: "Documents comptables", s: "Mise à jour à chaque clôture", items: ["FEC", "Bilan", "Compte de résultat", "Grand livre", "Balance"],
    note: "Votre expert-comptable produit ces documents. Vous les déposez, Vyzor les lit et les contrôle." },
  live: { t: "Logiciel comptable", s: "Synchronisé en temps réel", items: ["Pennylane", "Écritures du jour", "Factures", "Rapprochements bancaires"],
    note: "Connecté à votre logiciel, Vyzor récupère chaque nouvelle écriture : vos indicateurs sont toujours à jour." },
};
const AfSources = () => {
  const [m, setM] = React.useState("live");
  const src = AF_SOURCES[m];
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <AfHead n="01" t="Branché sur vos données comptables" d="Deux façons d'alimenter l'analyse : les documents produits par votre comptable, ou une connexion directe à votre logiciel pour un suivi en temps réel." />
      <div className="af-seg" role="tablist">
        {Object.entries(AF_SOURCES).map(([k, v]) => (
          <button key={k} role="tab" aria-selected={m === k} className={"af-segb" + (m === k ? " on" : "")} onClick={() => setM(k)}>{v.t}</button>
        ))}
      </div>
      <div className="af-flow" style={{ ...afPanel, padding: "32px clamp(16px, 3vw, 32px)" }}>
        <div style={{ ...afBox, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{src.t}</span>
            <span style={{ fontSize: 12, color: m === "live" ? "#5fd4a8" : "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{src.s}</span>
          </div>
          <div key={m} className="cf-fade" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {src.items.map((x) => <span key={x} className="cf-chip" style={{ fontSize: 12.5 }}>{x}</span>)}
          </div>
          <p key={"n" + m} className="cf-fade" style={{ margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.55, color: AF_MUTED }}>{src.note}</p>
        </div>
        <span className="af-arrow" aria-hidden="true" />
        <div style={{ ...afBox, padding: 18, borderColor: "rgba(240,201,73,0.4)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Moteur Vyzor</div>
          {["Contrôle de cohérence (débit / crédit)", "Retraitement selon le PCG", "Calcul déterministe des indicateurs"].map((x) => (
            <div key={x} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", padding: "8px 0", borderTop: `1px solid ${AF_LINE}`, marginTop: 8 }}>{x}</div>
          ))}
        </div>
        <span className="af-arrow" aria-hidden="true" />
        <div style={{ ...afBox, padding: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Vos indicateurs</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
            {[["Marge brute", "57 %"], ["EBITDA", "182 k€"], ["BFR", "41 j"], ["Endettement", "0,8×"]].map(([k, v]) => (
              <div key={k} style={{ ...afBox, padding: "10px 12px" }}>
                <div style={{ fontSize: 11.5, color: AF_MUTED }}>{k}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// —— 2. Les 4 piliers ——
const AF_PILLARS = [
  { t: "Rentabilité", q: "Mon activité gagne-t-elle assez ?", k: ["Marge brute", "Marge d'EBITDA", "Résultat net", "Rentabilité par activité"] },
  { t: "Trésorerie & liquidité", q: "Ai-je les moyens de mes ambitions ?", k: ["Trésorerie nette", "BFR en jours", "Délai clients (DSO)", "Délai fournisseurs (DPO)"] },
  { t: "Solidité financière", q: "Mon entreprise est-elle robuste ?", k: ["Capitaux propres", "Ratio d'endettement", "Capacité de remboursement", "Autonomie financière"] },
  { t: "Activité & croissance", q: "Où va mon chiffre d'affaires ?", k: ["Évolution du CA", "CA par client", "Concentration clients", "Productivité par salarié"] },
];
const AfPillars = () => {
  const [i, setI] = React.useState(0);
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <AfHead n="02" t="Quatre piliers pour lire votre entreprise" d="Les indicateurs sont organisés autour des quatre questions qu'un dirigeant se pose. Chaque pilier regroupe les KPI qui y répondent." />
      <div className="af-pillars">
        {AF_PILLARS.map((p, k) => (
          <button key={p.t} className={"af-pillar" + (k === i ? " on" : "")} onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-pressed={k === i}>
            <span style={{ display: "block", fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{p.t}</span>
            <span style={{ display: "block", fontSize: 13.5, color: AF_MUTED, marginTop: 4 }}>{p.q}</span>
            <span className="af-kpis">
              {p.k.map((x) => <span key={x} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.8)", padding: "8px 0", borderTop: `1px solid ${AF_LINE}` }}>{x}</span>)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

// —— 3. Un KPI expliqué ——
const AF_SERIES = [["2023", 61], ["2024", 62], ["2025", 59], ["2026", 57]];
const AfKpiViz = ({ view }) => {
  if (view === "table") return (
    <div>{AF_SERIES.map(([y, v], k) => (
      <div key={y} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid ${AF_LINE}`, fontSize: 13.5 }}>
        <span style={{ color: AF_MUTED }}>{y}</span><span style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>{v} %</span>
        <span style={{ width: 60, textAlign: "right", color: k ? (v >= AF_SERIES[k - 1][1] ? "#5fd4a8" : "#f0905a") : AF_MUTED }}>{k ? `${v - AF_SERIES[k - 1][1] > 0 ? "+" : ""}${v - AF_SERIES[k - 1][1]} pt` : "—"}</span>
      </div>
    ))}</div>
  );
  const W = 360, H = 130, min = 50, max = 66;
  const y = (v) => H - ((v - min) / (max - min)) * H;
  if (view === "bars") return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: H + 24 }}>
      {AF_SERIES.map(([yr, v], k) => (
        <div key={yr} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#fff" }}>{v} %</span>
          <span style={{ width: "100%", height: H - y(v) + 10, borderRadius: 6, background: k === AF_SERIES.length - 1 ? "#f0c949" : "rgba(255,255,255,0.12)" }} />
          <span style={{ fontSize: 12, color: AF_MUTED }}>{yr}</span>
        </div>
      ))}
    </div>
  );
  const step = W / (AF_SERIES.length - 1);
  const d = AF_SERIES.map(([, v], k) => `${k ? "L" : "M"}${k * step},${y(v)}`).join(" ");
  return (
    <svg viewBox={`-10 -10 ${W + 20} ${H + 40}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      <line x1="0" x2={W} y1={y(54)} y2={y(54)} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" />
      <text x={W} y={y(54) - 6} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="end">moyenne sectorielle 54 %</text>
      <path d={d} fill="none" stroke="#f0c949" strokeWidth="2" />
      {AF_SERIES.map(([yr, v], k) => (
        <g key={yr}><circle cx={k * step} cy={y(v)} r="4" fill="#0b0d14" stroke="#f0c949" strokeWidth="2" />
          <text x={k * step} y={H + 24} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle">{yr}</text></g>
      ))}
    </svg>
  );
};
const AfKpi = () => {
  const [view, setView] = React.useState("line");
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <AfHead n="03" t="Chaque indicateur, expliqué et situé" d="Pour chaque KPI : sa définition, son évolution sur les années précédentes, et votre position face à la moyenne de votre secteur. Vous choisissez la vue qui vous parle." />
      <div className="af-kpi" style={{ ...afPanel, padding: "28px clamp(16px, 3vw, 32px)", marginTop: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, color: AF_MUTED }}>Marge brute</span>
            <span style={{ fontSize: 13, color: "#f0905a", fontWeight: 600 }}>−2 pts vs 2025</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>57 %</div>
          <div style={{ marginTop: 22, fontSize: 13, fontWeight: 600, color: "#fff" }}>Ce que ça mesure</div>
          <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6, color: AF_MUTED }}>La part du chiffre d'affaires qui reste après les achats directs. C'est ce qui finance vos salaires, vos charges et votre résultat.</p>
          <div style={{ marginTop: 22, fontSize: 13, fontWeight: 600, color: "#fff" }}>Votre position dans le secteur</div>
          <div style={{ position: "relative", height: 8, borderRadius: 4, marginTop: 14, background: "linear-gradient(90deg, rgba(240,144,90,0.5), rgba(255,255,255,0.15), rgba(95,212,168,0.5))" }}>
            <span style={{ position: "absolute", left: "40%", top: -5, width: 1, height: 18, background: "rgba(255,255,255,0.6)" }} />
            <span style={{ position: "absolute", left: "62%", top: -6, width: 20, height: 20, marginLeft: -10, borderRadius: 999, background: "#f0c949", border: "3px solid #0b0d14" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: AF_MUTED, marginTop: 10 }}>
            <span>Bas du secteur</span><span>Moyenne 54 %</span><span>Haut du secteur</span>
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 13.5, color: "rgba(255,255,255,0.8)" }}>Au-dessus de la moyenne des menuiseries de 10 à 50 salariés.</p>
        </div>
        <div style={{ ...afBox, padding: 18 }}>
          <div className="af-seg" style={{ marginTop: 0, marginBottom: 18 }} role="tablist" aria-label="Type de vue">
            {[["line", "Courbe"], ["bars", "Barres"], ["table", "Tableau"]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={view === k} className={"af-segb" + (view === k ? " on" : "")} onClick={() => setView(k)}>{l}</button>
            ))}
          </div>
          <div key={view} className="cf-fade"><AfKpiViz view={view} /></div>
        </div>
      </div>
    </section>
  );
};

// —— 4. KPI personnalisés + 5. Export ——
const AF_EXPORT = ["Marge brute", "EBITDA", "BFR en jours", "Trésorerie nette", "Ratio d'endettement", "Mon KPI : marge par chantier"];
const AfCustomExport = () => {
  const [sel, setSel] = React.useState(["Marge brute", "EBITDA", "Trésorerie nette"]);
  const [fmt, setFmt] = React.useState("pdf");
  const toggle = (x) => setSel((s) => (s.includes(x) ? s.filter((y) => y !== x) : [...s, x]));
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <AfHead n="04" t="Vos propres KPI, et un export en un clic" d="Créez les indicateurs propres à votre métier à partir de vos comptes, puis partagez la sélection de votre choix par e-mail ou en document." />
      <div className="af-two">
        <div style={{ ...afPanel, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Nouveau KPI</div>
          <div style={{ fontSize: 12.5, color: AF_MUTED, marginTop: 16 }}>Nom</div>
          <div style={{ ...afBox, padding: "10px 12px", fontSize: 14, color: "#fff", marginTop: 6 }}>Marge par chantier</div>
          <div style={{ fontSize: 12.5, color: AF_MUTED, marginTop: 14 }}>Formule</div>
          <div style={{ ...afBox, padding: "10px 12px", marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            (<span className="cf-chip" style={{ color: "#f0c949" }}>CA chantiers · 706</span>−<span className="cf-chip" style={{ color: "#f0c949" }}>Achats · 601</span>−<span className="cf-chip" style={{ color: "#f0c949" }}>Sous-traitance · 604</span>) ÷ <span className="cf-chip" style={{ color: "#f0c949" }}>Nb chantiers</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <div><div style={{ fontSize: 12.5, color: AF_MUTED }}>Objectif</div><div style={{ ...afBox, padding: "10px 12px", fontSize: 14, color: "#fff", marginTop: 6 }}>12 000 €</div></div>
            <div><div style={{ fontSize: 12.5, color: AF_MUTED }}>Pilier</div><div style={{ ...afBox, padding: "10px 12px", fontSize: 14, color: "#fff", marginTop: 6 }}>Rentabilité</div></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 16, borderTop: `1px solid ${AF_LINE}` }}>
            <span style={{ fontSize: 13, color: AF_MUTED }}>Valeur actuelle : <b style={{ color: "#fff" }}>13 480 €</b></span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#5fd4a8" }}>Objectif atteint</span>
          </div>
        </div>
        <div style={{ ...afPanel, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Exporter la vue</div>
          <div style={{ marginTop: 12 }}>
            {AF_EXPORT.map((x) => {
              const on = sel.includes(x);
              return (
                <button key={x} className="af-check" onClick={() => toggle(x)} aria-pressed={on}>
                  <span className={"af-box" + (on ? " on" : "")} aria-hidden="true">{on ? "✓" : ""}</span>{x}
                </button>
              );
            })}
          </div>
          <div className="af-seg" style={{ marginTop: 16 }} role="tablist" aria-label="Format">
            {[["pdf", "PDF"], ["xlsx", "Excel"], ["mail", "E-mail"]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={fmt === k} className={"af-segb" + (fmt === k ? " on" : "")} onClick={() => setFmt(k)}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 16 }}>
            <span style={{ fontSize: 13, color: AF_MUTED }}>{sel.length} indicateur{sel.length > 1 ? "s" : ""} · comparaison N-1 incluse</span>
            <span style={{ fontSize: 13, padding: "9px 14px", borderRadius: 9, background: sel.length ? "#f0c949" : "rgba(255,255,255,0.08)", color: sel.length ? "#0b0d14" : AF_MUTED, fontWeight: 600, whiteSpace: "nowrap" }}>{fmt === "mail" ? "Envoyer" : "Télécharger"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const AnalyseExplainer = () => (
  <React.Fragment>
    <AfSources />
    <AfPillars />
    <AfKpi />
    <AfCustomExport />
    <style>{`
      .cf-chip { font-size: 11.5px; color: rgba(255,255,255,0.75); padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
      @keyframes afFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      .cf-fade { animation: afFade 400ms cubic-bezier(0.22,1,0.36,1) both; }
      .af-seg { display: inline-flex; gap: 4px; padding: 4px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); margin: 28px 0 16px; }
      .af-segb { all: unset; cursor: pointer; padding: 8px 14px; border-radius: 9px; font-size: 13.5px; color: rgba(255,255,255,0.65); transition: background-color 160ms ease, color 160ms ease; }
      .af-segb:hover { color: #fff; }
      .af-segb.on { background: #f0c949; color: #0b0d14; font-weight: 600; }
      .af-segb:focus-visible, .af-pillar:focus-visible, .af-check:focus-visible { outline: 2px solid rgba(240,201,73,0.6); outline-offset: 2px; }
      .af-flow { display: grid; grid-template-columns: minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(0,1fr); align-items: center; }
      .af-arrow { height: 1px; background: linear-gradient(90deg, rgba(240,201,73,0.2), #f0c949); position: relative; }
      .af-arrow::after { content: ""; position: absolute; right: -1px; top: -3px; border: 3.5px solid transparent; border-left: 5px solid #f0c949; }
      .af-pillars { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 32px; }
      .af-pillar { all: unset; box-sizing: border-box; cursor: pointer; display: block; padding: 22px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); transition: border-color 200ms ease, background-color 200ms ease; }
      .af-pillar.on { border-color: rgba(240,201,73,0.45); background: rgba(240,201,73,0.04); }
      .af-kpis { display: block; margin-top: 16px; opacity: 0.35; transition: opacity 200ms ease; }
      .af-pillar.on .af-kpis { opacity: 1; }
      .af-kpi { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 32px; align-items: start; }
      .af-two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; margin-top: 32px; }
      .af-check { all: unset; box-sizing: border-box; cursor: pointer; display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.07); font-size: 13.5px; color: rgba(255,255,255,0.85); }
      .af-box { width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0; display: grid; place-items: center; font-size: 11px; font-weight: 700; border: 1px solid rgba(255,255,255,0.25); color: #0b0d14; transition: background-color 140ms ease, border-color 140ms ease; }
      .af-box.on { background: #f0c949; border-color: #f0c949; }
      @media (max-width: 960px) {
        .af-flow { grid-template-columns: 1fr; gap: 0; }
        .af-arrow { width: 1px; height: 24px; justify-self: center; background: linear-gradient(rgba(240,201,73,0.2), #f0c949); }
        .af-arrow::after { right: auto; left: -3px; top: auto; bottom: -1px; border: 3.5px solid transparent; border-top: 5px solid #f0c949; }
        .af-pillars { grid-template-columns: 1fr 1fr; }
        .af-kpi, .af-two { grid-template-columns: 1fr; }
      }
      @media (max-width: 560px) { .af-pillars { grid-template-columns: 1fr; } }
    `}</style>
  </React.Fragment>
);

Object.assign(window, { AnalyseExplainer });
