import { ProfilePanel } from "../../components/arcade/ProfilePanel";
import GameCard from "../../components/game/GameCard";
import type { Game } from "../../types";

interface Props {
  games: Game[];
}

export function FavoritesSection({ games }: Props) {
  return (
    <ProfilePanel title="▸ MY FAVORITE GAMES">
      {games.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
            gap: "16px",
          }}
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.38rem", color: "var(--arcade-muted)" }}>
          NO FAVORITE GAMES YET
        </p>
      )}
    </ProfilePanel>
  );
}
