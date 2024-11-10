// AnimeInfo.js
import React from "react";
import "./animeInfo.css";

function AnimeInfo({ anime, onClose }) {
    if (!anime) return null;

    return (
        <div className="anime-info-overlay">
            <button className="close-button" onClick={onClose}>✕</button>
            <div className="anime-info-content">
                <div className="anime-info-image">
                    <img src={anime.imageUrl} alt={anime.title} />
                </div>
                <div className="anime-info-details">
                    <h2 className="anime-info-title">{anime.title}</h2>
                    <p className="anime-description">{anime.description || "No description available."}</p>
                    <p><strong>Studio:</strong> {anime.studio || "Unknown"}</p>
                    <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
                    <p><strong>Score:</strong> {anime.score || "N/A"}</p>
                    <p><strong>Release Date:</strong> {anime.releaseDate || "Unknown"}</p>
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;
