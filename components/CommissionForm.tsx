'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const inputStyle = {
  width: '100%',
  padding: '0.875rem 1rem',
  border: '1px solid rgba(15,15,15,0.2)',
  borderRadius: '2px',
  fontSize: '1rem',
  fontFamily: 'var(--font-body)',
  color: 'var(--gm-ink)',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--gm-ink)',
  marginBottom: '0.375rem',
  fontFamily: 'var(--font-body)',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
};

export default function CommissionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDesigner, setIsDesigner] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    wallWidth: '',
    wallHeight: '',
    style: '',
    roomType: '',
    timeline: '',
    vision: '',
    referral: '',
    honeypot: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name || !form.email || !form.wallWidth || !form.wallHeight || !form.style) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, isDesigner }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Something went wrong');
      router.push(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.honeypot}
        onChange={set('honeypot')}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
        aria-hidden="true"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="name">
            Name <span style={{ color: '#B91C1C' }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={set('name')}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="email">
            Email <span style={{ color: '#B91C1C' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={set('email')}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={set('phone')}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Interior designer toggle */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          fontSize: '0.9375rem',
          color: 'var(--gm-ink)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <input
          type="checkbox"
          checked={isDesigner}
          onChange={(e) => setIsDesigner(e.target.checked)}
          style={{ width: '20px', height: '20px', accentColor: 'var(--gm-gold-dark)' }}
        />
        I&apos;m an interior designer commissioning for a client
      </label>

      {/* Wall dimensions */}
      <div>
        <label style={labelStyle}>
          Wall dimensions <span style={{ color: '#B91C1C' }}>*</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={fieldStyle}>
            <input
              type="text"
              required
              placeholder="Width (ft)"
              value={form.wallWidth}
              onChange={set('wallWidth')}
              style={inputStyle}
              aria-label="Wall width in feet"
            />
          </div>
          <div style={fieldStyle}>
            <input
              type="text"
              required
              placeholder="Height (ft)"
              value={form.wallHeight}
              onChange={set('wallHeight')}
              style={inputStyle}
              aria-label="Wall height in feet"
            />
          </div>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--gm-smoke)', marginTop: '0.375rem' }}>
          Approximate is fine — we&apos;ll confirm during the follow-up call.
        </p>
      </div>

      {/* Style */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="style">
          Style preference <span style={{ color: '#B91C1C' }}>*</span>
        </label>
        <select
          id="style"
          required
          value={form.style}
          onChange={set('style')}
          style={{ ...inputStyle, appearance: 'auto' }}
        >
          <option value="">Select a style</option>
          <option value="abstract">Abstract — gestural, color-driven</option>
          <option value="illustrative">Illustrative — detailed linework, botanical</option>
          <option value="unsure">Not sure — let&apos;s talk</option>
        </select>
      </div>

      {/* Room type */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="roomType">
          Room type
        </label>
        <select
          id="roomType"
          value={form.roomType}
          onChange={set('roomType')}
          style={{ ...inputStyle, appearance: 'auto' }}
        >
          <option value="">Select room type</option>
          <option value="living-room">Living room</option>
          <option value="primary-bedroom">Primary bedroom</option>
          <option value="dining-room">Dining room</option>
          <option value="nursery">Nursery / child&apos;s room</option>
          <option value="entryway">Entryway / foyer</option>
          <option value="home-office">Home office</option>
          <option value="kitchen">Kitchen</option>
          <option value="bathroom">Bathroom</option>
          <option value="hallway">Hallway / corridor</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Timeline */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="timeline">
          Desired timeline
        </label>
        <select
          id="timeline"
          value={form.timeline}
          onChange={set('timeline')}
          style={{ ...inputStyle, appearance: 'auto' }}
        >
          <option value="">Select a timeframe</option>
          <option value="1-month">Within 1 month</option>
          <option value="3-months">1–3 months</option>
          <option value="6-months">3–6 months</option>
          <option value="flexible">Flexible — no rush</option>
        </select>
      </div>

      {/* Vision */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="vision">
          Tell us about your vision
        </label>
        <textarea
          id="vision"
          rows={5}
          placeholder="What's the feeling you want the room to have? Any colors, references, or ideas?"
          value={form.vision}
          onChange={set('vision')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      {/* Referral */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="referral">
          How did you find us?
        </label>
        <input
          id="referral"
          type="text"
          placeholder="Instagram, word of mouth, Google…"
          value={form.referral}
          onChange={set('referral')}
          style={inputStyle}
        />
      </div>

      {error && (
        <div
          role="alert"
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#991B1B',
            padding: '0.875rem 1rem',
            borderRadius: '2px',
            fontSize: '0.9375rem',
          }}
        >
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? 'var(--gm-smoke)' : 'var(--gm-gold)',
            color: loading ? 'white' : 'var(--gm-ink)',
            border: 'none',
            borderRadius: '2px',
            padding: '1.125rem 2rem',
            fontSize: '1.0625rem',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.03em',
          }}
        >
          {loading ? 'Redirecting to payment…' : 'Submit & Pay $250 Deposit →'}
        </button>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--gm-smoke)',
            textAlign: 'center',
            marginTop: '0.75rem',
          }}
        >
          Secure payment via Stripe. $250 credited to your project total.
        </p>
      </div>
    </form>
  );
}
