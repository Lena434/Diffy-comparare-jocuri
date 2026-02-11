import type { Game } from '../../_mock/games';

interface ComparisonRowProps {
  label: string;
  games: Game[];
  renderValue: (game: Game) => React.ReactNode;
}

function ComparisonRow({ label, games, renderValue }: ComparisonRowProps) {
  return (
    <tr className="border-t border-white/10">
      <td className="p-4 text-gray-300 font-medium">
        {label}
      </td>

      {games.map((game) => (
        <td
          key={game.id}
          className="p-4 text-center text-white"
        >
          {renderValue(game)}
        </td>
      ))}
    </tr>
  );
}

export default ComparisonRow;
