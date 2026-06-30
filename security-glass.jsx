// security-glass.jsx — Section "Confidentialité & sécurité"
//
// Ton commercial / rassurant : on parle CE QUE ÇA VEUT DIRE POUR LE CLIENT,
// pas comment on l'implémente. Mention de Supabase + Google Cloud comme
// partenaires d'infrastructure (mêmes certifications que les banques et
// les fintechs régulées).
//
// Structure :
//   1. Header éditorial — promesse commerciale forte
//   2. 4 piliers en cartes glass — bénéfices clients
//   3. Bandeau "Partenaires de confiance" — logos Supabase + Google Cloud
//      avec les certifications héritées (SOC 2, ISO 27001, RGPD, PCI-DSS)
//   4. Promesse + contact DPO

(function injectSecurityStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("security-glass-styles")) return;
  const s = document.createElement("style");
  s.id = "security-glass-styles";
  s.textContent = `
    /* ── Grille des piliers ─────────────────────────────────── */
    .sec-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    @media (max-width: 960px) {
      .sec-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 540px) {
      .sec-grid { grid-template-columns: 1fr; }
    }

    .sec-card {
      position: relative;
      isolation: isolate;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.08);
      background:
        linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012));
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      padding: 26px 24px 26px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition:
        border-color 320ms ease,
        background 320ms ease,
        transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 320ms ease;
    }
    .sec-card::before {
      content: "";
      position: absolute; inset: 0;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(255,255,255,0.05), transparent 45%);
      opacity: 0.7;
      border-radius: inherit;
    }
    .sec-card:hover {
      border-color: rgba(240,201,73,0.32);
      background: linear-gradient(160deg, rgba(240,201,73,0.045), rgba(240,201,73,0.01));
      transform: translateY(-2px);
      box-shadow:
        0 18px 40px -16px rgba(216,172,47,0.20),
        inset 0 1px 0 rgba(255,255,255,0.08);
    }

    .sec-bracket {
      position: absolute;
      width: 12px; height: 12px;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.7);
      transition: opacity 280ms ease 60ms, transform 280ms ease 60ms;
    }
    .sec-card:hover .sec-bracket { opacity: 1; transform: scale(1); }
    .sec-bracket.tl { top: 12px; left: 12px; }
    .sec-bracket.br { bottom: 12px; right: 12px; }
    .sec-bracket::before, .sec-bracket::after {
      content: ""; position: absolute;
      background: #f0c949;
      box-shadow: 0 0 8px rgba(240,201,73,0.45);
    }
    .sec-bracket.tl::before { top: 0; left: 0; width: 10px; height: 1.5px; }
    .sec-bracket.tl::after  { top: 0; left: 0; width: 1.5px; height: 10px; }
    .sec-bracket.br::before { bottom: 0; right: 0; width: 10px; height: 1.5px; }
    .sec-bracket.br::after  { bottom: 0; right: 0; width: 1.5px; height: 10px; }

    .sec-card__icon {
      width: 42px; height: 42px;
      border-radius: 12px;
      display: grid; place-items: center;
      border: 1px solid rgba(240,201,73,0.22);
      background: linear-gradient(160deg, rgba(240,201,73,0.10), rgba(240,201,73,0.02));
      color: #f0c949;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .sec-card__title {
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 600;
      font-size: 17px;
      letter-spacing: -0.01em;
      line-height: 1.25;
      color: rgba(255,255,255,0.96);
    }
    .sec-card__sub {
      font-size: 13.5px;
      line-height: 1.6;
      color: rgba(255,255,255,0.62);
    }

    /* ── Bandeau "Partenaires & certifications" ────────────── */
    .sec-partners {
      position: relative;
      margin-top: 28px;
      border-radius: 22px;
      border: 1px solid rgba(255,255,255,0.08);
      background:
        linear-gradient(165deg, rgba(15,17,21,0.72), rgba(10,11,14,0.55));
      backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%);
      overflow: hidden;
      padding: 28px 32px;
    }
    .sec-partners__intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: start;
    }
    @media (max-width: 760px) {
      .sec-partners__intro { grid-template-columns: 1fr; gap: 18px; }
      .sec-partners { padding: 24px 22px; }
    }
    .sec-partners__eyebrow {
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .sec-partners__eyebrow::before {
      content: "";
      width: 6px; height: 6px; border-radius: 999px;
      background: #5be38d;
      box-shadow: 0 0 10px rgba(91,227,141,0.7);
    }
    .sec-partners__title {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.015em;
      color: #fff;
      margin: 0 0 6px 0;
      line-height: 1.25;
    }
    .sec-partners__lead {
      font-size: 14px;
      line-height: 1.6;
      color: rgba(255,255,255,0.62);
      margin: 0;
      max-width: 460px;
    }

    /* Logos partenaires */
    .sec-logos {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .sec-logo {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.025);
      transition: border-color 280ms ease, background 280ms ease;
    }
    .sec-logo:hover {
      border-color: rgba(240,201,73,0.30);
      background: rgba(240,201,73,0.04);
    }
    .sec-logo__mark {
      width: 40px; height: 40px;
      border-radius: 10px;
      display: grid; place-items: center;
      flex-shrink: 0;
    }
    .sec-logo__name {
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 600;
      font-size: 14.5px;
      color: rgba(255,255,255,0.95);
      line-height: 1.2;
    }
    .sec-logo__role {
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 500;
      font-size: 10.5px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      margin-top: 3px;
    }

    /* Certifications — chips dorés */
    .sec-certs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 22px;
      padding-top: 22px;
      border-top: 1px dashed rgba(255,255,255,0.08);
    }
    .sec-cert {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 14px;
      border-radius: 999px;
      border: 1px solid rgba(240,201,73,0.28);
      background: linear-gradient(160deg, rgba(240,201,73,0.08), rgba(240,201,73,0.015));
      color: rgba(255,255,255,0.92);
      font-family: "Inter", system-ui, sans-serif;
      font-size: 12.5px;
      font-weight: 500;
      letter-spacing: 0.01em;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
      transition: transform 280ms ease;
    }
    .sec-cert:hover { transform: translateY(-1px); }
    .sec-cert__dot {
      width: 5px; height: 5px; border-radius: 999px;
      background: #f0c949;
      box-shadow: 0 0 8px rgba(240,201,73,0.7);
    }
    .sec-cert__sub {
      color: rgba(255,255,255,0.5);
      font-family: "Inter", system-ui, sans-serif;
      font-weight: 500;
      font-size: 10.5px;
      letter-spacing: 0.04em;
    }

    /* Promesse finale */
    .sec-pledge-line {
      margin-top: 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 22px;
      border-radius: 16px;
      border: 1px solid rgba(240,201,73,0.22);
      background:
        linear-gradient(160deg, rgba(240,201,73,0.06), rgba(240,201,73,0.01));
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    .sec-pledge-line__icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      display: grid; place-items: center;
      background: linear-gradient(135deg, #f9e08a 0%, #ebc85b 52%, #d8ac2f 100%);
      color: #1a1410;
      flex-shrink: 0;
      box-shadow: 0 6px 18px rgba(216,172,47,0.32), inset 0 1px 0 rgba(255,255,255,0.5);
    }
    .sec-pledge-line__text {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 14.5px;
      line-height: 1.5;
      color: rgba(255,255,255,0.92);
    }
    .sec-pledge-line__text strong {
      color: #f0c949;
      font-weight: 600;
    }
  `;
  document.head.appendChild(s);
})();

// ───────────────────────────────────────────────────────────────────
// Icônes minimales
// ───────────────────────────────────────────────────────────────────
const SecIcon = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  eyeOff: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A10.6 10.6 0 0 1 12 6c5 0 9 4 10 6-.4.8-1.3 2.1-2.7 3.3" />
      <path d="M6.7 6.7C4.3 8 2.6 10.3 2 12c1 2 5 6 10 6 1.6 0 3.1-.4 4.4-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  ),
  hand: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2.5a1.5 1.5 0 0 1 3 0V13" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
};

// ───────────────────────────────────────────────────────────────────
// 4 promesses commerciales — ce que ça veut dire pour le client
// ───────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: "shield",
    title: "Vos données vous appartiennent",
    sub: "Vyzor ne revend, ne partage, ne monétise jamais vos chiffres. Vous restez seul propriétaire et pouvez tout exporter ou tout supprimer en un clic.",
  },
  {
    icon: "lock",
    title: "Le niveau de sécurité d'une banque",
    sub: "Chiffrement de bout en bout, double authentification, sauvegardes quotidiennes. Les mêmes standards que ceux exigés par les régulateurs bancaires.",
  },
  {
    icon: "eyeOff",
    title: "Anonymisé avant toute analyse par l'IA",
    sub: "Avant d'être transmis à l'IA, le nom de votre entreprise et ceux des personnes sont remplacés par des libellés anonymes, puis restaurés ensuite. L'IA ne voit jamais qui vous êtes — et ne s'entraîne jamais sur vos chiffres.",
  },
  {
    icon: "hand",
    title: "Conforme RGPD, en toute transparence",
    sub: "Droit d'accès, de rectification et d'effacement garantis. Registre des traitements à jour, réversibilité totale et export complet à tout moment. Et nos journaux techniques ne conservent jamais vos montants financiers.",
  },
];

// ───────────────────────────────────────────────────────────────────
// Partenaires & certifications
//   - Supabase : SOC 2 Type 2, ISO 27001 (offre Team / Enterprise)
//   - Google Cloud : ISO 27001/27017/27018/27701, SOC 1/2/3, PCI DSS, RGPD
//   - Bridge : agréé ACPR (PSD2)
// ───────────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    name: "Supabase",
    role: "Plateforme de données chiffrées",
    mark: (
      <svg width="22" height="22" viewBox="0 0 109 113" fill="none" aria-hidden>
        <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627H99.1935C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="#3ECF8E"/>
        <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    role: "Infrastructure d'hébergement",
    mark: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15.6 8.4L18 6l-2.1-2.1c-2.1-2.1-5.4-2.1-7.5 0L6.3 6 8.4 8.1c2-2 5.2-2 7.2 0z" fill="#EA4335"/>
        <path d="M18 18l-2.4-2.4c-2 2-5.2 2-7.2 0L6.3 17.7l2.1 2.1c2.1 2.1 5.4 2.1 7.5 0L18 18z" fill="#34A853"/>
        <path d="M8.4 15.6L6 18l-2.1-2.1c-2.1-2.1-2.1-5.4 0-7.5L6 6.3 8.1 8.4c-2 2-2 5.2 0 7.2z" fill="#4285F4"/>
        <path d="M15.6 8.4l2.4 2.4c2 2 2 5.2 0 7.2L20.1 20.1c2.1-2.1 2.1-5.4 0-7.5L17.7 8.4 15.6 8.4z" fill="#FBBC04"/>
      </svg>
    ),
  },
  {
    name: "Bridge",
    role: "Connexions bancaires (agréé ACPR)",
    mark: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5be38d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 10l9-6 9 6" />
        <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
];

const CERTIFICATIONS = [
  { label: "SOC 2 Type 2", sub: "audit annuel" },
  { label: "ISO 27001", sub: "sécurité de l'information" },
  { label: "ISO 27018", sub: "protection des PII" },
  { label: "PCI DSS Level 1", sub: "standards bancaires" },
  { label: "RGPD", sub: "Union Européenne" },
  { label: "Agrément ACPR", sub: "Banque de France" },
];

// ───────────────────────────────────────────────────────────────────
// Composant principal
// ───────────────────────────────────────────────────────────────────
const SecuritySection = () => {
  const gold = "#f0c949";
  const muted = "rgba(255,255,255,0.55)";
  const subtle = "rgba(255,255,255,0.08)";

  return (
    <section id="securite" style={{ position: "relative", marginTop: 96, marginBottom: 96 }}>
      {/* Header éditorial */}
      <div
        className="vz-method-header"
        style={{
          marginBottom: 40,
        }}
      >
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

      {/* 4 promesses commerciales */}
      <div className="sec-grid">
        {PILLARS.map((p, i) => (
          <div key={i} className="sec-card">
            <span className="sec-bracket tl" aria-hidden />
            <span className="sec-bracket br" aria-hidden />
            <div className="sec-card__icon" aria-hidden>{SecIcon[p.icon]}</div>
            <div className="sec-card__title">{p.title}</div>
            <div className="sec-card__sub">{p.sub}</div>
          </div>
        ))}
      </div>

      {/* Partenaires & certifications */}
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

      {/* Promesse finale */}
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

Object.assign(window, { SecuritySection, SecIcon, PILLARS, PARTNERS, CERTIFICATIONS });
