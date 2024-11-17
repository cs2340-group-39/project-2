import { LayoutProps } from "./layout-props";

import { CircleBackground } from "@/components/backgrounds/circle-background/circle-background";

export function UsersLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <CircleBackground />
      <main>{children}</main>
    </div>
  );
}
