import { decodeJwt } from "jose";
import { cookies } from "next/headers";

import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "@/lib/session";

export default async function Page() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return (
    <>
      <h1>Dashboard page</h1>
      <pre className="text-xs font-mono p-3 rounded border overflow-auto">
        {JSON.stringify(decodeJwt(session.accessToken!))}
      </pre>
    </>
  );
}
