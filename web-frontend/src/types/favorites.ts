export interface SavedComparison {
  id: number;
  gameIds: number[];
  gameTitles: string[];
  savedAt?: string;
}

export interface StoredFavorites {
  gameIds: number[];
  comparisons: SavedComparison[];
}
