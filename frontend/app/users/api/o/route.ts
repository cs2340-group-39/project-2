import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  return NextResponse.redirect(
    new URL(
      "/users/api/callback?access_token=&refresh_token=",
      process.env.NEXT_PUBLIC_BASE_URL
    )
  );
}
