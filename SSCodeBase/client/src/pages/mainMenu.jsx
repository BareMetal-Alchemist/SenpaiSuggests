import React, { useEffect } from 'react';
import p5 from 'p5';
import { parallaxSketch } from './parallaxSketch';
import styles from './mainMenu.module.css';

function MainMenu() {
    useEffect(() => {
        const sketch = new p5(parallaxSketch);
        return () => sketch.remove();
    }, []);

    return (
        
            <div className={styles.parallaxCanvas}>
              </div> 
            
       
    );
}

export default MainMenu;
