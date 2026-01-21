import { useState, useEffect } from 'react';
import './EasterEgg.css';
import heart from '../assets/decorations/heart.png';
import star from '../assets/decorations/star.png';
import flower from '../assets/decorations/flower.png';
import strawberry from '../assets/decorations/strawberry.png';
import rainbow from '../assets/decorations/rainbow.png';
import pretzel from '../assets/decorations/pretzel.png';
import coffeePot from '../assets/decorations/coffee-pot.png';
import shootingStar from '../assets/decorations/shooting-star.png';

import catDonut from '../assets/cats/cat-donut.png';
import catCoffee from '../assets/cats/cat-coffee.png';
import catCupcake from '../assets/cats/cat-cupcake.png';
import catInCup from '../assets/cats/cat-in-cup.png';
import catInBox from '../assets/cats/cat-in-box.png';
import catDuck from '../assets/cats/cat-duck.png';
import catCroissant from '../assets/cats/cat-croissant.png';
import catRunning from '../assets/cats/cat-running.png';

function EasterEgg() {
  const [konami, setKonami] = useState([]);
  const [showKonamiEgg, setShowKonamiEgg] = useState(false);
  const [showLoveEgg, setShowLoveEgg] = useState(false);
  const [particles, setParticles] = useState([]);

  const [typedWord, setTypedWord] = useState('');
  const [showCatRain, setShowCatRain] = useState(false);
  const [catRainDrops, setCatRainDrops] = useState([]);

  const [showDisco, setShowDisco] = useState(false);

  const decorations = [heart, star, flower, strawberry, rainbow, pretzel, coffeePot];
  const cats = [catDonut, catCoffee, catCupcake, catInCup, catInBox, catDuck, catCroissant, catRunning];

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Konami code detection
      const newKonami = [...konami, e.code].slice(-10);
      setKonami(newKonami);

      if (newKonami.join(',') === konamiCode.join(',')) {
        triggerKonamiEgg();
        setKonami([]);
      }

      // Secret word detection
      const key = e.key.toLowerCase();
      if (key.length === 1 && key.match(/[a-z]/)) {
        const newWord = (typedWord + key).slice(-10);
        setTypedWord(newWord);

        // Type "meow" for cat rain
        if (newWord.endsWith('meow')) {
          triggerCatRain();
          setTypedWord('');
        }

        // Type "party" for disco mode
        if (newWord.endsWith('party')) {
          triggerDisco();
          setTypedWord('');
        }

        // Type "love" for heart explosion
        if (newWord.endsWith('love')) {
          triggerHeartExplosion();
          setTypedWord('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami, typedWord]);

  const triggerKonamiEgg = () => {
    setShowKonamiEgg(true);

    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 40 + 20,
        delay: Math.random() * 0.5,
        decoration: decorations[Math.floor(Math.random() * decorations.length)],
      });
    }
    setParticles(newParticles);

    setTimeout(() => {
      setShowKonamiEgg(false);
      setParticles([]);
    }, 4000);
  };

  const triggerCatRain = () => {
    setShowCatRain(true);

    const drops = [];
    for (let i = 0; i < 30; i++) {
      drops.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        cat: cats[Math.floor(Math.random() * cats.length)],
      });
    }
    setCatRainDrops(drops);

    setTimeout(() => {
      setShowCatRain(false);
      setCatRainDrops([]);
    }, 5000);
  };

  const triggerDisco = () => {
    setShowDisco(true);
    setTimeout(() => setShowDisco(false), 5000);
  };

  const triggerHeartExplosion = () => {
    setShowLoveEgg(true);

    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 300,
        size: Math.random() * 30 + 15,
        delay: Math.random() * 0.3,
        decoration: heart,
      });
    }
    setParticles(newParticles);

    setTimeout(() => {
      setShowLoveEgg(false);
      setParticles([]);
    }, 3000);
  };

  return (
    <>
      {/* Disco mode overlay */}
      {showDisco && (
        <>
          <div className="disco-overlay" />
          <div className="party-text">PARTY TIME</div>
        </>
      )}

      {/* Konami code easter egg */}
      {showKonamiEgg && (
        <div className="easter-egg">
          {particles.map((p) => (
            <img
              key={p.id}
              src={p.decoration}
              alt="decoration"
              className="egg-particle"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <div className="easter-egg-message">
            <img src={shootingStar} alt="shooting star" className="big-star-img" />
            <p>You found the secret! Good job &lt;3 Now can you find the rest?</p>
          </div>
        </div>
      )}

      {/* Love easter egg */}
      {showLoveEgg && (
        <div className="easter-egg">
          {particles.map((p) => (
            <img
              key={p.id}
              src={p.decoration}
              alt="decoration"
              className="egg-particle"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <div className="easter-egg-message">
            <img src={heart} alt="heart" className="big-star-img" />
            <p>You're so smart! I'm so proud of you~ Have an amazing day!</p>
          </div>
        </div>
      )}

      {/* Cat rain */}
      {showCatRain && (
        <div className="cat-rain">
          {catRainDrops.map((drop) => (
            <img
              key={drop.id}
              src={drop.cat}
              alt="cat"
              className="cat-drop"
              style={{
                left: `${drop.x}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default EasterEgg;
