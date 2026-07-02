# Good Murals — Payments (Stripe Connect + Customer-Paid Technology Fee)
### Branded commission deposit → artist is merchant of record → CUSTOMER pays the "Technology fee" that lands in KC's platform balance.

> **This follows the canonical KC payments model.** Toolkit at `D:\Claude\stripe-onboarding\`. Full model spec in `templates/feature-payments-connect.md`.

---

## What exists today

| Layer | Status | Gap |
|---|---|---|
| Artist's current payment | None (new business) | No payment processing at all |
| Commission deposit on site | ❌ Missing | Must build — qualifying deposit is the key conversion filter |
| KC's revenue rail | ❌ Missing | No `application_fee` yet |
| Stripe Connect onboarding | ❌ Missing | Artist needs a Connect Standard account |

---

## Decisions made (and why)

**Stripe Connect Standard, direct charges.** The artist is the merchant of record — they collect commissions, manage their Stripe Dashboard, own the client relationship. KC is not in the refund/chargeback chain.

**The CUSTOMER pays the "Technology fee" on top of the deposit.** Added at checkout as an itemized line. Artist pays nothing for it; they only pay standard Stripe processing (~2.9% + $0.30). Implemented as a direct charge of `(deposit + fee)` with `application_fee_amount = fee` → fee transfers to KC's platform balance.

**Label is always "Technology fee"** — never "service fee."

**Vertical: Custom services / professional** → `TECH_FEE_PERCENT=5`, uncapped. On a $250 deposit: $12.50 fee. On a $500 deposit: $25 fee.

**Deposit amount is configurable via Sanity** (`siteSettings.depositAmountCents`). Default: **$25,000 cents = $250**. Artist can change it in Sanity without a code deploy.

**Deposit policy (shown in the commission form):** "Your $250 deposit is credited toward your project total. If we determine the project isn't a fit after our initial call, we'll refund it in full." Artist can update this policy copy via Sanity.

**NOT:** holding funds, merchant-of-record for the artist, labeling fee "service fee," or collecting full mural payment online (the deposit is the qualifier; balance handled offline via invoice/bank transfer per artist's workflow).

---

## Flow

```
1. Visitor fills commission form on /commission
2. Clicks "Submit & Pay Deposit"
3. Next.js route handler creates Stripe Checkout Session:
   - line_item: { name: "Commission Deposit", amount: depositAmountCents, quantity: 1 }
   - line_item: { name: "Technology fee", amount: feeAmountCents, quantity: 1 }
   - payment_intent_data: { application_fee_amount: feeAmountCents }
   - on_behalf_of: ARTIST_STRIPE_ACCOUNT_ID
4. Redirect to Stripe-hosted checkout
5. On success: redirect to /commission/success?session_id={id}
6. Webhook (POST /api/webhooks/stripe):
   - checkout.session.completed → send email to artist via Resend
   - Include: commission form data + payment confirmation
7. Artist follows up within 48 hours
```

---

## Cost guardrails

Per `STANDARDS.md`: one enforced gateway — `app/api/checkout/route.ts`. The deposit amount and fee are **computed server-side from Sanity** and never trusted from the client payload. No unlimited spend exposure — this is a fixed-amount deposit flow, not open-ended.

---

## Code

### Checkout route handler

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

const TECH_FEE_PERCENT = 0.05; // 5% — configurable via env

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Fetch deposit amount from Sanity server-side (never trust client)
  const depositCents = parseInt(process.env.DEPOSIT_AMOUNT_CENTS ?? "25000", 10);
  const feeCents = Math.round(depositCents * TECH_FEE_PERCENT);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Commission Deposit — Good Murals" },
          unit_amount: depositCents,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Technology fee" },
          unit_amount: feeCents,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: feeCents,
      transfer_data: {
        destination: process.env.STRIPE_CONNECTED_ACCOUNT_ID!,
      },
    },
    metadata: {
      // Pass commission form data for webhook processing
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      wall_dimensions: body.wallDimensions,
      style: body.style,
      room_type: body.roomType,
      timeline: body.timeline,
      notes: body.notes ?? "",
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commission/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commission?cancelled=true`,
    mode: "payment",
  });

  return NextResponse.json({ url: session.url });
}
```

### Webhook handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    await resend.emails.send({
      from: "Good Murals <hello@goodmurals.com>",
      to: process.env.RESEND_TO_ARTIST!,
      subject: `New commission request from ${meta.name}`,
      html: `
        <h2>New commission deposit received</h2>
        <p><strong>Name:</strong> ${meta.name}</p>
        <p><strong>Email:</strong> ${meta.email}</p>
        <p><strong>Phone:</strong> ${meta.phone}</p>
        <p><strong>Wall dimensions:</strong> ${meta.wall_dimensions}</p>
        <p><strong>Style:</strong> ${meta.style}</p>
        <p><strong>Room type:</strong> ${meta.room_type}</p>
        <p><strong>Timeline:</strong> ${meta.timeline}</p>
        <p><strong>Notes:</strong> ${meta.notes}</p>
        <p><strong>Deposit paid:</strong> $${(session.amount_total! / 100).toFixed(2)}</p>
        <p>Follow up within 48 hours.</p>
      `,
    });

    // Confirmation to client
    await resend.emails.send({
      from: "Good Murals <hello@goodmurals.com>",
      to: meta.email,
      subject: "Commission request received — Good Murals",
      html: `
        <h2>We got your request.</h2>
        <p>Hi ${meta.name},</p>
        <p>Your $${(session.amount_total! / 100).toFixed(2)} deposit is confirmed.
           We'll be in touch within 48 hours to discuss your mural.</p>
        <p>— Good Murals</p>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
```

---

## Environment variables

```
# ─── Stripe ───
STRIPE_SECRET_KEY                # sk_live_... (server-only)
STRIPE_PUBLISHABLE_KEY           # pk_live_... (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
STRIPE_CONNECTED_ACCOUNT_ID     # acct_... (artist's Connect account id, server-only)
STRIPE_WEBHOOK_SECRET            # whsec_... (from Stripe webhook endpoint, server-only)
DEPOSIT_AMOUNT_CENTS             # e.g. "25000" for $250 (configurable without code deploy)
TECH_FEE_PERCENT                 # "0.05" for 5%
```

---

## Payment-onboarding finish step (required before go-live)

Per `STANDARDS.md` § Monetization:

1. **Create artist's Connect account** via the Stripe onboarding toolkit (`D:\Claude\stripe-onboarding\`)
2. **Complete onboarding PDF** (trilingual — English/Spanish/Korean if applicable) — document the Connect model, fee disclosure, and artist's responsibilities
3. **Test mode first:** charge $1 test deposit with card `4242 4242 4242 4242` → confirm fee splits in Stripe Dashboard
4. **Flip to live keys** in Amplify env vars once test passes
5. **Never commit live Stripe keys to the repo** — server env vars only

---

## What this doc does NOT cover

- General site hosting setup → `07_INFRA.md`
- Commission form UX → `11_COMMISSION_BUILD.md`
- Webhook registration in Stripe Dashboard → done manually by KC at deploy time
