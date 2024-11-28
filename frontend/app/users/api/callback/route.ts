import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const accessToken = requestUrl.searchParams.get("access_token");
    const refreshToken = requestUrl.searchParams.get("refresh_token");

    return NextResponse.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
}
