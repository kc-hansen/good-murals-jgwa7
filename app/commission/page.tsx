import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommissionForm from '@/components/CommissionForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai';

export const metadata: Metadata = {
  title: 'Commission a Mural',
  description:
    'Commission a custom hand-painted wall mural. Tell us about your wall — we respond within 48 hours. $250 qualifying deposit credited to your total.',
  openGraph: {
    title: 'Commission a Mural | Good Murals',
    description: 'Tell us about your wall. We respond within 48 hours.',
    url: `${SITE_URL}/commission`,
  },
};

const steps = [
  {
    num: '01',
    title: 'Submit + deposit',
    body: 'Fill out the form below. A $250 qualifying deposit holds your spot and helps us prioritize serious commissions. It goes toward your project total.',
  },
  {
    num: '02',
    title: '48-hour follow-up',
    body: "We'll reach out within 48 hours to talk about your vision, confirm scope, and agree on the final price.",
  },
  {
    num: '03',
    title: 'Design mockup',
    body: "You'll see a digital design placed in your actual space before a single brushstroke. We refine until you're completely happy.",
  },
  {
    num: '04',
    title: 'We come to you',
    body: 'We travel to your location and paint on-site. Most residential murals take 2–5 days. The room is transformed permanently, irreplaceably, by hand.',
  },
];

const faqs = [
  {
    q: 'What does the $250 deposit cover?',
    a: "The deposit is a qualifying fee — it ensures we're talking to clients who are serious about moving forward, and it's fully credited toward your project total. It's not a fee we keep.",
  },
  {
    q: 'Can I get a refund if we don\'t move forward?',
    a: 'If after the follow-up call the scope or budget isn\'t a fit, we\'ll evaluate a refund case-by-case. The deposit is non-refundable once design work has begun.',
  },
  {
    q: "What if I don't like the design?",
    a: "We provide a digital mockup in your actual space before painting anything. We refine the design until you're completely satisfied — no brushstrokes until you approve it.",
  },
  {
    q: 'Do you travel?',
    a: 'Yes. We work with clients across the country. Travel costs are discussed during the follow-up call and may be factored into the final price for long-distance projects.',
  },
  {
    q: 'How long does painting take?',
    a: 'Most residential murals take 2–5 days of on-site work, depending on size and complexity. We\'ll give you a specific timeline estimate during the follow-up call.',
  },
  {
    q: 'What\'s the price range?',
    a: 'Murals are priced at $500–$1,500 depending on size, complexity, and travel. The $250 deposit is credited to your total. Final pricing is confirmed during the follow-up call.',
  },
];

export default function CommissionPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section
          style={{
            background: 'var(--gm-linen)',
            padding: '4rem 1.25rem 3rem',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '0.75rem',
              }}
            >
              Commission a mural.
            </h1>
            <p style={{ color: 'var(--gm-smoke)', fontSize: '1.125rem', lineHeight: 1.6 }}>
              Tell us about your wall — we respond within 48 hours.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--gm-cream)', padding: '4rem 1.25rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '2.5rem',
              }}
            >
              How it works
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
              }}
            >
              {steps.map((step) => (
                <div key={step.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--gm-gold)',
                      flexShrink: 0,
                      lineHeight: 1,
                      paddingTop: '2px',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--gm-ink)',
                        marginBottom: '0.375rem',
                      }}
                    >
                      {step.title}
                    </div>
                    <p style={{ color: 'var(--gm-smoke)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (min-width: 640px) {
              .steps-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </section>

        {/* Price + deposit info */}
        <section
          style={{
            background: 'var(--gm-charcoal)',
            padding: '3rem 1.25rem',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gm-gold)',
                    textTransform: 'uppercase',
                    marginBottom: '0.375rem',
                  }}
                >
                  Pricing
                </div>
                <p style={{ color: 'var(--gm-cream)', fontSize: '1.0625rem', lineHeight: 1.6 }}>
                  Murals from <strong style={{ color: 'var(--gm-gold)' }}>$500–$1,500</strong> depending on size, complexity, and travel. Final price is confirmed during your follow-up call.
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gm-gold)',
                    textTransform: 'uppercase',
                    marginBottom: '0.375rem',
                  }}
                >
                  $250 deposit
                </div>
                <p style={{ color: 'rgba(250,250,248,0.75)', fontSize: '1rem', lineHeight: 1.7 }}>
                  A qualifying deposit credited to your total. Filters our calendar to serious commissions and
                  gives us a concrete first step. Payments are secure via Stripe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commission form */}
        <section style={{ background: 'var(--gm-linen)', padding: '4rem 1.25rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '2rem',
              }}
            >
              Tell us about your wall
            </h2>
            <CommissionForm />
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: 'var(--gm-cream)', padding: '4rem 1.25rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '2rem',
              }}
            >
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderTop: '1px solid rgba(15,15,15,0.12)',
                    padding: '1.5rem 0',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--gm-ink)',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ color: 'var(--gm-smoke)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
