"use server";

export async function getUserFromBackendAction(accessToken: string) {
  const response = await fetch(
    "http://backend:8000/private/users/api/get-user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const user = await response.json();
  return user;
}
