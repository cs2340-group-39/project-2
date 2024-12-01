import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    async function verifyTokenAction() {
        "use server";

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

        const spotifyLinkVerificationResponse = await fetch(
            "http://backend:8000/private/users/api/verify-link-with-spotify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token }),
                cache: "no-store",
            }
        );

        if (!spotifyLinkVerificationResponse.ok) {
            console.log(
                `Unexpected error verifying spotify link: ${spotifyLinkVerificationResponse.statusText}`
            );
        }

        const spotifyLinkVerification = await spotifyLinkVerificationResponse.json();

        // session.accessTokenVerified = accessTokenVerification.verified;
        // session.isLinkedWithSpotify = spotifyLinkVerification.verified;
        // session.save();

        return {
            accessTokenVerified: accessTokenVerification.verified,
            spotifyLinkVerified: spotifyLinkVerification.verified,
        };
    }

    const data = await verifyTokenAction();

    if (!data.accessTokenVerified) {
        redirect("/users/api/logout");
    }

    if (!data.spotifyLinkVerified) {
        redirect("/users/link-with-spotify");
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
