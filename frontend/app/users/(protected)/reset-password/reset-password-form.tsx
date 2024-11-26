import { FormMessage, Message } from "@/components/miscellaneous/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { resetPasswordUserAction } from "./actions";

export function ResetPasswordForm(props: { searchParams: Message }) {
    const searchParams = props.searchParams;

    return (
        <Card className="w-[400px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <form action={resetPasswordUserAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Confirm Password</Label>
                            </div>
                            <Input id="confirm_password" type="password" name="confirmPassword" required />
                        </div>
                        <FormMessage message={searchParams} />
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
