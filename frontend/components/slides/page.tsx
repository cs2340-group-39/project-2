'use client';

import React from 'react';
import styles from './Slide.module.css';

interface SlideProps {
  headerText: string;
  customBackground?: React.ReactNode;
  children?: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ headerText, customBackground, children }) => {
  return (
    <div className={styles.slide}>
      {/* Custom Background */}
      {customBackground && <div className={styles.customBackground}>{customBackground}</div>}

      {/* Content Overlay */}
      <div className={styles.content}>
        <h1 className={styles.headerText}>{headerText}</h1>
        {children && <div className={styles.bodyContent}>{children}</div>}
      </div>
    </div>
  );
};

export default Slide;