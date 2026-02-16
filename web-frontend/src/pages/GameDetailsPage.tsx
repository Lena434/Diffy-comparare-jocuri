import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockGames } from '../_mock/games';
import GameCard from '../components/GameCard';

function GameDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [compareHovered, setCompareHovered] = useState(false);
  const [comparePressed, setComparePressed] = useState(false);
  const [favHovered, setFavHovered] = useState(false);
  const [favPressed, setFavPressed] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  const game = mockGames.find(g => g.id === Number(id));

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
  const similarGames = mockGames
    .filter(g =>
      g.id !== game.id &&
      g.genre.some(genre => game.genre.includes(genre))
    )
    .slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            background: "transparent",
            border: "none",
            color: backHovered ? "var(--arcade-accent)" : "var(--arcade-muted)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.4rem",
            cursor: "pointer",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.1s",
          }}
        >
          <span>◄</span>
          <span>BACK</span>
        </button>

        {/* Hero Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
                    <span
                      key={genre}
                      style={{
                        background: "rgba(139,92,246,0.15)",
                        border: "2px solid var(--arcade-shadow)",
                        padding: "6px 10px",
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "0.4rem",
                        color: "var(--arcade-accent)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {genre}
                    </span>
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
                onMouseEnter={() => setCompareHovered(true)}
                onMouseLeave={() => { setCompareHovered(false); setComparePressed(false); }}
                onMouseDown={() => setComparePressed(true)}
                onMouseUp={() => setComparePressed(false)}
                style={{
                  flex: "1 1 200px",
                  background: compareHovered ? "var(--arcade-accent)" : "var(--arcade-cta)",
                  border: `3px solid ${compareHovered ? "var(--arcade-h)" : "var(--arcade-text)"}`,
                  boxShadow: comparePressed ? "0 0 0 var(--arcade-shadow)" : "4px 4px 0px var(--arcade-shadow)",
                  transform: comparePressed ? "translate(4px,4px)" : "translate(0,0)",
                  color: "#fff",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 20px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "background 0.08s, border-color 0.08s",
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
                onClick={() => alert('Added to Favorites! (Mock)')}
                onMouseEnter={() => setFavHovered(true)}
                onMouseLeave={() => { setFavHovered(false); setFavPressed(false); }}
                onMouseDown={() => setFavPressed(true)}
                onMouseUp={() => setFavPressed(false)}
                style={{
                  flex: "1 1 200px",
                  background: favHovered ? "var(--arcade-accent)" : "rgba(236, 72, 153, 0.8)",
                  border: `3px solid ${favHovered ? "var(--arcade-h)" : "rgba(219, 39, 119, 0.9)"}`,
                  boxShadow: favPressed ? "0 0 0 var(--arcade-shadow)" : "4px 4px 0px var(--arcade-shadow)",
                  transform: favPressed ? "translate(4px,4px)" : "translate(0,0)",
                  color: "#fff",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 20px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "background 0.08s, border-color 0.08s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>❤️</span>
                <span>FAVORITE</span>
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
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
