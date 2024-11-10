import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import AnimeBox from '../Components/animebox';
import AnimeInfo from './animeInfo';
import './animelis.css';

function AnimeList() {
    const [animeList, setAnimeList] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnime, setSelectedAnime] = useState(null); // New state for selected anime
    const RESULTS_PER_PAGE = 22;
    const cache = new Map();
    const MAX_CACHE_SIZE = 50;

    const fetchAnimeData = async (title, limit = 10) => {
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
                description: anime.synopsis,
                studio: anime.studios?.[0]?.name || 'Unknown',
                episodes: anime.episodes,
                score: anime.score,
                releaseDate: anime.aired.from ? new Date(anime.aired.from).toDateString() : 'Unknown'
            }));

            cache.set(title, animeListData);
            if (cache.size > MAX_CACHE_SIZE) {
                const oldestKey = cache.keys().next().value;
                cache.delete(oldestKey);
            }

            setSuggestions(animeListData.slice(0, limit));
            return animeListData;
        } catch (err) {
            setError(err.message);
            return [];
        }
    };

    const debouncedFetchAnimeData = useCallback(
        debounce((title) => {
            if (title) fetchAnimeData(title);
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const title = e.target.value;
        setSearchTitle(title);

        if (title) {
            debouncedFetchAnimeData(title);
        } else {
            setSuggestions([]);
            setError(null);
            debouncedFetchAnimeData.cancel();
        }
    };

    const handleSearch = async () => {
        if (!searchTitle) return;

        try {
            const results = cache.get(searchTitle) || await fetchAnimeData(searchTitle, Infinity);
            setAnimeList(results || []);
            setCurrentPage(1);
            setSuggestions([]); // Clear suggestions when search is finalized
        } catch (err) {
            console.error(err);
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const handleAnimeClick = (anime) => {
        console.log("click");
        setSelectedAnime(anime); // Set selected anime to display in AnimeInfo
    };

    const handleCloseInfo = () => {
        setSelectedAnime(null); // Clear selected anime to close AnimeInfo
    };

    const currentResults = animeList.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
    );

    return (
        <div className="background">
            <div className="yes">
                <div className="search-container" style={{ position: 'relative' }}>
                    <input
                        className="search"
                        type="text"
                        placeholder="Enter anime title"
                        value={searchTitle}
                        onChange={handleSearchChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <button onClick={handleSearch}>Search Anime</button>

                    {suggestions.length > 0 && isFocused && (
                        <ul className="suggestions show">
                            {suggestions.slice(0, 10).map((anime, index) => (
                                <li key={index} onClick={() => setSearchTitle(anime.title)}>
                                    {anime.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div id="no">
                    <div className="anime-list">
                        {currentResults.map((anime, index) => (
                            <AnimeBox
                                key={index}
                                title={anime.title}
                                imageUrl={anime.imageUrl}
                                onClick={() => handleAnimeClick(anime)} // Handle click to open AnimeInfo
                            />
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

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='image'></div>
            {selectedAnime && <AnimeInfo anime={selectedAnime} onClose={handleCloseInfo} />}
        </div>
    );
}

export default AnimeList;
