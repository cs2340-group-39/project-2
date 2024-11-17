import Form from "next/form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupUserAction, signupUserWithSpotifyAction } from "./actions";

export function SignupForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>Enter your email below to signup for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form action={signupUserAction} className="grid gap-4">
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
                <Label htmlFor="password">Retype Password</Label>
              </div>
              <Input id="retype_password" type="password" name="retype_password" required />
            </div>
            <Button type="submit" className="w-full">
              Signup
            </Button>
            <Button variant="outline" className="w-full" formAction={signupUserWithSpotifyAction}>
              Signup with Spotify
            </Button>
          </Form>
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
