"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export async function loginUserAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/users/login", error.message);
  }

  return redirect("/dashboard");
}

export async function loginUserWithSpotifyAction(formData: FormData) {
  console.log(formData);
  console.log("Spotify");
}
