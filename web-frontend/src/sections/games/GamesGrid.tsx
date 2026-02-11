import GameCard from '../../components/GameCard';
import type { Game } from '../../_mock/games';

interface GamesGridProps {
  games: Game[];
  onClearFilters: () => void;
}

function GamesGrid({ games, onClearFilters }: GamesGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">No games found matching your filters</p>
        <button
          onClick={onClearFilters}
          className="mt-4 px-6 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GamesGrid;