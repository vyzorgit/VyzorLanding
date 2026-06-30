// faq-glass.jsx — Section "Questions fréquentes" (accordéon + filtres par catégorie)
//   Vocabulaire visuel identique au reste de la page :
//   or #f0c949, panneaux verre, titres Inter, badges dégradé or.
//   ⚠️ Le contenu DOIT rester synchronisé avec le JSON-LD FAQPage
//   présent dans le <head> de faq.html (Google exige la correspondance).
//   L'ordre du tableau définit aussi l'ordre des onglets (1re apparition).

const VYZOR_FAQ = [
  // ── Découvrir ──
  {
    cat: "Découvrir",
    q: "Qu'est-ce que VYZOR ?",
    a: "VYZOR est un copilote financier intelligent pour dirigeants, DAF et experts-comptables. Il transforme vos chiffres en pilotage clair : reporting automatisé, prévisions de trésorerie et alertes triées par impact en euros, le tout résumé dans un Vyzor Score lisible en quelques secondes.",
  },
  {
    cat: "Découvrir",
    q: "À qui s'adresse VYZOR ?",
    a: "Avant tout aux experts-comptables qui veulent offrir à leurs clients un véritable pilotage financier et se positionner en conseil à forte valeur ajoutée. VYZOR s'adresse aussi aux dirigeants de PME qui veulent piloter sans être experts-comptables, et aux DAF — internes, externalisés ou à temps partagé — qui veulent gagner du temps sur le reporting. L'outil est d'ailleurs co-conçu avec un panel de professionnels du chiffre qui l'utilisent au quotidien.",
  },
  {
    cat: "Découvrir",
    q: "Faut-il être expert en finance pour utiliser VYZOR ?",
    a: "Non. VYZOR est pensé pour être lisible en quelques secondes, même sans bagage financier : un score de santé synthétique, des alertes hiérarchisées par impact en euros et un export PDF prêt pour le conseil d'administration.",
  },

  // ── Connexion & données ──
  {
    cat: "Connexion & données",
    q: "Comment VYZOR se connecte-t-il à ma comptabilité ?",
    a: "VYZOR importe directement votre FEC (Fichier des Écritures Comptables) — sans aucune re-saisie — et peut aussi se connecter via API à vos outils comptables. Vos données sont structurées automatiquement pour produire reporting, prévisions et alertes.",
  },
  {
    cat: "Connexion & données",
    q: "Quels logiciels comptables se connectent à VYZOR ?",
    a: "VYZOR se connecte en lecture seule à Pennylane, MyUnisoft et Odoo. Les connexions bancaires et l'agrégateur Chift sont en préparation. Et si votre outil n'est pas encore couvert, l'import de fichiers (FEC, Excel, PDF de liasse fiscale) prend le relais.",
  },
  {
    cat: "Connexion & données",
    q: "Quels fichiers puis-je importer si je n'ai pas de connecteur ?",
    a: "Vous pouvez importer votre FEC, des fichiers Excel (.xlsx ou .csv) ou un PDF de liasse fiscale, directement depuis votre espace Documents. VYZOR les structure automatiquement pour calculer vos indicateurs, même sans connecteur.",
  },
  {
    cat: "Connexion & données",
    q: "VYZOR modifie-t-il ma comptabilité ?",
    a: "Non, jamais. VYZOR accède à vos données en lecture seule : il les lit pour les analyser, mais n'écrit, ne modifie ni ne supprime rien dans votre comptabilité.",
  },
  {
    cat: "Connexion & données",
    q: "À quelle fréquence mes données sont-elles mises à jour ?",
    a: "Vous synchronisez vos données d'un simple clic, quand vous le souhaitez. Une synchronisation automatique quotidienne est prévue prochainement.",
  },
  {
    cat: "Connexion & données",
    q: "Combien de temps pour être opérationnel après connexion ?",
    a: "Quelques minutes suffisent. Dès la première synchronisation, vos indicateurs et votre Vyzor Score sont calculés et prêts à être pilotés.",
  },
  {
    cat: "Connexion & données",
    q: "Comment déconnecter ou révoquer l'accès à mes données ?",
    a: "À tout moment. Un bouton « Déconnecter » dans votre espace Documents (ou la révocation depuis votre logiciel comptable) coupe l'accès immédiatement. L'historique déjà calculé reste à votre disposition.",
  },

  // ── Fonctionnalités ──
  {
    cat: "Fonctionnalités",
    q: "Quels indicateurs VYZOR calcule-t-il ?",
    a: "Plus de 35 indicateurs clés : chiffre d'affaires, EBE / EBITDA, BFR, DSO / DPO, trésorerie, ROE, ROCE, solvabilité… le tout synthétisé dans un Vyzor Score de 0 à 100 pour une lecture immédiate de votre santé financière.",
  },
  {
    cat: "Fonctionnalités",
    q: "C'est quoi le Vyzor Score ?",
    a: "C'est une note de santé financière composite, de 0 à 100, qui agrège quatre dimensions : rentabilité, solvabilité, liquidité et efficacité. Un repère unique pour situer l'entreprise en un coup d'œil et suivre sa progression dans le temps.",
  },
  {
    cat: "Fonctionnalités",
    q: "VYZOR me prévient-il en cas de problème ?",
    a: "Oui. VYZOR génère des alertes fondées sur des règles métier précises — sans approximation — et les trie par impact en euros, pour que vous traitiez d'abord ce qui pèse vraiment sur vos résultats.",
  },
  {
    cat: "Fonctionnalités",
    q: "VYZOR fait-il des prévisions de trésorerie (cash runway) ?",
    a: "Oui. VYZOR projette votre trésorerie, estime votre rythme de consommation (burn rate) et calcule votre autonomie financière (runway) en nombre de mois.",
  },
  {
    cat: "Fonctionnalités",
    q: "Puis-je comparer mes chiffres à ceux de mon secteur ?",
    a: "Oui. VYZOR situe vos indicateurs face à des benchmarks sectoriels issus des données publiques de l'INSEE (ESANE), pour savoir où vous vous positionnez par rapport à votre secteur.",
  },
  {
    cat: "Fonctionnalités",
    q: "VYZOR compare-t-il mon réalisé à un budget prévisionnel ?",
    a: "Oui. Vous importez votre budget prévisionnel (fichier Excel, par exercice) et VYZOR compare le réel au budget poste par poste, avec les mêmes formules de KPI. Sur les écrans d'indicateurs et la synthèse, un simple interrupteur permet de basculer la référence de comparaison entre N-1 et votre budget.",
  },
  {
    cat: "Fonctionnalités",
    q: "Que peut faire l'assistant IA exactement ?",
    a: "L'assistant répond à vos questions sur vos KPI, votre trésorerie et votre fiscalité (TVA, IS). Pour les sujets complexes, il réunit un « Conseil » de plusieurs expertises — analyste, trésorier, juriste et stratège — qui croisent leurs regards sur votre situation.",
  },

  // ── Cabinets comptables ──
  {
    cat: "Cabinets comptables",
    q: "Je gère un cabinet : puis-je suivre tous mes dossiers clients ?",
    a: "Oui. VYZOR offre une vue portefeuille multi-dossiers, avec l'état de synchronisation de chaque client visible en un coup d'œil, et sans limite de nombre de dossiers.",
  },
  {
    cat: "Cabinets comptables",
    q: "Mes clients voient-ils ce que je fais dans VYZOR ?",
    a: "Non. Les comptes cabinet et les comptes dirigeant sont indépendants et cloisonnés : votre travail d'analyse côté cabinet n'est pas visible par vos clients.",
  },
  {
    cat: "Cabinets comptables",
    q: "Puis-je inviter mes collaborateurs sur le compte cabinet ?",
    a: "Pas encore : la collaboration à plusieurs au sein d'un même cabinet est prévue pour le 3e trimestre 2026. En attendant, un cabinet pilote l'ensemble de ses dossiers depuis un compte unique.",
  },

  // ── Email & partage ──
  {
    cat: "Email & partage",
    q: "Puis-je envoyer un compte-rendu financier par email ?",
    a: "Oui. Depuis n'importe quel dashboard, VYZOR rédige pour vous, grâce à l'IA, un compte-rendu basé sur les indicateurs affichés. Vous le relisez, ajustez le ton (professionnel, chaleureux ou concis), puis l'envoyez depuis votre propre messagerie Gmail, avec le rapport PDF en pièce jointe. L'email apparaît dans vos « Envoyés », et la connexion reste révocable à tout moment.",
  },
  {
    cat: "Email & partage",
    q: "Faut-il connecter Gmail pour envoyer mes rapports ?",
    a: "Oui, pour envoyer vos rapports directement depuis votre propre messagerie. La connexion se fait en un clic et reste révocable à tout moment ; vos emails partent de votre adresse et apparaissent dans vos « Envoyés ».",
  },

  // ── Sécurité & confidentialité ──
  {
    cat: "Sécurité & confidentialité",
    q: "Mes données financières sont-elles en sécurité ?",
    a: "Oui. Vos données sont chiffrées et hébergées sur une infrastructure conforme SOC 2 et ISO 27001. Le détail de nos engagements de sécurité et de confidentialité est disponible sur notre page Sécurité.",
  },
  {
    cat: "Sécurité & confidentialité",
    q: "Où sont hébergées mes données ?",
    a: "Vos données sont hébergées dans l'Union européenne, sur une infrastructure cloud conforme aux standards SOC 2 et ISO 27001.",
  },
  {
    cat: "Sécurité & confidentialité",
    q: "Mes données nourrissent-elles l'IA ou sont-elles partagées ?",
    a: "Non. Vos données ne servent jamais à entraîner des modèles et ne sont pas partagées avec des tiers. Elles restent strictement rattachées à votre compte, et les noms sont pseudonymisés avant toute génération de contenu par l'IA.",
  },
  {
    cat: "Sécurité & confidentialité",
    q: "L'IA a-t-elle accès à toute ma comptabilité ?",
    a: "Non. L'assistant ne voit que les agrégats du dossier que vous consultez — jamais les écritures comptables brutes, ni les données d'un autre dossier.",
  },

  // ── Accès ──
  {
    cat: "Accès",
    q: "Comment accéder à VYZOR ?",
    a: "VYZOR est actuellement en accès anticipé (bêta), façonné avec ses premiers utilisateurs. Vous pouvez demander votre accès directement depuis le formulaire en bas de page.",
  },
  {
    cat: "Accès",
    q: "VYZOR est-il en bêta ?",
    a: "Oui. VYZOR est en accès anticipé, en co-construction avec ses premiers utilisateurs : vous profitez des dernières fonctionnalités et votre retour façonne directement le produit.",
  },
];

const VyzorFAQ = ({ showHeader = true } = {}) => {
  const gold = "#f0c949";
  const text = "rgba(255,255,255,0.92)";
  const muted = "rgba(255,255,255,0.55)";
  const subtle = "rgba(255,255,255,0.08)";
  const sans = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';
  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';

  // Catégories dans l'ordre d'apparition + onglet "Tout"
  const orderedCats = [];
  VYZOR_FAQ.forEach((i) => { if (!orderedCats.includes(i.cat)) orderedCats.push(i.cat); });
  const cats = ["Tout", ...orderedCats];
  const countFor = (c) => (c === "Tout" ? VYZOR_FAQ.length : VYZOR_FAQ.filter((i) => i.cat === c).length);

  const [activeCat, setActiveCat] = React.useState("Tout");
  const [open, setOpen] = React.useState(VYZOR_FAQ.length ? VYZOR_FAQ[0].q : null);

  const visible = activeCat === "Tout" ? VYZOR_FAQ : VYZOR_FAQ.filter((i) => i.cat === activeCat);

  const selectCat = (c) => { setActiveCat(c); setOpen(null); };

  return (
    <section id="faq" style={{ position: "relative", marginBottom: 112, scrollMarginTop: 110 }}>
      {/* Header éditorial (optionnel — masqué quand la page a déjà son H1) */}
      {showHeader && (
        <div style={{
          borderBottom: `1px solid ${subtle}`, paddingBottom: 24, marginBottom: 40,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
            fontWeight: 700, color: gold, marginBottom: 14,
          }}>F.A.Q.</div>
          <h2 style={{
            fontSize: 52, margin: 0, letterSpacing: "-0.03em", fontWeight: 600, lineHeight: 1.02,
            fontFamily: sans,
          }}>
            Questions fréquentes.<br />
            <span style={{ color: muted, fontWeight: 400, fontStyle: "italic" }}>Tout ce qu'il faut savoir.</span>
          </h2>
        </div>
      )}

      {/* Filtres par catégorie */}
      <div role="tablist" aria-label="Catégories de questions" style={{
        display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28,
      }}>
        {cats.map((c) => {
          const on = activeCat === c;
          return (
            <button
              key={c}
              className="vz-faq-tab"
              role="tab"
              aria-selected={on}
              onClick={() => selectCat(c)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "9px 16px", borderRadius: 999, cursor: "pointer",
                fontFamily: sans, fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
                color: on ? "#f6dfa1" : "rgba(255,255,255,0.62)",
                background: on ? "rgba(240,201,73,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${on ? "rgba(240,201,73,0.40)" : subtle}`,
                transition: "color 200ms ease, background 200ms ease, border-color 200ms ease",
              }}
            >
              <span>{c}</span>
              <span style={{
                fontFamily: mono, fontSize: 11, fontWeight: 500, lineHeight: 1,
                color: on ? gold : "rgba(255,255,255,0.38)",
              }}>{countFor(c)}</span>
            </button>
          );
        })}
      </div>

      {/* Accordéon */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} style={{
              background: isOpen
                ? "linear-gradient(140deg, #0e1015, #0c0d11)"
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${isOpen ? "rgba(240,201,73,0.28)" : subtle}`,
              borderRadius: 16, overflow: "hidden",
              transition: "border-color 240ms ease, background 240ms ease",
            }}>
              <button
                onClick={() => setOpen(isOpen ? null : item.q)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 18,
                  padding: "22px 26px", background: "transparent", border: "none",
                  cursor: "pointer", textAlign: "left", color: text,
                  fontFamily: sans,
                }}
              >
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 18, fontWeight: 600,
                  letterSpacing: "-0.01em", lineHeight: 1.35,
                  color: isOpen ? text : "rgba(255,255,255,0.82)",
                }}>{item.q}</span>
                {/* Indicateur +/− */}
                <span aria-hidden="true" style={{
                  width: 32, height: 32, flexShrink: 0, borderRadius: 999,
                  display: "grid", placeItems: "center", position: "relative",
                  background: isOpen ? "rgba(240,201,73,0.14)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isOpen ? "rgba(240,201,73,0.34)" : subtle}`,
                  transition: "background 240ms ease, border-color 240ms ease",
                }}>
                  <span style={{
                    position: "absolute", width: 12, height: 2, borderRadius: 2,
                    background: isOpen ? gold : muted, transition: "background 240ms ease",
                  }} />
                  <span style={{
                    position: "absolute", width: 12, height: 2, borderRadius: 2,
                    background: isOpen ? gold : muted,
                    transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
                    transition: "transform 280ms cubic-bezier(0.22,1,0.36,1), background 240ms ease",
                  }} />
                </span>
              </button>

              {/* Réponse — animation via grid 0fr/1fr */}
              <div style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 320ms cubic-bezier(0.22,1,0.36,1)",
              }}>
                <div style={{ overflow: "hidden" }}>
                  <p style={{
                    margin: 0, padding: "0 26px 24px", maxWidth: 760,
                    fontSize: 15.5, lineHeight: 1.65, color: muted,
                    fontFamily: sans,
                  }}>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

Object.assign(window, { VyzorFAQ, VYZOR_FAQ });
