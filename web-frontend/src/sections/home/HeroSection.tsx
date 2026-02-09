function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent animate-pulse">
          DIFFY
        </h1>
        <p className="text-2xl text-neon-cyan font-light tracking-wide">
          Compare. Discover. Play.
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-8 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold text-lg shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50 hover:scale-105 transform duration-200">
            Explore Games
          </button>
          <button className="px-8 py-3 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all rounded-lg font-semibold text-lg hover:scale-105 transform duration-200">
            Start Comparing
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;