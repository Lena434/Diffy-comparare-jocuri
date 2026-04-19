import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGameService } from '../../services/gameService';
import GameCard from '../../components/game/GameCard';
import { ROUTES } from '../../routes/routes';
import type { Game } from '../../types';

function FeaturedGamesSection() {
  const { getAll } = useGameService();
  const [featured, setFeatured] = useState<Game[]>([]);

  useEffect(() => {
    getAll()
      .then((games) =>
        setFeatured(
          [...games]
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 4),
        ),
      )
      .catch(() => {});
  }, [getAll]);

  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.4rem",
              color: "var(--arcade-shadow)",
              letterSpacing: "0.1em",
              marginBottom: "10px",
            }}
          >
            ★ ─────────────────────── ★
          </div>
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
              color: "var(--arcade-h)",
              textShadow: "3px 3px 0px var(--arcade-h-shadow)",
              letterSpacing: "0.1em",
              margin: "0 0 12px",
            }}
          >
            ▸ FEATURED GAMES
          </h2>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.4rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            DISCOVER THE MOST POPULAR GAMES IN OUR COLLECTION
          </p>
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.4rem",
              color: "var(--arcade-shadow)",
              letterSpacing: "0.1em",
              marginTop: "10px",
            }}
          >
            ★ ─────────────────────── ★
          </div>
        </div>

        {/* Games Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {featured.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            to={ROUTES.GAMES}
            className="[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-text)] text-white [box-shadow:5px_5px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(5px,5px)] transition-[background,border-color] duration-[80ms]"
            style={{
              borderWidth: "3px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.55rem",
              padding: "14px 28px",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ▶ VIEW ALL GAMES
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedGamesSection;
