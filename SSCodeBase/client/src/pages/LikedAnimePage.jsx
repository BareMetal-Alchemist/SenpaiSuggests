// LikedAnimesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LikedAnimesPage.css";

function LikedAnimesPage() {
    const [likedAnimes, setLikedAnimes] = useState([]);
    const userid = 1;

    useEffect(() => {
        const fetchLikedAnimes = async () => {
            try {
                const response = await axios.get(`/likes/${userid}`);
                setLikedAnimes(response.data);
            } catch (error) {
                console.error("Error fetching liked animes:", error);
            }
        };

        fetchLikedAnimes();
    }, [userid]);

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
