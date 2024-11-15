// animeInfo.jsx
import React from "react";
import axios from "axios";
import "./animeInfo.css";

function AnimeInfo({ anime, userid, onClose }) {
    if (!anime) return null;

    const handleAddToLiked = async () => {
        try {
            
            await axios.post("/likes", {
                userid,   
                mal_id: anime.mal_id  
            });
            alert("Anime added to your liked list!");
        } catch (error) {
            console.error("Error adding anime to liked list:", error);
            alert("Failed to add anime to liked list.");
        }
    };

    // REPLACE WITH SQL STUFF...
    const handleAddToWishList = () => {
        const wishList = JSON.parse(localStorage.getItem("wishList")) || [];

        if (!wishList.find(elem => elem.title === anime.title)) {
          wishList.push(anime);
          localStorage.setItem("wishList", JSON.stringify(wishList));
        }
    }
    // ...yeah. ;-;

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
                    <button className="like-button" onClick={handleAddToLiked}>Add to Liked Animes</button>
                    <button className="like-button" onClick={handleAddToWishList}>Add to Wish List</button>
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;
