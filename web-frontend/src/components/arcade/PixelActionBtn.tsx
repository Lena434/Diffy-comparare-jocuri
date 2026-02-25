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
  const variantClass =
    variant === "primary"
      ? "[background:var(--arcade-cta)] [border-color:var(--arcade-text)] text-white"
      : variant === "danger"
      ? "[background:rgba(239,68,68,0.8)] [border-color:var(--arcade-text)] text-white"
      : "bg-transparent [border-color:var(--arcade-border)] [color:var(--arcade-text)]";

  return (
    <button
      onClick={onClick}
      className={`${variantClass} border-solid [box-shadow:4px_4px_0px_var(--arcade-shadow)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] transition-[transform,box-shadow] duration-[80ms]`}
      style={{
        borderWidth: "3px",
        borderStyle: "solid",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "12px 20px",
        cursor: "pointer",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </button>
  );
}
