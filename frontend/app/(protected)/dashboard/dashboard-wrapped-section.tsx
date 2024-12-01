"use client";

import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";

import { WrappedSectionProps } from "../definitions";
import { DashboardCarousel } from "../shared-carousel";
import {
  createWrappedDataAction,
  deleteWrappedDataAction,
  postWrappedDataAction,
} from "./actions";

export function DashboardWrappedSection({
  carouselsData,
}: WrappedSectionProps) {
  const [createWrappedState, createWrappedDispatch] = useActionState(
    createWrappedDataAction,
    undefined
  );
  const [deleteWrappedState, deleteWrappedDispatch] = useActionState(
    deleteWrappedDataAction,
    undefined
  );
  const [postWrappedState, postWrappedDispatch] = useActionState(
    postWrappedDataAction,
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

      {deleteWrappedState?.errors?.ambiguous && (
        <p className="text-red-500">
          {deleteWrappedState.errors.ambiguous}
        </p>
      )}
      {deleteWrappedState?.success && (
        <p>{deleteWrappedState.success}</p>
      )}

      {postWrappedState?.errors?.ambiguous && (
        <p className="text-red-500">
          {postWrappedState.errors.ambiguous}
        </p>
      )}
      {postWrappedState?.success && <p>{postWrappedState.success}</p>}

      <Separator className="my-4 sm:my-8" />
      {carouselsData.map((wrappedData, carouselIndex) => (
        <div key={carouselIndex} className="relative px-2 sm:px-10">
          <div className="relative flex items-center justify-center">
            <DashboardCarousel wrappedData={wrappedData} />
          </div>

          <div className="mt-2 sm:mt-4 flex justify-center gap-2 sm:gap-4">
            <Form action={postWrappedDispatch}>
              <input type="hidden" name="id" value={wrappedData.id} />
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="text-xs sm:text-base"
              >
                Post this wrap
              </Button>
            </Form>

            <Form action={deleteWrappedDispatch}>
              <input type="hidden" name="id" value={wrappedData.id} />
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                className="text-xs sm:text-base"
              >
                Delete
              </Button>
            </Form>
          </div>
          <Separator className="my-4 sm:my-8" />
        </div>
      ))}
    </div>
  );
}
