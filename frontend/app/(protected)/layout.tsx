import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function verifyTokenAction() {
    "use server";

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

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
      redirect("/users/api/logout");
    }

    const accessTokenVerification =
      await accessTokenVerificationResponse.json();

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
      redirect("/users/link-with-spotify");
    }

    const spotifyLinkVerification =
      await spotifyLinkVerificationResponse.json();

    session.accessTokenVerified = accessTokenVerification.verified;
    session.isLinkedWithSpotify = spotifyLinkVerification.verified;
    session.save();

    return {
      verified:
        accessTokenVerification.verified &&
        spotifyLinkVerification.verified,
    };
  }

  const data = await verifyTokenAction();

  if (!data.verified) {
    redirect("/users/api/logout");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
