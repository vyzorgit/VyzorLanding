// features-bento.jsx — Vue d'ensemble des fonctionnalités en bento (même grille pour tous les profils)
// Chaque case mène à la sous-page de la fonctionnalité.

const VZ_BENTO_LAYOUT = {
  "conseil": 2, "tresorerie": 1,
  "analyse-financiere": 1, "alertes": 1, "budget": 1,
  "juridique": 2, "multi-societes": 1,
};

const BentoCard = ({ f, span }) => {
  const V = f.Visual;
  const Tag = f.soon ? "div" : "a";
  return (
    <Tag {...(f.soon ? { "aria-disabled": true } : { href: vzFeatureHref(f.slug) })} className={"vzb-card" + (f.soon ? " soon" : "")} style={{ gridColumn: `span ${span}` }}>
      {f.soon ? <span className="vzb-soon">Bientôt disponible</span> : null}
      <div className="vzb-bg" aria-hidden="true"><V /></div>
      <div className="vzb-body">
        <span className="vzb-ic"><VzfIcon name={f.icon} size={18} /></span>
        <h3 className="vzb-title">{f.name}</h3>
        <p className="vzb-desc">{f.desc}</p>
        {f.soon ? null : <span className="vzb-cta">En savoir plus <span aria-hidden="true">→</span></span>}
      </div>
    </Tag>
  );
};

const FeaturesBento = () => {
  const order = ["conseil", "tresorerie", "analyse-financiere", "alertes", "budget", "juridique", "multi-societes"];
  const list = order.map((s) => VZ_FEATURES.find((f) => f.slug === s));
  return (
    <section className="vzb" aria-label="Fonctionnalités">
      <style>{`
        .vzb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 380px; gap: 16px; }
        .vzb-card {
          position: relative; display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden; border-radius: 18px; text-decoration: none; color: inherit;
          background: linear-gradient(180deg, #121a3a 0%, #0d1430 100%);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 200ms ease;
        }
        .vzb-card:hover { border-color: rgba(240,201,73,0.35); }
        .vzb-card.soon { cursor: default; }
        .vzb-card.soon:hover { border-color: rgba(255,255,255,0.07); }
        .vzb-card.soon .vzb-bg { opacity: 0.45; }
        .vzb-card.soon:hover .vzb-bg { transform: none; }
        .vzb-card.soon .vzb-body { transform: none; }
        .vzb-soon { position: absolute; top: 16px; right: 16px; z-index: 2; font-size: 12px; font-weight: 600; color: #f0c949; padding: 5px 10px; border-radius: 999px; background: rgba(11,13,20,0.85); border: 1px solid rgba(240,201,73,0.3); }
        .vzb-bg {
          position: absolute; inset: 0 0 auto 0; height: 60%; overflow: hidden; pointer-events: none;
          -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 40%);
                  mask-image: linear-gradient(to top, transparent 0%, #000 40%);
          transition: transform 300ms cubic-bezier(0.22,1,0.36,1);
          transform-origin: top center;
        }
        .vzb-card:hover .vzb-bg { transform: scale(1.03); }
        .vzb-body {
          position: relative; z-index: 1; padding: 22px 24px 22px;
          transform: translateY(26px); transition: transform 300ms cubic-bezier(0.22,1,0.36,1);
        }
        .vzb-card:hover .vzb-body, .vzb-card:focus-visible .vzb-body { transform: none; }
        .vzb-ic { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; color: #f0c949; background: rgba(240,201,73,0.06); border: 1px solid rgba(240,201,73,0.22); margin-bottom: 14px; }
        .vzb-title { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em; color: #fff; }
        .vzb-desc { margin: 6px 0 0; font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.58); max-width: 440px; text-wrap: pretty; }
        .vzb-cta { display: inline-flex; gap: 6px; margin-top: 10px; font-size: 13.5px; font-weight: 600; color: #f0c949; opacity: 0; transition: opacity 220ms ease; }
        .vzb-card:hover .vzb-cta, .vzb-card:focus-visible .vzb-cta { opacity: 1; }
        @media (max-width: 1020px) { .vzb-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .vzb-card { grid-column: span 1 !important; } }
        @media (max-width: 640px) { .vzb-grid { grid-template-columns: 1fr; grid-auto-rows: 340px; } }
        @media (hover: none) { .vzb-body { transform: none; } .vzb-cta { opacity: 1; } }
      `}</style>
      <div className="vzb-grid">
        {list.map((f) => <BentoCard key={f.slug} f={f} span={VZ_BENTO_LAYOUT[f.slug]} />)}
      </div>
    </section>
  );
};

Object.assign(window, { FeaturesBento });
