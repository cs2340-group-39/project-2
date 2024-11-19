import { ForgotPasswordForm } from "./forgot-password-form";

import { Message } from "@/components/blocks/form-message";
import { UsersLayout } from "@/components/layouts/users-layout";

export default async function Page(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <UsersLayout>
      <ForgotPasswordForm searchParams={searchParams} />
    </UsersLayout>
  );
}
