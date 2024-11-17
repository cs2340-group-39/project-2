import { SignupForm } from "./signup-form";

import { UsersLayout } from "@/components/layouts/users-layout";

export default function Page() {
  return (
    <UsersLayout>
      <SignupForm />
    </UsersLayout>
  );
}
