# Guides vyzor.fr — format d'un article

Un guide = un fichier `content/guides/AAAA-MM-JJ-slug.md`. `npm run build` le publie sur
`/guides/<slug>`, l'ajoute au sommaire `/guides`, au sitemap et à `llms.txt`.
Le build échoue (et rien n'est publié) si un champ manque ou si l'article fait moins de 700 mots.
Un article daté dans le futur n'est publié qu'à partir de sa date (au build suivant).

Règles de rédaction : `brain/contenu/editorial.md` (dépôt vyzorgit/vyzor). File des sujets : `content/queue.md`.

```markdown
---
title: "Titre affiché (h1), naturel, avec le mot-clé"
seo_title: "Titre Google, 62 caractères max"        # « — Vyzor » est ajouté
description: "Méta-description, 160 caractères max, avec le mot-clé et la promesse."
slug: mot-cle-principal                              # minuscules, chiffres, tirets
date: 2026-10-27                                     # date de publication
updated: 2026-10-27                                  # optionnel, date de mise à jour
category: Trésorerie                                 # une des catégories de editorial.md
keyword: "mot-clé principal"
tool: bfr                                            # bfr | breakeven | fiscal | reporting | valorisation (optionnel)
essentiel:                                           # 3 à 5 phrases autonomes, citables telles quelles par une IA
  - "Le BFR est …"
faq:                                                 # 3 à 5 questions réellement posées, réponses de 2-3 phrases
  - q: "Question ?"
    a: "Réponse."
sources:                                             # sources officielles d'abord (Légifrance, BOFiP, impots.gouv, service-public, Banque de France, INSEE)
  - title: "Titre de la source"
    url: "https://…"
---

Corps en Markdown : pas de titre `#` (le h1 vient de `title`), sections en `##`, sous-sections en `###`.
Tableaux Markdown acceptés. Liens internes en chemins absolus (`/calculateurs/bfr`, `/guides/autre-guide`).
```
