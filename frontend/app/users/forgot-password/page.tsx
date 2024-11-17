import { ForgotPasswordForm } from "./forgot-password-form";

import { UsersLayout } from "@/components/layouts/users-layout";

export default function Page() {
  return (
    <UsersLayout>
      <ForgotPasswordForm />
    </UsersLayout>
  );
}
