// footer-glass.jsx — Footer "Liquid Glass" pour VYZOR
// DA cinématique : fond #0a1026, accent or #f0c949, surfaces glass, halo refractif,
// bordures lumineuses, typo Inter + JetBrains Mono.
// UX inspirée d'un footer shadcn : 4 colonnes (marque / liens utiles / suivez-nous /
// newsletter avec formulaire d'inscription + overlay animé succès/erreur).
// Aucun lien superflu : uniquement des destinations réelles.

const VyzorFooterGlass = ({ fullWidth = false, onSubscribe }) => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const faint = "rgba(255,255,255,0.6)"; // WCAG 1.4.3 : .32 donnait 2,8:1
  const subtle = "rgba(255,255,255,0.08)";
  const goldGrad = "linear-gradient(#f0c949,#f0c949)";
  const cardRef = React.useRef(null);

  // —— Liens utiles : uniquement des pages / ancres qui existent ——
  const usefulLinks = [
    { label: "Le produit", href: "/#produit" },
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Vyzor pour Pennylane", href: "/pennylane" },
    { label: "Experts-comptables", href: "/cabinets" },
    { label: "Intégrations", href: "/integrations" },
    { label: "Sécurité & RGPD", href: "/securite" },
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
    { label: "L'équipe", href: "/equipe" },
    { label: "À propos", href: "/a-propos" },
  ];

  // —— Réseaux : destinations réelles ——
  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/146903391/",
      icon: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
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
      fontSize: 14, fontWeight: 600, color: "#fff",
      marginBottom: 16,
    }}>
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

      {/* Bloc principal compact : logo + phrase, liens sur 3 colonnes, réseaux */}
      <div className="vz-footer-main" style={{
        position: "relative",
        padding: "32px 56px 26px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr) auto",
        gap: 40,
        alignItems: "start",
      }}>
        <div>
          <a href="/" aria-label="Vyzor, accueil" style={{ display: "inline-flex" }}>
            <VyzorLogo size={30} color={gold} bg="transparent" />
          </a>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: muted, maxWidth: 300, margin: "12px 0 0", textWrap: "pretty" }}>
            Votre équipe financière, à portée de main.
          </p>
        </div>

        <nav aria-label="Liens utiles">
          <ul className="vz-footer-links" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, auto))", gap: "9px 28px" }}>
            {usefulLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} style={{ ...linkRow, fontSize: 13.5 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = gold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = text; }}
                >{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 10 }}>
          {socials.map((s) => {
            const external = /^https?:/i.test(s.href);
            return (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} title={s.label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="vz-footer-soc"
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${subtle}`,
                    color: muted, transition: "color 220ms, border-color 220ms, background 220ms",
                  }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bandeau bas — status + contact (sans liens morts) */}
      <div className="vz-footer-bottom" style={{
        position: "relative",
        borderTop: `1px solid ${subtle}`,
        padding: "14px 56px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: -1, left: "20%", right: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }} />

        <div style={{
          display: "flex", alignItems: "center", gap: 18,
          fontSize: 12, color: faint,
        }}>
          <span>© 2026 Vyzor</span>
          <span>Données hébergées en France</span>
          {(() => { const l = vzLangSwitch(); return (
            <a href={l.href} hrefLang={l.code} lang={l.code} style={{ color: muted, textDecoration: "none" }}>{l.name}</a>
          ); })()}
        </div>

        <div style={{ display: "flex", gap: 22, fontSize: 12, color: muted }}>
          {[
            { label: "Mentions légales & CGU", href: "/mentions-legales" },
            { label: "Confidentialité", href: "/confidentialite" },
            { label: "Cookies", href: "/confidentialite#cookies" },
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
        .vz-footer-soc:hover { color: #f0c949 !important; border-color: rgba(240,201,73,0.45) !important; background: rgba(240,201,73,0.08) !important; }
        @media (max-width: 900px) {
          .vz-footer-main { grid-template-columns: 1fr !important; gap: 22px !important; padding: 26px 24px 20px !important; }
          .vz-footer-links { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .vz-footer-bottom { padding: 14px 24px !important; }
        }
      `}</style>
    </footer>
  );
};

Object.assign(window, { VyzorFooterGlass });
