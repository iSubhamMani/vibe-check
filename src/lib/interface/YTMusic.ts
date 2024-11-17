export interface YoutubeMusic {
  type: "SONG";
  name: string;
  videoId: string;
  artist: {
    artistId: string | null;
    name: string;
  };
  album: {
    name: string;
    albumId: string;
  } | null;
  duration: number | null;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
}
