// beta-glass.jsx — Section "Rejoignez la bêta", refonte :
//   • Deux cartes 3D-tilt (effet "TiltCard" gravitate/evade + spotlight curseur).
//   • Un seul CTA centré → ouvre une modale popup avec le formulaire de candidature.
//   • Typographie : Inter + JetBrains Mono (identique au reste de la page).

(function injectBetaRevealStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("beta-reveal-styles")) return;
  const style = document.createElement("style");
  style.id = "beta-reveal-styles";
  style.textContent = `
    .beta-tilt {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      isolation: isolate;
      border: 1px solid rgba(255,255,255,0.10);
      background: linear-gradient(160deg, rgba(20,18,12,0.85), rgba(14,13,10,0.7));
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      will-change: transform;
      transform-style: preserve-3d;
      transition: transform 200ms ease-out, border-color 400ms ease;
    }
    .beta-tilt:hover {
      border-color: rgba(240,201,73,0.35);
    }
    .beta-tilt__inner {
      position: relative;
      padding: 30px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-height: 360px;
    }
    .beta-tilt__spotlight {
      pointer-events: none;
      position: absolute;
      inset: 0;
      z-index: 10;
      overflow: hidden;
      transition: opacity 300ms ease;
    }
    .beta-tilt__spotlight-blob {
      position: absolute;
      width: 200%;
      height: 200%;
      border-radius: 9999px;
      transform: translate(-50%, -50%);
      background: radial-gradient(
        circle,
        rgba(240,201,73,0.18) 0%,
        rgba(240,201,73,0.06) 25%,
        transparent 45%
      );
    }

    .beta-eyebrow {
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      letter-spacing: 0.20em;
      color: #f0c949;
      background: rgba(240,201,73,0.10);
      border: 1px solid rgba(240,201,73,0.32);
      padding: 5px 10px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      width: fit-content;
      text-transform: uppercase;
      font-weight: 500;
    }
    .beta-eyebrow .br-dot {
      width: 4px; height: 4px; border-radius: 999px; background: #f0c949;
    }

    /* Modal */
    .beta-modal-overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(7,10,20,0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: grid; place-items: center;
      padding: 24px;
      animation: betaFade 240ms ease forwards;
    }
    @keyframes betaFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes betaRise {
      from { opacity: 0; transform: translateY(16px) scale(0.985); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .beta-modal {
      width: 100%;
      max-width: 520px;
      background: linear-gradient(160deg, rgba(22,19,12,0.96), rgba(14,13,10,0.92));
      border: 1px solid rgba(240,201,73,0.28);
      border-radius: 22px;
      padding: 32px;
      box-shadow:
        0 40px 100px -20px rgba(0,0,0,0.7),
        0 0 0 1px rgba(255,255,255,0.04),
        inset 0 1px 0 rgba(255,255,255,0.08);
      position: relative;
      max-height: 90vh;
      overflow: auto;
      box-sizing: border-box;
      animation: betaRise 360ms cubic-bezier(.2,.8,.2,1) forwards;
    }
    .beta-modal:focus { outline: none; }
    .beta-modal input:focus-visible,
    .beta-modal button:focus-visible,
    .beta-modal a:focus-visible { outline: 2px solid #f0c949; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .beta-modal, .beta-modal-overlay { animation: none; }
    }
    .beta-modal__close {
      position: absolute;
      top: 14px; right: 14px;
      width: 32px; height: 32px;
      border-radius: 999px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.10);
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      display: grid; place-items: center;
      font-size: 16px; line-height: 1;
      transition: background 200ms, color 200ms;
    }
    .beta-modal__close:hover {
      background: rgba(255,255,255,0.10);
      color: #fff;
    }

    .vz-beta-cta {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 14px 24px; border: none; border-radius: 10px;
      background: #f0c949; color: #0b0d14;
      font-weight: 600; font-size: 15px; cursor: pointer;
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
      transition: background-color 160ms ease;
    }
    .vz-beta-cta:hover { background: #f4d468; }
  `;
  document.head.appendChild(style);
})();

// TiltCard — 3D tilt + spotlight qui suit le curseur.
//   effect: "evade" => la carte s'incline à l'opposé du curseur
//           "gravitate" => la carte s'incline vers le curseur
const BetaTiltCard = ({
  children,
  tiltLimit = 10,
  scale = 1.02,
  perspective = 1200,
  effect = "evade",
  spotlight = true,
  style,
  ...rest
}) => {
  const ref = React.useRef(null);
  const [transform, setTransform] = React.useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
  );
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  const [hovered, setHovered] = React.useState(false);

  const dir = effect === "evade" ? -1 : 1;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
    const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
    setTransform(
      `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale},${scale},${scale})`
    );
    if (spotlight) setPos({ x: px * 100, y: py * 100 });
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
    );
  };

  return (
    <div
      ref={ref}
      className="beta-tilt"
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transform, ...style }}
      {...rest}
    >
      <div className="beta-tilt__inner">{children}</div>
      {spotlight && (
        <div
          className="beta-tilt__spotlight"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden
        >
          <div
            className="beta-tilt__spotlight-blob"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          />
        </div>
      )}
    </div>
  );
};

const BetaModal = ({ open, onClose }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const muted = "rgba(255,255,255,0.55)";
  const labelMuted = "rgba(255,255,255,0.6)";
  const inputBg = "rgba(255,255,255,0.04)";
  const inputBorder = "rgba(255,255,255,0.4)";
  const dialogRef = React.useRef(null);
  // Portail monté après hydratation : le pré-rendu (serveur) ne sait pas rendre de portail.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Sur /cabinets, la modale sert à présenter un client : textes adaptés.
  const isCabinet = mounted && /^\/cabinets/.test(window.location.pathname);
  const WEB3FORMS_KEY = "9f003436-eba6-4543-b3ed-06c89a38a69c";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "Nouvelle candidature bêta — Vyzor");
    fd.append("from_name", "Vyzor — Bêta");
    fd.append("page", window.location.pathname || "/");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Une erreur est survenue. Réessayez dans un instant.");
      }
    } catch (err) {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    if (!open) { setSubmitted(false); setError(null); setSubmitting(false); return; }
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Focus : premier champ à l'ouverture, retour au déclencheur à la fermeture.
  React.useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement;
    const el = dialogRef.current;
    if (el) {
      const first = el.querySelector("input:not([type=checkbox])");
      (first || el).focus();
    }
    return () => {
      if (trigger && typeof trigger.focus === "function" && document.contains(trigger)) trigger.focus();
    };
  }, [open]);

  // Succès : le formulaire disparaît, on replace le focus dans la boîte de dialogue.
  React.useEffect(() => {
    if (open && submitted && dialogRef.current) dialogRef.current.focus();
  }, [open, submitted]);

  // Piège de focus minimal (Tab / Maj+Tab).
  const trapTab = (e) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([type=checkbox]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  };

  if (!open) return null;

  const overlay = (
    <div className="beta-modal-overlay" onClick={onClose}>
      <div className="beta-modal" ref={dialogRef} role="dialog" aria-modal="true"
        aria-labelledby="beta-modal-title" tabIndex={-1}
        onKeyDown={trapTab} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="beta-modal__close" onClick={onClose} aria-label="Fermer">×</button>

        {!submitted ? (
          <React.Fragment>
            <h3 id="beta-modal-title" style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontWeight: 400,
              fontSize: 30,
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
              margin: "0 0 8px",
              color: "#fff",
            }}>
              {isCabinet ? "Parlons de votre client." : "Réservez votre place."}
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, margin: "0 0 18px" }}>
              {isCabinet
                ? "Laissez vos coordonnées : on vous rappelle sous 48 h pour organiser le diagnostic de votre client. Tous les champs sont obligatoires."
                : "Gratuit, sans engagement. Réponse sous 48 h. Tous les champs sont obligatoires."}
            </p>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Honeypot Web3Forms — anti-spam */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: "none" }}
              />
              {[
                { id: "name", label: "Nom et prénom", placeholder: "Marie Durand", type: "text" },
                { id: "email", label: "Email pro", placeholder: "marie@entreprise.fr", type: "email" },
                { id: "company", label: isCabinet ? "Cabinet" : "Entreprise", placeholder: isCabinet ? "Cabinet Durand" : "ACME SAS", type: "text" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={`beta-${f.id}`} style={{
                    display: "block", fontSize: 10, letterSpacing: "0.16em",
                    color: labelMuted, textTransform: "uppercase",
                    marginBottom: 6, fontWeight: 500,
                    fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
                  }}>{f.label} <span style={{ textTransform: "none", letterSpacing: 0 }}>(obligatoire)</span></label>
                  <input
                    id={`beta-${f.id}`}
                    name={f.id}
                    type={f.type} required aria-required="true" placeholder={f.placeholder}
                    autoComplete={f.id === "email" ? "email" : f.id === "name" ? "name" : "organization"}
                    style={{
                      width: "100%", padding: "12px 14px", boxSizing: "border-box",
                      background: inputBg, color: "#fff",
                      border: `1px solid ${inputBorder}`, borderRadius: 10,
                      fontSize: 14, outline: "none",
                      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
                      transition: "border-color 200ms, background 200ms",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(240,201,73,0.45)";
                      e.target.style.background = "rgba(255,255,255,0.06)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = inputBorder;
                      e.target.style.background = inputBg;
                    }}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="beta-software" style={{
                  display: "block", fontSize: 10, letterSpacing: "0.16em",
                  color: labelMuted, textTransform: "uppercase",
                  marginBottom: 6, fontWeight: 500,
                  fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
                }}>{isCabinet ? "Logiciel comptable du client" : "Logiciel comptable"} <span style={{ textTransform: "none", letterSpacing: 0 }}>(obligatoire)</span></label>
                <select id="beta-software" name="software" required aria-required="true" defaultValue=""
                  style={{
                    width: "100%", padding: "12px 14px", boxSizing: "border-box",
                    background: inputBg, color: "#fff", colorScheme: "dark",
                    border: `1px solid ${inputBorder}`, borderRadius: 10,
                    fontSize: 14, outline: "none",
                    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
                  }}>
                  <option value="" disabled style={{ background: "#14130f" }}>Choisir…</option>
                  <option value="Pennylane" style={{ background: "#14130f" }}>Pennylane</option>
                  <option value="Autre logiciel" style={{ background: "#14130f" }}>Un autre logiciel</option>
                  <option value="Ne sait pas" style={{ background: "#14130f" }}>Je ne sais pas (c'est mon cabinet)</option>
                </select>
              </div>
              {error && (
                <div role="alert" style={{
                  fontSize: 12.5, color: "#ffb4a8",
                  background: "rgba(255,99,71,0.08)",
                  border: "1px solid rgba(255,99,71,0.30)",
                  padding: "10px 12px", borderRadius: 10,
                  fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
                  lineHeight: 1.5,
                }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%", padding: "14px",
                  backgroundImage: "linear-gradient(#f0c949,#f0c949)",
                  color: "#1a1410", fontWeight: 600, fontSize: 14, borderRadius: 12,
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  letterSpacing: "0.01em",
                  fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
                  marginTop: 4,
                  transition: "opacity 200ms",
                }}
              >
                {submitting ? "Envoi en cours…" : "Envoyer ma candidature →"}
              </button>
              <div style={{ fontSize: 11, color: muted, textAlign: "center", marginTop: 2 }}>
                Vos données servent uniquement à traiter votre candidature (conservées 3 ans max.). Vous pouvez y accéder ou les supprimer via contact@vyzor.fr — voir notre{" "}
                <a href="/confidentialite" target="_blank" rel="noopener" style={{ color: "#f0c949", textDecoration: "underline", textUnderlineOffset: 2 }}>politique de confidentialité</a>.
              </div>
            </form>
          </React.Fragment>
        ) : (
          <div role="status" style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            textAlign: "center", padding: "16px 0", gap: 12,
          }}>
            <div aria-hidden="true" style={{
              width: 60, height: 60, borderRadius: 999,
              background: "rgba(45,212,191,0.12)",
              border: "1px solid rgba(45,212,191,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, color: "#7eead8",
            }}>✓</div>
            <h3 id="beta-modal-title" style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontWeight: 400, fontSize: 26, margin: 0, color: "#fff",
              letterSpacing: "-0.01em",
            }}>
              Candidature reçue.
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
              Nous vous recontactons sous 48 h à l'email indiqué. Vous préférez fixer le rendez-vous tout de suite ?
            </p>
            <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{
              marginTop: 4, padding: "11px 18px", borderRadius: 10,
              background: "#f0c949", color: "#0b0d14", fontWeight: 600, fontSize: 14,
              textDecoration: "none", fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            }}>Choisir mon créneau <span aria-hidden="true">→</span></a>
            <button type="button" onClick={onClose} style={{
              marginTop: 8, padding: "10px 18px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#fff", borderRadius: 10, cursor: "pointer",
              fontSize: 13, fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            }}>
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return ReactDOM.createPortal(overlay, document.body);
};

const BetaFormGlass = ({ modalOnly = false }) => {
  const [open, setOpen] = React.useState(false);

  // Auto-ouverture de la modale "contact" :
  //   • via paramètre URL `?contact=1`
  //   • via hash `#contact`
  //   • via clic sur n'importe quel lien marqué [data-contact] OU dont le href contient ?contact=1 / #contact
  React.useEffect(() => {
    const shouldOpen = () => {
      try {
        const u = new URL(window.location.href);
        if (u.searchParams.get("contact") === "1") return true;
        if ((u.hash || "").toLowerCase() === "#contact") return true;
      } catch (e) {}
      return false;
    };
    if (shouldOpen()) {
      // Laisse le scroll s'établir vers #beta avant d'ouvrir la modale
      setTimeout(() => setOpen(true), 350);
    }

    const onClickAnywhere = (e) => {
      const a = e.target && e.target.closest && e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const wantsContact =
        a.hasAttribute("data-contact") ||
        href.includes("contact=1") ||
        href.endsWith("#contact");
      if (!wantsContact) return;
      // Si le lien est interne à cette page → on ouvre la modale sans naviguer
      const isSamePage =
        href.startsWith("#") ||
        href.startsWith("?") ||
        (() => { try { const norm = (p) => p.replace(/\/index(\.html)?$/, "/").replace(/\.html$/, ""); return norm(new URL(href, window.location.href).pathname) === norm(window.location.pathname); } catch (_) { return false; } })();
      // Un lien [data-contact] ouvre la modale sur place dès qu'elle est montée sur la page
      // (accueil, fonctionnalités, FAQ, sécurité) ; ailleurs, il mène à l'accueil qui l'ouvre.
      if (isSamePage || a.hasAttribute("data-contact")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClickAnywhere);

    const onHash = () => {
      if ((window.location.hash || "").toLowerCase() === "#contact") setOpen(true);
    };
    window.addEventListener("hashchange", onHash);

    // Ouverture via événement custom (ex. clic sur une carte fonctionnalité)
    const onOpenContact = () => setOpen(true);
    window.addEventListener("vyzor:open-contact", onOpenContact);

    return () => {
      document.removeEventListener("click", onClickAnywhere);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("vyzor:open-contact", onOpenContact);
    };
  }, []);

  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const inputBorder = "rgba(255,255,255,0.10)";

  const betaPlaces = (window.VZ_BETA && window.VZ_BETA.places) || 10;
  // Pile de valeur (Hormozi) : valeurs prudentes, sourcées dans la note sous le tableau.
  const benefits = [
    { t: "Un diagnostic financier complet de votre entreprise, au premier rendez-vous", v: "≈ 400 €" },
    { t: "Votre reporting, votre trésorerie à 12 mois et vos alertes, tenus à jour par Vyzor", v: "≈ 750 € / mois" },
    { t: "Vos données branchées avec vous, en visio", v: "Inclus" },
    { t: "Une ligne directe avec les fondateurs, vos retours dans la roadmap", v: "Inclus" },
    { t: "Votre tarif préférentiel bloqué à vie après la bêta", v: "Inclus" },
  ];

  // Mode « modale seule » : pages qui ont leur propre bloc d'offre (ex. /cabinets).
  if (modalOnly) return <BetaModal open={open} onClose={() => setOpen(false)} />;

  return (
    <section id="beta" style={{ position: "relative", marginTop: 72 }}>
      {/* Bandeau d'intro */}
      <div className="vz-beta-head" style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: 36, gap: 24, flexWrap: "wrap",
      }}>
        <div>
          <h2 style={{
            fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            fontSize: "clamp(36px, 4.4vw, 52px)",
            margin: 0, letterSpacing: "-0.03em",
            fontWeight: 600, lineHeight: 1.05, maxWidth: 760,
            color: "#fff",
          }}>
            Devenez l'un des <span style={{ color: gold }}>{betaPlaces} premiers</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400, fontStyle: "italic" }}> à façonner Vyzor.</span>
          </h2>
        </div>
      </div>

      {/* Deux cartes reveal côte à côte */}
      <div className="vz-beta-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        alignItems: "stretch",
      }}>
        {/* Carte 1 — Promesse */}
        <BetaTiltCard effect="evade" tiltLimit={9} scale={1.02}>
          <div style={{
            fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            fontSize: 26, fontWeight: 400, lineHeight: 1.15,
            letterSpacing: "-0.01em", color: "#fff", marginTop: 6,
          }}>
            Un DAF à temps partagé coûte à une PME 1 200 à 5 000 € HT par mois.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: muted }}>
            Vyzor fait une bonne partie de ce travail de lecture : reporting, trésorerie, alertes.
            Pendant la bêta, c'est gratuit.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: muted }}>
            <span style={{ color: text, fontWeight: 600 }}>Pourquoi gratuit ?</span> Parce que vos retours
            nous aident à finir le produit. En échange, vous l'utilisez sans payer, avec une ligne directe
            avec les fondateurs, et votre tarif est bloqué à vie.
          </div>
          <div style={{ flex: 1 }} />
          <div style={{
            display: "flex", alignItems: "baseline", gap: 12,
            paddingTop: 16, borderTop: `1px solid ${inputBorder}`,
          }}>
            <div style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontSize: 56, fontWeight: 700, color: gold,
              lineHeight: 0.9, letterSpacing: "-0.04em",
              fontFeatureSettings: '"tnum" 1, "lnum" 1',
            }}>{betaPlaces}</div>
            <div style={{
              fontSize: 15, color: muted, lineHeight: 1.4,
            }}>places ouvertes.<br/>Une fois attribuées, la bêta ferme.</div>
          </div>
        </BetaTiltCard>

        {/* Carte 2 — Bénéfices */}
        <BetaTiltCard effect="evade" tiltLimit={9} scale={1.02}>
          <div style={{
            fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            fontSize: 26, fontWeight: 400, lineHeight: 1.15,
            letterSpacing: "-0.01em", color: "#fff", marginTop: 6,
          }}>
            Ce que vous recevez.
          </div>
          <ul style={{
            listStyle: "none", padding: 0, margin: "4px 0 0",
            display: "flex", flexDirection: "column",
          }}>
            {benefits.map((b, i) => (
              <li key={b.t} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                fontSize: 14, lineHeight: 1.5, color: text,
                padding: "13px 0",
                borderTop: i === 0 ? "none" : `1px solid ${inputBorder}`,
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace', fontSize: 11,
                  color: gold, opacity: 0.75, marginTop: 3, minWidth: 20,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>{b.t}</span>
                <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: b.v === "Inclus" ? muted : gold, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", marginTop: 1 }}>{b.v}</span>
              </li>
            ))}
          </ul>
          <div style={{ flex: 1 }} />
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12,
            paddingTop: 16, borderTop: `1px solid rgba(240,201,73,0.3)`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Votre prix pendant la bêta</span>
            <span style={{ fontSize: 34, fontWeight: 700, color: gold, letterSpacing: "-0.03em", lineHeight: 1 }}>0 €</span>
          </div>
        </BetaTiltCard>
      </div>

      {/* CTA centré — un seul bouton, ouvre la modale */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", marginTop: 44, gap: 14,
      }}>
        <button
          type="button"
          className="vz-beta-cta"
          onClick={() => setOpen(true)}
        >
          Réserver ma place dans la bêta
          <span aria-hidden="true" style={{ fontSize: 16, marginLeft: 2 }}>→</span>
        </button>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 14, lineHeight: 1.6, color: muted, textWrap: "pretty" }}>
          <span style={{ color: text, fontWeight: 600 }}>Notre engagement :</span> si au premier rendez-vous nous ne vous montrons pas au moins un levier concret sur votre trésorerie ou vos marges, nous vous le disons et on s'arrête là.
        </p>
        <p style={{ margin: "6px 0 0", maxWidth: 680, fontSize: 11.5, lineHeight: 1.6, color: "rgba(255,255,255,0.45)", textWrap: "pretty" }}>
          Valeurs estimées à partir du tarif d'un DAF externalisé (750 à 1 350 € HT la journée, 2 à 3 jours par mois dans une petite PME, soit 1 200 à 5 000 € HT par mois selon{" "}
          <a href="https://www.comet-one.com/actualites/expertise-financiere/cout-daf-externalise-2026/" target="_blank" rel="noopener" style={{ color: "inherit" }}>Comet One</a> et{" "}
          <a href="https://www.knp-finance.fr/prix-daf-externalise/" target="_blank" rel="noopener" style={{ color: "inherit" }}>KNP Finance</a>) : le diagnostic équivaut à une demi-journée, le suivi mensuel à environ une journée, la part que les DAF consacrent à produire le reporting.
        </p>
      </div>

      <BetaModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

Object.assign(window, { BetaFormGlass, BetaModal, BetaTiltCard });
