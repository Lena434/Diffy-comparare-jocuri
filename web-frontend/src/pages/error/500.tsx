import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { ArcadePanel } from '../../components/arcade/ArcadePanel';

const FONT = "'Press Start 2P', monospace";

const ServerError: React.FC = () => {
  const handleRetry = () => window.location.reload();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: 'var(--arcade-bg)',
        backgroundImage: `
          linear-gradient(rgba(239,68,68,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(239,68,68,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        fontFamily: FONT,
        textAlign: 'center',
      }}
    >
      <style>{`
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

      <div style={{ width: '100%', maxWidth: '640px' }}>

        {/* Blink label */}
        <div style={{
          fontSize: '0.4rem',
          color: '#ef4444',
          letterSpacing: '0.1em',
          marginBottom: '16px',
          animation: 'pixel-blink 1.2s steps(1) infinite',
        }}>
          ★ CRITICAL ERROR ★
        </div>

        {/* Error code */}
        <div style={{
          fontSize: 'clamp(5rem, 20vw, 12rem)',
          color: '#ef4444',
          textShadow: '10px 10px 0 var(--arcade-shadow), 16px 16px 0 #000',
          letterSpacing: '0.05em',
          lineHeight: 0.9,
          marginBottom: '24px',
          animation: 'flicker-500 3s infinite alternate',
        }}>
          500
        </div>

        {/* Panel */}
        <ArcadePanel title="▸ SYSTEM FAILURE">
          {/* Terminal output */}
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            border: '2px solid #ef4444',
            padding: '16px 20px',
            marginBottom: '28px',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.38rem', color: '#ff6b6b', lineHeight: 2.2, letterSpacing: '0.03em', animation: 'glitch-500 3s infinite' }}>
              <span style={{ color: '#ff9f9f' }}>[ERROR 0x500]</span> INTERNAL SERVER ERROR<br />
              <span style={{ color: '#ff9f9f' }}>STATUS:</span> CORE DUMPED<br />
              <span style={{ color: '#ff9f9f' }}>REASON:</span> UNEXPECTED EXCEPTION / OVERLOAD
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleRetry}
              className="bg-transparent border-solid [border-color:#ef4444] text-[#ef4444] [box-shadow:5px_5px_0px_#7f1d1d] hover:bg-[#ef4444] hover:text-white active:[box-shadow:0_0_0_#7f1d1d] active:[transform:translate(5px,5px)] transition-all duration-[80ms]"
              style={{ borderWidth: '3px', fontFamily: FONT, fontSize: '0.48rem', padding: '12px 24px', letterSpacing: '0.06em', cursor: 'pointer' }}
            >
              RETRY CONNECTION →
            </button>
            <Link
              to={ROUTES.HOME}
              className="[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-text)] text-white [box-shadow:5px_5px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(5px,5px)] transition-all duration-[80ms]"
              style={{ borderWidth: '3px', fontFamily: FONT, fontSize: '0.48rem', padding: '12px 24px', letterSpacing: '0.06em', textDecoration: 'none', display: 'inline-block' }}
            >
              ← RETURN TO MAIN MENU
            </Link>
          </div>
        </ArcadePanel>

        {/* Footer */}
        <div style={{
          marginTop: '32px',
          fontSize: '0.3rem',
          color: '#ef4444',
          letterSpacing: '0.12em',
          animation: 'pixel-blink 1.4s steps(1) infinite',
        }}>
          — SYSTEM REBOOT RECOMMENDED —
        </div>
      </div>
    </div>
  );
};

export default ServerError;
