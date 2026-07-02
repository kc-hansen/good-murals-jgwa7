import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Good Murals.',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--gm-linen)', minHeight: '70vh', padding: '4rem 1.25rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--gm-ink)',
              marginBottom: '0.5rem',
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--gm-smoke)', fontSize: '0.875rem', marginBottom: '3rem' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--gm-smoke)', fontSize: '1rem', lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Information we collect
              </h2>
              <p>
                When you submit a commission request, we collect the information you provide: your name, email address,
                phone number, and project details (wall dimensions, style preference, room type, timeline, and vision notes).
                Payment processing is handled by Stripe; we do not store your card details.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                How we use your information
              </h2>
              <p>
                We use your information to respond to your commission request, process your deposit payment, communicate about
                your project, and send transaction confirmations. We do not sell your personal information to third parties.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Analytics
              </h2>
              <p>
                We use Plausible Analytics, a privacy-first analytics service that does not use cookies and does not collect
                personal data. Plausible collects only anonymized aggregate statistics about page visits.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Third-party services
              </h2>
              <p>
                We use Stripe for payment processing (subject to Stripe&apos;s privacy policy) and Resend for transactional
                email delivery. Both services have their own privacy policies governing how they handle data.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Contact
              </h2>
              <p>
                Questions about this policy? Email us at the address on file, or use the commission form to get in touch.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
