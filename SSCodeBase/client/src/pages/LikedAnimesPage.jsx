// LikedAnimesPage.jsx
import React, { useEffect, useState } from "react";
import "./LikedAnimesPage.css";

function LikedAnimesPage() {
    const [likedAnimes, setLikedAnimes] = useState([]);

    useEffect(() => {
        const storedAnimes = JSON.parse(localStorage.getItem("likedAnimes")) || [];
        setLikedAnimes(storedAnimes);
    }, []);

    return (
        <div className="liked-animes-page">
            <h2>Liked Animes</h2>
            {likedAnimes.length === 0 ? (
                <p>No liked animes yet.</p>
            ) : (
                <div className="liked-animes-list">
                    {likedAnimes.map((anime, index) => (
                        <div key={index} className="anime-item">
                            <img src={anime.imageUrl} alt={anime.title} />
                            <div>
                                <h3>{anime.title}</h3>
                                <p>{anime.description || "No description available."}</p>
                            </div>
                      </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LikedAnimesPage;
