import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Good Murals — Custom Hand-Painted Wall Murals';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          background: '#0F0F0F',
          padding: '60px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1561908180-f761138787cd?w=1200&q=80&auto=format&fit=crop"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 62,
              fontWeight: 700,
              color: '#FAFAF8',
              lineHeight: 1.1,
              maxWidth: '820px',
            }}
          >
            Your walls, made unforgettable.
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 24,
              color: '#C9A84C',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Good Murals — Custom Hand-Painted Murals
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
