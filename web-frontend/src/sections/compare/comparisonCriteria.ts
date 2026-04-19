import type { Game } from '../../types';

export const comparisonCriteria = [
  {
    label: 'Rating',
    renderValue: (game: Game) => `⭐ ${game.averageRating}`,
  },
  {
    label: 'Genre',
    renderValue: (game: Game) => game.genres.join(', '),
  },
  {
    label: 'Platform',
    renderValue: (game: Game) => game.platforms.join(', '),
  },
  {
    label: 'Game Mode',
    renderValue: (game: Game) => game.gameModes.join(', '),
  },
  {
    label: 'Release Year',
    renderValue: (game: Game) => game.releaseYear,
  },
  {
    label: 'Description',
    renderValue: (game: Game) => game.description,
  },
];
