import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const accessToken = requestUrl.searchParams.get("access_token");
  const refreshToken = requestUrl.searchParams.get("refresh_token");

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.accessToken = accessToken;
  session.refreshToken = refreshToken;
  session.accessTokenVerified = true;
  await session.save();

  return NextResponse.redirect(
    new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL)
  );
}
