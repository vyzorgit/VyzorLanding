// home-genui-demo.jsx — Visuels produit de l'accueil (17/11/2026).
// VzDashPreview : une page Vyzor (indicateurs, courbe, points clés), utilisée dans le hero.
// GenUiDemo : démo animée de la génération d'une page par l'agent — on tape la demande,
// on clique « Créer », l'agent compose la page bloc par bloc, puis le menu « ⋯ » propose
// l'export et la personnalisation. Libellés repris de l'app (PageComposer, BlockPageActions).
// Données fictives. Démarre à l'entrée en vue ; reduced-motion = état final directement.

const VZG = {
  gold: "#f0c949", text: "rgba(255,255,255,0.92)", muted: "rgba(255,255,255,0.55)",
  line: "rgba(255,255,255,0.08)", panel: "rgba(255,255,255,0.035)", up: "#2dd4bf",
};

const VZ_DEMO_KPIS = [
  { k: "Chiffre d'affaires", v: "1,8 M€", d: "+12 % sur 12 mois" },
  { k: "EBITDA", v: "182 k€", d: "Marge 10,1 %" },
  { k: "Trésorerie", v: "214 k€", d: "Point bas : 9 k€ en janvier" },
  { k: "Besoin en fonds de roulement", v: "41 j", d: "−6 j sur un an" },
];
const VZ_DEMO_SERIES = [118, 124, 121, 132, 129, 138, 141, 139, 150, 156, 161, 172];
const VZ_DEMO_POINTS = [
  "Croissance régulière, portée par les trois premiers clients.",
  "Marge en hausse de 1,4 point grâce aux achats renégociés.",
  "Trésorerie suffisante pour financer le recrutement prévu.",
];

// Le rapport investisseur de la démo : d'autres indicateurs que le tableau de bord du hero.
const VZ_INVEST_KPIS = [
  { k: "Croissance du chiffre d'affaires", v: "+12 %", d: "1,8 M€ sur 12 mois" },
  { k: "Marge d'EBITDA", v: "10,1 %", d: "+1,4 pt sur un an" },
  { k: "Autonomie de trésorerie", v: "14 mois", d: "Sans nouveau financement" },
  { k: "Clients récurrents", v: "68 %", d: "Du chiffre d'affaires" },
];
const VZ_INVEST_POINTS = [
  "Croissance rentable : la marge progresse avec le volume.",
  "Dépendance modérée : premier client à 14 % du chiffre d'affaires.",
  "Besoin de financement couvert jusqu'au prochain exercice.",
];

// —— Fenêtre d'application (barre + contenu) ——
const VzAppFrame = ({ title, children, style }) => (
  <div style={{
    borderRadius: 16, overflow: "hidden", background: "#0c1230",
    border: "1px solid rgba(140,160,255,0.16)",
    boxShadow: "0 40px 90px -38px rgba(0,0,0,0.85), 0 0 60px -30px rgba(240,201,73,0.22)",
    textAlign: "left", ...style,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", borderBottom: `1px solid ${VZG.line}`, background: "rgba(255,255,255,0.02)" }}>
      {[0, 1, 2].map((i) => <span key={i} aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 99, background: "rgba(255,255,255,0.14)" }} />)}
      <span style={{ marginLeft: 10, fontSize: 12, color: VZG.muted }}>{title}</span>
    </div>
    {children}
  </div>
);

// —— Courbe ——
const VzSpark = ({ data, w = 520, h = 120 }) => {
  const min = Math.min(...data) * 0.92, max = Math.max(...data) * 1.03;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / (max - min)) * h]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden="true" style={{ display: "block" }}>
      <defs>
        <linearGradient id="vzSparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f0c949" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f0c949" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#vzSparkFill)" />
      <path d={d} fill="none" stroke="#f0c949" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

// —— Une page Vyzor ; `shown` = nombre de blocs visibles (animation de composition) ——
const VzDashPreview = ({ title, subtitle, shown = 3, menu = null, compact = false, hidePointsMobile = false, kpis = VZ_DEMO_KPIS, points = VZ_DEMO_POINTS, chartTitle = "Chiffre d'affaires mensuel (k€)" }) => {
  const block = (i) => ({
    opacity: shown > i ? 1 : 0,
    transform: shown > i ? "none" : "translateY(10px)",
    transition: "opacity 420ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)",
  });
  return (
    <div style={{ padding: compact ? 16 : 20, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: compact ? 15 : 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 12, color: VZG.muted, marginTop: 3 }}>{subtitle}</div> : null}
        </div>
        {menu}
      </div>
      <div className="vzg-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, ...block(0) }}>
        {kpis.map((x) => (
          <div key={x.k} style={{ padding: "10px 12px", borderRadius: 10, background: VZG.panel, border: `1px solid ${VZG.line}`, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: VZG.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.k}</div>
            <div style={{ fontSize: compact ? 17 : 19, fontWeight: 700, color: "#fff", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{x.v}</div>
            <div style={{ fontSize: 10.5, color: VZG.up, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.d}</div>
          </div>
        ))}
      </div>
      <div className="vzg-row" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 8, marginTop: 8 }}>
        <div style={{ padding: "12px 12px 8px", borderRadius: 10, background: VZG.panel, border: `1px solid ${VZG.line}`, ...block(1) }}>
          <div style={{ fontSize: 11.5, color: VZG.muted, marginBottom: 8 }}>{chartTitle}</div>
          <VzSpark data={VZ_DEMO_SERIES} h={compact ? 84 : 104} />
        </div>
        <div className={hidePointsMobile ? "vzg-hide-m" : undefined} style={{ padding: 12, borderRadius: 10, background: VZG.panel, border: `1px solid ${VZG.line}`, ...block(2) }}>
          <div style={{ fontSize: 11.5, color: VZG.muted, marginBottom: 8 }}>Points clés</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
            {points.map((p) => (
              <li key={p} style={{ display: "grid", gridTemplateColumns: "10px 1fr", gap: 6, fontSize: 11.5, lineHeight: 1.45, color: VZG.text }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 9, background: VZG.gold, marginTop: 6 }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// —— Visuel du hero : capture réelle de l'app (page « Rapport investisseur », données de démonstration) ——
// —— Illustration du hero (19/11/2026) : le directeur financier « en boîte ».
// À gauche vos données (comptabilité, banque, factures) ; on branche la boîte ; à droite ce
// qu'elle rend, dans l'ordre du sous-titre : analyse en temps réel, tâches automatisées,
// levier à actionner. Illustration pure, sans chiffres ni écran de l'app.
const VZB_SRC = [140, 215, 290];
const HeroProductShot = () => {
  const g = "#f0c949";
  const ic = { fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const tile = (x, y, children, cls = "") => (
    <g className={cls} transform={`translate(${x - 28} ${y - 28})`}>
      <rect width="56" height="56" rx="14" fill="#121a42" stroke="rgba(140,160,255,0.28)" strokeWidth="1.2" />
      <g transform="translate(16 16)">{children}</g>
    </g>
  );
  return (
    <div className="vz-box" aria-hidden="true">
      <style>{`
        .vz-box { position: relative; width: 100%; max-width: 540px; margin: 0 auto; }
        .vz-box svg { display: block; width: 100%; height: auto; overflow: visible; }
        @keyframes vzbFlow { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        @keyframes vzbGlow { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes vzbOut { 0%, 12% { opacity: 0.25; } 22%, 78% { opacity: 1; } 90%, 100% { opacity: 0.25; } }
        @keyframes vzbRay { 0%, 12% { stroke-opacity: 0.12; } 22%, 78% { stroke-opacity: 0.9; } 90%, 100% { stroke-opacity: 0.12; } }
        .vz-box .flow { stroke-dasharray: 6 14; animation: vzbFlow 1.6s linear infinite; }
        .vz-box .core { animation: vzbGlow 3.6s ease-in-out infinite; }
        .vz-box .out { animation: vzbOut 4.8s ease-in-out infinite; }
        .vz-box .ray { animation: vzbRay 4.8s ease-in-out infinite; }
        .vz-box .d2 { animation-delay: 0.6s; } .vz-box .d3 { animation-delay: 1.2s; }
        @media (prefers-reduced-motion: reduce) { .vz-box .flow, .vz-box .core, .vz-box .out, .vz-box .ray { animation: none !important; } }
      `}</style>
      <svg viewBox="0 0 540 420" role="presentation">
        <defs>
          <radialGradient id="vzbHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#f0c949" stopOpacity="0.30" />
            <stop offset="1" stopColor="#f0c949" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vzbTop" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f8df8a" /><stop offset="1" stopColor="#e2b444" /></linearGradient>
          <linearGradient id="vzbLeft" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d7a83a" /><stop offset="1" stopColor="#a27a22" /></linearGradient>
          <linearGradient id="vzbRight" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b98c2b" /><stop offset="1" stopColor="#7e5d17" /></linearGradient>
        </defs>
        <circle className="core" cx="290" cy="210" r="150" fill="url(#vzbHalo)" />

        {/* Vos données → un seul câble → la prise */}
        {VZB_SRC.map((y, i) => (
          <g key={y}>
            <path d={`M78 ${y} C130 ${y}, 140 232, 186 232`} fill="none" stroke="rgba(140,160,255,0.25)" strokeWidth="2" />
            <path className="flow" d={`M78 ${y} C130 ${y}, 140 232, 186 232`} fill="none" stroke={g} strokeWidth="2" style={{ animationDelay: `${i * 0.25}s` }} />
          </g>
        ))}
        <path d="M186 232 H214" stroke="#2c3b86" strokeWidth="7" strokeLinecap="round" />
        <rect x="212" y="221" width="22" height="22" rx="5" fill="#26346f" stroke="rgba(160,180,255,0.5)" strokeWidth="1.2" />
        <path d="M234 227 H244 M234 237 H244" stroke={g} strokeWidth="3" strokeLinecap="round" />

        {tile(50, VZB_SRC[0], <g {...ic}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></g>)}
        {tile(50, VZB_SRC[1], <g {...ic}><path d="M3 21h18M5 21V10M10 21V10M14 21V10M19 21V10M2 9l10-6 10 6z" /></g>)}
        {tile(50, VZB_SRC[2], <g {...ic}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M15 8.5a3.5 3.5 0 1 0 0 7M8 11h5M8 13.5h5" /></g>)}

        {/* La boîte */}
        <path d="M290 132 L362 172 L290 212 L218 172 Z" fill="url(#vzbTop)" />
        <path d="M218 172 L290 212 L290 296 L218 256 Z" fill="url(#vzbLeft)" />
        <path d="M290 212 L362 172 L362 256 L290 296 Z" fill="url(#vzbRight)" />
        <path d="M290 132 L362 172 L290 212 L218 172 Z M290 212 V296" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
        <g transform="translate(290 172) scale(1 0.5556) rotate(45) translate(-25 -25)">
          <rect width="50" height="50" rx="10" fill="rgba(13,20,48,0.10)" />
          <g transform="translate(9 9) rotate(-45 16 16)"><VyzorLogo size={32} color="#0d1430" /></g>
        </g>

        {/* Ce qu'elle rend */}
        {[[140, ""], [215, "d2"], [290, "d3"]].map(([y, d]) => (
          <path key={y} className={`ray ${d}`} d={`M364 214 C400 214, 410 ${y}, 462 ${y}`} fill="none" stroke={g} strokeWidth="2" strokeLinecap="round" />
        ))}
        {tile(490, 140, <g {...ic} stroke={g}><path d="M2 12h4l3-8 4 16 3-8h6" /></g>, "out")}
        {tile(490, 215, <g {...ic} stroke={g}><path d="M4 12l5 5L20 6" /><path d="M4 20h16" strokeOpacity="0.5" /></g>, "out d2")}
        {tile(490, 290, <g {...ic} stroke={g}><path d="M3 18h18M7 18l10-8" /><path d="M14 6h6v6" /><circle cx="7" cy="18" r="1.6" /></g>, "out d3")}

        <ellipse cx="290" cy="318" rx="92" ry="8" fill="rgba(0,0,0,0.35)" />
      </svg>
    </div>
  );
};

// —— Démo (19/11/2026) : composer une page, la lire, programmer son envoi du matin ——
// Boucle muette de 15 s qui se lance seule quand elle est à l'écran (en pause sinon) ;
// reduced-motion : rien ne démarre seul, le bouton lance la lecture.
const GenUiVideo = () => {
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const userPaused = React.useRef(false);
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !userPaused.current) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else if (!e.isIntersecting) v.pause();
    }), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const toggle = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { userPaused.current = false; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };
  return (
    <div>
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(140,160,255,0.22)", boxShadow: "0 40px 90px -38px rgba(0,0,0,0.85), 0 0 60px -30px rgba(240,201,73,0.22)", background: "#0b1026" }}>
        <video ref={ref} src="/vyzor-demo-generation.mp4" poster="/vyzor-demo-generation-poster.jpg" width="1456" height="834"
          muted loop playsInline preload="metadata"
          aria-label="Démonstration : on décrit la page voulue, Vyzor la compose avec la trésorerie et la capacité de remboursement, puis on choisit de la recevoir par e-mail chaque matin"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          style={{ display: "block", width: "100%", height: "auto" }} />
        <button type="button" onClick={toggle} className="vzg-toggle" aria-label={playing ? "Mettre la démo en pause" : "Lire la démo"}>
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>}
        </button>
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 12.5, color: VZG.muted }}>Enregistrement de l'application, sur un dossier de test anonymisé.</p>
      <style>{`
        .vzg-toggle { position: absolute; right: 12px; bottom: 12px; width: 34px; height: 34px; border-radius: 999px; display: grid; place-items: center; background: rgba(10,16,38,0.72); border: 1px solid rgba(255,255,255,0.18); color: #fff; cursor: pointer; }
        .vzg-toggle:hover { border-color: rgba(240,201,73,0.6); color: #f0c949; }
        .vzg-toggle:focus-visible { outline: 2px solid #f0c949; outline-offset: 2px; }
      `}</style>
    </div>
  );
};

// —— Démo de génération ——
const VZ_DEMO_PROMPT = "Prépare-moi un rapport pour un investisseur";
const VZ_DEMO_STEPS = [
  "Lecture de vos données Pennylane",
  "Calcul des indicateurs par le moteur comptable",
  "Choix des modules pour un investisseur",
  "Composition de la page",
];

const GenUiDemo = () => {
  const ref = React.useRef(null);
  // phase : 0 saisie, 1 clic, 2 agent, 3 page, 4 menu
  const [st, setSt] = React.useState({ phase: 0, typed: 0, step: 0, blocks: 0 });
  const [run, setRun] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const prompt = vzL({ fr: VZ_DEMO_PROMPT, en: "Prepare an investor report for me" });

  React.useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setSt({ phase: 4, typed: prompt.length, step: VZ_DEMO_STEPS.length, blocks: 3 }); return; }
    if (!el || typeof IntersectionObserver === "undefined") { setStarted(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    const timers = [];
    let t = 400;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    setSt({ phase: 0, typed: 0, step: 0, blocks: 0 });
    for (let i = 1; i <= prompt.length; i++) { t += 45; const n = i; at(t, () => setSt((s) => ({ ...s, typed: n }))); }
    t += 450; at(t, () => setSt((s) => ({ ...s, phase: 1 })));
    t += 450; at(t, () => setSt((s) => ({ ...s, phase: 2 })));
    for (let i = 1; i <= VZ_DEMO_STEPS.length; i++) { t += 650; const n = i; at(t, () => setSt((s) => ({ ...s, step: n }))); }
    t += 400; at(t, () => setSt((s) => ({ ...s, phase: 3 })));
    for (let i = 1; i <= 3; i++) { t += 550; const n = i; at(t, () => setSt((s) => ({ ...s, blocks: n }))); }
    t += 1300; at(t, () => setSt((s) => ({ ...s, phase: 4 })));
    return () => timers.forEach(clearTimeout);
  }, [started, run]);

  const { phase, typed, step, blocks } = st;
  const menuBtn = (
    <div style={{ position: "relative" }}>
      <span aria-hidden="true" style={{
        display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 8,
        border: `1px solid ${phase === 4 ? "rgba(240,201,73,0.5)" : VZG.line}`, color: phase === 4 ? VZG.gold : VZG.muted,
        fontSize: 16, lineHeight: 1, letterSpacing: 1, transition: "all 200ms ease",
      }}>···</span>
      <div style={{
        position: "absolute", right: 0, top: 36, zIndex: 3, width: 230, padding: 6, borderRadius: 12,
        background: "#141c40", border: "1px solid rgba(140,160,255,0.22)", boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
        opacity: phase === 4 ? 1 : 0, transform: phase === 4 ? "none" : "translateY(-6px)", pointerEvents: "none",
        transition: "opacity 220ms ease, transform 220ms ease",
      }}>
        {[["Exporter", "Rapport · PDF"], ["Exporter les tableaux", "Excel"], ["Personnaliser la page", "Ajouter, déplacer, modifier"]].map(([a, b], i) => (
          <div key={a} style={{ padding: "8px 10px", borderRadius: 8, background: i === 0 ? "rgba(240,201,73,0.08)" : "transparent" }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>{a}</div>
            <div style={{ fontSize: 11, color: VZG.muted }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      <VzAppFrame title={phase >= 3 ? "Vyzor · Rapport investisseur" : "Vyzor · Nouvelle page"}>
        <div className="vzg-stage" style={{ position: "relative", minHeight: 350 }}>
          {/* Saisie + agent */}
          <div style={{
            position: "absolute", inset: 0, padding: "40px clamp(16px, 5vw, 64px)", display: "flex", flexDirection: "column", justifyContent: "center",
            opacity: phase < 3 ? 1 : 0, transition: "opacity 300ms ease", pointerEvents: "none",
          }}>
            <div style={{ fontSize: 13, color: VZG.muted, marginBottom: 10 }}>Décrivez la page que vous voulez</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{
                flex: 1, minWidth: 0, padding: "14px 16px", borderRadius: 12, fontSize: 15, color: "#fff",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${typed ? "rgba(240,201,73,0.4)" : VZG.line}`,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {typed ? vzRawSafe(prompt.slice(0, typed)) : <span style={{ color: VZG.muted }}>Un dossier pour mon banquier, le point du mois avec l'équipe…</span>}
                {phase === 0 ? <span className="vzg-caret" aria-hidden="true" /> : null}
              </div>
              <span style={{
                padding: "14px 20px", borderRadius: 12, fontSize: 14.5, fontWeight: 600, color: "#0d1430", background: VZG.gold,
                transform: phase === 1 ? "scale(0.94)" : "none", boxShadow: phase === 1 ? "0 0 0 4px rgba(240,201,73,0.25)" : "none",
                transition: "transform 160ms ease, box-shadow 160ms ease", whiteSpace: "nowrap",
              }}>Créer</span>
            </div>
            <ul style={{ listStyle: "none", margin: "26px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 10, opacity: phase >= 2 ? 1 : 0, transition: "opacity 250ms ease" }}>
              {VZ_DEMO_STEPS.map((s, i) => {
                const done = step > i, cur = step === i && phase === 2;
                return (
                  <li key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: done ? VZG.text : VZG.muted, opacity: done || cur ? 1 : 0.45 }}>
                    <span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: 99, display: "grid", placeItems: "center", border: `1.5px solid ${done ? VZG.gold : "rgba(255,255,255,0.25)"}`, background: done ? "rgba(240,201,73,0.12)" : "transparent" }}>
                      {done ? <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke={VZG.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg> : cur ? <span className="vzg-spin" /> : null}
                    </span>
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Page composée */}
          <div style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 300ms ease" }}>
            <VzDashPreview title="Rapport investisseur" subtitle="Composé par Vyzor à partir de vos données · données fictives" shown={blocks} menu={menuBtn} kpis={VZ_INVEST_KPIS} points={VZ_INVEST_POINTS} chartTitle="Chiffre d'affaires et marge, 12 mois" />
          </div>
        </div>
      </VzAppFrame>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5, color: VZG.muted }}>Démonstration avec des données fictives.</span>
        <button type="button" onClick={() => { setStarted(true); setRun((r) => r + 1); }} className="vzg-replay">Rejouer la démo</button>
      </div>
      <style>{`
        .vzg-caret { display: inline-block; width: 1.5px; height: 1.05em; margin-left: 2px; vertical-align: -2px; background: #f0c949; animation: vzgBlink 1s steps(1) infinite; }
        @keyframes vzgBlink { 50% { opacity: 0; } }
        .vzg-spin { width: 9px; height: 9px; border-radius: 99px; border: 1.5px solid #f0c949; border-right-color: transparent; animation: vzgSpin 700ms linear infinite; }
        @keyframes vzgSpin { to { transform: rotate(360deg); } }
        .vzg-replay { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.85); border-radius: 999px; padding: 8px 16px; font: 600 13px "Inter", system-ui, sans-serif; cursor: pointer; }
        .vzg-replay:hover { border-color: rgba(240,201,73,0.45); color: #f0c949; }
        .vzg-replay:focus-visible { outline: 2px solid #f0c949; outline-offset: 2px; }
        @media (max-width: 720px) {
          .vzg-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .vzg-row { grid-template-columns: 1fr !important; }
          .vzg-stage { min-height: 560px !important; }
          .vzg-hide-m { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .vzg-caret, .vzg-spin { animation: none !important; } }
      `}</style>
    </div>
  );
};

// Texte saisi : déjà dans la bonne langue, on ne le repasse pas au dictionnaire.
const vzRawSafe = (s) => (typeof window !== "undefined" && window.vzRaw ? window.vzRaw(s) : s);



Object.assign(window, { VzAppFrame, VzDashPreview, HeroProductShot, GenUiDemo, GenUiVideo });
