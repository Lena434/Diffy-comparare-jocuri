import { useState } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'YES',
  cancelLabel = 'NO',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [confirmHovered, setConfirmHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'var(--arcade-bg)',
          border: '3px solid var(--arcade-border)',
          boxShadow: '6px 6px 0px var(--arcade-shadow)',
          padding: '28px 32px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.55rem',
            color: 'var(--arcade-h)',
            textShadow: '2px 2px 0px var(--arcade-h-shadow)',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.38rem',
            color: 'var(--arcade-muted)',
            letterSpacing: '0.04em',
            lineHeight: 2,
            marginBottom: '24px',
          }}
        >
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onConfirm}
            onMouseEnter={() => setConfirmHovered(true)}
            onMouseLeave={() => setConfirmHovered(false)}
            style={{
              background: confirmHovered ? '#dc2626' : '#ef4444',
              border: `2px solid ${confirmHovered ? '#f87171' : '#b91c1c'}`,
              boxShadow: '3px 3px 0px var(--arcade-shadow)',
              color: '#fff',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.38rem',
              padding: '10px 20px',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            onMouseEnter={() => setCancelHovered(true)}
            onMouseLeave={() => setCancelHovered(false)}
            style={{
              background: cancelHovered ? 'var(--arcade-border)' : 'transparent',
              border: `2px solid ${cancelHovered ? 'var(--arcade-accent)' : 'var(--arcade-shadow)'}`,
              color: cancelHovered ? 'var(--arcade-accent)' : 'var(--arcade-muted)',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.38rem',
              padding: '10px 20px',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
