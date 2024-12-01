import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { WrappedData } from "../actions";
import { DashboardWrappedSection } from "./dashboard-wrapped-section";

export default async function Page() {
  // const carouselsData: WrappedData[] = [
  //   {
  //     username: "saada7553",
  //     topAlbums: ["Album 1", "Album 2", "Album 3"],
  //     topArtists: ["Artist 1", "Artist 2", "Artist 3"],
  //     topGenres: ["Genre 1", "Genre 2", "Genre 3"],
  //   },
  //   {
  //     username: "arjun7553",
  //     topAlbums: ["Album 1", "Album 2", "Album 3"],
  //     topArtists: ["Artist 1", "Artist 2", "Artist 3"],
  //     topGenres: ["Genre 1", "Genre 2", "Genre 3"],
  //   },
  // ];

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const response = await fetch(
    "http://backend:8000/private/wrapped/api/get-wrapped-data-for-current-user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  console.log(session.accessToken);
  /*
  console.log("get wrapped response json");
  console.log(await response.json());
  */

  const carouselsData: WrappedData[] = (await response.json()).items;

  return <DashboardWrappedSection carouselsData={carouselsData} />;
}
