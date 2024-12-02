import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SessionData, sessionOptions } from "@/lib/session";

export default async function UsersLayout({
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

        return await response.json();
    }

    const data = await verifyTokenAction();

    if (data.verified) {
        redirect("/dashboard");
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center px-4">
            <main className="mx-auto max-w-sm">{children}</main>
        </div>
    );
}
