# Good Murals — Commission Page Build Spec
### TYPE: SPEC — implementation detail for the `/commission` route (the ONE thing).

---

## 1 — Goal

The commission page is the primary conversion point. It:
- Explains how commissioning a mural works (process transparency = trust)
- Collects all the information needed to make the follow-up call productive
- Collects the qualifying deposit ($250) via Stripe Checkout
- Sends an immediate confirmation to the client and a notification to the artist
- Works perfectly on mobile (most affluent homeowners browse on iPhone)

---

## 2 — Sections (in order)

### Section 1: Page Header
- Linen background (--gm-linen), large padding
- Headline (Playfair Display, 48px+):
  > "Commission a mural."
- Subhead (DM Sans):
  > "Tell us about your wall. We'll follow up within 48 hours with next steps."
- No hero image (linen background lets the form breathe)

### Section 2: How It Works
- 3-step visual process (numbered, horizontal on desktop, stacked on mobile)
- Step 1: "Tell us about your wall" — fill the form below, submit with deposit
- Step 2: "We talk" — 48-hour follow-up call to discuss vision, dimensions, timeline
- Step 3: "We make it" — custom design mockup → approval → on-site painting
- Each step has a 2-sentence description, no icons (text only, or very minimal line art)

### Section 3: Price & Deposit Info
- Styled info block (--gm-ash background, border-l gold):
  - "**Murals from $500–$1,500.** Final price depends on wall size, design complexity, and travel. We'll confirm the total before any painting begins."
  - "**$250 qualifying deposit required to submit.** Credited toward your project total. Refundable if we determine it's not a fit after our initial call."
  - "The deposit is processed securely by Stripe. The artist never sees your card details."

### Section 4: Commission Form

Fields (in order):
1. **Your name** — text, required
2. **Email address** — email, required
3. **Phone number** — tel, optional (but recommended — "for our 48-hour follow-up")
4. **Are you an interior designer?** — toggle/checkbox, optional (affects email flagging)
5. **Wall dimensions** — text, required, placeholder: "e.g. 12 ft wide × 9 ft tall"
6. **Style preference** — radio: Abstract / Illustrative / Open to suggestions
7. **Room type** — select: Dining room / Bedroom / Entryway / Living room / Home office / Nursery / Other
8. **Preferred timeline** — select: Within 3 months / 3–6 months / 6–12 months / No rush
9. **Tell us about the room and your vision** — textarea, 4 rows, optional, placeholder: "What's the room like? Any colors, imagery, or feelings you want the mural to evoke? No need to be technical — we'll draw out the details on our call."
10. **How did you hear about us?** — text, optional
11. **CTA button:** "Submit & Pay $250 Deposit →" — gold, full-width on mobile, 52px height
    - On click: POST to `/api/checkout`, redirect to Stripe Checkout
    - While loading: button disabled, spinner in place of arrow

### Section 5: Commission Success Page (`/commission/success`)
- Linen background
- Headline: "We got it."
- Body:
  > "Your deposit is confirmed. We'll be in touch within 48 hours. Check your email for a confirmation."
- "Back to the portfolio →" link

### Section 6: FAQ
- 4–6 common questions, collapsed accordion on mobile
- Q: "What's included in the deposit?" → "Your $250 deposit goes toward your total project cost — it's not a separate fee. We only ask for it upfront to keep our calendar to serious commissions."
- Q: "What if I need to cancel?" → "If we determine the project isn't a fit after our initial call, we refund the deposit in full. If you need to cancel after design work has begun, the deposit is non-refundable."
- Q: "Do I get to see a mockup before painting starts?" → "Yes — after our call, we provide a digital rendering of the design in your actual space before a single brushstroke. We refine until you're completely happy."
- Q: "Do you travel?" → "Yes. We travel to client locations. Travel fees may apply for projects outside [artist's city — Sanity field]; we'll confirm in our initial call."
- Q: "How long does a mural take?" → "On-site painting typically takes 2–5 days depending on scale and complexity. We'll confirm the timeline in our proposal."
- Q: "Can I see your portfolio?" → "Absolutely — [View the portfolio →]"

---

## 3 — Code

```tsx
// app/(marketing)/commission/page.tsx
import type { Metadata } from 'next'
import { CommissionForm } from '@/components/commission/CommissionForm'
import { DepositExplainer } from '@/components/commission/DepositExplainer'
import { sanityClient } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Commission a Custom Wall Mural | Good Murals',
  description:
    'Request a hand-painted custom mural for your home. Abstract and illustrative styles. ' +
    'From $500. Submit with a $250 deposit — credited toward your project total.',
  openGraph: {
    title: 'Commission a Mural — Good Murals',
    description: 'Tell us about your wall. We respond within 48 hours.',
    images: ['/og/commission.jpg'],
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/commission` },
}

export default async function CommissionPage() {
  const settings = await sanityClient.fetch(siteSettingsQuery)
  return (
    <main>
      <PageHeader />
      <HowItWorks />
      <DepositExplainer depositAmountCents={settings.depositAmountCents} depositPolicyCopy={settings.depositPolicyCopy} />
      <CommissionForm />
      <CommissionFaq />
    </main>
  )
}
```

```tsx
// components/commission/CommissionForm.tsx
'use client'

import { useState } from 'react'

export function CommissionForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
      else throw new Error('No checkout URL returned')
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-6 py-16">
      {/* fields as described in Section 4 */}
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gm-gold text-gm-ink font-body font-semibold py-4 rounded-sm
                   hover:bg-gm-gold-dark transition-colors disabled:opacity-60"
      >
        {loading ? 'Redirecting to payment...' : 'Submit & Pay $250 Deposit →'}
      </button>
      <p className="text-sm text-gm-smoke mt-3 text-center">
        Processed securely by Stripe. The artist never sees your card details.
      </p>
    </form>
  )
}
```

---

## 4 — Mobile Spec

At 390px:
- Page header: 40px padding top, headline 36px
- How It Works: vertical stack, each step numbered clearly
- Deposit info block: full-width, left border in gold, body text 15px
- Form: single column, all fields full-width
- Textarea: 4 rows, resizable
- Submit button: full-width, 56px height
- FAQ: accordion (collapsed by default); each item taps to expand

---

## 5 — Validation Rules

Server-side (in `/api/checkout/route.ts`):
- `name`: required, string, max 200 chars
- `email`: required, valid email format
- `wallDimensions`: required, string, max 200 chars
- `style`: required, one of `['abstract', 'illustrative', 'open']`
- `roomType`: required, one of the allowed values
- `timeline`: required, one of the allowed values

Client-side (HTML5): `required` on name, email, wallDimensions, style, roomType, timeline. Real-time validation on email blur.

---

## 6 — Smoke Test

1. Form renders at `/commission`
2. Submit with incomplete required fields → validation errors shown, no API call
3. Submit with valid data → loading state on button
4. Stripe Checkout page appears with correct line items (Deposit + Technology fee)
5. Test card `4242 4242 4242 4242` → success redirect to `/commission/success`
6. Artist notification email received at `RESEND_TO_ARTIST`
7. Client confirmation email received at submitted email address
8. Cancel on Stripe → returns to `/commission?cancelled=true` with a soft "no problem" message
9. Mobile: all fields reachable, button above keyboard fold, no horizontal scroll

---

## 7 — What This Page Does NOT Do

- Take full payment for the mural (deposit only — balance handled offline)
- Store the form data in any database (it lives in Stripe metadata + the artist's email inbox)
- Show a mockup or design preview before the form submission
- Handle refunds (artist processes via Stripe Dashboard)
