import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Sparkles, Heart, X, Check, Copy, Quote, Lock, ChevronRight } from "lucide-react";
import { ProposalConfig } from "../types";
import { romanticAudio } from "../utils/audio";

interface OpenWhenEnvelopesProps {
  config: ProposalConfig;
}

interface LetterData {
  id: string;
  tag: string;
  emoji: string;
  envelopeColor: string;
  sealColor: string;
  title: string;
  teaser: string;
  content: string[];
  signature: string;
}

const LETTERS: LetterData[] = [
  {
    id: "miss-me",
    tag: "🥺 When You Miss Me",
    emoji: "🫂",
    envelopeColor: "from-rose-400 to-pink-500",
    sealColor: "bg-rose-700",
    title: "Open When You Miss Me 🥺💗",
    teaser: "Whenever you feel a little lonely or want me by your side...",
    content: [
      "Hey my precious baby doll 🌹,",
      "If you're opening this, it means you're missing me right now. Close your eyes for a second, take a deep breath, and place your hand right over your heart. Can you feel that steady beat? That's me, holding you close and whispering how much I adore you.",
      "Never feel lonely bachaa, because no matter where I am, my heart, my thoughts and my soul belong completely to you. I'm counting down every minute until I can hold your waist, look into your gorgeous eyes, and kiss that sweet forehead of yours.",
      "You are my favourite thought every morning and my sweetest dream every night. I love you endlessly! 💖"
    ],
    signature: "Always by your side,\nVansh 🖋️"
  },
  {
    id: "insecure",
    tag: "🌸 When You Doubt Yourself",
    emoji: "✨",
    envelopeColor: "from-pink-400 to-rose-400",
    sealColor: "bg-pink-700",
    title: "Open When You Feel Insecure 🌸🧿",
    teaser: "A sacred reminder of how breathtakingly perfect you are...",
    content: [
      "My dearest Ridhima 🥺💗,",
      "Listen to me very carefully right now. Whatever negative thought is trying to creep into your mind—throw it away immediately! You don't need to change a single inch of yourself for anyone in the entire world.",
      "To me, you are pure perfection. Your kind soul, your sweet voice, your beautiful eyes, your soft kissable lips, your gorgeous body, and your cute cheeks—every little part of you is my favourite masterpiece. Especially the parts of you that you feel insecure about—I promise to love and kiss those parts even more.",
      "Never sit alone and overthink bachaa. Your boy is here forever, protecting you and admiring you every single day. You are the prettiest girl in the universe! 👑✨"
    ],
    signature: "Your biggest fan & protector,\nVansh 💖"
  },
  {
    id: "mad-at-me",
    tag: "🫣 When You're Angry at Me",
    emoji: "🥺",
    envelopeColor: "from-amber-400 to-orange-400",
    sealColor: "bg-amber-700",
    title: "Open When You're Mad at Me 🫣💔",
    teaser: "I'm sorry meri jaan, let me make it up to you...",
    content: [
      "Hey my doll 🥺,",
      "I know I must have made a mistake or said something silly, and I am genuinely so, so sorry. Making you sad or upset is the last thing I ever want in this world.",
      "Please don't stay mad at your boy for too long, baby. You know I'm completely helpless without your smile. Come here, scream at me if you want, pull my ears, but please give me a tight hug afterwards so I can kiss away that angry pout.",
      "I love you more than words can express, and I'll do whatever it takes to put that gorgeous smile back on your face! 🌹🥺"
    ],
    signature: "Guilty & all yours,\nVansh 🧸"
  },
  {
    id: "midnight",
    tag: "🌙 When You Can't Sleep",
    emoji: "🧸",
    envelopeColor: "from-indigo-400 to-purple-500",
    sealColor: "bg-indigo-700",
    title: "Open at Midnight When You Can't Sleep 🌙✨",
    teaser: "Soft cozy bedtime whispers to help you drift into sweet dreams...",
    content: [
      "Hey sleepy princess 🥱💖,",
      "It's late, the world is quiet, and your little mind is probably running around. Wrap yourself tightly in your blanket, cuddle your pillow, and pretend it's my arms wrapped around your waist holding you safe and warm.",
      "Let go of all the worries from today. You did amazing, and I am so proud of you. Rest that beautiful head of yours, my baby. Tomorrow is another fresh day for me to love you even more.",
      "Sweet dreams my jaan. I'll see you in our dreams tonight! 🌌💤"
    ],
    signature: "Holding you in spirit,\nVansh 🌙"
  },
  {
    id: "kisses",
    tag: "💋 When You Want Kisses",
    emoji: "🔥",
    envelopeColor: "from-rose-500 to-red-500",
    sealColor: "bg-red-800",
    title: "Open When You Crave My Kisses 😏💋",
    teaser: "An official pass for endless forehead kisses, neck kisses & cuddles...",
    content: [
      "Hey hot stuff 😏🌹,",
      "Consider this your official, unlimited voucher for 100 forehead kisses, sweet cheek bites, gentle neck kisses, and all the tight cuddles you can handle.",
      "Your lips are my sweetest obsession, and whenever we're together, I just want to hold you close, run my fingers through your gorgeous hair, and give you all the love and passion in my heart.",
      "Sending you a million kisses across the screen right now… muah! 💋🔥"
    ],
    signature: "Endlessly addicted to you,\nVansh 😏💖"
  }
];

export default function OpenWhenEnvelopes({ config }: OpenWhenEnvelopesProps) {
  const [activeLetter, setActiveLetter] = useState<LetterData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOpen = (letter: LetterData) => {
    setActiveLetter(letter);
    romanticAudio.playChime(659.25);
  };

  const handleClose = () => {
    setActiveLetter(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!activeLetter) return;
    const text = `${activeLetter.title}\n\n${activeLetter.content.join("\n\n")}\n\n${activeLetter.signature}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    romanticAudio.playChime(587.33);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800 font-sans">
              "Open When..." Secret Letters 💌
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Sealed wax envelopes crafted for every mood of {config.partnerName || "Ridhima"}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Sealed Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {LETTERS.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpen(letter)}
            className="group relative bg-gradient-to-br from-white/80 to-rose-50/80 backdrop-blur-md rounded-2xl p-4 border border-rose-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[140px]"
          >
            {/* Vintage Air Mail striped border effect on top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-500 opacity-75" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {letter.tag}
                </span>
                <span className="text-lg">{letter.emoji}</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-gray-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                {letter.title}
              </h4>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {letter.teaser}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-rose-100 text-[11px] font-bold text-rose-600">
              <span className="flex items-center gap-1">
                <span>Break Wax Seal 💌</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#fffefb] border border-[#f3e5d8] rounded-3xl shadow-[0_25px_60px_rgba(136,19,55,0.2)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Parchment top bar */}
              <div className="p-4 bg-rose-50/70 border-b border-rose-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeLetter.emoji}</span>
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#881337] leading-tight">
                      {activeLetter.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-sans">
                      A secret message from Vansh
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-full bg-white text-gray-600 hover:text-rose-600 border border-rose-200 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Copy letter"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full bg-white text-gray-600 hover:text-rose-600 border border-rose-200 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Parchment Letter Body */}
              <div className="p-6 sm:p-8 overflow-y-auto font-handwriting text-[20px] sm:text-[23px] leading-[36px] text-[#2b161c] space-y-4 paper-lines">
                {activeLetter.content.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "font-cursive text-2xl text-rose-600 font-bold" : ""}>
                    {para}
                  </p>
                ))}

                <div className="pt-4 text-right">
                  <p className="font-cursive text-xl text-gray-500">With endless love,</p>
                  <p className="font-brush text-3xl sm:text-4xl text-[#881337] mt-0.5">
                    {activeLetter.signature}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="p-3.5 bg-rose-50/50 border-t border-rose-200/50 flex items-center justify-between text-xs font-bold text-rose-600">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Sealed in my heart forever</span>
                </span>
                <button
                  onClick={handleClose}
                  className="px-4 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Fold & Put Away 💌
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
