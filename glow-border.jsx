// glow-border.jsx — Spotlight glow border effect, adapté à la DA VYZOR (or + aurore)
// Le pointeur révèle un halo coloré qui suit le curseur sur la bordure du composant.
// Utilisable en wrapper autour de toute carte glass.

const VYZOR_GLOW_PALETTES = {
  // base = teinte HSL de départ ; spread = amplitude balayée par le pointeur
  gold:   { base: 38,  spread: 30,  saturation: 90, lightness: 65 },
  aurora: { base: 200, spread: 180, saturation: 80, lightness: 65 },
  ice:    { base: 170, spread: 60,  saturation: 70, lightness: 65 },
  rose:   { base: 340, spread: 40,  saturation: 80, lightness: 70 },
};

// Inject styles once
(function injectGlowStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("vyzor-glow-styles")) return;
  const style = document.createElement("style");
  style.id = "vyzor-glow-styles";
  style.textContent = `
    [data-vyzor-glow]::before,
    [data-vyzor-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--vg-border) * -1);
      border: var(--vg-border) solid transparent;
      border-radius: inherit;
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--vg-border))) calc(100% + (2 * var(--vg-border)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
              mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
              mask-clip: padding-box, border-box;
      -webkit-mask-composite: xor;
              mask-composite: intersect;
    }
    [data-vyzor-glow]::before {
      background-image: radial-gradient(
        calc(var(--vg-size) * 0.85) calc(var(--vg-size) * 0.85) at
        calc(var(--vg-x, 50%) * 1px)
        calc(var(--vg-y, 50%) * 1px),
        hsl(var(--vg-hue, 38) calc(var(--vg-sat, 90) * 1%) calc(var(--vg-light, 65) * 1%) / var(--vg-border-opacity, 1)),
        transparent 100%
      );
      filter: brightness(1.6) saturate(1.2);
      z-index: 2;
    }
    [data-vyzor-glow]::after {
      background-image: radial-gradient(
        calc(var(--vg-size) * 0.45) calc(var(--vg-size) * 0.45) at
        calc(var(--vg-x, 50%) * 1px)
        calc(var(--vg-y, 50%) * 1px),
        hsl(0 0% 100% / var(--vg-light-opacity, 0.9)),
        transparent 100%
      );
      z-index: 3;
    }
    [data-vyzor-glow-outer] {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      will-change: filter;
      opacity: var(--vg-outer, 0.7);
      filter: blur(calc(var(--vg-border) * 6));
      background: radial-gradient(
        calc(var(--vg-size) * 0.9) calc(var(--vg-size) * 0.9) at
        calc(var(--vg-x, 50%) * 1px)
        calc(var(--vg-y, 50%) * 1px),
        hsl(var(--vg-hue, 38) calc(var(--vg-sat, 90) * 1%) calc(var(--vg-light, 65) * 1%) / 0.55),
        transparent 70%
      );
    }
  `;
  document.head.appendChild(style);
})();

// Single global pointer listener — sets CSS vars on every [data-vyzor-glow] element
// using its own bounding box so the spotlight tracks the local pointer position.
(function attachGlobalPointer() {
  if (typeof window === "undefined") return;
  if (window.__vyzorGlowAttached) return;
  window.__vyzorGlowAttached = true;
  let raf = 0;
  let lastX = 0, lastY = 0;
  const update = () => {
    raf = 0;
    const els = document.querySelectorAll("[data-vyzor-glow]");
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only update when reasonably close to keep cost low on big pages
      if (
        lastX < rect.left - 400 || lastX > rect.right + 400 ||
        lastY < rect.top - 400  || lastY > rect.bottom + 400
      ) return;
      const x = lastX - rect.left;
      const y = lastY - rect.top;
      el.style.setProperty("--vg-x", x.toFixed(1));
      el.style.setProperty("--vg-y", y.toFixed(1));
    });
  };
  window.addEventListener("pointermove", (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
})();

const GlowCard = ({
  children,
  palette = "gold",      // "gold" | "aurora" | "ice" | "rose"
  radius = 24,           // px
  border = 1.5,          // px - thickness of the glowing border
  size = 260,            // px - spotlight diameter
  outer = 0.6,           // outer halo opacity (0 to disable)
  className = "",
  style = {},
  as = "div",
  ...rest
}) => {
  const p = VYZOR_GLOW_PALETTES[palette] || VYZOR_GLOW_PALETTES.gold;
  const Tag = as;
  return (
    <Tag
      data-vyzor-glow
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        "--vg-border": `${border}px`,
        "--vg-size": `${size}px`,
        "--vg-hue": p.base + p.spread * 0.5,
        "--vg-sat": p.saturation,
        "--vg-light": p.lightness,
        "--vg-border-opacity": 1,
        "--vg-light-opacity": 0.9,
        "--vg-outer": outer,
        ...style,
      }}
      {...rest}
    >
      {outer > 0 && <span data-vyzor-glow-outer aria-hidden="true" />}
      {children}
    </Tag>
  );
};

Object.assign(window, { GlowCard, VYZOR_GLOW_PALETTES });
