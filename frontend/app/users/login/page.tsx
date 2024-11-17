import { LoginForm } from "./login-form";

import { UsersLayout } from "@/components/layouts/users-layout";

export default function Page() {
  return (
    <UsersLayout>
      <LoginForm />
    </UsersLayout>
  );
}
