"use client";

import { WrappedData } from "../actions";
import { DashboardWrappedSection } from "./dashboard-wrapped-section";

export default async function Page() {
  const carouselsData: WrappedData[] = [
    {
      username: "saada7553",
    },
    {
      username: "arjun7553",
    },
  ];

  return <DashboardWrappedSection carouselsData={carouselsData} />;
}
