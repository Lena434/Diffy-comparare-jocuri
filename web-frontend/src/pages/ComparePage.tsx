import { useState } from 'react';
import { mockGames } from '../_mock/games';
import CompareHeader from '../sections/compare/CompareHeader';
import GameSelector from '../sections/compare/GameSelector';
import SelectedGamesPreview from '../sections/compare/SelectedGamesPreview';
import ComparisonTable from '../sections/compare/ComparisonTable';

function ComparePage() {
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