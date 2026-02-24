import type { StoredFavorites } from '../types';

function getStorageKey(email: string): string {
  return `diffy-favs-${email.toLowerCase()}`;
}

export function loadFavorites(email: string): StoredFavorites {
  try {
    const raw = localStorage.getItem(getStorageKey(email));
    if (!raw) return { gameIds: [], comparisons: [] };
    const parsed = JSON.parse(raw);
    return {
      gameIds: parsed.gameIds || [],
      comparisons: parsed.comparisons || [],
    };
  } catch {
    return { gameIds: [], comparisons: [] };
  }
}

export function saveFavorites(email: string, data: StoredFavorites): void {
  localStorage.setItem(getStorageKey(email), JSON.stringify(data));
}
