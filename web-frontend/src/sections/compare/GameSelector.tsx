import { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import type { Game } from '../../_mock/games';

interface GameSelectorProps {
  games: Game[];
  onSelectGame1: (id: number) => void;
  onSelectGame2: (id: number) => void;
  onSelectGame3: (id: number | null) => void;
}


function GameSelector({ games, onSelectGame1, onSelectGame2, onSelectGame3 }: GameSelectorProps) {
  const [game1, setGame1] = useState<string | null>(null);
  const [game2, setGame2] = useState<string | null>(null);
  const [game3, setGame3] = useState<string | null>(null);

  const gameOptions = games.map(game => ({
    value: game.id.toString(),
    label: game.title
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Dropdown
        label="Game 1"
        value={game1 ?? ''}
        placeholder="Select a game"
        options={gameOptions}
        onSelect={(value) => {
          setGame1(value || null);
          if (value) onSelectGame1(Number(value));
        }}
      />

      <Dropdown
        label="Game 2"
        value={game2 ?? ''}
        placeholder="Select a game"
        options={gameOptions}
        onSelect={(value) => {
          setGame2(value || null);
          if (value) onSelectGame2(Number(value));
        }}
      />

      <Dropdown
        label="Game 3 (Optional)"
        value={game3 ?? ''}
        placeholder="Select a game (optional)"
        options={gameOptions}
        onSelect={(value) => {
          setGame3(value || null);
          onSelectGame3(value ? Number(value) : null);
        }}
      />
    </div>
  );
}

export default GameSelector;
