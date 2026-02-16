import { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[] | { value: string; label: string }[];
  onSelect: (value: string) => void;
  value: string;
  placeholder?: string;
}

function Dropdown({ label, options, onSelect, value, placeholder }: DropdownProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-text)",
          marginBottom: "8px",
          letterSpacing: "0.05em",
        }}
      >
        {label.toUpperCase()}
      </label>
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onSelect(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "var(--arcade-input-bg)",
            border: `2px solid ${focused ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
            boxShadow: "2px 2px 0px var(--arcade-shadow)",
            color: "var(--arcade-h)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.42rem",
            padding: "9px 32px 9px 12px",
            outline: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "border-color 0.1s",
            boxSizing: "border-box",
          }}
        >
          {placeholder && (
            <option value="" disabled style={{ background: "var(--arcade-panel-dark)" }}>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const val = typeof option === 'string' ? option : option.value;
            const displayLabel = typeof option === 'string' ? option : option.label;
            return (
              <option key={val} value={val} style={{ background: "var(--arcade-panel-dark)" }}>
                {displayLabel}
              </option>
            );
          })}
        </select>
        {/* Custom arrow */}
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            color: "var(--arcade-border)",
            pointerEvents: "none",
          }}
        >
          ▼
        </span>
      </div>
    </div>
  );
}

export default Dropdown;
