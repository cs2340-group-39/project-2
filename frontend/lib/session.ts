import "server-only";

import { SessionOptions } from "iron-session";

export interface SessionData {
    accessToken: string | null;
    refreshToken: string | null;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD!,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
    },
};
