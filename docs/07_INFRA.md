# Good Murals — Infrastructure
### TYPE: SPEC — hosting, DNS, env vars, deployment runbook, costs, monitoring.

---

## 1 — Goal

Stand up a production-ready hosting stack for Good Murals at `good-murals-jgwa7.yourproject.ai` (preview) → client's custom domain (on go-live) that:

1. Costs under $50/month at launch
2. Deploys automatically from the `main` branch in GitHub
3. Has preview URLs per pull request (Amplify-native)
4. Handles large mural images fast via Sanity CDN + Next/Image
5. Runs Stripe Connect server-side (no secret key on client)

---

## 2 — Stack

```
Frontend:       Next.js 15 (App Router, RSC, ISR)
Styling:        Tailwind CSS v4 + CSS variables
Hosting:        AWS Amplify Hosting (us-east-1)
DNS / CDN:      Cloudflare (DNS, free tier)
CMS:            Sanity.io (free tier)
Payments:       Stripe Connect Standard
Email:          Resend (free tier)
Analytics:      Plausible ($9/mo)
Source repo:    GitHub (private)
```

---

## 3 — Decisions Made (and Why)

### 3.1 — AWS Amplify Hosting, us-east-1

Next.js 15 App Router is natively supported. GitHub-integrated CI/CD. Free SSL via ACM. Per-PR preview URLs at `pr-N.<id>.amplifyapp.com`. $0–$15/mo at launch traffic.

**Why not Vercel:** Non-AWS vendor. Amplify gives us CloudWatch integration and easy addition of Lambda/DynamoDB later if needed.

**Region: us-east-1.** Customer location not specified; East Coast default. Lambda@Edge runs globally regardless; the region governs logs and any future Lambda functions.

### 3.2 — Sanity CMS for portfolio + site settings

The artist adds new murals regularly. Sanity lets them upload, tag, and sort images without a developer. Free tier: 10k documents, 5GB assets — years of runway for a single-artist portfolio.

Sanity's asset CDN (`cdn.sanity.io`) + Next.js `<Image />` handles WebP conversion, responsive sizes, and lazy loading automatically. No S3 bucket needed.

### 3.3 — No application database

State lives in Sanity (portfolio content, site settings including deposit amount) and Stripe (payments). Zero ops burden.

### 3.4 — Stripe for commission deposits

Server-side only. `STRIPE_SECRET_KEY` is a server env var, never sent to client. Stripe Checkout handles PCI compliance — we never touch card data. Full spec in `05_PAYMENTS_CONNECT.md`.

### 3.5 — Resend for transactional email

3,000 emails/mo free. Sends commission notifications to artist + confirmation to client. Triggered from the Stripe webhook handler (`app/api/webhooks/stripe/route.ts`).

### 3.6 — Cloudflare for DNS

Free. Manages the production custom domain + Amplify custom domain integration. DNS-only mode (not proxied) for Amplify domain association.

---

## 4 — State Inventory

```
PORTFOLIO + SITE SETTINGS
└── Sanity CMS
    └── Mural images, captions, style tags, deposit amount, artist bio

PAYMENTS
└── Stripe Connect
    └── Commission deposits, payouts to artist, KC's application fee

TRANSACTIONAL EMAIL
└── Resend
    └── Commission notifications, client confirmations

ANALYTICS
└── Plausible
    └── Page views, referrers, conversion funnel

SOURCE CODE
└── GitHub (private repo)
    └── main → production (Amplify CI/CD)

DNS
└── Cloudflare
    └── custom domain → Amplify
```

---

## 5 — Environment Variables

Set in Amplify console → App settings → Environment variables. Server-only vars marked secret.

```
# ─── Sanity ───
NEXT_PUBLIC_SANITY_PROJECT_ID        # e.g. "8t2dx4n0" — public
NEXT_PUBLIC_SANITY_DATASET           # "production"
SANITY_API_READ_TOKEN                # private; for draft preview

# ─── Stripe ───
STRIPE_SECRET_KEY                    # private; server-only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY   # public client-side
STRIPE_CONNECTED_ACCOUNT_ID          # private; artist's Connect acct id
STRIPE_WEBHOOK_SECRET                # private; from Stripe dashboard
DEPOSIT_AMOUNT_CENTS                 # "25000" for $250 (configurable)
TECH_FEE_PERCENT                     # "0.05"

# ─── Resend ───
RESEND_API_KEY                       # private; server-only
RESEND_TO_ARTIST                     # artist email address (commission notifications)
RESEND_FROM_ADDRESS                  # "Good Murals <hello@goodmurals.com>"

# ─── Plausible ───
NEXT_PUBLIC_PLAUSIBLE_DOMAIN         # e.g. "goodmurals.com" (or custom domain)

# ─── Site config ───
NEXT_PUBLIC_SITE_URL                 # "https://good-murals-jgwa7.yourproject.ai" (preview)
NODE_ENV                             # set by Amplify
```

Local development uses `.env.local` (not committed). `.env.example` documents all vars.

---

## 6 — File Tree

```
good-murals-jgwa7/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # Homepage
│   │   ├── portfolio/
│   │   │   └── page.tsx              # Full portfolio gallery
│   │   ├── about/
│   │   │   └── page.tsx              # Artist story
│   │   ├── commission/
│   │   │   ├── page.tsx              # Commission form
│   │   │   └── success/
│   │   │       └── page.tsx          # Post-payment confirmation
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── terms/
│   │       └── page.tsx
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts              # Stripe Checkout Session creator
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts          # Stripe webhook handler
│   ├── layout.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
├── components/
│   ├── nav/Navbar.tsx
│   ├── home/Hero.tsx
│   ├── home/StyleIntro.tsx
│   ├── home/PortfolioTeaser.tsx
│   ├── home/CommissionCta.tsx
│   ├── portfolio/MasonryGrid.tsx
│   ├── portfolio/StyleFilter.tsx
│   ├── commission/CommissionForm.tsx
│   ├── commission/DepositExplainer.tsx
│   ├── Footer.tsx
│   └── seo/ServiceSchema.tsx
├── lib/
│   ├── sanity/client.ts
│   ├── sanity/queries.ts
│   └── env.ts                        # Zod-validated env loader
├── sanity/
│   ├── schemas/
│   │   ├── mural.ts
│   │   └── siteSettings.ts
│   └── sanity.config.ts
├── public/
│   └── (favicon set, OG image)
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── amplify.yml
└── package.json
```

---

## 7 — Initial Deployment Runbook

```
=== BEFORE BUILD ===
[ ] Artist provides minimum 12 real mural photos (ideally 20+)
[ ] Artist confirms deposit amount ($250 default)
[ ] Artist confirms deposit policy copy
[ ] Artist sets up Stripe Connect account (KC runs onboarding toolkit)
[ ] Create GitHub repo: good-murals-jgwa7 (done)
[ ] Create Sanity project: "good-murals"
[ ] Create Resend account + verify artist's domain

=== BUILD ===
[ ] Push Next.js scaffold to GitHub main
[ ] Amplify: create new app → connect GitHub → branch: main
[ ] Amplify: add all env vars from §5
[ ] Trigger first build → verify .amplifyapp.com URL
[ ] Upload artist's mural photos to Sanity, tag by style and room
[ ] Test commission form end-to-end (Stripe test mode: card 4242 4242 4242 4242)
[ ] Verify webhook fires → artist notification email received

=== DEPLOY TO PREVIEW DOMAIN ===
[ ] Run: node automation/add-custom-domain.mjs --app-name good-murals --subdomain good-murals-jgwa7
[ ] Verify https://good-murals-jgwa7.yourproject.ai loads
[ ] Artist reviews on phone (Safari iOS + Chrome Android)

=== PAYMENT-ONBOARDING FINISH STEP ===
[ ] Connect account created + onboarding PDF sent
[ ] Test charge validated in Stripe Dashboard (see 05_PAYMENTS_CONNECT.md)
[ ] Flip to live Stripe keys in Amplify env vars
[ ] Set live webhook endpoint in Stripe Dashboard

=== CUSTOM DOMAIN (on go-live) ===
[ ] Artist registers custom domain at Cloudflare Registrar
[ ] KC adds domain association in Amplify + Cloudflare DNS records
[ ] Update NEXT_PUBLIC_SITE_URL in Amplify env vars
[ ] Update Stripe webhook URL in Stripe Dashboard
[ ] Verify HTTPS live
```

---

## 8 — Amplify Build Config

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 9 — Costs

| Line | Monthly | Notes |
|------|---------|-------|
| AWS Amplify | $0–$15 | Free tier sufficient at launch |
| Cloudflare DNS | $0 | Free |
| Sanity CMS | $0 | Free tier |
| Resend | $0 | 3k emails/mo free |
| Plausible | $9 | Privacy-first analytics |
| Domain | ~$1 | ~$12/yr |
| **Total recurring** | **~$10–$25/mo** | |

Stripe processing on $250 deposit: ~$7.55 (artist pays standard 2.9% + $0.30). KC's 5% Technology fee ($12.50) is paid by the customer on top. Net to artist: ~$237.45 per deposit.

---

## 10 — Monitoring

- **Plausible** — daily glance at page views + commission form conversion
- **Stripe Dashboard** — commission deposits, payout schedule
- **Amplify Console** — build status, any Lambda@Edge errors
- **Resend** — delivery status on commission notifications

No CloudWatch alarms needed at launch traffic. Add if artist reports site issues.
