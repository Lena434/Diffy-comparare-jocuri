import { useState } from 'react';

interface CompactSearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
  placeholder?: string;
}

function CompactSearchBar({
  onSearch,
  value = '',
  placeholder = "SEARCH GAMES...",
}: CompactSearchBarProps) {
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
        🔍 SEARCH
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: `2px solid ${focused ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
          boxShadow: "2px 2px 0px var(--arcade-shadow)",
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          lineHeight: "2",
          padding: "10px 12px",
          outline: "none",
          boxSizing: "border-box",
          letterSpacing: "0.04em",
          transition: "border-color 0.1s",
        }}
      />
    </div>
  );
}

export default CompactSearchBar;
