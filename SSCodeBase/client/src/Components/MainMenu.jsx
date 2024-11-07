import React from 'react';
import './login.css';

function MainMenu() {
  return (
    <div className="loginContainer">
      <h2>Main Menu</h2>
      <div className="menu-options">
        <button className="btn">My Watchlist</button>
        <button className="btn">My Wishlist</button>
        <button className="btn">I&apos;m Feeling Lucky</button>
      </div>
    </div>
  );
}

export default MainMenu;
