export function PixelField({
  label, type, value, onChange, placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          color: "var(--arcade-text)",
          marginBottom: "6px",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: "3px solid var(--arcade-border)",
          boxShadow: "3px 3px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.55rem",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--arcade-accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--arcade-border)")}
      />
    </div>
  );
}
