import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Logout</CardTitle>
        <CardDescription>
          Are you sure you want to log out?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 w-full">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => redirect("/users/api/logout")}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => redirect("/dashboard")}
          >
            No
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
