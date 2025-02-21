export type User = {
  id: number;
  username: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  playlists: Playlist[];
};

export type Song = {
  id: number;
  songId: string;
  name: string;
  type: string;
  year?: string | null;
  releaseDate?: string | null;
  duration?: number | null;
  label?: string | null;
  explicitContent: boolean;
  playCount?: number | null;
  language: string;
  hasLyrics: boolean;
  lyricsId?: string | null;
  url: string;
  copyright?: string | null;
  albumId?: number | null;
  album?: Album | null;
  artists: Artist[];
  images: { quality: string; url: string }[];
  downloadUrls: { quality: string; url: string }[];
  playlistId?: number | null;
  playlist?: Playlist | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Album = {
  id: number;
  albumId: string;
  name: string;
  description?: string | null;
  year?: string | null;
  type: string;
  playCount?: number | null;
  language: string;
  explicitContent: boolean;
  url: string;
  images: { quality: string; url: string }[];
  artists: Artist[];
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
};

export type Artist = {
  id: number;
  artistId: string;
  name: string;
  role: string;
  type: string;
  images: { quality: string; url: string }[];
  url: string;
  songs: Song[];
  albums: Album[];
  createdAt: Date;
  updatedAt: Date;
};

export type PersonalPlaylist = {
  id: number;
  title: string;
  description?: string | null;
  userId: number;
  user: User;
  songs: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type Playlist = {
  id: string;
  name: string;
  description: string | null;
  year: number | null;
  type: string;
  playCount: number | null;
  language: string;
  explicitContent: boolean;
  songCount: number | null;
  url: string;
  image: { quality: string; url: string }[];
  songs: Song[] | null;
  artists: Artist[] | null;
};
