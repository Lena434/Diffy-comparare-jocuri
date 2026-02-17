import { useState } from "react";

function PixelCTA({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        background: hovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
        border: `2px solid ${hovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
        boxShadow: pressed ? "0px 0px 0px var(--arcade-shadow)" : "3px 3px 0px var(--arcade-shadow)",
        transform: pressed ? "translate(3px,3px)" : "translate(0,0)",
        color: "#fff",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.5rem",
        padding: "10px 8px",
        cursor: "pointer",
        letterSpacing: "0.06em",
        transition: "background 0.1s, border-color 0.1s",
        textAlign: "center",
        display: "block",
      }}
    >
      {children}
    </button>
  );
}

export default PixelCTA;
