// agentic-twin.jsx — Section « Vision agentique ».
// Se place juste APRÈS le constat (la problématique) : on a nommé la douleur,
// on montre maintenant, de façon vivante et interactive, là où Vyzor va.
//
// Le cœur interactif (équipe d'agents, question → réponse chiffrée, actions)
// est un mock vanilla autonome — embarqué dans une iframe isolée
// (agentic-twin.html). On l'encadre comme une fenêtre de produit, on l'introduit
// en voix éditoriale « vous », et on déclenche la démo quand la section entre
// dans le champ. Hauteur auto-ajustée via postMessage.
//
// Vocabulaire fidèle : or #f0c949, bleu nuit #070a14, verre.

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

  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";

  return (
    <section id={id} className="vz-vision" style={{ position: "relative", marginBottom: 112 }}>
      {/* En-tête éditorial — voix « vous », introduit la vision */}
      <div className="vz-vision-header" style={{ marginBottom: 40, maxWidth: 800 }}>
        <h2 style={{
          fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.04, textWrap: "balance",
        }}>
          Une équipe d'agents financiers,{" "}
          <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>qui ne dort jamais.</span>
        </h2>
        <p style={{
          fontSize: 18, lineHeight: 1.6, color: muted, marginTop: 20, maxWidth: 720, textWrap: "pretty",
        }}>
          Posez une question : stratège, trésorier et fiscaliste analysent <span style={{ color: text }}>vos données réelles</span> et vous répondent — chiffres vérifiés, sources à l'appui.
        </p>
      </div>

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
          src="agentic-twin.html"
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
          Démonstration interactive · projection · données fictives
        </span>
        <a href="agentic-twin.html" target="_blank" rel="noopener" style={{
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

      <style>{`
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
