import Tile from "./Tile";

// the below array 'listOfAnimeTitles' is just a placeholder
const placeholderAnimeList = [1, 2, 3, 4, 5];

// should take in props so it can be customized for different uses
export default function TileGrid() {
  // do stuff to set up <Tile> compon.s grid of tiles :P

  let listOfTiles = [];

  placeholderAnimeList.forEach((currID, index) => {
    listOfTiles.push(<Tile ID={currID} key={index} />);
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px'
      }}
    >
      {listOfTiles}
    </div>
  )
}
