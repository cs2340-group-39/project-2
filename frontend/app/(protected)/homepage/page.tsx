'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import styles from './Homepage.module.css';

const Homepage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.shapesBackground}>
        <ShapesBackground />
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.headerText}>Welcome to CS Group 39's Spotify Wrapped!</h1>
          <h2 className={styles.subText}>Create, View, and Share Your Wrapped Experience</h2>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <Link href="/wrapped/create" passHref legacyBehavior>
            <button className={styles.actionButton}>
              Create Wrapped
            </button>
          </Link>

          <Link href="/wrapped/view" passHref legacyBehavior>
            <button className={styles.actionButton}>
              View Saved Wraps
            </button>
          </Link>

          <button
            className={styles.actionButton}
            onClick={() => { /* No functionality yet */ }}
            aria-label="Friends feature coming soon"
          >
            Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
