import { LayoutProps } from "./layout-props";

export function UsersLayout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen w-screen items-center justify-center px-4">
            <main className="mx-auto max-w-sm">{children}</main>
        </div>
    );
}
