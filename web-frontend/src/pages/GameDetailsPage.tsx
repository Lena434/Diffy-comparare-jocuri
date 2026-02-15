import { useParams, useNavigate } from 'react-router-dom';
import { mockGames } from '../_mock/games';
import GameCard from '../components/GameCard';

function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const game = mockGames.find(g => g.id === Number(id));

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
          <p className="text-gray-400 mb-8">The game you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/games')}
            className="px-6 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  // Similar games (același gen, exclude jocul curent)
  const similarGames = mockGames
    .filter(g => 
      g.id !== game.id && 
      g.genre.some(genre => game.genre.includes(genre))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Hero Section - Imagine + Info principală */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Image - Square on mobile, full height on desktop */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl mx-auto w-full max-w-md lg:max-w-none aspect-square lg:aspect-auto">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-yellow-400 text-xl">⭐</span>
              <span className="text-white font-bold text-xl">{game.rating}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-3 md:mb-4">
                {game.title}
              </h1>
              <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                {game.description}
              </p>

              {/* Details Grid - 2 columns on mobile, maintains on desktop */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:gap-4 mb-4 md:mb-6">
                {/* Genre - spans both columns */}
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs md:text-sm mb-2">Genre</p>
                  <div className="flex flex-wrap gap-2">
                    {game.genre.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-xs md:text-sm text-neon-purple font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">Platform</p>
                  <p className="text-white text-xs md:text-base">{game.platform.join(', ')}</p>
                </div>

                {/* Game Mode */}
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">Game Mode</p>
                  <p className="text-white text-xs md:text-base">{game.gameMode.join(', ')}</p>
                </div>

                {/* Release Year */}
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">Release Year</p>
                  <p className="text-white text-xs md:text-base">{game.releaseYear}</p>
                </div>

                {/* Price */}
                {game.price !== undefined && (
                  <div>
                    <p className="text-gray-500 text-xs md:text-sm mb-1">Price</p>
                    <p className="text-neon-cyan font-bold text-lg md:text-xl">
                      {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
                    </p>
                  </div>
                )}

                {/* Developer */}
                {game.developer && (
                  <div>
                    <p className="text-gray-500 text-xs md:text-sm mb-1">Developer</p>
                    <p className="text-white text-xs md:text-base">{game.developer}</p>
                  </div>
                )}

                {/* Publisher */}
                {game.publisher && (
                  <div>
                    <p className="text-gray-500 text-xs md:text-sm mb-1">Publisher</p>
                    <p className="text-white text-xs md:text-base">{game.publisher}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={() => navigate('/compare')}
                className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold text-sm md:text-lg shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50 flex items-center justify-center gap-2"
              >
                <span>⚖️</span>
                <span>Add to Compare</span>
              </button>

              <button
                onClick={() => alert('Added to Favorites! (Mock)')}
                className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all rounded-lg font-semibold text-sm md:text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <span>❤️</span>
                <span>Add to Favorites</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Games Section */}
        {similarGames.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Similar Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarGames.map((similarGame) => (
                <GameCard key={similarGame.id} game={similarGame} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default GameDetailsPage;