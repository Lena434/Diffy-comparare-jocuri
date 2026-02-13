import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Game } from '../_mock/games';

export function useGameFilters(games: Game[], gamesPerPage: number = 8) {
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [genreFilter, setGenreFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);

  // Update search when URL changes
  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  // Filter and sort games (TOATE jocurile filtrate, înainte de paginare)
  const allFilteredGames = useMemo(() => {
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

  // Calculează numărul total de pagini
  const totalPages = Math.ceil(allFilteredGames.length / gamesPerPage);

  // Jocurile pentru pagina curentă
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return allFilteredGames.slice(startIndex, endIndex);
  }, [allFilteredGames, currentPage, gamesPerPage]);

  // Reset la pagina 1 când se schimbă filtrele
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, genreFilter, platformFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setGenreFilter('All');
    setPlatformFilter('All');
    setSortBy('title');
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    searchQuery,
    setSearchQuery,
    genreFilter,
    setGenreFilter,
    platformFilter,
    setPlatformFilter,
    sortBy,
    setSortBy,
    filteredGames: paginatedGames,
    totalFilteredGames: allFilteredGames.length,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    clearFilters,
  };
}