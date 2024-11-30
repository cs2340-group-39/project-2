import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  // If the session doesn't exist, then we need to just redirect to the login page

  const response = await fetch(
    "http://backend:8000/private/users/api/link-user-with-spotify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        code,
      }),
      cache: "no-store",
    }
  );

  console.log(response.statusText);

  if (!response.ok) {
    return NextResponse.json({
      error: "There was an error.",
    });
  }

  const data = await response.json();

  return NextResponse.redirect(
    new URL(
      `/users/api/callback?access_token=${data.access_token}&refresh_token=${data.refresh_token}`,
      process.env.NEXT_PUBLIC_BASE_URL
    )
  );
}
