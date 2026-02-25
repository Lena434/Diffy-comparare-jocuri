import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { ROUTES } from "../routes/routes";
import { getGamesByIds } from "../services/gameService";
import GameCard from "../components/game/GameCard";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import PixelLoader from "../components/ui/PixelLoader";
import { useSimulatedLoading } from "../hooks/useSimulatedLoading";

function FavoritesPage() {
  const navigate = useNavigate();
  const loading = useSimulatedLoading(400);
  const { favoriteGameIds, savedComparisons, removeComparison } = useFavorites();
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const favoriteGames = getGamesByIds(favoriteGameIds);

  if (loading) return <PixelLoader message="LOADING FAVORITES..." />;

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px", marginTop: "24px" }}>
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(1rem, 3vw, 1.8rem)",
              color: "var(--arcade-h)",
              textShadow: "3px 3px 0px var(--arcade-h-shadow), 6px 6px 0px #000",
              letterSpacing: "0.1em",
              margin: "0 0 12px",
            }}
          >
            ⭐ FAVORITES
          </h1>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.4rem",
              color: "var(--arcade-muted)",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            YOUR SAVED GAMES AND COMPARISONS
          </p>
        </div>

        {/* ── FAVORITE GAMES ── */}
        <SectionTitle label="▸ FAVORITE GAMES" count={favoriteGames.length} />

        {favoriteGames.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
              gap: "20px",
              marginBottom: "48px",
            }}
          >
            {favoriteGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <EmptyState message="NO FAVORITE GAMES YET" hint="ADD GAMES FROM THE BROWSE PAGE" />
        )}

        {/* ── SAVED COMPARISONS ── */}
        <SectionTitle label="▸ SAVED COMPARISONS" count={savedComparisons.length} />

        {savedComparisons.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
            {savedComparisons.map((comp) => (
              <ComparisonCard
                key={comp.id}
                gameIds={comp.gameIds}
                onView={() => navigate(ROUTES.COMPARE)}
                onRemove={() => setConfirmRemoveId(comp.id)}
              />
            ))}
            <ConfirmDialog
              open={confirmRemoveId !== null}
              title="REMOVE COMPARISON?"
              message="THIS COMPARISON WILL BE PERMANENTLY DELETED FROM YOUR FAVORITES."
              confirmLabel="DELETE"
              cancelLabel="CANCEL"
              onConfirm={() => {
                if (confirmRemoveId) removeComparison(confirmRemoveId);
                setConfirmRemoveId(null);
              }}
              onCancel={() => setConfirmRemoveId(null)}
            />
          </div>
        ) : (
          <EmptyState message="NO SAVED COMPARISONS YET" hint="COMPARE GAMES AND SAVE THEM HERE" />
        )}
      </div>
    </div>
  );
}

/* ── Helpers ── */

function SectionTitle({ label, count }: { label: string; count: number }) {
  return (
    <div
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.6rem",
        color: "var(--arcade-h)",
        textShadow: "2px 2px 0px var(--arcade-h-shadow)",
        letterSpacing: "0.08em",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontSize: "0.4rem",
          color: "var(--arcade-accent)",
          background: "var(--arcade-panel)",
          border: "2px solid var(--arcade-border)",
          padding: "3px 8px",
        }}
      >
        {count}
      </span>
    </div>
  );
}

function EmptyState({ message, hint }: { message: string; hint: string }) {
  return (
    <div
      style={{
        padding: "32px 24px",
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        textAlign: "center",
        marginBottom: "48px",
      }}
    >
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.5rem",
          color: "var(--arcade-muted)",
          letterSpacing: "0.06em",
          marginBottom: "8px",
        }}
      >
        {message}
      </p>
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.35rem",
          color: "var(--arcade-shadow-mid)",
          letterSpacing: "0.04em",
        }}
      >
        {hint}
      </p>
    </div>
  );
}

function ComparisonCard({
  gameIds,
  onView,
  onRemove,
}: {
  gameIds: number[];
  onView: () => void;
  onRemove: () => void;
}) {
  const games = getGamesByIds(gameIds);

  return (
    <div
      style={{
        background: "var(--arcade-panel)",
        border: "3px solid var(--arcade-border)",
        boxShadow: "4px 4px 0px var(--arcade-shadow)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: "200px" }}>
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.4rem",
            color: "var(--arcade-h)",
            letterSpacing: "0.05em",
            marginBottom: "6px",
          }}
        >
          ⚔ {games.map((g) => g.title.toUpperCase()).join(" VS ")}
        </p>
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.3rem",
            color: "var(--arcade-muted)",
          }}
        >
          {games.length} GAMES
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onView}
          className="[background:var(--arcade-cta)] border-2 border-solid [border-color:var(--arcade-text)] text-white [box-shadow:3px_3px_0px_var(--arcade-shadow)] hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] transition-[background,border-color] duration-[80ms]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            padding: "8px 12px",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ▶ VIEW
        </button>
        <button
          onClick={onRemove}
          className="bg-transparent border-2 border-solid [border-color:var(--arcade-shadow)] [color:var(--arcade-muted)] hover:bg-[#dc2626] hover:[border-color:#f87171] hover:text-white hover:[box-shadow:3px_3px_0px_var(--arcade-shadow)] transition-[background,border-color,color,box-shadow] duration-[80ms]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            padding: "8px 12px",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ✕ REMOVE
        </button>
      </div>
    </div>
  );
}

export default FavoritesPage;
