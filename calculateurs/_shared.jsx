/* ── Vyzor Design Tokens ── */
const T = {
  bgBase: "#09090b",
  bgSurface: "#0f0f12",
  bgElevated: "#18181b",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  borderStrong: "rgba(255, 255, 255, 0.12)",
  borderSolid: "#27272a",
  brandGold: "#C5A059",
  brandGoldDark: "#a38243",
  textPrimary: "#ffffff",
  textSecondary: "#e4e4e7",
  textMuted: "#8b8b93",
  success: "#10B981",
  error: "#f43f5e",
  warning: "#C5A059",
  info: "#3b82f6",
  sans: "'Inter', system-ui, sans-serif",
  /* Numbers use Inter Bold (700) — kept under "mono" key for backwards compat */
  mono: "'Inter', system-ui, sans-serif",
};

const goldGradient = `linear-gradient(135deg, ${T.brandGold} 0%, ${T.brandGoldDark} 100%)`;
const goldGlow = `0 4px 32px rgba(197, 160, 89, 0.25)`;
const goldGlowStrong = `0 8px 48px rgba(197, 160, 89, 0.35)`;

/* ── Apple Liquid Glass surface (used by SlabCard) ── */
const liquidGlass = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 30%, rgba(0,0,0,0.18) 100%), rgba(15,15,18,0.55)",
  backdropFilter: "blur(24px) saturate(170%)",
  WebkitBackdropFilter: "blur(24px) saturate(170%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 18px 56px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.30)",
};

/* Inject ambient + grain once for any sub-page that mounts <PageBg/> */
(function injectLiquidGlassAmbient() {
  if (typeof document === "undefined") return;
  if (document.getElementById("lq-ambient-styles")) return;
  const s = document.createElement("style");
  s.id = "lq-ambient-styles";
  s.textContent = `
    .lq-ambient { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    .lq-ambient::before, .lq-ambient::after {
      content: ""; position: absolute; border-radius: 50%;
      filter: blur(120px); opacity: 0.55;
    }
    .lq-ambient::before {
      width: 720px; height: 720px; top: -200px; left: -200px;
      background: radial-gradient(circle, rgba(197,160,89,0.22), transparent 70%);
    }
    .lq-ambient::after {
      width: 640px; height: 640px; top: 40%; right: -160px;
      background: radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%);
    }
    .lq-ambient .lq-blob3 {
      position: absolute; bottom: -180px; left: 30%;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(45,212,191,0.10), transparent 70%);
      filter: blur(120px);
    }
    .lq-grain {
      position: fixed; inset: 0; z-index: 1; pointer-events: none;
      opacity: 0.035; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>");
    }
    .lq-card { position: relative; }
    .lq-card::before {
      content: ""; position: absolute; inset: 0 0 auto 0;
      height: 60%; border-radius: inherit;
      background: linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%);
      opacity: 0.5; pointer-events: none; mix-blend-mode: screen;
    }
    /* Range slider thumb — glass pill */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 18px; height: 18px; border-radius: 50%;
      background: linear-gradient(135deg, #f3dca5 0%, ${T.brandGold} 60%, ${T.brandGoldDark} 100%);
      border: 1px solid rgba(255,255,255,0.4);
      box-shadow: 0 4px 14px rgba(197,160,89,0.45), inset 0 1px 0 rgba(255,255,255,0.6);
      cursor: pointer;
    }
    input[type="range"]::-moz-range-thumb {
      width: 18px; height: 18px; border-radius: 50%;
      background: linear-gradient(135deg, #f3dca5 0%, ${T.brandGold} 60%, ${T.brandGoldDark} 100%);
      border: 1px solid rgba(255,255,255,0.4);
      box-shadow: 0 4px 14px rgba(197,160,89,0.45);
      cursor: pointer;
    }

    /* ── Responsive : nav flottante des calculateurs ── */
    @media (max-width: 620px) {
      .vz-cnav { left: 12px !important; right: 12px !important; transform: none !important; }
      .vz-cnav-pill {
        width: 100% !important;
        justify-content: space-between !important;
        gap: 8px !important;
        padding: 6px 6px 6px 12px !important;
      }
      .vz-cnav-word, .vz-cnav-sep { display: none !important; }
      .vz-cnav-link-produit { display: none !important; }
      .vz-cnav-link { padding: 8px 10px !important; font-size: 12px !important; }
      .vz-cnav-cta { padding: 8px 14px !important; font-size: 12px !important; }
    }
    @media (max-width: 380px) {
      .vz-cnav-links { display: none !important; }
    }

    /* ── Responsive : grilles fixes des sous-pages calculateurs ── */
    @media (max-width: 600px) {
      /* Sélecteur de méthodes (valorisation) : 2 colonnes + retour ligne */
      .calc-seg-tabs { grid-template-columns: 1fr 1fr !important; }
      .calc-seg-tabs button { white-space: normal !important; padding: 11px 8px !important; font-size: 12px !important; }
      /* Grilles 2 colonnes génériques (fiscal : paramètres / résultats) */
      .calc-2col { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
})();

const { useState, useEffect, useRef, useMemo } = React;

/* ── Icon system — fine-line SVGs, gold stroke ── */
const ICON_PATHS = {
  target: <React.Fragment><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></React.Fragment>,
  trend: <React.Fragment><path d="M4 18 L10 12 L14 15 L20 7"/><path d="M14 7 L20 7 L20 13"/></React.Fragment>,
  scale: <React.Fragment><path d="M12 3 L12 21"/><path d="M5 8 L19 8"/><path d="M5 8 L2 14 A3.5 3.5 0 0 0 8 14 Z"/><path d="M19 8 L16 14 A3.5 3.5 0 0 0 22 14 Z"/><path d="M8 21 L16 21"/></React.Fragment>,
  bars: <React.Fragment><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 16 L8 12"/><path d="M12 16 L12 8"/><path d="M16 16 L16 14"/></React.Fragment>,
  settings: <React.Fragment><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></React.Fragment>,
  sparkle: <React.Fragment><path d="M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z"/></React.Fragment>,
  building: <React.Fragment><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7 L9 7.01 M13 7 L13 7.01 M9 11 L9 11.01 M13 11 L13 11.01 M9 15 L9 15.01 M13 15 L13 15.01"/><path d="M10 21 L10 17 L14 17 L14 21"/></React.Fragment>,
  box: <React.Fragment><path d="M3 7 L12 3 L21 7 L12 11 Z"/><path d="M3 7 L3 17 L12 21 L21 17 L21 7"/><path d="M12 11 L12 21"/></React.Fragment>,
  tag: <React.Fragment><path d="M3 12 L12 3 L21 3 L21 12 L12 21 Z"/><circle cx="16.5" cy="7.5" r="1.4" fill="currentColor" stroke="none"/></React.Fragment>,
  arrow_up: <React.Fragment><path d="M12 19 L12 5"/><path d="M5 12 L12 5 L19 12"/></React.Fragment>,
  euro: <React.Fragment><path d="M18 5 A8 8 0 1 0 18 19"/><path d="M3 10 L13 10"/><path d="M3 14 L13 14"/></React.Fragment>,
  clock: <React.Fragment><circle cx="12" cy="12" r="9"/><path d="M12 7 L12 12 L15.5 14"/></React.Fragment>,
  calendar: <React.Fragment><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10 L21 10"/><path d="M8 3 L8 7 M16 3 L16 7"/></React.Fragment>,
  lock: <React.Fragment><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11 L8 8 A4 4 0 0 1 16 8 L16 11"/></React.Fragment>,
  user: <React.Fragment><circle cx="12" cy="8" r="4"/><path d="M4 21 A8 8 0 0 1 20 21"/></React.Fragment>,
  briefcase: <React.Fragment><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7 L9 5 A2 2 0 0 1 11 3 L13 3 A2 2 0 0 1 15 5 L15 7"/><path d="M3 13 L21 13"/></React.Fragment>,
  rocket: <React.Fragment><path d="M5 19 C 5 13, 9 7, 13 5 C 17 7, 19 11, 17 15 C 13 17, 7 19, 5 19 Z"/><path d="M9 14 L5 18 L8 19"/><circle cx="14" cy="9" r="1.5"/></React.Fragment>,
  store: <React.Fragment><path d="M3 9 L4 5 L20 5 L21 9"/><path d="M3 9 L3 11 A2 2 0 0 0 7 11 A2 2 0 0 0 11 11 A2 2 0 0 0 15 11 A2 2 0 0 0 19 11 A2 2 0 0 0 21 9"/><path d="M5 11 L5 20 L19 20 L19 11"/></React.Fragment>,
  tools: <React.Fragment><path d="M14 6 L18 2 L22 6 L18 10 L16 8 L10 14 L9 17 L7 19 L5 17 L7 15 L10 14"/><circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"/></React.Fragment>,
  document: <React.Fragment><path d="M6 3 L14 3 L19 8 L19 21 L6 21 Z"/><path d="M14 3 L14 8 L19 8"/><path d="M9 13 L16 13 M9 17 L14 17"/></React.Fragment>,
  arrow_right: <React.Fragment><path d="M5 12 L19 12"/><path d="M13 6 L19 12 L13 18"/></React.Fragment>,
};

function Icon({ name, size = 18, color, stroke = 1.6, style = {} }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"
      style={{ display: "block", color: color || T.brandGold, ...style }}>
      <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        {path}
      </g>
    </svg>
  );
}

/* ── IconChip — small glass pill containing an Icon ── */
function IconChip({ name, size = 36, iconSize = 18, tone = "gold" }) {
  const isGold = tone === "gold";
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: isGold
        ? "linear-gradient(135deg, rgba(197,160,89,0.16) 0%, rgba(197,160,89,0.04) 100%)"
        : "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)",
      border: `1px solid ${isGold ? "rgba(197,160,89,0.28)" : "rgba(255,255,255,0.12)"}`,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.18)",
      flexShrink: 0,
    }}>
      <Icon name={name} size={iconSize} color={isGold ? T.brandGold : "#fff"} />
    </div>
  );
}

/* ── Top Nav (réutilisé sur chaque page) ── */
function VyzorTopNav({ current = "hub" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "produit", label: "Le produit", href: "../index.html#produit" },
    { id: "hub", label: "Calculateurs", href: "../calculateurs.html" },
  ];
  const goldGrad = `linear-gradient(135deg, ${T.brandGold} 0%, ${T.brandGoldDark} 100%)`;

  return (
    <nav className="vz-cnav" style={{
      position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
      zIndex: 60, transition: "all 320ms cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div className="vz-cnav-pill" style={{
        display: "flex", alignItems: "center",
        gap: scrolled ? 10 : 18,
        padding: scrolled ? "6px 6px 6px 14px" : "8px 8px 8px 18px",
        borderRadius: 999,
        background: scrolled ? "rgba(15,15,18,0.72)" : "rgba(15,15,18,0.55)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: `1px solid ${scrolled ? "rgba(197,160,89,0.22)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: "0 16px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.3)",
        transition: "all 320ms cubic-bezier(0.22,1,0.36,1)",
      }}>
        <a href="../index.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", paddingRight: 4, paddingLeft: 2 }}>
          <svg width="26" height="26" viewBox="0 0 1024 1024" aria-label="Vyzor" style={{ display: "block", flexShrink: 0 }}>
            <g transform="translate(0,1024) scale(0.1,-0.1)" fill={T.brandGold} stroke="none">
              <path d="M4630 7940 c-497 -24 -562 -60 -753 -410 -286 -527 -307 -590 -263 -770 49 -194 90 -265 613 -1035 75 -110 176 -260 225 -332 49 -73 93 -133 98 -133 11 0 30 28 304 458 l206 323 -92 132 c-51 73 -114 164 -140 202 -27 39 -82 117 -123 175 -350 499 -347 493 -279 512 261 74 829 88 1258 33 248 -33 248 -32 173 -153 -56 -91 -384 -596 -416 -642 -10 -14 -52 -79 -93 -145 -41 -66 -131 -205 -200 -310 -402 -613 -872 -1358 -957 -1515 -199 -370 -211 -748 -34 -1092 67 -133 374 -596 466 -705 71 -83 150 -149 167 -138 6 4 -4 23 -24 47 -144 168 -202 494 -134 753 73 278 70 272 716 1295 89 140 179 284 202 320 22 36 76 121 120 190 44 69 121 190 171 270 50 80 141 226 204 325 714 1130 738 1211 502 1657 -30 57 -78 147 -106 200 -228 433 -271 459 -806 488 -203 11 -771 11 -1005 0z"/>
              <path d="M3130 6838 c-135 -44 -328 -107 -429 -140 -102 -33 -211 -73 -243 -89 -205 -104 -264 -350 -140 -590 22 -41 203 -322 404 -625 201 -302 418 -630 483 -729 65 -99 168 -256 230 -350 61 -93 153 -233 202 -310 144 -222 204 -306 212 -301 4 3 11 56 14 118 12 241 117 534 282 789 24 38 54 87 64 108 l20 39 -196 293 c-108 162 -208 312 -222 334 -14 22 -92 139 -172 260 -363 549 -376 570 -420 694 -68 193 -35 346 106 488 116 117 127 116 -195 11z"/>
              <path d="M6855 6910 c-3 -5 14 -22 37 -38 111 -76 188 -197 208 -326 29 -185 -56 -383 -385 -891 -68 -105 -652 -1041 -686 -1099 -19 -33 -59 -96 -87 -139 -29 -43 -52 -80 -52 -82 0 -6 -353 -571 -467 -748 -40 -62 -82 -130 -94 -152 -12 -22 -58 -76 -103 -121 -118 -117 -232 -150 -362 -105 -64 23 -57 32 -80 -108 -21 -129 -15 -233 21 -354 163 -560 700 -615 1090 -112 56 72 250 379 414 655 35 58 73 121 86 140 26 40 275 444 409 665 51 83 113 183 139 223 26 40 47 74 47 76 0 4 145 242 260 426 86 139 237 384 348 565 57 94 127 208 156 255 214 345 244 404 267 520 43 217 -77 414 -291 478 -83 25 -472 149 -663 212 -114 37 -209 64 -212 60z"/>
            </g>
          </svg>
          <div className="vz-cnav-word" style={{
            fontSize: 11, letterSpacing: "0.32em", color: "#fff", fontWeight: 700,
            overflow: "hidden",
            maxWidth: scrolled ? 0 : 80,
            opacity: scrolled ? 0 : 1,
            transition: "max-width 280ms ease, opacity 200ms ease",
            whiteSpace: "nowrap",
          }}>VYZOR</div>
        </a>

        <span className="vz-cnav-sep" style={{
          width: 1, height: 18, background: "rgba(255,255,255,0.10)",
          opacity: scrolled ? 0 : 1, transition: "opacity 200ms",
        }}/>

        <div className="vz-cnav-links" style={{ position: "relative", display: "flex", alignItems: "center", gap: 2 }}>
          {items.map((it) => {
            const active = current === it.id;
            return (
              <a key={it.id} href={it.href} className={"vz-cnav-link vz-cnav-link-" + it.id} style={{
                position: "relative",
                padding: "8px 14px",
                fontSize: 12.5,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: active ? "#f3dca5" : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                borderRadius: 999,
                background: active ? "rgba(197,160,89,0.10)" : "transparent",
                border: `1px solid ${active ? "rgba(197,160,89,0.28)" : "transparent"}`,
                transition: "color 220ms ease, background 220ms",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >{it.label}</a>
            );
          })}
        </div>

        <span className="vz-cnav-sep" style={{
          width: 1, height: 18, background: "rgba(255,255,255,0.10)",
        }}/>

        <a href="../index.html?contact=1#beta" data-contact className="vz-cnav-cta" style={{
          padding: "8px 14px",
          fontSize: 12.5,
          fontWeight: 600,
          color: "#000",
          background: goldGrad,
          textDecoration: "none",
          borderRadius: 999,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 18px rgba(197,160,89,0.32), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}>Demander une démo</a>
      </div>
    </nav>
  );
}

/* ── AnimatedNumber ── */
function AnimatedNumber({ value, duration = 700, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const end = value;
    const startTime = performance.now();
    const prev = display;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(prev + (end - prev) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  return <span>{prefix}{display.toLocaleString("fr-FR")}{suffix}</span>;
}

/* ── SlabCard — Apple Liquid Glass ── */
function SlabCard({ children, style = {} }) {
  return (
    <div className="lq-card" style={{
      borderRadius: 20,
      padding: 32,
      ...liquidGlass,
      ...style,
    }}>{children}</div>
  );
}

/* ── NumberField — Liquid Glass input ── */
function NumberField({ label, value, onChange, unit, icon, min = 0, step = 1 }) {
  const [focused, setFocused] = useState(false);
  const iconNode = icon && typeof icon === "string" && ICON_PATHS[icon]
    ? <Icon name={icon} size={14} color={T.textMuted} />
    : null;
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8, color: T.textMuted, fontSize: 13, fontWeight: 500, marginBottom: 8, fontFamily: T.sans, letterSpacing: "0.01em" }}>
        {iconNode} {label}
      </label>
      <div style={{
        display: "flex", alignItems: "center",
        background: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${focused ? "rgba(197,160,89,0.55)" : "rgba(255,255,255,0.10)"}`,
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
        boxShadow: focused
          ? "0 0 0 3px rgba(197,160,89,0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        borderRadius: 12, overflow: "hidden",
        transition: "border-color 240ms, background 240ms, box-shadow 240ms",
      }}>
        <input type="number" value={value} min={min} step={step}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, padding: "14px 16px", background: "transparent", border: "none",
            color: T.textPrimary, fontSize: 18, fontFamily: T.mono, fontWeight: 700,
            outline: "none", width: "100%",
          }}
        />
        <span style={{
          padding: "14px 16px", color: T.textMuted, fontSize: 14, fontFamily: T.mono,
          fontWeight: 500, borderLeft: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.18)", whiteSpace: "nowrap",
        }}>{unit}</span>
      </div>
    </div>
  );
}

/* ── Slider ── */
function Slider({ label, value, onChange, min, max, step, unit, icon }) {
  const pct = ((value - min) / (max - min)) * 100;
  const iconNode = icon && typeof icon === "string" && ICON_PATHS[icon]
    ? <Icon name={icon} size={14} color={T.textMuted} />
    : null;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: T.textSecondary, fontSize: 13, fontFamily: T.sans }}>
          {iconNode} {label}
        </span>
        <span style={{ color: T.brandGold, fontFamily: T.mono, fontSize: 14, fontWeight: 700 }}>
          {value.toLocaleString("fr-FR")}{unit}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: "100%", height: 6, appearance: "none",
          background: `linear-gradient(to right, ${T.brandGold} 0%, ${T.brandGold} ${pct}%, ${T.borderSolid} ${pct}%, ${T.borderSolid} 100%)`,
          borderRadius: 3, outline: "none", cursor: "pointer" }} />
    </div>
  );
}

/* ── KpiTile — Liquid Glass tile ── */
function KpiTile({ icon, label, value, color, sub }) {
  const iconNode = icon && typeof icon === "string" && ICON_PATHS[icon]
    ? <IconChip name={icon} size={36} iconSize={18} tone="gold" />
    : null;
  return (
    <div className="lq-card" style={{
      borderRadius: 16, padding: "22px 16px",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 30%, rgba(0,0,0,0.18) 100%), rgba(15,15,18,0.50)",
      backdropFilter: "blur(20px) saturate(160%)",
      WebkitBackdropFilter: "blur(20px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.25)",
      flex: "1 1 160px", textAlign: "left",
      transition: "transform 280ms cubic-bezier(0.22,1,0.36,1), border-color 280ms",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(197,160,89,0.25)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {iconNode && <div style={{ marginBottom: 14, position: "relative", zIndex: 1 }}>{iconNode}</div>}
      <div style={{ color: T.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontFamily: T.sans, fontWeight: 600, position: "relative", zIndex: 1 }}>{label}</div>
      <div style={{ color, fontSize: 24, fontWeight: 700, fontFamily: T.mono, lineHeight: 1.2, position: "relative", zIndex: 1 }}>{value}</div>
      {sub && <div style={{ color: T.textMuted, fontSize: 11, marginTop: 6, fontFamily: T.sans, position: "relative", zIndex: 1 }}>{sub}</div>}
    </div>
  );
}

/* ── EmailGate — Liquid Glass overlay ── */
function EmailGate({ onSubmit, icon = "lock", title = "Débloquez votre analyse", desc = "Recevez votre rapport personnalisé." }) {
  // Le bouton "Voir mon analyse" pointe désormais vers le formulaire
  // de contact unique sur la landing (modale BetaModal #beta).
  const iconNode = icon && typeof icon === "string" && ICON_PATHS[icon]
    ? <Icon name={icon} size={24} color={T.brandGold} />
    : null;

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(9,9,11,0.55)",
      backdropFilter: "blur(28px) saturate(160%)",
      WebkitBackdropFilter: "blur(28px) saturate(160%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 20, zIndex: 10,
    }}>
      <div style={{ textAlign: "center", padding: 32, maxWidth: 400 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>{iconNode}</div>
        <h3 style={{ color: T.textPrimary, fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: T.sans }}>{title}</h3>
        <p style={{ color: T.textMuted, fontSize: 14, marginBottom: 24, lineHeight: 1.6, fontFamily: T.sans }}>{desc}</p>
        <a
          href="../index.html?contact=1#beta"
          data-contact
          style={{
            display: "inline-block", width: "100%", padding: "14px 24px",
            background: goldGradient,
            color: "#000",
            border: "1px solid rgba(255,255,255,0.30)",
            borderRadius: 12,
            fontSize: 15, fontWeight: 700, fontFamily: T.sans,
            cursor: "pointer", textDecoration: "none",
            boxShadow: "0 10px 32px rgba(197,160,89,0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
            transition: "all 0.3s",
            boxSizing: "border-box",
          }}
        >Voir mon analyse →</a>
        <p style={{ color: T.textMuted, fontSize: 11, marginTop: 14 }}>Réponse sous 48h. Aucun engagement.</p>
      </div>
    </div>
  );
}

/* ── CTA Footer Block — Liquid Glass ── */
function CtaFooter() {
  return (
    <React.Fragment>
      <div className="lq-card" style={{
        textAlign: "center", padding: "52px 32px", marginBottom: 40,
        borderRadius: 24,
        background:
          "linear-gradient(180deg, rgba(197,160,89,0.10) 0%, rgba(255,255,255,0.02) 30%, rgba(0,0,0,0.20) 100%), rgba(15,15,18,0.55)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(197,160,89,0.20)",
        boxShadow: "0 24px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 14, letterSpacing: "-0.01em", color: T.textPrimary, position: "relative", zIndex: 1 }}>
          Pilotez votre rentabilité en temps réel
        </h2>
        <p style={{ color: T.textSecondary, fontSize: 16, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
          VYZOR transforme vos données en dashboards actionnables.
          Fini les tableurs — bienvenue dans le pilotage intelligent.
        </p>
        <a href="../index.html?contact=1#beta" data-contact style={{
          display: "inline-block", position: "relative", zIndex: 1,
          padding: "16px 44px", background: goldGradient, color: "#000",
          border: "1px solid rgba(255,255,255,0.30)", borderRadius: 12, fontSize: 16, fontWeight: 700,
          fontFamily: T.sans, cursor: "pointer",
          boxShadow: "0 14px 40px rgba(197,160,89,0.38), inset 0 1px 0 rgba(255,255,255,0.5)",
          textDecoration: "none",
        }}>Demander une démo gratuite →</a>
      </div>
      <div style={{ textAlign: "center", color: T.textMuted, fontSize: 12, paddingBottom: 32 }}>
        © 2026 VYZOR SAS — Pilotage intelligent pour décideurs exigeants ·{" "}
        <a href="../calculateurs.html" style={{ color: T.brandGold, textDecoration: "none" }}>← Tous les calculateurs</a>
      </div>
    </React.Fragment>
  );
}

/* ── PageBg : Liquid Glass ambient ── */
function PageBg() {
  return (
    <React.Fragment>
      <div className="lq-ambient"><div className="lq-blob3" /></div>
      <div className="lq-grain" />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />
    </React.Fragment>
  );
}

Object.assign(window, {
  T, goldGradient, goldGlow, goldGlowStrong, liquidGlass,
  VyzorTopNav, AnimatedNumber, SlabCard, NumberField, Slider, KpiTile, EmailGate, CtaFooter, PageBg,
  Icon, IconChip, ICON_PATHS,
});
