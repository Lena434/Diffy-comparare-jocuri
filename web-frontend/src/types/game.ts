export interface Game {
  id: number;
  title: string;
  genres: string[];
  platforms: string[];
  averageRating: number;
  ratingCount: number;
  releaseYear: number;
  gameModes: string[];
  imageUrl: string | null;
  description: string;
  developer?: string;
  publisher?: string;
  price?: number;
}
