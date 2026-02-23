import { mockGames } from '../_mock/games';
import type { Game } from '../types';

export function getAllGames(): Game[] {
  return mockGames;
}

export function getGameById(id: number): Game | undefined {
  return mockGames.find(g => g.id === id);
}

export function getGamesByIds(ids: number[]): Game[] {
  return ids
    .map(id => mockGames.find(g => g.id === id))
    .filter((g): g is Game => g !== undefined);
}

export function getSimilarGames(game: Game, limit = 4): Game[] {
  return mockGames
    .filter(g =>
      g.id !== game.id &&
      g.genre.some(genre => game.genre.includes(genre))
    )
    .slice(0, limit);
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  mockGames.forEach(g => g.genre.forEach(genre => genres.add(genre)));
  return Array.from(genres).sort();
}

export function getAllPlatforms(): string[] {
  const platforms = new Set<string>();
  mockGames.forEach(g => g.platform.forEach(p => platforms.add(p)));
  return Array.from(platforms).sort();
}
