// cinematic-hero-glass.jsx — Hero cinématique VYZOR, esthétique "liquid glass"
// Translucides, blurs profonds, halos refractifs, bordures lumineuses.
// Variante esthétique du hero — structure d'animation conservée.

const CinematicHero = ({
  brandName = "VYZOR",
  tagline1 = "Comprenez vos chiffres,",
  tagline2 = "simplement.",
  cardHeading = "La clarté financière, redéfinie.",
  cardDescription = (
    <>
      <span style={{ color: "#fff", fontWeight: 600 }}>Vyzor</span> donne aux dirigeants de PME, DAF et experts-comptables un cockpit unique : analyse du passé, lecture du présent, projection du futur.
    </>
  ),
  metricValue = 76,
  metricLabel = "Vyzor Score",
  ctaHeading = "Rejoignez la bêta.",
  ctaDescription = "10 places. Accès gratuit, tarif préférentiel à vie, et un canal direct avec l'équipe produit.",
}) => {
  const containerRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const dashboardRef = React.useRef(null);
  const rafRef = React.useRef(0);

  const [progress, setProgress] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [ringDash, setRingDash] = React.useState(402);

  // —— Détection mobile / touch pour court-circuiter les effets coûteux
  // Init synchrone pour éviter un premier render desktop puis switch mobile.
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(max-width: 720px)").matches;
  });
  const isTouchRef = React.useRef(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 720px)");
    setIsMobile(mql.matches);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", onChange);
    isTouchRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const SCROLL_LEN = isMobile ? 600 : 1800;

  React.useEffect(() => {
    // Pas de 3D tilt / mouse follow sur device touch
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return;
    }
    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${mx}px`);
        cardRef.current.style.setProperty("--mouse-y", `${my}px`);
        if (dashboardRef.current) {
          const rx = (e.clientY / window.innerHeight - 0.5) * -6;
          const ry = (e.clientX / window.innerWidth - 0.5) * 8;
          dashboardRef.current.style.transform =
            `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  React.useEffect(() => {
    // Sur mobile : pas de scroll listener, pas de transforms en boucle,
    // on garde le rendu statique pour une fluidité maximale.
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 720px)").matches
    ) {
      return;
    }
    let raf = 0;
    const compute = () => {
      raf = 0;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    const t = Math.max(0, Math.min(1, (progress - 0.30) / 0.20));
    setCounter(Math.round(t * metricValue));
    setRingDash(402 - t * (402 - 90));
  }, [progress, metricValue]);

  const seg = (start, end, p = progress) =>
    Math.max(0, Math.min(1, (p - start) / (end - start)));

  const heroAlpha = 1 - seg(0.05, 0.20);
  const heroBlur = seg(0.05, 0.20) * 18;
  const heroScale = 1 + seg(0.05, 0.20) * 0.15;

  const cardRise = seg(0.02, 0.22);
  const cardGrow = seg(0.18, 0.32);
  const cardPullback = seg(0.78, 0.95);

  const cardWidth =
    cardPullback > 0
      ? `${100 - cardPullback * 30}vw`
      : cardGrow > 0
        ? `${85 + cardGrow * 15}vw`
        : "85vw";
  const cardHeight =
    cardPullback > 0
      ? `${100 - cardPullback * 30}vh`
      : cardGrow > 0
        ? `${85 + cardGrow * 15}vh`
        : "85vh";
  const cardRadius =
    cardPullback > 0
      ? `${28 + cardPullback * 8}px`
      : cardGrow > 0
        ? `${48 - cardGrow * 16}px`
        : "48px";
  const cardY =
    cardRise < 1
      ? `${(1 - cardRise) * 120}vh`
      : cardPullback > 0
        ? `${cardPullback * -10}vh`
        : "0vh";
  const cardOpacity = cardRise > 0 ? 1 : 0;

  const innerReveal = seg(0.30, 0.50);
  const innerExit = seg(0.78, 0.92);

  const innerAlpha = innerReveal * (1 - innerExit);
  const innerY = (1 - innerReveal) * 60 - innerExit * 60;
  const innerScale = 0.85 + innerReveal * 0.15 - innerExit * 0.1;

  const ctaIn = seg(0.80, 0.95);

  // Liquid glass palette — deep navy + soft aurora accents
  const gold = "#f0c949";
  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
  const text = "rgba(255,255,255,0.94)";
  const muted = "rgba(255,255,255,0.58)";
  const subtle = "rgba(255,255,255,0.10)";

  // Glass tokens
  const glassFill =
    "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 100%)";
  const glassBorder = "1px solid rgba(255,255,255,0.18)";
  const glassShadow =
    "0 30px 80px -20px rgba(8,10,20,0.7), 0 8px 24px -8px rgba(8,10,20,0.5), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.06)";

  // —— Hero MOBILE statique : sans sticky, sans scroll-driven animation,
  // sans halos blur 60px. Performance maximale.
  if (isMobile) {
    return (
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#070a14",
          color: text,
          fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
          padding: "120px 22px 56px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Halo statique discret — un seul gradient, pas de filter blur */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(60% 40% at 50% 18%, rgba(240,201,73,0.16), transparent 60%), " +
              "radial-gradient(70% 50% at 50% 100%, rgba(99,102,241,0.14), transparent 65%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 520 }}>
          <h1
            style={{
              fontSize: "clamp(38px, 11vw, 56px)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              margin: 0, fontWeight: 500, color: "rgba(255,255,255,0.94)",
            }}
          >
            {tagline1}
          </h1>
          <h1
            style={{
              fontSize: "clamp(38px, 11vw, 56px)",
              lineHeight: 1.04, letterSpacing: "-0.04em",
              margin: "4px 0 0", fontWeight: 700,
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #d8e0ff 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {tagline2}
          </h1>

          <p
            style={{
              fontSize: 15, lineHeight: 1.6, color: muted,
              margin: "28px auto 0", maxWidth: 440,
              textWrap: "pretty",
            }}
          >
            {cardDescription}
          </p>

          <div
            style={{
              marginTop: 36, display: "flex", flexDirection: "column",
              gap: 12, alignItems: "stretch",
            }}
          >
            <a
              href="#beta"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "16px 26px", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.55)",
                backgroundImage: goldGrad,
                color: "#1a1410", fontWeight: 700, fontSize: 15,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: "0 10px 24px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              Candidater à la bêta →
            </a>
            <a
              href="#produit"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "16px 26px", borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              Voir le produit
            </a>
          </div>

          <div
            style={{
              marginTop: 28, fontSize: 11.5, color: muted,
              display: "flex", flexWrap: "wrap", gap: "8px 14px",
              justifyContent: "center", letterSpacing: "0.02em",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#5eead4" }} />
              Gratuit pendant la bêta
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Tarif préférentiel à vie</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Setup 5 min</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${SCROLL_LEN + window.innerHeight}px`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#070a14",
          color: text,
          fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
          perspective: 1500,
        }}
      >
        {/* AURORA BACKGROUND — luminous gradient orbs that bleed into each other */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: -100, pointerEvents: "none",
            background:
              "radial-gradient(60% 50% at 18% 22%, rgba(240,201,73,0.32), transparent 60%), " +
              "radial-gradient(50% 45% at 82% 18%, rgba(99,102,241,0.30), transparent 65%), " +
              "radial-gradient(55% 55% at 50% 95%, rgba(45,212,191,0.22), transparent 60%), " +
              "radial-gradient(40% 40% at 90% 80%, rgba(244,114,182,0.18), transparent 60%)",
            filter: "blur(20px) saturate(1.1)",
          }}
        />
        {/* Slow drifting orb for movement */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%", left: "55%",
            width: 520, height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240,201,73,0.40), transparent 60%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            animation: "vyzorDrift 14s ease-in-out infinite alternate",
          }}
        />
        <style>{`
          @keyframes vyzorDrift {
            0%   { transform: translate(-30%, -20%) scale(1); }
            100% { transform: translate(-60%, -40%) scale(1.15); }
          }
          @keyframes vyzorShimmer {
            0%   { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}</style>

        {/* Frosted noise / micro-grain to give the glass texture */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50,
            opacity: 0.035, mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          }}
        />

        {/* Faint grid, very low contrast */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            opacity: 0.5,
          }}
        />

        {/* HERO TAGLINE */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 10,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 24px",
            opacity: heroAlpha,
            transform: `scale(${heroScale})`,
            filter: isMobile ? "none" : `blur(${heroBlur}px)`,
            transition: "opacity 80ms linear",
            willChange: isMobile ? "auto" : "transform, opacity, filter",
          }}
        >
          <h1
            className="vz-hero-tagline"
            style={{
              fontSize: "clamp(40px, 7.2vw, 104px)",
              lineHeight: 1.02, letterSpacing: "-0.035em",
              margin: 0, fontWeight: 500, color: "rgba(255,255,255,0.92)",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.15), 0 12px 40px rgba(99,102,241,0.25)",
            }}
          >
            {tagline1}
          </h1>
          <h1
            className="vz-hero-tagline"
            style={{
              fontSize: "clamp(40px, 7.2vw, 104px)",
              lineHeight: 1.02, letterSpacing: "-0.04em",
              margin: 0, fontWeight: 700,
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #d8e0ff 60%, #b6c2ec 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 14px 30px rgba(120,140,255,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            {tagline2}
          </h1>
          <div
            style={{
              marginTop: 32, fontSize: 12, color: muted,
              letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
            }}
          >
            ↓ Scrollez pour découvrir
          </div>
        </div>

        {/* LIQUID GLASS CARD */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            // Doit laisser passer les clics vers le CTA (zIndex 15) dès qu'il apparaît
            pointerEvents: (cardRise > 0.5 && ctaIn < 0.1) ? "auto" : "none",
          }}
        >
          <div
            ref={cardRef}
            data-vyzor-glow
            className="vz-hero-card"
            style={{
              position: "relative",
              width: cardWidth, height: cardHeight,
              borderRadius: cardRadius,
              transform: `translateY(${cardY})`,
              opacity: cardOpacity,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.07) 100%)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow:
                "0 50px 120px -20px rgba(0,0,0,0.6), 0 20px 40px -20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
              overflow: "hidden",
              transition: "border-radius 80ms linear",
              willChange: "transform, width, height, border-radius",
              // VYZOR glow border — palette dorée qui balaie vers l'aurore
              "--vg-border": "2px",
              "--vg-size": "700px",
              "--vg-hue": 38,
              "--vg-sat": 92,
              "--vg-light": 65,
              "--vg-border-opacity": 0.95,
              "--vg-light-opacity": 0.85,
              "--vg-outer": 0,
            }}
          >
            {/* Top-edge highlight (specular) */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                pointerEvents: "none", zIndex: 6,
                filter: "blur(0.5px)",
              }}
            />
            {/* Mouse sheen — refractive highlight */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, borderRadius: "inherit",
                pointerEvents: "none", zIndex: 5,
                background:
                  "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.18) 0%, rgba(240,201,73,0.06) 25%, transparent 50%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Chromatic aberration — subtle prism on edge */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, borderRadius: "inherit",
                pointerEvents: "none", zIndex: 4,
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.1), inset 2px 0 0 rgba(99,102,241,0.08), inset -2px 0 0 rgba(244,114,182,0.06)",
              }}
            />
            {/* Inner aurora glow that bleeds through the glass */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: -160, right: -160, width: 600, height: 600,
                background:
                  "radial-gradient(circle, rgba(240,201,73,0.25), transparent 60%)",
                pointerEvents: "none", filter: "blur(40px)", zIndex: 1,
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", bottom: -180, left: -160, width: 580, height: 580,
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.22), transparent 60%)",
                pointerEvents: "none", filter: "blur(40px)", zIndex: 1,
              }}
            />

            {/* INNER GRID */}
            <div
              className="vz-hero-grid"
              style={{
                position: "relative", zIndex: 10,
                width: "100%", height: "100%",
                maxWidth: 1400, margin: "0 auto",
                padding: "32px clamp(20px, 4vw, 64px)",
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr 1fr",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 48px)",
                opacity: innerAlpha,
                transform: `translateY(${innerY}px) scale(${innerScale})`,
                transition: "opacity 60ms linear",
                willChange: "transform, opacity",
              }}
            >
              {/* LEFT: copy */}
              <div className="vz-hero-copy" style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: 10, letterSpacing: "0.32em",
                    color: gold, textTransform: "uppercase", fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Le cockpit
                </div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2vw, 32px)",
                    margin: 0, letterSpacing: "-0.02em",
                    fontWeight: 500, lineHeight: 1.2, color: "#fff",
                  }}
                >
                  {cardHeading}
                </h3>
                <p
                  style={{
                    fontSize: 14, lineHeight: 1.65,
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 16, maxWidth: 320, fontWeight: 400,
                  }}
                >
                  {cardDescription}
                </p>
                <div
                  style={{
                    display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24,
                  }}
                >
                  {["Passé", "Présent", "Futur"].map((k, i) => (
                    <span
                      key={k}
                      style={{
                        padding: "7px 14px", borderRadius: 999,
                        fontSize: 10, letterSpacing: "0.18em",
                        textTransform: "uppercase", fontWeight: 700,
                        color: i === 1 ? "#1a1410" : "#fff",
                        background: i === 1
                          ? goldGrad
                          : "rgba(255,255,255,0.08)",
                        backdropFilter: i === 1 ? "none" : "blur(12px)",
                        WebkitBackdropFilter: i === 1 ? "none" : "blur(12px)",
                        border: i === 1
                          ? "1px solid rgba(255,255,255,0.5)"
                          : "1px solid rgba(255,255,255,0.18)",
                        boxShadow: i === 1
                          ? "0 6px 16px rgba(216,172,47,0.35), inset 0 1px 0 rgba(255,255,255,0.6)"
                          : "inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              {/* CENTER: dashboard */}
              <div
                style={{
                  position: "relative",
                  display: "grid", placeItems: "center",
                  perspective: 1200,
                }}
              >
                <div
                  ref={dashboardRef}
                  className="vz-hero-dashboard"
                  style={{
                    position: "relative",
                    width: "100%", maxWidth: 460,
                    transformStyle: "preserve-3d",
                    transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
                  <DashboardMockup
                    counter={counter}
                    ringDash={ringDash}
                    metricLabel={metricLabel}
                    gold={gold}
                  />

                  {/* Floating glass badge — top left */}
                  <div
                    data-vyzor-glow
                    className="vz-hero-badge-tl"
                    style={{
                      position: "absolute",
                      top: -22, left: -32,
                      padding: "11px 15px", borderRadius: 16,
                      background: "rgba(255,255,255,0.10)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow:
                        "0 20px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", gap: 10,
                      opacity: innerAlpha,
                      transform: `translate(${(1 - innerReveal) * -40}px, ${(1 - innerReveal) * -20}px)`,
                      "--vg-border": "1.5px",
                      "--vg-size": "260px",
                      "--vg-hue": 170,
                      "--vg-sat": 75,
                      "--vg-light": 65,
                      "--vg-outer": 0.5,
                    }}
                  >
                    <span
                      style={{
                        width: 32, height: 32, borderRadius: 999,
                        background: "rgba(45,212,191,0.22)",
                        border: "1px solid rgba(45,212,191,0.45)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                        display: "grid", placeItems: "center",
                        color: "#5eead4", fontSize: 14,
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Marge en hausse</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>+2.3 pts ce trimestre</div>
                    </div>
                  </div>

                  {/* Floating glass badge — bottom right */}
                  <div
                    data-vyzor-glow
                    className="vz-hero-badge-br"
                    style={{
                      position: "absolute",
                      bottom: -18, right: -36,
                      padding: "11px 15px", borderRadius: 16,
                      background: "rgba(255,255,255,0.10)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow:
                        "0 20px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", gap: 10,
                      opacity: innerAlpha,
                      transform: `translate(${(1 - innerReveal) * 40}px, ${(1 - innerReveal) * 20}px)`,
                      "--vg-border": "1.5px",
                      "--vg-size": "260px",
                      "--vg-hue": 38,
                      "--vg-sat": 92,
                      "--vg-light": 65,
                      "--vg-outer": 0.5,
                    }}
                  >
                    <span
                      style={{
                        width: 32, height: 32, borderRadius: 999,
                        background: "rgba(240,201,73,0.22)",
                        border: "1px solid rgba(240,201,73,0.45)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                        display: "grid", placeItems: "center",
                        color: gold, fontSize: 14,
                      }}
                    >
                      ✦
                    </span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Projection 90j</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>3 scénarios prêts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: brand wordmark */}
              <div className="vz-hero-brand-col" style={{ textAlign: "right" }}>
                <div
                  className="vz-hero-brand"
                  style={{
                    fontSize: "clamp(48px, 7vw, 124px)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    textTransform: "uppercase",
                    lineHeight: 0.9,
                    backgroundImage:
                      "linear-gradient(180deg, #FFFFFF 0%, #f0c949 55%, rgba(240,201,73,0.4) 100%)",
                    WebkitBackgroundClip: "text", backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(0 14px 28px rgba(0,0,0,0.4)) drop-shadow(0 4px 12px rgba(240,201,73,0.25))",
                  }}
                >
                  {brandName}
                </div>
                <div
                  style={{
                    fontSize: 11, letterSpacing: "0.32em",
                    color: muted, textTransform: "uppercase", fontWeight: 500,
                    marginTop: 14,
                  }}
                >
                  Cockpit financier
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 15,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 24px",
            opacity: ctaIn,
            transform: `scale(${0.85 + ctaIn * 0.15})`,
            filter: isMobile ? "none" : `blur(${(1 - ctaIn) * 16}px)`,
            pointerEvents: ctaIn > 0.1 ? "auto" : "none",
            willChange: isMobile ? "auto" : "transform, opacity, filter",
          }}
        >
          <h2
            className="vz-hero-cta-title"
            style={{
              fontSize: "clamp(32px, 5vw, 76px)",
              margin: 0, fontWeight: 600,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, #d8e0ff 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 14px 28px rgba(120,140,255,0.20)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            {ctaHeading}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.4vw, 18px)",
              color: muted, maxWidth: 580, margin: "22px auto 38px",
              lineHeight: 1.6, fontWeight: 400,
            }}
          >
            {ctaDescription}
          </p>
          <div className="vz-hero-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {/* Primary glass + gold */}
            <a
              href="#beta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 28px", borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.55)",
                backgroundImage: goldGrad,
                color: "#1a1410", fontWeight: 700, fontSize: 14,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow:
                  "0 14px 32px rgba(216,172,47,0.40), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.10)",
                transition: "transform 220ms ease, box-shadow 220ms ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(216,172,47,0.50), inset 0 1px 0 rgba(255,255,255,0.75)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 14px 32px rgba(216,172,47,0.40), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.10)";
              }}
            >
              Candidater à la bêta →
            </a>
            {/* Secondary glass */}
            <a
              href="#produit"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 24px", borderRadius: 18,
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                color: "#fff", fontWeight: 600, fontSize: 14,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow:
                  "0 12px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.05)",
              }}
            >
              Voir le produit
            </a>
          </div>
          <div
            style={{
              marginTop: 30, fontSize: 12, color: muted,
              display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#5eead4", boxShadow: "0 0 10px #5eead4" }} />
              Gratuit pendant la bêta
            </span>
            <span>·</span>
            <span>Tarif préférentiel à vie</span>
            <span>·</span>
            <span>Setup 5 min</span>
          </div>
        </div>

        {/* Glass scroll progress bar */}
        <div
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            height: 3, background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 60,
          }}
        >
          <div
            style={{
              height: "100%", width: `${progress * 100}%`,
              backgroundImage:
                "linear-gradient(90deg, rgba(99,102,241,0.7), #f0c949 50%, rgba(45,212,191,0.7))",
              boxShadow: `0 0 16px ${gold}`,
              transition: "width 80ms linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Liquid-glass dashboard mockup
const DashboardMockup = ({ counter, ringDash, metricLabel, gold }) => {
  const subtle = "rgba(255,255,255,0.10)";
  return (
    <div
      data-vyzor-glow
      style={{
        position: "relative",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 24, padding: 22,
        boxShadow:
          "0 30px 70px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.04)",
        "--vg-border": "1.5px",
        "--vg-size": "380px",
        "--vg-hue": 38,
        "--vg-sat": 90,
        "--vg-light": 65,
        "--vg-outer": 0.45,
      }}
    >
      {/* specular top edge */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* top bar */}
      <div
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fb7185", boxShadow: "0 0 8px rgba(251,113,133,0.6)" }} />
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#f0c949", boxShadow: "0 0 8px rgba(240,201,73,0.6)" }} />
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#5eead4", boxShadow: "0 0 8px rgba(94,234,212,0.6)" }} />
        </div>
        <div
          style={{
            fontSize: 9, letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontWeight: 600,
          }}
        >
          ACME SAS · T2 2026
        </div>
      </div>

      {/* score ring + KPIs */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 18,
          alignItems: "center", marginBottom: 18,
        }}
      >
        <div style={{ position: "relative", width: 130, height: 130 }}>
          <svg
            viewBox="0 0 144 144"
            style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
          >
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f9e08a" />
                <stop offset="100%" stopColor="#d8ac2f" />
              </linearGradient>
            </defs>
            <circle
              cx="72" cy="72" r="64" fill="none"
              stroke="rgba(255,255,255,0.08)" strokeWidth="10"
            />
            <circle
              cx="72" cy="72" r="64" fill="none"
              stroke="url(#ringGrad)" strokeWidth="10" strokeLinecap="round"
              strokeDasharray="402" strokeDashoffset={ringDash}
              style={{ transition: "stroke-dashoffset 120ms linear", filter: `drop-shadow(0 0 8px ${gold})` }}
            />
          </svg>
          <div
            style={{
              position: "absolute", inset: 0, display: "grid", placeItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 32, fontWeight: 700, color: "#fff",
                  fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
                  letterSpacing: "-0.02em", lineHeight: 1,
                }}
              >
                {counter}
              </div>
              <div
                style={{
                  fontSize: 8, color: "rgba(240,201,73,0.85)",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  fontWeight: 600, marginTop: 4,
                }}
              >
                {metricLabel}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { l: "Trésorerie", v: 82, c: "linear-gradient(90deg, #f9e08a, #d8ac2f)" },
            { l: "Marge", v: 71, c: "linear-gradient(90deg, #5eead4, #2dd4bf)" },
            { l: "BFR", v: 58, c: "linear-gradient(90deg, #a5b4fc, #6366f1)" },
            { l: "Endettement", v: 88, c: "linear-gradient(90deg, #fda4af, #fb7185)" },
          ].map((r) => (
            <div key={r.l}>
              <div
                style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 10, marginBottom: 4,
                  color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em",
                }}
              >
                <span>{r.l}</span>
                <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace', color: "#fff" }}>
                  {r.v}
                </span>
              </div>
              <div
                style={{
                  height: 6, borderRadius: 3,
                  background: "rgba(255,255,255,0.08)", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: `${r.v}%`, height: "100%",
                    backgroundImage: r.c, borderRadius: 3,
                    boxShadow: "0 0 10px rgba(255,255,255,0.25)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* mini sparkline row */}
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${subtle}`,
          borderRadius: 14, padding: 12,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 9, letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            Tendance · 12 mois
          </span>
          <span
            style={{
              fontSize: 10, color: gold, fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
              fontWeight: 700,
            }}
          >
            +18.4%
          </span>
        </div>
        <div
          style={{
            display: "flex", alignItems: "flex-end", gap: 4, height: 40,
          }}
        >
          {[38, 52, 44, 61, 56, 70, 64, 78, 72, 84, 80, 92].map((h, i, arr) => (
            <div
              key={i}
              style={{
                flex: 1, height: `${h}%`, borderRadius: 3,
                background: i === arr.length - 1
                  ? "linear-gradient(180deg, #f9e08a, #d8ac2f)"
                  : "rgba(240,201,73,0.32)",
                boxShadow: i === arr.length - 1 ? `0 0 12px ${gold}` : "none",
                opacity: i === arr.length - 1 ? 1 : 0.4 + (i / arr.length) * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CinematicHero, DashboardMockup });
