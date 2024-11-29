"use client";

import Form from "next/form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState } from "react";
import { signupUserAction } from "./actions";

export function SignupForm() {
  const [signupState, signupDispatch] = useActionState(
    signupUserAction,
    undefined
  );

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your username and email below to signup for your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form action={signupDispatch} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                name="username"
                placeholder="user"
                required
              />
            </div>
            {signupState?.errors?.username && (
              <p className="text-red-500">
                {signupState.errors.username}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="user@gatech.edu"
                required
              />
            </div>
            {signupState?.errors?.email && (
              <p className="text-red-500">{signupState.errors.email}</p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            {signupState?.errors?.password && (
              <p className="text-red-500">
                {signupState.errors.password}
              </p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                id="confirm_password"
                type="password"
                name="confirmPassword"
                required
              />
            </div>
            {signupState?.errors?.ambiguous && (
              <p className="text-red-500">
                {signupState.errors.ambiguous}
              </p>
            )}
            {signupState?.success && <p>{signupState.success}</p>}
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </Form>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {}}
          >
            Signup or Login with Spotify
          </Button>
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
