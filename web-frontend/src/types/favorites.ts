export interface SavedComparison {
  id: string;
  gameIds: number[];
}

export interface StoredFavorites {
  gameIds: number[];
  comparisons: SavedComparison[];
}
