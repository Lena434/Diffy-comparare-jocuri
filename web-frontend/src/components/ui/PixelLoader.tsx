import { useState, useEffect } from 'react';

const BAR_COLORS = [
  '#e53e3e', '#e53e3e',
  '#dd6b20', '#dd6b20',
  '#d69e2e', '#d69e2e',
  '#38a169', '#38a169',
  '#38a169', '#38a169',
];

const TOTAL_SEGMENTS = BAR_COLORS.length;

function PixelLoader({ message = 'LOADING....' }: { message?: string }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilled((prev) => (prev + 1) % (TOTAL_SEGMENTS + 3));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: '24px',
      }}
    >
      {/* LOADING text */}
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(0.7rem, 2.5vw, 1rem)',
          color: '#fff',
          letterSpacing: '0.15em',
          margin: 0,
          textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        }}
      >
        {message}
      </p>

      {/* Pixel progress bar */}
      <div
        style={{
          background: '#1a1a2e',
          border: '4px solid #8b8b8b',
          borderTopColor: '#c0c0c0',
          borderLeftColor: '#c0c0c0',
          borderRightColor: '#4a4a4a',
          borderBottomColor: '#4a4a4a',
          padding: '6px',
          display: 'flex',
          gap: '3px',
          boxShadow: '0 0 0 2px #2a2a3e, inset 0 0 8px rgba(0,0,0,0.5)',
        }}
      >
        {BAR_COLORS.map((color, i) => (
          <div
            key={i}
            style={{
              width: 'clamp(16px, 3vw, 24px)',
              height: 'clamp(20px, 4vw, 32px)',
              background: i < filled ? color : 'rgba(255,255,255,0.05)',
              border: i < filled
                ? `2px solid ${color}88`
                : '2px solid rgba(255,255,255,0.03)',
              boxShadow: i < filled
                ? `inset 0 -4px 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3), 0 0 6px ${color}66`
                : 'none',
              transition: 'background 0.08s, box-shadow 0.08s',
              imageRendering: 'pixelated' as const,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PixelLoader;
