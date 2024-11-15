// pages/auth/signup.tsx

import React from 'react';
import SignupForm from '@/components/SignupForm';
import AnimatedBackground from '@/components/AnimatedBackground';
import styles from '@/components/SignInPage.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <AnimatedBackground />
      </div>

      <div className={styles.headerText}>Welcome to CS Group 39's</div>
      <div className={styles.customText}>Spotify Wrapped!</div>

      <div className={styles.formContainer}>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
