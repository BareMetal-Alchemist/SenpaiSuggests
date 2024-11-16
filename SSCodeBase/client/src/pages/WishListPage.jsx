import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimeBox from "../Components/animebox"; // Import AnimeBox component
import "./WishListPage.css";

function WishListPage() {
    const [wishlistAnimes, setWishlistAnimes] = useState([]);
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
        // Fetch wishlist animes for the logged-in user
        const fetchWishlistAnimes = async () => {
            if (!userid) return;

            try {
                // Fetch the list of wishlist anime IDs from the database
                const response = await axios.get(`http://localhost:5000/wishlist/${userid}`, { withCredentials: true });
                const wishlistAnimeIds = response.data.map(item => item.mal_id);

                // Fetch anime details from Jikan API for each mal_id
                const animeDetailsPromises = wishlistAnimeIds.map(id =>
                    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
                );

                const animeDetailsResponses = await Promise.all(animeDetailsPromises);
                const animeDetails = animeDetailsResponses.map(response => response.data.data);

                setWishlistAnimes(animeDetails);
            } catch (error) {
                console.error("Error fetching wishlist animes:", error);
            }
        };

        fetchWishlistAnimes();
    }, [userid]);

    const handleRemoveFromWishlist = async (mal_id) => {
        try {
            await axios.delete(`http://localhost:5000/wishlist/${userid}/${mal_id}`, { withCredentials: true });
            setWishlistAnimes((prev) => prev.filter((anime) => anime.mal_id !== mal_id));
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            alert("Failed to remove anime from wishlist.");
        }
    };

    return (
        <div className="wishlist-animes-page">
            <h2>Wishlist</h2>
            {wishlistAnimes.length === 0 ? (
                <p>No animes in your wishlist yet.</p>
            ) : (
                <div className="wishlist-animes-list">
                    {wishlistAnimes.map((anime) => (
                        <div key={anime.mal_id} className="anime-item">
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div>
                                <h3>{anime.title}</h3>
                                <p>{anime.synopsis || "No description available."}</p>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveFromWishlist(anime.mal_id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishListPage;
