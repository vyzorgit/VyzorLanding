# Charte éditoriale des guides vyzor.fr (SEO / GEO / inbound)

> Tout le SEO vit dans ce dépôt (VyzorLanding), jamais dans le dépôt de l'application (décision d'Antoine, 28/10/2026). Ce fichier est la référence des tâches « Guide SEO quotidien » et « Veille mots-clés SEO ».

> Charte provisoire rédigée par Claude le 27/10/2026 à partir de `identite.md`, de la landing et de la décision d'Antoine (publication 100 % automatique). Elle remplace le blocage « 5 questions de marque » pour les guides ; quand `brand.md` sera rempli, il prime et cette charte s'aligne dessus.

## Objectif

SEO et GEO (être trouvé dans Google **et cité par les IA** : ChatGPT, Claude, Perplexity, Google AI) sur les requêtes des dirigeants de PME en matière de pilotage financier, pour amener du trafic sur vyzor.fr et des emails via les calculateurs. Les emails arrivent dans admin@vyzor.fr (web3forms) ; récupération manuelle, aucun outil d'emailing (décision du 27/10). Jamais de scraping (décision du 08/10).

## Production

- Un guide publié **chaque jour**, 100 % automatique, par une tâche planifiée (décision du 27/10/2026, remplace la validation humaine du 08/10).
- Sources : ce dépôt, `content/guides/*.md` (format : `content/guides/README.md`) ; file des sujets : `content/queue.md`.
- Publication : commit sur `main` de VyzorLanding → mise en ligne Vercel → IndexNow.
- Garde-fous automatiques : le build refuse un guide incomplet (champs, 700 mots minimum, longueur des titres). La tâche s'arrête sans publier si une règle ci-dessous n'est pas tenue.

## Recherche de mots-clés (obligatoire avant chaque guide)

Unique objectif des guides (Antoine, 27/10/2026) : référencement de vyzor.fr et collecte d'emails. On écrit sur ce que les dirigeants cherchent, avec leurs mots.
- **Volumes réels** : Ubersuggest (compte gratuit admin@vyzor.fr, 3 recherches/jour, France locId 2250, langue fr). Budget : 2 recherches pour la veille du lundi, 1 par guide quotidien. Jamais d'option qui consomme les crédits mensuels.
- **Demande et formulations** : autocomplete Google (gratuit, via WebFetch sur suggestqueries.google.com), questions « comment / pourquoi / quel ».
- **Concurrence** : analyse des 5 premiers résultats (WebSearch). SERP tenue par des blogs d'éditeurs = faisable ; par l'officiel ou de gros médias = difficile.
- **Score** d'un sujet : demande 40 % + lien à un calculateur ou forte intention de dirigeant 35 % + faisabilité 25 %.
- **Mot-clé principal** au début du titre et du titre SEO, dans la description, le premier paragraphe et un titre `##` ; variantes en sous-titres ; questions réelles en sections et FAQ.
- **Piège** : beaucoup de requêtes « calcul / formule » viennent d'étudiants ; viser le dirigeant (exemple de PME, décision, calculateur).
- Veille hebdomadaire : tâche « Veille mots-clés SEO » (lundi), rapport dans `content/keywords.md`, file classée `content/queue.md`.

## Cible et ton

- Lecteur : dirigeant de PME française (10 à 100 salariés), souvent comptabilité tenue par un cabinet, souvent sous Pennylane. Secondaire : DAF externalisé, expert-comptable.
- **Vouvoiement.** Registre : expert accessible, comme un DAF qui explique à un dirigeant. Phrases courtes. Pas d'humour.
- Concret avant tout : chaque guide contient **au moins un exemple chiffré** (entreprise fictive, présentée comme telle, chiffres recalculés) et une méthode applicable le jour même.
- Fil rouge Vyzor (à évoquer, pas à marteler) : le pilotage, c'est quelques indicateurs de haut niveau, suivis souvent, pour décider ; la donnée prend son sens en croisant les sources (comptabilité, banque, fiscal).

## Règles de vérité (non négociables)

1. **Tout chiffre réglementaire** (taux, seuil, plafond, délai, date d'entrée en vigueur, amende) vient d'une source officielle consultée pendant la rédaction : Légifrance, BOFiP, impots.gouv.fr, economie.gouv.fr, service-public.fr, entreprendre.service-public.fr, Banque de France, INSEE, URSSAF, DGCCRF. Pas de source officielle trouvée → le chiffre n'est pas écrit.
2. Les statistiques citées ont une source datée dans `sources`. Jamais de statistique inventée ni arrondie au-delà de la source.
3. **Tous les calculs de l'article sont recalculés par du code** avant publication (exemple chiffré, pourcentages, jours).
4. Jamais de témoignage, client, citation ou nom inventé présenté comme réel. Pas de promesse sur des fonctionnalités Vyzor absentes de `brain/status.md`.
5. Sujet daté (réforme, loi de finances) : écrire la date de la règle (« au 1er janvier 2026 ») et mettre `updated` à jour quand elle change.
6. Pas de conseil personnalisé juridique ou fiscal : le guide explique et renvoie vers l'expert-comptable pour un cas précis (mention ajoutée automatiquement en bas de page).

## Structure d'un guide (SEO + GEO)

- `title` (h1) avec le mot-clé principal ; `seo_title` ≤ 62 caractères ; `description` ≤ 160 caractères avec mot-clé et promesse.
- **L'essentiel** (3 à 5 phrases autonomes) : chacune doit pouvoir être citée seule par une IA, avec la définition et les chiffres clés.
- Première phrase du corps : le problème du lecteur. La définition arrive dans la première section, en une phrase claire.
- Sections `##` formulées comme les questions que l'on tape (« Comment calculer… », « Quelle différence entre… »).
- Au moins un tableau (formule, comparatif ou exemple chiffré) : les IA et Google les reprennent volontiers.
- FAQ de 3 à 5 vraies questions (balisage FAQPage automatique).
- 900 à 1 600 mots. Pas de remplissage : un guide de 900 mots utile vaut mieux que 2 000 mots dilués.
- Maillage : un lien vers l'outil gratuit le plus pertinent (`tool`, encart automatique), 1 à 3 liens vers d'autres guides publiés, aucun lien vers app.vyzor.fr.

## Interdits

- Mots creux : « révolutionnaire », « incontournable », « dans un monde en constante évolution », « n'hésitez pas », « en conclusion ».
- Emojis, points d'exclamation en série, majuscules d'emphase.
- Dénigrer un concurrent ou le nommer pour le comparer (Pennylane peut être cité comme logiciel comptable utilisé par le lecteur, sans jugement ; aucune affirmation sur ses fonctionnalités sans source).
- Copier ou paraphraser de près un article existant (y compris eloQ, Agicap, Pennylane) : angle, plan et exemple propres à chaque guide.

## Concurrence observée (27/10/2026)

eloQ (askeloq.com/blog) publie ~20 guides : indicateurs (EBE, BFR, DSO, marge, point mort, tableau de bord), trésorerie et prévisionnel, « IA et DAF », actualité (facturation électronique, défaillances). Conversion uniquement par prise de rendez-vous, aucun outil gratuit, aucune capture d'email. Notre différence : chaque guide mène à un calculateur gratuit, et un exemple chiffré recalculé dans chaque article.
