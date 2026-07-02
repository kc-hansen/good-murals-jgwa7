import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Commission Received | Good Murals',
  description: 'Your commission request has been received. We\'ll be in touch within 48 hours.',
  robots: { index: false },
};

export default function CommissionSuccessPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '70vh',
          background: 'var(--gm-linen)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '560px', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--gm-charcoal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--gm-ink)',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}
          >
            We received your commission request.
          </h1>
          <p
            style={{
              color: 'var(--gm-smoke)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              marginBottom: '0.875rem',
            }}
          >
            Your $250 deposit has been received and your spot is confirmed. We&apos;ll reach out
            within 48 hours to talk about your wall, your vision, and next steps.
          </p>
          <p
            style={{
              color: 'var(--gm-smoke)',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            In the meantime, browse more of the portfolio for inspiration.
          </p>
          <Link
            href="/portfolio"
            style={{
              display: 'inline-block',
              background: 'var(--gm-ink)',
              color: 'var(--gm-cream)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Back to the portfolio →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
