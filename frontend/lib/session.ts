"server-only";

import { jwtVerify } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

interface CookieConfig {
  name: string;
  duration: number;
  options: Partial<ResponseCookie>;
}

const COOKIE: CookieConfig = {
  name: "session",
  duration: 24 * 60 * 60 * 1000,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function encrypt() {}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(accessToken: string) {
  const expires = new Date(Date.now() + COOKIE.duration);
  cookies().set(COOKIE.name, accessToken, {
    ...COOKIE.options,
    expires,
  });
}

export async function verifySession() {
  const cookie = cookies().get(COOKIE.name)?.value;

  if (cookie) {
    const accessToken = await decrypt(cookie);

    if (!accessToken?.sub) {
      return { isAuthenticated: false };
    }

    return { isAuthenticated: true, uuid: accessToken.uuid };
  } else {
    return { isAuthenticated: false };
  }
}

export async function deleteSession() {
  cookies().delete(COOKIE.name);
}
