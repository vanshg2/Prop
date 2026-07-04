import { motion } from "motion/react";

interface CuteCharacterProps {
  mood: "idle" | "pout" | "cry" | "desperate" | "success";
}

export default function InteractiveCuteCharacter({ mood }: CuteCharacterProps) {
  // Common spring animation configs
  const bounceTransition = {
    y: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
    scaleX: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut",
    },
    scaleY: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut",
    }
  };

  switch (mood) {
    case "pout":
      return (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-lg"
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Round squishy body */}
            <defs>
              <linearGradient id="poutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#poutGrad)" />

            {/* Rosy blush */}
            <ellipse cx="28" cy="58" rx="8" ry="4" fill="#fda4af" opacity="0.8" />
            <ellipse cx="72" cy="58" rx="8" ry="4" fill="#fda4af" opacity="0.8" />

            {/* Sad/Pouting Eyes */}
            <g fill="#1e293b">
              {/* Left Eye */}
              <motion.path
                d="M 22,46 Q 30,42 34,48"
                stroke="#1e293b"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="28" cy="52" r="4.5" />
              {/* Right Eye */}
              <motion.path
                d="M 78,46 Q 70,42 66,48"
                stroke="#1e293b"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="72" cy="52" r="4.5" />
            </g>

            {/* Pouting tiny mouth */}
            <path
              d="M 44,66 Q 50,60 56,66"
              stroke="#1e293b"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sad single tear droplet */}
            <motion.path
              d="M 72,56 Q 74,68 70,72 Q 66,68 72,56"
              fill="#38bdf8"
              animate={{
                y: [0, 15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeIn",
              }}
            />
          </motion.svg>
        </div>
      );

    case "cry":
      return (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            animate={{
              y: [0, -4, 0],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id="cryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            {/* Squished body */}
            <path
              d="M 15,65 C 10,40 30,15 50,15 C 70,15 90,40 85,65 C 80,85 20,85 15,65 Z"
              fill="url(#cryGrad)"
            />

            {/* Huge blushing cheeks */}
            <circle cx="26" cy="62" r="10" fill="#f43f5e" opacity="0.6" />
            <circle cx="74" cy="62" r="10" fill="#f43f5e" opacity="0.6" />

            {/* Crying eyes (downward curves) */}
            <path
              d="M 22,48 Q 30,38 38,48"
              stroke="#1e293b"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 62,48 Q 70,38 78,48"
              stroke="#1e293b"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Trembling open weeping mouth */}
            <motion.ellipse
              cx="50"
              cy="65"
              rx="9"
              ry="6"
              fill="#881337"
              stroke="#1e293b"
              strokeWidth="3"
              animate={{
                ry: [4, 8, 4],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
              }}
            />

            {/* Gushing tears left */}
            <motion.path
              d="M 26,52 L 20,85"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 10"
              animate={{
                strokeDashoffset: [0, -20],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Gushing tears right */}
            <motion.path
              d="M 74,52 L 80,85"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 10"
              animate={{
                strokeDashoffset: [0, -20],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.svg>
        </div>
      );

    case "desperate":
      return (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-xl"
            animate={{
              rotate: [-4, 4, -4],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id="despGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>
            {/* Heart-shaped begging body */}
            <path
              d="M 50,30 C 50,10 15,10 15,35 C 15,65 50,85 50,85 C 50,85 85,65 85,35 C 85,10 50,10 50,30 Z"
              fill="url(#despGrad)"
            />

            {/* Large puppy-dog eyes */}
            <g fill="#1e293b">
              {/* Left Eye */}
              <circle cx="34" cy="42" r="9" />
              <circle cx="31" cy="38" r="3.5" fill="#fff" />
              <circle cx="37" cy="45" r="1.5" fill="#fff" />

              {/* Right Eye */}
              <circle cx="66" cy="42" r="9" />
              <circle cx="63" cy="38" r="3.5" fill="#fff" />
              <circle cx="69" cy="45" r="1.5" fill="#fff" />
            </g>

            {/* Blushing pink oval cheeks */}
            <ellipse cx="25" cy="52" rx="6" ry="3" fill="#fda4af" opacity="0.9" />
            <ellipse cx="75" cy="52" rx="6" ry="3" fill="#fda4af" opacity="0.9" />

            {/* Wobbly pleading mouth */}
            <motion.path
              d="M 44,56 Q 47,52 50,56 Q 53,52 56,56"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M 44,56 Q 47,52 50,56 Q 53,52 56,56",
                  "M 44,54 Q 47,56 50,54 Q 53,56 56,54",
                  "M 44,56 Q 47,52 50,56 Q 53,52 56,56",
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            />

            {/* Little praying/begging paws moving up and down */}
            <motion.g
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Left Paw */}
              <circle cx="43" cy="68" r="5" fill="#fff" stroke="#1e293b" strokeWidth="2" />
              {/* Right Paw */}
              <circle cx="57" cy="68" r="5" fill="#fff" stroke="#1e293b" strokeWidth="2" />
            </motion.g>
          </motion.svg>
        </div>
      );

    case "success":
      return (
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          {/* Confetti particles */}
          {[...Array(12)].map((_, i) => {
            const rot = (i * 360) / 12;
            const colors = ["#f43f5e", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"];
            const randomColor = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: randomColor }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: [0, Math.cos((rot * Math.PI) / 180) * 80],
                  y: [0, Math.sin((rot * Math.PI) / 180) * 80],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: (i % 3) * 0.2,
                  ease: "easeOut",
                }}
              />
            );
          })}

          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl z-10"
            animate={{
              y: [0, -22, 0],
              scale: [1, 1.12, 0.98, 1.12, 1],
              rotate: [0, 12, -12, 12, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>

            {/* Giant bouncy red heart */}
            <path
              d="M 50,30 C 50,10 15,10 15,35 C 15,65 50,85 50,85 C 50,85 85,65 85,35 C 85,10 50,10 50,30 Z"
              fill="url(#successGrad)"
            />

            {/* Sparkling Star elements on top of the heart */}
            <motion.path
              d="M 22,20 L 24,25 L 29,27 L 24,29 L 22,34 L 20,29 L 15,27 L 20,25 Z"
              fill="#fef08a"
              animate={{ scale: [0.6, 1.3, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.path
              d="M 78,20 L 80,25 L 85,27 L 80,29 L 78,34 L 76,29 L 71,27 L 76,25 Z"
              fill="#fef08a"
              animate={{ scale: [1.3, 0.6, 1.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />

            {/* Sparkling joyful eyes */}
            <g stroke="#fff" strokeWidth="4.5" strokeLinecap="round" fill="none">
              {/* Left Star Eye */}
              <path d="M 28,45 L 36,45 M 32,41 L 32,49" />
              {/* Right Star Eye */}
              <path d="M 64,45 L 72,45 M 68,41 L 68,49" />
            </g>

            {/* Cute rosy blush */}
            <circle cx="28" cy="54" r="7" fill="#fda4af" opacity="0.8" />
            <circle cx="72" cy="54" r="7" fill="#fda4af" opacity="0.8" />

            {/* Wide happy laughing mouth */}
            <path
              d="M 40,54 Q 50,68 60,54"
              fill="#881337"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Cute tongue */}
            <path
              d="M 45,58 Q 50,65 55,58 Q 50,62 45,58"
              fill="#f43f5e"
            />

            {/* Waving joyful arms */}
            <motion.path
              d="M 12,42 Q 2,34 6,28"
              stroke="#f43f5e"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.path
              d="M 88,42 Q 98,34 94,28"
              stroke="#f43f5e"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [20, -20, 20] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </motion.svg>
        </div>
      );

    case "idle":
    default:
      return (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-lg"
            animate={{
              y: [0, -10, 0],
              scaleX: [1, 1.04, 0.98, 1],
              scaleY: [1, 0.96, 1.02, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <linearGradient id="idleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {/* Soft, plump, beautiful shape */}
            <circle cx="50" cy="50" r="41" fill="url(#idleGrad)" />

            {/* Twinkling shiny eyes */}
            <g fill="#1e293b">
              {/* Left Eye */}
              <circle cx="34" cy="46" r="6" />
              <circle cx="32" cy="43" r="2.2" fill="#fff" />
              <circle cx="35" cy="48" r="0.9" fill="#fff" />

              {/* Right Eye */}
              <circle cx="66" cy="46" r="6" />
              <circle cx="64" cy="43" r="2.2" fill="#fff" />
              <circle cx="67" cy="48" r="0.9" fill="#fff" />
            </g>

            {/* Blushing cute cheeks */}
            <ellipse cx="24" cy="54" rx="7" ry="3.5" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="76" cy="54" rx="7" ry="3.5" fill="#f43f5e" opacity="0.6" />

            {/* Happy cat mouth */}
            <path
              d="M 44,56 Q 47,59 50,56 Q 53,59 56,56"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Tiny pink bow/flower accent on left ear-side */}
            <path
              d="M 18,22 C 14,20 12,24 16,26 C 12,28 14,32 18,30 C 22,32 24,28 20,26 C 24,24 22,20 18,22 Z"
              fill="#fff"
            />
            <circle cx="18" cy="26" r="2" fill="#f43f5e" />
          </motion.svg>
        </div>
      );
  }
}
