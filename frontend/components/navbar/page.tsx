// app/components/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Wrap</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/developers">Meet the Developers</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
