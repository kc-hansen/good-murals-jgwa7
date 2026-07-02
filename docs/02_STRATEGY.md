# Good Murals — Website Strategy
### TYPE: SPEC — site architecture, stack decisions, hosting, and launch path.

---

## 1 — Goal

Build a portfolio-forward website for a custom residential mural artist that:

1. Shows the work at the scale it deserves — large, full-bleed, gallery-quality presentation
2. Positions the artist firmly in the affluent residential market ($500–$1,500 per mural)
3. Collects commission requests with a qualifying deposit, filtering serious buyers from tire-kickers
4. Works beautifully on phones (wealthy homeowners browse on iPhone)
5. Loads fast despite large images (Next.js + Sanity CDN + Amplify edge)

---

## 2 — What Exists Today

| Layer | Status | Gap |
|-------|--------|-----|
| Brand identity | Defined in `01_BRAND_AND_TONE.md` | No logo yet — use wordmark |
| Domain | Not specified — artist to provide or we suggest one | Register `goodmurals.com` or `goodmurals.art` or `[artistname].com` |
| Hosting | None | AWS Amplify Hosting |
| Portfolio | Artist has real completed mural photography | Needs to be uploaded to Sanity CMS |
| Payment | None | Stripe Connect for commission deposits |
| SEO | None | Full build via `03_SEO_PLAN.md` |

---

## 3 — Decisions Made (and Why)

### 3.1 — Tech Stack

```
Frontend:       Next.js 15 (React 19, App Router)
Styling:        Tailwind CSS v4 + CSS variables (brand tokens)
Hosting:        AWS Amplify Hosting — Next.js native, GitHub CI/CD, free SSL
DNS / CDN:      Cloudflare (DNS, edge caching for assets)
CMS:            Sanity.io free tier (portfolio images, project data, deposit amounts)
Payments:       Stripe Connect Standard (commission deposits, customer-paid Tech fee)
Email:          Resend (form confirmations, new-commission notifications)
Analytics:      Plausible ($9/mo) — privacy-first, no cookie banner
Source repo:    GitHub (private)
```

**Why Next.js:** Dynamic portfolio routes (`/portfolio/[slug]`), ISR for Sanity content updates, server-side Stripe session creation without exposing secret keys.

**Why Sanity:** The artist will add new mural photos regularly. Sanity lets them upload, tag, and sort without a developer. Free tier covers years of growth for a single-artist portfolio.

**Why Stripe Connect:** This site takes money (commission deposits). KC's Technology fee rail requires Connect Standard. Artist is merchant of record. Full spec in `05_PAYMENTS_CONNECT.md`.

**Why Amplify over Vercel:** Stays in AWS ecosystem; native Next.js 15 App Router support; per-PR preview URLs; free SSL via ACM; $0–$15/mo at launch traffic.

**Why NOT:**
- WordPress: plugin sprawl, higher attack surface, no per-route SSR control
- Squarespace/Wix: no programmatic portfolio routes, no native Stripe Connect
- Webflow: CMS limits on portfolio scale; no server-side payment handling

### 3.2 — Commission Flow

The single business-critical flow:

```
VISITOR                                    ARTIST
─────────────────────                      ─────────────────────
1. Views portfolio                         (passive)
2. Clicks "Commission a mural"
3. Fills commission form:
   - Wall dimensions
   - Style preference (abstract / illustrative)
   - Room / location context
   - Budget range acknowledgment
   - Preferred timeline
   - Contact info (name, email, phone)
4. Pays qualifying deposit ($250–$500)     5. Receives email with form data + payment
   via Stripe                              6. Reviews request within 48 hours
5. Receives confirmation email             7. Follows up with quote / project plan
```

The deposit is set in Sanity (`siteSettings.depositAmountCents`). Artist can change it without a code deploy. Default: $250 (refundable per artist's policy — noted in the form).

### 3.3 — Portfolio Structure

Murals are tagged by style (`abstract` or `illustrative`) and optionally by room type (dining room, bedroom, entryway, etc.). The portfolio page defaults to all, filterable by style. Each mural has:
- Full-res Sanity-hosted image
- Caption: style / dimensions / room type / city
- Optional: short project note (50–100 words max)
- No individual mural detail pages in v1 (unnecessary complexity)

### 3.4 — AWS Region

**`us-east-1` (N. Virginia)** — broadest AWS service availability, lowest latency to East Coast US (where affluent residential markets skew). Lambda@Edge delivers content globally regardless. Home region governs logs and any future Lambda functions.

### 3.5 — Domain

The slug is `good-murals-jgwa7`. Demo domain: `good-murals-jgwa7.yourproject.ai`.

For production: artist chooses their domain. Recommended options (in order):
1. `[artistfirstname]murals.com` — personal brand + service
2. `goodmurals.com` or `goodmurals.art` — generic but clean
3. `[artistname].com` — if they want a personal artist brand

Domain registered at Cloudflare Registrar (~$10–$15/yr). DNS at Cloudflare (free).

---

## 4 — Site Architecture

```
good-murals-jgwa7.yourproject.ai/
├── /                            # Homepage — full-viewport hero, style intro, CTA
├── /portfolio                   # Masonry gallery, style filter, all completed murals
├── /commission                  # Request form + Stripe deposit payment
├── /about                       # Artist story + style credentials
├── /privacy                     # Required legal
└── /terms                       # Required legal
```

### URL rules
- All lowercase, hyphen-separated, no `.html`
- No date-based URLs (portfolio is timeless)
- Stable — no URL changes after launch without 301 redirect

### Page priority (build order)
1. `/` — Homepage
2. `/commission` — The revenue-critical conversion page
3. `/portfolio` — The work that earns trust
4. `/about` — The human behind the work
5. Legal pages (copy from template)

---

## 5 — Design System Summary

Full tokens in `01_BRAND_AND_TONE.md` §5. Quick reference:

```css
:root {
  /* Dark surfaces */
  --gm-ink:       #0F0F0F;
  --gm-charcoal:  #1C1C1C;
  --gm-ash:       #2E2E2E;
  --gm-smoke:     #6B6B6B;

  /* Light surfaces */
  --gm-linen:     #F4F1EC;
  --gm-cream:     #FAFAF8;

  /* Accent */
  --gm-gold:      #C9A84C;
  --gm-gold-dark: #A68A30;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'DM Mono', monospace;
}
```

Mobile breakpoints (mobile-first):
```css
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

---

## 6 — Analytics

- **Plausible** ($9/mo) — privacy-first, no cookie banner, tracks page views, referrers, commission form starts vs. completions
- **Goal events:** `commission_started` (form load), `commission_deposit_paid` (Stripe redirect return)
- No GA4, no cookie banner

---

## 7 — Migration Path (not applicable — greenfield)

This is a new site with no legacy to migrate. Steps:

1. Artist provides real mural photos (minimum 12, ideally 20+)
2. KC uploads to Sanity, tags by style/room
3. Artist reviews and approves all captions
4. Stripe Connect onboarding (artist creates Connect account)
5. Site built, tested, deployed to demo URL
6. Artist reviews on phone
7. Custom domain purchased + wired
8. Go live

---

## 8 — Costs (monthly, after launch)

| Line | Cost | Notes |
|------|------|-------|
| AWS Amplify | $0–$15/mo | Free tier sufficient at launch |
| Cloudflare DNS | $0/mo | Free |
| Sanity CMS | $0/mo | Free tier (generous for single artist) |
| Resend | $0/mo | 3,000 emails/mo free |
| Plausible | $9/mo | Privacy-first analytics |
| Domain | ~$1/mo | ~$12–$15/yr at Cloudflare Registrar |
| **Total recurring** | **~$10–$25/mo** | Plus Stripe processing on deposits (2.9% + $0.30) |

Stripe processing on a $250 deposit: ~$7.55. On $500: ~$14.80. Artist keeps the rest after KC's Technology fee (5%, capped at $25 per transaction).

---

## 9 — Open Questions — Answered

**Q: Should the site show prices?**
A: Yes — range ($500–$1,500) prominently on the commission page. Hiding price is a friction killer for affluent buyers who have been burned by bait-and-switch. Range is honest and filters for serious inquirers.

**Q: Artist name vs. "Good Murals" brand?**
A: The slug/brand name is "Good Murals" per the dashboard. Use "Good Murals" as the business name everywhere. Artist's personal name appears on the About page and in the Commission form confirmation email, not as the primary brand.

**Q: Should the portfolio be gated/password-protected?**
A: No. Open portfolio is the primary conversion driver for this type of artist. Gating would hurt SEO and reduce organic discovery.

**Q: Instagram integration (pull latest posts)?**
A: No for v1. Instagram API is finicky and rate-limited. Artist maintains Sanity portfolio separately. If they want a social feed, add it in v2.

**Q: Should there be a contact page separate from commission?**
A: No separate contact page in v1. The commission form handles all inquiries. Footer has email for non-commission questions.

**Q: What if the deposit is refundable?**
A: The commission page clearly states the deposit policy (artist's choice — refundable or credited toward project). Default copy in the build: "Your $250 deposit is credited toward your project total when we move forward." Artist updates this via Sanity.
