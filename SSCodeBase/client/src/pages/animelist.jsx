import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import AnimeBox from '../Components/animebox';
import './animelis.css';

function AnimeList() {
    const [animeList, setAnimeList] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const RESULTS_PER_PAGE = 30;
    const SUGGESTIONS_LIMIT = 10;
    const cache = new Map();
    const MAX_CACHE_SIZE = 50;

    const fetchAnimeData = async (title, limit = SUGGESTIONS_LIMIT) => {
        if (!title) return [];
    
        try {
            if (cache.has(title)) {
                const cachedData = cache.get(title);
                setSuggestions(cachedData.slice(0, limit));
                return cachedData;
            }
    
            const response = await fetch(`http://localhost:5000/api/anime/${title}`);
            if (!response.ok) throw new Error(`Error fetching anime: ${response.statusText}`);
            const data = await response.json();
            const animeListData = data.data.map((anime) => ({
                title: anime.titles[0].title,
                imageUrl: anime.images.jpg.image_url,
            }));
            
            cache.set(title, animeListData);
            if (cache.size > MAX_CACHE_SIZE) {
                const oldestKey = cache.keys().next().value;
                cache.delete(oldestKey);
            }
    
            setSuggestions(animeListData.slice(0, limit));
            return animeListData; // Return data so it can be used in handleSearch
        } catch (err) {
            setError(err.message);
            return []; // Return an empty array on error
        }
    };
    

    const debouncedFetchAnimeData = useCallback(debounce((title) => {
        if (title) if (!title) return; fetchAnimeData(title);
    }, 300), []);

    const handleSearchChange = (e) => {
        const title = e.target.value.trim();
        setSearchTitle(title);
    
        if (title) {
            debouncedFetchAnimeData(title);
        } else {
            setSuggestions([]); // Clear suggestions when input is empty
            setError(null);
            debouncedFetchAnimeData.cancel(); // Cancel any pending search requests
        }
    };
    

    const handleSearch = async () => {
        if (!searchTitle) return;
    
        try {
            const results = cache.get(searchTitle) || await fetchAnimeData(searchTitle, Infinity);
            setAnimeList(results || []); // Set animeList with the fetched results
            setCurrentPage(1);
            setShowResults(true);
            setSuggestions([]);
        } catch (err) {
            console.error(err);
        }
    };
    

    const handlePageChange = (page) => setCurrentPage(page);

    const currentResults = animeList.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
    );

    return (
    <div className="background">
        
            <div className="yes">
                <input
                    className="search"
                    type="text"
                    placeholder="Enter anime title"
                    value={searchTitle}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search Anime</button>

                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.slice(0, SUGGESTIONS_LIMIT).map((anime, index) => (
                            <li key={index}>{anime.title}</li>
                        ))}
                    </ul>
                )}

                {showResults && (
                
                    <div id="no"> 
                        <div className="anime-list">
                            {currentResults.map((anime, index) => (
                                <AnimeBox key={index} title={anime.title} imageUrl={anime.imageUrl} />
                            ))}
                        </div>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(animeList.length / RESULTS_PER_PAGE) }, (_, i) => (
                                <button
                                    key={i}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='image'></div>
    </div>
    );
}

export default AnimeList;
