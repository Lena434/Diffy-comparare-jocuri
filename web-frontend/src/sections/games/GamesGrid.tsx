import GameCard from '../../components/GameCard';
import type { Game } from '../../_mock/games';

interface GamesGridProps {
  games: Game[];
}

function GamesGrid({ games }: GamesGridProps) {
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
