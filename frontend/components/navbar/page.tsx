// app/components/Navbar.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

interface NavbarProps {
  onThemeChange: (theme: "light" | "dark" | "mutedBlue") => void;
  theme: "light" | "dark" | "mutedBlue"; // Add theme prop for text color conditional styling
  toggleMenu: () => void;
  isMenuOpen: boolean;

}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange, theme, toggleMenu, isMenuOpen }) => {

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Wrap</Link>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li>
          <Link href="/meetdevs" className={theme === "dark" ? styles.lightText : styles.darkText}>
            Meet the Developers
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`${theme === "dark" ? styles.lightText : styles.darkText}`}
          >
            Dashboard
          </Link>
        </li>

        {/* Dropdown for theme selection */}
        <Menubar className={`${styles.menuButton} ${theme === "dark" ? styles.lightText : ""}`}>
          <MenubarMenu>
            <MenubarTrigger>Themes</MenubarTrigger>
             <MenubarContent>
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
      </ul>
    </nav>
  );
};

export default Navbar;
