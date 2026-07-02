# Good Murals — Research Log
### TYPE: SPEC — sources, market data, competitive findings, and the reasoning behind every strategy decision.

---

## 1 — Why This Doc Exists

Every recommendation in the strategy docs traces back to real research. This is the paper trail. When a future agent or stakeholder asks "why did we build a commission-deposit flow instead of a simple contact form?", the answer is here.

---

## 2 — Business Context

### 2.1 — What we know from the interview

| Fact | Source |
|------|--------|
| Artist type: interior home painter who does murals | Interview |
| Styles: abstract OR illustrative/tattoo-inspired | Interview |
| Price range: $500–$1,500 per mural | Interview |
| Target clientele: wealthy/affluent homeowners | Interview |
| ONE thing the site must do: submit a request for a mural | Interview |
| No existing website mentioned | (silence in brief) |
| No brief links provided | Brief |
| Customer location: unspecified | Brief notes |

### 2.2 — What this pricing means in context

Industry research (HomeAdvisor, Fixr, Caroline in Color) reveals the standard range for hand-painted custom residential murals is **$10–$75/sq ft**, with established artists typically setting minimums of $1,500–$10,000+.

At $500–$1,500 per mural, Good Murals occupies the **accessible luxury tier**: more expensive than DIY kits or generic decorative painters, but entry-level compared to established portfolio artists with $10k minimums (e.g., Allison Kunath: $10,000 minimum; Adrian Landon Brooks: no rates listed, clearly 5-figure). This is actually a strong market position — there are many affluent homeowners who want something custom and hand-painted but can't justify (or aren't ready for) a 5-figure commission. Good Murals can own that segment.

**Strategic implication:** Don't hide the $500–$1,500 range. Make it visible on the commission page. The clients for whom this is "too cheap" to trust aren't the target client. The clients for whom this makes custom murals newly accessible ARE.

---

## 3 — Competitive Research

### 3.1 — Competitors reviewed

**Artworks by Marcine** (artworksbymarcine.com)
- MFA credentials, licensed/bonded/insured, computer mockups before any paint
- Pages: Home, About, Services, Portfolio (subdivided by type), FAQ, Blog, Contact
- Key trust signal: "no subcontractors" — artist does all the work herself
- Commission entry: "private consultation" (no online payment; pure inquiry model)
- Visual: clean, metropolitan, professional

**Allison Kunath Design** (allisonkunath.com)
- $10,000 project minimum stated upfront — filters immediately
- Provides realistic digital mockups in the actual client space before commitment
- Payment structure: 25% / 50% / 25% split across project phases
- Timeline: openly states 3–12 months
- Visual: gallery-white, minimal copy, artwork-forward

**Adrian Landon Brooks** (adrianlandonbrooks.com)
- Artist-as-auteur positioning (CV, past clients, detailed FAQ)
- 10% non-refundable design deposit just to start rendering — then 40% on approval, balance on completion
- No rates listed (prestige positioning — rate is a conversation)
- "Unique visual language cultivated over twenty years" — authority signals
- Visual: editorial, dark, serious

**Yulia Art** (yulia-art.com)
- Nationwide reach from DC base
- Portfolio subdivided: public / commercial / residential — residential is a distinct track
- Prominent "Start a Mural Project" CTA throughout
- Logo clients (Kroger, Audubon Society) = credibility anchors for wealthy homeowners
- Pages include "Education/Consultation" — diversified offering

**Color Dreamers** (colordreamers.com)
- Gallery-first, strongest visual impact of the group
- "Mural Concepts" page (pre-designed options) — reduces friction for indecisive buyers
- Award-winning credentials, museum exhibitions
- Speaks directly to interior designers and architects as co-clients

### 3.2 — What separates Good Murals from these competitors

| Dimension | Good Murals | Established competitors |
|-----------|-------------|------------------------|
| Price point | $500–$1,500 | $2,500–$10,000+ |
| Deposit model | Online deposit at inquiry | Inquiry first, deposit after discovery call |
| Digital mockup | Not specified in brief — to be added if artist offers this | Standard at high-end |
| Minimum | None stated | $1,500–$10,000+ |
| Online presence | Zero (new) | Established portfolios, press features |

**Opportunity:** Good Murals can own "accessible custom" by making the process frictionless (online deposit = no lengthy back-and-forth), while signaling quality through the portfolio presentation.

**Risk:** At $500–$1,500, some visitors may assume "cheaper = lower quality." Mitigation: the portfolio IS the argument. Quality of photography + work speaks louder than price.

---

## 4 — Target Audience Research

### 4.1 — What affluent homeowners care about when hiring a mural artist

From competitive site analysis and review mining (Houzz, Google Business, Yelp for comparable artists):

1. **Transformation narrative** — They're not buying paint; they're buying the permanent transformation of a room into something irreplaceable. The site must speak this language.

2. **Process reassurance** — The biggest fear is "What if I hate it after it's on my wall?" The sites that address this head-on (mockups, revision rounds, phased payments) convert better. Even at $500, the homeowner wants to know how this works.

3. **Artist credibility signals** — Not necessarily formal MFA credentials, but: real completed work in real homes, identifiable location/room context, evidence of hand-skill. The portfolio IS the credential.

4. **Professionalism / no-drama** — Interior designers (a key referral channel) care deeply about this. They need an artist they can confidently hand to a client: shows up on time, doesn't damage the client's home, delivers what was agreed.

5. **Speed of response** — Wealthy clients are accustomed to premium service. The commission form should set clear expectations: "We respond within 48 hours."

### 4.2 — Interior designers as a parallel audience

The research surfaced a consistently high-value audience segment: **interior designers sourcing a custom mural for a client's renovation project**. They:
- Control the referral decision (their client trusts their artist recommendation)
- Care more about professionalism and communication than price
- Often have photos and mood boards ready — they need an artist who can execute a vision, not generate one
- Are repeat-commission sources if the first project goes well

The commission form should have a field: "Are you an interior designer?" with a toggle. If yes, the email to the artist should flag it prominently (these leads get highest priority follow-up).

---

## 5 — SEO Research

From a documented case study (Minneapolis muralist, Modern Search Studio):
- The muralist went from zero to first-page ranking for "custom mural artist Minneapolis" within 8 months using: portfolio images with strong alt text, style-specific landing pages (abstract vs. illustrative), and "how much does a mural cost" FAQ content
- Photo alt text quality was the single biggest SEO lever for a visual portfolio site — Google Image Search drives significant intent-qualified traffic for artists

**Key insight for Good Murals:** Creating distinct `/portfolio/abstract` and `/portfolio/illustrative` pages (or strong filter sections) lets the site target style-specific queries without diluting the general portfolio. Build this into v2 if not v1.

---

## 6 — Commission Flow Research

Industry-standard commission flow (synthesized from JuzPop, Allison Kunath, Adrian Landon Brooks):

1. Inquiry (form submission)
2. Discovery call (artist-to-client)
3. Formal proposal + contract
4. Initial deposit (10–25% "design fee" OR 25–50% project deposit)
5. Design development: sketches → digital mockup in client's actual space
6. Client approval of mockup (1–2 revision rounds)
7. Remaining deposit (to 50%)
8. On-site work (prep, painting, 3–14 days)
9. Final payment on completion
10. Professional photography of finished work

**Why we're using an online deposit at inquiry (not the standard model):**
The $500–$1,500 price point means the discovery-call step risks time-waste on non-serious inquirers. A $250 deposit at inquiry filters immediately — only people who've committed are in the queue. This is explicitly the right choice at this price point. At $10,000+, you can afford the sales-cycle cost; at $500–$1,500, you can't.

**Risks:**
- Some potential clients will bounce at "pay to inquire" — this is a feature, not a bug at this price point
- Must make refund policy crystal clear to avoid chargebacks
- Must collect enough information in the form (dimensions, style, timeline) to make the discovery call productive

---

## 7 — Photography Research

From Artwork Archive (how to photograph large-scale public art) and competitor site analysis:

**The required shot set for each mural:**
1. **Wide establishing shot** (shows scale, room context, architecture) — essential; without this, viewers can't gauge physical presence vs. a wallpaper print
2. **Medium detail shot** (captures the most skill-demonstrating section)
3. **Close-up macro** — especially important for illustrative/tattoo style where linework is the differentiator
4. **Lifestyle context** — furniture in front, accessories, lived-in feel

**Lighting guidance for the BUILD phase brief:**
- Natural light where possible (golden hour for rooms with west-facing windows)
- No harsh flash
- Color temperature 2700K–4000K, CRI 90+ to reproduce paint colors accurately
- Avoid wide-angle distortion

**Minimum portfolio for launch:** 12 murals with at least a wide + detail shot each = 24 images minimum. Ideally 20+ murals.

---

## 8 — Infra Research

| Decision | Rationale |
|----------|-----------|
| AWS region us-east-1 | No customer location given; East Coast default, broadest AWS service availability, Lambda@Edge delivers globally anyway |
| Next.js 15 | Dynamic portfolio routes, ISR for Sanity content, server-side Stripe (no secret key exposure) |
| Sanity CMS | Artist adds murals themselves; free tier sufficient; asset CDN handles image delivery |
| Stripe Connect Standard | Artist is merchant of record; KC earns 5% Technology fee on deposit from customer |
| Plausible | Privacy-first, no cookie banner, $9/mo; tracks commission conversion funnel |
| No YouTube/video | Not requested; portfolio is static images only in v1 |

---

## 9 — Research Limits

1. **Artist's existing photo library** — not seen; BUILD phase assumes artist provides minimum 12 real completed mural photos. If fewer are available at build time, placeholder slots must be clearly marked and BUILD phase emits `pass: false`.

2. **Artist's name** — not provided in the brief. The brand name "Good Murals" is the dashboard slug. About page and commission email will use "Good Murals" as the entity; the artist's personal name will be added by the artist in Sanity after they onboard.

3. **Artist's specific location** — not provided. SEO plan assumes national reach (artist travels). If they're based in a specific city, add local keyword targeting in v2.

4. **Domain** — not specified. Artist must choose and purchase. Recommendations in `02_STRATEGY.md` §3.5.

5. **Stripe Connect account** — does not exist yet; must be created during the payment-onboarding finish step.

---

## 10 — Sources

- [Artworks by Marcine](https://www.artworksbymarcine.com/)
- [Allison Kunath — Mural Commission Process](https://www.allisonkunath.com/mural-commission-process)
- [Adrian Landon Brooks — Mural Commissions FAQ](https://www.adrianlandonbrooks.com/mural-commissions-faq)
- [Yulia Art](https://yulia-art.com/mural-artist-portfolio/)
- [Color Dreamers](https://colordreamers.com/)
- [HomeAdvisor — How Much Does a Mural Cost?](https://www.homeadvisor.com/cost/painting/paint-a-mural-or-tromp-loeil/)
- [Fixr — Wall Mural Cost](https://www.fixr.com/costs/paint-wall-mural)
- [Caroline in Color — Mural Pricing](https://carolineincolor.com/blog/mural-pricing)
- [Modern Search Studio — Minneapolis Muralist SEO Case Study](https://www.modernsearchstudio.com/seo-growth-case-study-muralist-to-authority)
- [JuzPop — The Process of Commissioning a Mural](https://www.juzpop.com/post/the-process-of-commissioning-a-mural-from-consultation-to-installation)
- [Artwork Archive — How to Photograph Large-Scale Art](https://www.artworkarchive.com/blog/how-to-photograph-your-public-art-and-large-scale-installations)
