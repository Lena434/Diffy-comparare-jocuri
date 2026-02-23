import Dropdown from '../../components/Dropdown';
import type { Game } from '../../types';

interface GameSelectorProps {
  games: Game[];
  selectedGame1: number | null;
  selectedGame2: number | null;
  onSelectGame1: (id: number | null) => void;
  onSelectGame2: (id: number | null) => void;
}

function GameSelector({
  games,
  selectedGame1,
  selectedGame2,
  onSelectGame1,
  onSelectGame2,
}: GameSelectorProps) {
  const game1AvailableGames = games
    .filter(game => game.id !== selectedGame2)
    .map(game => ({
      value: game.id.toString(),
      label: game.title
    }));

  const game1Options = [
    { value: '', label: 'Select a game' },
    ...game1AvailableGames
  ];

  const game2AvailableGames = games
    .filter(game => game.id !== selectedGame1)
    .map(game => ({
      value: game.id.toString(),
      label: game.title
    }));

  const game2Options = [
    { value: '', label: 'Select a game' },
    ...game2AvailableGames
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
    </div>
  );
}

export default GameSelector;