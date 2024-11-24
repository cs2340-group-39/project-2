import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { getUserFromBackendAction } from "./actions";

import { Button } from "@/components/ui/button"

import Navbar from "@/components/navbar/page";
import ShapesBackground from "@/components/backgrounds/ShapesBackground/ShapesBackground"; // Assuming this is the circles background component
import Link from "next/link";
import { UsersLayout } from "@/components/layouts/users-layout";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/users/login");
    }

    const backendUser = await getUserFromBackendAction(
        (
            await supabase.auth.getSession()
        ).data.session?.access_token!
    );

    return (
        <UsersLayout>
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome, {user?.email || "User"}!
                </h1>
                <div className="flex flex-col items-center gap-4">
                    <Link href="/settings">
                        <Button variant="customGreen" size="xl">
                            Settings
                        </Button>
                    </Link>
                    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto bg-gray-100 text-gray-800">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto bg-gray-100 text-gray-800">
                        {JSON.stringify(backendUser, null, 2)}
                    </pre>
                </div>
            </main>
        </UsersLayout>
    );
}
