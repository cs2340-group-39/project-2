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

        const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

        const access_token = session.accessToken;

        const response = await fetch(
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

        if (!response.ok) {
            redirect("/users/api/logout");
        }

        return await response.json();
    }

    const data = await verifyTokenAction();

    if (!data.verified) {
        redirect("/users/api/logout");
    }

    return <>{children}</>;
}
