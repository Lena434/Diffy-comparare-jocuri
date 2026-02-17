function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.38rem",
        color: "var(--arcade-shadow-mid)",
        letterSpacing: "0.1em",
        padding: "10px 8px 4px",
        borderBottom: "1px dashed var(--arcade-shadow)",
        marginBottom: "4px",
      }}
    >
      {label}
    </div>
  );
}

export default SectionLabel;
