import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const NotFound: React.FC = () => (
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
      color: 'var(--arcade-border)',
      textShadow: '8px 8px 0 var(--arcade-shadow), 14px 14px 0 #000',
      letterSpacing: '0.05em',
      lineHeight: 0.9,
      marginBottom: '20px',
    }}>
      404
    </div>

    {/* Blinking subtitle */}
    <div style={{
      fontSize: 'clamp(0.55rem, 2vw, 0.9rem)',
      color: 'var(--arcade-h)',
      textShadow: '3px 3px 0 var(--arcade-h-shadow)',
      letterSpacing: '0.12em',
      marginBottom: '36px',
      animation: 'pixel-blink 1.2s steps(1) infinite',
    }}>
      PAGE NOT FOUND
    </div>

    {/* Info panel */}
    <div style={{
      background: 'var(--arcade-panel)',
      border: '3px solid var(--arcade-border)',
      boxShadow: '5px 5px 0 var(--arcade-shadow), 8px 8px 0 #000',
      padding: '28px 36px',
      maxWidth: '540px',
      marginBottom: '40px',
    }}>
      <p style={{
        fontSize: '0.42rem',
        color: 'var(--arcade-text)',
        lineHeight: 2.4,
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST.<br />
        IT MAY HAVE BEEN MOVED, DELETED,<br />
        OR NEVER EXISTED IN THE FIRST PLACE.
      </p>
    </div>

    {/* Buttons */}
    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
        ← BACK TO HOME
      </Link>
      <Link to={ROUTES.GAMES} style={{
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
      }}>
        BROWSE GAMES →
      </Link>
    </div>

    {/* Footer */}
    <div style={{
      position: 'fixed',
      bottom: '24px',
      fontSize: '0.3rem',
      color: 'var(--arcade-dim)',
      letterSpacing: '0.12em',
    }}>
      — INSERT COIN TO CONTINUE —
    </div>
  </div>
);

export default NotFound;
