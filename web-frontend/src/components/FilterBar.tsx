import CompactSearchBar from './CompactSearchBar';
import Dropdown from './Dropdown';

interface FilterBarProps {
  searchValue?: string;
  genreValue?: string;
  platformValue?: string;
  sortValue?: string;
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string) => void;
  onPlatformFilter: (platform: string) => void;
  onSort: (sortBy: string) => void;
}

function FilterBar({
  searchValue = '',
  genreValue = 'All',
  platformValue = 'All',
  sortValue = 'title',
  onSearch,
  onGenreFilter,
  onPlatformFilter,
  onSort,
}: FilterBarProps) {
  const genres = ['All', 'RPG', 'Action', 'FPS', 'Simulation', 'Metroidvania', 'Platformer', 'Competitive'];
  const platforms = ['All', 'PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'];
  const sortOptions = [
    { value: 'title', label: 'NAME (A-Z)' },
    { value: 'rating', label: 'RATING HIGH-LOW' },
    { value: 'year', label: 'YEAR NEW-OLD' },
  ];

  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "5px 5px 0px var(--arcade-shadow)",
        padding: "20px",
        marginBottom: "28px",
        position: "relative",
      }}
    >
      {/* Corner bolts */}
      {[
        { top: 6, left: 6 }, { top: 6, right: 6 },
        { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "7px",
            height: "7px",
            background: "var(--arcade-border)",
            border: "1px solid var(--arcade-shadow)",
            borderRadius: "50%",
            ...pos,
          }}
        />
      ))}

      {/* Section label */}
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-shadow-mid)",
          letterSpacing: "0.1em",
          marginBottom: "16px",
          borderBottom: "1px dashed var(--arcade-shadow)",
          paddingBottom: "8px",
        }}
      >
        ⚙ FILTERS
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <CompactSearchBar
          value={searchValue}
          onSearch={onSearch}
          placeholder="SEARCH GAMES..."
        />
        <Dropdown
          label="Genre"
          options={genres}
          value={genreValue}
          onSelect={onGenreFilter}
        />
        <Dropdown
          label="Platform"
          options={platforms}
          value={platformValue}
          onSelect={onPlatformFilter}
        />
        <Dropdown
          label="Sort By"
          options={sortOptions}
          value={sortValue}
          onSelect={onSort}
        />
      </div>
    </div>
  );
}

export default FilterBar;
