import p5 from 'p5';

export const parallaxSketch = (p) => {
    let layers = [];
    let speed = 0.2;
    let animeFont;
    let sections = [];
    let scrollOffset = 0; // Current scroll position
    let targetScrollOffset = 0; // Target scroll position for smooth scrolling
    let maxScroll; // Maximum scroll offset
    let totalContentHeight; // Total height of the content

    p.preload = () => {
        animeFont = p.loadFont('/animeFont.ttf');
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Initialize layers
        for (let i = 0; i < 10; i++) {
            layers.push({
                x: p.random(p.width),
                y: p.random(p.height * 6), // Adjust for total content height
                size: p.random(50, 200),
                speed: speed + i * 0.05
            });
        }

        // Adjust section positions
        let sectionSpacing = p.height; // Space between sections
        let startY = p.height + 200; // Added 200 pixels of extra space below the title

        sections = [
            { text: "It's Not the Genre, It's the Journey", desc: "We understand the signficance of personalized recommendations", y: startY },
            { text: "Tell Us Your Journey", desc: "Head to search, find some of your favorites, and tell us what you loved!", y: startY + sectionSpacing },
            { text: "Ask Senpai", desc: "Using the Gemini API, Senpai analyzes your list of likes and your input to offer personalized recommendations!", y: startY + sectionSpacing * 2 },
            { text: "The Friends We Made Along the Way", desc: "Add anime from Senpai's reccomendations to your wishlist to save for later!", y: startY + sectionSpacing * 3 },
            { text: "Enjoy", desc: "Enjoy your new watch list personalized watchlist!", y: startY + sectionSpacing * 4 },
            { text: "", desc: "", y: startY + sectionSpacing * 5 }
        ];

        totalContentHeight = startY + sectionSpacing * (sections.length - 1);
        maxScroll = totalContentHeight - p.height;
    };

    p.draw = () => {
        p.background(255, 255, 255);
        p.noStroke();

        // Smooth scrolling implementation
        let scrollSpeed = 0.1; // Adjust for smoother or faster easing
        scrollOffset += (targetScrollOffset - scrollOffset) * scrollSpeed;

        // Parallax effect: Moving bubbles
        layers.forEach(layer => {
            p.fill(255, 108, 180, 150);
            let parallaxFactor = layer.speed / 2;
            let layerY = layer.y - scrollOffset * parallaxFactor;

            // Wrap around vertically
            if (layerY < -layer.size) {
                layerY = totalContentHeight + layer.size;
            } else if (layerY > totalContentHeight + layer.size) {
                layerY = -layer.size;
            }
            p.circle(layer.x, layerY, layer.size);

            layer.x += layer.speed;
            if (layer.x > p.width + layer.size) {
                layer.x = -layer.size;
            }
        });

        // Text sections with anime font
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(animeFont);

        // Welcome Message
        p.textSize(72);
        p.fill(255, 105, 180);
        p.text("Welcome to Senpai Suggests", p.width / 2, p.height / 2 - scrollOffset);

        // Display sections
        sections.forEach((section) => {
            let sectionY = section.y - scrollOffset;
            // Only draw if within the visible canvas area
            if (sectionY > -100 && sectionY < p.height + 100) {
                p.textSize(48);
                p.text(section.text, p.width / 2, sectionY);
                p.textSize(24);
                p.text(section.desc, p.width / 2, sectionY + 40);
            }
        });
    };

    p.mouseWheel = (event) => {
        // Adjust scroll sensitivity
        let scrollSensitivity = 0.5; // Reduce to make scrolling less sensitive
        targetScrollOffset += event.delta * scrollSensitivity;
        // Constrain targetScrollOffset to prevent scrolling beyond content
        targetScrollOffset = p.constrain(targetScrollOffset, 0, maxScroll);
        // Prevent default behavior
        return false;
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // Recalculate positions if needed
    };
};
