// LikedAnimesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeBox from "../Components/animebox"; // Import AnimeBox component
import "./LikedAnimePage.css";

function LikedAnimesPage() {
    const [likedAnimes, setLikedAnimes] = useState([]);
    const [userid, setUserid] = useState(null);

    useEffect(() => {
        // Fetch the current session user ID
        const fetchUserId = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user", { withCredentials: true });
                setUserid(response.data.userId);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        // Fetch liked animes for the logged-in user
        const fetchLikedAnimes = async () => {
            if (!userid) return;

            try {
                // Fetch the list of liked anime IDs from the database
                const response = await axios.get(`http://localhost:5000/likes/${userid}`, { withCredentials: true });
                const likedAnimeIds = response.data.map(item => item.mal_id);

                // Fetch anime details from Jikan API for each mal_id
                const animeDetailsPromises = likedAnimeIds.map(id =>
                    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
                );

                const animeDetailsResponses = await Promise.all(animeDetailsPromises);
                const animeDetails = animeDetailsResponses.map(response => response.data.data);

                setLikedAnimes(animeDetails);
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
                    {likedAnimes.map((anime) => (
                        <AnimeBox
                            key={anime.mal_id}
                            title={anime.title}
                            imageUrl={anime.images.jpg.image_url}
                            onClick={() => console.log(`Selected: ${anime.title}`)} // Example onClick action
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default LikedAnimesPage;
