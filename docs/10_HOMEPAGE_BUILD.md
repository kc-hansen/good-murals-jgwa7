# Good Murals — Homepage Build Spec
### TYPE: SPEC — page-by-page implementation detail for the `/` route.

---

## 1 — Goal

Build the homepage at `/` that:
- Opens with a full-viewport mural hero — one real finished mural filling the screen, with the wordmark and CTA overlaid
- Immediately signals "this is a portfolio artist at a premium tier"
- Delivers the primary CTA ("Commission a mural") within the first scroll
- Shows a 3–4 image portfolio teaser that drives to `/portfolio`
- Loads fast despite large hero image (Next/Image + Sanity CDN + blur placeholder)
- Works phone-first at 390px — hero fills, images don't overflow, CTA is tappable

---

## 2 — Sections (in order)

### Section 1: Hero
- **Full-viewport** (100svh, no partial reveal below the fold on mobile)
- Background: a single high-quality wide-shot mural photo (sourced from Sanity `siteSettings.heroMuralImage`)
- Dark overlay (~50% black) for text legibility
- Wordmark: "GOOD MURALS" in DM Sans Bold, gold, top-left
- Nav links: Portfolio / Commission / About — right side; collapses to hamburger on mobile
- Headline: Playfair Display, large (clamp 48px–96px), centered, white:
  > "Your walls, made unforgettable."
- Subhead: DM Sans, 18–20px, centered, white 80% opacity:
  > "Hand-painted abstract and illustrative murals for residential interiors."
- CTA button: "Commission a mural →", gold background, ink text, 48px height min (touch target), centered
- Scroll indicator: subtle down chevron below CTA, animates on load (CSS only, no JS)

### Section 2: Style Introduction
- Two-column on tablet/desktop, stacked on mobile
- Left: "Abstract" — one abstract mural full-bleed photo, label below in gold, 1–2 sentence description
  > "Gestural, bold, and built for rooms that want to make a statement. Color at scale."
- Right: "Illustrative" — one illustrative/tattoo-style mural photo, same layout
  > "Intricate line work, botanical forms, and imagery drawn from your story. Made to stop guests in their tracks."
- On mobile: stacked, each full-width, 4:3 aspect ratio
- No text-heavy copy — images do the work

### Section 3: Portfolio Teaser
- Header: "The work" in Playfair Display
- Masonry-light grid: 3 images on desktop (2 wide + 1 portrait), 2 stacked on mobile — all real murals from Sanity
- Each image: hover/tap reveals caption (style / dimensions / room type)
- Below grid: "See all murals →" text link in gold, pointing to `/portfolio`

### Section 4: Commission CTA Block
- Dark background (--gm-ink)
- Centered, generous padding
- Headline (Playfair, large):
  > "Ready to transform a room?"
- Sub-copy (DM Sans):
  > "Custom murals from $500. Tell us about your wall — we'll follow up within 48 hours."
- Button: "Start a commission →", gold, points to `/commission`
- Below button: "A qualifying deposit of $250 is required to submit — fully credited to your project total."

### Section 5: About Teaser
- Light section (--gm-linen background)
- One large artist-working photo (hands/brushes/wall, not a portrait)
- Headline: "Every mural is made by hand. Every one is made for you."
- 3–4 sentence artist paragraph (Sanity `siteSettings.artistBio`):
  > "Good Murals was born from the belief that a room's walls are its most underused canvas. We paint abstract and illustrative murals for homeowners who want something no one else has — designed for their specific space, painted by hand, permanent."
- "About the artist →" link pointing to `/about`

### Section 6: Footer (on every page)
- Dark background (--gm-charcoal)
- Left: wordmark "GOOD MURALS" in gold
- Center: links — Portfolio / Commission / About / Privacy / Terms
- Right: email address (Sanity `siteSettings.contactEmail`)
- Bottom bar: "© 2025 Good Murals. Hand-painted murals for residential interiors."

---

## 3 — Photos for This Page

| # | Section | Shot | Source | Notes |
|---|---------|------|--------|-------|
| 1 | Hero background | Widest, most dramatic mural the artist has — must be wide-format (landscape or square) | Artist-provided | Will be used as OG image too |
| 2 | Style: Abstract | Best abstract mural, landscape orientation | Artist-provided | Needs good color saturation |
| 3 | Style: Illustrative | Best illustrative/tattoo mural, landscape orientation | Artist-provided | Detail should be visible |
| 4 | Portfolio teaser 1 | Second-best abstract, any orientation | Artist-provided | Sanity query: first 3 featured murals |
| 5 | Portfolio teaser 2 | A room-context shot (wide + furniture) | Artist-provided | |
| 6 | Portfolio teaser 3 | Strong close-up (detail shot) | Artist-provided | |
| 7 | About teaser | Artist at work — hands, brushes, wall — NOT a portrait | Artist-provided | Can be from `/about` page photo set |

**All photos sourced from artist.** No stock photography. BUILD phase halts if fewer than 7 real photos are available for the homepage — emit `pass: false`.

---

## 4 — Code Structure

```tsx
// app/(marketing)/page.tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StyleIntro } from '@/components/home/StyleIntro'
import { PortfolioTeaser } from '@/components/home/PortfolioTeaser'
import { CommissionCta } from '@/components/home/CommissionCta'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { ServiceSchema } from '@/components/seo/ServiceSchema'
import { sanityClient } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Custom Residential Mural Artist | Good Murals',
  description:
    'Hand-painted abstract and illustrative murals for residential interiors. ' +
    'Commission a bespoke mural from $500 — designed for your wall, painted by hand.',
  openGraph: {
    title: 'Good Murals — Custom Wall Murals for Your Home',
    description: 'Your walls, made unforgettable.',
    images: ['/og/home.jpg'],
    type: 'website',
    locale: 'en_US',
  },
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL },
}

export default async function HomePage() {
  const data = await sanityClient.fetch(homepageQuery)
  return (
    <>
      <ServiceSchema />
      <Hero heroImage={data.heroMuralImage} />
      <StyleIntro />
      <PortfolioTeaser murals={data.featuredMurals} />
      <CommissionCta depositAmount={data.depositAmountCents} />
      <AboutTeaser artistBio={data.artistBio} artistWorkingPhoto={data.artistWorkingPhoto} />
    </>
  )
}
```

---

## 5 — Sanity Schema: `siteSettings`

```typescript
// sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroMuralImage', title: 'Hero Mural Image', type: 'image' }),
    defineField({ name: 'artistBio', title: 'Artist Bio (short)', type: 'text', rows: 4 }),
    defineField({ name: 'artistWorkingPhoto', title: 'Artist Working Photo', type: 'image' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'depositAmountCents', title: 'Deposit Amount (cents)', type: 'number', initialValue: 25000 }),
    defineField({ name: 'depositPolicyCopy', title: 'Deposit Policy Copy', type: 'text', rows: 2 }),
  ],
})
```

---

## 6 — Sanity Schema: `mural`

```typescript
// sanity/schemas/mural.ts
import { defineType, defineField } from 'sanity'

export const mural = defineType({
  name: 'mural',
  title: 'Mural',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Mural Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'style', title: 'Style', type: 'string', options: { list: ['abstract', 'illustrative'] } }),
    defineField({ name: 'dimensions', title: 'Dimensions (e.g. "14 × 9 ft")', type: 'string' }),
    defineField({ name: 'roomType', title: 'Room Type', type: 'string', options: { list: ['Dining room', 'Bedroom', 'Entryway', 'Living room', 'Home office', 'Bathroom', 'Nursery', 'Other'] } }),
    defineField({ name: 'city', title: 'City (optional)', type: 'string' }),
    defineField({ name: 'projectNote', title: 'Project Note (50–100 words, optional)', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'orderRank', title: 'Sort Order', type: 'number' }),
  ],
})
```

---

## 7 — Mobile Spec

At 390px (iPhone 14 base):
- Hero: `height: 100svh`, image fills, no overflow
- Wordmark: 16px, top-left, gold
- Nav: hamburger (three lines), drawer from right
- Hero headline: 48px, centered, line-height 1.1
- CTA button: full-width (calc(100% - 48px)), 52px height, centered
- Style intro: single column, each mural 4:3 aspect ratio, full-width
- Portfolio teaser: 2 columns (2+1 stagger), or 1 column fallback if images are too tall
- Commission CTA block: full-width, 64px padding Y, button full-width
- About teaser: stacked — photo first, then text

---

## 8 — Performance Budget

- Hero image: ≤800KB (Next/Image converts to WebP, Sanity CDN serves correct size)
- LCP (hero image load): target <2.5s on 4G mobile
- Portfolio teaser images: ≤200KB each (thumbnails)
- No third-party scripts on homepage (Plausible is async, <2KB)
- Lighthouse Mobile: Performance ≥ 90, SEO = 100, Accessibility ≥ 95

---

## 9 — Smoke Test

1. `/` renders hero image (no grey box / broken image)
2. Nav collapses to hamburger at 390px; drawer opens/closes
3. "Commission a mural" CTA scrolls to or navigates to `/commission`
4. Portfolio teaser shows 3 real mural images with hover captions
5. "See all murals →" navigates to `/portfolio`
6. About teaser photo loads; "About the artist →" navigates to `/about`
7. Plausible records a pageview
8. Service JSON-LD validates in Rich Results Test
