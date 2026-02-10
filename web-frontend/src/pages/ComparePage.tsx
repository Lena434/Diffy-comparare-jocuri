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

  const game1 = selectedGame1 ? mockGames.find(game => game.id === selectedGame1) : undefined;
  const game2 = selectedGame2 ? mockGames.find(game => game.id === selectedGame2) : undefined;
  const game3 = selectedGame3 ? mockGames.find(game => game.id === selectedGame3) : undefined;
  
  const selectedGames = [game1, game2, game3].filter(
    (game): game is NonNullable<typeof game> => Boolean(game)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <CompareHeader />

        <GameSelector
          games={mockGames}
          onSelectGame1={setSelectedGame1}
          onSelectGame2={setSelectedGame2}
          onSelectGame3={setSelectedGame3}
        />

        {selectedGames.length >= 2 ? (
          <>
            <SelectedGamesPreview
            game1={game1}
            game2={game2}
            game3={game3}
            />

            {/* TODO: ComparisonTable will be here */}
            <ComparisonTable games={selectedGames} />
        </>
        ) : (
        <p className="text-center text-gray-400 mt-12">
            Select at least 2 games to compare
        </p>
        )}


      </div>
    </div>
  );
}

export default ComparePage;