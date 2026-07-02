# Good Murals — Brand & Tone Guidelines
### TYPE: SPEC — visual identity, palette, voice, and typography for every page.

---

## 1 — Who Good Murals Is

Good Murals is a one-artist studio creating bespoke large-scale wall murals for affluent residential interiors. Two distinct styles:

**Abstract** — Expressive, gestural, bold. Think color-field painting at room scale: layered sweeps, organic shapes, palette-knife texture translated to wall. Not decorative; declarative. Each abstract mural is a statement piece that makes a room.

**Tattoo/Illustrative** — Precise, narrative, intricate. Botanical botanicals, neo-traditional iconography, custom imagery drawn from the client's story. The kind of mural that stops visitors in their tracks to look closer.

The artist travels to clients. The work is custom, one-of-a-kind, and at a price point that filters for clients who value craft over commodity. The sweet spot is interior designers sourcing a differentiating feature for a high-end renovation and individual homeowners investing in something permanent and personal.

---

## 2 — Brand Pillars

| Pillar | What it means | What it does NOT mean |
|--------|---------------|-----------------------|
| **Bold** | Color at scale, confident mark-making, work that owns the room | Garish, busy, "kids room" decorative |
| **Intentional** | Every mural designed for its specific wall, client, and light | Generic prints scaled up, copy-paste patterns |
| **Craft** | Visible skill — the hand of the artist in every inch | Machine output, digital prints, vinyl wraps |
| **Elevated** | Premium positioning; speaks the language of interior design | Stuffy, inaccessible, exclusionary |

---

## 3 — Voice & Tone

### The voice

Confident and direct, with the visual shorthand of an artist who lets the work do most of the talking. The copy is minimal — not because there's nothing to say, but because a portfolio page should feel like a gallery wall, not a brochure.

When the copy does speak, it's specific and material: "fifteen feet of hand-mixed pigment" not "vibrant colors," "botanical illustration in charcoal and gold leaf" not "beautiful design," "two coats over three days" not "meticulous process."

### Tone sliders by context

| Context | Slider |
|---------|--------|
| Homepage hero | 80% image / 20% words — minimal, arresting |
| Portfolio captions | Specific + factual — room, dimensions, style, palette used |
| Commission page | 30% evocative / 70% practical — enough warmth to invite, enough clarity to convert |
| About page | 70% personal / 30% credential — story, not resume |
| Form labels / confirmations | 5% evocative / 95% practical — no friction |

### Words Good Murals uses

**Yes:** transform, scale, commission, bespoke, hand-painted, original, study, palette, pigment, wall, room, space, render, composition, botanical, layer, gesture, detail, tailored, one-of-a-kind, made for you, your wall.

**Sparingly:** luxury, elevated, artisan, curated, statement.

**Never:** vibrant, stunning, amazing, passion, journey, pop of color, unique (every mural is — don't say it), affordable (this is not the positioning), fast (not a speed play), accent wall (too diminutive for this work).

### Rhythm

Short declarative sentences. Image-forward pages. Let whitespace work. Pull quotes in a contrasting weight.

---

## 4 — Tagline

**"Your walls, made unforgettable."**

Secondary options:
- "Commission a mural. Own a room."
- "Hand-painted murals for homes that dare to be remarkable."

Use the primary tagline as the homepage subhead directly under the hero. The others can appear in meta descriptions or OG copy.

---

## 5 — Visual Identity

### Color Palette

The murals are colorful; the site is not. The site is the gallery, and galleries are neutral so the art speaks.

```css
--gm-ink:       #0F0F0F   /* near-black — primary text, backgrounds */
--gm-charcoal:  #1C1C1C   /* secondary dark surface */
--gm-ash:       #2E2E2E   /* tertiary surface — card backgrounds */
--gm-smoke:     #6B6B6B   /* secondary text, captions, metadata */
--gm-linen:     #F4F1EC   /* light mode body — warm off-white, not pure white */
--gm-cream:     #FAFAF8   /* hero backgrounds, card surfaces in light mode */
--gm-gold:      #C9A84C   /* single accent — CTAs, hover underlines, price */
--gm-gold-dark: #A68A30   /* hover state of gold */
```

**Mode:** Dark-first. The portfolio and hero sections use dark backgrounds so the mural photography pops without competing. Text sections (about, commission instructions) use linen/cream.

**Use rules:**
- Black (`--gm-ink`) is the canvas for portfolio and hero
- Gold (`--gm-gold`) is the ONLY color element on the dark canvas — CTAs, price display, active nav item
- Linen is for text-heavy sections
- Never use white-on-white or black-on-black for body copy

### Typography

```css
--font-display: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
--font-body:    'DM Sans', 'Inter', system-ui, sans-serif;
--font-mono:    'DM Mono', 'Courier New', monospace; /* for dimensions/specs */
```

- **Playfair Display (display):** H1, H2, pull quotes. Italic for emotional statements; upright for page titles.
- **DM Sans (body):** Nav, paragraphs, form labels, captions. Clean, warm, readable.
- **DM Mono (mono):** Room dimensions, price range, mural size specs — signals precision.

### Imagery Direction

**What we want in every photo:**
- Full-room shots showing scale — the mural in context with furniture, light, people
- Detail shots showing hand quality — brush texture, paint build-up, precision linework
- Warm natural light or dramatic tungsten; no harsh flash
- Clean walls and styled rooms (the client's space matters as much as the mural)
- Before/after pairings where the client approves sharing
- The artist at work — hands, brushes, scaffolding — not posed portraits

**Avoid:**
- Cropped, context-free close-ups that could be a print
- Oversaturated filters that misrepresent the actual colors
- Empty-room shots that feel like real estate photography
- Stock photography of any kind — everything on this site must be the artist's real work

### Layout patterns

**Portfolio grid:** Masonry, full-bleed, dark background. No white borders. Minimal captions on hover/tap.
**Commission form:** Clean, airy, linen background. One question per section, no walls of fields.
**Hero:** Full-viewport mural image, headline overlaid in large Playfair Display, single gold CTA button.

---

## 6 — Logo Direction

Until a proper mark exists, use a **wordmark**:

```
GOOD MURALS
```

DM Sans Bold, all-caps, tight tracking (`letter-spacing: 0.08em`). Color: `--gm-gold` on dark, `--gm-ink` on linen.

If a mark is commissioned: "A single bold brushstroke — gestural, confident, one mark. No iconography, no swooshes. The kind of mark that could be stenciled on a wall."

---

## 7 — Voice in the Wild — Worked Examples

### Homepage hero (good)
> *Your walls, made unforgettable.*
>
> Abstract and illustrative murals, hand-painted for homes that mean something.
>
> [Commission a mural →]

### Homepage hero (bad)
> We are passionate artists creating stunning, vibrant, one-of-a-kind custom murals that transform your living space into a work of art!

### Portfolio caption (good)
> Abstract / 14 × 9 ft / Dining room, Brooklyn / Hand-mixed pigment on plaster

### Portfolio caption (bad)
> Beautiful abstract mural in a dining room! Love how the colors pop!

### Commission page intro (good)
> A custom mural starts with a conversation. Tell us about your wall: dimensions, light, the feeling you want it to hold. We'll follow up within 48 hours.

### Commission page intro (bad)
> We'd love to work with you! Fill out the form below and we'll get back to you as soon as possible to discuss your amazing project!

### About page opener (good)
> I've been painting other people's walls since 2017. Every one has been different. The goal is the same: make the room irreplaceable.

---

## 8 — Boundaries

The site never:
- Uses stock photography — every image is a real completed mural by the artist
- Implies a price that isn't in the commission guide (no "starting at $99" bait-and-switch)
- Shows a mural from another artist's portfolio
- Claims specialties or styles not represented in the actual portfolio
- Uses urgency tactics ("only 3 slots left this month!") — this is not the positioning
