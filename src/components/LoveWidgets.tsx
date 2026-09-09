import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, RefreshCw, Trophy, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { ProposalConfig } from "../types";

interface WidgetProps {
  config: ProposalConfig;
}

// Interactive Heart - "The Things I Love" Database
const LOVE_ITEMS = [
  { id: "coffee", label: "Late Night Coffee", icon: "☕", x: 28, y: 15, text: "Fueling late-night thoughts of you..." },
  { id: "music", label: "Beautiful Melodies", icon: "🎵", x: 16, y: 24, text: "Every love song suddenly makes perfect sense." },
  { id: "books", label: "Cozy Books", icon: "📚", x: 72, y: 15, text: "My favorite story is the one we write together." },
  { id: "sunset", label: "Magical Sunsets", icon: "🌅", x: 84, y: 24, text: "Painting the sky in shades of my love for you." },

  { id: "cats", label: "Fluffy Kittens", icon: "🐱", x: 10, y: 39, text: "Soft, warm, and cute—just like your sweet hugs!" },
  { id: "travel", label: "Endless Travel", icon: "✈️", x: 30, y: 39, text: "I'd travel across the universe just to see you." },
  { id: "stars", label: "Stargazing", icon: "🌟", x: 70, y: 39, text: "Looking for the brightest star, but none shines like you." },
  { id: "rain", label: "Rainy Days", icon: "🌧️", x: 90, y: 39, text: "The perfect excuse to hold you close and listen to the rain." },

  { id: "flowers", label: "Fresh Flowers", icon: "🌸", x: 16, y: 58, text: "Blooming with endless joy whenever you smile." },
  { id: "you", label: "YOU (Ridhima)", icon: "💖", x: 50, y: 48, text: "The center of my universe. The one I love more than everything else combined! 🌸✨", isMain: true },
  { id: "chocolate", label: "Chocolates", icon: "🍫", x: 84, y: 58, text: "Sweet, but not even half as sweet as you are!" },

  { id: "pizza", label: "Pizza Nights", icon: "🍕", x: 32, y: 74, text: "A warm slice of happiness, but you are the whole pie!" },
  { id: "gaming", label: "Co-op Gaming", icon: "🎮", x: 68, y: 74, text: "Player 1 ❤️ Player 2. You're my favorite teammate forever." },

  { id: "home", label: "Warm Home", icon: "🏡", x: 50, y: 88, text: "Home isn't a place, it's a feeling... and my home is with you." }
];

export default function LoveWidgets({ config }: WidgetProps) {
  const [loveScore, setLoveScore] = useState(99);
  const [isCalculating, setIsCalculating] = useState(false);
  const [clickedList, setClickedList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<typeof LOVE_ITEMS[0] | null>(null);
  const [hasUnlockedAll, setHasUnlockedAll] = useState(false);

  // Deterministic calculation of love score based on name length to make it consistent but personal
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const combined = (config.proposerName + config.partnerName).toLowerCase().replace(/\s/g, "");
      if (!combined) {
        setLoveScore(99);
      } else {
        // Simple hash to get score between 92 and 100
        let sum = 0;
        for (let i = 0; i < combined.length; i++) {
          sum += combined.charCodeAt(i);
        }
        const score = 92 + (sum % 9); // Always between 92% and 100% because true love never fails!
        setLoveScore(score);
      }
      setIsCalculating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [config.proposerName, config.partnerName]);

  // Click handler for a heart item
  const handleItemClick = (item: typeof LOVE_ITEMS[0]) => {
    setSelectedItem(item);
    if (!clickedList.includes(item.id)) {
      const newList = [...clickedList, item.id];
      setClickedList(newList);

      // Check if unlocked all
      if (newList.length === LOVE_ITEMS.length) {
        setHasUnlockedAll(true);
        // Beautiful extra multi-burst of heart confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#f43f5e", "#f472b6", "#fda4af"]
        });
      }
    }
  };

  // Theme-specific styles
  const themeStyles = {
    rose: {
      accent: "text-rose-500",
      accentBg: "bg-white/35",
      accentBorder: "border-white/40",
      pill: "bg-rose-500/80 text-white backdrop-blur-sm",
      progress: "bg-rose-500",
      glass: "bg-white/20 border border-white/40 shadow-[0_20px_50px_rgba(244,63,94,0.06)] backdrop-blur-2xl",
    },
    lavender: {
      accent: "text-purple-500",
      accentBg: "bg-white/35",
      accentBorder: "border-white/40",
      pill: "bg-purple-500/80 text-white backdrop-blur-sm",
      progress: "bg-purple-500",
      glass: "bg-white/20 border border-white/40 shadow-[0_20px_50px_rgba(139,92,246,0.06)] backdrop-blur-2xl",
    },
    emerald: {
      accent: "text-emerald-500",
      accentBg: "bg-white/35",
      accentBorder: "border-white/40",
      pill: "bg-emerald-500/80 text-white backdrop-blur-sm",
      progress: "bg-emerald-500",
      glass: "bg-white/20 border border-white/40 shadow-[0_20px_50px_rgba(16,185,129,0.06)] backdrop-blur-2xl",
    },
    amber: {
      accent: "text-amber-500",
      accentBg: "bg-white/35",
      accentBorder: "border-white/40",
      pill: "bg-amber-500/80 text-white backdrop-blur-sm",
      progress: "bg-amber-500",
      glass: "bg-white/20 border border-white/40 shadow-[0_20px_50px_rgba(245,158,11,0.06)] backdrop-blur-2xl",
    },
  }[config.themeColor || "rose"];

  return (
    <div className="w-full flex flex-col gap-5 font-sans z-10">
      {/* 1. LOVE-O-METER COMPATIBILITY CALCULATOR */}
      <motion.div
        id="love-meter-widget"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`rounded-3xl p-5 shadow-lg backdrop-blur-xl transition-all duration-500 ${themeStyles.glass}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Heart className={`w-4 h-4 ${themeStyles.accent} fill-current`} />
            Cosmic Love-O-Meter
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${themeStyles.pill} uppercase tracking-wider scale-90`}>
            100% Real Match
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular Score Visualizer */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-gray-100"
                strokeWidth="6.5"
                fill="transparent"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                className={`stroke-current ${themeStyles.accent}`}
                strokeWidth="6.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 34}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{
                  strokeDashoffset: isCalculating
                    ? 2 * Math.PI * 34
                    : 2 * Math.PI * 34 * (1 - loveScore / 100),
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-lg font-black text-gray-800 leading-none">
                {isCalculating ? "..." : `${loveScore}%`}
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Pure Love</span>
            </div>
          </div>

          {/* Name Tags and Status Indicator */}
          <div className="flex-grow flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-gray-700 text-sm">You 💖</span>
              <Heart className={`w-3 h-3 ${themeStyles.accent} fill-current animate-pulse`} />
              <span className="font-bold text-gray-700 text-sm">I 💕</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed min-h-[36px]">
              {isCalculating ? (
                <span className="flex items-center gap-1 italic text-gray-400">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Aligning stars...
                </span>
              ) : (
                <>
                  The stars declare that <span className="font-semibold text-gray-700">You 💖</span> &{" "}
                  <span className="font-semibold text-gray-700">I 💕</span> are a celestial masterpiece! 💫
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. THE THINGS I LOVE - INTERACTIVE HEART GRID */}
      <motion.div
        id="things-i-love-widget"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`rounded-3xl p-5 shadow-lg backdrop-blur-xl transition-all duration-500 flex flex-col ${themeStyles.glass}`}
      >
        <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-2.5">
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <Heart className={`w-3.5 h-3.5 ${themeStyles.accent} fill-current`} />
              The Things I Love
            </h3>
            <span className="text-[9px] text-gray-400 font-medium">Hover or tap to discover what fills my heart</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/40 border border-white/50">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-black text-gray-600">
              {clickedList.length} / {LOVE_ITEMS.length}
            </span>
          </div>
        </div>

        {/* Dynamic Heart Map Area */}
        <div className="relative w-full h-[320px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4">

          {/* Subtle SVG Background Heart Path representing Timo's style */}
          <svg className="absolute w-full h-full inset-0 pointer-events-none p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 50,22 C 35,5 10,12 10,38 C 10,65 50,88 50,88 C 50,88 90,65 90,38 C 90,12 65,5 50,22 Z"
              fill="transparent"
              stroke="rgba(244, 63, 94, 0.15)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              animate={{
                strokeDashoffset: [0, 16],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>

          {/* Interactive Floating Bubbles */}
          {LOVE_ITEMS.map((item, index) => {
            const isClicked = clickedList.includes(item.id);
            const isMain = item.isMain;
            const isSelected = selectedItem?.id === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center z-10`}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                whileHover={{ scale: 1.25, zIndex: 20 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -3, 3, 0],
                }}
                transition={{
                  y: {
                    duration: 2.5 + (index * 0.25),
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Bubble Outer Ring with gorgeous dynamic glows */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 rounded-full ${isMain
                      ? "w-11 h-11 text-xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] border border-pink-200"
                      : isSelected
                        ? `w-9 h-9 text-lg bg-pink-100/50 border-rose-400 shadow-md scale-110`
                        : isClicked
                          ? "w-8 h-8 text-base bg-pink-50/50 border border-pink-300 shadow-xs"
                          : "w-8 h-8 text-base bg-white/40 border border-white/60 shadow-xs"
                    } flex items-center justify-center`}
                >
                  <span>{item.icon}</span>

                  {/* Pulsing Aura around main item or active selections */}
                  {isMain && (
                    <span className="absolute -inset-1 rounded-full border border-pink-400/40 animate-ping" />
                  )}
                </div>
              </motion.button>
            );
          })}

          {/* Complete Heart Unlock Message Overlaid */}
          <AnimatePresence>
            {hasUnlockedAll && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-rose-50/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center border border-pink-200/50 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-2.5 shadow-sm">
                  <Trophy className="w-6 h-6 text-rose-500" />
                </div>
                <h4 className="text-sm font-black text-rose-600 uppercase tracking-widest">My Heart is Full!</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                  You discovered every piece of my heart. But the biggest, brightest spot is you, Akshu! 🌸💖
                </p>
                <button
                  onClick={() => {
                    setClickedList([]);
                    setSelectedItem(null);
                    setHasUnlockedAll(false);
                  }}
                  className="mt-3.5 px-4 py-1.5 bg-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-rose-600 shadow-xs transition-colors cursor-pointer"
                >
                  Explore Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Item Description / Romantic Viewer */}
        <div className="mt-4 min-h-[72px] bg-white/30 backdrop-blur-md rounded-2xl p-3 border border-white/50 flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{selectedItem.icon}</span>
                  <span className="text-xs font-black text-gray-700 capitalize">{selectedItem.label}</span>
                </div>
                <p className="text-[11px] font-medium text-gray-500 italic max-w-sm px-2">
                  "{selectedItem.text}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-gray-400 py-1"
              >
                <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-100 stroke-rose-400 animate-pulse" />
                  Tap a Piece of My Heart
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
