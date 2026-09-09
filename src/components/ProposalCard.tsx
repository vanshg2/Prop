import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, AlertCircle, Stars, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { ProposalConfig, NoStep } from "../types";
import InteractiveCuteCharacter from "./InteractiveCuteCharacter";
import { romanticAudio } from "../utils/audio";

interface ProposalCardProps {
  config: ProposalConfig;
  onAcceptedChange?: (isAccepted: boolean) => void;
}

const NO_STEPS: NoStep[] = [
  {
    id: 1,
    emoji: "🥺",
    heading: "Please think again na meri doll! 🥺",
    subheading: "Itni jaldi No matt bolo... dil toot jayega 💔🥺",
    gifType: "pout",
  },
  {
    id: 2,
    emoji: "😣",
    heading: "Ek aur baar soch lo meri jaan! 😣",
    subheading: "Aise kyu sataa rahi ho baby... Pls maan jao na 🥺💕",
    gifType: "cry",
  },
  {
    id: 3,
    emoji: "😭",
    heading: "Ridhima baby, pls maan jao na! 😭",
    subheading: "Kitne nakhre dikhaogi meri princess... you know you're mine! 💍💖",
    gifType: "desperate",
  },
];

export default function ProposalCard({ config, onAcceptedChange }: ProposalCardProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: No1, 2: No2, 3: No3 (Teleport)
  const [isAccepted, setIsAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [teleportCount, setTeleportCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Growth scale multiplier for YES button based on "No" clicks
  const yesButtonScale = 1 + currentStep * 0.4 + Math.min(teleportCount * 0.15, 1.5);

  const handleNoAction = () => {
    romanticAudio.playEscape();
    if (currentStep < 3) {
      // Advance to next guilt-trip stage
      setCurrentStep((prev) => prev + 1);
    } else {
      // Teleport the button around playfully
      teleportNoButton();
    }
  };

  const teleportNoButton = () => {
    romanticAudio.playEscape();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Keep inside container boundaries with padding
      const maxW = (rect.width / 2) - 60;
      const maxH = (rect.height / 2) - 40;

      const randomX = (Math.random() * 2 - 1) * maxW;
      const randomY = (Math.random() * 2 - 1) * maxH;

      setNoPosition({ x: randomX, y: randomY });
      setTeleportCount((prev) => prev + 1);
    } else {
      // Fallback
      const randomX = (Math.random() * 200) - 100;
      const randomY = (Math.random() * 140) - 70;
      setNoPosition({ x: randomX, y: randomY });
      setTeleportCount((prev) => prev + 1);
    }
  };

  const handleYes = () => {
    setIsAccepted(true);
    onAcceptedChange?.(true);
    romanticAudio.playCelebration();

    // Multi-burst premium themed confetti celebration for 5 seconds
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 80, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Immediate initial explosion
    const initialColors = config.themeColor === "rose"
      ? ["#f43f5e", "#ec4899", "#fda4af", "#ff007f", "#ffffff"]
      : config.themeColor === "lavender"
        ? ["#a855f7", "#8b5cf6", "#c084fc", "#ffffff", "#e9d5ff"]
        : config.themeColor === "emerald"
          ? ["#10b981", "#14b8a6", "#34d399", "#ffffff", "#ccfbf1"]
          : ["#f59e0b", "#f97316", "#fbbf24", "#ffffff", "#fef3c7"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: initialColors,
    });

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      const colors = config.themeColor === "rose"
        ? ["#f43f5e", "#ec4899", "#fda4af", "#ff007f", "#ffffff"]
        : config.themeColor === "lavender"
          ? ["#a855f7", "#8b5cf6", "#c084fc", "#ffffff", "#e9d5ff"]
          : config.themeColor === "emerald"
            ? ["#10b981", "#14b8a6", "#34d399", "#ffffff", "#ccfbf1"]
            : ["#f59e0b", "#f97316", "#fbbf24", "#ffffff", "#fef3c7"];

      // Side showers
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
      });
    }, 250);
  };

  const resetAll = () => {
    setCurrentStep(0);
    setIsAccepted(false);
    onAcceptedChange?.(false);
    setNoPosition(null);
    setTeleportCount(0);
  };

  // Dynamic Theme Styling (Optimized for buttery smooth 60/120fps)
  const themeStyles = {
    rose: {
      bg: "bg-gradient-to-tr from-rose-50 via-pink-100 to-rose-100/50",
      accent: "text-rose-600",
      accentBg: "bg-white/50",
      accentBorder: "border-white/60",
      buttonYes: "bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-rose-300/60 focus:ring-rose-300",
      buttonNo: "bg-white/80 border-rose-200 text-rose-700 hover:bg-white shadow-xs",
      cardBorder: "border-rose-200/60",
      glass: "bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_15px_40px_rgba(244,63,94,0.12)]",
    },
    lavender: {
      bg: "bg-gradient-to-tr from-indigo-50 via-purple-100 to-indigo-100/50",
      accent: "text-purple-600",
      accentBg: "bg-white/50",
      accentBorder: "border-white/60",
      buttonYes: "bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-purple-300/60 focus:ring-purple-300",
      buttonNo: "bg-white/80 border-purple-200 text-purple-700 hover:bg-white shadow-xs",
      cardBorder: "border-purple-200/60",
      glass: "bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_15px_40px_rgba(139,92,246,0.12)]",
    },
    emerald: {
      bg: "bg-gradient-to-tr from-emerald-50 via-teal-100 to-emerald-100/50",
      accent: "text-emerald-600",
      accentBg: "bg-white/50",
      accentBorder: "border-white/60",
      buttonYes: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-emerald-300/60 focus:ring-emerald-300",
      buttonNo: "bg-white/80 border-emerald-200 text-emerald-700 hover:bg-white shadow-xs",
      cardBorder: "border-emerald-200/60",
      glass: "bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_15px_40px_rgba(16,185,129,0.12)]",
    },
    amber: {
      bg: "bg-gradient-to-tr from-amber-50 via-orange-100 to-amber-100/50",
      accent: "text-amber-600",
      accentBg: "bg-white/50",
      accentBorder: "border-white/60",
      buttonYes: "bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-amber-300/60 focus:ring-amber-300",
      buttonNo: "bg-white/80 border-amber-200 text-amber-700 hover:bg-white shadow-xs",
      cardBorder: "border-amber-200/60",
      glass: "bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_15px_40px_rgba(245,158,11,0.12)]",
    },
  }[config.themeColor || "rose"];

  // Render current stage text/character
  const renderStage = () => {
    if (isAccepted) {
      return (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-4 flex flex-col items-center gap-4 w-full"
        >
          {/* Celebratory badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 text-rose-700 font-bold text-[11px] uppercase tracking-wider border border-rose-300/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>Officially Mine Forever • 29 Aug 2026 💍✨</span>
          </div>

          <InteractiveCuteCharacter mood="success" />

          <div className="flex flex-col items-center gap-1.5 px-2">
            <motion.h1
              initial={{ scale: 0.8, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
              className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent font-serif leading-none"
            >
              I knew it! 😘💖
            </motion.h1>
            <p className="font-cursive text-2xl sm:text-3xl font-bold text-[#881337] tracking-wide px-2 leading-snug mt-1">
              I love you sooo sooo much, my baby doll! 🌸👸💕
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-600 max-w-md px-4 leading-relaxed font-sans">
              You just made me the happiest boy in the entire universe. Explore all your love treats, secret letters, and private confession below! ✨
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center mt-2">
            <a
              href={`https://wa.me/917982346690?text=${encodeURIComponent(`Vansh! I said YES to your proposal! You are officially mine forever 😘💍💖✨`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send "I Said YES" on WA 📲</span>
            </a>

            <button
              id="accepted-reset-btn"
              onClick={resetAll}
              className={`px-4 py-2.5 rounded-full text-xs font-bold ${themeStyles.buttonNo} hover:scale-105 active:scale-95 transition-all border cursor-pointer flex items-center gap-1.5 font-sans`}
            >
              <span>Ask Again? 😉</span>
            </button>
          </div>

          {/* Animated Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1 text-rose-500 font-bold text-[11px] mt-2 font-sans opacity-90"
          >
            <span>Scroll down for your love treats & secret letter</span>
            <span>↓</span>
          </motion.div>
        </motion.div>
      );
    }

    const currentNoStep = currentStep > 0 ? NO_STEPS[currentStep - 1] : null;
    const mood = (currentNoStep ? currentNoStep.gifType : "idle") as "idle" | "pout" | "cry" | "desperate";
    const heading = currentNoStep
      ? (currentNoStep.id === 3 ? `${config.partnerName || "Ridhima"}, pls Man jao na! 😭` : currentNoStep.heading)
      : `${config.questionText} 🤗`;
    const subheading = currentNoStep ? currentNoStep.subheading : `Hey ${config.partnerName || "Ridhima"}, I am all yours 💖🌹`;

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-6"
      >
        <InteractiveCuteCharacter mood={mood} />

        <div className="flex flex-col gap-2 px-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-800 font-serif leading-tight">
            {heading}
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {subheading}
          </p>
        </div>

        {/* Buttons section with interactive triggers */}
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 min-h-[140px] px-8">
          {/* YES BUTTON (Grows on rejection) */}
          <motion.button
            id="yes-proposal-btn"
            onClick={handleYes}
            style={{ scale: yesButtonScale }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`z-20 px-8 py-3 rounded-full text-white font-bold tracking-wide cursor-pointer transition-colors ${themeStyles.buttonYes}`}
          >
            {config.yesButtonText}
          </motion.button>

          {/* NO BUTTON (Teleports around if step 3) */}
          <motion.button
            id="no-proposal-btn"
            onMouseEnter={currentStep >= 3 ? teleportNoButton : undefined}
            onTouchStart={currentStep >= 3 ? teleportNoButton : undefined}
            onClick={handleNoAction}
            animate={noPosition ? { x: noPosition.x, y: noPosition.y } : { x: 0, y: 0 }}
            transition={currentStep >= 3 ? { type: "spring", stiffness: 350, damping: 20 } : { duration: 0.2 }}
            className={`z-10 px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all cursor-pointer ${themeStyles.buttonNo}`}
          >
            {config.noButtonText}
          </motion.button>
        </div>

        {/* Fun Easter egg hint */}
        {currentStep >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7], y: [5, 0, 0] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
            className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mt-2"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
            Hint: Love is inevitable. You cannot click No!
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <div
      ref={containerRef}
      id="proposal-card-parent"
      className={`relative w-full ${isAccepted ? "max-w-xl" : "max-w-md"} ${themeStyles.glass} rounded-3xl p-6 sm:p-8 shadow-xl border overflow-hidden transition-all duration-500 z-10`}
    >
      {/* Absolute floating decorations inside the card */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-400/10 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
}
