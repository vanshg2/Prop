import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, AlertCircle, Stars } from "lucide-react";
import confetti from "canvas-confetti";
import { ProposalConfig, NoStep } from "../types";
import InteractiveCuteCharacter from "./InteractiveCuteCharacter";
import RomanticLoveLetter from "./RomanticLoveLetter";
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

  // Dynamic Theme Styling
  const themeStyles = {
    rose: {
      bg: "bg-gradient-to-tr from-rose-50 via-pink-100 to-rose-100/50",
      accent: "text-rose-600",
      accentBg: "bg-white/30",
      accentBorder: "border-white/40",
      buttonYes: "bg-rose-500/90 hover:bg-rose-600/90 backdrop-blur-md hover:shadow-rose-200/50 focus:ring-rose-300 shadow-md",
      buttonNo: "bg-white/30 backdrop-blur-md border-white/50 text-rose-700 hover:bg-white/40 shadow-sm",
      cardBorder: "border-white/50",
      glass: "bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(244,63,94,0.1)]",
    },
    lavender: {
      bg: "bg-gradient-to-tr from-indigo-50 via-purple-100 to-indigo-100/50",
      accent: "text-purple-600",
      accentBg: "bg-white/30",
      accentBorder: "border-white/40",
      buttonYes: "bg-purple-500/90 hover:bg-purple-600/90 backdrop-blur-md hover:shadow-purple-200/50 focus:ring-purple-300 shadow-md",
      buttonNo: "bg-white/30 backdrop-blur-md border-white/50 text-purple-700 hover:bg-white/40 shadow-sm",
      cardBorder: "border-white/50",
      glass: "bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(139,92,246,0.1)]",
    },
    emerald: {
      bg: "bg-gradient-to-tr from-emerald-50 via-teal-100 to-emerald-100/50",
      accent: "text-emerald-600",
      accentBg: "bg-white/30",
      accentBorder: "border-white/40",
      buttonYes: "bg-emerald-500/90 hover:bg-emerald-600/90 backdrop-blur-md hover:shadow-emerald-200/50 focus:ring-emerald-300 shadow-md",
      buttonNo: "bg-white/30 backdrop-blur-md border-white/50 text-emerald-700 hover:bg-white/40 shadow-sm",
      cardBorder: "border-white/50",
      glass: "bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(16,185,129,0.1)]",
    },
    amber: {
      bg: "bg-gradient-to-tr from-amber-50 via-orange-100 to-amber-100/50",
      accent: "text-amber-600",
      accentBg: "bg-white/30",
      accentBorder: "border-white/40",
      buttonYes: "bg-amber-500/90 hover:bg-amber-600/90 backdrop-blur-md hover:shadow-amber-200/50 focus:ring-amber-300 shadow-md",
      buttonNo: "bg-white/30 backdrop-blur-md border-white/50 text-amber-700 hover:bg-white/40 shadow-sm",
      cardBorder: "border-white/50",
      glass: "bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(245,158,11,0.1)]",
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
          <InteractiveCuteCharacter mood="success" />

          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ scale: 0.8, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${themeStyles.accent} font-serif`}
            >
              I knew it! 😘💖
            </motion.h1>
            <p className="text-base sm:text-lg font-bold text-gray-800 tracking-wide px-4">
              I love you Soooooo sooo Muccchhhhhh my Baby Doll / My mommy / Baby 🌸👸💕
            </p>
            <p className="text-xs font-medium text-gray-500 italic max-w-md px-4 leading-relaxed">
              Happiest moment ever. Let's make endless beautiful memories together! ✨
            </p>
          </div>

          {/* Flirty & Intimate Custom Love Letter */}
          <RomanticLoveLetter config={config} />

          <motion.button
            id="accepted-reset-btn"
            onClick={resetAll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-3 px-6 py-2.5 rounded-full text-xs font-bold ${themeStyles.buttonNo} hover:scale-105 active:scale-95 transition-all border cursor-pointer flex items-center gap-1.5`}
          >
            <span>Ask Again? 😉</span>
          </motion.button>
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
      className={`relative w-full ${isAccepted ? "max-w-5xl" : "max-w-md"} ${themeStyles.glass} rounded-3xl p-4 sm:p-7 lg:p-9 shadow-xl border overflow-hidden transition-all duration-500 z-10`}
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
