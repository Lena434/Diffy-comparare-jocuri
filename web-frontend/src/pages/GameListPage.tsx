import { mockGames } from '../_mock/games';
import FilterBar from '../components/FilterBar';
import GamesHeader from '../sections/games/GamesHeader';
import GamesGrid from '../sections/games/GamesGrid';
import { useGameFilters } from '../hooks/useGameFilters';

function GameListPage() {
  const {
    searchQuery,
    setSearchQuery,
    genreFilter,      
    setGenreFilter,
    platformFilter,   
    setPlatformFilter,
    sortBy,          
    setSortBy,
    filteredGames,
    clearFilters,
  } = useGameFilters(mockGames);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <GamesHeader totalGames={mockGames.length} />

        <FilterBar
          searchValue={searchQuery}
          genreValue={genreFilter}        // ← ADAUGĂ
          platformValue={platformFilter}  // ← ADAUGĂ
          sortValue={sortBy}              // ← ADAUGĂ
          onSearch={setSearchQuery}
          onGenreFilter={setGenreFilter}
          onPlatformFilter={setPlatformFilter}
          onSort={setSortBy}
        />

        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
          </p>
        </div>

        <GamesGrid games={filteredGames} onClearFilters={clearFilters} />
      </div>
    </div>
  );
}

export default GameListPage;