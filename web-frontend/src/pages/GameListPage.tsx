import { useState } from 'react';
import { mockGames } from '../_mock/games';
import FilterSideBar from '../components/FilterSideBar';
import GamesHeader from '../sections/games/GamesHeader';
import GamesContent from '../sections/games/GamesContent';
import { useGameFilters } from '../hooks/useGameFilters';

function GameListPage() {
  const [showFilters, setShowFilters] = useState(false);

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

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-6 px-6 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold text-lg flex items-center justify-between"
        >
          <span>Filters</span>
          <span>{showFilters ? '▲' : '▼'}</span>
        </button>

        {/* Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Hidden on mobile unless toggled */}
          <div className={`w-full lg:w-80 lg:flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSideBar
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