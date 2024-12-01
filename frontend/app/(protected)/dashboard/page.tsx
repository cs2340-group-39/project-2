import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { WrappedData } from "../definitions";
import { DashboardWrappedSection } from "./dashboard-wrapped-section";

export default async function Page() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    const response = await fetch(
        "http://backend:8000/private/wrapped/api/get-wrapped-data-for-current-user",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        }
    );

    const carouselsData: WrappedData[] = (await response.json()).items;

    return <DashboardWrappedSection carouselsData={carouselsData} />;
}
