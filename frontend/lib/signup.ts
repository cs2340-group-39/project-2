"use server";

export async function fetchSignUp(name: string) {
  try {
    const res = await fetch("http://backend:8000/dummy/api/get-dummy-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "An error occurred." };
    }

    const data = await res.json();
    return { ...data, error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}