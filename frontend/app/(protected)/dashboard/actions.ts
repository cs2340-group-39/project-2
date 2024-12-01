"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import { SessionData, sessionOptions } from "@/lib/session";

export async function createWrappedDataAction() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const response = await fetch(
    "http://backend:8000/private/wrapped/api/create-wrapped-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return {
      errors: {
        ambiguous: [
          `An unexpected error occurred: ${response.statusText}`,
        ],
      },
    };
  }

  return {
    success: "Wrapped successfully created.",
  };
}
