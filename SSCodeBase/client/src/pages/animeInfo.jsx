import React, { useEffect, useState } from "react";
import axios from "axios";
import "./animeInfo.css";

function AnimeInfo({ anime, onClose }) {
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        // Fetch userid from the server session
        const fetchUserId = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user", { withCredentials: true });
                setUserid(response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
                alert("User is not logged in.");
            }
        };

        fetchUserId();
    }, []);

    if (!anime) return null;

    const handleAddToLiked = async () => {
        if (!userid) {
            alert("User ID is not available. Please log in.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/likes", {
                userid,
                mal_id: anime.mal_id  
            }, {
                withCredentials: true
            });
            alert("Anime added to your liked list!");
        } catch (error) {
            console.error("Error adding anime to liked list:", error);
            alert("Failed to add anime to liked list.");
        }
    };

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
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;
