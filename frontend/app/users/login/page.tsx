import { redirect } from "next/navigation";

import { LoginForm } from "../signin/login-form";

import { createClient } from "@/utils/supabase/server";

import { Message } from "@/components/blocks/form-message";
import { UsersLayout } from "@/components/layouts/users-layout";

export default async function Page(props: {
    searchParams: Promise<Message>;
}) {
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
            <LoginForm searchParams={searchParams} />
        </UsersLayout>
    );
}
