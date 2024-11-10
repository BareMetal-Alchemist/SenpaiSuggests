import React, { useRef } from "react";
import "./animebox.css";
function AnimeBox({ title, imageUrl, onClick }) {
    const boxRef = useRef(null);

    const handleMouseMove = (e) => {
        const box = boxRef.current;
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        box.style.transform = `rotateY(${x * 0.1}deg) rotateX(${y * -0.1}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
        const box = boxRef.current;
        box.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`; // Reset on mouse leave
    };





    return(
        <div 
            className="anime-box"
            ref={boxRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <img src={imageUrl} alt={`${title}`} />
            <h2>{title}</h2>
            
        </div>
    );
}

export default AnimeBox;