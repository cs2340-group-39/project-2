import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UsersLayout } from "@/components/layouts/users-layout";
import { Message } from "@/components/miscellaneous/form-message";

import { SignupForm } from "./signup-form";

export default async function Page(props: { searchParams: Message }) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/dashboard");
    }

    return (
        <UsersLayout>
            <SignupForm searchParams={searchParams} />
        </UsersLayout>
    );
}
