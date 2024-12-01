import { WrappedData } from "../definitions";
import { SocialWrappedSection } from "./social-wrapped-section";

export default async function Page() {
    const response = await fetch(
        "http://backend:8000/private/wrapped/api/get-public-wrapped-data",
        {
            method: "GET",
        }
    );

    const carouselsData: WrappedData[] = (await response.json()).items;

    return <SocialWrappedSection carouselsData={carouselsData} />;
}
