import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UsersLayout } from "@/components/layouts/users-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ButtonSection } from "./button-section";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/users/login");
  }

  return (
    <UsersLayout>
      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Logout</CardTitle>
          <CardDescription>
            Are you sure you want to log out?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonSection />
        </CardContent>
      </Card>
    </UsersLayout>
  );
}
