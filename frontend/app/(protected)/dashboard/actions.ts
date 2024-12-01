"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import { SessionData, sessionOptions } from "@/lib/session";

export async function postWrappedDataAction(
  prevState: any,
  formData: FormData
) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const response = await fetch(
    "http://backend:8000/private/wrapped/api/make-wrapped-data-public",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        wrapped_id: Number.parseInt(formData.get("id")?.toString()!),
      }),
      cache: "no-store",
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
    success: "Wrapped successfully posted.",
  };
}

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

export async function deleteWrappedDataAction(
  prevState: any,
  formData: FormData
) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const response = await fetch(
    "http://backend:8000/private/wrapped/api/delete-wrapped-data",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        wrapped_id: Number.parseInt(formData.get("id")?.toString()!),
      }),
      cache: "no-store",
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
    success: "Wrapped successfully deleted.",
  };
}
