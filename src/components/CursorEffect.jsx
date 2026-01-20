import { useEffect, useState } from 'react';
import './CursorEffect.css';

function CursorEffect() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setParticles(prev => [...prev.slice(-20), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(1));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="cursor-effect">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="sparkle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default CursorEffect;
