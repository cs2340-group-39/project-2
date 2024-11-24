import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { UsersLayout } from "@/components/layouts/users-layout";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/users/login");
    }

    return (
        <UsersLayout>
            <main>
                
            </main>
        </UsersLayout>
    );
}
