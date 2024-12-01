import { getIronSession } from "iron-session";
import { GalleryVerticalEnd } from "lucide-react";
import { cookies } from "next/headers";
import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SessionData, sessionOptions } from "@/lib/session";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Select:",
            url: "/dashboard",
            items: [
                {
                    title: "My Spotify Wrapped",
                    url: "/dashboard",
                },
                {
                    title: "Social",
                    url: "/social",
                },
                {
                    title: "About",
                    url: "https://groupcs39.wixsite.com/atlanta-food-finder/team-4",
                },
            ],
        },
    ],
};

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    const response = await fetch("http://backend:8000/private/users/api/get-user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },

        cache: "no-store",
    });

    if (!response.ok) {
        console.log(`Unexpected error getting user: ${response.statusText}.`);
    }

    const userData = await response.json();

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Spotify Wrapped</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className="font-medium">
                                        {item.title}
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    // @ts-ignore
                                                    isActive={item.isActive}
                                                >
                                                    <a href={item.url}>{item.title}</a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        name: userData.username ?? "",
                        email: userData.email ?? "",
                    }}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
