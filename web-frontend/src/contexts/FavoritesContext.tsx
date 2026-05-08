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
  saveComparison: (games: Game[]) => void;
  removeComparison: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteGameIds: [],
  savedComparisons: [],
  toggleFavoriteGame: () => {},
  isFavoriteGame: () => false,
  saveComparison: () => {},
  removeComparison: () => {},
});

function comparisonsKey(userId: number) {
  return `diffy-comparisons-${userId}`;
}

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

      try {
        const raw = localStorage.getItem(comparisonsKey(currentUser.id));
        setSavedComparisons(raw ? JSON.parse(raw) : []);
      } catch {
        setSavedComparisons([]);
      }
    } else {
      setFavoriteGameIds([]);
      setSavedComparisons([]);
    }
  }, [currentUser, api]);

  function persistComparisons(comparisons: SavedComparison[]) {
    if (currentUser) {
      localStorage.setItem(
        comparisonsKey(currentUser.id),
        JSON.stringify(comparisons),
      );
    }
  }

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

  function saveComparison(games: Game[]) {
    const newComparison: SavedComparison = {
      id: Date.now().toString(),
      gameIds: games.map((g) => g.id),
      gameTitles: games.map((g) => g.title),
    };
    setSavedComparisons((prev) => {
      const next = [...prev, newComparison];
      persistComparisons(next);
      return next;
    });
  }

  function removeComparison(id: string) {
    setSavedComparisons((prev) => {
      const next = prev.filter((c) => c.id !== id);
      persistComparisons(next);
      return next;
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
