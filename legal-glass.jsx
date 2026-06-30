// legal-glass.jsx — Pages légales VYZOR (Mentions légales / CGU + Confidentialité)
// DA cohérente : fond #070a14, accent or #f0c949, surfaces glass, typo Inter + JetBrains Mono.

const VZ_LEGAL = {
  gold: "#f0c949",
  text: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.40)",
  subtle: "rgba(255,255,255,0.08)",
};

// —— Primitives de rendu ——
const LegalArticle = ({ n, title, children }) => (
  <section className="vz-reveal" style={{ marginBottom: 40 }}>
    <h2 style={{
      fontSize: "clamp(20px, 2.4vw, 26px)", fontWeight: 600, lineHeight: 1.2,
      color: "#fff", margin: "0 0 18px", letterSpacing: "-0.02em",
      display: "flex", alignItems: "baseline", gap: 14,
    }}>
      {n != null && (
        <span style={{
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
const Mail = () => <a href="mailto:admin@vyzor.fr" style={{ color: VZ_LEGAL.gold, textDecoration: "none" }}>admin@vyzor.fr</a>;

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
    </div>
  </div>
);

// ============ MENTIONS LÉGALES & CGU ============
const MentionsLegales = () => (
  <LegalShell>
    <LegalArticle n="01" title="Mentions légales">
      <Sub>Éditeur du Site</Sub>
      <P>
        Le présent site web, accessible à l'URL <Strong>www.vyzor.fr</Strong>, est édité par Antoine CAYER,
        agissant pour le compte de la société VYZOR, Société par Actions Simplifiée (SAS) en cours de formation.
        Adresse de domiciliation : 2 rue Huguette Schwartz, 75014 Paris. Directeur de la publication : Antoine CAYER.
        Contact : <Mail />.
      </P>
      <Sub>Hébergement</Sub>
      <P>
        Le Site est hébergé par la société Vercel, Inc., dont le siège social est situé au 340 S Lemon Ave #4133,
        Walnut, California 91789, États-Unis. Les données applicatives et financières sont hébergées séparément
        sur des serveurs situés au sein de l'Union Européenne.
      </P>
    </LegalArticle>

    <LegalArticle n="02" title="Objet des CGU">
      <P>
        Les présentes Conditions Générales d'Utilisation ont pour objet d'encadrer l'accès et l'utilisation du Site
        et des services VYZOR par tout internaute (ci-après l'« Utilisateur »). La navigation sur le Site emporte
        acceptation sans réserve des présentes CGU.
      </P>
    </LegalArticle>

    <LegalArticle n="03" title="Accès au Site et aux services">
      <P>
        L'Éditeur s'efforce de permettre l'accès au Site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure
        ou d'un événement hors du contrôle de l'Éditeur, et sous réserve des éventuelles pannes et interventions de
        maintenance nécessaires au bon fonctionnement du Site et des services. La responsabilité de l'Éditeur ne saurait
        être engagée en cas d'impossibilité d'accès à ce Site et/ou d'utilisation des services.
      </P>
    </LegalArticle>

    <LegalArticle n="04" title="Propriété intellectuelle">
      <P>
        La structure générale du Site, ainsi que les textes, graphiques, images, sons, algorithmes, bases de données
        et vidéos la composant, sont la propriété de l'Éditeur ou de ses partenaires. Toute représentation, reproduction,
        exploitation partielle ou totale des contenus et services proposés par le Site, par quelque procédé que ce soit,
        sans l'autorisation préalable et par écrit de l'Éditeur, est strictement interdite et serait susceptible de
        constituer une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </P>
    </LegalArticle>

    <LegalArticle n="05" title="Limitation de responsabilité">
      <P>
        Les informations contenues sur ce Site sont aussi précises que possible et le Site est périodiquement remis à jour.
        Toutefois, il peut contenir des inexactitudes, des omissions ou des lacunes. Les services de VYZOR (notamment en
        phase de Bêta) constituent des outils d'aide à la décision. L'Utilisateur, particulièrement s'il agit en tant que
        professionnel du chiffre, conserve l'entière responsabilité de l'exploitation des données et des conseils financiers
        prodigués à ses propres clients.
      </P>
    </LegalArticle>

    <LegalArticle n="06" title="Droit applicable et juridiction compétente">
      <P>
        Les présentes CGU sont régies par la loi française. En cas de litige n'ayant pu faire l'objet d'un accord à
        l'amiable, les tribunaux du ressort de la Cour d'Appel de Paris seront seuls compétents.
      </P>
    </LegalArticle>
  </LegalShell>
);

// ============ POLITIQUE DE CONFIDENTIALITÉ ============
const PolitiqueConfidentialite = () => (
  <LegalShell>
    <LegalArticle n="01" title="Préambule et champ d'application">
      <P>
        La société VYZOR (en cours de formation) accorde une importance majeure à la confidentialité et à la sécurité
        des données à caractère personnel et des données financières traitées via sa plateforme. La présente politique
        s'inscrit dans le strict respect de la Loi Informatique et Libertés du 6 janvier 1978 modifiée et du
        Règlement (UE) 2016/679 (RGPD).
      </P>
    </LegalArticle>

    <LegalArticle n="02" title="Le responsable du traitement">
      <P>
        Le responsable du traitement des données collectées via le Site est la société VYZOR, Société par Actions
        Simplifiée en cours de formation, dont le siège social est situé au 2 rue Huguette Schwartz, 75014 Paris.
        Pour toute question relative à la gestion de vos données, vous pouvez nous contacter à l'adresse suivante : <Mail />.
      </P>
    </LegalArticle>

    <LegalArticle n="03" title="Nature des données collectées">
      <P>Dans le cadre de l'exploitation de la plateforme, VYZOR est amenée à collecter :</P>
      <Bullets items={[
        <span><Strong>Données d'identification</Strong> : nom, prénom, adresse email professionnelle, numéro de téléphone.</span>,
        <span><Strong>Données professionnelles</Strong> : nom du cabinet d'expertise comptable, fonction, nombre de collaborateurs, logiciel de production comptable utilisé.</span>,
        <span><Strong>Données financières et d'exploitation</Strong> : Fichiers d'Écritures Comptables (FEC), données de facturation et indicateurs de performance (KPIs) des clients de l'Utilisateur.</span>,
        <span><Strong>Données de navigation</Strong> : adresse IP, type de navigateur, pages visitées, durée de session (collectées via cookies analytiques, cf. Article 9).</span>,
      ]} />
    </LegalArticle>

    <LegalArticle n="04" title="Finalités et bases légales">
      <P>Les traitements mis en œuvre répondent aux finalités suivantes :</P>
      <Bullets items={[
        <span><Strong>Exécution du contrat</Strong> (ou mesures précontractuelles) : création du compte utilisateur, accès à l'application, génération des tableaux de bord automatisés, support technique.</span>,
        <span><Strong>Intérêt légitime</Strong> : amélioration de l'interface utilisateur, correction de bugs (debugging), statistiques d'audience du Site.</span>,
        <span><Strong>Consentement</Strong> : envoi de newsletters, communications marketing, dépôt de cookies non essentiels. L'Utilisateur peut retirer son consentement à tout moment sans que cela n'affecte la licéité du traitement fondé sur le consentement donné avant le retrait de celui-ci.</span>,
      ]} />
    </LegalArticle>

    <LegalArticle n="05" title="Sécurité et protection des modèles d'IA">
      <P>
        VYZOR met en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir un niveau de
        sécurité adapté au risque.
      </P>
      <P>
        <Strong>Clause stricte relative à l'Intelligence Artificielle</Strong> : VYZOR s'engage formellement. Aucune donnée
        financière (FEC, bilans, liasses) importée par l'Utilisateur n'est, ni ne sera, utilisée pour entraîner des modèles
        de langages (LLM) publics ou des intelligences artificielles partagées avec des tiers. Les environnements de calcul
        sont isolés.
      </P>
      <P>
        <Strong>Zero Data Retention (ZDR)</Strong> : les appels API vers les fournisseurs de modèles de langage sont effectués
        avec les options de non-rétention des données lorsque celles-ci sont disponibles. Cela signifie que les fournisseurs
        de LLM ne conservent pas les données transmises par VYZOR après le traitement de chaque requête.
      </P>
    </LegalArticle>

    <LegalArticle n="06" title="Sous-traitants et transfert de données">
      <P>Dans le cadre de l'exploitation de la plateforme, VYZOR fait appel aux sous-traitants suivants :</P>
      <Bullets items={[
        <span><Strong>Hébergement de l'application et des données financières</Strong> : Google Firebase (Google Cloud Platform), avec une configuration ciblant les régions de l'Union Européenne.</span>,
        <span><Strong>Hébergement du site vitrine</Strong> : Vercel, Inc. (serveurs pouvant être situés hors UE, transferts encadrés par les clauses contractuelles types). Le site vitrine ne collecte pas de données financières.</span>,
        <span><Strong>Fournisseurs de modèles de langage (LLM)</Strong> : Anthropic (API Claude) et/ou OpenAI (API GPT), utilisés exclusivement en inférence (pas d'entraînement). Les données sont transmises via API sécurisée avec option Zero Data Retention activée.</span>,
        <span><Strong>Services bancaires</Strong> : Qonto (gestion du compte professionnel de la société).</span>,
      ]} />
      <P>
        Tous les sous-traitants de VYZOR sont soumis à des obligations de confidentialité et de sécurité au moins aussi
        strictes que celles de la présente politique. En cas de transfert de données hors de l'Union Européenne, VYZOR
        s'assure que des garanties appropriées sont mises en place (clauses contractuelles types de la Commission européenne,
        ou décision d'adéquation).
      </P>
    </LegalArticle>

    <LegalArticle n="07" title="Durée de conservation">
      <Bullets items={[
        <span><Strong>Données prospects</Strong> : 3 ans à compter du dernier contact émanant du prospect.</span>,
        <span><Strong>Données clients (comptes actifs)</Strong> : pendant toute la durée de la relation contractuelle, puis archivées pour une durée de 5 ans (prescription légale).</span>,
        <span><Strong>Données financières (FEC)</Strong> : conservées uniquement le temps nécessaire à la génération du tableau de bord ou supprimées immédiatement sur demande.</span>,
        <span><Strong>Cookies</Strong> : durée maximale de 13 mois conformément aux recommandations de la CNIL.</span>,
      ]} />
    </LegalArticle>

    <LegalArticle n="08" title="Droits des personnes concernées">
      <P>
        Vous disposez d'un droit d'accès, de rectification, d'effacement (droit à l'oubli), de limitation, de portabilité
        de vos données et du droit de vous opposer à leur traitement. Vous disposez également du droit de retirer votre
        consentement à tout moment pour les traitements fondés sur celui-ci.
      </P>
      <P>
        Pour exercer ces droits, adressez votre demande à : <Mail />. Nous nous engageons à répondre dans un délai d'un
        (1) mois à compter de la réception de la demande. En cas de litige, vous pouvez introduire une réclamation auprès
        de la CNIL (www.cnil.fr).
      </P>
    </LegalArticle>

    <LegalArticle n="09" title="Cookies et traceurs">
      <P>
        Le Site utilise des cookies, c'est-à-dire de petits fichiers texte déposés sur votre terminal lors de la
        consultation du Site. Les cookies utilisés se répartissent en deux catégories :
      </P>
      <Bullets items={[
        <span><Strong>Cookies strictement nécessaires</Strong> : ils permettent la navigation sur le Site et l'utilisation de ses fonctionnalités essentielles (authentification, sécurité, préférences de session). Ces cookies ne nécessitent pas votre consentement.</span>,
        <span><Strong>Cookies analytiques</Strong> : ils permettent de mesurer l'audience du Site et d'améliorer l'expérience utilisateur. Ces cookies sont soumis à votre consentement préalable.</span>,
      ]} />
      <P>
        Vous pouvez à tout moment gérer vos préférences via le bandeau de gestion des cookies affiché lors de votre première
        visite, ou en modifiant les paramètres de votre navigateur. Le refus des cookies analytiques n'a aucune incidence
        sur votre accès au Site. Durée maximale des cookies : 13 mois conformément aux recommandations de la CNIL ; les
        informations collectées sont conservées pour une durée maximale de 25 mois.
      </P>
    </LegalArticle>

    <LegalArticle n="10" title="Mise à jour de la politique">
      <P>
        VYZOR se réserve le droit de modifier la présente politique de confidentialité à tout moment. En cas de modification
        substantielle, les Utilisateurs seront informés par email ou par notification sur la plateforme. La date de dernière
        mise à jour est indiquée en tête du présent document.
      </P>
    </LegalArticle>
  </LegalShell>
);

Object.assign(window, { MentionsLegales, PolitiqueConfidentialite });
