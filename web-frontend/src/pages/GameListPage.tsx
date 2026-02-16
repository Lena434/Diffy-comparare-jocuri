import { mockGames } from '../_mock/games';
import FilterBar from '../components/FilterBar';
import GamesHeader from '../sections/games/GamesHeader';
import GamesGrid from '../sections/games/GamesGrid';
import Pagination from '../components/Pagination';
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
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <GamesHeader totalGames={mockGames.length} />

        <FilterBar
          searchValue={searchQuery}
          genreValue={genreFilter}
          platformValue={platformFilter}
          sortValue={sortBy}
          onSearch={setSearchQuery}
          onGenreFilter={setGenreFilter}
          onPlatformFilter={setPlatformFilter}
          onSort={setSortBy}
        />

        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.4rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            SHOWING{" "}
            <span style={{ color: "var(--arcade-accent)" }}>{filteredGames.length}</span>
            {" "}OF{" "}
            <span style={{ color: "var(--arcade-accent)" }}>{totalFilteredGames}</span>
            {" "}{totalFilteredGames === 1 ? 'GAME' : 'GAMES'}
            {totalPages > 1 && ` (PAGE ${currentPage} OF ${totalPages})`}
          </p>
        </div>

        <GamesGrid games={filteredGames} onClearFilters={clearFilters} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
            onGoToPage={goToPage}
          />
        )}
      </div>
    </div>
  );
}

export default GameListPage;