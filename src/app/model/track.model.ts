export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  album: Album;
  artists: Artist[];
  uri: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  images: Image[];
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
