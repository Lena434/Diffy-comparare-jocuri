import type { Game } from '../_mock/games';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-neon-purple/20 hover:border-neon-cyan/50 transition-all hover:scale-105 transform duration-300 shadow-lg hover:shadow-neon-cyan/20">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-semibold">{game.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 hover:text-neon-cyan transition-colors">
          {game.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {game.genre.map((genre) => (
            <span 
              key={genre}
              className="px-2 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-xs text-neon-purple font-medium"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Platforms */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="text-neon-cyan">🎮</span>
          <span>{game.platform.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;