import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Game } from '../types';

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
    setSearchQuery(urlSearchQuery);
    setGenreFilter(urlGenre || 'All');
    setPlatformFilter(urlPlatform || 'All');
    setSortBy(urlSort || 'title');
  }, [urlSearchQuery, urlGenre, urlPlatform, urlSort]);

  const sorters: Record<string, (a: Game, b: Game) => number> = {
    title: (a, b) => a.title.localeCompare(b.title),
    rating: (a, b) => b.rating - a.rating,
    year: (a, b) => b.releaseYear - a.releaseYear,
  };

  // Filter and sort games
  const allFilteredGames = useMemo(() => {
    const maxPrice = Number(urlMaxPrice);

    const filters: ((game: Game) => boolean)[] = [
      (game) => !searchQuery || game.title.toLowerCase().includes(searchQuery.toLowerCase()),
      (game) => genreFilter === 'All' || game.genre.includes(genreFilter),
      (game) => platformFilter === 'All' || game.platform.includes(platformFilter),
      (game) => !urlMode || game.gameMode.some((m) => m.toLowerCase().includes(urlMode.toLowerCase())),
      (game) => !urlMaxPrice || (!isNaN(maxPrice) && game.price !== undefined && game.price <= maxPrice),
    ];

    const filtered = filters.reduce((acc, fn) => acc.filter(fn), [...games]);

    filtered.sort(sorters[sortBy] ?? (() => 0));

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

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setGenreFilter('All');
    setPlatformFilter('All');
    setSortBy('title');
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo(0, 0);
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo(0, 0);
  }, [totalPages]);

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
