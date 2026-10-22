// feature-page.jsx — Gabarit de sous-page fonctionnalité (lit window.VZ_FEATURE_SLUG)

const FeaturePage = () => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.58)";
  const subtle = "rgba(255,255,255,0.08)";
  const f = VZ_FEATURES.find((x) => x.slug === window.VZ_FEATURE_SLUG) || VZ_FEATURES[0];
  const V = f.Visual;
  const others = VZ_FEATURES.filter((x) => x.slug !== f.slug);

  React.useEffect(() => {
    const seen = new WeakSet();
    const markStagger = (root) => {
      root.querySelectorAll("*").forEach((el) => {
        if (el.closest(".vz-st") || el.closest("svg") || el.closest("form") || el.closest("footer") || el.querySelector("[class*='tilt']") || el.closest("[class*='tilt']")) return;
        const kids = Array.from(el.children);
        if (kids.length < 2 || kids.length > 14) return;
        const d = getComputedStyle(el).display;
        if (d !== "grid" && d !== "inline-grid") return;
        kids.forEach((k, i) => {
          k.classList.add("vz-st"); k.style.setProperty("--i", Math.min(i, 10));
          const done = (ev) => { if (ev.target !== k || ev.propertyName !== "opacity" || !(k.closest(".vz-reveal") || {}).classList?.contains("in") || getComputedStyle(k).opacity !== "1") return; k.classList.remove("vz-st"); k.removeEventListener("transitionend", done); };
          k.addEventListener("transitionend", done);
        });
      });
    };
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }) : null;
    const scan = () => document.querySelectorAll(".vz-reveal").forEach((el) => {
      if (seen.has(el)) return; seen.add(el);
      markStagger(el);
      if (io) io.observe(el); else el.classList.add("in");
    });
    scan();
    const t1 = setTimeout(scan, 300), t2 = setTimeout(scan, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); io && io.disconnect(); };
  }, []);

  return (
    <React.Fragment>
      <VyzorNav gold={gold} text={text} muted={muted} subtle={subtle} />
      <div style={{ background: "#070a14", color: text, overflow: "hidden" }}>
        <main id="contenu" tabIndex={-1} style={{ outline: "none" }}>
        <div className="vz-page-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "140px clamp(24px, 6vw, 96px) 0" }}>
          <a href="fonctionnalites.html" className="vzp-back">← Toutes les fonctionnalités</a>

          <header className="vzp-hero">
            <h1 style={{ margin: 0, fontSize: "clamp(36px, 4.6vw, 56px)", lineHeight: 1.04, letterSpacing: "-0.03em", fontWeight: 600, color: "#fff", textWrap: "balance" }}>{f.name}</h1>
            <div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: muted, textWrap: "pretty" }}>{f.lead}</p>
              <a className="vz-btn-primary" href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 24, padding: "13px 22px", borderRadius: 10, backgroundColor: gold, color: "#0b0d14", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Demander une démo <span aria-hidden="true">→</span></a>
            </div>
          </header>

          {f.slug === "conseil" && window.ConseilFlow ? <ConseilFlow /> : null}

          {["alertes", "multi-societes", "juridique"].includes(f.slug) ? (
            <React.Fragment>
              <section className="vz-reveal vzp-split" style={{ marginTop: 64 }}>
                <div className="vzp-visual" aria-hidden="true" style={{ height: "100%", minHeight: 360 }}><div className={"vzp-visual-in" + (f.DetailVisual ? " vzp-visual-auto" : "")}>{f.DetailVisual ? <f.DetailVisual /> : <V />}</div></div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Ce que Vyzor fait pour vous</h2>
                  <div style={{ marginTop: 20 }}>
                    {f.points.map(([t, d]) => (
                      <div key={t} style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{t}</div>
                        <div style={{ fontSize: 14.5, lineHeight: 1.6, color: muted, marginTop: 4 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              {f.steps ? (
                <section className="vz-reveal" style={{ marginTop: 96 }}>
                  <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Comment ça marche</h2>
                  <div className="vzp-steps">
                    {f.steps.map(([t, d]) => (
                      <div key={t} className="vzp-step">
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{t}</div>
                        <div style={{ fontSize: 14.5, lineHeight: 1.6, color: muted, marginTop: 6 }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </React.Fragment>
          ) : null}
          {["alertes", "multi-societes", "juridique"].includes(f.slug) ? null : f.slug === "tresorerie" && window.TresorerieExplainer ? <TresorerieExplainer /> : f.slug === "analyse-financiere" && window.AnalyseExplainer ? <AnalyseExplainer /> : f.slug === "conseil" && window.ConseilCapabilities ? <ConseilCapabilities /> : (
          <section className="vz-reveal" style={{ marginTop: 112 }}>
            <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Ce que Vyzor fait pour vous</h2>
            <div className="vzp-points">
              {f.points.map(([t, d], i) => (
                <div key={t} className="vzp-point">
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{t}</h3>
                  <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.6, color: muted, textWrap: "pretty" }}>{d}</p>
                </div>
              ))}
            </div>
          </section>
          )}

          <section className="vz-reveal" style={{ marginTop: 112 }}>
            <h2 style={{ margin: 0, fontSize: 24, letterSpacing: "-0.02em", fontWeight: 600, color: "#fff" }}>Les autres fonctionnalités</h2>
            <div className="vzp-others">
              {others.map((o) => {
                // Fonctionnalité à venir : simple bloc, pas un lien sans adresse.
                const Tag = o.soon ? "div" : "a";
                return (
                  <Tag key={o.slug} href={o.soon ? undefined : vzFeatureHref(o.slug)} className={"vzp-other" + (o.soon ? " soon" : "")}>
                    <span style={{ color: gold, display: "grid", placeItems: "center" }}><VzfIcon name={o.icon} size={17} /></span>
                    <span style={{ flex: 1 }}>{o.name}</span>
                    {o.soon ? <span style={{ fontSize: 12, fontWeight: 600, color: gold }}>Bientôt</span> : <span aria-hidden="true" className="vzp-other-arr">→</span>}
                  </Tag>
                );
              })}
            </div>
          </section>

          <div className="vz-reveal"><BetaFormGlass /></div>
        </div>
        </main>
        <div className="vz-reveal" style={{ marginTop: 96 }}><VyzorFooterGlass fullWidth /></div>
      </div>
      <style>{`
        @keyframes vzpUp { from { opacity: 0; transform: translateY(22px); filter: blur(6px); } to { opacity: 1; transform: none; filter: none; } }
        @keyframes vzpLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .vzp-back { animation: vzpUp 700ms cubic-bezier(0.22,1,0.36,1) both; }
        .vzp-hero h1 { animation: vzpUp 900ms cubic-bezier(0.22,1,0.36,1) 80ms both; }
        .vzp-hero > div > p { animation: vzpUp 900ms cubic-bezier(0.22,1,0.36,1) 200ms both; }
        .vzp-hero > div > a { animation: vzpUp 900ms cubic-bezier(0.22,1,0.36,1) 320ms both; }
        .vzp-hero { position: relative; border-bottom-color: transparent !important; }
        .vzp-hero::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; background: linear-gradient(90deg, rgba(240,201,73,0.5), rgba(255,255,255,0.08) 40%); transform-origin: left; animation: vzpLine 1200ms cubic-bezier(0.22,1,0.36,1) 400ms both; }
        .vz-reveal { filter: blur(4px); transition: opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1), filter 800ms ease !important; }
        .vz-reveal.in { filter: none; }
        .vz-reveal .vz-st { opacity: 0; transform: translateY(18px) scale(0.985); transition: opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1); transition-delay: calc(120ms + var(--i, 0) * 80ms); }
        .vz-reveal.in .vz-st { opacity: 1; transform: none; }
        .vz-reveal .vzp-visual { transform: scale(0.96); opacity: 0; transition: transform 1100ms cubic-bezier(0.22,1,0.36,1) 100ms, opacity 900ms ease 100ms; }
        .vz-reveal.in .vzp-visual { transform: none; opacity: 1; }
        .vz-reveal .vzp-point, .vz-reveal .vzp-split > div:last-child > div > div { position: relative; }
        @media (prefers-reduced-motion: reduce) { .vzp-back, .vzp-hero h1, .vzp-hero > div > p, .vzp-hero > div > a, .vzp-hero::after { animation: none !important; } .vz-reveal, .vz-reveal .vz-st, .vz-reveal .vzp-visual { opacity: 1 !important; transform: none !important; filter: none !important; transition: none !important; } }
        .vzp-back { display: inline-block; font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none; margin-bottom: 28px; transition: color 160ms ease; }
        .vzp-back:hover { color: #fff; }
        .vzp-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: end; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .vzp-hero + * { margin-top: 64px !important; }
        .vzp-visual { position: relative; height: 380px; border-radius: 20px; overflow: hidden; background: linear-gradient(180deg, #10131b 0%, #0b0d14 100%); border: 1px solid rgba(255,255,255,0.07); box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 80px -40px rgba(0,0,0,0.8); }
        .vzp-visual:has(.vzp-visual-auto) { height: auto !important; min-height: 0 !important; }
        .vzp-visual-auto { position: relative !important; padding-bottom: 20px; -webkit-mask-image: none !important; mask-image: none !important; }
        .vzp-visual-in { position: absolute; inset: 0; padding-top: 12px; -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 30%); mask-image: linear-gradient(to top, transparent 0%, #000 30%); }
        .vzp-points { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0 32px; margin-top: 36px; }
        .vzp-point { padding: 24px 0 8px; border-top: 1px solid rgba(255,255,255,0.08); }
        
        .vzp-split { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 48px; align-items: stretch; }
        .vzp-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 24px; }
        .vzp-step { padding: 22px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
        @media (max-width: 920px) { .vzp-split, .vzp-steps { grid-template-columns: 1fr; } .vzp-split .vzp-visual { min-height: 320px; } }
        .vzp-others { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; margin-top: 24px; }
        .vzp-other { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #fff; font-size: 14.5px; font-weight: 500; text-decoration: none; transition: border-color 160ms ease, background-color 160ms ease; }
        .vzp-other:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .vzp-other.soon { cursor: default; color: rgba(255,255,255,0.6); }
        .vzp-other.soon:hover { border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
        .vzp-other-arr { color: rgba(255,255,255,0.4); transition: color 160ms ease; }
        .vzp-other:hover .vzp-other-arr { color: #f0c949; }
        .vz-btn-primary { transition: background-color 160ms ease; } .vz-btn-primary:hover { background-color: #f4d468 !important; }
        .vz-btn-ghost { transition: border-color 160ms ease; } .vz-btn-ghost:hover { border-color: rgba(255,255,255,0.32) !important; }
        @media (max-width: 920px) {
          .vzp-hero { grid-template-columns: 1fr; gap: 20px; }
        }
        
      `}</style>
    </React.Fragment>
  );
};

Object.assign(window, { FeaturePage });
