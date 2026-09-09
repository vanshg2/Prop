import { useMemo } from "react";

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["❤️", "💖", "🌸", "✨", "💕", "💘", "🌹", "💌"];

// Pre-computed static distribution to eliminate runtime re-renders and hydration mismatches
const STATIC_ITEMS: FloatingItem[] = [
  { id: 1, x: 8, size: 20, duration: 14, delay: -2, emoji: "💖" },
  { id: 2, x: 22, size: 26, duration: 18, delay: -9, emoji: "🌸" },
  { id: 3, x: 38, size: 16, duration: 12, delay: -4, emoji: "✨" },
  { id: 4, x: 52, size: 24, duration: 16, delay: -11, emoji: "💕" },
  { id: 5, x: 68, size: 18, duration: 13, delay: -6, emoji: "🌹" },
  { id: 6, x: 82, size: 28, duration: 19, delay: -13, emoji: "💘" },
  { id: 7, x: 94, size: 16, duration: 11, delay: -3, emoji: "🌸" },
  { id: 8, x: 15, size: 22, duration: 15, delay: -7, emoji: "❤️" },
  { id: 9, x: 45, size: 18, duration: 14, delay: -1, emoji: "💖" },
  { id: 10, x: 75, size: 24, duration: 17, delay: -10, emoji: "✨" },
];

export default function FloatingHearts() {
  const items = useMemo(() => STATIC_ITEMS, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {items.map((item) => (
        <span
          key={item.id}
          className="css-heart-particle"
          style={{
            left: `${item.x}vw`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
          aria-hidden="true"
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
