import Dropdown from '../../components/Dropdown';
import type { Game } from '../../_mock/games';

interface GameSelectorProps {
  games: Game[];
  onSelectGame1: (id: number) => void;
  onSelectGame2: (id: number) => void;
  onSelectGame3: (id: number | null) => void;
}

function GameSelector({ games, onSelectGame1, onSelectGame2, onSelectGame3 }: GameSelectorProps) {
  const gameOptions = games.map(game => ({
    value: game.id.toString(),
    label: game.title
  }));

  const gameOptionsWithEmpty = [
    { value: 'none', label: 'None (Optional)' },
    ...gameOptions
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Dropdown
        label="Game 1"
        options={gameOptions}
        onSelect={(value) => onSelectGame1(Number(value))}
      />
      <Dropdown
        label="Game 2"
        options={gameOptions}
        onSelect={(value) => onSelectGame2(Number(value))}
      />
      <Dropdown
        label="Game 3 (Optional)"
        options={gameOptionsWithEmpty}
        onSelect={(value) => onSelectGame3(value === 'none' ? null : Number(value))}
      />
    </div>
  );
}

export default GameSelector;