import { useEffect, useRef, useState } from 'react';
import './About.css';
import catDuck from '../assets/cats/cat-duck.png';
import flower from '../assets/decorations/flower.png';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const sectionRef = useRef(null);

  const handleFlowerClick = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Optimistic', level: 100 },
    { name: 'Excel (Advanced)', level: 90 },
    { name: 'SQL & Databases', level: 85 },
    { name: 'Tableau', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'HTML/CSS', level: 78 },
    { name: 'Data Analysis', level: 88 },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className={`about-container ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">
          <img
            src={flower}
            alt="flower"
            className="title-icon-img clickable"
            onClick={handleFlowerClick}
          />
          About Me
          {showHint && <span className="meow-hint">psst... try typing "meow"</span>}
        </h2>

        <div className="about-content">
          <div className="about-text">
            <div className="about-image-container">
              <img src={catDuck} alt="Cute cat with duck" className="about-cat" />
            </div>
            <p>
              Hi there! I'm a recent graduate from Texas A&M University-Corpus Christi
              with a BBA in Business Analytics & Information Systems. I'm passionate
              about turning data into actionable insights and building efficient systems.
            </p>
            <p>
              With experience in quality assurance, auditing, and data analysis, I love
              solving complex problems. When I'm not working with data, you can find me
              playing violin or piano, crocheting, playing tennis, or enjoying a good matcha!
            </p>
          </div>

          <div className="skills-section">
            <h3>My Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
