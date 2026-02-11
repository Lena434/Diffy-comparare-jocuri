import type { Game } from '../../_mock/games';

export const comparisonCriteria = [
  {
    label: 'Rating',
    renderValue: (game: Game) => `⭐ ${game.rating}`,
  },
  {
    label: 'Genre',
    renderValue: (game: Game) => game.genre.join(', '),
  },
  {
    label: 'Platform',
    renderValue: (game: Game) => game.platform.join(', '),
  },
  {
    label: 'Game Mode',
    renderValue: (game: Game) => game.gameMode.join(', '),
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
