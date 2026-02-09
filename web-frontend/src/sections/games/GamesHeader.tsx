interface GamesHeaderProps {
  totalGames: number;
}

function GamesHeader({ totalGames }: GamesHeaderProps) {
  return (
    <div className="mb-12 mt-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
        Browse Games
      </h1>
      <p className="text-gray-400 text-lg">
        Explore our collection of {totalGames} amazing games
      </p>
    </div>
  );
}

export default GamesHeader;