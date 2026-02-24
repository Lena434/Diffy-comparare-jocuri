import type { Game } from '../../types';
import ComparisonHeaderCell from './ComparisonHeaderCell';
import ComparisonRow from './ComparisonRow';
import { comparisonCriteria } from './comparisonCriteria';

interface ComparisonTableProps {
  games: Game[];
}

function ComparisonTable({ games }: ComparisonTableProps) {
  if (games.length < 2) return null;

  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "40px",
        border: "3px solid var(--arcade-border)",
        boxShadow: "6px 6px 0px var(--arcade-shadow)",
        position: "relative",
      }}
    >
      {/* Corner bolts */}
      {[
        { top: 6, left: 6 }, { top: 6, right: 6 },
        { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "var(--arcade-border)",
            border: "1px solid var(--arcade-shadow)",
            borderRadius: "50%",
            zIndex: 2,
            ...pos,
          }}
        />
      ))}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              background: "var(--arcade-panel)",
              borderBottom: "3px solid var(--arcade-border)",
            }}
          >
            <th
              style={{
                padding: "14px 16px",
                textAlign: "left",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.4rem",
                color: "var(--arcade-muted)",
                letterSpacing: "0.08em",
                borderRight: "2px solid var(--arcade-shadow)",
                whiteSpace: "nowrap",
              }}
            >
              ⚙ FEATURE
            </th>
            {games.map((game) => (
              <ComparisonHeaderCell key={game.id} title={game.title} />
            ))}
          </tr>
        </thead>
        <tbody>
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
