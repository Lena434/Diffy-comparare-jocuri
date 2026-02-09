import GameCard from '../../components/GameCard';
import type { Game } from '../../_mock/games';

interface SelectedGamesPreviewProps {
  game1: Game | undefined;
  game2: Game | undefined;
  game3: Game | null | undefined;
}

function SelectedGamesPreview({ game1, game2, game3 }: SelectedGamesPreviewProps) {
  // Calculează câte jocuri sunt selectate
  const gamesCount = [game1, game2, game3].filter(Boolean).length;

  // Grid class dinamic bazat pe numărul de jocuri
  const gridClass = gamesCount === 2 
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'  // 2 jocuri - centrate
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';     // 3 jocuri - full width

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Selected Games</h2>
      <div className={gridClass}>
        {game1 && <GameCard game={game1} />}
        {game2 && <GameCard game={game2} />}
        {game3 && <GameCard game={game3} />}
      </div>
    </div>
  );
}

export default SelectedGamesPreview;