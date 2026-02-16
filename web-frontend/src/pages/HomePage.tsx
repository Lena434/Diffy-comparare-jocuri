import HeroSection from "../sections/home/HeroSection";
import FeaturedGamesSection from '../sections/home/FeaturedGamesSection';

function HomePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <HeroSection />
      <FeaturedGamesSection />
    </div>
  );
}

export default HomePage;