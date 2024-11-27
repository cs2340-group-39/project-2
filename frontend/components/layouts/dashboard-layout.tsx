"use client";

import { LayoutProps } from "./layout-props";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import ShapesBackground from "@/components/backgrounds/ShapesBackground/ShapesBackground";
import { AppSidebar } from "@/components/sidebar/SideBar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

export function DashboardLayout({ children }: LayoutProps) {
    const [theme, setTheme] = useState<"light" | "dark" | "mutedBlue">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Temporary mock data for Spotify Wraps
    const wraps = [
        { name: "My 2023 Spotify Wrap", date: "2023-12-01" },
        { name: "Road Trip Playlist", date: "2023-11-15" },
        { name: "Summer Vibes", date: "2023-08-20" },
    ];

    // Temporary friends list
    const friendsList = ["Alice", "Bob", "Charlie"];

    const handleThemeChange = (newTheme: "light" | "dark" | "mutedBlue") => {
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Dynamic classes for theme-based styles
    const textColorClass = theme === "dark" || theme === "mutedBlue" ? "text-white" : "text-black";
    const wrapBackgroundClass =
        theme === "light"
            ? "bg-gray-100 text-black"
            : theme === "mutedBlue"
            ? "bg-blue-800 text-white"
            : "bg-black text-white";

    return (
        <div className={`flex-col relative h-screen w-screen items-center justify-center px-4`}>
            {/* Background and Navbar */}
            <ShapesBackground theme={theme} />
            <SidebarProvider>
                <AppSidebar 
                    onThemeChange={handleThemeChange}
                    theme={theme}
                    friends={friendsList}
                />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>

            {/* Collapsible for Saved Spotify Wraps */}
                <Collapsible>
                    <CollapsibleTrigger className="text-lg font-semibold cursor-pointer">
                        Saved Spotify Wraps
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-2">
                        {wraps.map((wrap, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition-colors duration-300 ${wrapBackgroundClass}`}
                            >
                                <div>
                                    <p className="text-md font-bold">{wrap.name}</p>
                                    <p className="text-sm">{wrap.date}</p>
                                </div>
                                <Link
                                    href={`/wraps/${index}`}
                                    className={`hover:underline ${
                                        theme === "light" ? "text-green-700" : "text-green-300"
                                    }`}
                                >
                                    View
                                </Link>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

            {/* Content area */}
            <div
                className={`flex-grow flex w-full flex-col justify-center items-center transition-colors duration-300 ${textColorClass}`}
            >
                <main className="mx-auto max-w-sm">{children}</main>
            </div>
        </div>
    );
}
