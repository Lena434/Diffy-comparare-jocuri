import { useState } from 'react';
import GameCard from '../../components/GameCard';
import type { Game } from '../../_mock/games';

interface GamesGridProps {
  games: Game[];
  onClearFilters: () => void;
}

function GamesGrid({ games, onClearFilters }: GamesGridProps) {
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  if (games.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "2rem",
            color: "var(--arcade-shadow)",
          }}
        >
          ✖
        </div>
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.55rem",
            color: "var(--arcade-muted)",
            letterSpacing: "0.06em",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          NO GAMES FOUND
          <br />
          MATCHING YOUR FILTERS
        </p>
        <button
          onClick={onClearFilters}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
          onMouseDown={() => setBtnPressed(true)}
          onMouseUp={() => setBtnPressed(false)}
          style={{
            background: btnHovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
            border: `3px solid ${btnHovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
            boxShadow: btnPressed ? "0 0 0 var(--arcade-shadow)" : "4px 4px 0px var(--arcade-shadow)",
            transform: btnPressed ? "translate(4px,4px)" : "translate(0,0)",
            color: "#fff",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            padding: "12px 20px",
            cursor: "pointer",
            letterSpacing: "0.06em",
            transition: "background 0.08s, border-color 0.08s",
          }}
        >
          ↺ CLEAR FILTERS
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
        gap: "20px",
      }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GamesGrid;
