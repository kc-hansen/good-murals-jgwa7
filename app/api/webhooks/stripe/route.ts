import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(stripeKey);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};

    const resendKey = process.env.RESEND_API_KEY;
    const artistEmail = process.env.RESEND_TO_ARTIST;
    const fromAddress = process.env.RESEND_FROM_ADDRESS ?? 'Good Murals <hello@goodmurals.com>';

    if (resendKey && artistEmail) {
      const resend = new Resend(resendKey);

      // Notify artist
      await resend.emails.send({
        from: fromAddress,
        to: artistEmail,
        subject: `New commission request — ${meta.clientName} (${meta.style}, ${meta.wallDimensions})`,
        html: `
          <h2>New commission request received</h2>
          <p><strong>Deposit paid:</strong> $250 + technology fee</p>
          <hr/>
          <p><strong>Client:</strong> ${meta.clientName}</p>
          <p><strong>Email:</strong> ${meta.clientEmail}</p>
          <p><strong>Wall:</strong> ${meta.wallDimensions}</p>
          <p><strong>Style:</strong> ${meta.style}</p>
          <p><strong>Room:</strong> ${meta.roomType || 'not specified'}</p>
          <p><strong>Timeline:</strong> ${meta.timeline || 'not specified'}</p>
          <p><strong>Interior designer:</strong> ${meta.isInteriorDesigner}</p>
          <p><strong>Referral:</strong> ${meta.referral || 'not specified'}</p>
          <hr/>
          <p><strong>Vision:</strong></p>
          <p>${meta.vision || 'not provided'}</p>
          <hr/>
          <p>Respond within 48 hours.</p>
        `,
      });

      // Confirm to client
      if (meta.clientEmail) {
        await resend.emails.send({
          from: fromAddress,
          to: meta.clientEmail,
          subject: 'Good Murals — we received your commission request',
          html: `
            <h2>We received your commission request.</h2>
            <p>Hi ${meta.clientName},</p>
            <p>Your $250 qualifying deposit has been received and your spot is confirmed. We'll reach out
            within 48 hours to discuss your vision, confirm scope, and talk next steps.</p>
            <p><strong>What you submitted:</strong><br/>
            Wall: ${meta.wallDimensions}<br/>
            Style: ${meta.style}<br/>
            Room: ${meta.roomType || 'not specified'}</p>
            <p>In the meantime, browse more of the portfolio at <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai'}/portfolio">goodmurals.yourproject.ai/portfolio</a>.</p>
            <p>— Good Murals</p>
          `,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
