import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { UsersLayout } from "@/components/layouts/users-layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    logoutUserAction,
    redirectUserToDashboardAction,
} from "./actions";

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
                    <div className="flex justify-center gap-4 w-full">
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={logoutUserAction}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={redirectUserToDashboardAction}
                        >
                            No
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </UsersLayout>
    );
}
