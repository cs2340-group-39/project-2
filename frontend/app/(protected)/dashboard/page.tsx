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
        return redirect("/users/signin");
    }

    const backendUser = await getUserFromBackendAction(
        (
            await supabase.auth.getSession()
        ).data.session?.access_token!
    );

    return (
        <UsersLayout>
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
                <h1 className="text-3xl font-bold mb-8 py-16">
                    Welcome, {user?.email || "User"}!
                </h1>
                <div className="flex flex-row items-center gap-8">
                    <Link href="/settings">
                        <Button variant="customGreen" size="xl" className="text-2xl font-bold px-12 py-4">
                            Settings
                        </Button>
                    </Link>
                    <Link href="/wrapped/create">
                        <Button variant="customGreen" size="xl" className="text-2xl font-bold px-12 py-4">
                            Create Wrapped
                        </Button>
                    </Link>
                    <Link href="/wrapped/saved">
                        <Button variant="customGreen" size="xl" className="text-2xl font-bold px-12 py-4">
                            Saved Wraps
                        </Button>
                    </Link>
                </div>
            </main>
        </UsersLayout>
    );
}
