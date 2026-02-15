import type { Game } from '../../_mock/games';
import ComparisonRow from './ComparisonRow';
import { comparisonCriteria } from './comparisonCriteria';

interface ComparisonTableProps {
  games: Game[];
}

function ComparisonTable({ games }: ComparisonTableProps) {
  if (games.length < 2) return null;

  return (
    <div className="mt-12">
      {/* Wrapper cu scroll */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-purple-900/40">
                <th className="p-3 md:p-4 text-left text-gray-300 min-w-[120px] w-[120px] md:w-auto">
                  Feature
                </th>

                {games.map((game) => (
                  <th
                    key={game.id}
                    className="p-3 md:p-4 text-center text-white min-w-[160px] md:min-w-0"
                  >
                    <div className="text-sm md:text-base font-bold line-clamp-2">
                      {game.title}
                    </div>
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
      </div>

      {/* Hint pentru scroll pe mobil */}
      <div className="md:hidden mt-4 text-center text-gray-400 text-sm animate-pulse">
        ← Swipe to see all columns →
      </div>
    </div>
  );
}

export default ComparisonTable;