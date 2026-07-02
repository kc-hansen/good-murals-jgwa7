import Link from 'next/link';

export default function CommissionCta() {
  return (
    <section
      style={{
        background: 'var(--gm-charcoal)',
        padding: '5rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--gm-cream)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          Ready to transform a room?
        </h2>
        <p
          style={{
            color: 'rgba(250,250,248,0.7)',
            fontSize: '1.0625rem',
            marginBottom: '0.5rem',
            lineHeight: 1.6,
          }}
        >
          Murals from $500–$1,500. A $250 qualifying deposit — credited to your total — holds your
          spot and filters our calendar for serious commissions.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--gm-smoke)',
            fontSize: '0.8125rem',
            marginBottom: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          We respond within 48 hours.
        </p>
        <Link
          href="/commission"
          style={{
            display: 'inline-block',
            background: 'var(--gm-gold)',
            color: 'var(--gm-ink)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            padding: '1rem 2.5rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-body)',
            minWidth: '220px',
          }}
        >
          Start a commission →
        </Link>
      </div>
    </section>
  );
}
