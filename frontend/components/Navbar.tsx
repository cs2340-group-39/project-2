"use client"
import React, { useState } from 'react';
import styles from './navbar.module.css';  // Import CSS module for navbar styles

const Navbar = () => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  
  // Toggle the dropdown for background themes
  const toggleThemeDropdown = () => {
    setIsThemeDropdownOpen(!isThemeDropdownOpen);
  };

  // Toggle the dropdown for user settings
  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Background Themes Dropdown */}
      <div className={styles.leftDropdown}>
        <div className={styles.dropdownContainer} onClick={toggleThemeDropdown}>
          <span className={styles.dropdownText}>Background Themes</span>
          <span className={`${styles.arrow} ${isThemeDropdownOpen ? styles.arrowUp : styles.arrowDown}`} />
        </div>
        {isThemeDropdownOpen && (
          <div className={styles.themeDropdown}>
            <ul>
              <li>Light Theme</li>
              <li>Dark Theme</li>
              <li>Colorful Theme</li>
            </ul>
          </div>
        )}
      </div>

      {/* User Settings Dropdown with Profile Picture */}
      <div className={styles.rightDropdown}>
        <div className={styles.dropdownContainer} onClick={toggleSettingsDropdown}>
          <div className={styles.profilePicture}>
            <img src="https://via.placeholder.com/30" alt="User Profile" />
          </div>
          <span className={styles.dropdownText}>User Settings</span>
          <span className={`${styles.arrow} ${isSettingsDropdownOpen ? styles.arrowUp : styles.arrowDown}`} />
        </div>
        {isSettingsDropdownOpen && (
          <div className={styles.settingsDropdown}>
            <ul>
              <li>Account Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
