import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Message } from "@/components/blocks/form-message";
import { UsersLayout } from "@/components/layouts/users-layout";

import { ForgotPasswordForm } from "./forgot-password-form";

import styles from "./ForgotPassword.module.css";

export default async function Page(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/users/reset-password");
    }

    return (
        <UsersLayout>
            <div className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <ForgotPasswordForm searchParams={searchParams} />
                </div>
            </div>
        </UsersLayout>
    );
}
