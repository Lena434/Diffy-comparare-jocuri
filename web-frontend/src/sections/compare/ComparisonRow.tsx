import type { Game } from '../../_mock/games';

interface ComparisonRowProps {
  label: string;
  games: Game[];
  renderValue: (game: Game) => string | number | React.ReactNode;
}

function ComparisonRow({ label, games, renderValue }: ComparisonRowProps) {
  return (
    <tr className="border-b border-purple-900/20 hover:bg-purple-900/20 transition-colors">
      <td className="p-3 md:p-4 text-gray-300 font-semibold min-w-[120px] w-[120px] md:w-auto text-sm md:text-base">
        {label}
      </td>
      {games.map((game) => (
        <td 
          key={game.id} 
          className="p-3 md:p-4 text-center text-white min-w-[160px] md:min-w-0 text-sm md:text-base"
        >
          {renderValue(game)}
        </td>
      ))}
    </tr>
  );
}

export default ComparisonRow;