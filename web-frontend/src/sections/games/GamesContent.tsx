import GamesGrid from './GamesGrid';
import Pagination from '../../components/Pagination';  // ← Import din components
import type { Game } from '../../_mock/games';

interface GamesContentProps {
  games: Game[];
  totalFilteredGames: number;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
  onClearFilters: () => void;
}

function GamesContent({ 
  games, 
  totalFilteredGames, 
  currentPage, 
  totalPages,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  onClearFilters 
}: GamesContentProps) {
  return (
    <div className="flex-1">
      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {games.length} of {totalFilteredGames} {totalFilteredGames === 1 ? 'game' : 'games'}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </p>
      </div>

      {/* Games Grid */}
      <GamesGrid games={games} onClearFilters={onClearFilters} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onGoToPage={onGoToPage}
      />
    </div>
  );
}

export default GamesContent;