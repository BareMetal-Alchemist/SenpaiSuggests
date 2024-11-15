import React, { useState, useEffect } from 'react';
import './WishListPage.css';

// STILL NEEDS DATABASE FUNCTIONALITY

function WishListPage() {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const usersWishList = JSON.parse(localStorage.getItem("wishList")) || [];
    setWishList(usersWishList);
  }, []);

  return (
    <div className='wish-list-page'>
      <h2 id='wish-list-title'>Wish List</h2>
      { wishList.length === 0 ? (
        <p>It seems you don't have any animes added to your Wish List yet.</p>
      ) : (
        <div className='wish-list-grid'>
          { wishList.map((anime, index) => {
            <div key={index} className="anime-item">
              <img src={anime.imageUrl} alt={anime.title} />
              <div>
                <h3>{anime.title}</h3>
                <p>{anime.description || "No description available."}</p>
              </div>
            </div>
          }) }
        </div>
      ) }
    </div>
  )
}

export default WishListPage;
