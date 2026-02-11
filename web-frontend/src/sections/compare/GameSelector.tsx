import Dropdown from '../../components/Dropdown';
import type { Game } from '../../_mock/games';

interface GameSelectorProps {
  games: Game[];
  selectedGame1: number | null;
  selectedGame2: number | null;
  selectedGame3: number | null;
  onSelectGame1: (id: number | null) => void;
  onSelectGame2: (id: number | null) => void;
  onSelectGame3: (id: number | null) => void;
}

function GameSelector({ 
  games, 
  selectedGame1,
  selectedGame2,
  selectedGame3,
  onSelectGame1, 
  onSelectGame2, 
  onSelectGame3 
}: GameSelectorProps) {
  // Filtrează jocuri pentru fiecare dropdown (exclude cele deja selectate)
  const game1AvailableGames = games
    .filter(game => game.id !== selectedGame2 && game.id !== selectedGame3)
    .map(game => ({
      value: game.id.toString(),
      label: game.title
    }));

  const game1Options = [
    { value: '', label: 'Select a game' },  // ← ADAUGĂ
    ...game1AvailableGames
  ];

  const game2AvailableGames = games
    .filter(game => game.id !== selectedGame1 && game.id !== selectedGame3)
    .map(game => ({
      value: game.id.toString(),
      label: game.title
    }));

  const game2Options = [
    { value: '', label: 'Select a game' },  // ← ADAUGĂ
    ...game2AvailableGames
  ];

  const game3AvailableGames = games
    .filter(game => game.id !== selectedGame1 && game.id !== selectedGame2)
    .map(game => ({
      value: game.id.toString(),
      label: game.title
    }));

  const game3Options = [
    { value: '', label: 'None (Optional)' },
    ...game3AvailableGames
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Dropdown
        label="Game 1"
        value={selectedGame1?.toString() || ''}
        options={game1Options}
        onSelect={(value) => {
          onSelectGame1(value ? Number(value) : null);
        }}
      />

      <Dropdown
        label="Game 2"
        value={selectedGame2?.toString() || ''}
        options={game2Options}
        onSelect={(value) => {
          onSelectGame2(value ? Number(value) : null);
        }}
      />

      <Dropdown
        label="Game 3 (Optional)"
        value={selectedGame3?.toString() || ''}
        options={game3Options}
        onSelect={(value) => {
          onSelectGame3(value ? Number(value) : null);
        }}
      />
    </div>
  );
}

export default GameSelector;