import GameCard from '../../components/GameCard';
import type { Game } from '../../_mock/games';

interface SelectedGamesPreviewProps {
  game1: Game | undefined;
  game2: Game | undefined;
  game3: Game | null | undefined;
}

function SelectedGamesPreview({ game1, game2, game3 }: SelectedGamesPreviewProps) {
  const gamesCount = [game1, game2, game3].filter(Boolean).length;
  const maxWidth = gamesCount === 2 ? "860px" : "100%";

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.7rem",
          color: "var(--arcade-h)",
          textShadow: "2px 2px 0px var(--arcade-h-shadow)",
          letterSpacing: "0.08em",
          marginBottom: "20px",
        }}
      >
        ▸ SELECTED GAMES
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gamesCount}, 1fr)`,
          gap: "20px",
          maxWidth,
          margin: gamesCount === 2 ? "0 auto" : "0",
        }}
      >
        {game1 && <GameCard game={game1} />}
        {game2 && <GameCard game={game2} />}
        {game3 && <GameCard game={game3} />}
      </div>
    </div>
  );
}

export default SelectedGamesPreview;
