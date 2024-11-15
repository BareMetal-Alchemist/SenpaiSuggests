import React, { useEffect } from "react";
import "./testmenu.css";
import p5 from 'p5';
import { parallaxSketch } from './parallaxSketch';

function TestMenu() {
    useEffect(() => {
        const sketch = new p5(parallaxSketch, document.getElementById("parallaxCanvas"));
        return () => sketch.remove();
    }, []);

    return (
        <div className="parallaxContainer"></div>
    );
}

export default TestMenu;
