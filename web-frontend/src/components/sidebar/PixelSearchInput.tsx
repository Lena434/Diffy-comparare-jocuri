import { useState } from "react";

function PixelSearchInput({ onSearch }: { onSearch?: (query: string) => void }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <form
      style={{ padding: "4px 0" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() && onSearch) onSearch(value.trim());
      }}
    >
      <input
        type="text"
        placeholder="SEARCH..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "var(--arcade-input-bg)",
          border: `2px solid ${focused ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
          boxShadow: `2px 2px 0px var(--arcade-shadow)`,
          color: "var(--arcade-h)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          padding: "8px 10px",
          outline: "none",
          boxSizing: "border-box",
          letterSpacing: "0.05em",
        }}
      />
    </form>
  );
}

export default PixelSearchInput;
