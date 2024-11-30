import { WrappedData } from "../actions";
import { SocialWrappedSection } from "./social-wrapped-section";

export default function Page() {
  const carouselsData: WrappedData[] = [
    {
      username: "saada7553",
    },
    {
      username: "arjun7553",
    },
  ];

  return <SocialWrappedSection carouselsData={carouselsData} />;
}
