import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockGames } from '../_mock/games';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ROUTES } from '../routes/routes';
import CompareHeader from '../sections/compare/CompareHeader';
import GameSelector from '../sections/compare/GameSelector';
import SelectedGamesPreview from '../sections/compare/SelectedGamesPreview';
import ComparisonTable from '../sections/compare/ComparisonTable';

function ComparePage() {
  const { isAuthenticated } = useAuth();
  const { saveComparison } = useFavorites();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [selectedGame1, setSelectedGame1] = useState<number | null>(null);
  const [selectedGame2, setSelectedGame2] = useState<number | null>(null);
  const [selectedGame3, setSelectedGame3] = useState<number | null>(null);

  //handler functions
  const handleSelectGame1 = (id: number | null) => {
    setSelectedGame1(id);
  };

  const handleSelectGame2 = (id: number | null) => {
    setSelectedGame2(id);
  };

  const handleSelectGame3 = (id: number | null) => {
    setSelectedGame3(id);
  };

  const game1 = selectedGame1 ? mockGames.find(game => game.id === selectedGame1) : undefined;
  const game2 = selectedGame2 ? mockGames.find(game => game.id === selectedGame2) : undefined;
  const game3 = selectedGame3 ? mockGames.find(game => game.id === selectedGame3) : undefined;
  
  const selectedGames = [game1, game2, game3].filter(
    (game): game is NonNullable<typeof game> => Boolean(game)
  );
  

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <CompareHeader />

        <GameSelector
          games={mockGames}
          selectedGame1 = {selectedGame1}
          selectedGame2 = {selectedGame2}
          selectedGame3 = {selectedGame3}
          onSelectGame1={handleSelectGame1}
          onSelectGame2={handleSelectGame2}
          onSelectGame3={handleSelectGame3}
        />

        {selectedGames.length >= 2 ? (
          <>
            <SelectedGamesPreview
              game1={game1}
              game2={game2}
              game3={game3}
            />
            <ComparisonTable games={selectedGames} />

            {/* Save comparison button */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => {
                  saveComparison(selectedGames.map((g) => g.id));
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                style={{
                  background: saved ? "rgba(34,197,94,0.8)" : "var(--arcade-cta)",
                  border: `3px solid ${saved ? "#4ade80" : "var(--arcade-text)"}`,
                  boxShadow: "4px 4px 0px var(--arcade-shadow)",
                  color: "#fff",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 24px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "background 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!saved) {
                    e.currentTarget.style.background = "var(--arcade-accent)";
                    e.currentTarget.style.borderColor = "var(--arcade-h)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saved) {
                    e.currentTarget.style.background = "var(--arcade-cta)";
                    e.currentTarget.style.borderColor = "var(--arcade-text)";
                  }
                }}
              >
                {saved ? "✓ SAVED!" : "⭐ SAVE TO FAVORITES"}
              </button>
            </div>
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.5rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.06em",
              marginTop: "48px",
              lineHeight: 1.8,
              animation: "pixel-blink 1.4s steps(1) infinite",
            }}
          >
            ▸ SELECT AT LEAST 2 GAMES TO COMPARE
          </p>
        )}
      </div>
    </div>
  );
}

export default ComparePage;