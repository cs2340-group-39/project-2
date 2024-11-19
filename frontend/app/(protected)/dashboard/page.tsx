import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { getUserFromBackendAction } from "./actions";

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
        <>
            <h1>Dashboard page</h1>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                {JSON.stringify(user, null, 2)}
            </pre>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                {JSON.stringify(backendUser, null, 2)}
            </pre>
        </>
    );
}
