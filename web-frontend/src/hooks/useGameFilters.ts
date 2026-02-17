import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Game } from '../_mock/games';

export function useGameFilters(games: Game[], gamesPerPage: number = 8) {
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';
  const urlGenre = searchParams.get('genre') || '';
  const urlPlatform = searchParams.get('platform') || '';
  const urlSort = searchParams.get('sort') || '';
  const urlMode = searchParams.get('mode') || '';
  const urlMaxPrice = searchParams.get('maxPrice') || '';

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [genreFilter, setGenreFilter] = useState(urlGenre || 'All');
  const [platformFilter, setPlatformFilter] = useState(urlPlatform || 'All');
  const [sortBy, setSortBy] = useState(urlSort || 'title');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state from URL params when they change
  useEffect(() => {
    if (urlSearchQuery) setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    if (urlGenre) setGenreFilter(urlGenre);
  }, [urlGenre]);

  useEffect(() => {
    if (urlPlatform) setPlatformFilter(urlPlatform);
  }, [urlPlatform]);

  useEffect(() => {
    if (urlSort) setSortBy(urlSort);
  }, [urlSort]);

  // Filter and sort games
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

    // Game mode filter (from URL)
    if (urlMode) {
      filtered = filtered.filter((game) =>
        game.gameMode.some((m) => m.toLowerCase().includes(urlMode.toLowerCase()))
      );
    }

    // Max price filter (from URL)
    if (urlMaxPrice) {
      const max = Number(urlMaxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((game) =>
          game.price !== undefined && game.price <= max
        );
      }
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
  }, [games, searchQuery, genreFilter, platformFilter, sortBy, urlMode, urlMaxPrice]);

  // Total pages
  const totalPages = Math.ceil(allFilteredGames.length / gamesPerPage);

  // Current page games
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    return allFilteredGames.slice(startIndex, endIndex);
  }, [allFilteredGames, currentPage, gamesPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, genreFilter, platformFilter, sortBy, urlMode, urlMaxPrice]);

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
