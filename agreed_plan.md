# Good Murals — Agreed Build Plan
### TYPE: SPEC — the page-by-page plan the RESEARCH phase commits and the BUILD phase implements from.

**Slug:** `good-murals-jgwa7` (dashboard-owned — verbatim)
**Status:** agreed (research phase output; build phase reads this as its spec)
**Source:** interview + docs/ doc set in this repo

---

## The ONE Thing

Convert portfolio visitors into submitted commission requests — with a $250 qualifying deposit collected at inquiry to filter for serious clients.

---

## Audience + Tone

- **Who:** Affluent homeowners ready to invest in their space ($500–$1,500); interior designers sourcing a custom mural for a client
- **Tone / brand:** Bold, intentional, confident, minimal — gallery aesthetic with a direct artist's voice
- **Primary CTA:** "Commission a mural" → `/commission`

---

## Sitemap (every page that will exist)

| Route | Page | Purpose | Primary CTA |
|-------|------|---------|-------------|
| `/` | Home | Gallery hero → style intro → portfolio teaser → commission CTA | "Commission a mural →" |
| `/portfolio` | Portfolio | Full masonry gallery with style filter (All / Abstract / Illustrative) | "Commission a mural" (sticky nav + bottom block) |
| `/commission` | Commission | How it works → price info → form → deposit payment (Stripe) | "Submit & Pay $250 Deposit →" |
| `/commission/success` | Post-payment | Confirmation message post-deposit | "Back to the portfolio →" |
| `/about` | About | Artist story + style descriptions + credentials | "Start a commission →" |
| `/privacy` | Privacy | Legal (required) | — |
| `/terms` | Terms | Legal (required) | — |

---

## Page-by-Page Plan

### `/` — Home

- **Sections (in order):**
  1. Hero — full-viewport mural photo, wordmark + nav overlay, headline "Your walls, made unforgettable." + subhead + gold "Commission a mural →" CTA button
  2. Style Intro — two-column: Abstract (photo + 1–2 sentence description) and Illustrative (photo + 1–2 sentence description)
  3. Portfolio Teaser — 3 featured murals from Sanity in a loose masonry grid; hover/tap captions; "See all murals →" link
  4. Commission CTA Block — dark background; "Ready to transform a room?" headline; price range ($500–$1,500); deposit note; gold "Start a commission →" button
  5. About Teaser — artist-at-work photo + 3–4 sentence artist bio; "About the artist →" link
  6. Footer — wordmark, nav links, contact email, copyright

- **Copy intent per section:**
  - Hero: arresting first impression. One mural fills the screen. Headline is a promise, not a description.
  - Style Intro: let the images do the work; minimal copy names the two styles and what each is FOR
  - Portfolio Teaser: social proof through the work itself; the "See all" drives to the portfolio deep-dive
  - Commission CTA: anchor the price expectation; make the deposit feel logical not burdensome
  - About Teaser: human warmth to close the emotional connection

- **Photos (SPECIFIC + source):**
  1. Hero background: widest, most dramatic finished mural — landscape format preferred; source: artist-provided. This is also the `/og/home.jpg` image.
  2. Style Intro Abstract: best abstract mural, landscape, good color saturation — source: artist-provided
  3. Style Intro Illustrative: best illustrative mural with visible linework — source: artist-provided
  4. Portfolio Teaser 1, 2, 3: first 3 `featured: true` murals from Sanity — source: artist-provided
  5. About Teaser: artist painting a wall (hands + brushwork), warm light — source: artist-provided

- **Data / dynamic:** Hero image, artist bio, featured murals, deposit amount all from Sanity `siteSettings` + `mural` documents. ISR revalidates every 60 seconds.

---

### `/portfolio` — Portfolio

- **Sections (in order):**
  1. Page Header — dark background, minimal: "The work."
  2. Style Filter Bar — sticky below nav: pills for All / Abstract / Illustrative
  3. Masonry Grid — all murals from Sanity, filtered by active style; hover/tap reveals caption (style / dimensions / room / city)
  4. Commission CTA Block — same as homepage section 4

- **Copy intent:** The gallery is the copy. Minimal text throughout. Captions are factual (style / dimensions / room / city), not promotional.

- **Photos (SPECIFIC + source):**
  - Minimum 12 murals for launch, ideally 20+
  - Each mural: 1 wide/establishing photo (shows scale + room context); source: artist-provided
  - File naming convention before Sanity upload: `abstract-dining-room-14x9-brooklyn.jpg`
  - Alt text format: `"Abstract mural in dining room, 14 by 9 feet, hand-painted, Brooklyn NY"`
  - BUILD phase halts with `pass: false` if fewer than 12 real mural photos are available

- **Data / dynamic:** All murals from Sanity `mural` documents, ordered by `orderRank`. Style filter: URL param `?style=abstract` | `?style=illustrative` (shareable, back-button safe).

---

### `/commission` — Commission

- **Sections (in order):**
  1. Page Header — linen background: "Commission a mural." + "Tell us about your wall — we respond within 48 hours."
  2. How It Works — 3-step visual process: Submit + deposit → 48h follow-up call → Design mockup → Painting
  3. Price & Deposit Info block — murals from $500–$1,500; $250 deposit credited to total; refund policy; Stripe security note
  4. Commission Form — 10 fields (name, email, phone, interior designer toggle, wall dimensions, style, room type, timeline, vision notes, referral)
  5. Submit & Pay button → Stripe Checkout (deposit + 5% Technology fee)
  6. FAQ accordion — 6 questions about process, deposit, mockup, travel, timeline

- **Copy intent:**
  - Make the process feel collaborative and low-risk, not transactional
  - The deposit explanation must feel logical: "It filters our calendar to serious commissions — and it goes toward your total"
  - The FAQ should anticipate the "What if I hate it?" fear head-on (the answer: digital mockup before a single brushstroke)

- **Photos:** None — the form needs to breathe. Commission Success page has no images either.

- **Data / dynamic:** Deposit amount from Sanity `siteSettings.depositAmountCents`. Deposit policy copy from `siteSettings.depositPolicyCopy`. Artist's travel note from `siteSettings.travelNote`.

---

### `/about` — About

- **Sections (in order):**
  1. Page Header — linen: italic Playfair headline ("Every mural is made for a specific wall in a specific room.") + subhead
  2. Artist Story — 2-column: left = artist-at-work photo; right = 4–6 paragraphs of real artist voice
  3. Style Deep-Dive — two columns: Abstract (photo + 3–4 sentences) and Illustrative (photo + 3–4 sentences)
  4. Credentials — one honest paragraph (murals completed, years active, no-subcontractors note)
  5. Commission CTA — same dark block as other pages

- **Copy intent:**
  - This is the most personal page. Written in the artist's real voice.
  - Avoids bullet-pointed credentials; the story IS the credential
  - Should make a reader feel: "This person takes their work seriously. I want them in my home."

- **Photos (SPECIFIC + source):**
  1. Artist story photo: artist painting a wall — hands, brush, in-progress. Warm, natural light. NOT a formal portrait. Source: artist-provided. If unavailable, use a mural detail shot as fallback + note in BUILD.
  2. Abstract style photo: strong abstract mural, wide shot preferred. Source: artist-provided.
  3. Illustrative style photo: illustrative mural with visible linework, detail shot preferred. Source: artist-provided.

- **Data / dynamic:** All text from Sanity `aboutPage` document. Mural count and years active are Sanity fields the artist keeps current.

---

### `/privacy` and `/terms`

- Standard boilerplate legal pages
- Dark nav, linen body, footer
- Copy generated from standard templates; no custom photography needed

---

## Revenue / Functional Features

| Feature | Pages it touches | Source doc | Notes |
|---------|-----------------|------------|-------|
| Commission deposit (Stripe Connect) | `/commission`, `/commission/success` | `docs/05_PAYMENTS_CONNECT.md` | Customer pays 5% Technology fee; $250 default deposit; Connect finish step required before go-live |

---

## Design Tokens (sourced up front, per STANDARDS § Design intelligence)

- **Palette:**
  - Dark surfaces: `--gm-ink #0F0F0F`, `--gm-charcoal #1C1C1C`, `--gm-ash #2E2E2E`, `--gm-smoke #6B6B6B`
  - Light surfaces: `--gm-linen #F4F1EC`, `--gm-cream #FAFAF8`
  - Accent: `--gm-gold #C9A84C`, `--gm-gold-dark #A68A30`
- **Type:**
  - Display: Playfair Display (Google Fonts) — H1, H2, pull quotes
  - Body: DM Sans (Google Fonts) — nav, paragraphs, form labels
  - Mono: DM Mono (Google Fonts) — dimensions, price specs
- **Logo / favicon:** Wordmark "GOOD MURALS" in DM Sans Bold, gold on dark. Favicon: wordmark lettermark on #0F0F0F background, 512×512 and 180×180 variants.

---

## Tech + Infra

- **Stack:** Next.js 15 (App Router) · Tailwind CSS v4 · Sanity CMS · Stripe Connect · Resend · Plausible
- **AWS region:** `us-east-1` (East Coast default; customer location not specified)
- **Domain:** `good-murals-jgwa7.yourproject.ai` (preview) → artist's custom domain on go-live (API `goLive`)

---

## Photo Source List (consolidated)

Every image the BUILD phase needs. BUILD halts with `pass: false` if any `Status: REQUIRED` item is missing.

| # | Page/section | Shot | Source | Status |
|---|-------------|------|--------|--------|
| 1 | Home / Hero background | Widest, most dramatic completed mural (landscape) | Artist-provided | REQUIRED |
| 2 | Home / Style Intro — Abstract | Best abstract mural, landscape, saturated color | Artist-provided | REQUIRED |
| 3 | Home / Style Intro — Illustrative | Best illustrative mural, visible linework | Artist-provided | REQUIRED |
| 4–6 | Home / Portfolio Teaser (3 images) | 3 featured murals marked in Sanity | Artist-provided | REQUIRED |
| 7 | Home / About Teaser + About / Artist Story | Artist at work — hands/brushwork, warm light | Artist-provided | REQUIRED (fallback: mural detail shot) |
| 8+ | Portfolio / Masonry Grid | Min 12 completed murals, wide establishing shots | Artist-provided | REQUIRED — min 12, ideally 20+ |
| 9 | About / Abstract style | Strong abstract mural, wide shot | Artist-provided | REQUIRED |
| 10 | About / Illustrative style | Illustrative mural detail shot | Artist-provided | REQUIRED |
| OG | All pages | OG image 1200×630 — use hero mural (item #1) | Derived from item 1 | REQUIRED |
| Favicon | All pages | Wordmark lettermark on dark background | BUILD phase generates | REQUIRED |

**Total real mural photos needed:** minimum 15 unique images (12 for portfolio grid + 3 for homepage/about detail use). Several will be the same photo used in multiple places.

---

## Build Acceptance (what BUILD must satisfy before declaring done)

- [ ] Every page above implemented, phone-first, no blank/placeholder pages or images
- [ ] Commission form submits and triggers Stripe Checkout with correct line items
- [ ] Real `<title>` + `<h1>` + OG per route; favicon set present
- [ ] Every link resolves; CTAs wire to named actions
- [ ] Portfolio grid has minimum 12 real mural images (no grey boxes)
- [ ] Stripe test charge (4242) completes end-to-end before live keys deployed
- [ ] Artist notification email received on test submission
- [ ] Verified phone-first at 390px (hero fills, no overflow, form is usable, CTAs are tappable)
- [ ] Plausible analytics fires on page load
- [ ] Matches this plan page-for-page (no invented or dropped pages)
