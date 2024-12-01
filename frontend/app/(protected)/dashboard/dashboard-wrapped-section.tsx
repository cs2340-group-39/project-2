"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";
import { WrappedSectionProps } from "../definitions";
import { DashboardCarousel } from "../shared-carousel";
import { createWrappedDataAction } from "./actions";

export function DashboardWrappedSection({
  carouselsData,
}: WrappedSectionProps) {
  const [createWrappedState, createWrappedDispatch] = useActionState(
    createWrappedDataAction,
    undefined
  );

  return (
    <div className="space-y-4 px-2 sm:px-4">
      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          size="default"
          onClick={createWrappedDispatch}
        >
          Create New Wrap
        </Button>
      </div>
      {createWrappedState?.errors?.ambiguous && (
        <p className="text-red-500">
          {createWrappedState.errors.ambiguous}
        </p>
      )}
      {createWrappedState?.success && (
        <p>{createWrappedState.success}</p>
      )}
      <Separator className="my-4 sm:my-8" />
      {carouselsData.map((wrappedData, carouselIndex) => (
        <div key={carouselIndex} className="relative px-2 sm:px-10">
          <div className="relative flex items-center justify-center">
            <DashboardCarousel wrappedData={wrappedData} />
          </div>

          <div className="mt-2 sm:mt-4 flex justify-center gap-2 sm:gap-4">
            <Button
              variant="default"
              size="sm"
              className="text-xs sm:text-base"
              onClick={() =>
                console.log(`Post this wrap ${carouselIndex + 1}`)
              }
            >
              Post this wrap
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs sm:text-base"
              onClick={() =>
                console.log(`Delete this carousel ${carouselIndex + 1}`)
              }
            >
              Delete
            </Button>
          </div>
          <Separator className="my-4 sm:my-8" />
        </div>
      ))}
    </div>
  );
}
