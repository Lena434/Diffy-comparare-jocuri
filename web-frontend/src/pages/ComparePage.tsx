import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameService } from '../services/gameService';
import { useFavorites } from '../contexts/FavoritesContext';
import CompareHeader from '../sections/compare/CompareHeader';
import GameSelector from '../sections/compare/GameSelector';
import SelectedGamesPreview from '../sections/compare/SelectedGamesPreview';
import ComparisonTable from '../sections/compare/ComparisonTable';
import PixelLoader from '../components/ui/PixelLoader';
import type { Game } from '../types';

function ComparePage() {
  const { getAll } = useGameService();
  const { saveComparison } = useFavorites();
  const location = useLocation();
  const locationState = location.state as { preselectedGameId?: number; viewGameIds?: number[] } | null;
  const viewGameIds = locationState?.viewGameIds ?? null;
  const preselectedId = locationState?.preselectedGameId ?? null;

  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAll()
      .then((games) => { setAllGames(games); setLoading(false); })
      .catch(() => setLoading(false));
  }, [getAll]);

  const [selectedGame1, setSelectedGame1] = useState<number | null>(() => {
    if (viewGameIds) return viewGameIds[0] ?? null;
    const stored1 = localStorage.getItem('compareGame1');
    if (preselectedId) {
      if (!stored1) return preselectedId;
      return Number(stored1);
    }
    return stored1 ? Number(stored1) : null;
  });

  const [selectedGame2, setSelectedGame2] = useState<number | null>(() => {
    if (viewGameIds) return viewGameIds[1] ?? null;
    const stored1 = localStorage.getItem('compareGame1');
    const stored2 = localStorage.getItem('compareGame2');
    if (preselectedId) {
      if (stored1) return preselectedId;
      return stored2 ? Number(stored2) : null;
    }
    return stored2 ? Number(stored2) : null;
  });

  useEffect(() => {
    if (selectedGame1 !== null) localStorage.setItem('compareGame1', String(selectedGame1));
    else localStorage.removeItem('compareGame1');
  }, [selectedGame1]);

  useEffect(() => {
    if (selectedGame2 !== null) localStorage.setItem('compareGame2', String(selectedGame2));
    else localStorage.removeItem('compareGame2');
  }, [selectedGame2]);

  const handleSelectGame1 = useCallback((id: number | null) => setSelectedGame1(id), []);
  const handleSelectGame2 = useCallback((id: number | null) => setSelectedGame2(id), []);
  const handleReset = useCallback(() => { setSelectedGame1(null); setSelectedGame2(null); }, []);

  const game1 = allGames.find((g) => g.id === selectedGame1);
  const game2 = allGames.find((g) => g.id === selectedGame2);

  const selectedGames = [game1, game2].filter(
    (game): game is NonNullable<typeof game> => Boolean(game),
  );

  if (loading) return <PixelLoader message="LOADING COMPARE..." />;

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <CompareHeader />

        <GameSelector
          games={allGames}
          selectedGame1={selectedGame1}
          selectedGame2={selectedGame2}
          onSelectGame1={handleSelectGame1}
          onSelectGame2={handleSelectGame2}
        />

        {(selectedGame1 || selectedGame2) && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <button
              onClick={handleReset}
              className="bg-transparent [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:[border-color:rgba(239,68,68,0.7)] hover:[color:rgba(239,68,68,0.9)] active:[transform:translate(2px,2px)] transition-[color,border-color] duration-[80ms]"
              style={{ borderWidth: "2px", borderStyle: "solid", fontFamily: "'Press Start 2P', monospace", fontSize: "0.38rem", padding: "8px 14px", cursor: "pointer", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>✕</span><span>RESET</span>
            </button>
          </div>
        )}

        {selectedGames.length >= 2 ? (
          <>
            <SelectedGamesPreview game1={game1} game2={game2} />
            <ComparisonTable games={selectedGames} />

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => {
                  saveComparison(selectedGames);
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className={
                  saved
                    ? "[background:rgba(34,197,94,0.8)] [border-color:#4ade80] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] border-solid transition-[background,border-color] duration-[150ms]"
                    : "[background:var(--arcade-cta)] [border-color:var(--arcade-text)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] border-solid transition-[background,border-color] duration-[150ms]"
                }
                style={{ borderWidth: "3px", borderStyle: "solid", fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem", padding: "14px 24px", cursor: "pointer", letterSpacing: "0.06em" }}
              >
                {saved ? "✓ SAVED!" : "⭐ SAVE TO FAVORITES"}
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "var(--arcade-muted)", letterSpacing: "0.06em", marginTop: "48px", lineHeight: 1.8, animation: "pixel-blink 1.4s steps(1) infinite" }}>
            ▸ SELECT AT LEAST 2 GAMES TO COMPARE
          </p>
        )}
      </div>
    </div>
  );
}

export default ComparePage;
