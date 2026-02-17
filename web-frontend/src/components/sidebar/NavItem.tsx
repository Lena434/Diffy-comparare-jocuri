import { useState } from "react";

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: hovered ? "rgba(139,92,246,0.15)" : "transparent",
        border: hovered ? "2px solid var(--arcade-border)" : "2px solid transparent",
        boxShadow: hovered ? "2px 2px 0px var(--arcade-shadow)" : "none",
        color: hovered ? "var(--arcade-h)" : "var(--arcade-text)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "7px 8px",
        cursor: "pointer",
        letterSpacing: "0.04em",
        transition: "all 0.1s",
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
