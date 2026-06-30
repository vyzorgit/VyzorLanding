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
      animation: betaRise 360ms cubic-bezier(.2,.8,.2,1) forwards;
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

    /* CTA "Candidater à la bêta" — bordure dorée animée */
    .vz-beta-cta {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 16px 30px;
      border: none;
      border-radius: 14px;
      background: #0b0c10;
      color: #fff;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      letter-spacing: 0.01em;
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
      z-index: 0;
      transition: transform 220ms ease;
    }
    .vz-beta-cta::before,
    .vz-beta-cta::after {
      content: '';
      position: absolute;
      left: -2px; top: -2px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border-radius: 14px;
      background: linear-gradient(45deg, #8a6a1f, #f0c949, #fff1c2, #d99e2b, #f0c949, #8a6a1f, #f0c949, #fff1c2, #d99e2b, #f0c949);
      background-size: 400%;
      z-index: -1;
      animation: vzBetaRainbow 14s linear infinite;
    }
    .vz-beta-cta::after { filter: blur(13px); opacity: 0.5; }
    .vz-beta-cta:hover { transform: translateY(-2px); }
    .vz-beta-cta:hover::after { opacity: 0.75; }
    @keyframes vzBetaRainbow {
      0%   { background-position: 0 0; }
      50%  { background-position: 400% 0; }
      100% { background-position: 0 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .vz-beta-cta::before,
      .vz-beta-cta::after { animation: none; }
    }
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
  const inputBorder = "rgba(255,255,255,0.10)";

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

  if (!open) return null;

  const overlay = (
    <div className="beta-modal-overlay" onClick={onClose}>
      <div className="beta-modal" onClick={(e) => e.stopPropagation()}>
        <button className="beta-modal__close" onClick={onClose} aria-label="Fermer">×</button>

        {!submitted ? (
          <React.Fragment>
            <h3 style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontWeight: 400,
              fontSize: 30,
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
              margin: "0 0 8px",
              color: "#fff",
            }}>
              Réservez votre place.
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, margin: "0 0 18px" }}>
              Réponse sous 48h. Aucun engagement.
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
                { id: "company", label: "Entreprise", placeholder: "ACME SAS", type: "text" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={`beta-${f.id}`} style={{
                    display: "block", fontSize: 10, letterSpacing: "0.16em",
                    color: labelMuted, textTransform: "uppercase",
                    marginBottom: 6, fontWeight: 500,
                    fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
                  }}>{f.label}</label>
                  <input
                    id={`beta-${f.id}`}
                    name={f.id}
                    type={f.type} required placeholder={f.placeholder}
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
              {error && (
                <div style={{
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
                  border: "1px solid #f2d782",
                  backgroundImage: "linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%)",
                  color: "#1a1410", fontWeight: 600, fontSize: 14, borderRadius: 12,
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: "0 10px 24px rgba(216,172,47,0.32), inset 0 1px 0 rgba(255,255,255,0.5)",
                  letterSpacing: "0.01em",
                  fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
                  marginTop: 4,
                  transition: "opacity 200ms",
                }}
              >
                {submitting ? "Envoi en cours…" : "Envoyer ma candidature →"}
              </button>
              <div style={{ fontSize: 11, color: muted, textAlign: "center", marginTop: 2 }}>
                En soumettant, vous acceptez d'être recontacté à l'email indiqué.
              </div>
            </form>
          </React.Fragment>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            textAlign: "center", padding: "16px 0", gap: 12,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 999,
              background: "rgba(45,212,191,0.12)",
              border: "1px solid rgba(45,212,191,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, color: "#7eead8",
            }}>✓</div>
            <h3 style={{
              fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
              fontWeight: 400, fontSize: 26, margin: 0, color: "#fff",
              letterSpacing: "-0.01em",
            }}>
              Candidature reçue.
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
              Nous vous recontactons sous 48h à l'email indiqué. Merci de votre intérêt.
            </p>
            <button onClick={onClose} style={{
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

  return ReactDOM.createPortal(overlay, document.body);
};

const BetaFormGlass = () => {
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
        href.includes(window.location.pathname);
      if (isSamePage) {
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

  const benefits = [
    "Onboarding personnalisé en visio (45 min)",
    "Échange bi-mensuel avec l'équipe produit",
    "Influence directe sur la roadmap",
    "Tarif préférentiel à vie après la bêta",
  ];

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
            fontSize: "clamp(36px, 4.4vw, 56px)",
            margin: 0, letterSpacing: "-0.02em",
            fontWeight: 400, lineHeight: 1.05, maxWidth: 760,
            color: "#fff",
          }}>
            Devenez l'un des <span style={{ color: gold }}>10 premiers</span>
            <span style={{ color: "rgba(255,255,255,0.45)" }}> à façonner Vyzor.</span>
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
            Gratuit pendant la bêta. À tarif préférentiel à vie.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: muted }}>
            Un canal direct avec l'équipe produit. Vos retours pèsent
            sur la roadmap, pas sur un ticket parmi d'autres.
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
            }}>10</div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
              fontSize: 11, letterSpacing: "0.18em", color: muted, textTransform: "uppercase",
            }}>places ouvertes</div>
          </div>
        </BetaTiltCard>

        {/* Carte 2 — Bénéfices */}
        <BetaTiltCard effect="evade" tiltLimit={9} scale={1.02}>
          <div style={{
            fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
            fontSize: 26, fontWeight: 400, lineHeight: 1.15,
            letterSpacing: "-0.01em", color: "#fff", marginTop: 6,
          }}>
            Quatre garanties, pas une de plus.
          </div>
          <ul style={{
            listStyle: "none", padding: 0, margin: "4px 0 0",
            display: "flex", flexDirection: "column",
          }}>
            {benefits.map((l, i) => (
              <li key={l} style={{
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
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </BetaTiltCard>
      </div>

      {/* CTA centré — un seul bouton, ouvre la modale */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", marginTop: 44, gap: 14,
      }}>
        <button
          className="vz-beta-cta"
          onClick={() => window.open("https://calendly.com/admin-vyzor/30min", "_blank", "noopener")}
        >
          Candidater à la bêta
          <span style={{ fontSize: 16, marginLeft: 2 }}>→</span>
        </button>
      </div>

      <BetaModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

Object.assign(window, { BetaFormGlass, BetaModal, BetaTiltCard });
