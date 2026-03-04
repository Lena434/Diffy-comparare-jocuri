export function StatusMsg({ text, type }: { text: string; type: "success" | "error" }) {
  return (
    <p
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.4rem",
        color: type === "success" ? "#4ade80" : "#f87171",
        textShadow: type === "success" ? "1px 1px 0 #166534" : "1px 1px 0 #7f1d1d",
        lineHeight: 1.8,
        marginTop: "10px",
      }}
    >
      {type === "success" ? "✓" : "⚠"} {text}
    </p>
  );
}
