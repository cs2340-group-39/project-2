import { cookies } from "next/headers";

export default async function Page() {
  return (
    <>
      <h1>Dashboard page</h1>
      <pre className="text-xs font-mono p-3 rounded border overflow-auto">
        {(await cookies()).get("access")?.value}
      </pre>
    </>
  );
}
