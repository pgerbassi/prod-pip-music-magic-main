import { useEffect, useRef, useState } from 'react';
import { useMouse } from 'react-use';
import { motion } from 'framer-motion';

const NUM_PARTICLES = 40;

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

interface MusicVisualizerProps {
  audioData?: number[];
}

export const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ audioData = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { docX: mouseX, docY: mouseY } = useMouse();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const initialParticles: Particle[] = Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      }
    }));

    setParticles(initialParticles);

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.velocity.x;
          let newY = particle.y + particle.velocity.y;

          // Bounce off walls
          if (newX < 0 || newX > width) particle.velocity.x *= -1;
          if (newY < 0 || newY > height) particle.velocity.y *= -1;

          // Mouse interaction
          if (mouseX && mouseY) {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const angle = Math.atan2(dy, dx);
              particle.velocity.x -= Math.cos(angle) * 0.5;
              particle.velocity.y -= Math.sin(angle) * 0.5;
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            velocity: {
              x: particle.velocity.x * 0.99,
              y: particle.velocity.y * 0.99
            }
          };
        })
      );

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </div>
  );
};
