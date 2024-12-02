"use server";

import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .trim(),
});

interface LoginActionState {
    errors?: {
        email?: string[];
        password?: string[];
        ambiguous?: string[];
    };
    success?: string;
}

export async function loginUserAction(
    prevState: any,
    formData: FormData
): Promise<LoginActionState> {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;

    const response = await fetch("http://backend:8000/private/users/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
            errorMessage = `Login failed: ${response.statusText}.`;
        }
        return {
            errors: {
                ambiguous: [errorMessage],
            },
        };
    }

    let accessToken: string;
    let refreshToken: string;
    try {
        const data = await response.json();
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
    } catch (e) {
        return {
            errors: {
                ambiguous: [`Login failed ${e}`],
            },
        };
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    await session.save();

    redirect("/dashboard");
}
