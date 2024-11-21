// app/users/signin/page.tsx
//TODO replace or replaced by login page

'use client';

import React from 'react';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import SignInForm from '@/components/signinform/page';
import styles from './SignInPage.module.css';

const SignInPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <ShapesBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.headerText}>Welcome to CS Group 39's</h1>
          <h2 className={styles.customText}>Spotify Wrapped!</h2>
        </div>

        {/* Sign-In Form */}
        <div className={styles.formContainer}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
