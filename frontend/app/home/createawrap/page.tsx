import axios from "axios";
import CreateWrapped from '@/components/CreateWrapped';
import AnimatedBackground from "@/components/AnimatedBackground";
import Wrapped from "@/components/Wrapped";
import styles from './createwrapped.module.css';
import Navbar from '@/components/Navbar';

export default function CreateWrappedPage() {
  const wrappedContent = "Your Wrapped 2024 Highlights"; // Replace with dynamic content

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <AnimatedBackground /> {/* Optional background */}
      <div className={styles.contentContainer}>
        <div className={styles.wrappedPreview}>
          <Wrapped content={wrappedContent} /> {/* Wrapped component on the left */}
        </div>
        <div className={styles.createWrappedForm}>
          <CreateWrapped /> {/* CreateWrapped form on the right */}
        </div>
      </div>
    </div>
  );
}
