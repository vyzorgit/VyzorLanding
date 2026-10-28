// legal-glass.jsx — Pages légales VYZOR (Mentions légales / CGU + Confidentialité)
// DA cohérente : fond #0a1026, accent or #f0c949, surfaces glass, typo Inter + JetBrains Mono.
//
// 14/10/2026 — chantier conformité web (brief audit/briefs/2026-10-14-conformite-web.md) :
//   - mentions légales complétées selon l'article 6-III de la LCEN (loi 2004-575) ;
//   - politique de confidentialité limitée à ce que le SITE VITRINE traite réellement
//     (candidature bêta via Web3Forms, journaux de l'hébergeur) ; l'application
//     (espace client) a sa propre politique, remise aux clients avec leur accès ;
//   - 22/10/2026 : l'adresse de l'application n'apparaît plus sur le site (communiquée aux seuls clients) ;
//   - section « Cookies et traceurs » ancrée (#cookies) avec l'inventaire exact ;
//   - toute information légale inconnue est marquée [À REMPLIR] ou [À CONFIRMER] : ne jamais
//     inventer de nom, numéro, adresse ou hébergeur.

const VZ_LEGAL = {
  gold: "#f0c949",
  text: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.40)",
  subtle: "rgba(255,255,255,0.08)",
};

// —— Primitives de rendu ——
const LegalArticle = ({ n, id, title, children }) => (
  <section id={id} className="vz-reveal" style={{ marginBottom: 40, scrollMarginTop: 120 }}>
    <h2 style={{
      fontSize: "clamp(20px, 2.4vw, 26px)", fontWeight: 600, lineHeight: 1.2,
      color: "#fff", margin: "0 0 18px", letterSpacing: "-0.02em",
      display: "flex", alignItems: "baseline", gap: 14,
    }}>
      {n != null && (
        <span aria-hidden="true" style={{
          fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 13, fontWeight: 500, color: VZ_LEGAL.gold,
          letterSpacing: "0.08em", flexShrink: 0,
        }}>{n}</span>
      )}
      <span>{title}</span>
    </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
  </section>
);

const P = ({ children }) => (
  <p style={{ fontSize: 15.5, lineHeight: 1.72, color: VZ_LEGAL.muted, margin: 0, textWrap: "pretty" }}>
    {children}
  </p>
);

const Sub = ({ children }) => (
  <h3 style={{ fontSize: 16, fontWeight: 600, color: VZ_LEGAL.text, margin: "6px 0 -4px" }}>{children}</h3>
);

const Bullets = ({ items }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: "2px 0", display: "flex", flexDirection: "column", gap: 11 }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: "flex", gap: 12, fontSize: 15.5, lineHeight: 1.68, color: VZ_LEGAL.muted }}>
        <span aria-hidden="true" style={{
          flexShrink: 0, width: 6, height: 6, borderRadius: 2, marginTop: 9,
          background: VZ_LEGAL.gold, opacity: 0.7,
        }} />
        <span style={{ textWrap: "pretty" }}>{it}</span>
      </li>
    ))}
  </ul>
);

const Strong = ({ children }) => <strong style={{ color: VZ_LEGAL.text, fontWeight: 600 }}>{children}</strong>;
// Liens : soulignés (WCAG 1.4.1 — la couleur seule ne suffit pas à distinguer un lien).
const A = ({ href, children, external = false }) => (
  <a
    href={href}
    style={{ color: VZ_LEGAL.gold, textDecoration: "underline", textUnderlineOffset: 3 }}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
    {external ? <span className="sr-only"> (nouvel onglet)</span> : null}
  </a>
);
const Mail = () => <A href="mailto:contact@vyzor.fr">contact@vyzor.fr</A>;
// Information légale manquante : jamais inventée, toujours signalée.
const Todo = ({ children }) => (
  <mark style={{
    background: "rgba(240,201,73,0.14)", color: VZ_LEGAL.gold, borderRadius: 4,
    padding: "0 4px", fontWeight: 600,
  }}>[{children}]</mark>
);

const LegalShell = ({ children }) => (
  <div className="vz-page-pad" style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(24px, 6vw, 96px)" }}>
    <div style={{
      position: "relative",
      borderRadius: 28,
      padding: "clamp(32px, 5vw, 64px)",
      background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
      border: `1px solid ${VZ_LEGAL.subtle}`,
      backdropFilter: "blur(24px) saturate(140%)",
      WebkitBackdropFilter: "blur(24px) saturate(140%)",
      boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 100px -40px rgba(0,0,0,0.6)",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(240,201,73,0.45), transparent)",
      }} />
      {children}
      <style>{`
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>
    </div>
  </div>
);

// ============ MENTIONS LÉGALES & CGU ============
const MentionsLegales = () => (
  <LegalShell>
    <LegalArticle n="01" id="editeur" title="Mentions légales (article 6-III de la loi 2004-575 du 21 juin 2004)">
      <Sub>Éditeur du Site</Sub>
      <P>
        Le site <Strong>www.vyzor.fr</Strong> est édité par la société <Strong>VYZOR</Strong>, Société par
        Actions Simplifiée en cours de formation, au capital de{" "}
        <Todo>À REMPLIR : capital social</Todo>, immatriculée au Registre du commerce et des sociétés de{" "}
        <Todo>À REMPLIR : ville du greffe</Todo> sous le numéro <Todo>À REMPLIR : numéro RCS</Todo>,
        SIRET <Todo>À REMPLIR</Todo>, numéro de TVA intracommunautaire <Todo>À REMPLIR</Todo>.
      </P>
      <P>
        Siège social : <Strong>2 rue Huguette Schwartz, 75014 Paris</Strong>, France{" "}
        <Todo>À CONFIRMER : adresse reprise des anciennes pages légales</Todo>.
        Téléphone : <Todo>À REMPLIR : numéro de téléphone</Todo>. Courriel : <Mail />.
      </P>
      <Sub>Directeur de la publication</Sub>
      <P>Antoine CAYER, <Todo>À CONFIRMER : qualité</Todo>.</P>
      <Sub>Hébergement du site vitrine</Sub>
      <P>
        Vercel, Inc., 340 S Lemon Ave #4133, Walnut, California 91789, États-Unis — téléphone
        +1 559 288 7060 — <A href="https://vercel.com" external>vercel.com</A>.
      </P>
      <Sub>Hébergement de l'application et des données</Sub>
      <P>
        L'application VYZOR (espace client) et les données qu'elle traite sont hébergées
        par Google Cloud EMEA Limited (services Firebase), 70 Sir John Rogerson's Quay, Dublin 2, Irlande —
        téléphone <Todo>À REMPLIR</Todo> — serveurs situés dans l'Union européenne.
        {" "}<Todo>À CONFIRMER : Supabase, Inc. (base PostgreSQL) selon l'état de la production ; si utilisé, adresse et région</Todo>.
      </P>
      <Sub>Contact</Sub>
      <P>
        Pour toute question relative au Site ou à vos données : <Mail />. Voir aussi la{" "}
        <A href="/confidentialite">politique de confidentialité</A>.
      </P>
    </LegalArticle>

    <LegalArticle n="02" id="objet" title="Objet des CGU">
      <P>
        Les présentes Conditions Générales d'Utilisation encadrent l'accès et l'utilisation du site
        www.vyzor.fr par tout internaute (ci-après l'« Utilisateur »). La navigation sur le Site emporte
        acceptation des présentes CGU. L'utilisation de l'application VYZOR (espace client) est régie par
        ses propres conditions, remises aux clients avec leur accès, acceptées lors de la création du compte
        et consultables à tout moment dans l'application ; elles sont aussi communiquées sur demande à <Mail />.
      </P>
    </LegalArticle>

    <LegalArticle n="03" id="acces" title="Accès au Site et aux services">
      <P>
        L'Éditeur s'efforce de permettre l'accès au Site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure
        ou d'un événement hors du contrôle de l'Éditeur, et sous réserve des éventuelles pannes et interventions de
        maintenance nécessaires au bon fonctionnement du Site et des services. La responsabilité de l'Éditeur ne saurait
        être engagée en cas d'impossibilité d'accès à ce Site et/ou d'utilisation des services.
      </P>
      <P>
        Les calculateurs proposés sur le Site (BFR, point mort, fiscal, reporting, valorisation) fournissent des
        estimations indicatives à partir des valeurs saisies par l'Utilisateur. Elles ne constituent ni un conseil
        financier, ni un conseil juridique ou fiscal. Les valeurs saisies ne sont pas transmises à l'Éditeur.
      </P>
    </LegalArticle>

    <LegalArticle n="04" id="propriete" title="Propriété intellectuelle">
      <P>
        La structure générale du Site, ainsi que les textes, graphiques, images, sons, algorithmes, bases de données
        et vidéos la composant, sont la propriété de l'Éditeur ou de ses partenaires. Toute représentation, reproduction,
        exploitation partielle ou totale des contenus et services proposés par le Site, par quelque procédé que ce soit,
        sans l'autorisation préalable et par écrit de l'Éditeur, est strictement interdite et serait susceptible de
        constituer une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </P>
    </LegalArticle>

    <LegalArticle n="05" id="responsabilite" title="Limitation de responsabilité">
      <P>
        Les informations contenues sur ce Site sont aussi précises que possible et le Site est périodiquement remis à jour.
        Toutefois, il peut contenir des inexactitudes, des omissions ou des lacunes. Les services de VYZOR (notamment en
        phase de Bêta) constituent des outils d'aide à la décision. L'Utilisateur, particulièrement s'il agit en tant que
        professionnel du chiffre, conserve l'entière responsabilité de l'exploitation des données et des conseils financiers
        prodigués à ses propres clients.
      </P>
      <P>
        Le Site contient des liens vers des sites tiers (prise de rendez-vous, profils professionnels). L'Éditeur
        n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu et à leurs pratiques
        en matière de données personnelles.
      </P>
    </LegalArticle>

    <LegalArticle n="06" id="donnees" title="Données personnelles et cookies">
      <P>
        Les traitements de données personnelles réalisés via le Site sont décrits dans la{" "}
        <A href="/confidentialite">politique de confidentialité</A>. Le Site ne dépose aucun cookie ni traceur
        soumis à consentement (voir la section{" "}
        <A href="/confidentialite#cookies">Cookies et traceurs</A>).
      </P>
    </LegalArticle>

    <LegalArticle n="07" id="droit" title="Droit applicable et juridiction compétente">
      <P>
        Les présentes CGU sont régies par la loi française. En cas de litige n'ayant pu faire l'objet d'un accord à
        l'amiable, les tribunaux du ressort de la Cour d'appel de Paris seront seuls compétents, sous réserve des
        règles de compétence impératives applicables aux consommateurs.
      </P>
    </LegalArticle>
  </LegalShell>
);

// ============ POLITIQUE DE CONFIDENTIALITÉ (site vitrine) ============
const PolitiqueConfidentialite = () => (
  <LegalShell>
    <LegalArticle n="01" id="preambule" title="Préambule et champ d'application">
      <P>
        La présente politique décrit les traitements de données à caractère personnel réalisés par VYZOR via le
        site vitrine <Strong>www.vyzor.fr</Strong>, dans le respect du Règlement (UE) 2016/679 (RGPD) et de la loi
        Informatique et Libertés du 6 janvier 1978 modifiée.
      </P>
      <P>
        L'application VYZOR (espace client), qui traite des données comptables et financières, dispose de sa
        propre politique de confidentialité, remise aux clients avec leur accès et consultable à tout moment
        dans l'application ; elle est aussi communiquée sur demande à <Mail />.
      </P>
    </LegalArticle>

    <LegalArticle n="02" id="responsable" title="Responsable du traitement">
      <P>
        Le responsable du traitement est la société VYZOR, Société par Actions Simplifiée en cours de formation
        (RCS <Todo>À REMPLIR</Todo>), dont le siège social est
        situé 2 rue Huguette Schwartz, 75014 Paris, France <Todo>À CONFIRMER : adresse</Todo>. Contact : <Mail />, téléphone{" "}
        <Todo>À REMPLIR</Todo>.
      </P>
      <P>
        Aucun délégué à la protection des données n'est désigné ; toute demande relative à vos données
        s'adresse à <Mail />.
      </P>
    </LegalArticle>

    <LegalArticle n="03" id="donnees" title="Données collectées sur le Site">
      <Bullets items={[
        <span><Strong>Candidature à la bêta</Strong> (formulaire « Réservez votre place ») : nom et prénom, adresse email professionnelle, nom de l'entreprise. Ces trois champs sont obligatoires ; aucun autre champ n'est collecté.</span>,
        <span><Strong>Demandes par courriel</Strong> adressées à contact@vyzor.fr : votre adresse email et le contenu de votre message.</span>,
        <span><Strong>Prise de rendez-vous</Strong> : après l'envoi du formulaire bêta, le lien « Choisir mon créneau » renvoie vers Calendly, service tiers qui collecte vos données sur son propre site, selon sa propre politique.</span>,
        <span><Strong>Journaux techniques de l'hébergeur</Strong> : adresse IP, type de navigateur, page demandée et horodatage, conservés par Vercel à des fins de sécurité et de fonctionnement du service.</span>,
        <span><Strong>Calculateurs</Strong> : les valeurs saisies sont traitées dans votre navigateur et ne sont pas transmises à VYZOR. Pour afficher le résultat détaillé, votre adresse email professionnelle est demandée ; seuls l'email et la page d'origine sont enregistrés.</span>,
        <span><Strong>Inscription aux guides</Strong> (formulaire des pages Guides) : adresse email professionnelle et page d'origine.</span>,
      ]} />
      <P>
        Le Site ne collecte ni numéro de téléphone, ni données financières, ni données de mesure d'audience.
      </P>
    </LegalArticle>

    <LegalArticle n="04" id="finalites" title="Finalités et bases légales">
      <Bullets items={[
        <span><Strong>Traiter votre candidature à la bêta et vous recontacter</Strong> — base légale : mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).</span>,
        <span><Strong>Répondre à vos demandes</Strong> envoyées par courriel — base légale : mesures précontractuelles ou intérêt légitime de VYZOR à répondre aux personnes qui la sollicitent (article 6.1.f).</span>,
        <span><Strong>Assurer la sécurité et le bon fonctionnement du Site</Strong> (journaux techniques) — base légale : intérêt légitime (article 6.1.f).</span>,
        <span><Strong>Afficher le Site</Strong> (chargement des polices) — base légale : intérêt légitime (article 6.1.f).</span>,
        <span><Strong>Vous envoyer les guides et la lettre d'information de VYZOR</Strong> (pilotage financier des entreprises) à l'adresse professionnelle laissée sur un calculateur ou une page Guides — base légale : intérêt légitime de VYZOR à informer les professionnels sur des sujets en rapport avec leur activité (article 6.1.f), avec information au moment de la collecte. Vous pouvez vous y opposer à tout moment, sans motif, par simple email à contact@vyzor.fr ou via le lien présent dans chaque envoi.</span>,
      ]} />
    </LegalArticle>

    <LegalArticle n="05" id="destinataires" title="Destinataires, sous-traitants et transferts hors UE">
      <P>Les données du Site sont accessibles à l'équipe fondatrice de VYZOR et aux prestataires suivants :</P>
      <Bullets items={[
        <span><Strong>Vercel, Inc.</Strong> (États-Unis) : hébergement du Site et journaux techniques. Transfert hors UE encadré par les clauses contractuelles types de la Commission européenne <Todo>À CONFIRMER : certification Data Privacy Framework</Todo>.</span>,
        <span><Strong>Web3Forms</Strong> <Todo>À REMPLIR : raison sociale, pays</Todo> : acheminement des candidatures bêta et des adresses laissées sur les calculateurs et les guides vers la boîte email de VYZOR, sans exploitation pour son propre compte. <Todo>À CONFIRMER : localisation des serveurs et garanties de transfert</Todo>.</span>,
        <span><Strong>Calendly, LLC</Strong> (États-Unis) : uniquement si vous prenez rendez-vous, sur le site de Calendly.</span>,
        <span><Strong>Fournisseur de messagerie de VYZOR</Strong> <Todo>À REMPLIR : nom du service de messagerie recevant contact@vyzor.fr</Todo> : réception et stockage des candidatures et des courriels.</span>,
      ]} />
      <P>
        Les bibliothèques techniques (React) et les polices de caractères du Site sont hébergées sur le Site
        lui-même : leur chargement ne transmet aucune donnée à un tiers. Aucune donnée n'est vendue ni cédée à des tiers.
      </P>
    </LegalArticle>

    <LegalArticle n="06" id="durees" title="Durées de conservation">
      <Bullets items={[
        <span><Strong>Candidatures bêta et échanges par courriel</Strong> : 3 ans à compter du dernier contact de votre part, puis suppression.</span>,
        <span><Strong>Inscrits aux guides</Strong> : jusqu'à votre opposition, ou 3 ans sans contact de votre part, puis suppression.</span>,
        <span><Strong>Comptes créés à l'issue de la bêta</Strong> : durées définies par la politique de confidentialité de l'application.</span>,
        <span><Strong>Journaux techniques de l'hébergeur</Strong> : 12 mois au plus <Todo>À CONFIRMER : durée de rétention effective chez Vercel</Todo>.</span>,
      ]} />
    </LegalArticle>

    <LegalArticle n="07" id="droits" title="Vos droits">
      <P>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition
        et de portabilité de vos données, ainsi que du droit de définir des directives relatives au sort de vos
        données après votre décès. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout
        moment, sans que cela n'affecte la licéité du traitement effectué avant le retrait.
      </P>
      <P>
        Pour exercer ces droits, écrivez à <Mail /> ou par courrier au siège social. Nous répondons dans un délai
        d'un (1) mois à compter de la réception de la demande ; un justificatif d'identité peut être demandé en cas
        de doute raisonnable sur l'identité du demandeur.
      </P>
      <P>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
        Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris
        Cedex 07 — <A href="https://www.cnil.fr" external>www.cnil.fr</A>.
      </P>
    </LegalArticle>

    <LegalArticle n="08" id="securite" title="Sécurité">
      <P>
        Le Site est servi exclusivement en HTTPS, avec des en-têtes de sécurité (politique de sécurité du contenu,
        HSTS, interdiction d'intégration dans un cadre tiers). Le Site vitrine ne traite aucune donnée financière :
        celles-ci sont traitées uniquement dans l'application, dont les mesures de sécurité sont décrites sur la
        page <A href="/securite">Sécurité</A> et dans sa politique de confidentialité.
      </P>
    </LegalArticle>

    <LegalArticle n="09" id="cookies" title="Cookies et traceurs">
      <P>
        Le Site <Strong>ne dépose aucun cookie</Strong>, n'écrit rien dans le stockage local de votre navigateur et
        n'utilise aucun outil de mesure d'audience ni de publicité (ni Google Analytics, ni pixel, ni bouton de
        partage traçant). Inventaire des ressources tierces chargées par le Site :
      </P>
      <Bullets items={[
        <span><Strong>api.web3forms.com</Strong> : appelé uniquement lorsque vous envoyez le formulaire de candidature bêta ou une adresse email sur un calculateur ou une page Guides.</span>,
        <span><Strong>calendly.com, linkedin.com</Strong> : simples liens sortants, aucun script de ces services n'est chargé sur le Site.</span>,
      ]} />
      <P>
        Aucune de ces ressources n'est un traceur soumis à consentement au sens de l'article 82 de la loi
        Informatique et Libertés et des lignes directrices de la CNIL. C'est pourquoi aucun bandeau de consentement
        n'est affiché. Si VYZOR venait à utiliser un traceur soumis à consentement, un bandeau permettant de
        l'accepter ou de le refuser aussi simplement serait ajouté et la présente politique mise à jour.
      </P>
      <P>
        L'application VYZOR (espace client) utilise uniquement des mécanismes strictement nécessaires à la
        connexion et aux préférences d'affichage ; son inventaire figure dans sa propre politique.
      </P>
    </LegalArticle>

    <LegalArticle n="10" id="maj" title="Mise à jour de la politique">
      <P>
        VYZOR peut modifier la présente politique à tout moment. En cas de modification substantielle, les personnes
        concernées en sont informées par courriel lorsque VYZOR dispose de leur adresse. La date de dernière mise à
        jour est indiquée en tête du présent document.
      </P>
      <P>
        Cette page est une information sur nos pratiques et ne constitue pas un conseil juridique.
      </P>
    </LegalArticle>
  </LegalShell>
);

Object.assign(window, { MentionsLegales, PolitiqueConfidentialite });
