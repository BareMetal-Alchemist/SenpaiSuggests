import React, { useState } from 'react';
import AnimeBox from '../Components/animebox';
import './animelist.module.css'

function AnimeList() {
    const [animeList, setAnimeList] = useState([]); // Stores list of fetched anime
    const [searchTitle, setSearchTitle] = useState(''); // User-input title for search
    const [error, setError] = useState(null); // Error handling

    const fetchAnimeData = async (title) => {
        try {
            const response = await fetch(`http://localhost:5000/api/anime/${title}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error fetching anime: ${errorText}`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log('Parsed data:', data);
                
                // Map the fetched anime data to extract the necessary fields
                const animeListData = data.data.map((anime) => ({
                    title: anime.titles[0].title, // Assuming the title is the first item in titles array
                    imageUrl: anime.images.jpg.image_url // Adjust this based on actual image path
                }));
                
                setAnimeList(animeListData);
                setError(null);
            } else {
                throw new Error("Response is not JSON");
            }
        } catch (err) {
            console.error("Fetch error:", err.message);
            setAnimeList([]);
            setError(err.message);
        }
    };
    
    // Handle search button click
    const handleSearch = () => {
        if (searchTitle) {
            fetchAnimeData(searchTitle);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter anime title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button onClick={handleSearch}>Search Anime</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="anime-list">
                {animeList.map((anime, index) => (
                    <AnimeBox key={index} title={anime.title} imageUrl={anime.imageUrl} />
                ))}
            </div>
        </div>
    );
}

export default AnimeList;
