import Link from "next/link";

import { FormMessage, Message } from "@/components/miscellaneous/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupOrLoginUserWithSpotifyAction } from "@/actions/signup-or-login-user-with-spotify-action";

import { signupUserAction } from "./actions";

export function SignupForm(props: { searchParams: Message }) {
    const searchParams = props.searchParams;

    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <Card className="w-[400px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Signup</CardTitle>
                <CardDescription>Enter your username and email below to signup for your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <form action={signupUserAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input id="username" type="username" name="username" placeholder="user" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="user@gatech.edu" required />
                        </div>
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
                            Signup
                        </Button>
                    </form>
                    <form action={signupOrLoginUserWithSpotifyAction}>
                        <Button type="submit" variant="outline" className="w-full">
                            Signup or Login with Spotify
                        </Button>
                    </form>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/users/login" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
