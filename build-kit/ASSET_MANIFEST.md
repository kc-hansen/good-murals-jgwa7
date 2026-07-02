# Good Murals — Asset Manifest
### TYPE: SPEC — every asset the BUILD phase needs, and where it comes from.

---

## Logo / Wordmark

**Status: No logo yet.** Use wordmark for v1.

```
GOOD MURALS
```

Rendered in DM Sans Bold, all-caps, `letter-spacing: 0.08em`. Color:
- On dark (--gm-ink): `--gm-gold #C9A84C`
- On light (--gm-linen): `--gm-ink #0F0F0F`

**When a logo arrives:** brief is "A single bold brushstroke — gestural, confident, one mark. No text included."

---

## Favicon Set (required before launch)

**Generate from the wordmark lettermark "GM" on dark background.**

| File | Size | Path | Status |
|------|------|------|--------|
| `favicon.ico` | 32×32 | `public/favicon.ico` | BUILD phase generates from wordmark |
| `icon.png` | 512×512 | `app/icon.png` (Next.js App Router) | BUILD phase generates |
| `apple-touch-icon.png` | 180×180 | `public/apple-touch-icon.png` | BUILD phase generates |

Method: crop the "GM" lettermark from the wordmark, set on `#0F0F0F` background with gold text, export at required sizes using ImageMagick or the browser canvas. Wire via `app/icon.png` (Next.js auto-picks up) + `<link rel="apple-touch-icon">` in `app/layout.tsx`.

---

## OG Images

| File | Page | Content | Size | Status |
|------|------|---------|------|--------|
| `public/og/home.jpg` | `/` | Hero mural (item #1 from agreed_plan.md) cropped to 1200×630 | 1200×630 | Artist-provided → BUILD crops |
| `public/og/portfolio.jpg` | `/portfolio` | Second-strongest mural, similar crop | 1200×630 | Artist-provided → BUILD crops |
| `public/og/commission.jpg` | `/commission` | Mural detail shot — atmospheric, dark | 1200×630 | Artist-provided → BUILD crops |
| `public/og/about.jpg` | `/about` | Artist-at-work photo cropped | 1200×630 | Artist-provided → BUILD crops |

---

## Design Token Reference

Full tokens in `docs/01_BRAND_AND_TONE.md` §5. Quick copy-paste for `globals.css`:

```css
:root {
  --gm-ink:       #0F0F0F;
  --gm-charcoal:  #1C1C1C;
  --gm-ash:       #2E2E2E;
  --gm-smoke:     #6B6B6B;
  --gm-linen:     #F4F1EC;
  --gm-cream:     #FAFAF8;
  --gm-gold:      #C9A84C;
  --gm-gold-dark: #A68A30;

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'DM Mono', 'Courier New', monospace;
}
```

---

## Mural Photos (source: artist-provided)

Artist must provide a minimum of 15 unique mural photos before BUILD begins. See full list in `agreed_plan.md` § Photo Source List.

**Upload workflow:**
1. Artist sends photos (Google Drive / Dropbox / WeTransfer)
2. KC uploads to Sanity CMS (`good-murals` project)
3. Tag each with: style (`abstract` or `illustrative`), dimensions, room type, city (optional)
4. Mark 3 as `featured: true` for homepage portfolio teaser
5. Set hero mural as `siteSettings.heroMuralImage`
6. Set artist-at-work photo as `siteSettings.artistWorkingPhoto`

**File naming before upload:** `{style}-{room}-{dimensions}-{city}.jpg`
- Example: `abstract-dining-room-14x9ft-brooklyn.jpg`
- Example: `illustrative-bedroom-botanical-8x10ft-chicago.jpg`
