import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    try {
        // Create an unmodified response
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        try {
                            return request.cookies.getAll();
                        } catch (e) {
                            console.error("Error getting cookies:", e);
                            return [];
                        }
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(
                                ({ name, value, options }) => {
                                    // Set cookies both on request and response
                                    request.cookies.set(name, value);
                                    response.cookies.set({
                                        name,
                                        value,
                                        ...options,
                                        // Ensure cookies work across your domain
                                        path: "/",
                                        sameSite: "lax",
                                    });
                                }
                            );

                            response = NextResponse.next({
                                request,
                            });
                        } catch (e) {
                            console.error("Error setting cookies:", e);
                        }
                    },
                },
            }
        );

        // Refresh session if expired
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
            // Instead of redirecting, clear the invalid session cookies
            const cookies = request.cookies.getAll();
            cookies.forEach((cookie) => {
                if (cookie.name.includes("supabase")) {
                    response.cookies.delete(cookie.name);
                }
            });

            return response;
        }

        return response;
    } catch (e) {
        console.error("Session update error:", e);
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
};
