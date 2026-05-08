export interface SavedComparison {
  id: string;
  gameIds: number[];
  gameTitles: string[];
  savedAt?: string;
}

export interface StoredFavorites {
  gameIds: number[];
  comparisons: SavedComparison[];
}
