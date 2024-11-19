import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Message } from "@/components/blocks/form-message";
import { UsersLayout } from "@/components/layouts/users-layout";

import { ResetPasswordForm } from "./reset-password-form";

export default async function Page(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/users/forgot-password");
    }

    return (
        <UsersLayout>
            <ResetPasswordForm searchParams={searchParams} />
        </UsersLayout>
    );
}