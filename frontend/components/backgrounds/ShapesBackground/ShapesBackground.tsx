// app/components/ShapesBackground/ShapesBackground.tsx

import React from 'react';
import styles from './ShapesBackground.module.css';

const ShapesBackground: React.FC = () => {
  return (
    <div className={styles.background}>
      {/* Shape 1 - Top Left Gradient Circle */}
      <div className={`${styles.shape} ${styles.shape1}`} />

      {/* Shape 2 - Bottom Right Gradient Circle */}
      <div className={`${styles.shape} ${styles.shape2}`} />

      {/* Shape 3 - Center Blob */}
      <div className={`${styles.shape} ${styles.shape3}`} />

      {/* Shape 4 - Top Right Vibrant Triangle */}
      <div className={`${styles.shape} ${styles.shape4}`} />

      {/* Shape 5 - Bottom Left Vibrant Polygon */}
      <div className={`${styles.shape} ${styles.shape5}`} />

      {/* Shape 6 - Mid Left Vibrant Star */}
      <div className={`${styles.shape} ${styles.shape6}`} />

      {/* SVG Decorative Element */}
      <div className={`${styles.svgShape} ${styles.svgShape1}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="url(#gradient1)" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(29, 185, 84, 0.6)" />
              <stop offset="100%" stopColor="rgba(40, 116, 166, 0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ShapesBackground;
