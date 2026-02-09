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
}

export const mockGames: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    genre: ["RPG", "Action"],
    platform: ["PC", "PlayStation", "Xbox"],
    rating: 4.2,
    releaseYear: 2020,
    gameMode: ["Single-player", "Online"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    description: "Open-world action RPG set in Night City"
  },
  {
    id: 2,
    title: "Stardew Valley",
    genre: ["Simulation", "RPG"],
    platform: ["PC", "Switch", "Mobile"],
    rating: 4.9,
    releaseYear: 2016,
    gameMode: ["Single-player", "Co-op"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    description: "Farming simulation with RPG elements"
  },
  {
    id: 3,
    title: "Counter-Strike 2",
    genre: ["FPS", "Competitive"],
    platform: ["PC"],
    rating: 4.5,
    releaseYear: 2023,
    gameMode: ["Multiplayer"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    description: "Tactical first-person shooter"
  },
  {
    id: 4,
    title: "Hollow Knight",
    genre: ["Metroidvania", "Platformer"],
    platform: ["PC", "Switch"],
    rating: 4.8,
    releaseYear: 2017,
    gameMode: ["Single-player"],
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    description: "Hand-drawn action-adventure"
  }
];