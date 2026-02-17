import { UserProfile } from "./types";

export function buildSummaryPrompt(profile: UserProfile): string {
  return `Tu es un consultant senior en stratégie business avec 15 ans d'expérience en accompagnement de startups et d'entrepreneurs.

Analyse ce profil et fournis un RÉSUMÉ COURT (max 250 mots) structuré ainsi :

**Modèle recommandé** : [nom du modèle en 1 phrase]

**Pourquoi ce modèle vous correspond** : [2-3 phrases expliquant l'alignement avec les compétences et le marché]

**Délai réaliste avant premier revenu** : [estimation honnête]

**Indice de confiance** : [Faible / Moyen / Élevé] — [1 phrase de justification]

PROFIL UTILISATEUR :
- Âge : ${profile.age} ans
- Pays : ${profile.country}
- Compétences : ${profile.skills}
- Temps disponible : ${profile.timePerWeek}h/semaine
- Budget de départ : ${profile.budget}€
- Revenu cible : ${profile.targetIncome}€/mois
- Tolérance au risque : ${profile.riskLevel}

RÈGLES :
- Sois réaliste et direct, pas de promesses exagérées
- Si l'objectif de revenu est irréaliste avec le temps/budget disponible, dis-le clairement et propose un objectif intermédiaire
- Écris en français, ton professionnel mais accessible`;
}

export function buildFullPlanPrompt(profile: UserProfile): string {
  return `Tu es un cabinet de conseil en stratégie business de premier plan. Tu produis un rapport stratégique personnalisé de qualité premium pour un client.

PROFIL DU CLIENT :
- Âge : ${profile.age} ans
- Pays : ${profile.country}
- Compétences : ${profile.skills}
- Temps disponible : ${profile.timePerWeek}h/semaine
- Budget de départ : ${profile.budget}€
- Objectif de revenu : ${profile.targetIncome}€/mois
- Tolérance au risque : ${profile.riskLevel}

DIRECTIVES DE QUALITÉ :
- Ce rapport sera lu comme un document de consulting à 500€. La qualité doit être irréprochable.
- Chaque recommandation doit être SPÉCIFIQUE au profil (pas de conseils génériques).
- Utilise des CHIFFRES concrets : pourcentages, montants, délais précis.
- Si l'objectif est irréaliste, propose une trajectoire réaliste avec paliers.
- Aucun discours motivationnel. Que du concret et de l'actionnable.
- Écris en français. Utilise le markdown avec des tableaux.

STRUCTURE OBLIGATOIRE (respecte EXACTEMENT ces titres et sous-titres markdown) :

# RÉSUMÉ EXÉCUTIF

Présente en 5-6 lignes :
- Le modèle business recommandé et pourquoi il est optimal pour CE profil
- Le marché ciblé avec sa taille estimée
- Le délai réaliste avant le premier euro gagné
- L'objectif de revenu atteignable à 6 mois

# BUSINESS MODEL

## Description du modèle

Explique de manière claire et détaillée :
- Le nom exact du business model (ex: Freelance en automatisation B2B, Agence de contenu IA, SaaS micro-niche, Service productisé, etc.)
- En quoi il consiste concrètement (quoi, pour qui, comment)
- Pourquoi ce modèle est le plus adapté à CE profil (compétences, temps, budget, risque)

## Comment ça fonctionne

Décris le flux opérationnel étape par étape :

### Étape 1 : [Nom de l'étape]
- Ce que vous faites concrètement
- Temps estimé
- Outils nécessaires

### Étape 2 : [Nom de l'étape]
- Ce que vous faites concrètement
- Temps estimé
- Outils nécessaires

### Étape 3 : [Nom de l'étape]
(continue autant d'étapes que nécessaire pour décrire le cycle complet, de l'acquisition client à la livraison et au paiement)

## Sources de revenus

Tableau clair des flux de revenus :

| Source de revenu | Description | Prix unitaire | Fréquence | Potentiel mensuel |
|---|---|---|---|---|

## Modèle économique

- Coûts fixes mensuels (liste détaillée avec montants)
- Coûts variables par client/projet
- Marge brute estimée (en %)
- Seuil de rentabilité (nombre de clients ou projets nécessaires)

## Avantages de ce modèle pour votre profil

Liste des 4-5 raisons concrètes pour lesquelles ce business model est optimal en fonction des compétences, du temps disponible, du budget et de la tolérance au risque du client.

## Limites et points d'attention

Liste honnête des 3-4 difficultés ou risques inhérents à ce modèle que le client doit connaître.

# ANALYSE DU MARCHÉ ET POSITIONNEMENT

## Opportunité de marché
- Taille du marché adressable (TAM/SAM/SOM si pertinent)
- Tendances actuelles qui favorisent cette activité
- Données chiffrées sur la demande

## Positionnement stratégique
- Proposition de valeur unique en 1 phrase
- Différenciation vs la concurrence
- Avantage compétitif lié aux compétences du profil

## Analyse concurrentielle
Tableau avec 3-4 concurrents/alternatives :

| Concurrent | Forces | Faiblesses | Votre avantage |
|---|---|---|---|

# CLIENT IDÉAL (ICP)

- Description précise du client type (secteur, taille, poste, problème)
- Où le trouver (canaux précis)
- Son budget moyen pour ce type de service
- Le "trigger event" qui le pousse à acheter

# FEUILLE DE ROUTE — ÉTAPES CLÉS

## Vue d'ensemble

Tableau de la roadmap complète sur 6 mois :

| Étape | Période | Objectif principal | Livrable clé | Revenu attendu |
|---|---|---|---|---|
| 1. Fondations | Semaine 1-2 | ... | ... | 0€ |
| 2. Lancement | Semaine 3-4 | ... | ... | ... |
| 3. Premiers clients | Mois 2 | ... | ... | ... |
| 4. Croissance | Mois 3 | ... | ... | ... |
| 5. Optimisation | Mois 4-5 | ... | ... | ... |
| 6. Scaling | Mois 6 | ... | ... | ... |

## Étape 1 : Fondations (Semaine 1-2)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
- Jour 1 : [action] → Livrable : [...]
- Jour 2 : [action] → Livrable : [...]
- Jour 3 : [action] → Livrable : [...]
(continue pour chaque jour important)

### Critère de passage à l'étape suivante
[Condition précise qui indique que cette étape est terminée]

## Étape 2 : Lancement (Semaine 3-4)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
(même format jour par jour)

### Critère de passage à l'étape suivante
[Condition précise]

## Étape 3 : Premiers clients (Mois 2)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
(actions clés de la semaine avec livrables)

### Critère de passage à l'étape suivante
[Condition précise]

## Étape 4 : Croissance (Mois 3)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
(actions clés)

### Critère de passage à l'étape suivante
[Condition précise]

## Étape 5 : Optimisation (Mois 4-5)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
(focus sur l'optimisation des conversions, l'automatisation, et la systématisation)

## Étape 6 : Scaling (Mois 6)

### Objectif
[Objectif clair et mesurable]

### Actions détaillées
(focus sur la délégation, l'expansion de l'offre, et l'augmentation des revenus)

# STRATÉGIE D'ACQUISITION CLIENT

## Canaux organiques
Pour chaque canal, détaille : la tactique exacte, le temps à y consacrer par semaine, le résultat attendu.

## Canaux payants
(Si le budget le permet. Sinon, explique pourquoi pas maintenant et quand commencer.)

## Scripts de prospection prêts à l'emploi

### Script message LinkedIn (premier contact)
\`\`\`
[Script complet, personnalisé au secteur cible, prêt à copier-coller]
\`\`\`

### Script email de prospection
\`\`\`
Objet : [objet optimisé]

[Corps du mail complet]
\`\`\`

### Script appel découverte (15 min)
\`\`\`
[Script structuré avec les questions clés et transitions]
\`\`\`

# OFFRE ET MONÉTISATION

## Structure de l'offre
Tableau des offres recommandées :

| Offre | Prix | Contenu | Temps de livraison | Marge estimée |
|---|---|---|---|---|

## Projections financières

### Scénario conservateur
| Mois | Clients | Revenu | Coûts | Bénéfice net |
|---|---|---|---|---|
| Mois 1 | | | | |
| Mois 2 | | | | |
| Mois 3 | | | | |
| Mois 4 | | | | |
| Mois 5 | | | | |
| Mois 6 | | | | |

### Scénario réaliste
(même tableau avec des chiffres plus optimistes mais atteignables)

## Point mort (break-even)
- Coûts fixes mensuels détaillés
- Nombre de clients minimum pour être rentable
- Délai estimé pour atteindre le break-even

# AUTOMATISATION ET SCALING

## Phase 1 : Automatisations immédiates (mois 1)
| Tâche | Outil recommandé | Coût | Temps gagné/semaine |
|---|---|---|---|

## Phase 2 : Optimisation (mois 2-3)
| Tâche | Outil recommandé | Coût | Temps gagné/semaine |
|---|---|---|---|

## Phase 3 : Délégation (mois 4+)
- Quand et quoi sous-traiter
- Budget à prévoir
- Où trouver les bons freelances

# ANALYSE DES RISQUES

| Risque | Probabilité | Impact | Stratégie de mitigation |
|---|---|---|---|

(Minimum 5 risques spécifiques au profil et au modèle business choisi)

# INDICATEURS DE SUIVI (KPIs)

| KPI | Objectif Mois 1 | Objectif Mois 3 | Objectif Mois 6 |
|---|---|---|---|

(Minimum 5 KPIs pertinents et mesurables)

# VERDICT FINAL

## Évaluation honnête
- Forces du profil pour ce business
- Points de vigilance
- Le facteur n°1 qui déterminera le succès ou l'échec

## Checklist de démarrage immédiat
- [ ] Action 1 (à faire aujourd'hui)
- [ ] Action 2 (à faire cette semaine)
- [ ] Action 3 (à faire dans les 10 prochains jours)

## Indice de confiance global
**[Faible / Moyen / Moyen-Haut / Élevé]**

Justification en 2-3 lignes basée sur les compétences, le marché, le temps disponible et le budget.

---
*Ce rapport est personnalisé pour votre profil. Les projections sont des estimations basées sur les données de marché et ne constituent pas des garanties de résultats.*`;
}
