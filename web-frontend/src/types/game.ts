export interface Game {
  id: number;
  title: string;
  genres: string[];
  platforms: string[];
  averageRating: number;
  releaseYear: number;
  gameModes: string[];
  imgs: { id: number; url: string; gameId: number }[];
  description: string;
  developer?: string;
  publisher?: string;
  price?: number;
}
