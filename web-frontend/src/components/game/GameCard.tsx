import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import GenreBadge from './GenreBadge';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  const [hovered, setHovered] = useState(false);
  const [favHovered, setFavHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isFavoriteGame, toggleFavoriteGame } = useFavorites();
  const isFav = isAuthenticated && isFavoriteGame(game.id);

  return (
    <Link
      to={`/games/${game.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--arcade-panel)",
        border: `3px solid ${hovered ? "var(--arcade-accent)" : "var(--arcade-border)"}`,
        boxShadow: hovered
          ? "6px 6px 0px var(--arcade-accent-dark), 10px 10px 0px #000"
          : "5px 5px 0px var(--arcade-shadow), 8px 8px 0px #000",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        transition: "border-color 0.1s, box-shadow 0.1s, transform 0.1s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src={game.image}
          alt={game.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.2s",
            filter: "brightness(0.85) saturate(0.8)",
          }}
        />
        {/* Pixel overlay on image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.08) 2px,
              rgba(0,0,0,0.08) 4px
            )`,
            pointerEvents: "none",
          }}
        />
        {/* Rating Badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "var(--arcade-input-bg)",
            border: "2px solid var(--arcade-h)",
            boxShadow: "2px 2px 0px var(--arcade-h-shadow)",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            color: "var(--arcade-h)",
          }}
        >
          ★ {game.rating}
        </div>
        {/* Year badge */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "var(--arcade-input-bg)",
            border: "2px solid var(--arcade-shadow)",
            padding: "4px 7px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.38rem",
            color: "var(--arcade-muted)",
          }}
        >
          {game.releaseYear}
        </div>
        {/* Favorite heart */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavoriteGame(game.id);
            }}
            onMouseEnter={() => setFavHovered(true)}
            onMouseLeave={() => setFavHovered(false)}
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              background: isFav || favHovered ? "rgba(239,68,68,0.9)" : "var(--arcade-input-bg)",
              border: `2px solid ${isFav ? "#f87171" : "var(--arcade-shadow)"}`,
              boxShadow: "2px 2px 0px var(--arcade-shadow)",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.7rem",
              padding: 0,
              transition: "background 0.1s, border-color 0.1s",
              zIndex: 2,
            }}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? "❤" : "🤍"}
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px", flex: 1, minHeight: "170px" }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.55rem",
            color: hovered ? "var(--arcade-accent)" : "var(--arcade-h)",
            textShadow: hovered ? "1px 1px 0px var(--arcade-accent-dark)" : "1px 1px 0px var(--arcade-h-shadow)",
            letterSpacing: "0.04em",
            margin: 0,
            lineHeight: 1.6,
            transition: "color 0.1s",
          }}
        >
          {game.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.38rem",
            color: "var(--arcade-muted)",
            letterSpacing: "0.03em",
            margin: 0,
            lineHeight: 1.8,

            /* Limit to exactly 2 lines */
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",

            /* Force consistent height (2 lines) */
            maxHeight: "1.37rem", // 0.38rem * 1.8 * 2 ≈ 1.37rem
          }}
        >
          {game.description}
        </p>


        {/* Genres */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {game.genre.map((genre) => (
            <GenreBadge key={genre} genre={genre} />
          ))}
        </div>

        {/* Platforms */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderTop: "1px dashed var(--arcade-shadow)",
            paddingTop: "8px",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: "0.7rem" }}>🖥️</span>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.35rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.03em",
            }}
          >
            {game.platform.join(' · ')}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
