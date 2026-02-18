interface ComparisonHeaderCellProps {
  title: string;
}

function ComparisonHeaderCell({ title }: ComparisonHeaderCellProps) {
  return (
    <th
      style={{
        padding: "14px 16px",
        textAlign: "center",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        color: "var(--arcade-accent)",
        textShadow: "1px 1px 0px var(--arcade-accent-dark)",
        letterSpacing: "0.05em",
        borderRight: "2px solid var(--arcade-shadow)",
      }}
    >
      {title}
    </th>
  );
}

export default ComparisonHeaderCell;
