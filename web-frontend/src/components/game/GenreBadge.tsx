interface GenreBadgeProps {
  genre: string;
  size?: "sm" | "md";
}

function GenreBadge({ genre, size = "sm" }: GenreBadgeProps) {
  return (
    <span
      style={{
        background: "rgba(139,92,246,0.15)",
        border: "2px solid var(--arcade-shadow)",
        padding: size === "sm" ? "3px 7px" : "6px 10px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: size === "sm" ? "0.35rem" : "0.4rem",
        color: size === "sm" ? "var(--arcade-text)" : "var(--arcade-accent)",
        letterSpacing: "0.03em",
      }}
    >
      {genre}
    </span>
  );
}

export default GenreBadge;
