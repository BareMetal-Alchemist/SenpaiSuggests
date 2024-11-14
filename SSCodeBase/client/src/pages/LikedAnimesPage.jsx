import React, { useEffect, useState } from "react";
import "./likeAnimesPage.css";

function LikedAnimesPage() {
    const [likedAnimes, setLikedAnimes] = useState([]);
    const [expandedAnime, setExpandedAnime] = useState(null); // Track which anime's description is expanded

    useEffect(() => {
        const storedAnimes = JSON.parse(localStorage.getItem("likedAnimes")) || [];
        setLikedAnimes(storedAnimes);
    }, []);

    const handleReadMore = (index) => {
        if (expandedAnime === index) {
            setExpandedAnime(null); // Close the description if it's already open
        } else {
            setExpandedAnime(index); // Open the description
        }
    };

    return (
        <div className="liked-animes-page">
            <div className="description">
                <h1>Liked Animes</h1>
                {likedAnimes.length === 0 ? (
                    <p>No liked animes yet.</p>
                ) : (
                    <div className="liked-animes-list">
                        {likedAnimes.map((anime, index) => (
                            <div key={index} className="anime-item">
                                <img src={anime.imageUrl} alt={anime.title} />
                                <div>
                                    <h3>{anime.title}</h3>
                                    <p>
                                        {expandedAnime === index
                                            ? anime.description // Show full description if expanded
                                            : anime.description?.substring(0, 100) + '...'} {/* Show truncated description */}
                                    </p>
                                </div>
                                <div className="read-more-container">
                                    <button
                                        className="read-more-btn"
                                        onClick={() => handleReadMore(index)}
                                    >
                                        {expandedAnime === index ? "Read Less" : "Read More"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LikedAnimesPage;
