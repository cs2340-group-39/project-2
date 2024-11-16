import React from 'react';
import styles from './wrapped.module.css'

interface WrappedProps {
  content: string; // Replace with the actual type of your data
}

export default function Wrapped({ content }: WrappedProps) {
  return (
    <div className={styles.wrappedContainer}>
      <div className={styles.wrappedContent}>
        {content}
      </div>
    </div>
  );
}
