"server-only";

import { jwtVerify } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface CookieConfig {
  name: string;
  duration: number;
  options: Partial<ResponseCookie>;
}

const _cookie: CookieConfig = {
  name: "session",
  duration: 24 * 60 * 60 * 1000,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
};

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

export async function createSession(session: string) {
  const expires = new Date(Date.now() + _cookie.duration);
  cookies().set(_cookie.name, session, {
    ..._cookie.options,
    expires,
  });
}

export async function verifySession() {
  const cookie = cookies().get(_cookie.name)?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (!session?.sub) {
      return { isAuthenticated: false };
    }

    return { isAuthenticated: true, uuid: session.uuid };
  } else {
    return { isAuthenticated: false };
  }
}

export async function deleteSession() {
  cookies().delete(_cookie.name);
}
