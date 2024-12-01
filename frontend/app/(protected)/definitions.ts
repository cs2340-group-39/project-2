export interface WrappedData {
  username: string;
  artists: Artist[];
  tracks: Track[];
}

export interface Artist {
  name: string;
  photo_url: string;
}

export interface Track {
  track_name: string;
  track_cover_url: string;
  artist_name: string;
  track_type: string;
}

export interface WrappedSectionProps {
  carouselsData: WrappedData[];
}
