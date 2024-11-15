import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import p5 from 'p5';
import { parallaxSketch } from './parallaxSketch';
import './mainMenu.module.css';

export default function Navbar() {
  useEffect(() => {
    new p5(parallaxSketch, 'parallax-container');
  }, []);

  return (
    <div>
      <div className='navbar-background'>
        <nav className='navbar'>
          <h1 className='title'>
            Senp<span id="highlight">ai</span> Suggests
          </h1>
          <div className='navOptions'>
            <Link to="/mainmenu" className='navLink'>Main Menu</Link>
            <Link to="/likes" className='navLink'>My Likes</Link>
            <Link to="/wishlist" className='navLink'>My Wishlist</Link>
            <Link to="/feeling-lucky" className='navLink'>I'm Feeling Lucky</Link>
            <Link to="/animelist" className='navLink'>Search</Link>
            <Link to="/reco" className='navLink'>Ask Senpai</Link>
            <Link to="/aboutus" className='navLink'>About Us</Link>
          </div>
        </nav>
      </div>
      <div id="parallax-container"></div>
    </div>
  );
}
