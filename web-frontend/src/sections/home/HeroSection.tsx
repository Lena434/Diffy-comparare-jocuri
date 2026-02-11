import { useNavigate } from 'react-router-dom';
import HeroSearchBar from '../../components/HeroSearchBar';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-24 px-4">
      {/* Quick Search */}
      <div className="max-w-4xl mx-auto mb-16">
        <HeroSearchBar />
      </div>

      {/* Content centrat */}
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent animate-pulse">
            DIFFY
          </h1>
          <p className="text-2xl text-neon-cyan font-light tracking-wide">
            Compare. Discover. Play.
          </p>
                    
          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button 
              onClick={() => navigate('/games')}
              className="px-8 py-3 bg-neon-purple hover:bg-neon-pink transition-all rounded-lg font-semibold text-lg shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50 hover:scale-105 transform duration-200"
            >
              Explore Games
            </button>
            <button 
              onClick={() => navigate('/compare')}
              className="px-8 py-3 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all rounded-lg font-semibold text-lg hover:scale-105 transform duration-200"
            >
              Start Comparing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;