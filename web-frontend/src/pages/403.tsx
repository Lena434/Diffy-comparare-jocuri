import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const Forbidden: React.FC = () => (
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
    {/* Error code */}
    <div style={{
      fontSize: 'clamp(5rem, 20vw, 14rem)',
      color: '#ef4444',
      textShadow: '8px 8px 0 var(--arcade-shadow), 14px 14px 0 #000',
      letterSpacing: '0.05em',
      lineHeight: 0.9,
      marginBottom: '20px',
    }}>
      403
    </div>

    {/* Subtitle with glitch */}
    <style>{`
      @keyframes glitch-403 {
        0%, 100% { transform: translate(0); }
        20%  { transform: translate(-2px, 2px); }
        40%  { transform: translate(2px, -2px); }
        60%  { transform: translate(-1px, 1px); }
        80%  { transform: translate(1px, -1px); }
      }
    `}</style>
    <div style={{
      fontSize: 'clamp(0.55rem, 2vw, 0.9rem)',
      color: 'var(--arcade-accent)',
      textShadow: '3px 3px 0 var(--arcade-accent-dark)',
      letterSpacing: '0.12em',
      marginBottom: '16px',
      animation: 'glitch-403 2s infinite alternate',
    }}>
      FORBIDDEN ZONE
    </div>

    <div style={{
      fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
      marginBottom: '32px',
    }}>
      ⛔
    </div>

    {/* Panel */}
    <div style={{
      background: 'var(--arcade-panel)',
      border: '3px solid var(--arcade-border)',
      boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
      padding: '28px 36px',
      maxWidth: '560px',
      marginBottom: '40px',
    }}>
      <p style={{
        fontSize: '0.42rem',
        color: 'var(--arcade-text)',
        lineHeight: 2.4,
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        THIS SECTOR IS RESTRICTED.<br />
        YOU DON'T HAVE THE CLEARANCE LEVEL TO ENTER.<br />
        DIFFERENT PERMISSIONS REQUIRED TO PROCEED.
      </p>
    </div>

    {/* Buttons */}
    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link to={ROUTES.LOGIN} style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.48rem',
        padding: '14px 28px',
        background: '#ef4444',
        border: '3px solid var(--arcade-border)',
        color: '#fff',
        textDecoration: 'none',
        letterSpacing: '0.05em',
        boxShadow: '5px 5px 0 #7f1d1d, 8px 8px 0 #000',
        display: 'inline-block',
        transition: 'all 0.08s',
      }}>
        AUTHENTICATE →
      </Link>
      <Link to={ROUTES.HOME} style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '0.48rem',
        padding: '14px 28px',
        background: 'transparent',
        border: '3px solid var(--arcade-border)',
        color: 'var(--arcade-text)',
        textDecoration: 'none',
        letterSpacing: '0.05em',
        boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
        display: 'inline-block',
        transition: 'all 0.08s',
      }}>
        ← RETURN TO HUB
      </Link>
    </div>

    {/* Footer hint */}
    <div style={{
      position: 'fixed',
      bottom: '24px',
      fontSize: '0.3rem',
      color: 'var(--arcade-dim)',
      letterSpacing: '0.12em',
    }}>
      — PRESS A TO RETRY / B TO ABORT —
    </div>
  </div>
);

export default Forbidden;
