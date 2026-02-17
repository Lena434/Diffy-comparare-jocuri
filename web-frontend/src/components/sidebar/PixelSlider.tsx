import { useState } from "react";

function PixelSlider({ label, onApply }: { label: string; onApply?: (value: number) => void }) {
  const [value, setValue] = useState(50);
  return (
    <div style={{ padding: "4px 8px" }}>
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.04em",
        }}
      >
        {label}: {value === 100 ? "ANY" : `$${value}`}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          setValue(v);
          if (v < 100 && onApply) onApply(v);
        }}
        style={{
          width: "100%",
          accentColor: "var(--arcade-border)",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default PixelSlider;
