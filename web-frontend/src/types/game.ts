export interface Game {
  id: number;
  title: string;
  genre: string[];
  platform: string[];
  rating: number;
  releaseYear: number;
  gameMode: string[];
  image: string;
  description: string;
  developer?: string;
  publisher?: string;
  price?: number;
}
