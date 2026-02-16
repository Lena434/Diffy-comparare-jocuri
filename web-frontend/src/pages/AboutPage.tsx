import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-neon-cyan">Diffy</span>
          </h1>
          <p className="text-xl text-gray-300">
            Your Ultimate Game Comparison Platform
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 bg-black/30 rounded-2xl p-8 backdrop-blur-sm">
          {/* What is Diffy */}
          <section>
            <h2 className="text-2xl font-bold text-neon-cyan mb-4">
              What is Diffy?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Diffy is a comprehensive platform designed to help gamers discover,
              explore, and compare video games across different genres, platforms,
              and playstyles. Whether you're searching for your next gaming
              adventure or trying to decide between similar titles, Diffy makes
              the choice easier with side-by-side comparisons and detailed game
              information.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-neon-cyan mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  🎮 Extensive Game Library
                </h3>
                <p className="text-gray-400">
                  Browse through a vast collection of games across all platforms
                  and genres with detailed information about each title.
                </p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  ⚖️ Side-by-Side Comparison
                </h3>
                <p className="text-gray-400">
                  Compare multiple games at once with our intelligent comparison
                  table that highlights key differences to help you make informed
                  decisions.
                </p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  🔍 Advanced Filtering
                </h3>
                <p className="text-gray-400">
                  Filter games by genre, platform, game mode, and more to quickly
                  find exactly what you're looking for.
                </p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  ⭐ Ratings & Details
                </h3>
                <p className="text-gray-400">
                  Access comprehensive game information including ratings, release
                  years, descriptions, and more to make the best choice.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-bold text-neon-cyan mb-4">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <span className="bg-neon-cyan text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Browse or Search
                  </h3>
                  <p className="text-gray-400">
                    Explore our game library or use the search feature to find
                    specific titles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="bg-neon-cyan text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Select Games to Compare
                  </h3>
                  <p className="text-gray-400">
                    Add games to your comparison list to view them side by side.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="bg-neon-cyan text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Compare & Decide
                  </h3>
                  <p className="text-gray-400">
                    Review the highlighted differences in our comparison table and
                    make an informed decision about which game suits you best.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-neon-cyan mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Diffy, we believe that choosing the right game should be easy and
              enjoyable. Our mission is to empower gamers with the tools and
              information they need to discover games that match their preferences
              and make confident purchasing decisions. We're passionate about
              gaming and committed to helping you find your next favorite game.
            </p>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Ready to find your next gaming adventure?
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to={ROUTES.GAMES}
              className="bg-neon-cyan text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
            >
              Browse Games
            </Link>
            <Link
              to={ROUTES.COMPARE}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors"
            >
              Start Comparing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
