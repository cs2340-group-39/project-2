import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.destroy();
    return NextResponse.redirect(new URL("/users/login", process.env.NEXT_PUBLIC_BASE_URL));
}
