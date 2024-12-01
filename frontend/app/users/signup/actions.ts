"use server";

import { z } from "zod";

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: "Invalid email address." }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .trim(),
    confirmPassword: z
        .string()
        .min(8, {
            message: "Confirm Password must be at least 8 characters long.",
        })
        .trim(),
});

interface SignupActionState {
    errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        ambiguous?: string[];
    };
    success?: string;
}

export async function signupUserAction(
    prevState: any,
    formData: FormData
): Promise<SignupActionState> {
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { username, email, password, confirmPassword } = result.data;

    if (password !== confirmPassword) {
        return {
            errors: {
                password: ["Passwords must match."],
            },
        };
    }

    const response = await fetch("http://backend:8000/private/users/api/signup", {
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
    });

    let errorMessage: string;
    if (!response.ok) {
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail;
        } catch {
            errorMessage = `Signup failed: ${response.statusText}.`;
        }
        return {
            errors: {
                ambiguous: [errorMessage],
            },
        };
    }

    return {
        success:
            "Thank you for signing up. Please check your email for further instructions.",
    };
}
