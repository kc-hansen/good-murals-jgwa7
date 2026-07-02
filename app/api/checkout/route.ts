import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai';
const DEPOSIT_CENTS = parseInt(process.env.DEPOSIT_AMOUNT_CENTS ?? '25000', 10);
const TECH_FEE_PCT = parseFloat(process.env.TECH_FEE_PERCENT ?? '0.05');

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Payment is not configured. Please contact us directly.' }, { status: 503 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, wallWidth, wallHeight, style, roomType, timeline, vision, isDesigner, referral } = body;

  if (!name || !email || !style) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const stripe = new Stripe(stripeKey);

  const techFeeAmount = Math.round(DEPOSIT_CENTS * TECH_FEE_PCT);

  const metadata: Record<string, string> = {
    clientName: name,
    clientEmail: email,
    wallDimensions: `${wallWidth ?? '?'} × ${wallHeight ?? '?'} ft`,
    style: style ?? '',
    roomType: roomType ?? '',
    timeline: timeline ?? '',
    vision: (vision ?? '').slice(0, 500),
    isInteriorDesigner: isDesigner ? 'yes' : 'no',
    referral: referral ?? '',
  };

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Good Murals — Commission Deposit',
            description: `$250 qualifying deposit (credited to your project total). Style: ${style}. Room: ${roomType || 'not specified'}.`,
          },
          unit_amount: DEPOSIT_CENTS,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Technology fee',
            description: 'Platform and payment processing fee',
          },
          unit_amount: techFeeAmount,
        },
        quantity: 1,
      },
    ],
    success_url: `${SITE_URL}/commission/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/commission`,
    metadata,
  };

  // Attach to connected account if configured
  const connectedAccountId = process.env.STRIPE_CONNECTED_ACCOUNT_ID;
  if (connectedAccountId) {
    sessionParams.payment_intent_data = {
      application_fee_amount: techFeeAmount,
      transfer_data: { destination: connectedAccountId },
    };
  }

  try {
    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('[checkout] Stripe error:', err);
    const msg = err instanceof Stripe.errors.StripeError ? err.message : 'Payment error. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
