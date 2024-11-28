'use client';

import React, { useState } from 'react';
import Slide from '@/components/slides/page';
import Image from 'next/image';
import styles from './ViewWrapped.module.css';
import { Button } from '@/components/ui/button';

import background1 from '@/components/assets/gradientbackground.jpg';
import background2 from '@/components/assets/yellowbluegradient.jpeg';
//more background here

const ExampleSlide: React.FC = () => {
  const slides = [
    {
      headerText: 'Headertext 1',
      customBackground: (
        <Image
          src={background1}
          alt="Gradient Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      ),
    },
    {
      headerText: 'Headertext 2',
      customBackground: (
        <Image
          src={background2}
          alt="Yellow Blue Gradient Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      ),
    },
    //more slides here
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Handler for Next button
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Handler for Previous button
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.wrapper}>
      <Slide
        headerText={slides[currentSlide].headerText}
        customBackground={slides[currentSlide].customBackground}
      >
        <p className={styles.paragraph}>
          Custom Text Bla Bla
        </p>
        <Button
          variant="default"
          className={styles.actionButton}
          onClick={() => alert('Getting Started!')}
        >
          Get Started
        </Button>
      </Slide>

      {/* Navigation Arrows */}
      <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev} aria-label="Previous Slide">
        &#10094;
      </button>
      <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext} aria-label="Next Slide">
        &#10095;
      </button>
    </div>
  );
};

export default ExampleSlide;














//old code
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Navbar from '@/components/navbar/page';
// import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
// import styles from './ViewWrapped.module.css';
// import { UsersLayout } from '@/components/layouts/users-layout';

// interface Wrapped {
//   id: string;
//   name: string;
//   description: string;
// }

// const ViewWrapped: React.FC = () => {
//   const [wraps, setWraps] = useState<Wrapped[]>([]);

//   useEffect(() => {
//     // Fetch saved wraps from local storage or API
//     const savedWraps = JSON.parse(localStorage.getItem('savedWraps') || '[]');
//     setWraps(savedWraps);
//   }, []);

//   const handleEdit = (id: string) => {
//     // Implement edit functionality
//     alert(`Edit wrap with ID: ${id}`);
//   };

//   const handleDelete = (id: string) => {
//     // Implement delete functionality
//     const updatedWraps = wraps.filter(wrap => wrap.id !== id);
//     setWraps(updatedWraps);
//     localStorage.setItem('savedWraps', JSON.stringify(updatedWraps));
//   };

//   return (
//     <div className={styles.container}>
//       <UsersLayout>
//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         <h1 className={styles.headerText}>Your Saved Wraps</h1>
//         {wraps.length === 0 ? (
//           <p className={styles.emptyState}>You have no saved wraps. Start by creating one!</p>
//         ) : (
//           <div className={styles.wrapsContainer}>
//             {wraps.map(wrap => (
//               <div key={wrap.id} className={styles.wrapCard}>
//                 <h2 className={styles.wrapTitle}>{wrap.name}</h2>
//                 <p className={styles.wrapDescription}>{wrap.description}</p>
//                 <div className={styles.wrapActions}>
//                   <button className={styles.actionButton} onClick={() => handleEdit(wrap.id)}>Edit</button>
//                   <button className={styles.actionButton} onClick={() => handleDelete(wrap.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       </UsersLayout>
//     </div>
//   );
// };

// export default ViewWrapped;
