import { useState, useCallback } from 'react';
import { getAllGames, getGameById } from '../services/gameService';
import { useFavorites } from '../contexts/FavoritesContext';
import CompareHeader from '../sections/compare/CompareHeader';
import GameSelector from '../sections/compare/GameSelector';
import SelectedGamesPreview from '../sections/compare/SelectedGamesPreview';
import ComparisonTable from '../sections/compare/ComparisonTable';
import PixelLoader from '../components/ui/PixelLoader';
import { useSimulatedLoading } from '../hooks/useSimulatedLoading';

function ComparePage() {
  const loading = useSimulatedLoading(400);
  const { saveComparison } = useFavorites();
  const [saved, setSaved] = useState(false);
  const [selectedGame1, setSelectedGame1] = useState<number | null>(null);
  const [selectedGame2, setSelectedGame2] = useState<number | null>(null);

  const handleSelectGame1 = useCallback((id: number | null) => {
    setSelectedGame1(id);
  }, []);

  const handleSelectGame2 = useCallback((id: number | null) => {
    setSelectedGame2(id);
  }, []);

  const game1 = selectedGame1 ? getGameById(selectedGame1) : undefined;
  const game2 = selectedGame2 ? getGameById(selectedGame2) : undefined;

  const selectedGames = [game1, game2].filter(
    (game): game is NonNullable<typeof game> => Boolean(game)
  );

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
        <PixelLoader message="LOADING COMPARE..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <CompareHeader />

        <GameSelector
          games={getAllGames()}
          selectedGame1={selectedGame1}
          selectedGame2={selectedGame2}
          onSelectGame1={handleSelectGame1}
          onSelectGame2={handleSelectGame2}
        />

        {selectedGames.length >= 2 ? (
          <>
            <SelectedGamesPreview
              game1={game1}
              game2={game2}
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
                className={
                  saved
                    ? "[background:rgba(34,197,94,0.8)] [border-color:#4ade80] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] border-solid transition-[background,border-color] duration-[150ms]"
                    : "[background:var(--arcade-cta)] [border-color:var(--arcade-text)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] border-solid transition-[background,border-color] duration-[150ms]"
                }
                style={{
                  borderWidth: "3px",
                  borderStyle: "solid",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  padding: "14px 24px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
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