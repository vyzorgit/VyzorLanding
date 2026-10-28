// tresorerie-flow.jsx — Page « Trésorerie » : sources → prévision → scénarios → encaissements → alertes

const TR_MUTED = "rgba(255,255,255,0.58)";
const TR_LINE = "rgba(255,255,255,0.08)";
const trPanel = { borderRadius: 20, background: "linear-gradient(180deg, #121a3a 0%, #0d1430 100%)", border: "1px solid rgba(255,255,255,0.07)" };
const trBox = { borderRadius: 12, border: `1px solid ${TR_LINE}`, background: "rgba(255,255,255,0.025)" };
const trNum = (v) => `${v > 0 ? "+" : ""}${v} k€`;

const TrHead = ({ t, d }) => (
  <div style={{ maxWidth: 680 }}>
    <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>{t}</h2>
    <p style={{ margin: "12px 0 0", fontSize: 16.5, lineHeight: 1.6, color: TR_MUTED, textWrap: "pretty" }}>{d}</p>
  </div>
);

const TrSeg = ({ items, value, onChange, label }) => (
  <div className="tr-seg" role="group" aria-label={label}>
    {items.map(([k, l]) => (
      <button key={k} type="button" aria-pressed={value === k} className={"tr-segb" + (value === k ? " on" : "")} onClick={() => onChange(k)}>{l}</button>
    ))}
  </div>
);

// —— Sources ——
const TrSources = () => (
  <section className="vz-reveal" style={{ marginTop: 112 }}>
    <TrHead t="Construite à partir de vos flux réels" d="La prévision ne repose pas sur un tableur rempli à la main. Vyzor part de votre comptabilité (factures, échéances, emprunts) pour projeter chaque entrée et chaque sortie. La connexion directe à vos comptes bancaires arrive bientôt." />
    <div className="tr-flow" style={{ ...trPanel, padding: "32px clamp(16px, 3vw, 32px)", marginTop: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["Comptes bancaires", "Synchronisation directe bientôt disponible"], ["Factures clients", "Encaissements attendus et retards"], ["Factures fournisseurs", "Décaissements à venir"], ["Échéances fiscales et sociales", "TVA, IS, URSSAF"], ["Emprunts", "Remboursements planifiés"]].map(([t, d]) => (
          <div key={t} style={{ ...trBox, padding: "11px 14px" }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>{t}</div>
            <div style={{ fontSize: 12.5, color: TR_MUTED, marginTop: 2 }}>{d}</div>
          </div>
        ))}
      </div>
      <span className="tr-arrow" aria-hidden="true" />
      <div style={{ ...trBox, padding: 18, borderColor: "rgba(240,201,73,0.4)" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Moteur de prévision</div>
        {["Rapprochement bancaire automatique", "Délais de paiement réels de chaque client", "Saisonnalité de votre historique"].map((x) => (
          <div key={x} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", padding: "9px 0", borderTop: `1px solid ${TR_LINE}`, marginTop: 8 }}>{x}</div>
        ))}
      </div>
      <span className="tr-arrow" aria-hidden="true" />
      <div style={{ ...trBox, padding: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Votre trésorerie</div>
        {[["Aujourd'hui", "214 k€", "#fff"], ["Dans 3 mois", "176 k€", "#fff"], ["Point bas", "+38 k€ en nov.", "#f0c949"]].map(([k, v, c]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderTop: `1px solid ${TR_LINE}`, marginTop: 6, fontSize: 13.5 }}>
            <span style={{ color: TR_MUTED }}>{k}</span><span style={{ color: c, fontWeight: 600, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// —— Prévision + scénarios ——
const TR_MONTHS = ["Juil", "Août", "Sept", "Oct", "Nov", "Déc", "Janv", "Févr", "Mars", "Avr", "Mai", "Juin"];
const TR_BASE = { in: [96, 70, 104, 80, 64, 124, 98, 96, 112, 108, 116, 122], out: [102, 94, 112, 140, 142, 94, 84, 84, 92, 92, 98, 102] };
const TR_SCEN = {
  base: { l: "Situation actuelle", d: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  hire: { l: "Deux embauches en mars", d: [0, 0, 0, 0, 0, 0, 0, 0, -14, -14, -14, -14] },
  client: { l: "Perte du premier client", d: [0, 0, -22, -22, -22, -22, -22, -22, -22, -22, -22, -22] },
  invest: { l: "Machine à 120 k€ comptant", d: [0, 0, -120, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
};
const trVerdict = (rows, low) => {
  const neg = rows.find((r) => r.bal < 0);
  const m = (r) => r.m.toLowerCase() + ".";
  if (neg) return { ok: false, v: `Trésorerie négative dès ${m(neg)}, point bas à ${trNum(low.bal)} en ${m(low)} Un financement est à prévoir.` };
  if (low.bal < 30) return { ok: false, v: `Trop juste : point bas à ${trNum(low.bal)} en ${m(low)}` };
  return { ok: true, v: `Le point bas reste à ${trNum(low.bal)} en ${m(low)} Votre trésorerie absorbe ce scénario.` };
};
const TrForecast = () => {
  const [h, setH] = React.useState(12);
  const [s, setS] = React.useState("base");
  const sc = TR_SCEN[s];
  let bal = 214;
  const rows = TR_MONTHS.slice(0, h).map((m, i) => {
    const inn = TR_BASE.in[i], out = TR_BASE.out[i] - sc.d[i];
    bal = bal + inn - out;
    return { m, inn, out, bal };
  });
  const low = rows.reduce((a, r) => (r.bal < a.bal ? r : a), rows[0]);
  const vd = trVerdict(rows, low);
  const W = 640, H = 150, maxB = 145, minV = -100, maxV = 230, BB = H + 70;
  const step = W / h;
  const yV = (v) => H - ((v - minV) / (maxV - minV)) * H;
  const barMax = Math.max(maxB, ...rows.map((r) => Math.max(r.inn, r.out)));
  const yBar = (v) => (v / barMax) * 48;
  const line = rows.map((r, i) => `${i ? "L" : "M"}${(i + 0.5) * step},${yV(r.bal)}`).join(" ");
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <TrHead t="Une prévision glissante, et tous vos scénarios" d="Choisissez l'horizon, puis testez une décision avant de la prendre. Vyzor recalcule chaque mois et vous indique si votre trésorerie le supporte." />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", margin: "28px 0 16px" }}>
        <TrSeg label="Horizon" value={h} onChange={setH} items={[[3, "3 mois"], [6, "6 mois"], [12, "12 mois"]]} />
        <TrSeg label="Scénario" value={s} onChange={setS} items={Object.entries(TR_SCEN).map(([k, v]) => [k, v.l])} />
      </div>
      <div className="tr-fc" style={{ ...trPanel, padding: "24px clamp(16px, 3vw, 28px)" }}>
        <div style={{ minWidth: 0 }}>
          <svg viewBox={`0 -14 ${W} ${BB + 34}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label={`Prévision de trésorerie sur ${h} mois, scénario ${sc.l.toLowerCase()} : solde de fin de période ${trNum(rows[rows.length - 1].bal)}, point bas ${trNum(low.bal)} en ${low.m.toLowerCase()}.`}>
            <defs>
              <pattern id="trHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="4" fill="#f0905a" />
                <rect width="1.6" height="4" fill="#0d1430" opacity="0.55" />
              </pattern>
            </defs>
            <line x1="0" x2={W} y1={yV(0)} y2={yV(0)} stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" />
            <text x="4" y={yV(0) - 6} fill="rgba(255,255,255,0.65)" fontSize="11">0 €</text>
            <line x1="0" x2={W} y1={H + 14} y2={H + 14} stroke="rgba(255,255,255,0.06)" />
            {rows.map((r, i) => (
              <g key={r.m}>
                <rect x={(i + 0.5) * step - Math.min(10, step * 0.18) - 1} y={BB - yBar(r.inn)} width={Math.min(10, step * 0.18)} height={yBar(r.inn)} rx="2" fill="#5fd4a8" />
                <rect x={(i + 0.5) * step + 1} y={BB - yBar(r.out)} width={Math.min(10, step * 0.18)} height={yBar(r.out)} rx="2" fill="url(#trHatch)" />
                <text x={(i + 0.5) * step} y={BB + 18} fill="rgba(255,255,255,0.65)" fontSize="11" textAnchor="middle">{r.m}</text>
              </g>
            ))}
            <path d={line} fill="none" stroke="#f0c949" strokeWidth="2.2" style={{ transition: "d 400ms ease" }} />
            {rows.map((r, i) => <circle key={r.m} cx={(i + 0.5) * step} cy={yV(r.bal)} r={r === low ? 5 : 2.5} fill={r === low ? "#0d1430" : "#f0c949"} stroke="#f0c949" strokeWidth="2" />)}
            <text x={Math.min(Math.max((rows.indexOf(low) + 0.5) * step, 60), W - 60)} y={yV(low.bal) + 22} fill="#f0c949" fontSize="12" fontWeight="600" textAnchor="middle">point bas {trNum(low.bal)}</text>
          </svg>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12.5, color: TR_MUTED, marginTop: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 10, height: 10, borderRadius: 2, background: "#5fd4a8" }} />Encaissements (barre pleine)</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 10, height: 10, borderRadius: 2, background: "repeating-linear-gradient(135deg, #f0905a 0 2px, #1c1410 2px 3.5px)" }} />Décaissements (barre hachurée)</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 14, height: 2, background: "#f0c949" }} />Solde de trésorerie</span>
          </div>
        </div>
        <div style={{ ...trBox, padding: 18, alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 13, color: TR_MUTED }}>Solde fin de période</span>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{trNum(rows[rows.length - 1].bal)}</span>
          <span style={{ fontSize: 13, color: TR_MUTED, marginTop: 14 }}>Point bas</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: low.bal < 30 ? "#f0905a" : "#f0c949", fontVariantNumeric: "tabular-nums" }}>{trNum(low.bal)} <span style={{ fontSize: 13, fontWeight: 500, color: TR_MUTED }}>en {low.m.toLowerCase()}.</span></span>
          <div key={s + h} className="tr-fade" style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${TR_LINE}`, fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
            <span style={{ display: "block", fontWeight: 600, color: vd.ok ? "#5fd4a8" : "#f0905a", marginBottom: 4 }}>{vd.ok ? "Viable" : "À risque"}</span>{vd.v}
          </div>
        </div>
      </div>
    </section>
  );
};

// —— Encaissements ——
const TR_CLIENTS = [
  { n: "Bâtisseurs SARL", f: "F-2026-098", m: 5200, r: 32, p: "Haute" },
  { n: "Groupe Madec", f: "F-2026-104", m: 8400, r: 18, p: "Moyenne" },
  { n: "Atelier Brunet", f: "F-2026-112", m: 2150, r: 9, p: "Faible" },
];
const TrReceivables = () => {
  const [sent, setSent] = React.useState([]);
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <TrHead t="Vos encaissements, suivis et relancés" d="Chaque facture en retard est classée par montant et par risque, selon l'historique de paiement du client. Une relance se prépare et s'envoie depuis la même vue." />
      <div style={{ ...trPanel, padding: "8px clamp(16px, 3vw, 28px) 20px", marginTop: 32 }}>
        <div className="tr-row tr-th"><span>Client</span><span>Facture</span><span>Montant</span><span>Retard</span><span>Priorité</span><span></span></div>
        {TR_CLIENTS.map((c) => {
          const done = sent.includes(c.f);
          return (
            <div key={c.f} className="tr-row">
              <span style={{ color: "#fff", fontWeight: 500 }}>{c.n}</span>
              <span style={{ color: TR_MUTED }}>{c.f}</span>
              <span style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>{c.m.toLocaleString("fr-FR")} €</span>
              <span style={{ color: c.r > 30 ? "#f0905a" : "rgba(255,255,255,0.8)" }}>{c.r} jours</span>
              <span style={{ color: c.p === "Haute" ? "#f0905a" : c.p === "Moyenne" ? "#f0c949" : TR_MUTED }}>{c.p}</span>
              <span style={{ textAlign: "right" }}>
                <button className={"tr-btn" + (done ? " done" : "")} onClick={() => setSent((s) => (s.includes(c.f) ? s : [...s, c.f]))}>{done ? "Relance envoyée" : "Relancer"}</button>
              </span>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 16, fontSize: 14 }}>
          <span style={{ color: TR_MUTED }}>Total à récupérer</span>
          <span style={{ color: "#f0c949", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>15 750 €</span>
        </div>
      </div>
    </section>
  );
};

// —— Alertes ——
const TrAlerts = () => {
  const [th, setTh] = React.useState(30);
  return (
    <section className="vz-reveal" style={{ marginTop: 112 }}>
      <TrHead t="Prévenu avant la tension, pas après" d="Fixez votre seuil de sécurité. Dès que la prévision passe en dessous, Vyzor vous alerte avec la cause et les options possibles." />
      <div className="tr-two" style={{ marginTop: 32 }}>
        <div style={{ ...trPanel, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Seuil de sécurité</div>
          <div style={{ fontSize: 13.5, color: TR_MUTED, marginTop: 4 }}>M'alerter si la trésorerie prévue passe sous :</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#f0c949", letterSpacing: "-0.02em", margin: "18px 0 10px", fontVariantNumeric: "tabular-nums" }}>{th} k€</div>
          <input className="tr-range" type="range" min="10" max="80" step="5" value={th} onChange={(e) => setTh(+e.target.value)} aria-label="Seuil de sécurité en k€" />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: TR_MUTED, marginTop: 6 }}><span>10 k€</span><span>80 k€</span></div>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${TR_LINE}`, fontSize: 13.5, color: "rgba(255,255,255,0.85)" }}>
            {th > 38 ? <span><b style={{ color: "#f0905a" }}>1 alerte active</b> : point bas prévu à 38 k€ en novembre.</span> : <span><b style={{ color: "#5fd4a8" }}>Aucune alerte</b> : la prévision reste au-dessus de votre seuil.</span>}
          </div>
        </div>
        <div style={{ ...trPanel, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Exemple d'alerte</div>
          <div style={{ ...trBox, padding: 16, borderColor: "rgba(240,144,90,0.35)" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Point bas de 38 k€ prévu en novembre</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: TR_MUTED, marginTop: 6 }}>Cause : échéance d'IS de 41 k€ et paiement attendu de Groupe Madec décalé de 3 semaines.</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 14 }}>Options proposées</div>
            {["Relancer Groupe Madec dès maintenant", "Demander un étalement de l'IS", "Activer la ligne de crédit de 50 k€"].map((x) => (
              <div key={x} style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", padding: "8px 0", borderTop: `1px solid ${TR_LINE}`, marginTop: 6 }}>{x}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TresorerieExplainer = () => (
  <React.Fragment>
    <TrSources />
    <TrForecast />
    <TrReceivables />
    <TrAlerts />
    <style>{`
      .tr-seg { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 4px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
      .tr-segb { all: unset; cursor: pointer; padding: 8px 13px; border-radius: 9px; font-size: 13px; color: rgba(255,255,255,0.65); transition: background-color 160ms ease, color 160ms ease; }
      .tr-segb:hover { color: #fff; }
      .tr-segb.on { background: #f0c949; color: #0d1430; font-weight: 600; }
      .tr-segb:focus-visible, .tr-btn:focus-visible { outline: 2px solid rgba(240,201,73,0.6); outline-offset: 2px; }
      .tr-flow { display: grid; grid-template-columns: minmax(0,1fr) 28px minmax(0,1fr) 28px minmax(0,1fr); align-items: center; }
      .tr-arrow { height: 1px; background: linear-gradient(90deg, rgba(240,201,73,0.2), #f0c949); position: relative; }
      .tr-arrow::after { content: ""; position: absolute; right: -1px; top: -3px; border: 3.5px solid transparent; border-left: 5px solid #f0c949; }
      .tr-fc { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 24px; align-items: start; }
      .tr-row { display: grid; grid-template-columns: 1.4fr 1fr 0.9fr 0.8fr 0.8fr 130px; gap: 12px; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 13.5px; }
      .tr-th { font-size: 12.5px; color: rgba(255,255,255,0.6); padding: 12px 0; }
      .tr-btn { all: unset; cursor: pointer; font-size: 12.5px; font-weight: 600; padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(240,201,73,0.4); color: #f0c949; transition: background-color 160ms ease; white-space: nowrap; }
      .tr-btn:hover { background: rgba(240,201,73,0.08); }
      .tr-btn.done { border-color: rgba(95,212,168,0.4); color: #5fd4a8; cursor: default; }
      .tr-two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }
      .tr-range { width: 100%; accent-color: #f0c949; }
      @keyframes trFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      .tr-fade { animation: trFade 400ms cubic-bezier(0.22,1,0.36,1) both; }
      @media (max-width: 960px) {
        .tr-flow { grid-template-columns: 1fr; }
        .tr-arrow { width: 1px; height: 24px; justify-self: center; background: linear-gradient(rgba(240,201,73,0.2), #f0c949); }
        .tr-arrow::after { right: auto; left: -3px; top: auto; bottom: -1px; border: 3.5px solid transparent; border-top: 5px solid #f0c949; }
        .tr-fc, .tr-two { grid-template-columns: 1fr; }
        .tr-row { grid-template-columns: 1.4fr 1fr 1fr; }
        .tr-row > :nth-child(2), .tr-row > :nth-child(5) { display: none; }
        .tr-row > :nth-child(6) { grid-column: 1 / -1; text-align: left !important; }
        .tr-th > :nth-child(6) { display: none; }
      }
      @media (prefers-reduced-motion: reduce) { .tr-fade { animation: none; } }
    `}</style>
  </React.Fragment>
);

Object.assign(window, { TresorerieExplainer });
