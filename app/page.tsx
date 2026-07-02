import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommissionCta from '@/components/CommissionCta';
import { featuredMurals, murals, muralSrc } from '@/lib/murals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai';

export const metadata: Metadata = {
  title: 'Good Murals — Custom Hand-Painted Wall Murals',
  description:
    'Your walls, made unforgettable. Custom hand-painted murals for residential interiors. Abstract and illustrative styles. Commission from $500.',
  openGraph: {
    title: 'Good Murals — Custom Hand-Painted Wall Murals',
    description: 'Your walls, made unforgettable. Custom hand-painted murals for residential interiors.',
    url: SITE_URL,
  },
};

const heroMural = murals[0];
const abstractMural = murals[1];
const illustrativeMural = murals[2];
const artistWorkingId = '1601871780956-7bc4e4c2eb21';

export default function HomePage() {
  return (
    <>
      {/* NAV (transparent over hero) */}
      <Navbar transparent />

      <main>
        {/* ── HERO ── */}
        <section
          style={{
            position: 'relative',
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'hidden',
          }}
        >
          <Image
            src={muralSrc(heroMural.imageId, 1920, 85)}
            alt={heroMural.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.2) 50%, rgba(15,15,15,0.1) 100%)',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '4rem 1.25rem 5rem',
              maxWidth: '720px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
                fontWeight: 700,
                color: 'var(--gm-cream)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Your walls, made unforgettable.
            </h1>
            <p
              style={{
                color: 'rgba(250,250,248,0.8)',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '520px',
              }}
            >
              Custom hand-painted murals for residential interiors. Abstract and illustrative styles.
              Designed for your wall, your room, your home.
            </p>
            <Link
              href="/commission"
              style={{
                display: 'inline-block',
                background: 'var(--gm-gold)',
                color: 'var(--gm-ink)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.0625rem',
                letterSpacing: '0.04em',
                padding: '1rem 2.25rem',
                borderRadius: '2px',
                fontFamily: 'var(--font-body)',
                minWidth: '220px',
              }}
            >
              Commission a mural →
            </Link>
          </div>
        </section>

        {/* ── STYLE INTRO ── */}
        <section
          style={{
            background: 'var(--gm-ink)',
            padding: '5rem 1.25rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }}
          >
            {/* Abstract */}
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  borderRadius: '2px',
                }}
              >
                <Image
                  src={muralSrc(abstractMural.imageId, 960, 80)}
                  alt={abstractMural.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--gm-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                Abstract
              </div>
              <p style={{ color: 'rgba(250,250,248,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px' }}>
                Gestural, color-driven work at room scale. Bold sweeps of color, organic forms, and the
                unmistakable texture of a hand on a wall.
              </p>
            </div>

            {/* Illustrative */}
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  borderRadius: '2px',
                }}
              >
                <Image
                  src={muralSrc(illustrativeMural.imageId, 960, 80)}
                  alt={illustrativeMural.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--gm-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                Illustrative
              </div>
              <p style={{ color: 'rgba(250,250,248,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '480px' }}>
                Precise, narrative, intricate. Botanical forms, custom imagery, line work drawn with the
                same care and detail as fine tattoo art.
              </p>
            </div>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .style-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── PORTFOLIO TEASER ── */}
        <section style={{ padding: '5rem 1.25rem', background: 'var(--gm-cream)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--gm-ink)',
                }}
              >
                The work.
              </h2>
              <Link
                href="/portfolio"
                style={{
                  color: 'var(--gm-gold-dark)',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
              >
                See all murals →
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.25rem',
              }}
            >
              {featuredMurals.map((mural) => (
                <Link
                  key={mural.id}
                  href="/portfolio"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      borderRadius: '2px',
                    }}
                  >
                    <Image
                      src={muralSrc(mural.imageId, 800, 80)}
                      alt={mural.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15,15,15,0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '1.25rem',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      className="card-overlay"
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--gm-gold)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {mural.style}
                      </div>
                      <div style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 500 }}>
                        {mural.dimensions} · {mural.room}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem' }}>
                        {mural.city}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`
            @media (min-width: 640px) {
              .portfolio-teaser-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 1024px) {
              .portfolio-teaser-grid { grid-template-columns: 1fr 1fr 1fr !important; }
            }
            .card-overlay:hover { opacity: 1 !important; }
            .card-overlay a:hover img { transform: scale(1.03); }
          `}</style>
        </section>

        {/* ── COMMISSION CTA ── */}
        <CommissionCta />

        {/* ── ABOUT TEASER ── */}
        <section style={{ background: 'var(--gm-linen)', padding: '5rem 1.25rem' }}>
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                overflow: 'hidden',
                borderRadius: '2px',
              }}
            >
              <Image
                src={muralSrc(artistWorkingId, 800, 80)}
                alt="Artist hand-painting a wall mural with visible brushwork and warm natural light"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: 'var(--gm-gold-dark)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                About the artist
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--gm-ink)',
                  lineHeight: 1.25,
                  marginBottom: '1.25rem',
                }}
              >
                Every mural is made for a specific wall in a specific room.
              </h2>
              <p
                style={{
                  color: 'var(--gm-smoke)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                A residential interior muralist working in two distinct styles — abstract and illustrative
                — each commissioned specifically for the room it will live in. No two murals are alike.
                Each one is designed from scratch for its wall, executed by hand, and permanently
                installed by the artist who painted it.
              </p>
              <Link
                href="/about"
                style={{
                  color: 'var(--gm-gold-dark)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  letterSpacing: '0.03em',
                }}
              >
                About the artist →
              </Link>
            </div>
          </div>
          <style>{`
            @media (min-width: 768px) {
              .about-teaser-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </section>
      </main>

      <Footer />
    </>
  );
}
