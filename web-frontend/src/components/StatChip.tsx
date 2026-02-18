interface StatChipProps {
  icon: string;
  label: string;
}

function StatChip({ icon, label }: StatChipProps) {
  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "2px solid var(--arcade-shadow)",
        boxShadow: "3px 3px 0px #000",
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.38rem",
        color: "var(--arcade-text)",
        letterSpacing: "0.05em",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default StatChip;
