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
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            {/* Background and Navbar */}
            <ShapesBackground theme={theme} />

                        <SidebarProvider className="z-20">
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] z-50">
                <Collapsible className="w-[30rem] h-[40rem] rounded-lg p-6 shadow-lg bg-green-500 transition-all">
                    <CollapsibleTrigger className="text-lg font-bold text-black cursor-pointer justify-center items-center">
                        Saved Spotify Wraps
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-2">
                        {wraps.map((wrap, index) => (
                            <div
                                key={index}
                                className={`flex flex-col justify-between h-24 p-4 rounded-lg p-4 shadow-md transition-colors duration-300 ${
                                    theme === "light"
                                        ? "bg-gray-100 text-black"
                                        : theme === "mutedBlue"
                                        ? "bg-blue-800 text-white"
                                        : "bg-black text-white"
                                }`}
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
            </div>

            {/* Content area */}
            <div
                className={`flex-grow flex w-full flex-col justify-center items-center transition-colors duration-300 ${textColorClass}`}
            >
                <main className="mx-auto max-w-sm">{children}</main>
            </div>
        </div>
    );
}
