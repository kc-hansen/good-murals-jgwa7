import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F0F0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 80,
            fontWeight: 900,
            color: '#C9A84C',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          GM
        </span>
      </div>
    ),
    { ...size },
  );
}
