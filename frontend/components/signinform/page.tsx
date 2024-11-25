// app/components/signinform/page.tsx

'use client';

import React, { useState } from 'react';
import styles from './SignInForm.module.css';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // will just alert the entered credentials
    alert(`Email: ${email}\nPassword: ${password}`);
    // handle authentication here
  };

  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <h2 className={styles.formTitle}>Sign In</h2>

      {/* Email Field */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email Address"
        />
      </div>

      {/* Password Field */}
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.submitButton}>
        Sign In
      </button>

      {/* Additional Links */}
      <div className={styles.additionalLinks}>
        <a href="/register" className={styles.link}>Don't have an account? Register</a>
        <a href="/forgot-password" className={styles.link}>Forgot Password?</a>
      </div>
    </form>
  );
};

export default SignInForm;
