export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
