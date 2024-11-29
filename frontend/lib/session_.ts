// // TODO change all the cookie shit

// import "server-only";

// import { cookies } from "next/headers";

// import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
// import { NextRequest, NextResponse } from "next/server";

// interface CookieConfig {
//   name: string;
//   duration: number;
//   options: Partial<ResponseCookie>;
// }

// const accessCookie: CookieConfig = {
//   name: "access",
//   duration: 24 * 60 * 60 * 1000, // 1 day,
//   options: {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/",
//   },
// };

// const refreshCookie: CookieConfig = {
//   name: "refresh",
//   duration: 7 * 24 * 60 * 60 * 1000, // 7 days
//   options: {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/",
//   },
// };

// export async function createSession(
//   accessToken: string,
//   refreshToken: string
// ) {
//   const accessExpires = new Date(Date.now() + accessCookie.duration);
//   const refreshExpires = new Date(Date.now() + refreshCookie.duration);

//   (await cookies()).set(accessCookie.name, accessToken, {
//     ...accessCookie.options,
//     expires: accessExpires,
//   });

//   (await cookies()).set(refreshCookie.name, refreshToken, {
//     ...refreshCookie.options,
//     expires: refreshExpires,
//   });
// }

// async function refreshAccessToken(refreshToken: string) {
//   try {
//     const response = await fetch(
//       "http://backend:8000/private/users/api/refresh",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       return {
//         newAccessToken: null,
//         newRefreshToken: null,
//       };
//     }

//     const data = await response.json();
//     return {
//       newAccessToken: data.access_token,
//       newRefreshToken: data.refresh_token,
//     };
//   } catch (e) {
//     console.error(`Error refreshing token: ${e}`);
//     return {
//       newAccessToken: null,
//       newRefreshToken: null,
//     };
//   }
// }

// export async function verifySession(request: NextRequest) {
//   const accessToken = request.cookies.get(accessCookie.name)?.value;
//   const refreshToken = request.cookies.get(refreshCookie.name)?.value;

//   if (!accessToken) {
//     if (!refreshToken) {
//       return { isAuthenticated: false };
//     }

//     const { newAccessToken, newRefreshToken } =
//       await refreshAccessToken(refreshToken);
//     if (!newAccessToken || !newRefreshToken) {
//       return { isAuthenticated: false };
//     }

//     const accessExpires = new Date(Date.now() + accessCookie.duration);
//     const refreshExpires = new Date(
//       Date.now() + refreshCookie.duration
//     );

//     (await cookies()).set(accessCookie.name, newAccessToken, {
//       ...accessCookie.options,
//       expires: accessExpires,
//     });

//     (await cookies()).set(refreshCookie.name, newRefreshToken, {
//       ...refreshCookie.options,
//       expires: refreshExpires,
//     });

//     return { isAuthenticated: true };
//   }

//   try {
//     const response = await fetch(
//       "http://backend:8000/private/users/api/verify-access-token",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ accessToken }),
//         cache: "no-store",
//       }
//     );

//     const data = await response.json();

//     if (!data.verified && refreshToken) {
//       const { newAccessToken, newRefreshToken } =
//         await refreshAccessToken(refreshToken);
//       if (!newAccessToken || !newRefreshToken) {
//         return { isAuthenticated: false };
//       }

//       const accessExpires = new Date(
//         Date.now() + accessCookie.duration
//       );
//       const refreshExpires = new Date(
//         Date.now() + refreshCookie.duration
//       );

//       (await cookies()).set(accessCookie.name, newAccessToken, {
//         ...accessCookie.options,
//         expires: accessExpires,
//       });

//       (await cookies()).set(refreshCookie.name, newRefreshToken, {
//         ...refreshCookie.options,
//         expires: refreshExpires,
//       });

//       return { isAuthenticated: true };
//     }

//     return { isAuthenticated: data.verified };
//   } catch (e) {
//     console.error(`An unexpected error occurred: ${e}`);
//     return { isAuthenticated: false };
//   }
// }

// export async function deleteSession(request: NextRequest) {
//   (await cookies()).delete(accessCookie.name);
//   (await cookies()).delete(refreshCookie.name);
//   return NextResponse.redirect(
//     new URL("/users/login", process.env.NEXT_PUBLIC_BASE_URL)
//   );
// }

// export async function updateSession(request: NextRequest) {
//   const { isAuthenticated } = { isAuthenticated: false };
//   if (!isAuthenticated) {
//     console.log(isAuthenticated);
//     return await deleteSession(request);
//   }

//   console.log(isAuthenticated);

//   const accessToken = request.cookies.get(accessCookie.name)?.value!;
//   const expires = new Date(Date.now() + accessCookie.duration);

//   const response = NextResponse.next();
//   response.cookies.set({
//     name: accessCookie.name,
//     value: accessToken,
//     httpOnly: true,
//     expires: expires,
//   });
// }
