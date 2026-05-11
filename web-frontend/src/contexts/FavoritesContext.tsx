import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useAxios } from "../axios/context";
import { API_ROUTES } from "../axios/apiRoutes";
import type { SavedComparison } from "../types";
import type { Game } from "../types";

interface FavoriteItem {
  gameId: number;
  title: string;
  imageUrl?: string;
  addedAt: string;
}

interface FavoritesContextValue {
  favoriteGameIds: number[];
  savedComparisons: SavedComparison[];
  toggleFavoriteGame: (id: number) => void;
  isFavoriteGame: (id: number) => boolean;
  saveComparison: (games: Game[]) => Promise<void>;
  removeComparison: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteGameIds: [],
  savedComparisons: [],
  toggleFavoriteGame: () => {},
  isFavoriteGame: () => false,
  saveComparison: async () => {},
  removeComparison: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const { api } = useAxios();
  const [favoriteGameIds, setFavoriteGameIds] = useState<number[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);

  useEffect(() => {
    if (currentUser) {
      api
        .get<FavoriteItem[]>(API_ROUTES.FAVORITES.GET_ALL)
        .then((items) => setFavoriteGameIds(items.map((f) => f.gameId)))
        .catch(() => setFavoriteGameIds([]));

      api
        .get<SavedComparison[]>(API_ROUTES.COMPARISONS.GET_ALL)
        .then(setSavedComparisons)
        .catch(() => setSavedComparisons([]));
    } else {
      setFavoriteGameIds([]);
      setSavedComparisons([]);
    }
  }, [currentUser, api]);

  function toggleFavoriteGame(id: number) {
    const isFav = favoriteGameIds.includes(id);
    if (isFav) {
      setFavoriteGameIds((prev) => prev.filter((gid) => gid !== id));
      api.delete(API_ROUTES.FAVORITES.REMOVE(id)).catch(() => {
        setFavoriteGameIds((prev) => [...prev, id]);
      });
    } else {
      setFavoriteGameIds((prev) => [...prev, id]);
      api.post(API_ROUTES.FAVORITES.ADD(id)).catch(() => {
        setFavoriteGameIds((prev) => prev.filter((gid) => gid !== id));
      });
    }
  }

  function isFavoriteGame(id: number) {
    return favoriteGameIds.includes(id);
  }

  async function saveComparison(games: Game[]) {
    const dto = {
      gameIds: games.map((g) => g.id),
      gameTitles: games.map((g) => g.title),
    };
    const created = await api.post<SavedComparison>(API_ROUTES.COMPARISONS.CREATE, dto);
    setSavedComparisons((prev) => [created, ...prev]);
  }

  function removeComparison(id: number) {
    setSavedComparisons((prev) => prev.filter((c) => c.id !== id));
    api.delete(API_ROUTES.COMPARISONS.DELETE(id)).catch(() => {
      api
        .get<SavedComparison[]>(API_ROUTES.COMPARISONS.GET_ALL)
        .then(setSavedComparisons)
        .catch(() => {});
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteGameIds,
        savedComparisons,
        toggleFavoriteGame,
        isFavoriteGame,
        saveComparison,
        removeComparison,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}