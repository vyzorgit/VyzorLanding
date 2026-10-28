// cinematic-hero-glass.jsx — Hero VYZOR « scène » pro — v2 (review)
// Fond profond + aurora lente (transform-only) + logo animé + texte « gooey »
// qui morphe en or. v2 : le hero porte désormais la proposition de valeur
// complète — badge bêta, sous-titre, CTA, preuves — plus un indice de scroll.
// Perf : morphing en pause hors viewport / onglet caché, dt clampé,
// reduced-motion = mot statique net.

// —— Texte « gooey » : deux calques de texte qui se fondent l'un dans l'autre
const GooeyText = ({
  texts,
  morphTime = 1,
  cooldownTime = 1.3,
  style,
  textStyle,
  filterId = "vzThreshold",
}) => {
  const rootRef = React.useRef(null);
  const text1Ref = React.useRef(null);
  const text2Ref = React.useRef(null);
  const blendRef = React.useRef(null);
  const visibleRef = React.useRef(true);

  React.useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    // Reduced motion : premier mot statique, net, aucun rAF.
    const reduce = typeof window !== "undefined" && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      text1Ref.current.style.opacity = "0%";
      text2Ref.current.textContent = texts[0];
      text2Ref.current.style.opacity = "100%";
      text2Ref.current.style.filter = "";
      if (blendRef.current) blendRef.current.style.filter = "none";
      return;
    }

    // Pause du morphing quand le hero sort du viewport (économie CPU/GPU).
    let io = null;
    if (rootRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((ents) => {
        ents.forEach((e) => { visibleRef.current = e.isIntersecting; });
      }, { rootMargin: "80px" });
      io.observe(rootRef.current);
    }

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
      // dt clampé : au retour d'un onglet caché, pas de rattrapage brutal.
      const dt = Math.min(0.05, (newTime.getTime() - time.getTime()) / 1000);
      time = newTime;
      // Hors viewport : on laisse l'horloge avancer mais on ne calcule rien.
      if (!visibleRef.current) return;
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
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [texts, morphTime, cooldownTime]);

  const spanStyle = {
    position: "absolute", left: 0, right: 0,
    display: "inline-block", userSelect: "none",
    textAlign: "center", whiteSpace: "nowrap",
    ...textStyle,
  };

  return (
    <div ref={rootRef} style={{ position: "relative", ...style }}>
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

// —— Scroll velocity : bandeaux qui défilent, accélérés et inversés par le scroll ——
const vzScrollVel = { v: 0, last: typeof window !== "undefined" ? window.scrollY : 0, t: 0 };
const ScrollVelocityRow = ({ children, baseVelocity = 20, direction = 1, paused = false }) => {
  const trackRef = React.useRef(null);
  const unitRef = React.useRef(null);
  const pausedRef = React.useRef(paused);
  React.useEffect(() => { pausedRef.current = paused; }, [paused]);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0, x = 0, prev = performance.now(), dirFactor = 1, smooth = 0, lastY = window.scrollY;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      const y = window.scrollY; const vel = dt > 0 ? (y - lastY) / dt : 0; lastY = y;
      if (pausedRef.current) return; // WCAG 2.2.2 : bandeau en pause
      smooth += (vel - smooth) * 0.12;
      if (smooth < -5) dirFactor = -1; else if (smooth > 5) dirFactor = 1;
      const boost = Math.min(Math.abs(smooth) / 1000, 5);
      const w = unitRef.current ? unitRef.current.offsetWidth : 0;
      if (!w || !trackRef.current) return;
      x += direction * dirFactor * baseVelocity * (1 + boost) * dt * (w / 100) * 0.12;
      x = ((x % w) + w) % w;
      trackRef.current.style.transform = `translate3d(${-x}px,0,0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseVelocity, direction]);
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
      <div ref={trackRef} style={{ display: "inline-flex", willChange: "transform" }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} ref={i === 0 ? unitRef : null} aria-hidden={i > 0} style={{ display: "inline-flex", flexShrink: 0 }}>{children}</span>
        ))}
      </div>
    </div>
  );
};

const VzVelocityWords = ({ words, color, accent }) => (
  <React.Fragment>
    {words.map((w, i) => (
      <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
        <span style={{ color: i % 2 === 0 ? color : accent }}>{w}</span>
        <span aria-hidden="true" style={{ display: "inline-block", width: "0.14em", height: "0.14em", margin: "0 0.55em", background: "#f0c949", transform: "rotate(45deg)", opacity: 0.8 }} />
      </span>
    ))}
  </React.Fragment>
);

// —— Hero v3 (refonte Hormozi, 27/10/2026) ——
// Une cible (dirigeants de PME sous Pennylane), une promesse (savoir où part l'argent),
// une action (réserver sa place dans la bêta). Titre fixe : plus de bandeau défilant,
// le texte est lisible tel quel par Google et les moteurs IA.
const CinematicHero = () => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.94)";
  const muted = "rgba(255,255,255,0.62)";
  const proofs = [
    "Compatible Pennylane",
    "Lecture seule, rien n'est modifié",
    "Données hébergées dans l'UE",
  ];
  return (
    <section className="vz-hero-stage" style={{
      position: "relative", width: "100%",
      background: "#0a1026", color: text,
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "150px 0 56px", overflow: "hidden",
    }}>
      <style>{`
        @keyframes vzHeroIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .vz-hero-in { animation: vzHeroIn 700ms cubic-bezier(0.22,1,0.36,1) both; }
        .vz-btn-primary { transition: background-color 160ms ease; }
        .vz-btn-primary:hover { background-color: #f4d468 !important; }
        .vz-btn-ghost { transition: border-color 160ms ease, background-color 160ms ease; }
        .vz-btn-ghost:hover { border-color: rgba(255,255,255,0.32) !important; background-color: rgba(255,255,255,0.04) !important; }
        .vz-hero-h1 { font-size: clamp(38px, 5.6vw, 76px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.02; margin: 0; color: #fff; text-wrap: balance; }
        .vz-hero-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 75% 70% at 50% 0%, #1b2860 0%, #101a42 32%, rgba(10,16,38,0) 72%); }
        .vz-hero-proofs { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 22px; margin: clamp(36px, 4vw, 48px) 0 0; padding: 0; list-style: none; }
        .vz-hero-proofs li { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; color: rgba(255,255,255,0.7); }
        .vz-hero-stage a:focus-visible { outline: 2px solid #f0c949; outline-offset: 3px; }
        @media (max-width: 720px) { .vz-hero-stage { padding: 132px 0 48px !important; } }
        @media (prefers-reduced-motion: reduce) { .vz-hero-in { animation: none !important; } }
      `}</style>
      <span aria-hidden="true" className="vz-hero-glow" />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1040, padding: "0 24px" }}>
        <p className="vz-hero-in" style={{
          display: "inline-flex", alignItems: "center", gap: 9, margin: "0 0 28px",
          padding: "7px 14px", borderRadius: 999,
          border: "1px solid rgba(240,201,73,0.32)", background: "rgba(240,201,73,0.08)",
          fontSize: 13.5, fontWeight: 500, color: gold,
        }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: gold }} />
          Pour les dirigeants de PME sous Pennylane
        </p>
        <h1 className="vz-hero-h1 vz-hero-in" style={{ animationDelay: "80ms" }}>
          Vous perdez de l'argent quelque part.{" "}
          <span style={{ color: gold, display: "block" }}>Vyzor vous montre où.</span>
        </h1>
        <p className="vz-hero-in" style={{
          fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.6, color: muted,
          maxWidth: 680, margin: "clamp(24px, 3vw, 32px) auto 0", textWrap: "pretty",
          animationDelay: "180ms",
        }}>
          Vyzor, le logiciel de pilotage financier pour PME, lit votre comptabilité et vous dit{" "}
          <span style={{ color: text }}>où part votre argent, ce qu'il vous restera dans 12 mois et quoi faire en premier</span>.
          Sans tableur, sans attendre le bilan.
        </p>
        <div className="vz-hero-cta-row vz-hero-in" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12, marginTop: "clamp(30px, 3vw, 38px)", flexWrap: "wrap", animationDelay: "260ms",
        }}>
          <a className="vz-hero-cta-primary vz-btn-primary" href="/?contact=1#beta" data-contact style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "15px 26px", borderRadius: 10,
            backgroundColor: gold, color: "#0d1430",
            fontWeight: 600, fontSize: 15.5, textDecoration: "none",
          }}>
            Réserver ma place dans la bêta <span aria-hidden="true">→</span>
          </a>
          <a className="vz-hero-cta-ghost vz-btn-ghost" href="#produit" style={{
            display: "inline-flex", alignItems: "center",
            padding: "15px 22px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.16)", backgroundColor: "transparent",
            color: text, fontSize: 15.5, fontWeight: 500, textDecoration: "none",
          }}>
            Voir la démo
          </a>
        </div>
        <p className="vz-hero-in" style={{ margin: "14px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)", animationDelay: "300ms" }}>
          Gratuit pendant la bêta · {(window.VZ_BETA && window.VZ_BETA.places) || 10} places · réponse sous 48 h
        </p>
        <ul className="vz-hero-proofs vz-hero-in" style={{ animationDelay: "340ms" }}>
          {proofs.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Object.assign(window, { CinematicHero, GooeyText, ParticleField, ScrollVelocityRow });
