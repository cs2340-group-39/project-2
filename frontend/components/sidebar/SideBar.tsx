import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React from "react";

interface SidebarPrompts {
  onThemeChange: (theme: "light" | "dark" | "mutedBlue") => void;
  theme: "light" | "dark" | "mutedBlue"; // Prop to determine the current theme
}

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
];

export function AppSidebar({ onThemeChange, theme }: SidebarPrompts) {
  // Dynamic styles for theme-specific colors
  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    mutedBlue: "bg-blue-800 text-white",
  };

  const spotifyGreen = "bg-green-500 text-white hover:bg-green-600";

  return (
    <Sidebar
      className={`min-h-screen transition-colors duration-300 ${themeClasses[theme]}`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">Dashboard Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Friends Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="friends">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Inbox className="mr-2" />
                    Friends
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Search Input for Friends */}
                    <div className="my-2">
                      <Input
                        placeholder="Add friends..."
                        className="border-none placeholder-white bg-green-500 text-white"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Meet the Developers Button */}
              <div className="mt-4">
                <Button asChild className={spotifyGreen}>
                  <a href="/meetdevs">Meet the Developers</a>
                </Button>
              </div>

              {/* Theme Menu */}
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className={spotifyGreen}>Themes</MenubarTrigger>
                  <MenubarContent className={spotifyGreen}>
                    <MenubarItem onSelect={() => onThemeChange("light")}>
                      Light Mode
                    </MenubarItem>
                    <MenubarItem onSelect={() => onThemeChange("dark")}>
                      Dark Mode
                    </MenubarItem>
                    <MenubarItem onSelect={() => onThemeChange("mutedBlue")}>
                      Muted Blue Mode
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
