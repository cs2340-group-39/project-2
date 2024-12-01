import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    const access_token = session.accessToken;

    const accessTokenVerificationResponse = await fetch(
        "http://backend:8000/private/users/api/verify-access-token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ access_token }),
            cache: "no-store",
        }
    );

    if (!accessTokenVerificationResponse.ok) {
        console.log(
            `Unexpected error verifying access token: ${accessTokenVerificationResponse.statusText}`
        );
    }

    const accessTokenVerification = await accessTokenVerificationResponse.json();

    if (!accessTokenVerification.verified) {
        redirect("/users/api/logout");
    }

    const deleteResponse = await fetch("http://backend:8000/private/users/api/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        cache: "no-store",
    });

    if (!deleteResponse.ok) {
        console.error(`Unexpected error deleting user: ${deleteResponse.statusText}`);
    }

    return NextResponse.redirect(
        new URL("/users/api/logout", process.env.NEXT_PUBLIC_BASE_URL)
    );
}
