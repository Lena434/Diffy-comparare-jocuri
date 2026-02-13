import { mockGames } from '../_mock/games';
import FilterSidebar from '../components/FilterSideBar';
import GamesHeader from '../sections/games/GamesHeader';
import GamesContent from '../sections/games/GamesContent';
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
    totalFilteredGames,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    clearFilters,
  } = useGameFilters(mockGames, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <GamesHeader totalGames={mockGames.length} />

        {/* Layout: Sidebar + Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <FilterSidebar
              searchValue={searchQuery}
              genreValue={genreFilter}
              platformValue={platformFilter}
              sortValue={sortBy}
              onSearch={setSearchQuery}
              onGenreFilter={setGenreFilter}
              onPlatformFilter={setPlatformFilter}
              onSort={setSortBy}
            />
          </div>

          {/* Content */}
          <GamesContent
            games={filteredGames}
            totalFilteredGames={totalFilteredGames}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
            onGoToPage={goToPage}
            onClearFilters={clearFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default GameListPage;