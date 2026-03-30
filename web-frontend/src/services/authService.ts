import type { User } from '../types';

const USERS_KEY = 'diffy-users';
const CURRENT_USER_KEY = 'diffy-current-user';


export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loadCurrentUser(): User | null {
  try {
    const stored = sessionStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: User | null): void {
  if (user) {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }
}



