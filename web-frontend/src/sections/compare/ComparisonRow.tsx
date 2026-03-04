import type { Game } from '../../types';
import ComparisonCell from './ComparisonCell';

interface ComparisonRowProps {
  label: string;
  games: Game[];
  renderValue: (game: Game) => React.ReactNode;
}

function ComparisonRow({ label, games, renderValue }: ComparisonRowProps) {
  return (
    <tr
      style={{
        borderTop: "2px solid var(--arcade-shadow)",
      }}
    >
      <td
        style={{
          padding: "12px 14px",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-text)",
          letterSpacing: "0.05em",
          background: "var(--arcade-panel)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </td>
      {games.map((game) => (
        <ComparisonCell key={game.id} game={game} renderValue={renderValue} />
      ))}
    </tr>
  );
}

export default ComparisonRow;
