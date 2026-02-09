interface CompactSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

function CompactSearchBar({ 
  onSearch, 
  placeholder = "Search games..." 
}: CompactSearchBarProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Search
      </label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 bg-black/30 border border-neon-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
      />
    </div>
  );
}

export default CompactSearchBar;