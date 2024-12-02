import { getIronSession } from "iron-session";
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

const data = {
    navMain: [
        {
            title: "Sidebar",
            url: "/dashboard",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                },
                {
                    title: "Social",
                    url: "/social",
                },
                {
                    title: "Contact the Developers",
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
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="text-pretty font-semibold">
                                    Group 39&apos;s Spotify Wrapped App
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
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
