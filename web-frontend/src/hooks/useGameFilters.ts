import { useState, useMemo } from 'react';
import type { Game } from '../_mock/games';

export function useGameFilters(games: Game[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const filteredGames = useMemo(() => {
    let filtered = [...games];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (genreFilter !== 'All') {
      filtered = filtered.filter((game) => game.genre.includes(genreFilter));
    }

    // Platform filter
    if (platformFilter !== 'All') {
      filtered = filtered.filter((game) => game.platform.includes(platformFilter));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'year') {
        return b.releaseYear - a.releaseYear;
      }
      return 0;
    });

    return filtered;
  }, [games, searchQuery, genreFilter, platformFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setGenreFilter('All');
    setPlatformFilter('All');
  };

  return {
    setSearchQuery,
    setGenreFilter,
    setPlatformFilter,
    setSortBy,
    filteredGames,
    clearFilters,
  };
}