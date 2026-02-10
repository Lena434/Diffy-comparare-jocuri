import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

interface HeroSearchBarProps {
  placeholder?: string;
}

function HeroSearchBar({ 
  placeholder = "Quick search: Cyberpunk, Stardew Valley, CS2..." 
}: HeroSearchBarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.GAMES}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-black/30 backdrop-blur-sm border-2 border-neon-purple/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-neon-purple hover:bg-neon-cyan transition-colors rounded-full font-semibold"
        >
          🔍 Search
        </button>
      </div>
    </form>
  );
}

export default HeroSearchBar;