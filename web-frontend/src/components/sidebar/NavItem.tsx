function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent hover:bg-[rgba(139,92,246,0.15)] border-2 border-transparent hover:border-[var(--arcade-border)] [box-shadow:none] hover:[box-shadow:2px_2px_0px_var(--arcade-shadow)] text-[var(--arcade-text)] hover:text-[var(--arcade-h)] transition-all duration-100"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "7px 8px",
        cursor: "pointer",
        letterSpacing: "0.04em",
        textAlign: "left",
        lineHeight: 1.6,
      }}
    >
      <span style={{ fontSize: "0.75rem", minWidth: "16px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default NavItem;
