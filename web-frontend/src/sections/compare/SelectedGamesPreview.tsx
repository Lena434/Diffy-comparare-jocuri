import GameCard from '../../components/game/GameCard';
import type { Game } from '../../types';

interface SelectedGamesPreviewProps {
  game1: Game | undefined;
  game2: Game | undefined;
}

function SelectedGamesPreview({ game1, game2 }: SelectedGamesPreviewProps) {
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
          gridTemplateColumns: `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`,
          gap: "20px",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        {game1 && <GameCard game={game1} />}
        {game2 && <GameCard game={game2} />}
      </div>
    </div>
  );
}

export default SelectedGamesPreview;
