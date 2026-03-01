import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

interface HeroSearchBarProps {
  placeholder?: string;
}

function HeroSearchBar({
  placeholder = "SEARCH: CYBERPUNK, CS2...",
}: HeroSearchBarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);

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
          className="bg-[var(--arcade-cta)] hover:bg-[var(--arcade-accent)] border-[3px] border-[var(--arcade-text)] hover:border-[var(--arcade-h)] [box-shadow:3px_3px_0px_var(--arcade-shadow)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:translate-x-[3px] active:translate-y-[3px] transition-[background,border-color] duration-75"
          style={{
            color: "#fff",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            padding: "14px 20px",
            cursor: "pointer",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          🔍 SEARCH
        </button>
      </div>
    </form>
  );
}

export default HeroSearchBar;
