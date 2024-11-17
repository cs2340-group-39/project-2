import Form from "next/form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { forgotPasswordUserAction } from "./actions";

export function ForgotPasswordForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below. If an account exists, we will send you an email further instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form action={forgotPasswordUserAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="user@gatech.edu" required />
            </div>
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </Form>
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
