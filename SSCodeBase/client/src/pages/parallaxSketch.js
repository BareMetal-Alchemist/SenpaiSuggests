import p5 from 'p5';

export const parallaxSketch = (p) => {
    let layers = [];
    let speed = 0.2;
    let animeFont;

    p.preload = () => {
        animeFont = p.loadFont('/animeFont.ttf');
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, 6000); // Increase canvas height 
        for (let i = 0; i < 10; i++) {
            layers.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: p.random(50, 200),
                speed: speed + i * 0.05
            });
        }
    };

    p.draw = () => {
        p.background(255, 255, 255);
        p.noStroke();

        // Parallax effect: Moving bubbles
        layers.forEach(layer => {
            p.fill(255, 108, 180, 150);
            p.circle(layer.x, layer.y, layer.size);
            layer.x += layer.speed;
            if (layer.x > p.width) {
                layer.x = -layer.size;
                layer.y = p.random(p.height);
            }
        });

        // Text sections with anime font
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(animeFont);

        // Welcome Message
        p.textSize(72);
        p.fill(255, 105, 180);
        p.text("Welcome to Senpai Suggests", p.width / 2, p.height / 8);

        // Sections appearing with scroll
        const sections = [
            { text: "My Likes", desc: "This will take you to the liked animes that you chose!", y: p.height * 0.3 },
            { text: "My Wishlist", desc: "This is where you can add animes to your wishlist!", y: p.height * 0.6 },
            { text: "I'm Feeling Lucky", desc: "Let Senpai Suggest a random anime for you!", y: p.height * 0.9 },
            { text: "Search", desc: "If you want to browse around!", y: p.height * 1.2 },
            { text: "Ask SenpAI", desc: "Get recommendations from Senpai!", y: p.height * 1.5 },
            { text: "About Us", desc: "Learn more about the team behind Senpai Suggests.", y: p.height * 1.8 }
        ];
        

        // Loop through sections and display based on scroll position
        sections.forEach((section) => {
            if (window.scrollY > section.y - p.height / 4) {
                p.textSize(48);
                p.text(section.text, p.width / 2, section.y);
                p.textSize(24);
                p.text(section.desc, p.width / 2, section.y + 30);
            }
        });
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, 5000); // Ensure canvas adjusts on resize
    };
};
