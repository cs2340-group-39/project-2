export interface WrappedData {
  username: string;
  topArtists: string[];
  topAlbums: string[];
  topGenres: string[];
}

export interface WrappedSectionProps {
  carouselsData: WrappedData[];
}
