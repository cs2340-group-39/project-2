"use client";

import { LayoutProps } from "./layout-props";
import { useEffect, useState } from "react";

import ShapesBackground from "@/components/backgrounds/ShapesBackground/ShapesBackground";
import Navbar from "@/components/navbar/page";

export function UsersLayout({ children }: LayoutProps) {
    let [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark" | "mutedBlue">("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleThemeChange = (newTheme: "light" | "dark" | "mutedBlue") => {
        setTheme(newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);

        const themeChangeHandler = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", themeChangeHandler);

        localStorage.setItem("theme", theme);

        return () => {
            mediaQuery.removeEventListener("change", themeChangeHandler);
        };
    }, [theme]);

    const textColorClass = theme === "dark" || theme === "mutedBlue" ? "text-white" : "text-black";

    return (
        <div className={`relative min-h-screen w-screen items-center justify-center px-4`}>
            {/* Background and Navbar */}
            <ShapesBackground theme={theme} />
            <div className="w-full">
                <Navbar 
                    onThemeChange={handleThemeChange}
                    theme={theme}
                    toggleMenu={toggleMenu}
                    isMenuOpen={isMenuOpen}
                />
            </div>
            
            {/* Content area */}
            <div
                className={`flex w-full flex-col items-center justify-center px-4 transition-colors duration-300 ${
                    textColorClass
                }`}
            >
                <main className="mx-auto max-w-sm">{children}</main>
            </div>
        </div>
    );
}
