import type { Game } from '../../types';

interface ComparisonCellProps {
  game: Game;
  renderValue: (game: Game) => React.ReactNode;
}

function ComparisonCell({ game, renderValue }: ComparisonCellProps) {
  return (
    <td
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
  );
}

export default ComparisonCell;
