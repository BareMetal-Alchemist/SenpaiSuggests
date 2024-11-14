import React, { useState } from 'react';
import styles from './aboutUs.module.css';

import member1 from './member1.jpg';
import member2 from './member2.png';
import member3 from './member3.jpg';

const TeamMember = ({ name, image, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.teamMember}>
            <img src={image} alt={`${name} profile`} className={styles.profilePic} />
            <div className={styles.memberInfo}>
                <h3>{name}</h3>
                <p>
                    {isExpanded ? description : `${description.substring(0, 100)}...`}
                    <button onClick={toggleDescription} className={styles.readMoreBtn}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const AboutUs = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.description}>
                <h1>About Senpai Suggests</h1>
                <p>
                    Senpai Suggests is a platform dedicated to anime lovers, providing personalized recommendations
                    and allowing users to explore new shows based on their interests. Our goal is to create a fun and
                    engaging experience where every user can discover anime they'll love.
                </p>
            </div>

            <div className={styles.teamSection}>
                <h2>Meet the Team</h2>
                <div className={styles.teamContainer}>
                    <TeamMember
                        name="Avyakt Rout"
                        image={member1}
                        description="Hi, I’m Avyakt Rout, a third-year Computer Science student at Cal State University, Fullerton. I’m working toward a career as a software engineer, with a strong foundation in C++, HTML, CSS, and JavaScript. In this project, I took the opportunity to deepen my skills in React, which I’m currently learning, and got hands-on experience building with it. This project has been a great way to work across the front-end, and it’s been really rewarding to see the team’s hard work pay off as we picked up new skills together and built something we’re all proud of."
                    />
                    <TeamMember
                        name="Quentin Rivest"
                        image={member2}
                        description="Hi! I’m a second-year Computer Science major at Cal State University, Fullerton and aspiring Software Engineer. The language I have most experience in is C++, so getting familiar with JSX and HTML/CSS with React as my first exposure to front-end development has been a really fun, new experience for me! I feel lucky that I got to work with an amazing, talented team for this project, and learned a lot during this journey."
                    />
                    <TeamMember
                        name="Noah Scott"
                        image={member3}
                        description="Hey, I’m Noah Scott, a third-year Computer Science major at Cal State University, Fullerton. I’m aiming to build a career in cybersecurity, with a particular interest in web and application security. I’m comfortable working with HTML, CSS, JavaScript, and SQL. While I’ve previously used PHP for server-side SQL queries, I took this project as a chance to dive into Express.js instead, which has been both a fun and insightful experience. I handled both the back-end and front-end for this project, giving me the chance to deepen my skills with React, Express, APIs, and reproducible Nix environments. Though I’ve got a background in web development, this project truly came together thanks to my team, who picked up new skills at an impressive pace—I’m genuinely proud of what we’ve accomplished together."
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
