# Good Murals — SEO Plan
### TYPE: SPEC — keyword strategy, on-page SEO, schema markup, and content plan.

---

## 1 — Goal

Rank on page one for the searches a wealthy homeowner or interior designer types when they're ready to hire someone to paint a custom mural. Two fights:

1. **Organic image/portfolio search** — people searching "custom mural artist" and clicking image results that lead back to the portfolio
2. **High-intent transactional search** — "commission a mural for my home," "residential mural painter," "abstract mural artist for hire"

This is NOT a local SEO play (the artist travels for commissions). National-scope, style-specific keywords with purchase intent.

---

## 2 — What Exists Today

| Layer | Status | Gap |
|-------|--------|-----|
| Domain authority | None (new site) | Build with content + backlinks over time |
| On-page SEO | None | Full build |
| Schema markup | None | `LocalBusiness` + `Person` + `Service` + `ImageGallery` |
| Image alt text | None | Every mural photo needs specific descriptive alt text |
| Google Search Console | None | Set up at launch |

---

## 3 — Keyword Clusters

```
Cluster 1 — High-intent commission (primary conversion target)
  • custom mural artist for hire
  • commission a wall mural
  • residential mural artist
  • mural painter for home
  • custom wall mural commission
  • interior mural painting service
  • hire a mural artist

Cluster 2 — Style-specific (medium volume, high conversion)
  • abstract mural artist
  • abstract wall mural custom
  • illustrative mural painting
  • tattoo style wall mural
  • botanical mural artist
  • large scale abstract painting
  • neo traditional mural art

Cluster 3 — Room/interior context (long-tail, buyer-intent)
  • dining room mural ideas custom
  • bedroom mural artist
  • entryway mural painted
  • home office mural ideas
  • luxury home mural
  • high end mural artist residential

Cluster 4 — Price/quality signals
  • how much does a custom wall mural cost
  • custom mural artist near me
  • professional mural painter

Cluster 5 — Interior design professional sourcing
  • mural artist for interior designers
  • commission mural for client
  • custom art installation residential
```

### What we are NOT chasing
- "Wall mural" (too broad — dominated by vinyl decals, removable murals, wallpaper)
- "Mural near me" (this isn't local — artist travels; we can't own it)
- "DIY mural" — wrong audience entirely

---

## 4 — On-Page SEO Rules

### Page title pattern
`[Service or page topic] | Good Murals`

Examples:
- `Custom Residential Mural Artist | Good Murals`
- `Mural Portfolio — Abstract & Illustrative | Good Murals`
- `Commission a Custom Wall Mural | Good Murals`

50–60 characters, primary keyword first.

### Meta description pattern
140–160 characters, includes primary keyword + a CTA.

Example for homepage:
> "Hand-painted abstract and illustrative murals for residential interiors. Commission a bespoke mural starting at $500 — designed for your wall, painted by hand."

### Heading rules
- One H1 per page, includes the primary keyword
- H2s map to real visitor questions: "How does a commission work?" "What styles do you paint?" "What does a custom mural cost?"
- Semantic HTML: `<article>`, `<section>`, `<figure>`, `<figcaption>` for portfolio images

### Image SEO rules (critical for a portfolio site)
Every mural image has:
- Descriptive `alt` text: `alt="Abstract mural in dining room, 14 by 9 feet, hand-painted pigment, Brooklyn NY"` — not `alt="mural.jpg"`
- Next.js `<Image />` for WebP/AVIF conversion + lazy loading
- Compressed to ≤200KB for portfolio thumbnails, ≤800KB for full-size (Sanity handles optimization)
- File naming before upload: `abstract-dining-room-mural-brooklyn.jpg` not `IMG_4321.jpg`

### Internal linking
- Every portfolio mural caption links to `/commission`
- Homepage hero CTA → `/commission`
- About page → `/portfolio` + `/commission`
- Footer has text links to all pages (crawler-friendly)

---

## 5 — Schema.org Markup

### Person schema (artist)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Good Murals",
  "jobTitle": "Mural Artist",
  "url": "https://good-murals-jgwa7.yourproject.ai",
  "sameAs": [],
  "knowsAbout": [
    "Abstract Mural Painting",
    "Illustrative Wall Murals",
    "Residential Interior Murals",
    "Custom Commissioned Art"
  ]
}
```

### Service schema (commission page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Wall Mural Commission",
  "provider": {
    "@type": "Person",
    "name": "Good Murals"
  },
  "description": "Bespoke hand-painted murals for residential interiors. Abstract and illustrative styles. Custom designed for your space.",
  "offers": {
    "@type": "Offer",
    "priceRange": "$500 - $1500",
    "priceCurrency": "USD"
  }
}
```

### ImageGallery schema (portfolio page)
```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Good Murals Portfolio",
  "description": "Portfolio of hand-painted custom wall murals — abstract and illustrative styles",
  "url": "https://good-murals-jgwa7.yourproject.ai/portfolio"
}
```

Validate every type at `https://search.google.com/test/rich-results` before shipping.

---

## 6 — Technical SEO Checklist

```
[ ] Next.js metadata API used on every page (title, description, OG)
[ ] Sitemap.xml auto-generated at /sitemap.xml
[ ] Robots.txt published
[ ] JSON-LD structured data on every page
[ ] OG image 1200×630 for social sharing (homepage mural hero)
[ ] Canonical URLs set
[ ] HTTPS enforced (Amplify + Cloudflare)
[ ] Page load < 2.5s LCP on mobile (Next/Image + Sanity CDN)
[ ] All images have descriptive alt text
[ ] No broken links
[ ] Google Search Console verified at launch
[ ] Plausible analytics installed
```

---

## 7 — Google Business Profile

**NOT the primary play for this business** (artist travels; no fixed address to optimize). However:

- Create a GBP as an "Online business" or "Service-area business" to capture brand search
- Categories: "Mural Painter," "Visual Artist," "Art Studio"
- Include 5+ portfolio photos in the GBP listing
- Link to `/commission` in the booking button

---

## 8 — Backlinks (slow but durable)

For a portfolio/commission site, the best organic backlinks come from:

1. **Interior design blogs and publications** — pitch the work to Apartment Therapy, Design Milk, Dezeen. One feature = dozens of backlinks
2. **Instagram/Pinterest** — portfolio images shared on social will link back; include watermark on shareable versions
3. **Client testimonials with links** — interior designers who post project features and credit the artist
4. **Local press** (wherever artist is based) — "local artist transforms homes" is a perennial feature story

---

## 9 — Content Strategy

For a portfolio artist, the site IS the content. The SEO levers are:
- Real mural photos with strong alt text (Google Image Search → portfolio → commission)
- Descriptive portfolio captions (room type, dimensions, city, style)
- Commission page that answers "how much does a mural cost?" explicitly
- A 2–3 paragraph About that uses the vocabulary buyers search: "residential mural," "commission," "abstract," "illustrative," "hand-painted"

**No blog required in v1.** If the artist wants to add a journal in v2, target posts at:
- "How to commission a custom mural" (process transparency → trust)
- "Abstract vs. illustrative murals — which is right for your room?"
- "What to expect from a residential mural project" (FAQ → conversion)

---

## 10 — Reporting

Monthly, KC delivers a one-page snapshot:
- Search Console clicks + top queries
- Portfolio page views (from Plausible)
- Commission form starts vs. completions (conversion rate)
- Any new backlinks acquired
