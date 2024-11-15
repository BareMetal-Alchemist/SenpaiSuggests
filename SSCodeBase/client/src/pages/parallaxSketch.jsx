export const parallaxSketch = (p) => {
    let bubbles = [];
    const sections = [
        { title: "Welcome to Anime World", description: "Discover anime recommendations tailored to your preferences." },
        { title: "Like an Anime", description: "Add anime to your liked list and share why you loved them." },
        { title: "Get Recommendations", description: "Receive personalized anime recommendations based on your likes." },
        { title: "Explore & Enjoy", description: "Embark on your anime journey and find your next favorite show." }
    ];

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight * sections.length);
        createBubbles();
    };

    p.draw = () => {
        p.clear();
        drawBubbles();
        drawSections();
    };

    function createBubbles() {
        for (let i = 0; i < 50; i++) {
            bubbles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                size: p.random(10, 30),
                speed: p.random(0.5, 1.5)
            });
        }
    }

    function drawBubbles() {
        p.noStroke();
        bubbles.forEach(bubble => {
            bubble.y += bubble.speed;
            if (bubble.y > p.height) bubble.y = 0;

            p.fill(255, 182, 193, 150); // Light pink color
            p.ellipse(bubble.x, bubble.y, bubble.size);

            // Parallax effect for bubbles based on scroll position
            bubble.x += (p.mouseX - p.width / 2) * 0.001;
            bubble.y += (p.mouseY - p.height / 2) * 0.001;
        });
    }

    function drawSections() {
        const scrollOffset = p.map(p.mouseY, 0, p.height, 0, sections.length * p.height);

        sections.forEach((section, index) => {
            const sectionY = index * p.height;

            // Check if section is within the current viewport
            if (scrollOffset > sectionY - p.height && scrollOffset < sectionY + p.height) {
                p.push();
                p.translate(p.width / 2, sectionY + p.height / 2);

                // Title in bright pink
                p.fill(255, 105, 180); // Hot pink color
                p.textSize(32);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(section.title, 0, -20);

                // Description in a lighter pink
                p.textSize(16);
                p.fill(255, 182, 193); // Light pink color
                p.text(section.description, 0, 20, p.width * 0.7); // Wrap text to 70% of screen width
                p.pop();
            }
        });
    }

    // Resize canvas on window resize
    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight * sections.length);
    };
};
