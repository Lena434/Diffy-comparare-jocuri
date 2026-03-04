function PixelCTA({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--arcade-cta)] hover:bg-[var(--arcade-accent)] border-2 border-[var(--arcade-text)] hover:border-[var(--arcade-h)] [box-shadow:3px_3px_0px_var(--arcade-shadow)] active:[box-shadow:0px_0px_0px_var(--arcade-shadow)] active:translate-x-[3px] active:translate-y-[3px] transition-[background,border-color] duration-100"
      style={{
        width: "100%",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.5rem",
        padding: "10px 8px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        textAlign: "center",
        display: "block",
      }}
    >
      {children}
    </button>
  );
}

export default PixelCTA;
