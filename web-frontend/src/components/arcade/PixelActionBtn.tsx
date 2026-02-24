import type { ReactNode } from "react";

export function PixelActionBtn({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}) {
  const bg =
    variant === "primary"
      ? "var(--arcade-cta)"
      : variant === "danger"
      ? "rgba(239,68,68,0.8)"
      : "transparent";
  const borderColor = variant === "secondary" ? "var(--arcade-border)" : "var(--arcade-text)";

  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `3px solid ${borderColor}`,
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        color: variant === "secondary" ? "var(--arcade-text)" : "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "12px 20px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "transform 0.08s, box-shadow 0.08s",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translate(4px, 4px)";
        e.currentTarget.style.boxShadow = "0 0 0 var(--arcade-shadow)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "4px 4px 0px var(--arcade-shadow)";
      }}
    >
      {children}
    </button>
  );
}
