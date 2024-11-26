import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UsersLayout } from "@/components/layouts/users-layout";
import { Message } from "@/components/miscellaneous/form-message";

import { ForgotPasswordForm } from "./forgot-password-form";

export default async function Page(props: { searchParams: Promise<Message> }) {
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
      <ForgotPasswordForm searchParams={searchParams} />
    </UsersLayout>
  );
}
