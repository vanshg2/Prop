import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💖", "🌸", "✨", "💕", "💘", "🌸", "🌹"];

export default function FloatingHearts() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate static list of random floating elements to avoid server hydration issues or constant recreation
    const initialItems = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across the screen
      size: Math.random() * 24 + 12, // 12px to 36px
      duration: Math.random() * 12 + 8, // 8s to 20s
      delay: Math.random() * -15, // Negative delay to start immediately at staggered stages
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setItems(initialItems);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bottom-0 text-center flex items-center justify-center opacity-40 select-none pointer-events-none"
          initial={{ 
            x: `${item.x}vw`, 
            y: "110vh", 
            scale: 0.5, 
            rotate: 0 
          }}
          animate={{
            y: "-10vh",
            rotate: [0, 15, -15, 30, -30, 0],
            scale: [0.5, 1.2, 1, 1.2, 0.5],
            x: [
              `${item.x}vw`, 
              `${item.x + (Math.random() * 10 - 5)}vw`, 
              `${item.x + (Math.random() * 20 - 10)}vw`, 
              `${item.x}vw`
            ],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
