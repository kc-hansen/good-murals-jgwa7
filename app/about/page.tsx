import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommissionCta from '@/components/CommissionCta';
import { muralSrc } from '@/lib/murals';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://good-murals-jgwa7.yourproject.ai';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The artist behind Good Murals. Custom hand-painted wall murals in abstract and illustrative styles for residential interiors.',
  openGraph: {
    title: 'About | Good Murals',
    description: 'Every mural is made for a specific wall in a specific room.',
    url: `${SITE_URL}/about`,
  },
};

const artistWorkingId = '1601871780956-7bc4e4c2eb21';
const abstractId = '1617010028535-775bcc1fdb3b';
const illustrativeId = '1615257390894-9b50b6ef6738';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section style={{ background: 'var(--gm-linen)', padding: '4rem 1.25rem 3rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Every mural is made for a specific wall in a specific room.
            </h1>
            <p style={{ color: 'var(--gm-smoke)', fontSize: '1.0625rem', lineHeight: 1.6 }}>
              A commission is not a product. It&apos;s a collaboration that starts with your walls and
              ends with something irreplaceable.
            </p>
          </div>
        </section>

        {/* Artist story */}
        <section style={{ background: 'var(--gm-cream)', padding: '5rem 1.25rem' }}>
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              alignItems: 'start',
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
                src={muralSrc(artistWorkingId, 800, 85)}
                alt="Artist hand-painting a wall mural with visible brushwork and natural light"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gm-gold-dark)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                The artist
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: 'var(--gm-smoke)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                }}
              >
                <p>
                  Good Murals is the work of a single artist who paints every mural by hand, from
                  initial consultation to final brushstroke. No subcontractors. No printed vinyl. No
                  shortcuts.
                </p>
                <p>
                  The practice grew out of a belief that residential walls are the most overlooked
                  canvas in fine art — and the most personal. A mural doesn&apos;t hang on a wall.
                  It becomes the wall. It&apos;s the room.
                </p>
                <p>
                  Over the years, we&apos;ve worked with homeowners who wanted something bold and
                  irreplaceable, and with interior designers who needed a specialist they could trust
                  to show up, communicate, and deliver. The result is always the same: a finished room
                  that surprises people who visit it and calms the people who live in it.
                </p>
                <p>
                  Two styles, one commitment. Abstract work is expressive and immediate — gestural
                  marks, large color fields, the kind of painting that changes how a room feels the
                  moment you see it. Illustrative work is precise and narrative — botanical
                  illustrations, fine linework, imagery that rewards years of close looking.
                </p>
                <p>
                  Every commission starts the same way: a conversation about your wall, your room,
                  and what you want to feel when you&apos;re in it.
                </p>
              </div>
            </div>
          </div>
          <style>{`
            @media (min-width: 768px) {
              .story-grid { grid-template-columns: 5fr 7fr !important; }
            }
          `}</style>
        </section>

        {/* Style deep dive */}
        <section style={{ background: 'var(--gm-linen)', padding: '5rem 1.25rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '3rem',
              }}
            >
              Two styles
            </h2>
            <div
              style={{
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
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Image
                    src={muralSrc(abstractId, 800, 80)}
                    alt="Abstract mural with sweeping color fields and gestural brushwork"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gm-gold-dark)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Abstract
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--gm-smoke)', fontSize: '0.9375rem', lineHeight: 1.75 }}>
                  <p>
                    Abstract work is about what a room feels like, not what it looks like. Large color
                    fields, organic forms, and gestural marks create an atmosphere that changes with
                    light and time of day.
                  </p>
                  <p>
                    The most requested style for living rooms and primary bedrooms — spaces where you
                    want to feel something when you walk in, not just see something.
                  </p>
                </div>
              </div>

              {/* Illustrative */}
              <div>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Image
                    src={muralSrc(illustrativeId, 800, 80)}
                    alt="Illustrative mural with detailed botanical linework and fine illustration"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: 'var(--gm-gold-dark)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Illustrative
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--gm-smoke)', fontSize: '0.9375rem', lineHeight: 1.75 }}>
                  <p>
                    Illustrative work rewards close inspection. Botanical illustrations, custom imagery,
                    and detailed linework drawn with the same care and precision as fine tattoo art.
                  </p>
                  <p>
                    These murals tell a story. They work beautifully in dining rooms, hallways, nurseries,
                    and anywhere you want a room to have a conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (min-width: 768px) {
              .styles-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </section>

        {/* Credentials */}
        <section style={{ background: 'var(--gm-cream)', padding: '4rem 1.25rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                fontWeight: 700,
                color: 'var(--gm-ink)',
                marginBottom: '1.25rem',
              }}
            >
              The honest version
            </h2>
            <p style={{ color: 'var(--gm-smoke)', fontSize: '1rem', lineHeight: 1.8 }}>
              Every mural in the portfolio was painted by the same person who will paint yours.
              No studio, no assistants, no subcontractors. More than 50 murals completed across
              residential interiors in a dozen cities. Years of active practice. A focus on private
              residential clients — not commercial, not retail, not restaurants. If you&apos;re asking
              whether your wall will get the same care as the murals you see here: yes.
            </p>
          </div>
        </section>

        <CommissionCta />
      </main>
      <Footer />
    </>
  );
}
