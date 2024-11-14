import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainMenu.module.css';

function MainMenu() {
  return (
    <div className={styles.mainMenuContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Senp<span id="highlight">ai</span> Suggests</h1>
        <nav className={styles.navOptions}>
          <Link to="/likedanime" className={styles.navLink}>My Likes</Link>
          <Link to="/wishlist" className={styles.navLink}>My Wishlist</Link>
          <Link to="/feeling-lucky" className={styles.navLink}>I'm Feeling Lucky</Link>
          <Link to="/animelist" className={styles.navLink}>Search</Link>
          <Link to="/aboutus" className={styles.navLink}>About Us</Link>
        </nav>
      </div>
      {/* Add any additional content here */}
    </div>
  );
}

export default MainMenu;
