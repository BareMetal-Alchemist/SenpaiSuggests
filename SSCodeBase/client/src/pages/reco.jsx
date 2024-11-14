import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeBox from "../Components/animebox";
import "./reco.css";

function Reco() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userid, setUserid] = useState(null);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            // Step 1: Fetch liked animes with passages
            const likedAnimeResponse = await axios.get(`http://localhost:5000/likes/${userid}`, { withCredentials: true });
            const likedAnimeData = likedAnimeResponse.data; // Each item includes mal_id and passage

            // Step 2: Fetch anime titles based on mal_id
            const animeDetailsPromises = likedAnimeData.map(async (item) => {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${item.mal_id}`);
                return {
                    title: response.data.data.title,
                    passage: item.passage
                };
            });

            const animeDetails = await Promise.all(animeDetailsPromises);

            // Step 3: Prepare data for Gemini prompt (title + passage)
            const animeTitlesWithPassages = animeDetails.map(anime => `${anime.title}: ${anime.passage}`);

            // Step 4: Send anime titles and passages to Gemini
            const geminiResponse = await axios.post("http://localhost:5000/api/gemini", 
                { animeTitles: animeTitlesWithPassages, feedback: "User liked these titles for the given reasons" },
                { withCredentials: true }
            );

            // Parse the response and fetch anime details for each recommendation
            const recommendationsList = JSON.parse(geminiResponse.data.recommendations);
            await fetchPrimaryAnimeDetails(recommendationsList);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrimaryAnimeDetails = async (recommendationTitles) => {
        try {
            const uniqueTitles = new Set();
            const filteredDetails = [];

            for (const title of recommendationTitles) {
                if (uniqueTitles.size >= 10) break;

                await delay(500); // Add delay to avoid hitting API rate limit

                const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}&sfw=true`);

                const mainEntry = searchResponse.data.data.find(anime =>
                    !anime.title.toLowerCase().includes("season") &&
                    !anime.title.toLowerCase().includes("part") &&
                    !anime.title.toLowerCase().includes("ova") &&
                    !anime.title.toLowerCase().includes("special")
                ) || searchResponse.data.data[0];

                if (mainEntry && !uniqueTitles.has(mainEntry.title)) {
                    uniqueTitles.add(mainEntry.title);
                    filteredDetails.push(mainEntry);
                }
            }

            setRecommendations(filteredDetails);
            localStorage.setItem("recommendations", JSON.stringify(filteredDetails));
        } catch (error) {
            console.error("Error fetching primary anime details:", error);
        }
    };

    return (
        <div id="reco-wrapper">
            <h2 id="reco-title">Anime Recommendations</h2>
            <button onClick={fetchRecommendations} id="reco-button">
                Get New Recommendations
            </button>
            {loading ? (
                <div id="loading-screen">
                    <img id ="nez" src = "/load.gif"></img>
                    <p>Loading recommendations...</p>
                    
                </div>
            ) : (
                <div id="recommendation-list">
                    {recommendations.map((anime, index) => (
                        <div className="recommendation-section" key={index}>
                            
                            <div className="recommendation-content">
                                <div className="anime-image-container">
                                    <img className="anime-image" src={anime.images.jpg.image_url} alt={anime.title} />
                                    <h3 className="anime-title">{anime.title}</h3>
                                </div>
                                <div className="anime-description">
                                    <p>{anime.synopsis || "No description available."}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Reco;
