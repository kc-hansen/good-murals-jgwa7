import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommissionCta from '@/components/CommissionCta';
import { murals, muralSrc, type MuralStyle } from '@/lib/murals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'The complete portfolio of Good Murals. Custom hand-painted abstract and illustrative wall murals for residential interiors.',
  openGraph: {
    title: 'Portfolio | Good Murals',
    description: 'The complete portfolio — abstract and illustrative wall murals.',
    url: `${SITE_URL}/portfolio`,
  },
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string }>;
}) {
  const { style } = await searchParams;
  const activeStyle = (style === 'abstract' || style === 'illustrative') ? style as MuralStyle : null;

  const filtered = activeStyle ? murals.filter((m) => m.style === activeStyle) : murals;

  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section
          style={{
            background: 'var(--gm-ink)',
            padding: '4rem 1.25rem 3rem',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 700,
                color: 'var(--gm-cream)',
                marginBottom: '0.5rem',
              }}
            >
              The work.
            </h1>
            <p style={{ color: 'var(--gm-smoke)', fontSize: '1rem' }}>
              {murals.length} completed murals and counting.
            </p>
          </div>
        </section>

        {/* Style filter */}
        <div
          style={{
            background: 'var(--gm-charcoal)',
            padding: '0 1.25rem',
            position: 'sticky',
            top: '64px',
            zIndex: 30,
            display: 'flex',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%',
              display: 'flex',
              gap: '0.25rem',
              padding: '0.75rem 0',
            }}
          >
            {[
              { label: 'All', href: '/portfolio', active: !activeStyle },
              { label: 'Abstract', href: '/portfolio?style=abstract', active: activeStyle === 'abstract' },
              { label: 'Illustrative', href: '/portfolio?style=illustrative', active: activeStyle === 'illustrative' },
            ].map(({ label, href, active }) => (
              <Link
                key={label}
                href={href}
                style={{
                  padding: '0.5rem 1.125rem',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  textDecoration: 'none',
                  background: active ? 'var(--gm-gold)' : 'transparent',
                  color: active ? 'var(--gm-ink)' : 'rgba(250,250,248,0.65)',
                  border: active ? 'none' : '1px solid var(--gm-ash)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <section style={{ background: 'var(--gm-cream)', padding: '2.5rem 1.25rem 4rem' }}>
          <div
            className="masonry"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              columns: '1',
              columnGap: '1.25rem',
            }}
          >
            {filtered.map((mural) => (
              <div
                key={mural.id}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  background: 'var(--gm-ash)',
                }}
              >
                <Image
                  src={muralSrc(mural.imageId, 800, 80)}
                  alt={mural.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                  style={{
                    padding: '1rem',
                    background: 'var(--gm-ink)',
                    borderTop: '1px solid var(--gm-ash)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.1em',
                      color: 'var(--gm-gold)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {mural.style}
                  </div>
                  <div style={{ color: 'var(--gm-cream)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.125rem' }}>
                    {mural.title}
                  </div>
                  <div
                    style={{
                      color: 'var(--gm-smoke)',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {mural.dimensions} · {mural.room} · {mural.city}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gm-smoke)', padding: '4rem 0' }}>
              No murals found for this style.
            </p>
          )}
        </section>

        <CommissionCta />
      </main>
      <Footer />

      <style>{`
        @media (min-width: 640px) {
          .masonry { columns: 2 !important; }
        }
        @media (min-width: 1024px) {
          .masonry { columns: 3 !important; }
        }
      `}</style>
    </>
  );
}
