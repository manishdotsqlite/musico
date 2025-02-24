export type User = {
  id: number;
  username: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  playlists: Playlist[];
};

export type Song = {
  id: string;
  name: string;
  type: string;
  year: string;
  releaseDate: string | null;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: string;
  hasLyrics: boolean;
  lyricsId: string | null;
  url: string;
  copyright: string;
  album: {
    id: string;
    name: string;
    url: string;
  };
  artists: {
    primary: {
      id: string;
      name: string;
      role: string;
      image: {
        quality: string;
        url: string;
      }[];
      type: string;
      url: string;
    }[];
    featured: {
      id: string;
      name: string;
      role: string;
      image: {
        quality: string;
        url: string;
      }[];
      type: string;
      url: string;
    }[];
    all: {
      id: string;
      name: string;
      role: string;
      image: {
        quality: string;
        url: string;
      }[];
      type: string;
      url: string;
    }[];
  };
  image: {
    quality: string;
    url: string;
  }[];
  downloadUrl: {
    quality: string;
    url: string;
  }[];
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
  type: "playlist";
  image: {
    quality: string;
    url: string;
  }[];
  url: string;
  songCount: number;
  language: string;
  explicitContent: boolean;
};
