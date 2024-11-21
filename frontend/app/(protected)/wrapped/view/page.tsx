'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import styles from './ViewWrapped.module.css';

interface Wrapped {
  id: string;
  name: string;
  description: string;
}

const ViewWrapped: React.FC = () => {
  const [wraps, setWraps] = useState<Wrapped[]>([]);

  useEffect(() => {
    // Fetch saved wraps from local storage or API
    const savedWraps = JSON.parse(localStorage.getItem('savedWraps') || '[]');
    setWraps(savedWraps);
  }, []);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    alert(`Edit wrap with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    const updatedWraps = wraps.filter(wrap => wrap.id !== id);
    setWraps(updatedWraps);
    localStorage.setItem('savedWraps', JSON.stringify(updatedWraps));
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
        <h1 className={styles.headerText}>Your Saved Wraps</h1>
        {wraps.length === 0 ? (
          <p className={styles.emptyState}>You have no saved wraps. Start by creating one!</p>
        ) : (
          <div className={styles.wrapsContainer}>
            {wraps.map(wrap => (
              <div key={wrap.id} className={styles.wrapCard}>
                <h2 className={styles.wrapTitle}>{wrap.name}</h2>
                <p className={styles.wrapDescription}>{wrap.description}</p>
                <div className={styles.wrapActions}>
                  <button className={styles.actionButton} onClick={() => handleEdit(wrap.id)}>Edit</button>
                  <button className={styles.actionButton} onClick={() => handleDelete(wrap.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewWrapped;
