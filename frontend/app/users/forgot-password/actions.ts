"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export async function forgotPasswordUserAction(formData: FormData) {
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect("error", "/users/forgot-password", "Email is required");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/users/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect("error", "/users/forgot-password", "Could not reset password");
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect("success", "/users/forgot-password", "Check your email for a link to reset your password.");
}
