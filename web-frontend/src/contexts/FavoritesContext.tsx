import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import type { SavedComparison } from "../types";
import { loadFavorites, saveFavorites } from "../services/favoritesService";

interface FavoritesContextValue {
  favoriteGameIds: number[];
  savedComparisons: SavedComparison[];
  toggleFavoriteGame: (id: number) => void;
  isFavoriteGame: (id: number) => boolean;
  saveComparison: (gameIds: number[]) => void;
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

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [favoriteGameIds, setFavoriteGameIds] = useState<number[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);

  // Load/reset when user changes
  useEffect(() => {
    if (currentUser) {
      const data = loadFavorites(currentUser.email);
      setFavoriteGameIds(data.gameIds);
      setSavedComparisons(data.comparisons);
    } else {
      setFavoriteGameIds([]);
      setSavedComparisons([]);
    }
  }, [currentUser]);

  function persist(gameIds: number[], comparisons: SavedComparison[]) {
    if (currentUser) {
      saveFavorites(currentUser.email, { gameIds, comparisons });
    }
  }

  function toggleFavoriteGame(id: number) {
    setFavoriteGameIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((gid) => gid !== id)
        : [...prev, id];
      persist(next, savedComparisons);
      return next;
    });
  }

  function isFavoriteGame(id: number) {
    return favoriteGameIds.includes(id);
  }

  function saveComparison(gameIds: number[]) {
    const newComparison: SavedComparison = {
      id: Date.now().toString(),
      gameIds,
    };
    setSavedComparisons((prev) => {
      const next = [...prev, newComparison];
      persist(favoriteGameIds, next);
      return next;
    });
  }

  function removeComparison(id: string) {
    setSavedComparisons((prev) => {
      const next = prev.filter((c) => c.id !== id);
      persist(favoriteGameIds, next);
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
