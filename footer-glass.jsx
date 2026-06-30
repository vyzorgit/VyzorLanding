// footer-glass.jsx — Footer "Liquid Glass" pour VYZOR
// DA cinématique : fond #070a14, accent or #f0c949, surfaces glass, halo refractif,
// bordures lumineuses, typo Inter + JetBrains Mono.
// UX inspirée d'un footer shadcn : 4 colonnes (marque / liens utiles / suivez-nous /
// newsletter avec formulaire d'inscription + overlay animé succès/erreur).
// Aucun lien superflu : uniquement des destinations réelles.

const VyzorFooterGlass = ({ fullWidth = false, onSubscribe }) => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const faint = "rgba(255,255,255,0.32)";
  const subtle = "rgba(255,255,255,0.08)";
  const goldGrad = "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)";
  const cardRef = React.useRef(null);

  // —— Liens utiles : uniquement des pages / ancres qui existent ——
  const usefulLinks = [
    { label: "Le produit", href: "index.html#produit" },
    { label: "Fonctionnalités", href: "fonctionnalites.html" },
    { label: "Sécurité & RGPD", href: "securite.html" },
    { label: "Calculateurs gratuits", href: "calculateurs.html" },
    { label: "FAQ", href: "faq.html" },
  ];

  // —— Réseaux : destinations réelles ——
  const socials = [
    {
      label: "admin@vyzor.fr",
      href: "mailto:admin@vyzor.fr",
      icon: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      ),
    },
  ];

  const linkRow = {
    color: text, textDecoration: "none",
    fontSize: 14, fontWeight: 400,
    display: "inline-flex", alignItems: "center", gap: 9,
    transition: "color 220ms ease",
  };

  const ColTitle = ({ children }) => (
    <div style={{
      fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 10, letterSpacing: "0.22em",
      color: gold, textTransform: "uppercase",
      marginBottom: 18,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 1, background: gold, opacity: 0.7 }} />
      {children}
    </div>
  );

  return (
    <footer
      ref={cardRef}
      style={{
        position: "relative",
        marginTop: fullWidth ? 0 : 96,
        borderRadius: fullWidth ? 0 : 28,
        overflow: "hidden",
        width: "100%",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)",
        border: `1px solid ${subtle}`,
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        color: text,
        fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(255,255,255,0.02) inset, 0 40px 100px -40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Filet lumineux haut */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(240,201,73,0.45), transparent)",
        pointerEvents: "none",
      }} />

      {/* Bloc principal — 4 colonnes */}
      <div className="vz-footer-main" style={{
        position: "relative",
        padding: "56px 56px 40px",
        display: "grid",
        gridTemplateColumns: "1.5fr 1.6fr",
        gap: 56,
      }}>
        {/* Colonne marque */}
        <div>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.18em", color: "#fff" }}>VYZOR</div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
              fontSize: 10, letterSpacing: "0.22em", color: gold, textTransform: "uppercase", marginTop: 2,
            }}>
              Cockpit financier · v0.9 · bêta
            </div>
          </div>

          <p style={{
            fontSize: 14, lineHeight: 1.65, color: muted, maxWidth: 380, margin: 0, textWrap: "pretty",
          }}>
            Vyzor donne aux dirigeants de PME, DAF et experts-comptables une lecture limpide de leur santé financière — passé, présent, futur — au sein d'un cockpit unique.
          </p>
        </div>

        {/* Colonnes : liens utiles + suivez-nous + newsletter */}
        <div className="vz-footer-nav" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}>
          {/* Liens utiles */}
          <div>
            <ColTitle>Liens utiles</ColTitle>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {usefulLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={linkRow}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = gold;
                      const a = e.currentTarget.querySelector(".arrow");
                      if (a) { a.style.opacity = "1"; a.style.transform = "translateX(2px)"; }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = text;
                      const a = e.currentTarget.querySelector(".arrow");
                      if (a) { a.style.opacity = "0"; a.style.transform = "translateX(-4px)"; }
                    }}
                  >
                    {l.label}
                    <span className="arrow" style={{ fontSize: 12, opacity: 0, transform: "translateX(-4px)", transition: "opacity 220ms ease, transform 220ms ease" }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suivez-nous */}
          <div>
            <ColTitle>Suivez-nous</ColTitle>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {socials.map((s) => {
                const external = /^https?:/i.test(s.href);
                return (
                  <li key={s.label}>
                    <a href={s.href} aria-label={s.label}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      style={linkRow}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = gold;
                        const ic = e.currentTarget.querySelector(".soc-ic");
                        if (ic) { ic.style.borderColor = "rgba(240,201,73,0.45)"; ic.style.background = "rgba(240,201,73,0.08)"; ic.style.color = gold; }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = text;
                        const ic = e.currentTarget.querySelector(".soc-ic");
                        if (ic) { ic.style.borderColor = subtle; ic.style.background = "rgba(255,255,255,0.04)"; ic.style.color = muted; }
                      }}
                    >
                      <span className="soc-ic" style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.04)", border: `1px solid ${subtle}`,
                        color: muted, transition: "color 220ms, border-color 220ms, background 220ms",
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                      </span>
                      <span style={{ fontSize: 13.5 }}>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bandeau bas — status + contact (sans liens morts) */}
      <div className="vz-footer-bottom" style={{
        position: "relative",
        borderTop: `1px solid ${subtle}`,
        padding: "20px 56px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
        background: "rgba(255,255,255,0.015)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: -1, left: "20%", right: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }} />

        <div style={{
          display: "flex", alignItems: "center", gap: 18,
          fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 11, color: faint, letterSpacing: "0.04em",
        }}>
          <span>© 2026 Vyzor</span>
          <span style={{ color: subtle }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#2dd4bf",
              boxShadow: "0 0 0 3px rgba(45,212,191,0.20)", animation: "vyzorPulse 2s ease-in-out infinite",
            }} />
            <span style={{ color: muted }}>Tous systèmes opérationnels</span>
          </span>
          <span style={{ color: subtle }}>·</span>
          <span>Hébergé en France 🇫🇷</span>
        </div>

        <div style={{ display: "flex", gap: 22, fontSize: 12, color: muted }}>
          {[
            { label: "Mentions légales & CGU", href: "mentions-legales.html" },
            { label: "Confidentialité", href: "confidentialite.html" },
            { label: "admin@vyzor.fr", href: "mailto:admin@vyzor.fr" },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{ color: muted, textDecoration: "none", transition: "color 220ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
            >{l.label}</a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes vyzorPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(45,212,191,0.20); }
          50%      { box-shadow: 0 0 0 6px rgba(45,212,191,0.05); }
        }
        @keyframes vzFooterFade {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
        .vz-footer-main input::placeholder { color: rgba(255,255,255,0.40); }
      `}</style>
    </footer>
  );
};

Object.assign(window, { VyzorFooterGlass });
