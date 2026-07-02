# Good Murals — Execution Plan
### TYPE: SPEC — fresh-agent entry point for every phase of this build.

**Slug:** `good-murals-jgwa7`
**Demo URL (preview):** `https://good-murals-jgwa7.yourproject.ai`
**AWS region:** `us-east-1` (East Coast US default; customer location not specified)
**Stack:** Next.js 15 (App Router) · Tailwind CSS v4 · AWS Amplify · Stripe Connect · Sanity CMS

---

## The ONE thing this site does

Turn wealthy homeowners who stumble on the portfolio into submitted commission requests — with a $250–$500 deposit collected at submission to filter serious inquiries.

---

## Who the client is

A residential interior home painter who creates large-scale custom wall murals in two styles:
- **Abstract** — fluid, expressive, large-format color fields
- **Tattoo/illustrative** — detailed line work, botanical, neo-trad, custom imagery

Price range: **$500–$1,500** per mural. Target clientele: affluent homeowners, interior designers sourcing for clients, luxury renovation projects.

---

## What this build produces

| Doc | Purpose |
|-----|---------|
| `01_BRAND_AND_TONE.md` | Visual identity, palette, voice, typography |
| `02_STRATEGY.md` | Site architecture, stack decisions, page structure |
| `03_SEO_PLAN.md` | Keyword clusters, on-page SEO, schema |
| `05_PAYMENTS_CONNECT.md` | Stripe Connect commission deposit flow |
| `06_RESEARCH_LOG.md` | Sources, market data, competitive research |
| `07_INFRA.md` | AWS Amplify setup, env vars, deployment runbook |
| `10_HOMEPAGE_BUILD.md` | Homepage implementation spec |
| `11_COMMISSION_BUILD.md` | Commission request page spec |
| `12_PORTFOLIO_BUILD.md` | Portfolio page spec |
| `13_ABOUT_BUILD.md` | About page spec |

---

## Site map (summary)

| Route | Page | Job |
|-------|------|-----|
| `/` | Home | Gallery hero → intro → commission CTA |
| `/portfolio` | Portfolio | Full mural gallery with style filters |
| `/commission` | Commission | The request form + deposit payment |
| `/about` | About | Artist story + credentials |

---

## Build order (for BUILD phase)

1. `/` — Homepage (gallery hero, intro, CTA)
2. `/commission` — Commission form + Stripe deposit
3. `/portfolio` — Full image gallery
4. `/about` — Artist story
5. Favicon / OG images / sitemap / robots

---

## Key decisions (quick reference)

- **Payment rail:** Stripe Connect Standard; customer pays 5% Technology fee on deposit; deposit is $250–$500 (artist sets per project via Sanity)
- **CMS:** Sanity (mural photos, project descriptions, style tags, deposit amount)
- **Photo hosting:** Sanity asset CDN (no S3 needed)
- **No booking widget:** this is a commission inquiry model, not appointment booking
- **Region:** `us-east-1` — East Coast default; Lambda@Edge is globally distributed regardless

---

## Acceptance gates (BUILD phase must satisfy)

- [ ] No blank/placeholder pages or images — every portfolio slot has a real mural photo
- [ ] Commission form submits and triggers Stripe payment session
- [ ] Phone-first verified at 360/390/430px — large images must fill, not overflow
- [ ] Real `<title>`, `<h1>`, OG per route; favicon resolves
- [ ] Every link resolves; commission CTA flows to `/commission`
- [ ] Stripe test charge (4242) completes before live keys deployed
