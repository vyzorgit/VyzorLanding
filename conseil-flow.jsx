// conseil-flow.jsx — Schéma interactif : orchestrateur → agents spécialisés → agent d'actions

const CF_AGENTS = [
  { id: "juridique", name: "Juriste", role: "Droit des sociétés, contrats", data: ["Statuts", "PV d'AG", "Contrats", "Baux"] },
  { id: "fiscal", name: "Fiscaliste", role: "Impôts, TVA, optimisation", data: ["Liasse fiscale", "Déclarations TVA", "Barèmes 2026"] },
  { id: "treso", name: "Trésorier", role: "Flux, prévisions, encaissements", data: ["Relevés bancaires", "Échéanciers", "Balance âgée"] },
  { id: "analyste", name: "Analyste", role: "Marges, rentabilité, budget", data: ["FEC", "Grand livre", "Budget"] },
];

const CF_QUESTIONS = [
  { q: "Puis-je recruter deux CDI en mars ?", agents: ["treso", "fiscal", "analyste"], action: null,
    a: "Oui. Trésorerie positive sur 12 mois, point bas à +38 k€ en novembre. 8 400 € d'aides à l'embauche déjà intégrées." },
  { q: "Relance mes clients en retard de paiement.", agents: ["treso"], action: "3 e-mails de relance rédigés, montants et factures joints.",
    a: "15 750 € à récupérer sur 3 clients. Relances prêtes, à valider avant envoi." },
  { q: "Prépare un dossier de financement pour ma banque.", agents: ["analyste", "treso", "juridique"], action: "Dossier PDF généré : comptes, prévisionnel, Kbis et statuts.",
    a: "Dossier de 14 pages prêt : synthèse, prévisionnel 24 mois, capacité de remboursement." },
  { q: "Puis-je verser un dividende cette année ?", agents: ["juridique", "fiscal", "analyste"], action: null,
    a: "Oui, jusqu'à 42 k€ de bénéfice distribuable. Comparatif dividende / rémunération fourni." },
];

const ConseilFlow = () => {
  const gold = "#f0c949";
  const [i, setI] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  React.useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % CF_QUESTIONS.length), 6000);
    return () => clearInterval(id);
  }, [auto]);
  const cur = CF_QUESTIONS[i];
  const on = (id) => cur.agents.includes(id);

  return (
    <section className="cf vz-reveal" style={{ marginTop: 112 }}>
      <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Comment fonctionne le conseil</h2>
      <p style={{ margin: "14px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "rgba(255,255,255,0.58)", maxWidth: 680, textWrap: "pretty" }}>
        Chaque question est analysée par un orchestrateur, qui fait appel aux seuls agents spécialisés utiles. Chacun travaille sur ses propres données. L'agent d'actions exécute ensuite ce qui doit l'être.
      </p>

      <div className="cf-qs" role="tablist" aria-label="Exemples de questions">
        {CF_QUESTIONS.map((x, k) => (
          <button key={k} role="tab" aria-selected={k === i} className={"cf-q" + (k === i ? " on" : "")}
            onClick={() => { setI(k); setAuto(false); }}>{x.q}</button>
        ))}
      </div>

      <div className="cf-board">
        <div className="cf-node cf-user">
          <span className="cf-label">Votre question</span>
          <span key={"q" + i} className="cf-fade" style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{cur.q}</span>
        </div>
        <span className="cf-v on" aria-hidden="true" />
        <div className="cf-node cf-orch on">
          <span className="cf-ic"><VzfIcon name="conseil" size={16} /></span>
          <span>
            <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#fff" }}>Orchestrateur</span>
            <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.58)" }}>Comprend la demande et mobilise {cur.agents.length} agent{cur.agents.length > 1 ? "s" : ""}</span>
          </span>
        </div>
        <span className="cf-v on" aria-hidden="true" />
        <div className="cf-bus" aria-hidden="true">
          {CF_AGENTS.map((ag) => <span key={ag.id} className={"cf-drop" + (on(ag.id) ? " on" : "")} />)}
        </div>
        <div className="cf-agents">
          {CF_AGENTS.map((ag) => (
            <div key={ag.id} className={"cf-node cf-agent" + (on(ag.id) ? " on" : "")}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{ag.name}</span>
                <span className="cf-state">{on(ag.id) ? "Sollicité" : "En veille"}</span>
              </span>
              <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{ag.role}</span>
              <span className="cf-data">
                {ag.data.map((d) => <span key={d} className="cf-chip">{d}</span>)}
              </span>
            </div>
          ))}
        </div>
        <div className="cf-bus cf-bus-up" aria-hidden="true">
          {CF_AGENTS.map((ag) => <span key={ag.id} className={"cf-drop" + (on(ag.id) ? " on" : "")} />)}
        </div>
        <span className={"cf-v" + (cur.action ? " on" : "")} aria-hidden="true" />
        <div className={"cf-node cf-action" + (cur.action ? " on" : "")}>
          <span className="cf-ic"><VzfIcon name="connexions" size={16} /></span>
          <span>
            <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#fff" }}>Agent d'actions</span>
            <span key={"a" + i} className="cf-fade" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.58)" }}>{cur.action || "Aucune action requise pour cette question"}</span>
          </span>
        </div>
        <span className="cf-v on" aria-hidden="true" />
        <div className="cf-node cf-answer">
          <span className="cf-label" style={{ color: gold }}>Réponse</span>
          <span key={"r" + i} className="cf-fade" style={{ fontSize: 15.5, lineHeight: 1.55, color: "#fff" }}>{cur.a}</span>
        </div>
      </div>

      <style>{`
        .cf-qs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
        .cf-q { font: inherit; font-size: 13.5px; color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px; padding: 9px 15px; cursor: pointer; transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease; }
        .cf-q:hover { color: #fff; border-color: rgba(255,255,255,0.22); }
        .cf-q.on { color: #0b0d14; background: #f0c949; border-color: #f0c949; font-weight: 600; }
        .cf-board { display: flex; flex-direction: column; align-items: center; margin-top: 28px; padding: 36px clamp(16px, 3vw, 36px); border-radius: 20px; background: linear-gradient(180deg, #10131b 0%, #0b0d14 100%); border: 1px solid rgba(255,255,255,0.07); }
        .cf-node { border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.025); transition: border-color 300ms ease, opacity 300ms ease, background-color 300ms ease; }
        .cf-user, .cf-answer { width: min(560px, 100%); padding: 16px 20px; display: flex; flex-direction: column; gap: 6px; text-align: center; }
        .cf-answer { border-color: rgba(240,201,73,0.3); background: rgba(240,201,73,0.04); }
        .cf-label { font-size: 12.5px; color: rgba(255,255,255,0.5); }
        .cf-orch, .cf-action { display: flex; align-items: center; gap: 14px; padding: 14px 20px; width: min(480px, 100%); }
        .cf-orch.on, .cf-action.on { border-color: rgba(240,201,73,0.4); }
        .cf-action:not(.on) { opacity: 0.45; }
        .cf-ic { width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0; display: grid; place-items: center; color: #f0c949; background: rgba(240,201,73,0.06); border: 1px solid rgba(240,201,73,0.22); }
        .cf-v { width: 1px; height: 28px; background: rgba(255,255,255,0.10); transition: background-color 300ms ease; }
        .cf-v.on { background: linear-gradient(#f0c949, rgba(240,201,73,0.3)); }
        .cf-bus { position: relative; width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; height: 22px; }
        .cf-bus::before { content: ""; position: absolute; top: 0; left: 12.5%; right: 12.5%; height: 1px; background: rgba(255,255,255,0.12); }
        .cf-bus-up::before { top: auto; bottom: 0; }
        .cf-drop { justify-self: center; width: 1px; height: 100%; background: rgba(255,255,255,0.10); transition: background-color 300ms ease; }
        .cf-drop.on { background: #f0c949; }
        .cf-agents { width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .cf-agent { padding: 16px; opacity: 0.4; }
        .cf-agent.on { opacity: 1; border-color: rgba(240,201,73,0.45); background: rgba(240,201,73,0.04); }
        .cf-state { font-size: 11.5px; color: rgba(255,255,255,0.45); white-space: nowrap; }
        .cf-agent.on .cf-state { color: #f0c949; }
        .cf-data { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .cf-chip { font-size: 11.5px; color: rgba(255,255,255,0.75); padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
        @keyframes cfFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .cf-fade { animation: cfFade 400ms cubic-bezier(0.22,1,0.36,1) both; }
        @media (max-width: 860px) {
          .cf-agents { grid-template-columns: 1fr 1fr; }
          .cf-bus { display: none; }
          .cf-agents { margin: 14px 0; }
        }
        @media (max-width: 520px) { .cf-agents { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .cf-fade { animation: none; } }
      `}</style>
    </section>
  );
};

// —— « Ce que le conseil sait faire » : onglets + exemple concret ——
const ccRow = { display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: 13.5 };
const CC_ITEMS = [
  { t: "Analyses détaillées", d: "Une lecture complète de vos chiffres, expliquée poste par poste.",
    ex: () => (
      <div>
        <div className="cc-ask">Pourquoi ma marge a baissé ce trimestre ?</div>
        <div style={{ fontSize: 14, color: "#fff", margin: "18px 0 12px" }}>Marge brute : <b>62 % → 57 %</b>. Trois causes :</div>
        {[["Achats matières", "−3,4 pts", 68], ["Sous-traitance", "−1,1 pt", 22], ["Transport", "−0,5 pt", 10]].map(([k, v, w]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "130px 1fr 60px", alignItems: "center", gap: 12, padding: "7px 0", fontSize: 13 }}>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{k}</span>
            <span style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)" }}><span style={{ display: "block", height: "100%", width: w + "%", borderRadius: 3, background: "#f0905a" }} /></span>
            <span style={{ color: "#f0905a", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v}</span>
          </div>
        ))}
      </div>
    ) },
  { t: "Recherche instantanée", d: "Une facture, un montant, une clause : retrouvés en quelques secondes.",
    ex: () => (
      <div>
        <div className="cc-ask">Combien ai-je payé à Texol depuis janvier ?</div>
        <div style={{ marginTop: 18, fontSize: 28, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>48 210 €</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>11 factures · compte 601</div>
        {[["F-2026-118", "12 mars", "4 980 €"], ["F-2026-141", "9 avril", "5 120 €"], ["F-2026-176", "14 mai", "5 340 €"]].map(([n, dt, m]) => (
          <div key={n} style={ccRow}><span style={{ color: "#fff" }}>{n}</span><span style={{ color: "rgba(255,255,255,0.55)" }}>{dt}</span><span style={{ color: "#fff", fontVariantNumeric: "tabular-nums" }}>{m}</span></div>
        ))}
      </div>
    ) },
  { t: "Simulations", d: "Tous les scénarios testés sur vos propres chiffres, avec leur viabilité.",
    ex: () => (
      <div>
        <div className="cc-ask">J'investis 120 k€ dans une machine : cash ou emprunt ?</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10, marginTop: 18 }}>
          {[["Comptant", "+4 k€", "Risqué", "#f0905a"], ["Emprunt 5 ans", "+61 k€", "Viable", "#5fd4a8"], ["Crédit-bail", "+48 k€", "Viable", "#5fd4a8"]].map(([k, v, s, c]) => (
            <div key={k} style={{ padding: 14, borderRadius: 12, border: `1px solid ${s === "Viable" && k === "Emprunt 5 ans" ? "rgba(240,201,73,0.45)" : "rgba(255,255,255,0.08)"}`, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{k}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "8px 0 2px", fontVariantNumeric: "tabular-nums" }}>{v}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>point bas tréso</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: c, marginTop: 10 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", marginTop: 14 }}>Recommandation : emprunt sur 5 ans, la trésorerie reste confortable toute l'année.</div>
      </div>
    ) },
  { t: "E-mails", d: "Relances clients, fournisseurs, comptable : rédigées et prêtes à partir.",
    ex: () => (
      <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", overflow: "hidden" }}>
        {[["À", "compta@batisseurs-sarl.fr"], ["Objet", "Facture F-2026-098 : 5 200 € en attente"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 12, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: 13 }}><span style={{ width: 44, color: "rgba(255,255,255,0.45)" }}>{k}</span><span style={{ color: "#fff" }}>{v}</span></div>
        ))}
        <div style={{ padding: "14px 16px", fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
          Bonjour,<br />Sauf erreur de notre part, la facture F-2026-098 du 2 mai reste à régler. Vous la trouverez en pièce jointe. Pourriez-vous nous indiquer une date de paiement ?<br />Bien cordialement
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "0 16px 14px" }}>
          <span style={{ fontSize: 12.5, padding: "7px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}>Modifier</span>
          <span style={{ fontSize: 12.5, padding: "7px 12px", borderRadius: 8, background: "#f0c949", color: "#0b0d14", fontWeight: 600 }}>Envoyer</span>
        </div>
      </div>
    ) },
  { t: "Documents financiers", d: "Dossiers pour la banque, les partenaires ou les investisseurs.",
    ex: () => (
      <div>
        <div className="cc-ask">Prépare un dossier de financement pour ma banque.</div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 18 }}>
          <div style={{ width: 92, height: 120, flexShrink: 0, borderRadius: 8, background: "#f4f1ea", padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ height: 6, width: "60%", background: "#c9a63a", borderRadius: 2 }} />
            {[90, 75, 85, 60, 80, 70].map((w, k) => <span key={k} style={{ height: 3, width: w + "%", background: "#cfcabd", borderRadius: 2 }} />)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Dossier de financement 2026.pdf</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>14 pages</div>
            {["Synthèse de l'activité", "Comptes des 3 derniers exercices", "Prévisionnel sur 24 mois", "Capacité de remboursement"].map((s) => (
              <div key={s} style={{ ...ccRow, padding: "7px 0", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    ) },
];

const ConseilCapabilities = () => {
  const [i, setI] = React.useState(0);
  const Ex = CC_ITEMS[i].ex;
  return (
    <section className="cc vz-reveal" style={{ marginTop: 112 }}>
      <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Ce que le conseil sait faire</h2>
      <div className="cc-grid">
        <div className="cc-list" role="tablist" aria-label="Capacités du conseil">
          {CC_ITEMS.map((it, k) => (
            <button key={it.t} role="tab" aria-selected={k === i} className={"cc-tab" + (k === i ? " on" : "")}
              onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
              <span className="cc-t">{it.t}</span>
              <span className="cc-d">{it.d}</span>
            </button>
          ))}
        </div>
        <div className="cc-panel" role="tabpanel">
          <div className="cc-panel-label">Exemple</div>
          <div key={i} className="cf-fade"><Ex /></div>
        </div>
      </div>
      <style>{`
        .cc-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 28px; margin-top: 32px; align-items: stretch; }
        .cc-list { display: flex; flex-direction: column; }
        .cc-tab { all: unset; box-sizing: border-box; cursor: pointer; display: block; padding: 18px 20px; border-top: 1px solid rgba(255,255,255,0.08); position: relative; transition: background-color 160ms ease; }
        .cc-tab:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cc-tab::before { content: ""; position: absolute; left: 0; top: -1px; height: 1px; width: 0; background: #f0c949; transition: width 300ms cubic-bezier(0.22,1,0.36,1); }
        .cc-tab.on::before { width: 100%; }
        .cc-tab:focus-visible { outline: 2px solid rgba(240,201,73,0.6); outline-offset: -2px; }
        .cc-t { display: block; font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: -0.01em; transition: color 160ms ease; }
        .cc-tab.on .cc-t, .cc-tab:hover .cc-t { color: #fff; }
        .cc-d { display: block; font-size: 14px; line-height: 1.55; color: rgba(255,255,255,0.5); margin-top: 4px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 300ms ease, opacity 300ms ease; }
        .cc-tab.on .cc-d { max-height: 60px; opacity: 1; }
        .cc-panel { padding: 26px; border-radius: 20px; background: linear-gradient(180deg, #10131b 0%, #0b0d14 100%); border: 1px solid rgba(255,255,255,0.07); min-height: 360px; }
        .cc-panel-label { font-size: 12.5px; color: rgba(255,255,255,0.45); margin-bottom: 14px; }
        .cc-ask { display: inline-block; padding: 10px 14px; border-radius: 14px 14px 4px 14px; background: rgba(255,255,255,0.06); font-size: 13.5px; color: #fff; }
        @media (max-width: 860px) { .cc-grid { grid-template-columns: 1fr; } .cc-panel { min-height: 0; } }
      `}</style>
    </section>
  );
};

Object.assign(window, { ConseilFlow, ConseilCapabilities });
