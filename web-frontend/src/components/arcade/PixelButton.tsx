export function PixelButton({ type, label }: { type?: "submit" | "button"; label: string }) {
  return (
    <button
      type={type ?? "button"}
      className="[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-text)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] transition-[background,border-color,transform,box-shadow] duration-[80ms]"
      style={{
        width: "100%",
        borderWidth: "3px",
        borderStyle: "solid",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.65rem",
        padding: "14px",
        cursor: "pointer",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </button>
  );
}
