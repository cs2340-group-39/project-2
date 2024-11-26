import Link from "next/link";

import { FormMessage, Message } from "@/components/miscellaneous/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { forgotPasswordUserAction } from "./actions";

export function ForgotPasswordForm(props: { searchParams: Message }) {
  const searchParams = props.searchParams;

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email below. If an account exists, we will send you an email further instructions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={forgotPasswordUserAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="user@gatech.edu" required />
            </div>
            <FormMessage message={searchParams} />
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/users/signup" className="underline">
            Signup
          </Link>{" "}
          or{" "}
          <Link href="/users/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
