// agentic-twin.jsx — Section « Vision agentique ».
// Se place juste APRÈS le constat (la problématique) : on a nommé la douleur,
// on montre maintenant, de façon vivante et interactive, là où Vyzor va.
//
// Le cœur interactif (équipe d'agents, question → réponse chiffrée, actions)
// est un mock vanilla autonome — embarqué dans une iframe isolée
// (agentic-twin.html, servie sur /agentic-twin). On l'encadre comme une fenêtre de produit, on l'introduit
// en voix éditoriale « vous », et on déclenche la démo quand la section entre
// dans le champ. Hauteur auto-ajustée via postMessage.
//
// Vocabulaire fidèle : or #f0c949, bleu nuit #070a14, verre.

// Révélation mot-à-mot pilotée au scroll (façon « text reveal by word »).
// Chaque mot passe d'un état atténué à pleine opacité, de gauche à droite,
// à mesure que le titre traverse le viewport. Pas de framer-motion : scroll
// natif + rAF, et bascule pleine opacité si prefers-reduced-motion.
const TWIN_HEAD_WORDS = [
  { t: "Le" }, { t: "pilotage" }, { t: "financier" }, { t: "d'un" }, { t: "grand" }, { t: "groupe," },
  { t: "à", soft: true }, { t: "l'échelle", soft: true }, { t: "de", soft: true }, { t: "votre", soft: true }, { t: "PME.", soft: true },
];

// En-tête « word-appear » : à l'entrée en vue, chaque mot apparaît en fondu,
// monte et se dé-floute, en cascade. Effet fluide, sans verrou ni décalage.
const RevealWordsHeader = ({ text, muted }) => {
  const ref = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  // Lu après montage : le pré-rendu et la première passe navigateur doivent produire le même HTML.
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduce(true);
  }, []);

  React.useEffect(() => {
    if (reduce) { setPlay(true); return; }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setPlay(true); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) { setPlay(true); io.disconnect(); }
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Cascade via animationDelay ; état caché tant que l'animation n'a pas démarré
  // (fill « both » applique l'état 0% pendant le délai).
  const appear = (delay) =>
    reduce
      ? null
      : play
        ? { animation: `twinWordAppear 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` }
        : { opacity: 0 };

  const N = TWIN_HEAD_WORDS.length;

  return (
    <div ref={ref} className="vz-vision-header" style={{ marginBottom: 40, maxWidth: 800 }}>
      <h2 style={{
        fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.04, textWrap: "balance",
      }}>
        {TWIN_HEAD_WORDS.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              
              color: w.soft ? muted : text,
              fontWeight: w.soft ? 400 : 600,
              fontStyle: w.soft ? "italic" : "normal",
              willChange: "opacity, transform, filter",
              ...appear(i * 0.085),
            }}
          >
            {w.t}
          </span>
        )).reduce((acc, el, i) => (i ? [...acc, " ", el] : [el]), [])}
      </h2>
      <p style={{
        fontSize: 18, lineHeight: 1.6, color: muted, marginTop: 20, maxWidth: 720, textWrap: "pretty",
        ...appear(N * 0.085 + 0.06),
      }}>
        Posez une question en français, Vyzor répond avec vos chiffres : <span style={{ color: text }}>trésorerie à 12 mois, dérives de marge, échéances à venir</span>. Chaque réponse est chiffrée, tracée jusqu'à l'écriture comptable et assortie d'une recommandation concrète. Essayez ci-dessous sur une PME fictive, sans inscription.
      </p>
    </div>
  );
};

const AgenticTwinSection = ({ id = "vision", gold, text, muted, subtle }) => {
  const wrapRef = React.useRef(null);
  const iframeRef = React.useRef(null);
  const sentRef = React.useRef(false);

  // Envoie le signal de démarrage à l'iframe (idempotent : l'iframe se garde d'un double lancement).
  const fireStart = React.useCallback(() => {
    const f = iframeRef.current;
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: "vz-twin-start" }, "*");
  }, []);

  // Hauteur auto : on applique la hauteur reçue de l'iframe, en impératif
  // (pas de state/transition qui pourrait figer la hauteur à l'ancienne valeur).
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object" || d.type !== "vz-twin-height" || typeof d.h !== "number") return;
      const f = iframeRef.current;
      if (f) f.style.height = Math.max(460, d.h) + "px";
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Démarrage à l'entrée en vue, avec quelques relances pour couvrir le chargement de l'iframe.
  React.useEffect(() => {
    const el = wrapRef.current;
    const startOnce = () => {
      if (sentRef.current) return;
      sentRef.current = true;
      fireStart();
      setTimeout(fireStart, 500);
      setTimeout(fireStart, 1600);
    };
    if (!el || typeof IntersectionObserver === "undefined") { startOnce(); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) startOnce(); });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [fireStart]);

  const goldGrad = "linear-gradient(#f0c949,#f0c949)";

  return (
    <section id={id} className="vz-vision" style={{ position: "relative", marginBottom: 112 }}>
      {/* En-tête éditorial — voix « vous » : entrée mot-à-mot « word-appear » au scroll */}
      <RevealWordsHeader text={text} muted={muted} />

      {/* Fenêtre produit — l'expérience interactive, isolée dans une iframe */}
      <div ref={wrapRef} className="vz-vision-frame" style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        background: "#070a14",
        border: `1px solid ${subtle}`, borderTop: `1px solid rgba(240,201,73,0.30)`,
        boxShadow: "0 40px 90px -38px rgba(0,0,0,0.85), 0 0 60px -30px rgba(240,201,73,0.25)",
      }}>
        {/* Lueur dorée d'ambiance, derrière la fenêtre */}
        <span aria-hidden="true" style={{
          position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)",
          width: 540, height: 240, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(240,201,73,0.18), transparent 68%)",
          pointerEvents: "none", filter: "blur(20px)",
        }}/>
        <iframe
          ref={iframeRef}
          title="Vyzor — vision agentique, démonstration interactive"
          src="/agentic-twin"
          loading="eager"
          style={{
            position: "relative", zIndex: 1,
            width: "100%", height: 560, border: 0, display: "block",
            background: "transparent",
          }}
        />
      </div>

      {/* Légende sous la fenêtre — disclaimer + plein écran */}
      <div className="vz-vision-cap" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        marginTop: 16, flexWrap: "wrap",
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          fontSize: 12.5, color: muted, letterSpacing: "0.01em",
        }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
          Démo interactive avec des données fictives.
        </span>
        <a href="/agentic-twin" target="_blank" rel="noopener" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 13, fontWeight: 600, color: text, textDecoration: "none",
          padding: "9px 16px", borderRadius: 999, border: `1px solid ${subtle}`,
          transition: "border-color 200ms ease, color 200ms ease",
        }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(240,201,73,0.45)"; e.currentTarget.style.color = gold; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = subtle; e.currentTarget.style.color = text; }}
        >
          Ouvrir en plein écran
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
          </svg>
        </a>
      </div>

      {/* Passage à l'acte juste après la preuve */}
      <div className="vz-vision-cta" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap",
        marginTop: 28, padding: "22px 26px", borderRadius: 16,
        background: "linear-gradient(180deg, #121a3a 0%, #0b1026 100%)", border: "1px solid rgba(140,160,255,0.14)",
      }}>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: text, letterSpacing: "-0.01em", flex: "1 1 320px" }}>
          La même chose, <span style={{ color: gold, fontWeight: 600 }}>avec vos vrais chiffres</span>. On branche votre comptabilité avec vous au premier rendez-vous.
        </p>
        <a href="/?contact=1#beta" data-contact style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "12px 20px", borderRadius: 999, backgroundImage: goldGrad,
          color: "#111", fontWeight: 600, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap",
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }}>
          Réserver ma place <span aria-hidden="true">→</span>
        </a>
      </div>

      <style>{`
        @keyframes twinWordAppear {
          0%   { opacity: 0;    transform: translateY(26px) scale(0.94); filter: blur(8px); }
          55%  { opacity: 0.85; transform: translateY(6px) scale(0.99);  filter: blur(1.4px); }
          100% { opacity: 1;    transform: translateY(0) scale(1);        filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vz-vision .vz-vision-header span { animation: none !important; opacity: 1 !important; filter: none !important; transform: none !important; }
        }
        @media (max-width: 920px) {
          .vz-vision .vz-vision-header h2 { font-size: 38px !important; }
        }
        @media (max-width: 560px) {
          .vz-vision .vz-vision-header h2 { font-size: 30px !important; }
          .vz-vision .vz-vision-frame { border-radius: 18px; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { AgenticTwinSection });
