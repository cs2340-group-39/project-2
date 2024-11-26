import Link from "next/link";

import { FormMessage, Message } from "@/components/miscellaneous/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginUserAction, loginUserWithSpotifyAction } from "./actions";

export function LoginForm(props: { searchParams: Message }) {
  const searchParams = props.searchParams;

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={loginUserAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="user@gatech.edu" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/users/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <FormMessage message={searchParams} />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" formAction={loginUserWithSpotifyAction}>
              Login with Spotify
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/users/signup" className="underline">
            Signup
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
