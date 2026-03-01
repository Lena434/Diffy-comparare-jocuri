interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'red' | 'yellow';
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'YES',
  cancelLabel = 'NO',
  confirmColor = 'red',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmText = confirmColor === 'yellow' ? '#000' : '#fff';

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
            className={
              confirmColor === 'yellow'
                ? "bg-[#d97706] hover:bg-[#b45309] border-2 border-[#92400e] hover:border-[#fcd34d] cursor-pointer transition-[background,border-color] duration-100"
                : "bg-[#ef4444] hover:bg-[#dc2626] border-2 border-[#b91c1c] hover:border-[#f87171] cursor-pointer transition-[background,border-color] duration-100"
            }
            style={{
              boxShadow: '3px 3px 0px var(--arcade-shadow)',
              color: confirmText,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.38rem',
              padding: '10px 20px',
              letterSpacing: '0.06em',
            }}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="bg-[#dc2626] hover:bg-[#b91c1c] border-2 border-[#991b1b] hover:border-[#f87171] cursor-pointer transition-[background,border-color] duration-100"
            style={{
              boxShadow: '3px 3px 0px var(--arcade-shadow)',
              color: '#fff',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.38rem',
              padding: '10px 20px',
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
