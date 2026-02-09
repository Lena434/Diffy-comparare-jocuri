import { mockGames } from '../../_mock/games';
import GameCard from '../../components/GameCard';

function FeaturedGamesSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
            Featured Games
          </h2>
          <p className="text-gray-400 text-lg">
            Discover the most popular games in our collection
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/games'}
            className="px-8 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold text-lg shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50 hover:scale-105 transform duration-200"
          >
            View All Games
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedGamesSection;