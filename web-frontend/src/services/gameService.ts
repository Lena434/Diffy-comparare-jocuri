import { mockGames } from '../_mock/games';
import type { Game } from '../types';

const GAMES_KEY = 'diffy-games';

export function getAllGames(): Game[] {
  try {
    const stored = localStorage.getItem(GAMES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(GAMES_KEY, JSON.stringify(mockGames));
    return mockGames;
  } catch {
    return mockGames;
  }
}

function saveGames(games: Game[]): void {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function getGameById(id: number): Game | undefined {
  return getAllGames().find(g => g.id === id);
}

export function getGamesByIds(ids: number[]): Game[] {
  const all = getAllGames();
  return ids
    .map(id => all.find(g => g.id === id))
    .filter((g): g is Game => g !== undefined);
}

export function getSimilarGames(game: Game, limit = 4): Game[] {
  return getAllGames()
    .filter(g =>
      g.id !== game.id &&
      g.genre.some(genre => game.genre.includes(genre))
    )
    .slice(0, limit);
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  getAllGames().forEach(g => g.genre.forEach(genre => genres.add(genre)));
  return Array.from(genres).sort();
}

export function getAllPlatforms(): string[] {
  const platforms = new Set<string>();
  getAllGames().forEach(g => g.platform.forEach(p => platforms.add(p)));
  return Array.from(platforms).sort();
}

export function updateGame(updated: Game): void {
  saveGames(getAllGames().map(g => g.id === updated.id ? updated : g));
}

export function deleteGame(id: number): void {
  saveGames(getAllGames().filter(g => g.id !== id));
}
