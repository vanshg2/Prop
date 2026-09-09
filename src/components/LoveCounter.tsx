import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Calendar, Clock, Sparkles, Flame, Infinity } from "lucide-react";
import { ProposalConfig } from "../types";

interface LoveCounterProps {
  config: ProposalConfig;
}

export default function LoveCounter({ config }: LoveCounterProps) {
  // Start Dating Date: 29 August 2026 00:00:00 IST / Local
  const START_DATE = new Date("2026-08-29T00:00:00");

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFuture: false,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - START_DATE.getTime();
      const isFuture = diffMs < 0;
      const absDiff = Math.abs(diffMs);

      const seconds = Math.floor((absDiff / 1000) % 60);
      const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

      setTime({
        days,
        hours,
        minutes,
        seconds,
        isFuture,
        totalDays: days,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: time.days, emoji: "☀️" },
    { label: "Hours", value: time.hours, emoji: "⏳" },
    { label: "Minutes", value: time.minutes, emoji: "🌸" },
    { label: "Seconds", value: time.seconds, emoji: "💓" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white/40 backdrop-blur-xl border border-rose-200/60 rounded-3xl p-5 sm:p-7 shadow-[0_15px_40px_rgba(244,63,94,0.08)] text-gray-800"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800 font-sans">
              Our Journey of Love 💖
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Dating Officially Since <span className="text-rose-600 font-bold">29 August 2026</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 text-[10px] font-bold text-rose-600">
          <Infinity className="w-3.5 h-3.5" />
          <span>Forever & Always</span>
        </div>
      </div>

      {/* Main Counter Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            whileHover={{ scale: 1.03 }}
            className="relative bg-gradient-to-b from-white/90 to-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 text-center shadow-2xs overflow-hidden"
          >
            <div className="absolute top-1.5 right-2 text-xs opacity-60">
              {unit.emoji}
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#881337] tracking-tight">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-xs uppercase font-bold text-rose-500 tracking-wider mt-0.5 font-sans">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heartbeat Status Ribbon */}
      <div className="p-3 bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-purple-500/10 rounded-2xl border border-rose-200/60 flex items-center justify-between text-xs font-semibold text-rose-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
          </span>
          <span>{config.proposerName || "Vansh"} & {config.partnerName || "Ridhima"}</span>
        </div>
        <div className="flex items-center gap-1 font-serif italic text-rose-700">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>Every second falling deeper in love</span>
        </div>
      </div>
    </motion.div>
  );
}
