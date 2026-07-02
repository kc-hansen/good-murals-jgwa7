import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Good Murals.',
  robots: { index: false },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ color: 'var(--gm-smoke)', fontSize: '0.875rem', marginBottom: '3rem' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--gm-smoke)', fontSize: '1rem', lineHeight: 1.75 }}>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Commission process
              </h2>
              <p>
                A commission begins when you submit the commission form and pay the $250 qualifying deposit. This deposit is credited
                to your total project cost. The deposit confirms your intent to commission a mural and reserves time on our calendar
                for your follow-up consultation.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Deposit and refund policy
              </h2>
              <p>
                The $250 deposit is non-refundable once design work has commenced. If, following the initial consultation, we determine
                the project is not a mutual fit before any design work begins, we will evaluate refund requests on a case-by-case basis.
                The final project price is confirmed during the follow-up call, prior to any design or painting work.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Design and approval
              </h2>
              <p>
                We provide a digital mockup of the proposed design placed in your actual space before any painting begins. Painting
                commences only after you give written approval of the design. Revisions to the design are included in the process;
                significant changes to scope after approval may affect final pricing.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Intellectual property
              </h2>
              <p>
                You own the mural painted on your wall. The artist retains the right to photograph and use images of the completed
                mural in their portfolio, on social media, and in marketing materials, unless you request otherwise in writing prior
                to the commission beginning.
              </p>
            </section>
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gm-ink)', marginBottom: '0.75rem' }}>
                Technology fee
              </h2>
              <p>
                A Technology fee of 5% is added to the deposit at checkout. This fee covers payment processing and platform costs
                and is paid by the customer. It is separate from and in addition to the $250 deposit amount credited to your project.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
