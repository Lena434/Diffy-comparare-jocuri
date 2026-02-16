import type { Game } from '../../_mock/games';

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
        <td
          key={game.id}
          style={{
            padding: "12px 14px",
            textAlign: "center",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.38rem",
            color: "var(--arcade-h)",
            letterSpacing: "0.03em",
            background: "var(--arcade-panel-dark)",
            lineHeight: 1.8,
          }}
        >
          {renderValue(game)}
        </td>
      ))}
    </tr>
  );
}

export default ComparisonRow;
