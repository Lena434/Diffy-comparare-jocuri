import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const ServerError: React.FC = () => {
  const handleRetry = () => window.location.reload();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      fontFamily: "'Press Start 2P', monospace",
    }}>
      {/* Scanline overlay */}
      <style>{`
        @keyframes scanline-500 {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker-500 {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.35; }
        }
        @keyframes glitch-500 {
          0%  { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100%{ transform: translate(0); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'repeating-linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 1px, transparent 2px)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        zIndex: 9999,
        animation: 'scanline-500 10s linear infinite',
      }} />

      {/* Error code */}
      <div style={{
        fontSize: 'clamp(5rem, 20vw, 14rem)',
        color: '#ef4444',
        textShadow: '10px 10px 0 var(--arcade-shadow), 16px 16px 0 #000',
        letterSpacing: '0.05em',
        lineHeight: 0.9,
        marginBottom: '20px',
        animation: 'flicker-500 3s infinite alternate',
      }}>
        500
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 'clamp(0.5rem, 1.8vw, 0.8rem)',
        color: 'var(--arcade-accent)',
        textShadow: '3px 3px 0 var(--arcade-accent-dark)',
        letterSpacing: '0.1em',
        marginBottom: '32px',
        animation: 'glitch-500 1.8s infinite',
      }}>
        CRITICAL SYSTEM FAILURE
      </div>

      {/* Terminal panel */}
      <div style={{
        background: 'rgba(0,0,0,0.6)',
        border: '3px solid #ef4444',
        boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
        padding: '24px 28px',
        maxWidth: '680px',
        marginBottom: '40px',
        textAlign: 'left',
      }}>
        <div style={{ fontSize: '0.38rem', color: '#ff6b6b', lineHeight: 2.2, letterSpacing: '0.03em' }}>
          <span style={{ color: '#ff9f9f' }}>[ERROR 0x500]</span> INTERNAL SERVER ERROR<br />
          <span style={{ color: '#ff9f9f' }}>STACK TRACE:</span> ... segmentation fault in comparison engine<br />
          <span style={{ color: '#ff9f9f' }}>STATUS:</span> core dumped<br />
          <span style={{ color: '#ff9f9f' }}>REASON:</span> unexpected exception / overload / cosmic ray
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={handleRetry}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.48rem',
            padding: '14px 28px',
            background: 'rgba(239,68,68,0.12)',
            border: '3px solid #ef4444',
            color: '#ef4444',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            boxShadow: '5px 5px 0 #7f1d1d, 8px 8px 0 #000',
          }}
        >
          RETRY CONNECTION →
        </button>
        <Link to={ROUTES.HOME} style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.48rem',
          padding: '14px 28px',
          background: 'var(--arcade-accent)',
          border: '3px solid var(--arcade-border)',
          color: '#000',
          textDecoration: 'none',
          letterSpacing: '0.05em',
          boxShadow: '5px 5px 0 var(--arcade-accent-dark), 8px 8px 0 #000',
          display: 'inline-block',
        }}>
          ← RETURN TO MAIN MENU
        </Link>
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        fontSize: '0.3rem',
        color: '#ef4444',
        letterSpacing: '0.12em',
      }}>
        — SYSTEM REBOOT RECOMMENDED —
      </div>
    </div>
  );
};

export default ServerError;
