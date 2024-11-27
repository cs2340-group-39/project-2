"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export async function signupOrLoginUserWithSpotifyAction() {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/users/signup", error.message);
    } else {
        return redirect(data.url!);
    }
}
