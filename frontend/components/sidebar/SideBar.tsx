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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import React from "react";

interface SidebarPrompts {
  onThemeChange: (theme: "light" | "dark" | "mutedBlue") => void;
  theme: "light" | "dark" | "mutedBlue"; // Current theme
  friends: string[]; // List of friends
}

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
];

export function AppSidebar({ onThemeChange, theme, friends }: SidebarPrompts) {
  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    mutedBlue: "bg-blue-800 text-white",
  };

  const spotifyGreen = "bg-green-500 text-white hover:bg-green-600";

  return (
    <Sidebar
      className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses[theme]}`}
    >
      <SidebarContent className="flex flex-col flex-grow">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard Links */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 justify-start">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Friends Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="friends">
                  <AccordionTrigger className="flex items-center gap-2 justify-start">
                    <Inbox className="mr-2" />
                    Friends
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Search Input */}
                    <div className="my-2">
                      <Input
                        placeholder="Search friends..."
                        className="border-none placeholder-white bg-green-500 text-white"
                      />
                    </div>

                    {/* List of Friends */}
                    <ul className="mt-2 space-y-1">
                      {friends.map((friend, index) => (
                        <li
                          key={index}
                          className="px-2 py-1 text-sm rounded-md hover:bg-green-600"
                        >
                          {friend}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible>
                <AccordionItem value="themes">
                  <AccordionTrigger className="flex items-center gap-2 justify-start">
                    <Inbox className="mr-2" />
                    Themes
                  </AccordionTrigger>
                  <AccordionContent>
                  <Button onClick={() => onThemeChange("light")} className={spotifyGreen}>
                      Light Theme
                    </Button>
                  </AccordionContent>
                  <AccordionContent>
                  <Button onClick={() => onThemeChange("dark")} className={spotifyGreen}>
                      Dark Theme
                    </Button>
                  </AccordionContent>
                  <AccordionContent>
                    <Button onClick={() => onThemeChange("mutedBlue")} className={spotifyGreen}>
                      Blue Theme
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Meet the Developers Button */}
              <div className="mt-auto p-4 justify-center">
                <Button asChild className={spotifyGreen}>
                  <a href="/meetdevs">Meet the Developers</a>
                </Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
