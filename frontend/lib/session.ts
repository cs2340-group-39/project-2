import "server-only";

import { SessionOptions } from "iron-session";

export interface SessionData {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenVerified: boolean;
    isLinkedWithSpotify: boolean;
}

export const defaultSession: SessionData = {
    accessToken: null,
    refreshToken: null,
    accessTokenVerified: false,
    isLinkedWithSpotify: false,
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
