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
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function findUserByCredentials(email: string, password: string): User | undefined {
  const users = getUsers();
  return users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}

export function isEmailTaken(email: string, excludeIndex?: number): boolean {
  const users = getUsers();
  return users.some(
    (u, i) => (excludeIndex === undefined || i !== excludeIndex) &&
      u.email.toLowerCase() === email.toLowerCase()
  );
}
