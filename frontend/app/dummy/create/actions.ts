"use server";

export async function createDummyDataAction(formData: FormData) {
  try {
    const name = formData.get("name");
    const response = await fetch("http://backend:8000/private/dummy/api/create-dummy-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "An error occurred." };
    }

    const data = await response.json();
    return { ...data, error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}
