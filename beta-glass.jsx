// beta-glass.jsx — Section "Rejoignez la bêta", refonte :
//   • Deux cartes 3D-tilt (effet "TiltCard" gravitate/evade + spotlight curseur).
//   • Un seul CTA centré → ouvre une modale : questionnaire de qualification en étapes (10/11/2026).
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
      border: 1px solid rgba(140,160,255,0.14);
      background: linear-gradient(160deg, #131c3e, #0b1026);
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
        rgba(140,160,255,0.16) 0%,
        rgba(140,160,255,0.05) 25%,
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
      background: rgba(10,16,38,0.72);
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
      background: linear-gradient(160deg, #141d42, #0b1026);
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

    /* Questionnaire de rendez-vous */
    .beta-modal.lq-modal { max-width: 620px; }
    .lq-fs { border: 0; margin: 0; padding: 0; min-width: 0; }
    .lq-label { display: block; padding: 0; font-size: 10px; letter-spacing: 0.16em; color: rgba(255,255,255,0.62); text-transform: uppercase; margin-bottom: 8px; font-weight: 500; font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace; }
    .lq-opt { text-transform: none; letter-spacing: 0; color: rgba(255,255,255,0.45); }
    .lq-input { width: 100%; padding: 12px 14px; box-sizing: border-box; background: rgba(255,255,255,0.04); color: #fff; border: 1px solid rgba(255,255,255,0.32); border-radius: 10px; font-size: 14px; outline: none; font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif; transition: border-color 200ms, background 200ms; }
    .lq-input:focus { border-color: rgba(240,201,73,0.6); background: rgba(255,255,255,0.06); }
    .lq-input::placeholder { color: rgba(255,255,255,0.35); }
    .lq-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .lq-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .lq-chip, .lq-card { position: relative; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.86); border-radius: 10px; transition: border-color 160ms, background 160ms; font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif; }
    .lq-chip { display: inline-flex; align-items: center; padding: 9px 13px; font-size: 13.5px; line-height: 1.3; }
    .lq-chip:hover, .lq-card:hover { border-color: rgba(240,201,73,0.45); }
    .lq-chip input, .lq-card input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; pointer-events: none; }
    .lq-chip.is-on, .lq-card.is-on { border-color: #f0c949; background: rgba(240,201,73,0.12); color: #fff; }
    .lq-chip:focus-within, .lq-card:focus-within { outline: 2px solid #f0c949; outline-offset: 2px; }
    .lq-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .lq-card { display: flex; flex-direction: column; gap: 4px; padding: 13px 14px; }
    .lq-card__t { font-size: 14px; font-weight: 600; line-height: 1.3; }
    .lq-card__d { font-size: 12.5px; color: rgba(255,255,255,0.55); line-height: 1.4; }
    .lq-progress { height: 3px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
    .lq-progress > span { display: block; height: 100%; background: #f0c949; transition: width 300ms ease; }
    .lq-step-title { margin: 12px 0 18px; font-size: 12.5px; color: rgba(255,255,255,0.55); outline: none; }
    .lq-step-title strong { color: #fff; font-weight: 600; }
    .lq-error { font-size: 12.5px; color: #ffb4a8; background: rgba(255,99,71,0.08); border: 1px solid rgba(255,99,71,0.30); padding: 10px 12px; border-radius: 10px; line-height: 1.5; }
    .lq-actions { display: flex; gap: 10px; align-items: stretch; }
    .lq-next { flex: 1; padding: 14px; border: none; background: #f0c949; color: #1a1410; font-weight: 600; font-size: 14px; border-radius: 12px; cursor: pointer; font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif; transition: background-color 160ms, opacity 200ms; }
    .lq-next:hover { background: #f4d468; }
    .lq-next:disabled { opacity: 0.7; cursor: wait; }
    .lq-back { padding: 12px 18px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: #fff; border-radius: 12px; cursor: pointer; font-size: 13.5px; font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif; }
    .lq-back:hover { background: rgba(255,255,255,0.1); }
    .beta-modal select:focus-visible, .beta-modal textarea:focus-visible { outline: 2px solid #f0c949; outline-offset: 2px; }
    @media (max-width: 560px) {
      .beta-modal.lq-modal { padding: 26px 18px; }
      .lq-grid2, .lq-cards { grid-template-columns: 1fr; }
    }

    .vz-beta-cta {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 14px 24px; border: none; border-radius: 10px;
      background: #f0c949; color: #0d1430;
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

// —— Questionnaire de prise de rendez-vous (10/11/2026) ——
// Remplace l'ancien formulaire à 4 champs. 3 étapes pour un cabinet, 4 pour une entreprise.
// Tout part par e-mail (Web3Forms → admin@vyzor.fr) : une synthèse lisible en tête, un score
// de qualification interne (jamais affiché au visiteur) dans l'objet, puis chaque réponse.
// Les valeurs envoyées restent en français, même sur la version anglaise (seul l'affichage est traduit).
const LQ_FONT = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';
const LQ = {
  profils: [
    { v: "Dirigeant", t: "Dirigeant ou associé", d: "Vous pilotez votre entreprise" },
    { v: "Finance", t: "DAF, RAF ou contrôleur de gestion", d: "Vous tenez les chiffres en interne" },
    { v: "Cabinet", t: "Expert-comptable ou collaborateur", d: "Vous accompagnez des clients" },
    { v: "Autre", t: "Autre profil", d: "Conseil, investisseur, curiosité" },
  ],
  secteurs: ["Commerce et négoce", "Industrie", "BTP et construction", "Services aux entreprises", "Hôtellerie et restauration", "Santé et social", "Tech et numérique", "Transport et logistique", "Autre secteur"],
  ca: ["Moins de 500 k€", "500 k€ à 2 M€", "2 à 10 M€", "10 à 50 M€", "Plus de 50 M€"],
  effectif: ["1 à 9", "10 à 49", "50 à 249", "250 et plus"],
  societes: ["Une seule", "2 à 5 (holding, filiales)", "Plus de 5"],
  dossiers: ["Moins de 50", "50 à 200", "200 à 500", "Plus de 500"],
  collaborateurs: ["1 à 5", "6 à 20", "21 à 50", "Plus de 50"],
  conseil: ["Oui, régulièrement", "Ponctuellement", "Pas encore"],
  compta: ["Un cabinet comptable", "En interne", "Les deux"],
  logiciels: ["Pennylane", "MyUnisoft", "Cegid (Loop, Quadra…)", "Sage", "Odoo", "ACD", "Tiime", "Autre logiciel", "Je ne sais pas"],
  suivi: ["Tableurs Excel", "Bilan annuel du cabinet", "Tableaux de bord du cabinet", "Outil de BI ou de reporting", "Logiciel de trésorerie", "Presque rien"],
  frequence: ["Chaque semaine", "Chaque mois", "Chaque trimestre", "Une fois par an, au bilan"],
  prioritesPme: ["Voir ma trésorerie à l'avance", "Comprendre mes marges", "Construire et suivre un budget", "Un reporting mensuel sans Excel", "Ne plus rater une échéance fiscale", "Préparer un rendez-vous bancaire", "Consolider plusieurs sociétés", "Être conseillé pour décider"],
  prioritesCabinet: ["Proposer des missions de pilotage", "Produire le reporting client plus vite", "Repérer les clients en difficulté", "Préparer les rendez-vous de bilan", "Fidéliser par le conseil", "Équiper des clients avec Vyzor"],
  delai: ["Dès que possible", "Dans les 3 mois", "Je me renseigne"],
  source: ["Recherche Google", "LinkedIn", "Mon expert-comptable", "Bouche-à-oreille", "Pennylane", "Un calculateur ou un guide Vyzor", "Autre"],
};
const LQ_EMPTY = {
  profil: "", name: "", email: "", telephone: "", entreprise: "",
  secteur: "", ca: "", effectif: "", societes: "",
  dossiers: "", collaborateurs: "", conseil: "",
  compta: "", logiciel: "", suivi: [], frequence: "",
  priorites: [], defi: "", delai: "", source: "",
};

// Score de qualification (0 à 10), à usage interne : taille, rôle, urgence, connecteur prêt, douleur.
const lqScore = (d) => {
  const delai = { "Dès que possible": 3, "Dans les 3 mois": 2 }[d.delai] || 0;
  const logiciel = d.logiciel === "Pennylane" ? 2 : ["MyUnisoft", "Odoo", "Cegid (Loop, Quadra…)"].includes(d.logiciel) ? 1 : 0;
  let raw, max;
  if (d.profil === "Cabinet") {
    raw = ({ "Moins de 50": 1, "50 à 200": 3, "200 à 500": 4, "Plus de 500": 4 }[d.dossiers] || 0)
      + ({ "Oui, régulièrement": 2, "Ponctuellement": 2, "Pas encore": 1 }[d.conseil] || 0)
      + logiciel + delai;
    max = 11;
  } else {
    raw = ({ "Moins de 500 k€": 1, "500 k€ à 2 M€": 3, "2 à 10 M€": 4, "10 à 50 M€": 4, "Plus de 50 M€": 2 }[d.ca] || 0)
      + ({ Dirigeant: 2, Finance: 2 }[d.profil] || 0)
      + (d.societes && d.societes !== "Une seule" ? 1 : 0)
      + (["Chaque trimestre", "Une fois par an, au bilan"].includes(d.frequence) ? 1 : 0)
      + logiciel + delai;
    max = 13;
  }
  const score = Math.round((raw / max) * 10);
  return { score, temp: score >= 7 ? "Chaud" : score >= 4 ? "Tiède" : "Froid" };
};

const LqLabel = ({ children, optional, htmlFor, as = "label" }) => {
  const Tag = as;
  return (
    <Tag className="lq-label" {...(htmlFor ? { htmlFor } : {})}>
      {children}
      {optional && <span className="lq-opt"> (facultatif)</span>}
    </Tag>
  );
};

// Choix sous forme de pastilles : vrais boutons radio / cases à cocher, masqués visuellement.
const LqChips = ({ name, label, options, value, onChange, multi = false, max, optional }) => {
  const toggle = (o) => {
    if (!multi) return onChange(o);
    const cur = value || [];
    if (cur.includes(o)) return onChange(cur.filter((x) => x !== o));
    if (max && cur.length >= max) return;
    onChange([...cur, o]);
  };
  return (
    <fieldset className="lq-fs">
      <LqLabel as="legend" optional={optional}>{label}</LqLabel>
      <div className="lq-chips">
        {options.map((o) => {
          const on = multi ? (value || []).includes(o) : value === o;
          return (
            <label key={o} className={"lq-chip" + (on ? " is-on" : "")}>
              <input type={multi ? "checkbox" : "radio"} name={"lq-" + name} value={o} checked={on}
                onChange={() => toggle(o)} data-lq={name} />
              <span>{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

const LqSelect = ({ id, label, options, value, onChange, optional }) => (
  <div>
    <LqLabel htmlFor={"lq-" + id} optional={optional}>{label}</LqLabel>
    <select id={"lq-" + id} className="lq-input" value={value} data-lq={id}
      onChange={(e) => onChange(e.target.value)} style={{ colorScheme: "dark" }}>
      <option value="" disabled style={{ background: "#0b1026" }}>Choisir…</option>
      {options.map((o) => <option key={o} value={o} style={{ background: "#0b1026" }}>{o}</option>)}
    </select>
  </div>
);

const LqText = ({ id, label, value, onChange, type = "text", placeholder, autoComplete, optional }) => (
  <div>
    <LqLabel htmlFor={"lq-" + id} optional={optional}>{label}</LqLabel>
    <input id={"lq-" + id} className="lq-input" type={type} value={value} placeholder={placeholder}
      autoComplete={autoComplete} data-lq={id} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const BetaModal = ({ open, onClose }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [d, setD] = React.useState(LQ_EMPTY);
  const muted = "rgba(255,255,255,0.55)";
  const dialogRef = React.useRef(null);
  // Portail monté après hydratation : le pré-rendu (serveur) ne sait pas rendre de portail.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Sur /cabinets, le profil « cabinet » est présélectionné et les textes sont adaptés.
  const isCabinetPage = mounted && /^\/cabinets/.test(window.VZ_FR_PATH || window.location.pathname);
  const WEB3FORMS_KEY = "9f003436-eba6-4543-b3ed-06c89a38a69c";

  const set = (k) => (v) => { setD((p) => ({ ...p, [k]: v })); setError(null); };
  const isCabinet = d.profil === "Cabinet";
  const steps = isCabinet
    ? ["Vous", "Votre cabinet", "Votre besoin"]
    : ["Vous", "Votre entreprise", "Aujourd'hui", "Votre besoin"];
  const last = step === steps.length - 1;
  const stepName = steps[step];

  // Contrôle de l'étape en cours : renvoie le message et le champ à mettre en avant.
  const check = () => {
    const need = (k, msg) => { const v = d[k]; return (Array.isArray(v) ? v.length : String(v).trim()) ? null : [msg, k]; };
    const list = {
      "Vous": [
        need("profil", "Dites-nous qui vous êtes."),
        need("name", "Indiquez votre nom."),
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()) ? ["Indiquez une adresse e-mail valide.", "email"] : null,
        need("entreprise", isCabinet ? "Indiquez le nom de votre cabinet." : "Indiquez le nom de votre entreprise."),
      ],
      "Votre entreprise": [
        need("secteur", "Choisissez votre secteur."),
        need("ca", "Choisissez une tranche de chiffre d'affaires."),
        need("effectif", "Choisissez votre effectif."),
        need("societes", "Indiquez combien de sociétés vous pilotez."),
      ],
      "Votre cabinet": [
        need("dossiers", "Indiquez votre nombre de dossiers."),
        need("collaborateurs", "Indiquez la taille de votre équipe."),
        need("logiciel", "Choisissez votre logiciel de production."),
        need("conseil", "Dites-nous si vous proposez du conseil."),
      ],
      "Aujourd'hui": [
        need("compta", "Dites-nous qui tient votre comptabilité."),
        need("logiciel", "Choisissez votre logiciel comptable."),
        need("suivi", "Cochez au moins une façon de suivre vos chiffres."),
        need("frequence", "Indiquez à quelle fréquence vous voyez vos chiffres."),
      ],
      "Votre besoin": [
        need("priorites", "Choisissez au moins une priorité."),
        need("delai", "Indiquez votre délai."),
      ],
    }[stepName] || [];
    return list.find(Boolean) || null;
  };

  const focusField = (k) => {
    const el = dialogRef.current && dialogRef.current.querySelector(`[data-lq="${k}"]`);
    if (el) el.focus();
  };

  const send = async () => {
    setSubmitting(true);
    const { score, temp } = lqScore(d);
    const prof = (LQ.profils.find((p) => p.v === d.profil) || {}).t || d.profil;
    const taille = isCabinet ? `${d.dossiers} dossiers, ${d.collaborateurs} collaborateurs` : `CA ${d.ca}, ${d.effectif} salariés`;
    const synthese = [
      `${prof} — ${d.entreprise}`,
      taille + (isCabinet ? "" : `, ${d.secteur}, ${{ "Une seule": "une société", "Plus de 5": "plus de 5 sociétés" }[d.societes] || "2 à 5 sociétés"}`),
      `Logiciel : ${d.logiciel}` + (isCabinet ? "" : ` · compta : ${d.compta} · vision : ${d.frequence.toLowerCase()}`),
      `Priorités : ${d.priorites.join(", ")}`,
      `Délai : ${d.delai}` + (d.source ? ` · connu via : ${d.source}` : ""),
      `Score : ${score}/10 (${temp})`,
    ].join("\n");
    const rows = [
      ["Synthèse", synthese],
      ["name", d.name.trim()],
      ["email", d.email.trim()],
      ["Téléphone", d.telephone.trim() || "Non renseigné"],
      ["Profil", prof],
      [isCabinet ? "Cabinet" : "Entreprise", d.entreprise.trim()],
      ...(isCabinet
        ? [["Dossiers clients", d.dossiers], ["Collaborateurs", d.collaborateurs], ["Logiciel de production", d.logiciel], ["Missions de conseil", d.conseil]]
        : [["Secteur", d.secteur], ["Chiffre d'affaires", d.ca], ["Effectif", d.effectif], ["Sociétés pilotées", d.societes],
           ["Comptabilité tenue par", d.compta], ["Logiciel comptable", d.logiciel], ["Suivi actuel", d.suivi.join(", ")], ["Vision des chiffres", d.frequence]]),
      ["Priorités", d.priorites.join(", ")],
      ["Principal défi", d.defi.trim() || "Non renseigné"],
      ["Délai", d.delai],
      ["Connu via", d.source || "Non renseigné"],
      ["Score de qualification", `${score}/10 (${temp})`],
      ["Page", window.VZ_FR_PATH || window.location.pathname || "/"],
      ["Langue", window.VZ_LANG === "en" ? "anglais" : "français"],
    ];
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `[${temp} ${score}/10] Rendez-vous — ${d.entreprise.trim()} (${isCabinet ? `cabinet, ${d.dossiers} dossiers` : `${prof}, CA ${d.ca}`})`);
    fd.append("from_name", "Vyzor — Rendez-vous");
    rows.forEach(([k, v]) => fd.append(k, v));
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setSubmitted(true);
      else setError("Une erreur est survenue. Réessayez dans un instant.");
    } catch (err) {
      setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = (e) => {
    e.preventDefault();
    if (submitting) return;
    if (e.currentTarget.elements && e.currentTarget.elements.botcheck && e.currentTarget.elements.botcheck.checked) return;
    const bad = check();
    if (bad) { setError(bad[0]); focusField(bad[1]); return; }
    setError(null);
    if (last) send();
    else setStep((s) => s + 1);
  };

  React.useEffect(() => {
    if (!open) {
      setSubmitted(false); setError(null); setSubmitting(false); setStep(0);
      setD(LQ_EMPTY);
      return;
    }
    if (isCabinetPage) setD((p) => (p.profil ? p : { ...p, profil: "Cabinet" }));
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, isCabinetPage]);

  // Focus : la boîte de dialogue à l'ouverture, retour au déclencheur à la fermeture.
  React.useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement;
    if (dialogRef.current) dialogRef.current.focus();
    return () => {
      if (trigger && typeof trigger.focus === "function" && document.contains(trigger)) trigger.focus();
    };
  }, [open]);

  // Changement d'étape : on remonte en haut et on place le focus sur le titre de l'étape.
  React.useEffect(() => {
    if (!open || !dialogRef.current) return;
    dialogRef.current.scrollTop = 0;
    if (step > 0) { const h = dialogRef.current.querySelector(".lq-step-title"); if (h) h.focus(); }
  }, [step, open]);

  React.useEffect(() => {
    if (open && submitted && dialogRef.current) dialogRef.current.focus();
  }, [open, submitted]);

  // Piège de focus minimal (Tab / Maj+Tab).
  const trapTab = (e) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([name=botcheck]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    if (!items.length) return;
    const first = items[0];
    const lastEl = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && active === lastEl) { e.preventDefault(); first.focus(); }
  };

  if (!open) return null;

  const body = {
    "Vous": (
      <React.Fragment>
        <fieldset className="lq-fs">
          <LqLabel as="legend">Vous êtes</LqLabel>
          <div className="lq-cards">
            {LQ.profils.map((p) => (
              <label key={p.v} className={"lq-card" + (d.profil === p.v ? " is-on" : "")}>
                <input type="radio" name="lq-profil" value={p.v} checked={d.profil === p.v}
                  onChange={() => set("profil")(p.v)} data-lq="profil" />
                <span className="lq-card__t">{p.t}</span>
                <span className="lq-card__d">{p.d}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="lq-grid2">
          <LqText id="name" label="Nom et prénom" value={d.name} onChange={set("name")} placeholder="Marie Durand" autoComplete="name" />
          <LqText id="entreprise" label={isCabinet ? "Cabinet" : "Entreprise"} value={d.entreprise} onChange={set("entreprise")} placeholder={isCabinet ? "Cabinet Durand" : "ACME SAS"} autoComplete="organization" />
          <LqText id="email" type="email" label="E-mail professionnel" value={d.email} onChange={set("email")} placeholder="marie@entreprise.fr" autoComplete="email" />
          <LqText id="telephone" type="tel" label="Téléphone" optional value={d.telephone} onChange={set("telephone")} placeholder="06 12 34 56 78" autoComplete="tel" />
        </div>
      </React.Fragment>
    ),
    "Votre entreprise": (
      <React.Fragment>
        <LqSelect id="secteur" label="Secteur d'activité" options={LQ.secteurs} value={d.secteur} onChange={set("secteur")} />
        <LqChips name="ca" label="Chiffre d'affaires annuel" options={LQ.ca} value={d.ca} onChange={set("ca")} />
        <LqChips name="effectif" label="Effectif" options={LQ.effectif} value={d.effectif} onChange={set("effectif")} />
        <LqChips name="societes" label="Sociétés à piloter" options={LQ.societes} value={d.societes} onChange={set("societes")} />
      </React.Fragment>
    ),
    "Votre cabinet": (
      <React.Fragment>
        <LqChips name="dossiers" label="Dossiers clients" options={LQ.dossiers} value={d.dossiers} onChange={set("dossiers")} />
        <LqChips name="collaborateurs" label="Collaborateurs" options={LQ.collaborateurs} value={d.collaborateurs} onChange={set("collaborateurs")} />
        <LqSelect id="logiciel" label="Logiciel de production" options={LQ.logiciels} value={d.logiciel} onChange={set("logiciel")} />
        <LqChips name="conseil" label="Proposez-vous des missions de conseil ou de pilotage ?" options={LQ.conseil} value={d.conseil} onChange={set("conseil")} />
      </React.Fragment>
    ),
    "Aujourd'hui": (
      <React.Fragment>
        <LqChips name="compta" label="Qui tient votre comptabilité ?" options={LQ.compta} value={d.compta} onChange={set("compta")} />
        <LqSelect id="logiciel" label="Logiciel comptable" options={LQ.logiciels} value={d.logiciel} onChange={set("logiciel")} />
        <LqChips name="suivi" multi label="Comment suivez-vous vos chiffres ?" options={LQ.suivi} value={d.suivi} onChange={set("suivi")} />
        <LqChips name="frequence" label="Vous avez une vision claire de vos chiffres" options={LQ.frequence} value={d.frequence} onChange={set("frequence")} />
      </React.Fragment>
    ),
    "Votre besoin": (
      <React.Fragment>
        <LqChips name="priorites" multi max={3} label="Vos priorités (3 au plus)"
          options={isCabinet ? LQ.prioritesCabinet : LQ.prioritesPme} value={d.priorites} onChange={set("priorites")} />
        <div>
          <LqLabel htmlFor="lq-defi" optional>Votre principal défi aujourd'hui</LqLabel>
          <textarea id="lq-defi" className="lq-input" rows={3} maxLength={1200} value={d.defi} data-lq="defi"
            onChange={(e) => set("defi")(e.target.value)}
            placeholder={isCabinet ? "Par exemple : nos clients nous demandent du prévisionnel, on n'a pas le temps de le produire." : "Par exemple : je découvre mes marges au bilan, trop tard pour agir."}
            style={{ resize: "vertical", minHeight: 84, lineHeight: 1.5 }} />
        </div>
        <LqChips name="delai" label="Quand voulez-vous démarrer ?" options={LQ.delai} value={d.delai} onChange={set("delai")} />
        <LqSelect id="source" label="Comment nous avez-vous connus ?" optional options={LQ.source} value={d.source} onChange={set("source")} />
      </React.Fragment>
    ),
  }[stepName];

  const overlay = (
    <div className="beta-modal-overlay" onClick={onClose}>
      <div className="beta-modal lq-modal" ref={dialogRef} role="dialog" aria-modal="true"
        aria-labelledby="beta-modal-title" tabIndex={-1}
        onKeyDown={trapTab} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="beta-modal__close" onClick={onClose} aria-label="Fermer">×</button>

        {!submitted ? (
          <React.Fragment>
            <h3 id="beta-modal-title" style={{ fontFamily: LQ_FONT, fontWeight: 400, fontSize: 28, letterSpacing: "-0.015em", lineHeight: 1.1, margin: "0 40px 8px 0", color: "#fff" }}>
              {isCabinetPage ? "Parlons de vos clients." : "Préparons votre rendez-vous."}
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, margin: "0 0 18px" }}>
              Quelques questions pour comprendre votre situation et venir au rendez-vous avec des réponses concrètes. Deux minutes, gratuit et sans engagement.
            </p>
            <div className="lq-progress" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}
              aria-label="Avancement du questionnaire">
              <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            <div className="lq-step-title" tabIndex={-1}>
              {vzL({ fr: `Étape ${step + 1} sur ${steps.length}`, en: `Step ${step + 1} of ${steps.length}` })}
              <span aria-hidden="true"> · </span>
              <strong>{stepName}</strong>
            </div>
            <form onSubmit={next} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Honeypot Web3Forms — anti-spam */}
              <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
              {body}
              {error && <div role="alert" className="lq-error">{error}</div>}
              <div className="lq-actions">
                {step > 0 && (
                  <button type="button" className="lq-back" onClick={() => { setError(null); setStep((s) => s - 1); }}>
                    <span aria-hidden="true">←</span> Retour
                  </button>
                )}
                <button type="submit" className="lq-next" disabled={submitting}>
                  {submitting ? "Envoi en cours…" : last ? "Envoyer mes réponses" : "Continuer"}
                  {!submitting && <span aria-hidden="true"> →</span>}
                </button>
              </div>
              {last && (
                <div style={{ fontSize: 11, color: muted, textAlign: "center", lineHeight: 1.55 }}>
                  Vos réponses servent uniquement à préparer notre échange et à traiter votre demande (conservées 3 ans au plus). Vous pouvez y accéder ou les faire supprimer en écrivant à admin@vyzor.fr. Voir notre{" "}
                  <a href="/confidentialite" target="_blank" rel="noopener" style={{ color: "#f0c949", textDecoration: "underline", textUnderlineOffset: 2 }}>politique de confidentialité</a>.
                </div>
              )}
            </form>
          </React.Fragment>
        ) : (
          <div role="status" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "16px 0", gap: 12 }}>
            <div aria-hidden="true" style={{ width: 60, height: 60, borderRadius: 999, background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.40)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7eead8" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 id="beta-modal-title" style={{ fontFamily: LQ_FONT, fontWeight: 400, fontSize: 26, margin: 0, color: "#fff", letterSpacing: "-0.01em" }}>
              Merci, c'est bien reçu.
            </h3>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
              Nous lisons vos réponses et revenons vers vous sous 48 h. Vous préférez fixer le rendez-vous tout de suite ?
            </p>
            <a href="https://calendly.com/admin-vyzor/30min" target="_blank" rel="noopener" style={{ marginTop: 4, padding: "11px 18px", borderRadius: 10, background: "#f0c949", color: "#0d1430", fontWeight: 600, fontSize: 14, textDecoration: "none", fontFamily: LQ_FONT }}>
              Choisir mon créneau <span aria-hidden="true">→</span>
            </a>
            <button type="button" onClick={onClose} className="lq-back" style={{ marginTop: 8 }}>Fermer</button>
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
            {vzL({
              fr: () => <React.Fragment>Devenez l'un des <span style={{ color: gold }}>{betaPlaces} premiers</span></React.Fragment>,
              en: () => <React.Fragment>Be one of the <span style={{ color: gold }}>first {betaPlaces}</span></React.Fragment>,
            })}
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
            Vyzor fait une bonne partie de ce travail de lecture. Pendant la bêta, c'est gratuit.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: muted }}>
            Pourquoi gratuit ? Vos retours nous aident à finir le produit.
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
