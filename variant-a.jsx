// variant-a.jsx — Premium dark (or/noir, fidèle à Vyzor)

const VariantA = () => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const subtle = "rgba(255,255,255,0.08)";

  return (
    <div style={{
      width: "100%", minHeight: "100%",
      background: "radial-gradient(circle at 18% -10%, rgba(240,201,73,0.10), transparent 35%), radial-gradient(circle at 85% -20%, rgba(45,212,191,0.07), transparent 40%), #0f1115",
      color: text,
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
      padding: "32px 56px 56px",
      position: "relative", overflow: "hidden",
    }}>
      {/* noise overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}/>

      {/* NAV */}
      <VyzorNav gold={gold} text={text} muted={muted} subtle={subtle} />
      <div style={{ height: 88 }}/>

      {/* HERO */}
      <section className="vz-vA-hero" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center", marginBottom: 96 }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            border: `1px solid rgba(240,201,73,0.30)`,
            background: "rgba(240,201,73,0.06)",
            fontSize: 11, letterSpacing: "0.18em", color: gold, textTransform: "uppercase", fontWeight: 600,
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: gold, boxShadow: `0 0 12px ${gold}` }}/>
            Programme bêta · 10 places
          </div>

          <h1 style={{
            fontSize: 68, lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0,
            fontWeight: 600,
          }}>
            Comprenez vos chiffres,<br/>
            <span style={{ background: "linear-gradient(135deg,#f9e08a 0%, #ebc85b 50%, #d8ac2f 100%)", WebkitBackgroundClip: "text", color: "transparent" }}>
              simplement.
            </span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: muted, maxWidth: 520, marginTop: 24 }}>
            Vyzor analyse votre passé, éclaire votre présent et projette votre futur financier.
            Un cockpit pensé pour les dirigeants de PME, DAF et experts-comptables.
          </p>

          {/* Triple bénéfice */}
          <div style={{ display: "flex", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { k: "Passé", d: "Analyse" },
              { k: "Présent", d: "Compréhension" },
              { k: "Futur", d: "Prévision" },
            ].map((b, i) => (
              <div key={b.k} style={{
                padding: "10px 14px", borderRadius: 10,
                border: `1px solid ${i === 1 ? "rgba(240,201,73,0.35)" : subtle}`,
                background: i === 1 ? "rgba(240,201,73,0.06)" : "rgba(255,255,255,0.02)",
                minWidth: 110,
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", color: i === 1 ? gold : muted, textTransform: "uppercase", fontWeight: 600 }}>{b.k}</div>
                <div style={{ fontSize: 13, marginTop: 3 }}>{b.d}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 36 }}>
            <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 22px", borderRadius: 12,
              border: "1px solid #f2d782",
              backgroundImage: "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)",
              color: "#111", fontWeight: 600, fontSize: 14,
              boxShadow: "0 10px 24px rgba(216,172,47,0.28), inset 0 1px 0 rgba(255,255,255,0.45)",
              textDecoration: "none",
            }}>
              Rejoindre la bêta
              <span style={{ display: "inline-block", transform: "translateY(-1px)" }}>→</span>
            </a>
            <a href="#produit" style={{
              padding: "14px 18px", borderRadius: 12, fontSize: 14,
              border: `1px solid ${subtle}`, color: text, textDecoration: "none",
            }}>Voir le produit</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28, fontSize: 11, color: muted }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: "#2dd4bf" }}/>Gratuit pendant la bêta</span>
            <span>·</span>
            <span>Tarif préférentiel à vie</span>
            <span>·</span>
            <span>Setup 5 min</span>
          </div>
        </div>

        {/* Mockup */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -40,
            background: "radial-gradient(ellipse at center, rgba(240,201,73,0.18), transparent 60%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}/>
          <MockDashboard skin="dark" />
        </div>
      </section>

      {/* MÉTHODOLOGIE — refonte UI/UX */}
      <MethodologySection id="produit" gold={gold} text={text} muted={muted} subtle={subtle} />

      {/* DÉMO PRODUIT */}
      <section style={{ position: "relative", marginBottom: 96 }}>
        <div className="vz-vA-demo" style={{
          background: "linear-gradient(140deg, #0c0f16, #121722 45%, #0f1115)",
          border: `1px solid ${subtle}`,
          borderRadius: 20, padding: 48,
          display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -100, right: -100, width: 400, height: 400,
            background: "radial-gradient(circle, rgba(240,201,73,0.12), transparent 60%)",
            pointerEvents: "none",
          }}/>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", color: gold, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Démo · Cockpit</div>
            <h2 style={{ fontSize: 32, margin: 0, letterSpacing: "-0.02em", fontWeight: 600, lineHeight: 1.15 }}>
              Une lecture financière digne d'un DAF.<br/>
              <span style={{ color: muted }}>En 90 secondes.</span>
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Vyzor Score consolidé sur les 6 dimensions clés",
                "Alertes rouges / vertes triées par impact estimé",
                "Projection 90 jours avec 3 scénarios paramétrables",
                "Export PDF prêt pour conseil d'administration",
              ].map((l) => (
                <li key={l} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: text }}>
                  <span style={{ ...tickStyle, background: "rgba(240,201,73,0.12)", color: gold, border: `1px solid rgba(240,201,73,0.30)` }}>✓</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ position: "relative" }}>
            <MockDashboard skin="dark" />
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES (placeholder honnête — beta) */}
      <section style={{ marginBottom: 96 }}>
        <div className="vz-vA-testimonials" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { q: "Ils nous rejoindront en bêta.", a: "Votre logo ici", r: "PME industrielle · 35 p." },
            { q: "Co-construisez avec nous le cockpit que vous auriez voulu.", a: "10 places", r: "Programme fermé · sélection sur entretien" },
            { q: "Une place vous attend.", a: "Candidatez ↓", r: "Bêta Q2 2026" },
          ].map((t, i) => (
            <div key={i} style={{
              background: i === 1 ? "rgba(240,201,73,0.04)" : "#0f0f12",
              border: `1px solid ${i === 1 ? "rgba(240,201,73,0.25)" : subtle}`,
              borderRadius: 16, padding: 24, minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <p style={{ fontSize: 17, lineHeight: 1.4, margin: 0, letterSpacing: "-0.01em" }}>« {t.q} »</p>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: i === 1 ? gold : text }}>{t.a}</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 3 }}>{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ marginBottom: 96 }}>
        <div className="vz-vA-faq" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56 }}>
          <div>
            <div style={{ height: 1, width: 56, background: gold, marginBottom: 20 }}/>
            <h2 style={{ fontSize: 32, margin: 0, letterSpacing: "-0.02em", fontWeight: 600 }}>Questions fréquentes</h2>
            <p style={{ fontSize: 14, color: muted, marginTop: 12 }}>Une autre question ? Écrivez-nous à <a href="mailto:admin@vyzor.fr" style={{ color: gold }}>admin@vyzor.fr</a>.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { q: "Pourquoi limiter la bêta à 10 entreprises ?", a: "Pour co-construire en profondeur. Chaque bêta-testeur a un échange direct avec l'équipe produit toutes les deux semaines." },
              { q: "Mes données comptables sont-elles confidentielles ?", a: "Hébergement français, chiffrement au repos et en transit, aucune donnée revendue. Vous restez propriétaire et pouvez tout supprimer en un clic." },
              { q: "Quel format pour mon Excel ?", a: "FEC, balance, ou simple grand livre exporté de Sage / Cegid / Pennylane / EBP. Vyzor détecte automatiquement le schéma." },
              { q: "Combien coûte Vyzor après la bêta ?", a: "Les bêta-testeurs bénéficient d'un tarif préférentiel à vie. Les tarifs publics seront annoncés à la sortie." },
            ].map((f) => (
              <details key={f.q} style={{ borderTop: `1px solid ${subtle}`, padding: "20px 0" }}>
                <summary style={{ fontSize: 16, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", letterSpacing: "-0.01em" }}>
                  {f.q}
                  <span style={{ color: gold, fontSize: 18 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.6, margin: "12px 0 0", maxWidth: 560 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <BetaForm variant="dark" />

      <footer style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${subtle}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: muted }}>
        <div>© 2026 Vyzor · vyzor.fr</div>
        <div style={{ display: "flex", gap: 18 }}>
          <a style={{ color: muted, textDecoration: "none" }}>Mentions légales</a>
          <a style={{ color: muted, textDecoration: "none" }}>Confidentialité</a>
          <a href="mailto:admin@vyzor.fr" style={{ color: muted, textDecoration: "none" }}>admin@vyzor.fr</a>
        </div>
      </footer>
    </div>
  );
};

// Formulaire bêta partagé entre variantes
const BetaForm = ({ variant = "dark" }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const dark = variant === "dark";
  const editorial = variant === "editorial";
  const gold = dark ? "#f0c949" : "#b8862a";
  const text = dark ? "rgba(255,255,255,0.92)" : editorial ? "#1a1410" : "#0f1115";
  const muted = dark ? "rgba(255,255,255,0.55)" : editorial ? "rgba(60,50,40,0.65)" : "#64748b";
  const bg = dark
    ? "linear-gradient(140deg, #14110a, #1a1610 45%, #0f0e0a)"
    : editorial
      ? "#1a1410"
      : "#0f1115";
  const inputBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)";
  const inputBorder = dark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.18)";
  const labelMuted = dark ? muted : "rgba(255,255,255,0.65)";

  return (
    <section id="beta" style={{
      background: bg,
      border: `1px solid ${dark ? "rgba(240,201,73,0.18)" : "transparent"}`,
      borderRadius: 24, padding: 48, position: "relative", overflow: "hidden",
      color: dark ? text : "#fff",
    }}>
      <div style={{
        position: "absolute", top: -50, left: "30%", width: 500, height: 200,
        background: `radial-gradient(ellipse, rgba(240,201,73,0.18), transparent 60%)`,
        pointerEvents: "none", filter: "blur(40px)",
      }}/>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="vz-betaform">
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", color: gold, textTransform: "uppercase", fontWeight: 600 }}>Programme bêta · 10 places</div>
          <h2 style={{ fontSize: 36, margin: "12px 0 16px", letterSpacing: "-0.02em", fontWeight: 600, lineHeight: 1.1 }}>
            Devenez l'un des 10 premiers.
          </h2>
          <p style={{ fontSize: 15, color: dark ? muted : "rgba(255,255,255,0.65)", lineHeight: 1.6, maxWidth: 420 }}>
            Accès gratuit pendant toute la bêta, tarif préférentiel à vie, et un canal direct avec l'équipe produit pour façonner Vyzor avec nous.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Onboarding personnalisé en visio (45 min)",
              "Échange bi-mensuel avec l'équipe produit",
              "Influence directe sur la roadmap",
              "Tarif préférentiel à vie après la bêta",
            ].map((l) => (
              <li key={l} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                <span style={{ ...tickStyle, background: "rgba(240,201,73,0.14)", color: gold, border: `1px solid rgba(240,201,73,0.35)` }}>✓</span>
                {l}
              </li>
            ))}
          </ul>
        </div>

        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{
            background: "rgba(0,0,0,0.40)",
            border: `1px solid ${inputBorder}`,
            borderRadius: 16, padding: 28,
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", color: gold, textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }}>Candidature bêta</div>
            {[
              { id: "name", label: "Nom et prénom", placeholder: "Marie Durand", type: "text" },
              { id: "email", label: "Email pro", placeholder: "marie@entreprise.fr", type: "email" },
              { id: "company", label: "Entreprise", placeholder: "ACME SAS", type: "text" },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, letterSpacing: "0.14em", color: labelMuted, textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                <input type={f.type} required placeholder={f.placeholder} style={{
                  width: "100%", padding: "12px 14px", boxSizing: "border-box",
                  background: inputBg, color: "#fff",
                  border: `1px solid ${inputBorder}`, borderRadius: 10,
                  fontSize: 14, outline: "none",
                }}/>
              </div>
            ))}
            <button type="submit" style={{
              width: "100%", marginTop: 8, padding: "14px",
              border: "1px solid #f2d782",
              backgroundImage: "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)",
              color: "#111", fontWeight: 700, fontSize: 14, borderRadius: 12, cursor: "pointer",
              boxShadow: "0 10px 24px rgba(216,172,47,0.28), inset 0 1px 0 rgba(255,255,255,0.45)",
              letterSpacing: "0.02em",
            }}>
              Candidater à la bêta →
            </button>
            <div style={{ fontSize: 11, color: labelMuted, marginTop: 14, textAlign: "center" }}>
              Réponse sous 48h. Aucun engagement.
            </div>
          </form>
        ) : (
          <div style={{
            background: "rgba(45,212,191,0.08)",
            border: `1px solid rgba(45,212,191,0.30)`,
            borderRadius: 16, padding: 28, textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Candidature reçue</div>
            <div style={{ fontSize: 13, color: labelMuted, lineHeight: 1.6 }}>
              Nous vous recontactons sous 48h à l'email indiqué. Merci !
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// New top nav: floating centered pill, active indicator, scroll-aware compact mode
const VyzorNav = ({ gold, text, muted, subtle }) => {
  const items = [
    { id: "produit", label: "Le produit", href: "index.html#produit", external: true, matchPath: /(^\/?$|index\.html?$)/i, anchor: "produit" },
    { id: "fonctionnalites", label: "Fonctionnalités", href: "fonctionnalites.html", external: true, matchPath: /fonctionnalites\.html?$/i },
    { id: "securite", label: "Sécurité", href: "securite.html", external: true, matchPath: /securite\.html?$/i },
    { id: "faq", label: "FAQ", href: "faq.html", external: true, matchPath: /faq\.html?$/i },
  ];
  // Détermine la page courante au montage
  const initialActive = (() => {
    if (typeof window === "undefined") return "produit";
    const p = window.location.pathname || "";
    const found = items.find(it => it.matchPath && it.matchPath.test(p));
    return found ? found.id : "produit";
  })();
  const [active, setActive] = React.useState(initialActive);
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = React.useRef({});
  const trackRef = React.useRef(null);

  React.useEffect(() => {
    let raf = 0;
    const compute = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 24);
      // active section detection (only for in-page anchors)
      const inPage = items.filter(it => !it.external);
      let current = inPage[0]?.id;
      for (const it of inPage) {
        const el = document.getElementById(it.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top - 120 <= 0) current = it.id;
        }
      }
      if (current) setActive(current);
      raf = 0;
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

  React.useLayoutEffect(() => {
    const key = hovered || active;
    const el = itemRefs.current[key];
    const track = trackRef.current;
    if (el && track) {
      const r = el.getBoundingClientRect();
      const tr = track.getBoundingClientRect();
      setIndicator({ left: r.left - tr.left, width: r.width, opacity: 1 });
    }
  }, [active, hovered, scrolled]);

  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";

  return (
    <nav className="vz-nav-wrap" style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 60, transition: "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        gap: scrolled ? 10 : 18,
        padding: scrolled ? "6px 6px 6px 14px" : "8px 8px 8px 18px",
        borderRadius: 999,
        background: scrolled ? "rgba(15,17,21,0.78)" : "rgba(15,17,21,0.55)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        border: `1px solid ${scrolled ? "rgba(240,201,73,0.22)" : "rgba(255,255,255,0.10)"}`,
        boxShadow: scrolled
          ? "0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Brand — mark seul (transparent) pour s'intégrer au verre de la navbar */}
        <a href="index.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", paddingRight: 4, paddingLeft: 2 }}>
          <VyzorLogo size={28} color={gold} bg="transparent" />
          <div style={{
            fontSize: 11, letterSpacing: "0.32em", color: text, fontWeight: 700,
            overflow: "hidden",
            maxWidth: scrolled ? 0 : 80,
            opacity: scrolled ? 0 : 1,
            transition: "max-width 280ms ease, opacity 200ms ease",
            whiteSpace: "nowrap",
          }}>VYZOR</div>
        </a>

        {/* Divider */}
        <span className="vz-nav-divider" style={{
          width: 1, height: 18, background: "rgba(255,255,255,0.10)",
          opacity: scrolled ? 0 : 1, transition: "opacity 200ms",
        }}/>

        {/* Links + animated indicator */}
        <div ref={trackRef} className="vz-nav-links" style={{ position: "relative", display: "flex", alignItems: "center", gap: 2 }}>
          <div style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            left: indicator.left, width: indicator.width, height: 32,
            borderRadius: 999,
            background: "rgba(240,201,73,0.10)",
            border: "1px solid rgba(240,201,73,0.25)",
            opacity: indicator.opacity,
            transition: "left 380ms cubic-bezier(0.22, 1, 0.36, 1), width 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms",
            pointerEvents: "none",
          }}/>
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={it.external ? it.href : `#${it.id}`}
                ref={(el) => { itemRefs.current[it.id] = el; }}
                onMouseEnter={() => setHovered(it.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: isActive ? "#f5e0a0" : muted,
                  textDecoration: "none",
                  borderRadius: 999,
                  transition: "color 220ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => { if (!isActive) e.currentTarget.style.color = text; }}
                onMouseOut={(e) => { if (!isActive) e.currentTarget.style.color = muted; }}
              >
                {it.label}
              </a>
            );
          })}
        </div>

        {/* Auth + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 6 }}>
          <a href="https://app.vyzor.fr" target="_blank" rel="noopener" className="vz-nav-login" style={{
            fontSize: 12.5, color: muted, textDecoration: "none", whiteSpace: "nowrap",
            padding: "8px 12px", borderRadius: 999,
            transition: "color 200ms, background 200ms",
          }}
            onMouseOver={(e) => { e.currentTarget.style.color = text; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = muted; e.currentTarget.style.background = "transparent"; }}
          >
            Se connecter
          </a>
          <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" className="vz-nav-cta" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: scrolled ? "8px 14px" : "8px 16px",
            borderRadius: 999,
            border: "1px solid #f2d782",
            backgroundImage: goldGrad,
            color: "#111", fontWeight: 600, fontSize: 12.5,
            textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 6px 18px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
            transition: "transform 200ms ease, box-shadow 200ms ease",
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(216,172,47,0.42), inset 0 1px 0 rgba(255,255,255,0.5)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.45)"; }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: 999, background: "#1a1410",
              boxShadow: "0 0 0 2px rgba(26,20,16,0.15)",
            }}/>
            Rejoindre la bêta
          </a>

          {/* Burger — visible uniquement en mobile via CSS */}
          <button
            type="button"
            className="vz-nav-burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "none", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, flex: "0 0 auto",
              borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)", cursor: "pointer", padding: 0,
            }}
          >
            <span style={{ position: "relative", width: 16, height: 12, display: "block" }}>
              <span style={{ position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2, background: text, top: menuOpen ? 5 : 0, transform: menuOpen ? "rotate(45deg)" : "none", transition: "transform 240ms ease, top 240ms ease" }} />
              <span style={{ position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2, background: text, top: 5, opacity: menuOpen ? 0 : 1, transition: "opacity 160ms ease" }} />
              <span style={{ position: "absolute", left: 0, right: 0, height: 2, borderRadius: 2, background: text, top: menuOpen ? 5 : 10, transform: menuOpen ? "rotate(-45deg)" : "none", transition: "transform 240ms ease, top 240ms ease" }} />
            </span>
          </button>
        </div>
      </div>

      {/* Panneau mobile — révèle les onglets + connexion */}
      <div
        className="vz-nav-mobile"
        style={{
          display: "none",
          marginTop: 8,
          borderRadius: 22,
          background: "rgba(15,17,21,0.92)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
          padding: 8,
          overflow: "hidden",
          maxHeight: menuOpen ? 420 : 0,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "max-height 320ms cubic-bezier(0.22,1,0.36,1), opacity 240ms ease, padding 320ms ease",
          paddingTop: menuOpen ? 8 : 0,
          paddingBottom: menuOpen ? 8 : 0,
        }}
      >
        {items.map((it) => (
          <a
            key={it.id}
            href={it.external ? it.href : `#${it.id}`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "13px 16px", borderRadius: 14,
              fontSize: 15, fontWeight: 500, color: active === it.id ? "#f5e0a0" : text,
              textDecoration: "none",
            }}
          >
            {it.label}
          </a>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "6px 12px" }} />
        <a
          href="https://app.vyzor.fr" target="_blank" rel="noopener"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block", padding: "13px 16px", borderRadius: 14,
            fontSize: 15, fontWeight: 500, color: muted, textDecoration: "none",
          }}
        >
          Se connecter
        </a>
      </div>
    </nav>
  );
};

// METHODOLOGY — interactive editorial layout
const MethodologySection = ({ id, gold, text, muted, subtle }) => {
  const steps = [
    {
      idx: "01",
      kicker: "Passé",
      h: "Analysez ce qui s'est passé",
      d: "Glissez votre Excel comptable ou un FEC : Vyzor valide la cohérence et fait parler vos chiffres.",
      features: [
        { ic: "import", t: "Import Excel ou FEC", s: "Le parser valide la cohérence — aucune saisie manuelle." },
        { ic: "ratios", t: "24 ratios de référence", s: "Marge, BFR, DSO, endettement… calculés automatiquement." },
        { ic: "trend", t: "Tendances sur 12 mois", s: "Points forts et zones de tension repérés d'un coup d'œil." },
      ],
      stat: { v: "24", l: "ratios calculés" },
      preview: "past",
    },
    {
      idx: "02",
      kicker: "Présent",
      h: "Comprenez où vous en êtes",
      d: "Un diagnostic en français, lu pour vous avec les seuils de votre secteur.",
      features: [
        { ic: "score", t: "Vyzor Score sur 100", s: "Trésorerie, marge, BFR, endettement résumés en un chiffre." },
        { ic: "budget", t: "Budget vs réalisé", s: "Comparé à votre prévisionnel, pas seulement au N-1." },
        { ic: "alert", t: "Alertes seuils secteur", s: "EBE négatif, trésorerie tendue : remontés au bon moment." },
      ],
      stat: { v: "/100", l: "Vyzor Score" },
      preview: "present",
    },
    {
      idx: "03",
      kicker: "Futur",
      h: "Projetez les 90 prochains jours",
      d: "De la donnée à la décision partagée, en trois gestes concrets.",
      features: [
        { ic: "whatif", t: "Simulation What-If", s: "7 scénarios, impact temps réel sur vos KPI." },
        { ic: "plan", t: "Plan d'action IA", s: "Des recommandations concrètes, priorisées et chiffrées." },
        { ic: "mail", t: "Compte-rendu IA par email", s: "Rédigé pour vous, envoyé en un clic depuis votre messagerie." },
      ],
      stat: { v: "90j", l: "horizon de projection" },
      preview: "future",
    },
  ];

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
  const cur = steps[active];

  // Auto-advance through the three steps; pause on hover/focus or after a manual click.
  const sectionRef = React.useRef(null);
  const resumeTimer = React.useRef(null);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, 4200);
    return () => clearInterval(id);
  }, [paused, steps.length]);

  const handleManualSelect = (i) => {
    setActive(i);
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Resume the auto-rotation after a short delay so users can read.
    resumeTimer.current = setTimeout(() => setPaused(false), 9000);
  };

  React.useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <section id={id} ref={sectionRef} style={{ position: "relative", marginBottom: 112 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header — editorial */}
      <div className="vz-method-header" style={{ marginBottom: 48, maxWidth: 760 }}>
        <div style={{
          fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase",
          fontWeight: 700, color: gold, marginBottom: 16,
        }}>Le produit · ce que Vyzor fait</div>
        <h2 style={{
          fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.02,
          textWrap: "balance",
        }}>
          Trois temps.{" "}
          <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>Une seule lecture.</span>
        </h2>
        <p style={{
          fontSize: 18, lineHeight: 1.6, color: muted, marginTop: 20,
          maxWidth: 680, textWrap: "pretty",
        }}>
          De votre Excel comptable à un plan d'action partagé : voici, étape par étape,{" "}
          <span style={{ color: text }}>ce que Vyzor fait concrètement</span> avec vos chiffres.
        </p>
      </div>

      {/* Step picker — horizontal segmented timeline */}
      <div className="vz-method-steps" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        position: "relative", marginBottom: 32,
      }}>
        {/* progress rail behind buttons */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: 22, height: 1,
          background: subtle, zIndex: 0,
        }}/>
        <div style={{
          position: "absolute", left: 0, top: 22, height: 1,
          width: `${((active + 1) / steps.length) * 100}%`,
          background: `linear-gradient(90deg, ${gold}, rgba(240,201,73,0.4))`,
          transition: "width 540ms cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 1,
        }}/>

        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={s.idx}
              onClick={() => handleManualSelect(i)}
              style={{
                position: "relative", zIndex: 2,
                background: "transparent", border: "none", cursor: "pointer",
                padding: "0 0 0 0", textAlign: "left", color: "inherit",
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14,
              }}
            >
              {/* node */}
              <span style={{
                width: 44, height: 44, borderRadius: 999,
                display: "grid", placeItems: "center",
                fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em",
                color: isActive ? "#111" : isPast ? gold : muted,
                background: isActive ? goldGrad : "#0f0f12",
                border: `1px solid ${isActive ? "#f2d782" : isPast ? "rgba(240,201,73,0.45)" : "rgba(255,255,255,0.12)"}`,
                boxShadow: isActive
                  ? "0 8px 24px rgba(216,172,47,0.35), inset 0 1px 0 rgba(255,255,255,0.45)"
                  : "inset 0 1px 0 rgba(255,255,255,0.04)",
                transition: "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}>
                {isPast ? "✓" : s.idx}
              </span>
              <div>
                <div style={{
                  fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700,
                  color: isActive ? gold : muted, marginBottom: 4,
                  transition: "color 220ms",
                }}>
                  {s.kicker}
                </div>
                <div className="vz-method-step-label" style={{
                  fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em",
                  color: isActive ? text : muted,
                  transition: "color 220ms",
                }}>
                  {s.h}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active step — split panel with preview + content */}
      <div className="vz-method-panel" style={{
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 0,
        background: "linear-gradient(140deg, #0e1015, #0c0d11)",
        border: `1px solid ${subtle}`, borderTop: `1px solid rgba(240,201,73,0.20)`,
        borderRadius: 20, overflow: "hidden", position: "relative",
        minHeight: 360,
      }}>
        {/* Left: copy */}
        <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-start", borderRight: `1px solid ${subtle}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 18 }}>
              <span className="vz-method-num" style={{
                fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', fontSize: 64, fontWeight: 700,
                background: goldGrad, WebkitBackgroundClip: "text", color: "transparent",
                lineHeight: 0.9, letterSpacing: "-0.05em",
                fontFeatureSettings: '"tnum" 1, "lnum" 1',
              }}>{cur.idx}</span>
              <span style={{
                fontSize: 11, letterSpacing: "0.32em", color: gold, textTransform: "uppercase", fontWeight: 700,
              }}>{cur.kicker}</span>
            </div>
            <h3 style={{
              fontSize: 28, margin: 0, letterSpacing: "-0.02em", fontWeight: 600, lineHeight: 1.15,
              maxWidth: 460,
            }}>{cur.h}</h3>
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginTop: 16, maxWidth: 480 }}>
              {cur.d}
            </p>
          </div>

          {/* Ce que ça fait concrètement — features explicites */}
          <div key={`feat-${active}`} className="vz-method-features" style={{ marginTop: 24, display: "flex", flexDirection: "column" }}>
            {cur.features.map((f, i) => (
              <div key={f.t} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "14px 0",
                borderTop: `1px solid ${subtle}`,
                animation: `featRiseMethod 420ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`,
              }}>
                <span style={{
                  flexShrink: 0, width: 34, height: 34, borderRadius: 10,
                  display: "grid", placeItems: "center",
                  background: "rgba(240,201,73,0.08)", border: "1px solid rgba(240,201,73,0.22)",
                  color: gold,
                }}><MethodFeatureIcon name={f.ic} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: text, letterSpacing: "-0.01em" }}>{f.t}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.45, color: muted, marginTop: 2, textWrap: "pretty" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: visual preview */}
        <div style={{
          position: "relative", padding: 32,
          display: "grid", placeItems: "center",
          background: "radial-gradient(circle at 70% 30%, rgba(240,201,73,0.10), transparent 55%)",
        }}>
          {/* faint grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.35,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}/>

          <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
            <MethodPreview kind={cur.preview} gold={gold} muted={muted} subtle={subtle} text={text} />
          </div>

          {/* stat overlay */}
          <div className="vz-method-stat" style={{
            position: "absolute", top: 24, right: 24,
            padding: "10px 14px", borderRadius: 12,
            background: "rgba(15,17,21,0.78)", backdropFilter: "blur(10px)",
            border: `1px solid rgba(240,201,73,0.22)`,
            display: "flex", alignItems: "baseline", gap: 8,
          }}>
            <span style={{
              fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
              background: goldGrad, WebkitBackgroundClip: "text", color: "transparent",
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontFeatureSettings: '"tnum" 1, "lnum" 1',
            }}>{cur.stat.v}</span>
            <span style={{ fontSize: 10, color: muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{cur.stat.l}</span>
          </div>
        </div>
      </div>

      {/* Footer caption row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 18, fontSize: 11, color: muted, fontFamily: 'inherit', fontWeight: 500,
        letterSpacing: "0.18em", textTransform: "uppercase",
      }}>
        <span>Étape {active + 1} / {steps.length}</span>
        <button
          onClick={() => setActive((active + 1) % steps.length)}
          style={{
            background: "transparent", border: `1px solid ${subtle}`, color: muted,
            padding: "8px 14px", borderRadius: 999, fontSize: 11, cursor: "pointer",
            letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "inherit",
            transition: "color 200ms, border-color 200ms",
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = gold; e.currentTarget.style.borderColor = "rgba(240,201,73,0.35)"; }}
          onMouseOut={(e) => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = subtle; }}
        >
          Étape suivante →
        </button>
      </div>
    </section>
  );
};

// Lightweight inline previews per step (placeholders, no real data)
const MethodPreview = ({ kind, gold, muted, subtle, text }) => {
  if (kind === "past") {
    // sparkline + ratio chips
    const bars = [38, 52, 44, 61, 56, 70, 64, 78, 72, 84, 80, 92];
    return (
      <div style={{
        background: "#0c0d11", border: `1px solid ${subtle}`, borderRadius: 14, padding: 18,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: muted, textTransform: "uppercase" }}>Tendance · 12 mois</span>
          <span style={{ fontSize: 12, color: gold, fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" }}>+18.4%</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, marginBottom: 16 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`, borderRadius: 3,
              background: i === bars.length - 1 ? gold : "rgba(240,201,73,0.25)",
              opacity: i === bars.length - 1 ? 1 : 0.4 + (i / bars.length) * 0.5,
            }}/>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[["Marge", "12.3%"], ["BFR", "42j"], ["DSO", "38j"]].map(([k, v]) => (
            <div key={k} style={{
              padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.02)",
              border: `1px solid ${subtle}`,
            }}>
              <div style={{ fontSize: 9, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>{k}</div>
              <div style={{ fontSize: 14, marginTop: 2, fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "present") {
    // gauge-style score
    const score = 76;
    const C = 2 * Math.PI * 52;
    const off = C - (score / 100) * C * 0.75;
    return (
      <div style={{
        background: "#0c0d11", border: `1px solid ${subtle}`, borderRadius: 14, padding: 18,
        display: "flex", alignItems: "center", gap: 18,
      }}>
        <div style={{ position: "relative", width: 124, height: 124 }}>
          <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", transform: "rotate(135deg)" }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeDasharray={C * 0.75} strokeLinecap="round"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke={gold} strokeWidth="8" strokeDasharray={C * 0.75} strokeDashoffset={off} strokeLinecap="round"/>
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "grid", placeItems: "center",
            flexDirection: "column",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', color: text, letterSpacing: "-0.03em", fontFeatureSettings: '"tnum" 1, "lnum" 1' }}>{score}</div>
              <div style={{ fontSize: 9, color: muted, letterSpacing: "0.18em", textTransform: "uppercase" }}>/ 100</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { l: "Trésorerie", v: 82, c: gold },
            { l: "Marge", v: 71, c: gold },
            { l: "BFR", v: 58, c: "rgba(240,201,73,0.55)" },
            { l: "Endettement", v: 88, c: gold },
          ].map((r) => (
            <div key={r.l}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: muted, marginBottom: 3, letterSpacing: "0.08em" }}>
                <span>{r.l}</span><span style={{ fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif', fontWeight: 700, color: text }}>{r.v}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ width: `${r.v}%`, height: "100%", background: r.c, borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // future — three scenario lines
  const W = 320, H = 140;
  const make = (amp, drift) => {
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const x = (i / 12) * W;
      const y = H - 30 - i * drift - Math.sin(i * 0.6) * amp;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };
  return (
    <div style={{
      background: "#0c0d11", border: `1px solid ${subtle}`, borderRadius: 14, padding: 18,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", color: muted, textTransform: "uppercase" }}>Projection · 90 jours</span>
        <span style={{ fontSize: 10, color: muted, fontFamily: 'inherit', fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}>3 scénarios</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 120 }}>
        <defs>
          <linearGradient id="fillGold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={gold} stopOpacity="0.25"/>
            <stop offset="100%" stopColor={gold} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* horizontal grid */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="0" x2={W} y1={H * p} y2={H * p} stroke="rgba(255,255,255,0.05)"/>
        ))}
        {/* envelope */}
        <polygon points={`${make(4, 5)} ${W},${H} 0,${H}`} fill="url(#fillGold)"/>
        {/* lines */}
        <polyline points={make(3, 7)} fill="none" stroke={gold} strokeWidth="2"/>
        <polyline points={make(4, 5)} fill="none" stroke="rgba(240,201,73,0.55)" strokeWidth="1.5" strokeDasharray="3 3"/>
        <polyline points={make(5, 3)} fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" strokeDasharray="2 4"/>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 10, color: muted, fontFamily: 'inherit', fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {[
          { c: gold, l: "Optimiste" },
          { c: "rgba(240,201,73,0.55)", l: "Médian" },
          { c: "rgba(255,255,255,0.30)", l: "Prudent" },
        ].map((s) => (
          <span key={s.l} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 2, background: s.c, borderRadius: 2 }}/>{s.l}
          </span>
        ))}
      </div>
    </div>
  );
};

// —— Petites icônes 1.6px pour les features explicites de la méthodologie ——
const MethodFeatureIcon = ({ name, size = 17 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "import":
      return (<svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>);
    case "ratios":
      return (<svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></svg>);
    case "trend":
      return (<svg {...p}><path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/></svg>);
    case "score":
      return (<svg {...p}><path d="M5 18a9 9 0 1 1 14 0"/><path d="M12 14l3.5-3.5"/><circle cx="12" cy="14" r="1.4"/></svg>);
    case "budget":
      return (<svg {...p}><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="9"/></svg>);
    case "alert":
      return (<svg {...p}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
    case "whatif":
      return (<svg {...p}><line x1="4" y1="8" x2="20" y2="8"/><circle cx="9" cy="8" r="2.3"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="15" cy="16" r="2.3"/></svg>);
    case "plan":
      return (<svg {...p}><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="m4 5 1.2 1.4L7.5 4"/><path d="m4 11 1.2 1.4L7.5 10"/><path d="m4 17 1.2 1.4L7.5 16"/></svg>);
    case "mail":
      return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>);
    default:
      return (<svg {...p}><circle cx="12" cy="12" r="9"/></svg>);
  }
};

(function injectMethodFeatureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("method-feature-styles")) return;
  const s = document.createElement("style");
  s.id = "method-feature-styles";
  s.textContent = `@keyframes featRiseMethod { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .vz-method-features > div { animation: none !important; } }`;
  document.head.appendChild(s);
})();

Object.assign(window, { VariantA, BetaForm, VyzorNav, MethodologySection, MethodPreview, MethodFeatureIcon });
