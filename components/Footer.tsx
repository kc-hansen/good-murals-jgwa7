import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--gm-ink)',
        color: 'var(--gm-smoke)',
        padding: '3rem 1.25rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              color: 'var(--gm-gold)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Good Murals
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Custom hand-painted wall murals for residential interiors.
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/commission', label: 'Commission a mural' },
            { href: '/about', label: 'About' },
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: 'var(--gm-smoke)',
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ fontSize: '0.8125rem', borderTop: '1px solid var(--gm-ash)', paddingTop: '1.5rem' }}>
          © {new Date().getFullYear()} Good Murals. All rights reserved.
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          footer > div {
            grid-template-columns: 1fr 1fr auto !important;
          }
        }
      `}</style>
    </footer>
  );
}
