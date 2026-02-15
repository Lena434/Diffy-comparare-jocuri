import { Link } from 'react-router-dom';  
import type { Game } from '../_mock/games';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <Link  
      to={`/games/${game.id}`}  
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-neon-purple/20 hover:border-neon-cyan/50 transition-all hover:scale-105 transform duration-300 shadow-lg hover:shadow-neon-cyan/20 block"
    >
      {/* Image */}
      <div className="relative h-32 md:h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/70 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-white font-semibold text-sm">{game.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        {/* Title */}
        <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 hover:text-neon-cyan transition-colors line-clamp-1">
          {game.title}
        </h3>

        {/* Description */}
        <p className="hidden md:block text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          {game.genre.slice(0, 2).map((genre) => (
            <span 
              key={genre}
              className="px-1.5 md:px-2 py-0.5 md:py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-xs text-neon-purple font-medium"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Platforms */}
        <div className="flex items-center gap-1 md:gap-2 text-gray-400 text-xs md:text-sm">
          <span className="text-neon-cyan">🎮</span>
          <span className="line-clamp-1">{game.platform.join(', ')}</span>
        </div>
      </div>
    </Link>  
  );
}

export default GameCard;