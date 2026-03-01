import type { ReactNode } from "react";

export function ProfilePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "6px 6px 0px var(--arcade-shadow)",
        padding: "24px",
        marginBottom: "32px",
        position: "relative",
      }}
    >
      {[
        { top: "8px", left: "8px" },
        { top: "8px", right: "8px" },
        { bottom: "8px", left: "8px" },
        { bottom: "8px", right: "8px" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: "10px",
            height: "10px",
            background: "var(--arcade-border)",
            border: "2px solid var(--arcade-shadow)",
            borderRadius: "50%",
            boxShadow: "1px 1px 0 #000",
          }}
        />
      ))}
      <h2
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.6rem",
          color: "var(--arcade-h)",
          textShadow: "2px 2px 0px var(--arcade-h-shadow)",
          letterSpacing: "0.08em",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
