import { useState, useEffect, useRef } from 'react';
import './Projects.css';
import catDonut from '../assets/cats/cat-donut.png';
import catCoffee from '../assets/cats/cat-coffee.png';
import catInCup from '../assets/cats/cat-in-cup.png';
import star from '../assets/decorations/star.png';
import shootingStar from '../assets/decorations/shooting-star.png';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const sectionRef = useRef(null);

  const handleStarClick = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Business Strategy Game',
      description: 'Led a simulated global footwear company through strategic decisions. Ranked in Top Global Percentile for overall performance, EPS, and stock price.',
      tags: ['Strategic Analysis', 'Forecasting', 'Finance'],
      color: '#ff69b4',
      image: catDonut,
    },
    {
      title: 'Sound Lighting Pros Inc.',
      description: 'Full systems analysis identifying bottlenecks and inefficiencies. Created ERD, DFDs, use cases, and a functional UI prototype for a scalable database solution.',
      tags: ['Systems Design', 'SQL', 'UI Prototyping'],
      color: '#ff85c0',
      image: catCoffee,
    },
    {
      title: 'QA Engineering @ Cupix',
      description: 'Reviewed and validated large 3D datasets for accuracy. Prepared technical documentation and quality reports for internal and external partners.',
      tags: ['Quality Assurance', 'Data Validation', 'Documentation'],
      color: '#ffa0d0',
      image: catInCup,
    },
  ];

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="section-title">
          <img
            src={star}
            alt="star"
            className="title-icon-img clickable"
            onClick={handleStarClick}
          />
          My Projects
          {showHint && <span className="party-hint">psst... try typing "party"</span>}
        </h2>

        <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} shootingStar={shootingStar} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, shootingStar }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`project-card ${isFlipped ? 'flipped' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={project.image} alt={project.title} className="project-image" />
          <div className="card-front-overlay">
            <h3>{project.title}</h3>
            <p className="flip-hint">Click to flip <img src={shootingStar} alt="star" className="flip-star" /></p>
          </div>
        </div>
        <div className="card-back">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="project-links">
            <a href="#" className="project-link" onClick={(e) => e.stopPropagation()}>
              View Project →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
