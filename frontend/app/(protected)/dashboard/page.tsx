"use client";

import { WrappedData } from "../actions";
import { DashboardWrappedSection } from "./dashboard-wrapped-section";

export default async function Page() {
  const carouselsData: WrappedData[] = [
    {
      username: "saada7553",
      topAlbums: ["Album 1", "Album 2", "Album 3"],
      topArtists: ["Artist 1", "Artist 2", "Artist 3"],
      topGenres: ["Genre 1", "Genre 2", "Genre 3"],
    },
    {
      username: "arjun7553",
      topAlbums: ["Album 1", "Album 2", "Album 3"],
      topArtists: ["Artist 1", "Artist 2", "Artist 3"],
      topGenres: ["Genre 1", "Genre 2", "Genre 3"],
    },
  ];

  return <DashboardWrappedSection carouselsData={carouselsData} />;
}
