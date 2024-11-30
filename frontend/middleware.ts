"use server";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "./lib/session";

const publicRoutes: string[] = ["/users/login", "/users/signup"];
const protectedRoutes: string[] = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  // Verify access token
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

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
