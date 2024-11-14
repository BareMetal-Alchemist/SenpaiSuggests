import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainMenu.module.css';

function MainMenu() {
  return (
    <div className={styles.mainMenuContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Senp<span id="highlight">ai</span> Suggests</h1>
        <nav className={styles.navOptions}>
<<<<<<< HEAD
          <Link to="/likedanime" className={styles.navLink}>My Likes</Link>
          <Link to="/wishlist" className={styles.navLink}>My Wishlist</Link>
          <Link to="/feeling-lucky" className={styles.navLink}>I'm Feeling Lucky</Link>
          <Link to="/animelist" className={styles.navLink}>Search</Link>
          <Link to="/aboutus" className={styles.navLink}>About Us</Link>
=======
          <a href="/likes" className={styles.navLink}>My Likes</a>
          <a href="/wishlist" className={styles.navLink}>My Wishlist</a>
          <a href="/feeling-lucky" className={styles.navLink}>I'm Feeling Lucky</a>
          <a href="/animelist" className={styles.navLink}>Search</a>
>>>>>>> 022cec72543ef96cab1d73ef3f5ace5c543d1bfb
        </nav>
      </div>
      {/* Add any additional content here */}
    </div>
  );
}

export default MainMenu;
