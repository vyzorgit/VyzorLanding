// security-stack.jsx — Variante de la section sécurité pour la PAGE sécurité.
//
// CONTENU STRICTEMENT IDENTIQUE à SecuritySection (security-glass.jsx) :
// mêmes 4 piliers (titre + sous-titre), mêmes partenaires, mêmes certifications,
// même promesse finale. SEULE différence : les 4 piliers sont présentés en
// PILE DE CARTES PLEINE LARGEUR qui se chevauchent au scroll (position: sticky),
// exactement comme la section « Les mêmes chiffres / Des attentes différentes ».
//
// Réutilise les données exportées par security-glass.jsx :
//   window.PILLARS, window.PARTNERS, window.CERTIFICATIONS, window.SecIcon

(function injectSecurityStackStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("security-stack-styles")) return;
  const s = document.createElement("style");
  s.id = "security-stack-styles";
  s.textContent = `
    /* Pile sticky des piliers — effet « deck » au scroll */
    .secstack {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .secstack-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
      border-top: 1px solid rgba(240,201,73,0.22);
      background: linear-gradient(150deg, #11141b, #0c0d11);
      box-shadow: 0 30px 70px -34px rgba(0,0,0,0.85);
    }
    .secstack-card__grid {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 34px;
      padding: 42px 48px;
      min-height: 300px;
    }
    .secstack-card__left {
      position: relative;
      display: flex;
      align-items: center;
      gap: 22px;
      flex-shrink: 0;
    }
    .secstack-card__icon {
      width: 64px; height: 64px;
      border-radius: 18px;
      flex-shrink: 0;
      display: grid; place-items: center;
      background-image: linear-gradient(135deg,#f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      color: #161208;
      box-shadow: 0 10px 24px rgba(216,172,47,0.30), inset 0 1px 0 rgba(255,255,255,0.45);
    }
    .secstack-card__icon svg { width: 28px; height: 28px; }
    .secstack-card__num {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: 15px; font-weight: 500;
      color: rgba(255,255,255,0.16);
      font-feature-settings: "tnum" 1, "lnum" 1;
    }
    .secstack-card__title {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 24px; font-weight: 600;
      letter-spacing: -0.02em; line-height: 1.18;
      color: rgba(255,255,255,0.97);
      margin: 0 0 10px;
      text-wrap: balance;
    }
    .secstack-card__sub {
      font-size: 16px; line-height: 1.6;
      color: rgba(255,255,255,0.62);
      margin: 0; max-width: 640px;
    }
    .secstack-card::after {
      content: "";
      position: absolute; top: 0; left: -50px;
      width: 230px; height: 230px; border-radius: 50%;
      background: radial-gradient(circle, rgba(240,201,73,0.10), transparent 60%);
      pointer-events: none;
    }

    @media (max-width: 760px) {
      .secstack-card { position: static !important; top: auto !important; }
      .secstack-card__grid {
        grid-template-columns: 1fr;
        gap: 18px;
        padding: 30px 26px;
        min-height: 0;
      }
      .secstack-card__icon { width: 54px; height: 54px; border-radius: 15px; }
      .secstack-card__icon svg { width: 24px; height: 24px; }
      .secstack-card__title { font-size: 20px; }
      .secstack-card__sub { font-size: 14.5px; }
    }
  `;
  document.head.appendChild(s);
})();

const SecuritySectionStacked = () => {
  const gold = "#f0c949";
  const muted = "rgba(255,255,255,0.55)";

  const PILLARS = window.PILLARS || [];
  const PARTNERS = window.PARTNERS || [];
  const CERTIFICATIONS = window.CERTIFICATIONS || [];
  const SecIcon = window.SecIcon || {};

  const STICK_TOP = 120; // sous la nav flottante
  const STEP = 22;       // décalage entre cartes empilées

  return (
    <section id="securite" style={{ position: "relative", marginTop: 96, marginBottom: 96 }}>
      {/* Header éditorial — identique */}
      <div className="vz-method-header" style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: "clamp(36px, 4.4vw, 52px)",
            margin: 0,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            lineHeight: 1.02,
            maxWidth: "none",
            textWrap: "balance",
          }}
        >
          Vos chiffres,{" "}
          <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>
            entre de très bonnes mains.
          </span>
        </h2>
      </div>

      {/* 4 promesses — PILE STICKY au scroll (même contenu que la grille) */}
      <div className="secstack">
        {PILLARS.map((p, i) => (
          <article
            key={i}
            className="secstack-card"
            style={{ position: "sticky", top: STICK_TOP + i * STEP }}
          >
            <div className="secstack-card__grid">
              <div className="secstack-card__left">
                <span className="secstack-card__icon" aria-hidden>{SecIcon[p.icon]}</span>
                <span className="secstack-card__num">0{i + 1}</span>
              </div>
              <div>
                <h3 className="secstack-card__title">{p.title}</h3>
                <p className="secstack-card__sub">{p.sub}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Partenaires & certifications — identique */}
      <div className="sec-partners">
        <div className="sec-partners__intro">
          <div>
            <div className="sec-partners__eyebrow">
              Partenaires d'infrastructure
            </div>
            <h3 className="sec-partners__title">
              Bâti sur les mêmes fondations que les fintechs régulées.
            </h3>
            <p className="sec-partners__lead">
              Nous avons choisi des partenaires audités annuellement, dont les
              standards sont reconnus par les régulateurs bancaires européens.
              Vos données héritent automatiquement de leurs certifications.
            </p>
          </div>

          <div className="sec-logos">
            {PARTNERS.map((p, i) => (
              <div key={i} className="sec-logo">
                <div className="sec-logo__mark" aria-hidden>{p.mark}</div>
                <div>
                  <div className="sec-logo__name">{p.name}</div>
                  <div className="sec-logo__role">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-certs" aria-label="Certifications">
          {CERTIFICATIONS.map((c, i) => (
            <span key={i} className="sec-cert">
              <span className="sec-cert__dot" aria-hidden />
              {c.label}
              <span className="sec-cert__sub">· {c.sub}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Promesse finale — identique */}
      <div className="sec-pledge-line">
        <div className="sec-pledge-line__icon" aria-hidden>{SecIcon.check}</div>
        <div className="sec-pledge-line__text">
          <strong>Notre engagement écrit&nbsp;:</strong> aucune revente, aucune
          publicité, aucun partage à des tiers. Vous gardez la main sur vos
          données, à vie. Une question sur la confidentialité&nbsp;? Écrivez-nous à{" "}
          <a
            href="mailto:admin@vyzor.fr"
            style={{ color: gold, textDecoration: "none", borderBottom: `1px dashed ${gold}` }}
          >
            admin@vyzor.fr
          </a>.
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { SecuritySectionStacked });
