'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: transparent ? 'transparent' : 'var(--gm-ink)',
        position: transparent ? 'absolute' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.1em',
            color: 'var(--gm-gold)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Good Murals
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          className="hidden-mobile"
        >
          {[
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-body)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/commission"
            style={{
              background: 'var(--gm-gold)',
              color: 'var(--gm-ink)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              padding: '0.5rem 1.25rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Commission a mural
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'white',
          }}
          className="show-mobile"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'var(--gm-charcoal)',
            padding: '1rem 1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {[
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--gm-ash)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/commission"
            onClick={() => setOpen(false)}
            style={{
              background: 'var(--gm-gold)',
              color: 'var(--gm-ink)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.875rem 1.25rem',
              borderRadius: '2px',
              textAlign: 'center',
              marginTop: '0.5rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            Commission a mural
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
