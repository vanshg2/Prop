import { useState, useEffect } from "react";
import { ProposalConfig } from "./types";
import FloatingHearts from "./components/FloatingHearts";
import ProposalCard from "./components/ProposalCard";
import LoveWidgets from "./components/LoveWidgets";
import { Heart, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

const DEFAULT_CONFIG: ProposalConfig = {
  proposerName: "Vansh",
  partnerName: "Ridhima",
  questionText: "Do you love me?",
  yesButtonText: "Yes",
  noButtonText: "No",
  themeColor: "rose",
};

export default function App() {
  const [config, setConfig] = useState<ProposalConfig>(DEFAULT_CONFIG);

  // Load custom configuration from URL parameters on start (makes it super easy to share personalized links!)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const proposer = params.get("from");
    const partner = params.get("to");
    const question = params.get("q");
    const yesText = params.get("yes");
    const noText = params.get("no");
    const theme = params.get("theme") as ProposalConfig["themeColor"];

    if (proposer || partner || question || yesText || noText || theme) {
      setConfig({
        proposerName: proposer || DEFAULT_CONFIG.proposerName,
        partnerName: partner || DEFAULT_CONFIG.partnerName,
        questionText: question || DEFAULT_CONFIG.questionText,
        yesButtonText: yesText || DEFAULT_CONFIG.yesButtonText,
        noButtonText: noText || DEFAULT_CONFIG.noButtonText,
        themeColor: (["rose", "lavender", "emerald", "amber"].includes(theme) ? theme : null) || DEFAULT_CONFIG.themeColor,
      });
    }
  }, []);

  // Update URL search parameters when configuration changes so the user can easily copy and share their custom URL!
  const handleConfigChange = (newConfig: ProposalConfig) => {
    setConfig(newConfig);

    // Update URL dynamically without reloading
    const params = new URLSearchParams();
    if (newConfig.proposerName !== DEFAULT_CONFIG.proposerName) params.set("from", newConfig.proposerName);
    if (newConfig.partnerName !== DEFAULT_CONFIG.partnerName) params.set("to", newConfig.partnerName);
    if (newConfig.questionText !== DEFAULT_CONFIG.questionText) params.set("q", newConfig.questionText);
    if (newConfig.yesButtonText !== DEFAULT_CONFIG.yesButtonText) params.set("yes", newConfig.yesButtonText);
    if (newConfig.noButtonText !== DEFAULT_CONFIG.noButtonText) params.set("no", newConfig.noButtonText);
    if (newConfig.themeColor !== DEFAULT_CONFIG.themeColor) params.set("theme", newConfig.themeColor);

    const newRelativePathQuery = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState(null, "", newRelativePathQuery);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    window.history.replaceState(null, "", window.location.pathname);
  };

  // Theme-specific background gradients
  const themeGradients = {
    rose: "from-rose-100 via-pink-50 to-rose-200/50",
    lavender: "from-purple-100 via-indigo-50 to-indigo-200/50",
    emerald: "from-teal-100 via-emerald-50 to-emerald-200/50",
    amber: "from-orange-100 via-amber-50 to-amber-200/50",
  }[config.themeColor || "rose"];

  const themeTextColors = {
    rose: "text-rose-500",
    lavender: "text-purple-500",
    emerald: "text-emerald-500",
    amber: "text-amber-500",
  }[config.themeColor || "rose"];

  // Orb gradient colors mapped to theme
  const orbColors = {
    rose: {
      one: "bg-pink-400/30",
      two: "bg-purple-300/25",
      three: "bg-rose-400/20",
    },
    lavender: {
      one: "bg-purple-400/30",
      two: "bg-indigo-300/25",
      three: "bg-fuchsia-400/20",
    },
    emerald: {
      one: "bg-emerald-400/30",
      two: "bg-teal-300/25",
      three: "bg-cyan-400/20",
    },
    amber: {
      one: "bg-amber-400/30",
      two: "bg-orange-300/25",
      three: "bg-yellow-400/20",
    },
  }[config.themeColor || "rose"];

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center p-4 bg-gradient-to-br ${themeGradients} transition-colors duration-500 overflow-x-hidden font-sans select-none pb-20`}>
      {/* Dynamic Motion Hero Background Orbs (Glassmorphism ambient glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Orb A */}
        <motion.div
          className={`absolute -top-12 -left-12 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full ${orbColors.one} blur-[80px] sm:blur-[120px]`}
          animate={{
            x: [0, 120, -60, 0],
            y: [0, 80, 140, 0],
            scale: [1, 1.25, 0.85, 1],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Orb B */}
        <motion.div
          className={`absolute top-1/2 -right-16 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full ${orbColors.two} blur-[80px] sm:blur-[120px]`}
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 120, -90, 0],
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, -120, 120, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Orb C */}
        <motion.div
          className={`absolute bottom-10 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full ${orbColors.three} blur-[80px] sm:blur-[120px]`}
          animate={{
            x: [0, 80, -90, 0],
            y: [0, -70, 100, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Interactive floating elements */}
      <FloatingHearts />

      {/* 1. Header/Navbar */}
      <header className="w-full max-w-6xl mx-auto z-20 mb-6 sm:mb-10">
        <div className="flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.15)]">
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${themeTextColors} fill-current animate-pulse`} />
            <span className="text-sm font-black tracking-wider uppercase text-gray-800">
              LoveLock <span className={themeTextColors}>💖</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] sm:text-xs font-bold text-gray-700">
              For: {config.partnerName || "Ridhima"} 🌸
            </span>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Layout Grid */}
      <main className="w-full max-w-6xl mx-auto z-10 flex-grow flex flex-col items-center justify-center">

        {/* Intro Sub-Hero Message */}
        <div className="text-center mb-8 max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-widest mb-3 shadow-xs border border-white/50"
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            Celestial Proposal Invitation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-gray-800 font-serif leading-tight sm:leading-none"
          >
            A Message <span className={themeTextColors}>Written</span> in the Stars
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-gray-500 font-medium mt-3 leading-relaxed"
          >
            An interactive romantic experience designed especially for you. Answer honestly, feel the rhythm of our hearts, and personalize this dream for your beloved.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4">

          {/* Column A (Proposal Interactive Card) */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <ProposalCard config={config} />
          </div>

          {/* Column B (Secondary Love Interactive Widgets) */}
          <div className="lg:col-span-5 w-full">
            <LoveWidgets config={config} />
          </div>

        </div>

      </main>
    </div>
  );
}
