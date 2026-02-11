import HeroSection from "../sections/home/HeroSection";
import FeaturedGamesSection from '../sections/home/FeaturedGamesSection';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <HeroSection />
      <FeaturedGamesSection />
    </div>
  );
}

export default HomePage;