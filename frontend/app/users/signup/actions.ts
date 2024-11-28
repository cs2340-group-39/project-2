"use server";

import { encodedRedirect } from "@/utils/utils";

export async function signupUserAction(formData: FormData) {
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/users/signup",
      "Passwords do not match."
    );
  }

  const response = await fetch(
    "http://backend:8000/private/users/api/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      cache: "no-store",
    }
  );

  let errorMessage: string;
  if (!response.ok) {
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail;
    } catch {
      errorMessage = `Signup failed: ${response.statusText}.`;
    }

    return encodedRedirect("error", "/users/signup", errorMessage);
  }

  return encodedRedirect(
    "success",
    "/users/signup",
    "Thank you for signing up for our app. An email confirmation has been sent to the email that you specified. Please view this email for further instructions."
  );
}
