import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { getUserFromBackendAction } from "./actions";

import Link from "next/link";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
        <DashboardLayout>
            <div></div>
        </DashboardLayout>
    );
}
