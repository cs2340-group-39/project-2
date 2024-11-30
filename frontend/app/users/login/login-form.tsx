"use client";

import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";

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

import { loginUserAction } from "./actions";

export function LoginForm() {
  const [loginState, loginDispatch] = useActionState(
    loginUserAction,
    undefined
  );

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form action={loginDispatch} className="grid gap-4">
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
            {loginState?.errors?.email && (
              <p className="text-red-500">{loginState.errors.email}</p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/users/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            {loginState?.errors?.password && (
              <p className="text-red-500">
                {loginState.errors.password}
              </p>
            )}
            {loginState?.errors?.ambiguous && (
              <p className="text-red-500">
                {loginState.errors.ambiguous}
              </p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
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
