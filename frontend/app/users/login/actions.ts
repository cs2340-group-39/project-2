"use server";

export async function loginUserAction(formData: FormData) {
  console.log(formData);
  console.log("login with django");
}

export async function loginUserWithSpotifyAction(formData: FormData) {
  console.log(formData);
  console.log("login with spotify");
}
