import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar-background'>
      <nav className='navbar'>
        <h1 className='title'>
          Senp<span id="highlight">ai</span> Suggests
        </h1>
        <div className='navOptions'>
          <Link to="/mainmenu" className='navLink'>Main Menu</Link>
          <Link to="/likedanime" className='navLink'>My Likes</Link>
          <Link to="/wishlist" className='navLink'>My Wishlist</Link>
          <Link to="/feeling-lucky" className='navLink'>I'm Feeling Lucky</Link>
          <Link to="/animelist" className='navLink'>Search</Link>
          <Link to="/reco" className={styles.navLink}>Ask Senpai</Link>
          <Link to="/aboutus" className='navLink'>About Us</Link>
        </div>
      </nav>
    </div>
  )
}
