import CompactSearchBar from './CompactSearchBar';
import Dropdown from './Dropdown';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string) => void;
  onPlatformFilter: (platform: string) => void;
  onSort: (sortBy: string) => void;
}

function FilterBar({ onSearch, onGenreFilter, onPlatformFilter, onSort }: FilterBarProps) {
  const genres = ['All', 'RPG', 'Action', 'FPS', 'Simulation', 'Metroidvania', 'Platformer', 'Competitive'];
  const platforms = ['All', 'PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'];
  const sortOptions = [
    { value: 'title', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Rating (High-Low)' },
    { value: 'year', label: 'Release Year (New-Old)' }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-neon-purple/20 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CompactSearchBar 
          onSearch={onSearch}
          placeholder="Search games..."
        />
        <Dropdown label="Genre" options={genres} onSelect={onGenreFilter} />
        <Dropdown label="Platform" options={platforms} onSelect={onPlatformFilter} />
        <Dropdown label="Sort By" options={sortOptions} onSelect={onSort} />
      </div>
    </div>
  );
}

export default FilterBar;