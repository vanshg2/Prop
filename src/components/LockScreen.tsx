import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Heart, KeyRound, Sparkles, Calendar, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";
import { romanticAudio } from "../utils/audio";

interface LockScreenProps {
  onUnlock: () => void;
  partnerName?: string;
}

export default function LockScreen({ onUnlock, partnerName = "Ridhima" }: LockScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Accepted variants of 29-08-2026 (DDMM: 2908, DDMMYY: 290826, DDMMYYYY: 29082026)
  const VALID_PINS = ["2908", "290826", "29082026"];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (num: string) => {
    if (pin.length < 8) {
      const nextPin = pin + num;
      setPin(nextPin);
      romanticAudio.playChime(523.25 + nextPin.length * 40);
      setError(false);

      if (nextPin.length === 4) {
        checkPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  const checkPin = (enteredPin: string) => {
    const clean = enteredPin.replace(/\D/g, "");
    if (VALID_PINS.includes(clean)) {
      setIsUnlocked(true);
      romanticAudio.playCelebration();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#fda4af", "#ff007f", "#ffffff"],
      });
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError(true);
      setShake(true);
      romanticAudio.playEscape();
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 8);
    setPin(val);
    setError(false);
    if (val.length === 4) {
      checkPin(val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-rose-950/80 via-purple-950/85 to-rose-900/90 backdrop-blur-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: shake ? 0.4 : 0.6, ease: "easeOut" }}
        className="relative w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] text-white"
      >
        {/* Floating Lock Icon Header */}
        <div className="relative mx-auto w-16 h-16 mb-4 flex items-center justify-center">
          <motion.div
            animate={isUnlocked ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg border border-rose-300/40"
          >
            {isUnlocked ? (
              <Unlock className="w-8 h-8 text-white animate-pulse" />
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </motion.div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-rose-950 flex items-center justify-center text-xs font-bold shadow-xs">
            ✨
          </div>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Private Sanctuary
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/90 font-medium mb-5">
          Reserved exclusively for <span className="font-bold text-pink-300">{partnerName}</span> 🌸
        </p>

        {/* Secret First Met Date Hint */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[11px] text-pink-200 mb-6 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>The day we first met / started dating (DDMM) 🗓️🔑</span>
        </div>

        {/* Hidden physical input for keyboard support */}
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          value={pin}
          onChange={handleInputChange}
          className="sr-only"
          autoFocus
        />

        {/* PIN Dot Indicators (4 Digits: 2908) */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex justify-center gap-4 mb-6 cursor-pointer"
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const isFilled = i < pin.length;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isFilled ? 1.2 : 1,
                  borderColor: error ? "rgb(244 63 94)" : isFilled ? "rgb(251 113 133)" : "rgba(255,255,255,0.25)",
                }}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                  isFilled
                    ? error
                      ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                      : "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.8)]"
                    : "bg-white/5"
                }`}
              />
            );
          })}
        </div>

        {/* Error message */}
        <div className="h-6 mb-2">
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-bold text-rose-300 flex items-center justify-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Oops! Hint: The day we first met (29-08) 💕</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Touch Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-lg font-bold flex items-center justify-center border border-white/15 cursor-pointer shadow-2xs"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPin("");
              setError(false);
            }}
            className="h-12 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-xs font-semibold text-rose-300 flex items-center justify-center border border-white/10 cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress("0")}
            className="h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-lg font-bold flex items-center justify-center border border-white/15 cursor-pointer shadow-2xs"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-sm font-semibold text-rose-300 flex items-center justify-center border border-white/10 cursor-pointer"
          >
            ⌫
          </button>
        </div>

        {/* Unlock Button fallback */}
        {pin.length >= 4 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => checkPin(pin)}
            className="w-full mt-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs rounded-full shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Unlock My Heart 💖</span>
          </motion.button>
        )}

      </motion.div>
    </div>
  );
}
