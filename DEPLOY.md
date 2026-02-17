# AI Business Plan Generator — Guide de déploiement

## Structure du projet

```
ai-business-plan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts   # Génération du résumé gratuit (Claude API)
│   │   │   ├── checkout/route.ts   # Création session Stripe Checkout
│   │   │   ├── webhook/route.ts    # Webhook Stripe → génère le plan complet
│   │   │   └── plan/route.ts       # Récupération du plan après paiement
│   │   ├── plan/page.tsx           # Page d'affichage du plan complet
│   │   ├── page.tsx                # Landing page + formulaire
│   │   ├── layout.tsx              # Layout global
│   │   └── globals.css             # Styles globaux
│   ├── components/
│   │   ├── PlanForm.tsx            # Formulaire de profil utilisateur
│   │   ├── SummaryCard.tsx         # Aperçu gratuit + CTA paiement
│   │   └── FullPlan.tsx            # Affichage du plan complet + téléchargement
│   └── lib/
│       ├── claude.ts               # Client Anthropic
│       ├── prompt.ts               # Prompts de génération
│       ├── store.ts                # Store persistant Upstash Redis
│       └── types.ts                # Types TypeScript partagés
├── .env.local                      # Variables d'environnement
└── DEPLOY.md                       # Ce fichier
```

## Déploiement sur Vercel

### 1. Prérequis

- Compte [Vercel](https://vercel.com)
- Compte [Stripe](https://stripe.com) (mode test ou live)
- Clé API [Anthropic](https://console.anthropic.com)
- Base Redis [Upstash](https://console.upstash.com) (gratuit, créer une DB en 30 sec)

### 2. Déployer

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd ai-business-plan
vercel
```

### 3. Variables d'environnement (Vercel Dashboard)

Dans Settings → Environment Variables, ajouter :

| Variable | Description |
|---|---|
| `CLAUDE_API_KEY` | Clé API Anthropic (sk-ant-...) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (sk_test_... ou sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret du webhook Stripe (whsec_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (pk_test_...) |
| `UPSTASH_REDIS_REST_URL` | URL REST Upstash (https://xxx.upstash.io) |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST Upstash |
| `NEXT_PUBLIC_APP_URL` | URL de l'app (https://ton-app.vercel.app) |

### 4. Configurer le webhook Stripe

1. Aller sur [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Ajouter un endpoint : `https://ton-app.vercel.app/api/webhook`
3. Écouter l'événement : `checkout.session.completed`
4. Copier le signing secret → `STRIPE_WEBHOOK_SECRET`

### 5. Tester en local

```bash
# Démarrer le serveur
npm run dev

# Dans un autre terminal, écouter les webhooks Stripe
stripe listen --forward-to localhost:3000/api/webhook
```

## Flux utilisateur

1. L'utilisateur remplit le formulaire sur la landing page
2. → Appel API `/api/generate` → Claude génère un résumé gratuit
3. L'utilisateur voit l'aperçu + zone floue du plan complet
4. Clic sur "Obtenir le plan complet — 19€"
5. → Redirection vers Stripe Checkout
6. Après paiement → Stripe envoie un webhook
7. → Le webhook déclenche la génération du plan complet via Claude
8. → L'utilisateur est redirigé vers `/plan?session=xxx`
9. Le plan complet s'affiche avec option de téléchargement

## Notes importantes

- **Upstash Redis** : Le store utilise Upstash Redis (gratuit jusqu'à 10K requêtes/jour).
  Les plans expirent automatiquement après 24h (TTL).
  Pour créer la DB : console.upstash.com → Create Database → Copier REST URL + Token.
- **Vercel + Upstash** : Upstash est intégré à Vercel. Tu peux aussi l'ajouter
  depuis le Vercel Marketplace (Settings → Integrations → Upstash) pour auto-configurer les env vars.
