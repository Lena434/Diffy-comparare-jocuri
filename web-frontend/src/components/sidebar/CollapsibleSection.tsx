import { useState } from "react";

function CollapsibleSection({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: hovered ? "rgba(139,92,246,0.1)" : "transparent",
          border: "none",
          color: "var(--arcade-border)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.42rem",
          padding: "6px 8px",
          cursor: "pointer",
          letterSpacing: "0.05em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.7rem" }}>{icon}</span>
          <span>{label}</span>
        </span>
        <span
          style={{
            fontSize: "0.55rem",
            color: "var(--arcade-shadow-mid)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
            display: "inline-block",
          }}
        >
          ▶
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingLeft: "12px",
            borderLeft: "2px solid var(--arcade-shadow)",
            marginLeft: "8px",
            marginBottom: "4px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsibleSection;
