import { useEffect, useState } from 'react';
import './Hero.css';
import catBattery from '../assets/cats/cat-battery.png';
import heart from '../assets/decorations/heart.png';
import star from '../assets/decorations/star.png';
import flower from '../assets/decorations/flower.png';
import strawberry from '../assets/decorations/strawberry.png';
import shootingStar from '../assets/decorations/shooting-star.png';

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingElements = [
    { src: heart, alt: 'heart' },
    { src: star, alt: 'star' },
    { src: flower, alt: 'flower' },
    { src: strawberry, alt: 'strawberry' },
    { src: heart, alt: 'heart' },
    { src: star, alt: 'star' },
  ];

  return (
    <section className="hero">
      <div className="floating-elements">
        {floatingElements.map((el, i) => (
          <img
            key={i}
            src={el.src}
            alt={el.alt}
            className="floating-el"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className={`hero-content ${mounted ? 'visible' : ''}`}>
        <img src={catBattery} alt="Cute cat" className="hero-cat" />
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">
          <span className="name-text">Jemimah Ra</span>
          <img src={shootingStar} alt="star" className="name-sparkle-img" />
        </h1>
        <p className="hero-tagline">
          Business Analytics and Information Systems Graduate & Aspiring Data Professional
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            <span>View My Work</span>
            <span className="btn-icon">→</span>
          </a>
          <a href="#contact" className="btn btn-secondary">
            Say Hello
            <img src={heart} alt="heart" className="btn-heart-img" />
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  );
}

export default Hero;
