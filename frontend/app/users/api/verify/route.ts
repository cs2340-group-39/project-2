import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const redirectTo = requestUrl.searchParams.get("redirect_to");

    const response = await fetch("http://backend:8000/private/users/api/verify", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
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

        return encodedRedirect("error", "/users/signup", errorMessage);
    }

    let accessToken: string;
    let refreshToken: string;
    try {
        const data = await response.json();
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
    } catch {
        return encodedRedirect("error", "/users/signup", "An unexpected error occurred.");
    }

    redirect(`${redirectTo}?access_token=${accessToken}&refresh_token=${refreshToken}`);
}
