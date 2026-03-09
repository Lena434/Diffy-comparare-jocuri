import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { ArcadePanel } from '../../components/arcade/ArcadePanel';

const FONT = "'Press Start 2P', monospace";

const Forbidden: React.FC = () => (
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
    <div style={{ width: '100%', maxWidth: '560px' }}>

      {/* Blink label */}
      <div style={{
        fontSize: '0.4rem',
        color: 'var(--arcade-muted)',
        letterSpacing: '0.1em',
        marginBottom: '16px',
        animation: 'pixel-blink 1.2s steps(1) infinite',
      }}>
        ★ RESTRICTED ZONE ★
      </div>

      {/* Error code */}
      <div style={{
        fontSize: 'clamp(5rem, 20vw, 12rem)',
        color: '#ef4444',
        textShadow: '8px 8px 0 var(--arcade-shadow), 14px 14px 0 #000',
        letterSpacing: '0.05em',
        lineHeight: 0.9,
        marginBottom: '24px',
      }}>
        403
      </div>

      {/* Panel */}
      <ArcadePanel title="▸ FORBIDDEN ZONE">
        <p style={{
          fontSize: '0.42rem',
          color: 'var(--arcade-text)',
          lineHeight: 2.4,
          letterSpacing: '0.04em',
          margin: '0 0 28px 0',
        }}>
          THIS SECTOR IS RESTRICTED.<br />
          YOU DON'T HAVE THE CLEARANCE LEVEL TO ENTER.<br />
          DIFFERENT PERMISSIONS REQUIRED TO PROCEED.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to={ROUTES.LOGIN}
            className="bg-transparent border-solid [border-color:#ef4444] text-[#ef4444] [box-shadow:5px_5px_0px_#7f1d1d] hover:bg-[#ef4444] hover:text-white active:[box-shadow:0_0_0_#7f1d1d] active:[transform:translate(5px,5px)] transition-all duration-[80ms]"
            style={{ borderWidth: '3px', fontFamily: FONT, fontSize: '0.48rem', padding: '12px 24px', letterSpacing: '0.06em', textDecoration: 'none', display: 'inline-block' }}
          >
            AUTHENTICATE →
          </Link>
          <Link
            to={ROUTES.HOME}
            className="bg-transparent border-solid [border-color:var(--arcade-border)] [color:var(--arcade-text)] [box-shadow:5px_5px_0px_var(--arcade-shadow)] hover:[border-color:var(--arcade-h)] hover:[color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(5px,5px)] transition-all duration-[80ms]"
            style={{ borderWidth: '3px', fontFamily: FONT, fontSize: '0.48rem', padding: '12px 24px', letterSpacing: '0.06em', textDecoration: 'none', display: 'inline-block' }}
          >
            ← RETURN TO HUB
          </Link>
        </div>
      </ArcadePanel>

      {/* Footer */}
      <div style={{
        marginTop: '32px',
        fontSize: '0.3rem',
        color: 'var(--arcade-muted)',
        letterSpacing: '0.12em',
        animation: 'pixel-blink 1.4s steps(1) infinite',
      }}>
        — PRESS A TO RETRY / B TO ABORT —
      </div>
    </div>
  </div>
);

export default Forbidden;
