import type { Game } from '../../_mock/games';
import ComparisonRow from './ComparisonRow';
import { comparisonCriteria } from './comparisonCriteria';

interface ComparisonTableProps {
  games: Game[];
}

function ComparisonTable({ games }: ComparisonTableProps) {
  if (games.length < 2) return null;

  return (
    <div className="overflow-x-auto mt-12">
      <table className="w-full border-collapse rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-purple-900/40">
            <th className="p-4 text-left text-gray-300">
              Feature
            </th>

            {games.map((game) => (
              <th
                key={game.id}
                className="p-4 text-center text-white"
              >
                {game.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-black/30">
          {comparisonCriteria.map((criterion) => (
            <ComparisonRow
              key={criterion.label}
              label={criterion.label}
              games={games}
              renderValue={criterion.renderValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
