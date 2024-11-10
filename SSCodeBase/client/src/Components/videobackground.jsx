// src/components/VideoBackground.js

import React from 'react';
import './videobackground.css';

function VideoBackground() {
  return (
    <video autoPlay muted loop playsInline className="video">
      <source src="../../anime.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoBackground;
