"use client";

import { Button } from "@/components/ui/button";

import {
  logoutUserAction,
  redirectUserToDashboardAction,
} from "./actions";

export function ButtonSection() {
  return (
    <div className="flex justify-center gap-4 w-full">
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => logoutUserAction()}
      >
        Yes
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => redirectUserToDashboardAction()}
      >
        No
      </Button>
    </div>
  );
}
