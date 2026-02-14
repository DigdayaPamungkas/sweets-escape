import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  emoji: string;
}

const COLORS = [
  "hsl(330 70% 60%)",
  "hsl(280 50% 55%)",
  "hsl(330 80% 75%)",
  "hsl(300 60% 75%)",
  "hsl(350 80% 65%)",
];

const EMOJIS = ["❤️", "💖", "💕", "✨", "🎊", "💝", "🌸", "💗"];

const ConfettiExplosion = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const p: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 24 + 12,
      delay: Math.random() * 2,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles(p);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animation: `confetti-fall ${Math.random() * 3 + 2}s ease-in ${p.delay}s forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default ConfettiExplosion;
