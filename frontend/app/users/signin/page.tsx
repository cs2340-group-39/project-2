import AnimatedBackground from '@/components/AnimatedBackground';
import React from 'react';
import SignInForm from '@/components/SignInForm';
import styles from '@/components/SignInPage.module.css';


const SignInPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <AnimatedBackground />
      </div>

      <div className={styles.headerText}>Welcome to CS Group 39's</div>
      <div className={styles.customText}>Spotify Wrapped!</div>

      <div className={styles.formContainer}>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
