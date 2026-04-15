export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  USERS: {
    CHANGE_PASSWORD: "/api/users/changePassword",
    UPDATE_PROFILE: "/api/users/updateProfile",
  },
  GAMES: {
    GET_ALL: '/api/game',
    GET_BY_ID: (id: number) => `/api/game/${id}`,
    COMPARE: (ids: number[]) => `/api/game/compare?ids=${ids.join(',')}`,
    CREATE: '/api/game',
    UPDATE: (id: number) => `/api/game/${id}`,
    DELETE: (id: number) => `/api/game/${id}`,
  },
  GENRES: {
    GET_ALL: '/api/genre',
    CREATE: '/api/genre',
    DELETE: (id: number) => `/api/genre/${id}`,
  },
  PLATFORMS: {
    GET_ALL: '/api/platform',
    CREATE: '/api/platform',
    DELETE: (id: number) => `/api/platform/${id}`,
  },
  GAME_MODES: {
    GET_ALL: '/api/gamemode',
  },
  RATINGS: {
    GET_BY_GAME: (gameId: number) => `/api/rating/game/${gameId}`,
    CREATE: '/api/rating',
  },
  FAVORITES: {
    GET_ALL: '/api/favorite',
    ADD: (gameId: number) => `/api/favorite/${gameId}`,
    REMOVE: (gameId: number) => `/api/favorite/${gameId}`,
  },
  PROFILE: {
    GET: '/api/profile',
    UPDATE: '/api/profile',
  },
};
