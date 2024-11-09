import React from "react";
import "./animebox.css";
function AnimeBox({ title, imageUrl }) {
    return(
        <div className="anime-box">
            <h2>P{title}</h2>
            <img src={imageUrl} alt={`${title}`} />
        </div>
    );
}

export default AnimeBox;