import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Message } from "@/components/blocks/form-message";
import { UsersLayout } from "@/components/layouts/users-layout";

import { SignupForm } from "./signup-form";

import styles from './SignUpPage.module.css';

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
            <div className={styles.mainContent}>
                {/* Hero Section */}
                <div className={styles.hero}>
                <h1 className={styles.headerText}>Welcome to CS Group 39's</h1>
                <h2 className={styles.customText}>Spotify Wrapped!</h2>
                </div>

                {/* Sign-In Form */}
                <div className={styles.formContainer}>
                <SignupForm searchParams={searchParams}/>
                </div>
            </div>
        </UsersLayout>
    );
}
