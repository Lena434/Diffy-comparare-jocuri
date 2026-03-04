import { ReactNode } from "react";

function Bolt({ top, bottom, left, right }: {
  top?: string; bottom?: string; left?: string; right?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top, bottom, left, right,
        width: "12px",
        height: "12px",
        background: "var(--arcade-border)",
        border: "2px solid var(--arcade-shadow)",
        borderRadius: "50%",
        boxShadow: "1px 1px 0 #000",
      }}
    />
  );
}

export function ArcadePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "4px solid var(--arcade-border)",
        boxShadow: "6px 6px 0px var(--arcade-shadow), 12px 12px 0px #000",
        padding: "2rem",
        position: "relative",
      }}
    >
      <Bolt top="8px" left="8px" />
      <Bolt top="8px" right="8px" />
      <Bolt bottom="8px" left="8px" />
      <Bolt bottom="8px" right="8px" />

      <h1
        className="text-center mb-8"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "1rem",
          color: "var(--arcade-h)",
          textShadow: "2px 2px 0px var(--arcade-h-shadow)",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </h1>

      {children}
    </div>
  );
}
