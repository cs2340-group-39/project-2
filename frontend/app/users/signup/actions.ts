"use server";

import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export async function signupUserAction(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email || !password) {
        return encodedRedirect(
            "error",
            "/users/signup",
            "Email and password are required"
        );
    }

    if (password !== confirmPassword) {
        return encodedRedirect(
            "error",
            "/users/signup",
            "Passwords must match"
        );
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/users/signup", error.message);
    } else {
        return encodedRedirect(
            "success",
            "/users/signup",
            "Thanks for signing up! Please check your email for a verification link."
        );
    }
}

export async function signupUserWithSpotifyAction(formData: FormData) {
    console.log(formData);
    console.log("Spotify");
}
