import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    const response = await fetch("http://backend:8000/private/users/api/verify", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
        }),
        cache: "no-store",
    });

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

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    await session.save();

    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL));
}
