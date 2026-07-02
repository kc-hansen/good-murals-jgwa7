import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '64px',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 200,
            fontWeight: 900,
            color: '#C9A84C',
            letterSpacing: '-4px',
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
