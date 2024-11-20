import React, { useEffect, useState } from "react";
import axios from "axios";
import "./reco.css";

function Reco() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userid, setUserid] = useState(null);

    // Utility function for delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
            const likedAnimeResponse = await axios.get(
                `http://localhost:5000/likes/${userid}`,
                { withCredentials: true }
            );
            const likedAnimeData = likedAnimeResponse.data;
    
            const animeDetailsPromises = likedAnimeData.map(async (item) => {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${item.mal_id}`);
                return {
                    title: response.data.data.title,
                    passage: item.passage,
                };
            });
    
            const animeDetails = await Promise.all(animeDetailsPromises);
    
            const animeTitlesWithPassages = animeDetails.map(
                (anime) => `${anime.title}: ${anime.passage}`
            );
    
            const geminiResponse = await axios.post(
                "http://localhost:5000/api/gemini",
                { animeTitles: animeTitlesWithPassages, feedback: "User liked these titles for the given reasons" },
                { withCredentials: true }
            );
    
            // Ensure response contains a valid recommendations array
            const { recommendations } = geminiResponse.data;
            if (!Array.isArray(recommendations)) {
                console.error("Gemini API did not return a valid recommendations array:", geminiResponse.data);
                throw new Error("Invalid recommendations format.");
            }
    
            console.log("Recommendations from Gemini:", recommendations);
    
            // Fetch additional details for these recommendations
            await fetchPrimaryAnimeDetails(recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error.message || error);
            alert("Unable to fetch recommendations. Please try again later.");
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
    
                await delay(1000); // Add delay to respect API rate limits
    
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
    

    const handleAddToWishlist = async (mal_id) => {
        try {
            await axios.post("http://localhost:5000/wishlist", { userid, mal_id }, { withCredentials: true });
            alert("Anime added to wishlist!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            alert("Failed to add anime to wishlist.");
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
                    <img id="nez" src="/load.gif" alt="Loading" />
                    <p>Loading recommendations...</p>
                </div>
            ) : (
                <div id="recommendation-list">
                    {recommendations.map((anime, index) => (
                        <div className="recommendation-section" key={index}>
                            <div className="recommendation-content">
                                <div className="anime-image-container">
                                    <img
                                        className="anime-image"
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                    />
                                    <h3 className="anime-title">{anime.title}</h3>
                                </div>
                                <div className="anime-description">
                                    <p>{anime.synopsis || "No description available."}</p>
                                </div>
                                <div className="anime-actions">
                                    <button onClick={() => handleAddToWishlist(anime.mal_id)}>Add to Wishlist</button>
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
