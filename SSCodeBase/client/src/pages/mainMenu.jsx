import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import p5 from 'p5';
import { parallaxSketch } from './parallaxSketch';
import './mainMenu.module.css';

function MainMenu() {
  useEffect(() => {
    const sketch = new p5(parallaxSketch, 'parallax-container');
    return () => sketch.remove();
  }, []);

  return (
    
      <div className={StyleSheet.parallaxCanvas}></div>
    
  );
}
export default MainMenu;
