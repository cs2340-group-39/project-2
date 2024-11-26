import { redirect } from "next/navigation";

import { LoginForm } from "./login-form";

import { createClient } from "@/utils/supabase/server";

import { UsersLayout } from "@/components/layouts/users-layout";
import { Message } from "@/components/miscellaneous/form-message";

export default async function Page(props: { searchParams: Promise<Message> }) {
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
