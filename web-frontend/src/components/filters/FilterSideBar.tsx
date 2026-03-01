import CompactSearchBar from './CompactSearchBar';
import Dropdown from './Dropdown';

interface FilterSidebarProps {
  searchValue?: string;
  genreValue?: string;
  platformValue?: string;
  sortValue?: string;
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string) => void;
  onPlatformFilter: (platform: string) => void;
  onSort: (sortBy: string) => void;
}

function FilterSideBar({ 
  searchValue = '', 
  genreValue = 'All',
  platformValue = 'All',
  sortValue = 'title',
  onSearch, 
  onGenreFilter, 
  onPlatformFilter, 
  onSort 
}: FilterSidebarProps) {
  const genres = ['All', 'RPG', 'Action', 'FPS', 'Simulation', 'Metroidvania', 'Platformer', 'Competitive', 'MOBA', 'Battle Royale', 'Sandbox', 'Puzzle', 'Adventure', 'Party', 'Roguelike', 'Hero Shooter', 'Social', 'Indie'];
  const platforms = ['All', 'PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'];
  const sortOptions = [
    { value: 'title', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Rating (High-Low)' },
    { value: 'year', label: 'Release Year (New-Old)' }
  ];

  return (
    <aside className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-sm border border-neon-purple/20 rounded-xl p-6 h-fit lg:sticky lg:top-24">
      {/* Header */}
      <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-neon-purple/30">
        Filters
      </h3>

      {/* Search */}
      <div className="mb-6">
        <CompactSearchBar 
          value={searchValue}
          onSearch={onSearch}
          placeholder="Search games..."
        />
      </div>

      {/* Genre */}
      <div className="mb-6">
        <Dropdown 
          label="Genre" 
          options={genres} 
          value={genreValue}
          onSelect={onGenreFilter} 
        />
      </div>

      {/* Platform */}
      <div className="mb-6">
        <Dropdown 
          label="Platform" 
          options={platforms} 
          value={platformValue}
          onSelect={onPlatformFilter} 
        />
      </div>

      {/* Sort */}
      <div>
        <Dropdown 
          label="Sort By" 
          options={sortOptions} 
          value={sortValue}
          onSelect={onSort} 
        />
      </div>
    </aside>
  );
}

export default FilterSideBar;