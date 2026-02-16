import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

interface HeroSearchBarProps {
  placeholder?: string;
}

function HeroSearchBar({
  placeholder = "SEARCH: CYBERPUNK, CS2...",
}: HeroSearchBarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.GAMES}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: "0", position: "relative" }}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            background: "var(--arcade-input-bg)",
            border: `3px solid ${focused ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
            borderRight: "none",
            boxShadow: `3px 3px 0px var(--arcade-shadow)`,
            color: "var(--arcade-h)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            padding: "14px 16px",
            outline: "none",
            letterSpacing: "0.04em",
            transition: "border-color 0.1s",
          }}
        />
        <button
          type="submit"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
          onMouseDown={() => setBtnPressed(true)}
          onMouseUp={() => setBtnPressed(false)}
          style={{
            background: btnHovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
            border: `3px solid ${btnHovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
            boxShadow: btnPressed ? "0 0 0 var(--arcade-shadow)" : "3px 3px 0px var(--arcade-shadow)",
            transform: btnPressed ? "translate(3px,3px)" : "translate(0,0)",
            color: "#fff",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            padding: "14px 20px",
            cursor: "pointer",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            transition: "background 0.08s, border-color 0.08s",
          }}
        >
          🔍 SEARCH
        </button>
      </div>
    </form>
  );
}

export default HeroSearchBar;
