"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function logoutUserAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/users/login");
}

export async function redirectUserToDashboardAction() {
  redirect("/dashboard");
}
