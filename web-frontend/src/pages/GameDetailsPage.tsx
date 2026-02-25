import { useParams, useNavigate } from 'react-router-dom';
import { getGameById, getSimilarGames } from '../services/gameService';
import GameCard from '../components/game/GameCard';
import GenreBadge from '../components/game/GenreBadge';
import PixelLoader from '../components/ui/PixelLoader';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSimulatedLoading } from '../hooks/useSimulatedLoading';
import { ROUTES } from '../routes/routes';

function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loading = useSimulatedLoading(400);
  const { isAuthenticated } = useAuth();
  const { isFavoriteGame, toggleFavoriteGame } = useFavorites();

  if (loading) return <PixelLoader message="LOADING GAME..." />;

  const game = getGameById(Number(id));

  if (!game) {
    return (
      <div style={{ minHeight: "100vh", padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "3rem",
              color: "var(--arcade-shadow)",
              marginBottom: "20px",
            }}
          >
            ✖
          </div>
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.7rem",
              color: "var(--arcade-h)",
              textShadow: "2px 2px 0px var(--arcade-h-shadow)",
              marginBottom: "16px",
              lineHeight: 1.8,
            }}
          >
            GAME NOT FOUND
          </h1>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.38rem",
              color: "var(--arcade-muted)",
              marginBottom: "30px",
              lineHeight: 1.8,
            }}
          >
            THE GAME YOU'RE LOOKING FOR DOESN'T EXIST
          </p>
          <button
            onClick={() => navigate('/games')}
            style={{
              background: "var(--arcade-cta)",
              border: "3px solid var(--arcade-text)",
              boxShadow: "4px 4px 0px var(--arcade-shadow)",
              color: "#fff",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.45rem",
              padding: "12px 24px",
              cursor: "pointer",
              letterSpacing: "0.06em",
            }}
          >
            ← BACK TO GAMES
          </button>
        </div>
      </div>
    );
  }

  // Similar games
  const similarGames = getSimilarGames(game);

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-2 border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:[background:var(--arcade-border)] hover:[border-color:var(--arcade-accent)] hover:[color:var(--arcade-accent)] transition-[color,border-color,background] duration-[100ms]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.45rem",
            cursor: "pointer",
            marginBottom: "30px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            letterSpacing: "0.06em",
          }}
        >
          <span>◄</span>
          <span>BACK</span>
        </button>

        {/* Hero Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "30px",
            marginBottom: "50px",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              border: "3px solid var(--arcade-border)",
              boxShadow: "6px 6px 0px var(--arcade-shadow)",
              overflow: "hidden",
              aspectRatio: "1",
              maxWidth: "500px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.9) saturate(0.85)",
              }}
            />
            {/* Pixel overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.06) 2px,
                  rgba(0,0,0,0.06) 4px
                )`,
                pointerEvents: "none",
              }}
            />
            {/* Rating Badge */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "var(--arcade-input-bg)",
                border: "2px solid var(--arcade-h)",
                boxShadow: "3px 3px 0px var(--arcade-h-shadow)",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.5rem",
                color: "var(--arcade-h)",
              }}
            >
              ★ {game.rating}
            </div>
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "space-between" }}>
            {/* Title */}
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(0.8rem, 3vw, 1.4rem)",
                color: "var(--arcade-h)",
                textShadow: "3px 3px 0px var(--arcade-h-shadow)",
                letterSpacing: "0.08em",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {game.title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.55rem",
                color: "var(--arcade-text)",
                letterSpacing: "0.04em",
                lineHeight: 2.1,
                margin: 0,
              }}
            >
              {game.description}
            </p>

            {/* Details Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "16px",
                background: "var(--arcade-panel)",
                border: "3px solid var(--arcade-border)",
                padding: "20px",
                boxShadow: "4px 4px 0px var(--arcade-shadow)",
              }}
            >
              {/* Genre */}
              <div style={{ gridColumn: "1 / -1" }}>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.42rem",
                    color: "var(--arcade-muted)",
                    marginBottom: "10px",
                  }}
                >
                  GENRE
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {game.genre.map((genre) => (
                    <GenreBadge key={genre} genre={genre} size="md" />
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.42rem",
                    color: "var(--arcade-muted)",
                    marginBottom: "8px",
                  }}
                >
                  PLATFORM
                </p>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.45rem",
                    color: "var(--arcade-text)",
                    margin: 0,
                  }}
                >
                  {game.platform.join(', ')}
                </p>
              </div>

              {/* Game Mode */}
              <div>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.42rem",
                    color: "var(--arcade-muted)",
                    marginBottom: "8px",
                  }}
                >
                  MODE
                </p>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.45rem",
                    color: "var(--arcade-text)",
                    margin: 0,
                  }}
                >
                  {game.gameMode.join(', ')}
                </p>
              </div>

              {/* Release Year */}
              <div>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.42rem",
                    color: "var(--arcade-muted)",
                    marginBottom: "8px",
                  }}
                >
                  YEAR
                </p>
                <p
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.45rem",
                    color: "var(--arcade-text)",
                    margin: 0,
                  }}
                >
                  {game.releaseYear}
                </p>
              </div>

              {/* Price */}
              {game.price !== undefined && (
                <div>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.42rem",
                      color: "var(--arcade-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    PRICE
                  </p>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.58rem",
                      color: "var(--arcade-h)",
                      margin: 0,
                    }}
                  >
                    {game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}
                  </p>
                </div>
              )}

              {/* Developer */}
              {game.developer && (
                <div>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.42rem",
                      color: "var(--arcade-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    DEVELOPER
                  </p>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.45rem",
                      color: "var(--arcade-text)",
                      margin: 0,
                    }}
                  >
                    {game.developer}
                  </p>
                </div>
              )}

              {/* Publisher */}
              {game.publisher && (
                <div>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.42rem",
                      color: "var(--arcade-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    PUBLISHER
                  </p>
                  <p
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "0.45rem",
                      color: "var(--arcade-text)",
                      margin: 0,
                    }}
                  >
                    {game.publisher}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                onClick={() => navigate('/compare')}
                className="[background:var(--arcade-cta)] border-solid [border-color:var(--arcade-text)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] transition-[background,border-color] duration-[80ms]"
                style={{
                  flex: "1 1 200px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 20px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>⚖️</span>
                <span>COMPARE</span>
              </button>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate(ROUTES.LOGIN);
                    return;
                  }
                  toggleFavoriteGame(game.id);
                }}
                className="[background:var(--fav-bg)] [border-color:rgba(219,39,119,0.9)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] transition-[background,border-color] duration-[80ms]"
                style={{
                  '--fav-bg': (isAuthenticated && isFavoriteGame(game.id)) ? 'rgba(239,68,68,0.8)' : 'rgba(236,72,153,0.8)',
                  flex: "1 1 200px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 20px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                } as React.CSSProperties}
              >
                <span>{isAuthenticated && isFavoriteGame(game.id) ? "❤" : "🤍"}</span>
                <span>{isAuthenticated && isFavoriteGame(game.id) ? "UNFAVORITE" : "FAVORITE"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Games Section */}
        {similarGames.length > 0 && (
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
                borderTop: "2px dashed var(--arcade-shadow)",
                paddingTop: "40px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "clamp(0.6rem, 2vw, 0.9rem)",
                  color: "var(--arcade-h)",
                  textShadow: "2px 2px 0px var(--arcade-h-shadow)",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}
              >
                ▸ SIMILAR GAMES
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
                gap: "20px",
              }}
            >
              {similarGames.map((similarGame) => (
                <GameCard key={similarGame.id} game={similarGame} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default GameDetailsPage;
