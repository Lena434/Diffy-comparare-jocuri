import { ProfilePanel } from "../../components/arcade/ProfilePanel";
import { getGamesByIds } from "../../services/gameService";

function ComparisonCard({ gameIds, onRemove }: { gameIds: number[]; onRemove: () => void }) {
  const games = getGamesByIds(gameIds);

  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.38rem",
          color: "var(--arcade-h)",
          letterSpacing: "0.04em",
          margin: 0,
        }}
      >
        ⚔ {games.map((g) => g!.title.toUpperCase()).join(" VS ")}
      </p>
      <button
        onClick={onRemove}
        className="bg-transparent border-2 border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:bg-[#dc2626] hover:[border-color:#f87171] hover:text-white transition-[background,border-color,color] duration-[80ms]"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.3rem",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        ✕ REMOVE
      </button>
    </div>
  );
}

interface Props {
  savedComparisons: { id: string; gameIds: number[] }[];
  onRemove: (id: string) => void;
}

export function ComparisonsSection({ savedComparisons, onRemove }: Props) {
  return (
    <ProfilePanel title="▸ SAVED COMPARISONS">
      {savedComparisons.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {savedComparisons.map((comp) => (
            <ComparisonCard
              key={comp.id}
              gameIds={comp.gameIds}
              onRemove={() => onRemove(comp.id)}
            />
          ))}
        </div>
      ) : (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.38rem", color: "var(--arcade-muted)" }}>
          NO SAVED COMPARISONS YET
        </p>
      )}
    </ProfilePanel>
  );
}
