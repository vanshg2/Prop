import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Flame, Eye, Lock, Feather, Stars, Music, Quote, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
import { ProposalConfig } from "../types";
import { romanticAudio } from "../utils/audio";

interface RomanticLoveLetterProps {
  config: ProposalConfig;
}

interface FloatingPetal {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

// Deep, heartfelt quotes derived and crafted directly from the letter
const ROMANTIC_QUOTES = [
  {
    id: 1,
    quote: "You don't need to change a single thing for the world. To me, every little inch of you is already my favorite masterpiece.",
    tag: "🧿 Already Perfect",
    emoji: "💖",
    hindi: "Aap jaisi ho, meri sabse favourite ho."
  },
  {
    id: 2,
    quote: "My favorite place in the universe is standing right beside you, holding your waist close and feeling completely at home.",
    tag: "🥹 Safe In My Arms",
    emoji: "🫂",
    hindi: "Home isn't a place... it's right here with you."
  },
  {
    id: 3,
    quote: "I want to kiss every part of you that you've ever felt insecure about, until all you see is how breathtakingly loved you are.",
    tag: "🥺 Sacred Promise",
    emoji: "💋",
    hindi: "Never overthink bachaa, your boy is here forever."
  },
  {
    id: 4,
    quote: "Your eyes are my stargazing sky, your lips are my sweetest obsession, and your smile makes my whole universe light up.",
    tag: "😏 Head to Toe",
    emoji: "🔥",
    hindi: "Mann karta hai poore time bas aapko dekhta rahu."
  },
  {
    id: 5,
    quote: "I don't just look at you for today... when I look into your eyes, I genuinely see our entire beautiful future together.",
    tag: "💍 Forever & Always",
    emoji: "🌹",
    hindi: "Building an endless lifetime of love with you."
  },
  {
    id: 6,
    quote: "Your pure heart and caring soul are the rarest treasures I have ever found. Never change that gorgeous heart of yours.",
    tag: "✨ Pure Soul",
    emoji: "👑",
    hindi: "Bachaa, you are genuinely such a pure soul."
  }
];

export default function RomanticLoveLetter({ config }: RomanticLoveLetterProps) {
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [isPerfumed, setIsPerfumed] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<"normal" | "large">("normal");
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Spritz perfume / send kisses effect
  const handleSpritz = () => {
    setIsPerfumed(true);
    romanticAudio.playKiss();
    const emojis = ["🌸", "🌹", "💋", "💖", "✨", "🦋", "💌"];
    const newPetals: FloatingPetal[] = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 60 - 30,
      scale: Math.random() * 0.7 + 0.8,
    }));

    setPetals((prev) => [...prev, ...newPetals]);

    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => !newPetals.some((np) => np.id === p.id)));
    }, 2800);
  };

  const nextQuote = () => {
    romanticAudio.playChime(587.33);
    setQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
  };

  const prevQuote = () => {
    romanticAudio.playChime(523.25);
    setQuoteIndex((prev) => (prev - 1 + ROMANTIC_QUOTES.length) % ROMANTIC_QUOTES.length);
  };

  const currentQuote = ROMANTIC_QUOTES[quoteIndex];

  return (
    <div className="w-full mt-5 flex flex-col items-center select-none sm:select-text space-y-5">
      
      {/* 1. Vintage Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full text-left"
      >
        {/* Spritz floating elements */}
        <AnimatePresence>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ opacity: 0, scale: 0, y: 10, rotate: petal.rotation }}
              animate={{ opacity: [0, 1, 1, 0], scale: petal.scale, y: -90, rotate: petal.rotation + 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ left: `${petal.x}%`, top: `${petal.y}%` }}
              className="absolute pointer-events-none z-50 text-xl sm:text-2xl drop-shadow-md"
            >
              {petal.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Vintage Letter Envelope Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-rose-500/10 backdrop-blur-md rounded-2xl border border-rose-200/50 mb-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-xs text-xs">
              🖋️
            </span>
            <div>
              <span className="text-[11px] font-bold text-rose-700 tracking-wider uppercase font-sans">
                Handwritten Love Letter
              </span>
              <span className="hidden sm:inline-block text-[10px] text-gray-400 ml-2">
                • Sealed with endless love & kisses
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Spritz Perfume Button */}
            <button
              onClick={handleSpritz}
              className="px-3 py-1 bg-white/80 hover:bg-white text-rose-600 rounded-full text-[11px] font-bold border border-rose-200 flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans"
              title="Spray sweet floral perfume & send kisses"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Spritz Perfume 🌸💋</span>
            </button>

            {/* Font Size Toggle */}
            <button
              onClick={() => setFontSizeMultiplier(fontSizeMultiplier === "normal" ? "large" : "normal")}
              className="px-2.5 py-1 bg-white/60 hover:bg-white/80 text-gray-600 rounded-full text-[10px] font-bold border border-rose-200 transition-colors cursor-pointer font-sans"
            >
              {fontSizeMultiplier === "normal" ? "A+" : "A-"}
            </button>
          </div>
        </div>

        {/* 2. THE HANDWRITTEN PARCHMENT PAPER */}
        <div className="relative w-full bg-[#fffefb] rounded-2xl shadow-[0_15px_45px_rgba(136,19,55,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-[#f3e5d8] overflow-hidden p-6 sm:p-9">
          
          {/* Subtle Pink Notebook Margin Line on Left */}
          <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-[1.5px] bg-rose-300/35 pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 left-9 sm:left-13 w-[0.8px] bg-rose-200/25 pointer-events-none z-10" />

          {/* Paper Texture Overlay & Subtle Horizontal Writing Lines */}
          <div className="absolute inset-0 paper-lines pointer-events-none opacity-40" />

          {/* Vintage Stamp in Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-center pointer-events-none select-none z-10">
            <div className="w-14 h-16 sm:w-16 sm:h-20 border-2 border-dashed border-rose-300/80 bg-rose-50/50 rounded-sm flex flex-col items-center justify-center p-1 shadow-2xs rotate-3">
              <span className="text-lg sm:text-2xl">🕊️</span>
              <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-rose-500 mt-0.5">
                AIR MAIL
              </span>
              <span className="text-[6px] text-rose-400 font-serif">100% PURE LOVE</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-rose-400/40 -mt-5 -mr-4 flex items-center justify-center -rotate-12 pointer-events-none">
              <span className="text-[6px] font-black text-rose-400/80 uppercase tracking-widest text-center">
                SEALED<br />WITH A KISS
              </span>
            </div>
          </div>

          {/* Realistic Lipstick Kiss Imprint on Bottom Left */}
          <button
            onClick={handleSpritz}
            className="absolute bottom-16 right-8 sm:bottom-20 sm:right-16 opacity-90 rotate-12 z-10 hover:scale-125 active:scale-95 transition-transform cursor-pointer group"
            title="Click to receive my kiss 💋"
          >
            <span className="text-3xl sm:text-4xl filter drop-shadow-[0_2px_4px_rgba(244,63,94,0.3)] block group-hover:animate-pulse">
              💋
            </span>
          </button>

          {/* Golden Wax Seal Decorative Stamp */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-200/50 pl-4 sm:pl-8">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-white shadow-[0_4px_12px_rgba(225,29,72,0.35)] border-2 border-rose-300/60 rotate-[-6deg]">
              <span className="text-base font-serif font-black">V&R</span>
              <div className="absolute -inset-1 rounded-full border border-rose-400/30 animate-pulse pointer-events-none" />
            </div>
            <div>
              <h2 className="font-cursive text-2xl sm:text-3xl font-bold text-[#881337] tracking-wide leading-none">
                Dearest {config.partnerName || "Ridhima"}
              </h2>
              <p className="font-handwriting text-sm sm:text-base text-gray-500 mt-0.5">
                Every heartbeat carries your name 🌹
              </p>
            </div>
          </div>

          {/* 3. THE HANDWRITTEN LETTER BODY */}
          <div
            className={`font-handwriting ${
              fontSizeMultiplier === "normal"
                ? "text-[19px] sm:text-[22px] leading-[34px] sm:leading-[38px]"
                : "text-[22px] sm:text-[25px] leading-[38px] sm:leading-[42px]"
            } text-[#2b161c] pl-4 sm:pl-8 space-y-6 select-text`}
          >
            
            {/* Opening Paragraph */}
            <div className="relative">
              <p className="font-cursive text-2xl sm:text-3xl text-rose-600 font-bold mb-2">
                Hey baby doll 🌹💗
              </p>
              <p>
                I hope aapne last night ke baad achhi si sleep li hogi 🤭🤭. Aaj mann kiya ki main aapko properly describe karu—exactly the way I see you, the way I feel about you… so here it goes 🫣🌺
              </p>
            </div>

            {/* Gratitude Hook */}
            <div className="relative pl-3 border-l-2 border-rose-300/60 bg-rose-50/40 rounded-r-xl py-1 my-2">
              <p className="text-[#881337] font-semibold">
                Sabse pehle, I love you sooo much, my baby 🥺💗🌹. Thank you so much meri life mein hone ke liye, meri hone ke liye, meri everything banne ke liye 🧿🌺. Honestly, words khatam ho jayenge but aapko describe karna kabhi khatam nahi hoga 🫣💘.
              </p>
            </div>

            {/* 1. Nature */}
            <div className="relative">
              <div className="inline-block font-cursive text-xl sm:text-2xl text-rose-600 font-bold mb-1 border-b border-rose-300/50 pb-0.5">
                1. Your Pure Soul & Nature 🥺✨
              </div>
              <p>
                Firstly, I want to talk about your nature. Bachaa, you are genuinely such a pure soul naa, main explain bhi nahi kar sakta 🥺. You are one of the most kind-hearted, caring and loving people I know, especially with me 💗. The way you care for me, the way you listen to me, meri stupid se stupid baatein bhi patiently sunti ho, everything about you feels exceptional 🫶🥹. Theek hai bachaa? Never change this beautiful heart of yours. I love you sooo much 💖💗🌹.
              </p>
            </div>

            {/* Quote Card 1: Pure Soul */}
            <div className="p-3.5 bg-gradient-to-r from-rose-50/90 to-purple-50/90 rounded-2xl border border-rose-200/70 shadow-2xs my-3 text-rose-900 font-serif italic text-base sm:text-lg flex items-center gap-2.5">
              <Quote className="w-5 h-5 text-rose-400 shrink-0" />
              <span>“In a world full of noise, your gentle and pure heart is my sweetest sanctuary.” 🌸✨</span>
            </div>

            {/* 2. Personality */}
            <div className="relative">
              <div className="inline-block font-cursive text-xl sm:text-2xl text-purple-600 font-bold mb-1 border-b border-purple-300/50 pb-0.5">
                2. Heart-Melting Personality 🤭💞
              </div>
              <p>
                Second, your personality 🤭🤭. I know the way you sometimes give me control is just… heart-melting 😭🤭💗. But apart from that, your whole personality is so welcoming, energetic, cute and most importantly, beautiful. Aapke around rehna hi achha lagta hai 🥹. And always remember, I'm here for you. I'm here to make you happy, support you and stand beside you whenever you need me. Okay bachaa? I love you sooo much 🌺🧿🌹💗.
              </p>
            </div>

            {/* 3. Body */}
            <div className="relative">
              <div className="inline-block font-cursive text-xl sm:text-2xl text-rose-600 font-bold mb-1 border-b border-rose-300/50 pb-0.5">
                3. Perfect Exactly The Way You Are 🧿💗
              </div>
              <p>
                Third, I want to talk about your body. For me, you are already perfect exactly the way you are 🧿💗. Aap jaisi ho, mujhe bilkul vaisi hi pasand ho. I'm never here to judge you or make you feel like you need to change anything. Agar kabhi <span className="font-bold underline decoration-wavy decoration-rose-400 text-[#881337]">*aapko khud*</span> lage ki you want to improve something for yourself, then I'll be right there helping and supporting you 🌺. But please never think ki main aapko judge karta hu or I don't like something about you. Aap meri ho, aap jaisi ho meri favourite ho 😌💗. I'm here to support you at every point.
              </p>
            </div>

            {/* Quote Card 2: Perfect Body & Zero Judgement */}
            <div className="p-3.5 bg-gradient-to-r from-pink-50/90 to-rose-50/90 rounded-2xl border border-pink-200/70 shadow-2xs my-3 text-rose-900 font-serif italic text-base sm:text-lg flex items-center gap-2.5">
              <Quote className="w-5 h-5 text-pink-400 shrink-0" />
              <span>“You don't have to change a single curve or breath. You are flawlessly, undeniably my favourite girl.” 🧿💗</span>
            </div>

            {/* Cute Tape Note in Margin */}
            <div className="relative my-4 p-3 sm:p-4 bg-[#fff9eb] border border-[#f0dfaa] rounded-xl shadow-xs rotate-[-1deg] text-[#713f12]">
              <div className="absolute -top-2 left-6 w-12 h-4 bg-amber-200/70 backdrop-blur-xs rounded-xs rotate-[-3deg] border-t border-amber-300/50" />
              <p className="text-base sm:text-lg font-bold flex items-center gap-1.5">
                <span>📌 Little Secret Note:</span>
              </p>
              <p className="text-sm sm:text-base mt-0.5">
                You never need to change a single thing for anyone in the universe. You are my absolute favourite girl. 🌸💖
              </p>
            </div>

            {/* 4. Deep Head to Toe Description */}
            <div className="relative space-y-4">
              <div className="inline-block font-cursive text-2xl sm:text-3xl text-rose-700 font-bold border-b-2 border-rose-400/60 pb-1">
                4. Described Deeply: Head to Toe 😏🌹🔥
              </div>
              <p className="italic font-semibold text-rose-600">
                And fourth… ab thoda deeply describe karte hain 🤭🤭🫣. Head to toe 😏🌹.
              </p>

              {/* Face & Lips */}
              <div className="bg-rose-50/50 rounded-xl p-3 sm:p-4 border border-rose-200/60">
                <p>
                  Let's start with your face. I swear, I just can't get over it 🥺. Aisa mann karta hai ki poore time bas aapko dekhta rahu 😭💗. Your eyes are sooo beautiful 🫣, and your lips… don't even get me started 🤭. They look so damn kissable, mann karta hai bas pakad ke kiss karta rahu 😭🤭💋. And your cheeks are sooo soft and cute, I literally want to eat them 😭🫣—samajh rahi ho naa what I mean 🤭🤭.
                </p>
              </div>

              {/* Neck */}
              <div className="bg-pink-50/50 rounded-xl p-3 sm:p-4 border border-pink-200/60">
                <p>
                  Then your neck… 😏🫣. Mujhe toh seriously lagta woh bani hi meri kisses aur little love bites ke liye hai 🤭💗.
                </p>
              </div>

              {/* Chest / Curves */}
              <div className="bg-rose-50/50 rounded-xl p-3 sm:p-4 border border-rose-200/60">
                <p>
                  And then thoda aur neeche… 🫣🫣 you know what's there naa 🤭. Your boobs 😮💨🤭. I haven't properly seen them yet, but still I already know they'll be beautiful because they're yours 🧿. Mann karta hai unhe hold karu, squeeze karu, kiss karu, give them all my love and leave cute little love bites and hickeys 🤭🫣😮💨. They'd look sooo pretty 😏💗.
                </p>
              </div>

              {/* Waist & Belly */}
              <div className="bg-pink-50/50 rounded-xl p-3 sm:p-4 border border-pink-200/60">
                <p>
                  Then your belly and waist 🥹. Iska toh kya hi bolu… whenever I'm standing beside you, mann karta hai bas waist hold karke rakhu 😭💗. It genuinely feels sooo good, so comforting, like you're exactly where you're supposed to be 🥹. I feel so secure holding you like that, and I really hope you feel that same comfort and safety with me too 🥺🧿.
                </p>
              </div>

              {/* Deep Intimacy */}
              <div className="bg-purple-50/50 rounded-xl p-3 sm:p-4 border border-purple-200/60">
                <p>
                  Then thoda aur neeche… 🤭🫣 you know again 😏. Your pussy hehe 🤭. I haven't seen it either, but obviously mere liye toh woh bhi beautiful hi hogi 🧿💗. I want to make you feel amazing, give you pleasure, make you feel comfortable and safe with me, and when we're both ready and want it, I definitely want to be that close to you 🫣💗. Not just because of attraction, but because it's <span className="font-bold text-purple-700 underline decoration-wavy decoration-purple-400">*you*</span>. I only want you, because when I look at you, I don't just think about today… I genuinely imagine a future with you 😌🧿🌺.
                </p>
              </div>

              {/* Thighs & Hair */}
              <div className="bg-rose-50/50 rounded-xl p-3 sm:p-4 border border-rose-200/60 space-y-2">
                <p>
                  Then your thighs and legs 🤭🤭. And you already know naa—I love thick thighs 😏😭, and you literally have everything I like 🤭💗.
                </p>
                <p className="border-t border-rose-200/60 pt-2 font-medium text-[#881337]">
                  And waittt, how could I forget your hair 😭😂. You have such beautiful hair bachaa 😌🥹💗. I love everything about it, and honestly everything about you.
                </p>
              </div>
            </div>

            {/* Quote Card 3: Head to Toe & Passion */}
            <div className="p-3.5 bg-gradient-to-r from-purple-50/90 via-rose-50/90 to-pink-50/90 rounded-2xl border border-rose-200/70 shadow-2xs my-3 text-rose-900 font-serif italic text-base sm:text-lg flex items-center gap-2.5">
              <Quote className="w-5 h-5 text-rose-500 shrink-0" />
              <span>“Your lips are my favourite weakness, your waist is my safe haven, and your heart is my forever destination.” 😏💋🔥</span>
            </div>

            {/* Insecurities & Sacred Promise */}
            <div className="relative pt-2 space-y-3">
              <p>
                So yaa… abb almost sab kuch explain kar diya 🤭🤭. From your hair, your face, your eyes, your lips, your body, all the way down to your legs… every little part of you 💗🌺.
              </p>
              <div className="p-4 bg-gradient-to-r from-rose-100/70 via-pink-100/60 to-rose-100/70 rounded-2xl border border-rose-300/70 font-semibold text-[#881337] shadow-2xs">
                And especially the parts of yourself that you sometimes feel insecure about—I want to kiss those parts a little more 🥹💗. I want you to slowly see yourself the way I see you. Beautiful, attractive, lovable and completely worthy of being loved 🧿🥺.
              </div>
              <p>
                I want you to feel like the most secure girl whenever you're with me. Never sit alone and overthink about yourself, okay bachaa? 🥺🥹 Because I'm here for you. Always. 🌺🧿💗
              </p>
              <p className="text-gray-500 italic">
                So there you are… properly described from head to toe 🤭🤭🤭.
              </p>
            </div>

            {/* Quote Card 4: Sacred Promise & Security */}
            <div className="p-3.5 bg-gradient-to-r from-rose-50/90 to-amber-50/90 rounded-2xl border border-amber-200/70 shadow-2xs my-3 text-amber-950 font-serif italic text-base sm:text-lg flex items-center gap-2.5">
              <Quote className="w-5 h-5 text-amber-500 shrink-0" />
              <span>“As long as I am with you, you will never have to doubt if you are cherished, adored, and completely protected.” 🥺💍</span>
            </div>

            {/* Grand Finale Sign-off */}
            <div className="relative pt-4 border-t-2 border-rose-200/70 space-y-3">
              <p className="font-bold text-rose-700 text-xl sm:text-2xl">
                Abb insecure nahi hona 😌😌 because your boy is here for you, always and forever 🧿🌺💗.
              </p>
              <p className="font-bold text-[#881337] leading-relaxed">
                I love you sooo sooo much, my baby doll, my bachaa, my everything, my queen, my princess, my world, my better half, my favourite person and the best part of my life 🧿🌺💗🌹🌹🌹🌹🌹🌹🌹🌹
              </p>
              <p className="font-cursive text-2xl sm:text-3xl font-extrabold text-rose-600">
                I love youuuuu sooo muchhhh meri jaan 🥺💗🧿🌺🌹
              </p>
            </div>

            {/* Handwritten Signature Stamp */}
            <div className="pt-6 pb-2 flex flex-col items-end text-right">
              <p className="font-cursive text-xl text-gray-500">
                Forever & completely yours,
              </p>
              <p className="font-brush text-4xl sm:text-5xl text-[#881337] rotate-[-4deg] mt-1 drop-shadow-xs">
                Vansh 🖋️💖
              </p>
              <p className="text-xs font-sans text-rose-400 font-semibold mt-2 tracking-wider uppercase">
                Today, Tomorrow & For All Lifetimes 💍✨
              </p>
            </div>

          </div>

        </div>

        {/* 3. Interactive Romantic Whispers Card (Analyzed Quotes Carousel) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-purple-500/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-rose-300/40 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">💭</span>
              <span className="text-xs font-black tracking-wider uppercase text-rose-700">
                Love Whispers For {config.partnerName || "Ridhima"}
              </span>
            </div>
            <span className="text-[10px] font-bold text-rose-500 bg-white/70 px-2 py-0.5 rounded-full border border-rose-200">
              {quoteIndex + 1} / {ROMANTIC_QUOTES.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white/70 backdrop-blur-md rounded-xl p-3.5 border border-rose-200/70"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <span>{currentQuote.emoji}</span>
                  <span>{currentQuote.tag}</span>
                </span>
                <span className="text-[11px] italic font-medium text-gray-500">
                  {currentQuote.hindi}
                </span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-gray-800 leading-relaxed mt-1">
                “{currentQuote.quote}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-rose-200/40">
            <button
              onClick={prevQuote}
              className="px-3 py-1 bg-white/60 hover:bg-white text-gray-700 rounded-full text-xs font-bold flex items-center gap-1 border border-rose-200 transition-all cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuote}
              className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span>Next Whisper</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Interactive Touch */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-rose-600 font-bold">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>Made with all my heart for Ridhima</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

      </motion.div>
    </div>
  );
}
