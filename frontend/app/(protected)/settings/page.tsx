import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/users/login");
  }

  return (
    <>
      <h1>Settings Page</h1>
      <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  );
}
