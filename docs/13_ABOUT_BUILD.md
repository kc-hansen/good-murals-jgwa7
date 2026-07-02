# Good Murals — About Page Build Spec
### TYPE: SPEC — implementation detail for the `/about` route.

---

## 1 — Goal

The about page is the human moment that closes undecided visitors. It:
- Introduces the artist as a real person with a specific perspective on their craft
- Provides credentials that signal this is skilled work worth $500–$1,500
- Ends with a CTA to `/commission`
- Has one strong photo (artist at work, not a corporate headshot)

---

## 2 — Sections (in order)

### Section 1: Page Header (linen background)
- No hero image — linen allows the text to breathe
- Headline (Playfair Display, italic):
  > "Every mural is made for a specific wall in a specific room."
- Subhead (DM Sans):
  > "We don't make generic art. We make art for your home."

### Section 2: Artist Story (2-column on desktop, stacked mobile)
- **Left:** Large photo of the artist at work — hands, brush, wall in progress. NOT a studio portrait. Warm, natural light. (Source: artist-provided. If no suitable photo exists, use a detail shot of a completed mural and add the portrait in v2.)
- **Right:** 4–6 paragraph artist story (Sanity `aboutPage.artistStory`)
  
  Copy intent: written in the artist's voice. The story should include:
  - What drew them to murals specifically (not painting in general)
  - The two styles they work in (abstract / illustrative) and what each means to them
  - A specific thing they love about the moment when a room is transformed
  - Something honest about what it's like to paint in someone else's home (the responsibility, the intimacy, the trust)
  - NOT: credentials list, awards, lengthy resume

  Sample opening (replace with artist's real words):
  > "I started painting walls because I got tired of looking at empty white space. Not mine — other people's. There's so much potential in a room's walls that most people never use.
  >
  > I work in two modes. Abstract: when a client wants something that fills a room with feeling, color, presence. Illustrative: when they have a specific image — a botanicals, a story, a piece of their own history they want permanently on a wall.
  >
  > Either way, the job is the same: make it irreplaceable."

### Section 3: Style Deep-Dive
- Two columns (or stacked mobile), each with one mural photo + style description
- Abstract:
  - Photo: best abstract mural (wide shot preferred)
  - Copy (3–4 sentences): what abstract work means, where it comes from, who it's for
- Illustrative:
  - Photo: best illustrative mural (detail shot preferred to show linework)
  - Copy (3–4 sentences): what illustrative/tattoo-style work means, the narrative dimension

### Section 4: Credentials (minimal, honest)
- NOT a bulleted resume. One short paragraph:
  > "Good Murals has painted [X] murals across residential interiors since [year]. Every mural is executed by the same artist — no assistants, no subcontractors. If you've seen the portfolio, you've seen exactly what you'll get."
- All facts here are Sanity fields (`aboutPage.muralCount`, `aboutPage.yearsActive`) — the artist keeps them current

### Section 5: Commission CTA
- Dark background (--gm-ink)
- Same copy as homepage Section 4:
  > "Ready to transform a room?"
  > "Custom murals from $500. Tell us about your wall — we'll follow up within 48 hours."
- Gold button: "Start a commission →" → `/commission`

---

## 3 — Photos for This Page

| # | Section | Shot | Source |
|---|---------|------|--------|
| 1 | Artist story | Artist painting a wall — close-up on hands/brushwork. Warm light. NOT posed portrait | Artist-provided |
| 2 | Abstract deep-dive | Same as homepage Style Intro abstract photo or a different strong abstract | Artist-provided |
| 3 | Illustrative deep-dive | Best illustrative mural with visible linework | Artist-provided |

If the artist doesn't have a photo of themselves at work, use a strong detail shot of a completed mural for Section 2's left column and note in build: `[artist-working-photo: MISSING — use mural detail shot as fallback, add real photo in v2]`.

---

## 4 — Sanity Schema: `aboutPage`

```typescript
// sanity/schemas/aboutPage.ts
import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'artistPhoto', title: 'Artist Working Photo', type: 'image' }),
    defineField({ name: 'artistStory', title: 'Artist Story (paragraphs)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'muralCount', title: 'Murals Completed (number)', type: 'number' }),
    defineField({ name: 'yearsActive', title: 'Years Active (e.g. "since 2017")', type: 'string' }),
    defineField({ name: 'abstractStyleDescription', title: 'Abstract Style Description', type: 'text', rows: 3 }),
    defineField({ name: 'illustrativeStyleDescription', title: 'Illustrative Style Description', type: 'text', rows: 3 }),
    defineField({ name: 'abstractStylePhoto', title: 'Abstract Style Photo', type: 'image' }),
    defineField({ name: 'illustrativeStylePhoto', title: 'Illustrative Style Photo', type: 'image' }),
  ],
})
```

---

## 5 — Mobile Spec (390px)

- Artist story section: stacked — photo full-width first, then text
- Style deep-dive: stacked — abstract then illustrative
- Commission CTA: same as all other pages

---

## 6 — Smoke Test

1. `/about` renders with linen header, headline, body
2. Artist photo loads (no placeholder)
3. Abstract + Illustrative sections each have their photo
4. "Start a commission →" navigates to `/commission`
5. Mobile: no horizontal overflow, images fill correctly
