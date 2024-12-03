import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.accessToken) {
        return NextResponse.redirect(
            new URL("/users/login", process.env.NEXT_PUBLIC_BASE_URL)
        );
    }

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

    let accessToken: string;
    let refreshToken: string;
    try {
        const data = await response.json();
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
    } catch {
        return NextResponse.redirect(
            new URL("/users/signup", process.env.NEXT_PUBLIC_BASE_URL)
        );
    }

    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    await session.save();

    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL));
}
