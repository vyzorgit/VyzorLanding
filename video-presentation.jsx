// video-presentation.jsx — Vyzor en 30 secondes, juste après le hero.
// <video> natif : rien n'est téléchargé avant la lecture (preload="none"), hors image d'attente.

const VideoPresentationSection = ({ id = "video", gold, subtle }) => {
  const videoRef = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  return (
    <section id={id} className="vz-video" style={{ position: "relative", marginBottom: 112 }}>
      <h2 style={{ fontSize: 52, margin: "0 0 32px", letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.08 }}>
        Vyzor en 30 secondes.
      </h2>

      <div className="vz-video-frame" style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        background: "#0b1026",
        border: `1px solid ${subtle}`, borderTop: "1px solid rgba(240,201,73,0.30)",
        boxShadow: "0 40px 90px -38px rgba(0,0,0,0.85), 0 0 60px -30px rgba(240,201,73,0.25)",
      }}>
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster="/vyzor-presentation-poster.jpg"
          width="1920"
          height="1080"
          aria-label="Présentation de Vyzor en 30 secondes"
          onPlay={() => setStarted(true)}
          style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 9" }}
        >
          <source src="/vyzor-presentation.mp4" type="video/mp4" />
        </video>
        {!started && (
          <button
            type="button"
            className="vz-video-play"
            aria-label="Lancer la vidéo"
            onClick={() => { if (videoRef.current) videoRef.current.play(); }}
          >
            <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"/></svg>
          </button>
        )}
      </div>


      <style>{`
        .vz-video-play {
          position: absolute; left: 50%; top: 50%;
          width: 88px; height: 88px; margin: -44px 0 0 -44px;
          display: grid; place-items: center;
          border: 0; border-radius: 50%; cursor: pointer;
          background: ${gold}; color: #0d1430;
          box-shadow: 0 18px 40px -14px rgba(0,0,0,0.7);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vz-video-play:hover { transform: translateY(-2px) scale(1.04); }
        .vz-video-play:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .vz-video-play { transition: none; }
        }
        @media (max-width: 920px) {
          .vz-video h2 { font-size: 38px !important; }
        }
        @media (max-width: 560px) {
          .vz-video h2 { font-size: 30px !important; margin-bottom: 22px !important; }
          .vz-video-frame { border-radius: 18px !important; }
          .vz-video-play { width: 64px; height: 64px; margin: -32px 0 0 -32px; }
          .vz-video-play svg { width: 26px; height: 26px; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { VideoPresentationSection });
