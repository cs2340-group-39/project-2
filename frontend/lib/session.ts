import "server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { SessionOptions, getIronSession } from "iron-session";

export interface SessionData {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenVerified: boolean;
}

export const defaultSession: SessionData = {
  accessToken: null,
  refreshToken: null,
  accessTokenVerified: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

const protectedRoutes: string[] = ["/dashboard"];

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const accessToken = session.accessToken;

  const response = await fetch(
    "http://backend:8000/private/users/api/verify-access-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response.statusText);
  }

  const data = await response.json();

  if (isProtectedRoute && !data.verified) {
    session.destroy();
    return NextResponse.redirect(
      new URL("/users/login", process.env.NEXT_PUBLIC_BASE_URL)
    );
  } else {
    return NextResponse.next();
  }
}
