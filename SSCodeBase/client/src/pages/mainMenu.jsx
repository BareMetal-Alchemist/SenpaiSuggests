import React from 'react';
import styles from './mainMenu.module.css';

function MainMenu() {
  return (
    <div className={styles.mainMenuContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Senp<span id="highlight">ai</span> Suggests</h1>
        <nav className={styles.navOptions}>
          <a href="/watchlist" className={styles.navLink}>My Likes</a>
          <a href="/wishlist" className={styles.navLink}>My Wishlist</a>
          <a href="/feeling-lucky" className={styles.navLink}>I'm Feeling Lucky</a>
          <a href="/animelist" className={styles.navLink}>Search</a>
        </nav>
      </div>
      {/* Add any additional content here */}
    </div>
  );
}

export default MainMenu;