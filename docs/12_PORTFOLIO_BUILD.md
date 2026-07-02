# Good Murals — Portfolio Page Build Spec
### TYPE: SPEC — implementation detail for the `/portfolio` route.

---

## 1 — Goal

The portfolio page is the primary trust-builder and conversion driver. It:
- Shows ALL the artist's completed murals at maximum visual impact
- Lets visitors filter by style (Abstract / Illustrative)
- Makes each mural undeniably hand-painted and real (captions provide context: dimensions, room, location)
- Has a persistent CTA to `/commission` so the moment of inspiration becomes an action
- Loads fast despite many large images (lazy loading, Sanity CDN, Next/Image)

---

## 2 — Layout

### Page structure
- **Dark background** (--gm-ink) — the gallery is the room; neutrals let the work speak
- **Sticky top nav** (same as all pages) + "Commission a mural" gold CTA button in nav
- **Style filter bar** (below nav): two pills — "All" (default) / "Abstract" / "Illustrative"
- **Masonry grid** (below filter): all murals, filtered by active style
- **Commission CTA block** (bottom): same as homepage Section 4

### Masonry grid behavior
- 3 columns on desktop (1280px+)
- 2 columns on tablet (768px–1279px)
- 1 column on mobile (≤767px)
- Images have no forced aspect ratio — each mural fills its natural dimensions (portrait or landscape)
- Gap: 8px between images (tight — gallery feel)
- No white borders, no cards, no drop shadows — pure image grid on dark background
- Hover/tap: semi-transparent dark overlay reveals caption (style / dimensions / room / city)

### Caption reveal
```tsx
// on hover (desktop) or tap (mobile):
<figcaption className="absolute inset-0 bg-gm-ink/70 flex flex-col justify-end p-4 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200">
  <span className="text-gm-gold text-xs font-mono uppercase tracking-widest">
    {mural.style}
  </span>
  <span className="text-white text-sm font-body mt-1">
    {mural.dimensions} · {mural.roomType}{mural.city ? ` · ${mural.city}` : ''}
  </span>
  {mural.projectNote && (
    <span className="text-white/70 text-xs mt-1 line-clamp-2">{mural.projectNote}</span>
  )}
</figcaption>
```

---

## 3 — Sanity Query

```typescript
// lib/sanity/queries.ts
export const portfolioQuery = groq`
  *[_type == "mural"] | order(orderRank asc) {
    _id,
    style,
    dimensions,
    roomType,
    city,
    projectNote,
    "imageUrl": image.asset->url,
    "imageLqip": image.asset->metadata.lqipUrl,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
  }
`
```

---

## 4 — Page Code

```tsx
// app/(marketing)/portfolio/page.tsx
import type { Metadata } from 'next'
import { MasonryGrid } from '@/components/portfolio/MasonryGrid'
import { StyleFilter } from '@/components/portfolio/StyleFilter'
import { CommissionCta } from '@/components/home/CommissionCta'
import { sanityClient } from '@/lib/sanity/client'
import { portfolioQuery, siteSettingsQuery } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Mural Portfolio — Abstract & Illustrative | Good Murals',
  description:
    'Hand-painted abstract and illustrative murals for residential interiors. ' +
    'Browse the full portfolio of custom commissioned murals.',
  openGraph: {
    title: 'Good Murals Portfolio',
    description: 'Every mural hand-painted. Every one made for a specific space.',
    images: ['/og/portfolio.jpg'],
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio` },
}

export default async function PortfolioPage() {
  const [murals, settings] = await Promise.all([
    sanityClient.fetch(portfolioQuery),
    sanityClient.fetch(siteSettingsQuery),
  ])
  return (
    <main className="bg-gm-ink min-h-screen">
      <PageHeader />
      <StyleFilter />          {/* client component — handles filter state */}
      <MasonryGrid murals={murals} />
      <CommissionCta depositAmount={settings.depositAmountCents} />
    </main>
  )
}
```

---

## 5 — Style Filter (Client Component)

```tsx
// components/portfolio/StyleFilter.tsx
'use client'
import { useState } from 'react'

type Style = 'all' | 'abstract' | 'illustrative'

export function StyleFilter() {
  const [active, setActive] = useState<Style>('all')
  return (
    <div className="flex gap-3 px-6 py-4 sticky top-16 z-10 bg-gm-ink/90 backdrop-blur-sm">
      {(['all', 'abstract', 'illustrative'] as Style[]).map((s) => (
        <button
          key={s}
          onClick={() => setActive(s)}
          className={`px-4 py-2 text-sm font-body rounded-full border transition-colors
            ${active === s
              ? 'bg-gm-gold text-gm-ink border-gm-gold'
              : 'text-white/70 border-white/20 hover:border-white/50'
            }`}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  )
}
```

Note: MasonryGrid reads the active filter from a shared context or URL param (`?style=abstract`). URL-param approach preferred for shareability and back-button support.

---

## 6 — Photos Required

**Minimum 12 murals for launch.** Ideally 20+. Each mural needs:
- At minimum: 1 wide/establishing photo (shows scale + room context)
- Optionally: 1–2 detail/close-up photos (the BUILD agent picks the best single image per mural for the grid; detail shots go in a potential v2 lightbox)

If fewer than 12 murals are available at BUILD time, `pass: false` in BUILD_RESULT.

---

## 7 — Mobile Spec (390px)

- Style filter: horizontal scroll if pills overflow (no wrapping)
- Grid: single column, full-width images, natural aspect ratio
- Caption: tap to show/hide (not hover)
- Commission CTA at bottom: full-width button
- No horizontal scroll at any point

---

## 8 — Performance Budget

- Each mural thumbnail: Next/Image serves correct srcset; Sanity CDN compresses to ≤300KB at 800px width
- Lazy loading: only images in viewport load eagerly; rest use `loading="lazy"`
- LQIP (low-quality image placeholder) from Sanity metadata — shown while full image loads
- Target: LCP (first visible image) < 2.5s on 4G mobile

---

## 9 — Smoke Test

1. `/portfolio` loads with dark background, all murals in grid
2. "Abstract" filter: only abstract murals shown
3. "Illustrative" filter: only illustrative murals shown
4. "All": returns to full grid
5. Hover (desktop) / tap (mobile): caption reveals correctly
6. "Commission a mural" CTA navigates to `/commission`
7. No broken image slots — every grid cell has a real image
8. Mobile: single column, no horizontal scroll, filter pills scroll horizontally if needed
