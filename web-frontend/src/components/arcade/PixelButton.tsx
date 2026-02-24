export function PixelButton({ type, label }: { type?: "submit" | "button"; label: string }) {
  return (
    <button
      type={type ?? "button"}
      style={{
        width: "100%",
        background: "var(--arcade-cta)",
        border: "3px solid var(--arcade-text)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.65rem",
        padding: "14px",
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "transform 0.08s, box-shadow 0.08s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--arcade-accent)";
        e.currentTarget.style.borderColor = "var(--arcade-h)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--arcade-cta)";
        e.currentTarget.style.borderColor = "var(--arcade-text)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = "0px 0px 0px var(--arcade-shadow)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "4px 4px 0px var(--arcade-shadow)";
      }}
    >
      {label}
    </button>
  );
}
