// reco.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeBox from "../Components/animebox";

function Reco() {
    const [likedAnimes, setLikedAnimes] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [recommendedAnimeDetails, setRecommendedAnimeDetails] = useState([]);
    const [userid, setUserid] = useState(null);

    // Fetch the current session user ID
    useEffect(() => {
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

    // Fetch liked animes for the logged-in user and their details from Jikan
    useEffect(() => {
        const fetchLikedAnimes = async () => {
            if (!userid) return;

            try {
                const response = await axios.get(`http://localhost:5000/likes/${userid}`, { withCredentials: true });
                const likedAnimeIds = response.data.map(item => item.mal_id);

                // Fetch anime details from Jikan API for each mal_id
                const animeDetailsPromises = likedAnimeIds.map(id =>
                    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
                );

                const animeDetailsResponses = await Promise.all(animeDetailsPromises);
                const animeDetails = animeDetailsResponses.map(response => response.data.data);

                setLikedAnimes(animeDetails);

                // Extract anime names to send to Gemini AI
                const animeNames = animeDetails.map(anime => anime.title);
                fetchRecommendations(animeNames);
            } catch (error) {
                console.error("Error fetching liked animes:", error);
            }
        };

        fetchLikedAnimes();
    }, [userid]);

    // Fetch recommendations from Gemini AI based on liked anime names
    const fetchRecommendations = async (animeNames) => {
        try {
            const response = await axios.post("http://localhost:5000/api/gemini", 
                { animeTitles: animeNames, feedback: "User liked these titles" }, 
                { withCredentials: true }
            );

            // Log the raw response string to the console for debugging
            console.log("Raw response from Gemini:", response.data.recommendations);

            const recommendedTitles = response.data.recommendations.split("\n").filter(title => title.trim() !== "");
            setRecommendations(recommendedTitles);

            // Fetch details for each recommended anime from Jikan API
            fetchRecommendedAnimeDetails(recommendedTitles);
        } catch (error) {
            console.error("Error fetching recommendations:", error);

            if (error.response && error.response.data) {
                console.error("Gemini API Error Response:", error.response.data);
            }
        }
    };

    // Fetch anime details for recommended titles from Jikan
    const fetchRecommendedAnimeDetails = async (recommendedTitles) => {
        try {
            const animeDetailsPromises = recommendedTitles.map(title =>
                axios.get(`https://api.jikan.moe/v4/anime?q=${title}&limit=25`)
            );

            const animeDetailsResponses = await Promise.all(animeDetailsPromises);
            const detailedAnimes = animeDetailsResponses
                .flatMap(response => response.data.data) // Flatten to combine multiple results for each title
                .filter(anime => anime); // Filter out any undefined results

            setRecommendedAnimeDetails(detailedAnimes);
        } catch (error) {
            console.error("Error fetching recommended anime details from Jikan:", error);
        }
    };

    return (
        <div className="reco-page">
            <h2>Your Liked Animes</h2>
            {likedAnimes.length === 0 ? (
                <p>No liked animes yet.</p>
            ) : (
                <div className="anime-list">
                    {likedAnimes.map((anime) => (
                        <AnimeBox
                            key={anime.mal_id}
                            title={anime.title}
                            imageUrl={anime.images.jpg.image_url}
                            onClick={() => console.log(`Selected: ${anime.title}`)}
                        />
                    ))}
                </div>
            )}

            <h2>Recommended Animes</h2>
            {recommendedAnimeDetails.length === 0 ? (
                <p>No recommendations yet.</p>
            ) : (
                <div className="anime-list">
                    {recommendedAnimeDetails.map((anime, index) => (
                        <AnimeBox
                            key={anime.mal_id || index} 
                            title={anime.title}
                            imageUrl={anime.images.jpg.image_url || "https://via.placeholder.com/150"}
                            onClick={() => console.log(`Recommended: ${anime.title}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Reco;
