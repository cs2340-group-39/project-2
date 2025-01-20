"use server";

import { redirect } from "next/navigation";

export async function authenticateWithSpotifyAction() {
  const response = await fetch(
    "http://backend:8000/private/users/api/authenticate-with-spotify",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return {
      errors: {
        ambiguous: ["There was an unexpected error."],
      },
    };
  }

  const data = await response.json();

  return redirect(data.spotify_auth_url);
}
