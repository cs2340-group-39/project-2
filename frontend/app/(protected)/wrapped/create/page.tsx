'use client';

import React from 'react';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import styles from './CreateWrapped.module.css';

const CreateWrapped: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your create wrapped logic here
  };

  const handleCancel = () => {
    // Implement your cancel logic here, e.g., redirect to homepage
  };

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
        <h1 className={styles.headerText}>Create Your Wrapped</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="wrapName" className={styles.label}>Wrapped Name</label>
            <input
              type="text"
              id="wrapName"
              name="wrapName"
              className={styles.input}
              placeholder="Enter your wrap name"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Create Wrapped</button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateWrapped;
