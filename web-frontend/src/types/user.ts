export type UserRole = 'user' | 'admin';

export interface PcSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  os: string;
  storage: string;
}

export interface UserProfile {
  platform?: 'playstation' | 'xbox' | 'pc';
  platformVersion?: string;
  pcSpecs?: PcSpecs;
}

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile?: UserProfile;
}
