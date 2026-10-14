// faq-glass.jsx — FAQ classée par étape du parcours (sommaire sticky + recherche + accordéon « + »)
//   ⚠️ Le contenu DOIT rester synchronisé avec le JSON-LD FAQPage du <head> de faq.html.

const VYZOR_FAQ_GROUPS = [
  {
    id: "essentiel", title: "L'essentiel", desc: "Comprendre VYZOR en deux minutes.",
    items: [
      { q: "Qu'est-ce que VYZOR ?", a: "VYZOR est un copilote financier pour dirigeants, DAF et experts-comptables. Il transforme vos données comptables en pilotage clair : reporting automatisé, prévisions de trésorerie et alertes triées par impact en euros, le tout résumé dans un Vyzor Score lisible en quelques secondes." },
      { q: "À qui s'adresse VYZOR ?", a: "Avant tout aux experts-comptables qui veulent offrir un vrai pilotage financier à leurs clients et développer leur activité de conseil. Mais aussi aux dirigeants de PME qui veulent piloter sans être financiers, et aux DAF — internes, externalisés ou à temps partagé — qui veulent gagner du temps sur le reporting." },
      { q: "Faut-il être expert en finance pour l'utiliser ?", a: "Non. Le Vyzor Score résume la santé financière de l'entreprise en une note sur 100, les alertes sont classées par impact en euros pour savoir quoi traiter en premier, et l'assistant IA répond à vos questions en langage courant." },
      { q: "VYZOR remplace-t-il mon expert-comptable ?", a: "Non. VYZOR ne tient pas votre comptabilité : il s'appuie sur celle produite par votre cabinet pour la transformer en outil de pilotage. Il est d'ailleurs co-conçu avec des professionnels du chiffre pour enrichir la relation de conseil entre le cabinet et ses clients." },
      { q: "Comment accéder à VYZOR ?", a: "VYZOR est en accès anticipé (bêta), co-construit avec ses premiers utilisateurs : vous profitez des nouveautés en avant-première et vos retours orientent directement le produit. Demandez votre accès via le formulaire en bas de page." },
    ],
  },
  {
    id: "demarrer", title: "Mise en route", desc: "Brancher vos données et démarrer.",
    items: [
      { q: "Comment VYZOR récupère-t-il mes données comptables ?", a: "Deux options, sans aucune re-saisie. Par connecteur, en lecture seule, avec Pennylane, MyUnisoft et Odoo. Ou par import de fichiers depuis votre espace Documents : FEC, Excel (.xlsx, .csv) ou PDF de liasse fiscale. Les données sont ensuite structurées automatiquement." },
      { q: "Mon logiciel comptable n'a pas de connecteur, que faire ?", a: "L'import de fichiers prend le relais : tous les logiciels comptables utilisés en France savent exporter un FEC, format légal obligatoire. Les connexions bancaires et l'agrégateur Chift, qui élargira la liste des logiciels compatibles, sont en préparation." },
      { q: "Combien de temps pour être opérationnel ?", a: "Quelques minutes. Dès la première synchronisation, vos indicateurs et votre Vyzor Score sont calculés et prêts à être pilotés." },
      { q: "À quelle fréquence mes données sont-elles mises à jour ?", a: "Vous synchronisez vos données d'un clic, quand vous le souhaitez. Une synchronisation automatique quotidienne arrive prochainement." },
    ],
  },
  {
    id: "pilotage", title: "Pilotage & analyses", desc: "Ce que VYZOR calcule et produit pour vous.",
    items: [
      { q: "Quels indicateurs VYZOR calcule-t-il ?", a: "Plus de 35 indicateurs clés : chiffre d'affaires, EBE / EBITDA, BFR, DSO / DPO, trésorerie, ROE, ROCE, solvabilité… Tous sont synthétisés dans le Vyzor Score." },
      { q: "Comment est calculé le Vyzor Score ?", a: "C'est une note composite de 0 à 100 qui agrège quatre dimensions : rentabilité, solvabilité, liquidité et efficacité. Un repère unique pour situer l'entreprise en un coup d'œil et suivre sa progression dans le temps." },
      { q: "Comment fonctionnent les alertes ?", a: "Elles reposent sur des règles métier précises, sans approximation, et sont triées par impact en euros : vous traitez d'abord ce qui pèse vraiment sur vos résultats." },
      { q: "VYZOR fait-il des prévisions de trésorerie ?", a: "Oui. VYZOR projette votre trésorerie, estime votre rythme de consommation (burn rate) et calcule votre autonomie financière (runway) en nombre de mois." },
      { q: "Puis-je comparer mon réalisé à mon budget ?", a: "Oui. Importez votre budget prévisionnel (Excel, par exercice) : VYZOR compare le réel au budget poste par poste, avec les mêmes formules de KPI. Un interrupteur permet de basculer la référence entre N-1 et le budget." },
      { q: "Puis-je me comparer aux entreprises de mon secteur ?", a: "Oui. VYZOR situe vos indicateurs face à des benchmarks sectoriels issus des données publiques de l'INSEE (ESANE)." },
      { q: "Que peut faire l'assistant IA ?", a: "Il répond à vos questions sur vos KPI, votre trésorerie et votre fiscalité (TVA, IS). Pour les sujets complexes, il réunit un « Conseil » de plusieurs expertises — analyste, trésorier, juriste et stratège — qui croisent leurs regards sur votre situation." },
      { q: "Puis-je envoyer un compte-rendu financier par email ?", a: "Oui. Depuis n'importe quel dashboard, l'IA rédige un compte-rendu basé sur les indicateurs affichés. Vous le relisez, ajustez le ton (professionnel, chaleureux ou concis) et l'envoyez depuis votre propre adresse Gmail, rapport PDF en pièce jointe. La connexion Gmail se fait en un clic et reste révocable à tout moment." },
    ],
  },
  {
    id: "cabinets", title: "Cabinets comptables", desc: "Piloter tout un portefeuille de dossiers.",
    items: [
      { q: "Puis-je suivre tous mes dossiers clients au même endroit ?", a: "Oui. La vue portefeuille affiche tous vos dossiers, avec l'état de synchronisation de chacun visible en un coup d'œil, sans limite de nombre." },
      { q: "Mes clients voient-ils mon travail d'analyse ?", a: "Non. Les comptes cabinet et les comptes dirigeant sont indépendants et cloisonnés : votre travail côté cabinet n'est pas visible par vos clients." },
    ],
  },
  {
    id: "securite", title: "Sécurité & confidentialité", desc: "Vos données restent les vôtres.",
    items: [
      { q: "Où et comment mes données sont-elles protégées ?", a: "Elles sont chiffrées et hébergées dans l'Union européenne, sur une infrastructure conforme SOC 2 et ISO 27001.", link: { href: "securite.html", label: "Voir nos engagements de sécurité" } },
      { q: "VYZOR peut-il modifier ma comptabilité ?", a: "Non, jamais. VYZOR accède à vos données en lecture seule : il les analyse, mais n'écrit, ne modifie ni ne supprime rien." },
      { q: "Mes données servent-elles à entraîner l'IA ?", a: "Non. Vos données ne servent jamais à entraîner des modèles et ne sont partagées avec aucun tiers. Les noms sont pseudonymisés avant toute génération de contenu par l'IA." },
      { q: "Que voit l'assistant IA de ma comptabilité ?", a: "Uniquement les agrégats du dossier que vous consultez — jamais les écritures comptables brutes, ni les données d'un autre dossier." },
      { q: "Comment révoquer l'accès à mes données ?", a: "À tout moment : le bouton « Déconnecter » de votre espace Documents, ou la révocation depuis votre logiciel comptable, coupe l'accès immédiatement. L'historique déjà calculé reste disponible." },
    ],
  },
];

const VYZOR_FAQ = VYZOR_FAQ_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, cat: g.title })));

const vzfNorm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const vzfCss = `
.vzf{display:grid;grid-template-columns:260px minmax(0,1fr);gap:clamp(32px,5vw,72px);align-items:start;margin-bottom:112px}
.vzf-aside{position:sticky;top:110px;display:flex;flex-direction:column;gap:22px}
.vzf-search{position:relative}
.vzf-search input{width:100%;height:46px;padding:0 40px 0 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.4);background:rgba(255,255,255,0.03);color:#fff;font-size:14.5px;outline:none;transition:border-color 200ms,background 200ms}
.vzf-search input::placeholder{color:rgba(255,255,255,0.6);opacity:1}
.vzf-search input:focus{border-color:rgba(240,201,73,0.9);background:rgba(255,255,255,0.05)}
.vzf-search input:focus-visible,.vzf-clear:focus-visible,.vzf-nav a:focus-visible,.vzf-a a:focus-visible,.vzf-empty a:focus-visible{outline:2px solid #f0c949;outline-offset:2px}
.vzf-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.vzf-clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:rgba(255,255,255,0.5);cursor:pointer;font-size:18px;line-height:1}
.vzf-clear:hover{color:#fff;background:rgba(255,255,255,0.06)}
.vzf-nav{display:flex;flex-direction:column;gap:2px;border-left:1px solid rgba(255,255,255,0.08)}
.vzf-nav a{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:6px;padding:9px 0 9px 16px;margin-left:-1px;border-left:2px solid transparent;text-decoration:none;color:rgba(255,255,255,0.55);font-size:14.5px;font-weight:500;transition:color 200ms,border-color 200ms}
.vzf-nav a:hover{color:rgba(255,255,255,0.9)}
.vzf-nav a.on{color:#fff;border-left-color:#f0c949}
.vzf-nav a.dim{opacity:0.35}
.vzf-num{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;color:rgba(255,255,255,0.6)}
.vzf-nav a.on .vzf-num{color:#f0c949}
.vzf-cnt{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;color:rgba(255,255,255,0.6)}
.vzf-main{display:flex;flex-direction:column;gap:72px;min-width:0}
.vzf-group{scroll-margin-top:110px}
.vzf-ghead{display:flex;flex-direction:column;gap:8px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.1)}
.vzf-ghead .vzf-num{font-size:12px;letter-spacing:0.2em;color:#f0c949}
.vzf-ghead h2{margin:0;font-size:clamp(26px,3vw,34px);font-weight:600;letter-spacing:-0.025em;line-height:1.1;color:#fff}
.vzf-ghead p{margin:0;font-size:15.5px;color:rgba(255,255,255,0.55)}
.vzf-item{border-bottom:1px solid rgba(255,255,255,0.08)}
.vzf-q{width:100%;display:flex;align-items:center;gap:20px;padding:22px 4px;background:transparent;border:0;cursor:pointer;text-align:left;color:rgba(255,255,255,0.84);font-size:17.5px;font-weight:600;letter-spacing:-0.01em;line-height:1.4;transition:color 200ms}
.vzf-q:hover,.vzf-item.open .vzf-q{color:#fff}
.vzf-q:focus-visible{outline:2px solid rgba(240,201,73,0.6);outline-offset:2px;border-radius:8px}
.vzf-q span:first-child{flex:1;min-width:0;text-wrap:pretty}
.vzf-pm{width:32px;height:32px;flex-shrink:0;border-radius:999px;display:grid;place-items:center;position:relative;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);transition:background 240ms,border-color 240ms}
.vzf-pm i{position:absolute;width:12px;height:2px;border-radius:2px;background:rgba(255,255,255,0.55);transition:transform 280ms cubic-bezier(0.22,1,0.36,1),background 240ms}
.vzf-pm i+i{transform:rotate(90deg)}
.vzf-q:hover .vzf-pm{border-color:rgba(240,201,73,0.3)}
.vzf-item.open .vzf-pm{background:rgba(240,201,73,0.14);border-color:rgba(240,201,73,0.34)}
.vzf-item.open .vzf-pm i{background:#f0c949}
.vzf-item.open .vzf-pm i+i{transform:rotate(0deg)}
.vzf-a{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows 320ms cubic-bezier(0.22,1,0.36,1),visibility 0s linear 320ms}
.vzf-item.open .vzf-a{grid-template-rows:1fr;visibility:visible;transition:grid-template-rows 320ms cubic-bezier(0.22,1,0.36,1),visibility 0s}
@media (prefers-reduced-motion:reduce){.vzf-a,.vzf-item.open .vzf-a{transition:none}}
.vzf-a>div{overflow:hidden}
.vzf-a p{margin:0;padding:0 56px 24px 4px;max-width:720px;font-size:15.5px;line-height:1.7;color:rgba(255,255,255,0.62);text-wrap:pretty}
.vzf-a a{display:inline-flex;gap:6px;margin:-8px 0 24px 4px;color:#f0c949;text-decoration:underline;text-underline-offset:3px;font-size:14.5px;font-weight:600}
.vzf-a a:hover{color:#f6dfa1}
.vzf-empty{padding:40px 0;color:rgba(255,255,255,0.6);font-size:16px;line-height:1.6}
.vzf-empty a{color:#f0c949;text-decoration:underline;text-underline-offset:3px}
@media (max-width:900px){
.vzf{grid-template-columns:minmax(0,1fr);gap:28px}
.vzf-aside{position:static;gap:14px}
.vzf-nav{flex-direction:row;overflow-x:auto;border-left:0;gap:8px;padding-bottom:4px;scrollbar-width:none}
.vzf-nav::-webkit-scrollbar{display:none}
.vzf-nav a{display:flex;flex-shrink:0;gap:8px;padding:8px 14px;margin:0;border:1px solid rgba(255,255,255,0.1);border-radius:999px;font-size:13.5px;white-space:nowrap}
.vzf-nav a.on{border-color:rgba(240,201,73,0.45);background:rgba(240,201,73,0.1)}
.vzf-main{gap:56px}
.vzf-q{font-size:16.5px;padding:20px 0}
.vzf-a p{padding:0 0 22px 0}
.vzf-a a{margin-left:0}
}`;

const VyzorFAQ = () => {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(() => new Set([VYZOR_FAQ_GROUPS[0].items[0].q]));
  const [active, setActive] = React.useState(VYZOR_FAQ_GROUPS[0].id);

  const nq = vzfNorm(query.trim());
  const groups = VYZOR_FAQ_GROUPS.map((g) => ({
    ...g,
    shown: nq ? g.items.filter((i) => vzfNorm(i.q + " " + i.a).includes(nq)) : g.items,
  }));
  const total = groups.reduce((n, g) => n + g.shown.length, 0);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.gid); });
    }, { rootMargin: "-120px 0px -60% 0px" });
    document.querySelectorAll(".vzf-group").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nq]);

  const toggle = (q) => setOpen((s) => { const n = new Set(s); n.has(q) ? n.delete(q) : n.add(q); return n; });
  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById("faq-" + id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  };

  return (
    <section id="faq" className="vzf">
      <style>{vzfCss}</style>
      <aside className="vzf-aside">
        <div className="vzf-search">
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une question…" aria-label="Rechercher dans la FAQ" />
          {query && <button type="button" className="vzf-clear" onClick={() => setQuery("")} aria-label="Effacer la recherche">×</button>}
          <p className="vzf-sr" role="status">{nq ? (total === 0 ? "Aucune question trouvée" : total + (total > 1 ? " questions trouvées" : " question trouvée")) : ""}</p>
        </div>
        <nav className="vzf-nav" aria-label="Thèmes de la FAQ">
          {groups.map((g, i) => (
            <a key={g.id} href={"#faq-" + g.id} onClick={(e) => goTo(e, g.id)}
              className={(active === g.id && g.shown.length ? "on " : "") + (g.shown.length ? "" : "dim")}>
              <span>{g.title}</span>
              <span className="vzf-cnt">{g.shown.length}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="vzf-main">
        {total === 0 && (
          <p className="vzf-empty">Aucune question ne correspond à « {query} ».<br />Écrivez-nous à <a href="mailto:contact@vyzor.fr">contact@vyzor.fr</a>, nous vous répondons rapidement.</p>
        )}
        {groups.map((g, gi) => g.shown.length > 0 && (
          <div key={g.id} id={"faq-" + g.id} data-gid={g.id} className="vzf-group">
            <div className="vzf-ghead">
              <h2>{g.title}</h2>
              <p>{g.desc}</p>
            </div>
            {g.shown.map((item) => {
              const isOpen = open.has(item.q);
              const pid = "vzf-a-" + g.id + "-" + g.items.indexOf(item);
              return (
                <div key={item.q} className={"vzf-item" + (isOpen ? " open" : "")}>
                  <button type="button" className="vzf-q" onClick={() => toggle(item.q)} aria-expanded={!!isOpen} aria-controls={pid}>
                    <span>{item.q}</span>
                    <span className="vzf-pm" aria-hidden="true"><i></i><i></i></span>
                  </button>
                  <div className="vzf-a" id={pid}>
                    <div>
                      <p>{item.a}</p>
                      {item.link && <a href={item.link.href}>{item.link.label} →</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { VyzorFAQ, VYZOR_FAQ, VYZOR_FAQ_GROUPS });
