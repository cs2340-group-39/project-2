import { NextResponse } from "next/server";

import { decodeJwt } from "jose";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const accessToken = requestUrl.searchParams.get("access_token");
  const refreshToken = requestUrl.searchParams.get("refresh_token");

  return NextResponse.json({
    access: decodeJwt(accessToken!),
    refresh: decodeJwt(refreshToken!),
  });
}
