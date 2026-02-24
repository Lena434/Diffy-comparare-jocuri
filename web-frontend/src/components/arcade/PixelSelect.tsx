export function PixelSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.4rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: "3px solid var(--arcade-border)",
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <option value="">-- SELECT --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
