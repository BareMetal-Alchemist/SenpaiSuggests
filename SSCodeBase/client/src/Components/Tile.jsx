import React from 'react';
import { getAnimeByID } from '../utils';

/*  should take in props to customize a given tile
 *    picture
 *    anime title
 *    (MAYBE) genre / other info?
 *    haveAddToWishList button (which would be false when used in WishListPage)
 */

export default function Tile( { ID } ) {
  const animeByID = getAnimeByID(ID);

  return (
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
        background: 'rgba(80, 140, 150, 0.6)',
        borderRadius: '15px',
        padding: '30px',
        width: '200px',
        maxWidth: '90%',
        boxShadow: '0px 0px 15px rgba(20, 30, 50, 0.5), 0px 0px 30px rgba(80, 140, 150, 0.3)'
      }}
    >
      <h2>
        {animeByID.title}
      </h2>
      <img
        src={animeByID.image}
        alt='No Image Available'
        height={150}
        width={150}
      />
    </div>
  )
}
