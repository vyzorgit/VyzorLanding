// cinematic-hero-glass.jsx — Hero VYZOR « scène » pro
// Fond profond + particules ascendantes (canvas) + faisceaux spotlight + lignes
// d'accent. Logo + texte « gooey » qui morphe en or, slogan statique en dessous.
// Animations pilotées par requestAnimationFrame / ambiances CSS sûres.

// —— Texte « gooey » : deux calques de texte qui se fondent l'un dans l'autre
const GooeyText = ({
  texts,
  morphTime = 1,
  cooldownTime = 1.3,
  style,
  textStyle,
  filterId = "vzThreshold",
}) => {
  const text1Ref = React.useRef(null);
  const text2Ref = React.useRef(null);
  const blendRef = React.useRef(null);

  React.useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let raf = 0;

    const setMorph = (fraction) => {
      const t1 = text1Ref.current, t2 = text2Ref.current;
      if (!t1 || !t2) return;
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      const t1 = text1Ref.current, t2 = text2Ref.current;
      if (!t1 || !t2) return;
      t2.style.filter = ""; t2.style.opacity = "100%";
      t1.style.filter = ""; t1.style.opacity = "0%";
      // Mot stabilisé : on retire le seuil gooey pour un rendu net (anti-crénelage natif).
      if (blendRef.current) blendRef.current.style.filter = "none";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) { cooldown = cooldownTime; fraction = 1; }
      // En cours de morph : on réactive le seuil gooey pour la fusion des calques.
      if (blendRef.current) blendRef.current.style.filter = `url(#${filterId})`;
      setMorph(fraction);
    };

    text1Ref.current.textContent = texts[textIndex % texts.length];
    text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [texts, morphTime, cooldownTime]);

  const spanStyle = {
    position: "absolute", left: 0, right: 0,
    display: "inline-block", userSelect: "none",
    textAlign: "center", whiteSpace: "nowrap",
    ...textStyle,
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <div ref={blendRef} style={{
        position: "relative", width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        filter: `url(#${filterId})`,
      }}>
        <span ref={text1Ref} style={spanStyle} />
        <span ref={text2Ref} style={spanStyle} />
      </div>
    </div>
  );
};

// —— Champ de particules ascendantes (canvas, rAF) ——
const ParticleField = () => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    let particles = [];
    let raf = 0;

    const make = () => {
      const p = {
        x: 0, y: 0, speed: 0, opacity: 1, fadeStart: 0, fadingOut: false,
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speed = (Math.random() / 5 + 0.1) * (window.devicePixelRatio || 1);
          this.opacity = 1;
          this.fadeStart = Date.now() + Math.random() * 600 + 100;
          this.fadingOut = false;
        },
        update() {
          this.y -= this.speed;
          if (this.y < 0) this.reset();
          if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true;
          if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) this.reset();
          }
        },
        draw() {
          const w = 220 + Math.random() * 35;
          ctx.fillStyle = `rgba(${w}, 226, 255, ${this.opacity})`;
          ctx.fillRect(this.x, this.y, 0.7, Math.random() * 2.4 + 1);
        },
      };
      p.reset();
      p.y = Math.random() * canvas.height;
      return p;
    };

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth, h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const count = Math.min(420, Math.floor((canvas.width * canvas.height) / 7200));
      particles = [];
      for (let i = 0; i < count; i++) particles.push(make());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) { p.update(); p.draw(); }
      raf = requestAnimationFrame(animate);
    };

    init();
    animate();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
};

const CinematicHero = ({
  brandName = "VYZOR",
  morphWords = ["Comprenez", "Analysez", "Anticipez", "Pilotez"],
  taglineTail = "vos chiffres, simplement.",
}) => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.94)";
  const muted = "rgba(255,255,255,0.55)";

  return (
    <section
      className="vz-hero-stage"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#070a14",
        backgroundImage:
          "radial-gradient(60% 40% at 15% 0%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(50% 40% at 90% 10%, rgba(240,201,73,0.14), transparent 60%), radial-gradient(40% 30% at 50% 100%, rgba(45,212,191,0.10), transparent 60%)",
        color: text,
        fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "150px 24px 110px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes vzSpot {
          0%   { transform: rotateZ(0deg) scale(1);    filter: blur(16px) opacity(0.45); }
          25%  { transform: rotateZ(-1.5deg) scale(1.18); filter: blur(18px) opacity(0.6); }
          50%  { transform: rotateZ(2deg) scale(1.28);  filter: blur(15px) opacity(0.4); }
          75%  { transform: rotateZ(-1deg) scale(1.12); filter: blur(16px) opacity(0.55); }
          100% { transform: rotateZ(0deg) scale(1);     filter: blur(16px) opacity(0.45); }
        }
        @keyframes vzWordmarkIn {
          0%   { opacity: 0; letter-spacing: 0.6em; filter: blur(18px); transform: translateY(26px); }
          60%  { opacity: 1; }
          100% { opacity: 1; letter-spacing: 0.06em; filter: blur(0); transform: translateY(0); }
        }
        @keyframes vzHeroRise {
          0%   { opacity: 0; filter: blur(10px); transform: translateY(24px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .vz-anim-wordmark { animation: vzWordmarkIn 1.25s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .vz-hero-logo svg { width: clamp(150px, 23vw, 300px) !important; height: auto !important; filter: drop-shadow(0 14px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(240,201,73,0.30)); }
        .vz-anim-gooey    { animation: vzHeroRise 1s cubic-bezier(0.22,1,0.36,1) 0.7s both; }
        .vz-anim-tail     { animation: vzHeroRise 1s cubic-bezier(0.22,1,0.36,1) 0.95s both; }
        @media (prefers-reduced-motion: reduce) {
          .vz-hero-stage .vz-beam-inner { animation: none !important; }
          .vz-anim-wordmark, .vz-anim-gooey, .vz-anim-tail { animation: none !important; opacity: 1 !important; filter: none !important; transform: none !important; letter-spacing: 0.06em; }
        }
      `}</style>

      {/* —— Lignes d'accent retirées : fond uni en raccord avec le reste du site —— */}

      {/* —— Halo doré bas (chaleur de marque) —— */}
      <div aria-hidden="true" style={{
        position: "absolute", left: 0, right: 0, bottom: "-10%", margin: "0 auto",
        width: "70%", height: "40%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(60% 100% at 50% 100%, rgba(240,201,73,0.14), transparent 70%)",
        filter: "blur(20px)",
      }} />

      {/* —— Fondu vers le noir de fond en bas : raccord invisible avec la section suivante —— */}
      <div aria-hidden="true" style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "28%",
        zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(7,10,20,0) 0%, #070a14 100%)",
      }} />

      {/* —— Contenu —— */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: 1040 }}>
        {/* Logo de marque — grand, animé à l'arrivée */}
        <div className="vz-anim-wordmark vz-hero-logo" style={{
          display: "flex", justifyContent: "center",
          marginBottom: "clamp(22px, 3.5vw, 44px)",
        }}>
          <VyzorLogo size={300} color={gold} bg="transparent" />
        </div>

        {/* Texte gooey or */}
        <div className="vz-anim-gooey">
          <GooeyText
            texts={morphWords}
            morphTime={1}
            cooldownTime={1.4}
            style={{ width: "100%", height: "clamp(58px, 9.5vw, 116px)", margin: "0 auto" }}
            textStyle={{
              fontSize: "clamp(44px, 7.8vw, 104px)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
              color: gold,
              textShadow: "0 6px 40px rgba(240,201,73,0.30)",
            }}
          />
        </div>

        {/* Slogan tail */}
        <div className="vz-anim-tail" style={{
          fontSize: "clamp(26px, 4.2vw, 60px)", fontWeight: 500,
          letterSpacing: "-0.025em", lineHeight: 1.05,
          color: "rgba(255,255,255,0.92)",
          marginTop: "clamp(10px, 1.6vw, 20px)", textWrap: "balance",
        }}>
          {taglineTail}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { CinematicHero, GooeyText, ParticleField });
