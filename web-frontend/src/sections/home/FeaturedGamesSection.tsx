import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../services/gameService';
import GameCard from '../../components/GameCard';
import { ROUTES } from '../../routes/routes';

function FeaturedGamesSection() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          {/* pixel bracket decoration */}
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
          {[...getAllGames()]
            .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
            .slice(0, 4)
            .map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            to={ROUTES.GAMES}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
            onMouseDown={() => setBtnPressed(true)}
            onMouseUp={() => setBtnPressed(false)}
            style={{
              background: btnHovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
              border: `3px solid ${btnHovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
              boxShadow: btnPressed ? "0 0 0 var(--arcade-shadow)" : "5px 5px 0px var(--arcade-shadow)",
              transform: btnPressed ? "translate(5px,5px)" : "translate(0,0)",
              color: "#fff",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.55rem",
              padding: "14px 28px",
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: "background 0.08s, border-color 0.08s",
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
