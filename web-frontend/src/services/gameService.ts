import { useCallback } from 'react';
import { useAxios } from '../axios/context';
import { API_ROUTES } from '../axios/apiRoutes';
import type { Game } from '../types';

export interface GenreMeta { id: number; name: string; }
export interface PlatformMeta { id: number; name: string; }
export interface GameModeMeta { id: number; name: string; }

export interface GameWritePayload {
  title: string;
  description: string;
  developer: string;
  publisher: string;
  releaseYear: number;
  price: number;
  imageUrl?: string;
  genreIds: number[];
  platformIds: number[];
  gameModeIds: number[];
}

export function useGameService() {
  const { api } = useAxios();

  const getAll = useCallback(
    () => api.get<Game[]>(API_ROUTES.GAMES.GET_ALL),
    [api],
  );

  const getById = useCallback(
    (id: number) => api.get<Game>(API_ROUTES.GAMES.GET_BY_ID(id)),
    [api],
  );

  const getByIds = useCallback(
    (ids: number[]) =>
      ids.length > 0
        ? api.get<Game[]>(API_ROUTES.GAMES.COMPARE(ids))
        : Promise.resolve<Game[]>([]),
    [api],
  );

  const getSimilar = useCallback(
    (game: Game, limit = 4) =>
      api.get<Game[]>(API_ROUTES.GAMES.GET_ALL).then((all) =>
        all
          .filter(
            (g) =>
              g.id !== game.id &&
              g.genres.some((genre) => game.genres.includes(genre)),
          )
          .slice(0, limit),
      ),
    [api],
  );

  const getGenres = useCallback(
    () => api.get<GenreMeta[]>(API_ROUTES.GENRES.GET_ALL),
    [api],
  );

  const getPlatforms = useCallback(
    () => api.get<PlatformMeta[]>(API_ROUTES.PLATFORMS.GET_ALL),
    [api],
  );

  const getGameModes = useCallback(
    () => api.get<GameModeMeta[]>(API_ROUTES.GAME_MODES.GET_ALL),
    [api],
  );

  const create = useCallback(
    (data: GameWritePayload) => api.post(API_ROUTES.GAMES.CREATE, data),
    [api],
  );

  const update = useCallback(
    (id: number, data: GameWritePayload) =>
      api.put(API_ROUTES.GAMES.UPDATE(id), data),
    [api],
  );

  const remove = useCallback(
    (id: number) => api.delete(API_ROUTES.GAMES.DELETE(id)),
    [api],
  );

  const submitRating = useCallback(
    (gameId: number, score: number) =>
      api.post(API_ROUTES.RATINGS.CREATE, { gameId, score }),
    [api],
  );

  return {
    getAll,
    getById,
    getByIds,
    getSimilar,
    getGenres,
    getPlatforms,
    getGameModes,
    create,
    update,
    remove,
    submitRating
  };
}
