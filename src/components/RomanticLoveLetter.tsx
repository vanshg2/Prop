import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Download, Check, Copy, ChevronRight, ChevronLeft, Loader2, Quote } from "lucide-react";
import { ProposalConfig } from "../types";
import { romanticAudio } from "../utils/audio";
import { toPng } from "html-to-image";

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
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<"normal" | "large">("normal");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);

  // Spritz perfume / send kisses effect
  const handleSpritz = () => {
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

  // Download High-Resolution Keepsake PNG
  const handleDownload = async () => {
    if (!letterRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      romanticAudio.playChime(659.25);

      if (document.fonts) {
        await document.fonts.ready;
      }

      let dataUrl: string;
      try {
        dataUrl = await toPng(letterRef.current, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#fefcf8",
          cacheBust: true,
        });
      } catch (fontErr) {
        console.warn("Retrying toPng with skipFonts...", fontErr);
        dataUrl = await toPng(letterRef.current, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#fefcf8",
          skipFonts: true,
          cacheBust: true,
        });
      }

      const cleanPartnerName = (config.partnerName || "Ridhima").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
      const link = document.createElement("a");
      link.download = `Love_Letter_For_${cleanPartnerName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      romanticAudio.playCelebration();
    } catch (err) {
      console.error("Failed to download letter", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy Full Letter Text
  const handleCopyText = () => {
    const fullText = `Dearest ${config.partnerName || "Ridhima"},\n\n` +
      `Hey baby doll 🌹💗\n\n` +
      `I hope aapne last night ke baad achhi si sleep li hogi 🤭🤭. Aaj mann kiya ki main aapko properly describe karu—exactly the way I see you, the way I feel about you… so here it goes 🫣🌺\n\n` +
      `Sabse pehle, I love you sooo much, my baby 🥺💗🌹. Thank you so much meri life mein hone ke liye, meri hone ke liye, meri everything banne ke liye 🧿🌺. Honestly, words khatam ho jayenge but aapko describe karna kabhi khatam nahi hoga 🫣💘.\n\n` +
      `1. Your Nature: Bachaa, you are genuinely such a pure soul naa, main explain bhi nahi kar sakta 🥺. You are one of the most kind-hearted, caring and loving people I know, especially with me 💗. The way you care for me, the way you listen to me, meri stupid se stupid baatein bhi patiently sunti ho, everything about you feels exceptional 🫶🥹. Theek hai bachaa? Never change this beautiful heart of yours. I love you sooo much 💖💗🌹.\n\n` +
      `2. Your Personality: Second, your personality 🤭🤭. I know the way you sometimes give me control is just… heart-melting 😭🤭💗. But apart from that, your whole personality is so welcoming, energetic, cute and most importantly, beautiful. Aapke around rehna hi achha lagta hai 🥹. And always remember, I'm here for you. I'm here to make you happy, support you and stand beside you whenever you need me. Okay bachaa? I love you sooo much 🌺🧿🌹💗.\n\n` +
      `3. Your Body: Third, I want to talk about your body. For me, you are already perfect exactly the way you are 🧿💗. Aap jaisi ho, mujhe bilkul vaisi hi pasand ho. I'm never here to judge you or make you feel like you need to change anything. Agar kabhi *aapko khud* lage ki you want to improve something for yourself, then I'll be right there helping and supporting you 🌺. But please never think ki main aapko judge karta hu or I don't like something about you. Aap meri ho, aap jaisi ho meri favourite ho 😌💗. I'm here to support you at every point.\n\n` +
      `4. Head to Toe: And fourth… ab thoda deeply describe karte hain 🤭🤭🫣. Head to toe 😏🌹.\n` +
      `- Face: Let's start with your face. I swear, I just can't get over it 🥺. Aisa mann karta hai ki poore time bas aapko dekhta rahu 😭💗. Your eyes are sooo beautiful 🫣, and your lips… don't even get me started 🤭. They look so damn kissable, mann karta hai bas pakad ke kiss karta rahu 😭🤭💋. And your cheeks are sooo soft and cute, I literally want to eat them 😭🫣—samajh rahi ho naa what I mean 🤭🤭.\n` +
      `- Neck: Then your neck… 😏🫣. Mujhe toh seriously lagta hai woh bani hi meri kisses aur little love bites ke liye hai 🤭💗.\n` +
      `- Curves: And then thoda aur neeche… 🫣🫣 you know what's there naa 🤭. Your boobs 😮💨🤭. I haven't properly seen them yet, but still I already know they'll be beautiful because they're yours 🧿. Mann karta hai unhe hold karu, squeeze karu, kiss karu, give them all my love and leave cute little love bites and hickeys 🤭🫣😮💨. They'd look sooo pretty 😏💗.\n` +
      `- Waist: Then your belly and waist 🥹. Iska toh kya hi bolu… whenever I'm standing beside you, mann karta hai bas waist hold karke rakhu 😭💗. It genuinely feels sooo good, so comforting, like you're exactly where you're supposed to be 🥹. I feel so secure holding you like that, and I really hope you feel that same comfort and safety with me too 🥺🧿.\n` +
      `- Intimacy: Then thoda aur neeche… 🤭🫣 you know again 😏. Your pussy hehe 🤭. I haven't seen it either, but obviously mere liye toh woh bhi beautiful hi hogi 🧿💗. I want to make you feel amazing, give you pleasure, make you feel comfortable and safe with me, and when we're both ready and want it, I definitely want to be that close to you 🫣💗. Not just because of attraction, but because it's *you*. I only want you, because when I look at you, I don't just think about today… I genuinely imagine a future with you 😌🧿🌺.\n` +
      `- Thighs & Hair: Then your thighs and legs 🤭🤭. And you already know naa—I love thick thighs 😏😭, and you literally have everything I like 🤭💗. And waittt, how could I forget your hair 😭😂. You have such beautiful hair bachaa 😌🥹💗. I love everything about it, and honestly everything about you.\n\n` +
      `5. Sacred Promise: So yaa… abb almost sab kuch explain kar diya 🤭🤭. From your hair, your face, your eyes, your lips, your body, all the way down to your legs… every little part of you 💗🌺. And especially the parts of yourself that you sometimes feel insecure about—I want to kiss those parts a little more 🥹💗. I want you to slowly see yourself the way I see you. Beautiful, attractive, lovable and completely worthy of being loved 🧿🥺. I want you to feel like the most secure girl whenever you're with me. Never sit alone and overthink about yourself, okay bachaa? 🥺🥹 Because I'm here for you. Always. 🌺🧿💗\n\n` +
      `Abb insecure nahi hona 😌😌 because your boy is here for you, always and forever 🧿🌺💗.\n` +
      `I love you sooo sooo much, my baby doll, my bachaa, my everything, my queen, my princess, my world, my better half, my favourite person and the best part of my life 🧿🌺💗🌹🌹🌹🌹🌹🌹🌹🌹\n` +
      `I love youuuuu sooo muchhhh meri jaan 🥺💗🧿🌺🌹\n\n` +
      `Forever yours,\nVansh 🖋️💖`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    romanticAudio.playChime(659.25);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentQuote = ROMANTIC_QUOTES[quoteIndex];

  return (
    <div className="w-full mt-2 flex flex-col items-center select-none sm:select-text space-y-6">

      {/* Floating Petals when Spritz is clicked */}
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ opacity: 0, scale: 0, y: 10, rotate: petal.rotation }}
            animate={{ opacity: [0, 1, 1, 0], scale: petal.scale, y: -90, rotate: petal.rotation + 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{ left: `${petal.x}%`, top: `${petal.y}%` }}
            className="fixed pointer-events-none z-50 text-2xl sm:text-3xl drop-shadow-md"
          >
            {petal.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 1. Sleek Floating Luxury Keepsake Bar */}
      <div className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-xl rounded-full border border-rose-200/80 shadow-[0_4px_20px_rgba(244,63,94,0.08)] font-sans">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-[11px] shadow-2xs">
            🖋️
          </div>
          <span className="font-serif italic text-xs sm:text-sm font-bold text-rose-900">
            For {config.partnerName || "Ridhima"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Download Keepsake Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-3.5 py-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
            title="Download high-resolution keepsake letter image"
          >
            {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isDownloading ? "Saving..." : "Save Image 📸"}</span>
          </button>

          {/* Spritz Perfume Button */}
          <button
            onClick={handleSpritz}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-xs font-bold border border-rose-200 flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Spritz sweet floral perfume & send kisses"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Spritz</span> 🌸💋
          </button>

          {/* Copy Text Button */}
          <button
            onClick={handleCopyText}
            className="px-3 py-1.5 bg-white text-gray-700 hover:text-rose-700 rounded-full text-xs font-bold border border-rose-200 flex items-center gap-1 shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Copy full text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-rose-500" />}
            <span>{copied ? "Copied! 💕" : "Copy"}</span>
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSizeMultiplier(fontSizeMultiplier === "normal" ? "large" : "normal")}
            className="px-2.5 py-1.5 bg-white text-gray-600 hover:text-rose-600 rounded-full text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
            title="Toggle text size"
          >
            {fontSizeMultiplier === "normal" ? "A+" : "A-"}
          </button>
        </div>
      </div>

      {/* 2. THE TIMELESS VINTAGE PARCHMENT LOVE LETTER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
      >
        <div
          ref={letterRef}
          className="relative w-full bg-[#fefcf8] rounded-3xl shadow-[0_20px_60px_rgba(136,19,55,0.12),0_2px_12px_rgba(0,0,0,0.04)] border border-[#e8d7c5] p-7 sm:p-12 lg:p-16 text-[#331822] overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#f7efe3 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        >
          {/* Elegant Double Vintage Gold/Rose Inner Border */}
          <div className="absolute inset-3 sm:inset-5 border border-amber-300/40 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 sm:inset-6 border border-rose-200/50 rounded-xl pointer-events-none" />

          {/* Decorative Vintage Corner Filigree Ornaments */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-amber-500/60 text-xs sm:text-sm font-serif pointer-events-none">❦</div>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-amber-500/60 text-xs sm:text-sm font-serif pointer-events-none">❧</div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-amber-500/60 text-xs sm:text-sm font-serif pointer-events-none">❧</div>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-amber-500/60 text-xs sm:text-sm font-serif pointer-events-none">❦</div>

          {/* Vintage Stamp in Top Right */}
          <div className="absolute top-7 right-7 sm:top-10 sm:right-10 flex flex-col items-center pointer-events-none select-none z-10">
            <div className="w-14 h-16 sm:w-16 sm:h-20 border-2 border-dashed border-rose-400/80 bg-rose-50/70 rounded-xs flex flex-col items-center justify-center p-1 shadow-2xs rotate-3">
              <span className="text-xl sm:text-2xl">🕊️</span>
              <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-rose-600 mt-0.5 font-sans">
                AIR MAIL
              </span>
              <span className="text-[6px] text-rose-500 font-serif">100% PURE LOVE</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-rose-400/50 -mt-5 -mr-4 flex items-center justify-center -rotate-12 pointer-events-none">
              <span className="text-[6px] font-black text-rose-500/80 uppercase tracking-widest text-center font-sans">
                SEALED<br />WITH A KISS
              </span>
            </div>
          </div>

          {/* Interactive Lipstick Kiss Imprint on Bottom */}
          <button
            onClick={handleSpritz}
            className="absolute bottom-12 right-10 sm:bottom-16 sm:right-16 opacity-95 rotate-12 z-20 hover:scale-125 active:scale-95 transition-transform cursor-pointer group"
            title="Click to receive my kiss 💋"
          >
            <span className="text-4xl sm:text-5xl filter drop-shadow-[0_4px_8px_rgba(244,63,94,0.35)] block group-hover:animate-pulse">
              💋
            </span>
          </button>

          {/* Letter Header with Golden Wax Seal */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-rose-200/60 pr-16 sm:pr-24">
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-amber-100 shadow-[0_6px_16px_rgba(225,29,72,0.35)] border-2 border-amber-300/80 rotate-[-6deg] shrink-0">
              <span className="text-lg sm:text-xl font-serif font-black tracking-tight">V&R</span>
              <div className="absolute -inset-1 rounded-full border border-amber-300/40 animate-pulse pointer-events-none" />
            </div>
            <div>
              <h2 className="font-cursive text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#881337] tracking-wide leading-none">
                Dearest {config.partnerName || "Ridhima"}
              </h2>
              <p className="font-handwriting text-base sm:text-lg text-rose-600/90 mt-1 font-medium">
                Every heartbeat carries your name 🌹✨
              </p>
            </div>
          </div>

          {/* THE LETTER BODY */}
          <div
            className={`font-handwriting ${
              fontSizeMultiplier === "normal"
                ? "text-[21px] sm:text-[25px] leading-[38px] sm:leading-[44px]"
                : "text-[24px] sm:text-[28px] leading-[42px] sm:leading-[48px]"
            } text-[#331822] space-y-7 select-text`}
          >
            
            {/* Opening Paragraph */}
            <div>
              <p className="font-cursive text-3xl sm:text-4xl text-rose-600 font-bold mb-2">
                Hey baby doll 🌹💗
              </p>
              <p>
                I hope aapne last night ke baad achhi si sleep li hogi 🤭🤭. Aaj mann kiya ki main aapko properly describe karu—exactly the way I see you, the way I feel about you… so here it goes 🫣🌺
              </p>
            </div>

            {/* Gratitude Statement */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-100/60 via-pink-50/50 to-rose-100/60 rounded-2xl border-l-4 border-rose-500 text-[#7a1230] font-semibold shadow-2xs">
              Sabse pehle, I love you sooo much, my baby 🥺💗🌹. Thank you so much meri life mein hone ke liye, meri hone ke liye, meri everything banne ke liye 🧿🌺. Honestly, words khatam ho jayenge but aapko describe karna kabhi khatam nahi hoga 🫣💘.
            </div>

            {/* 1. Nature */}
            <div>
              <div className="inline-flex items-center gap-2 font-cursive text-2xl sm:text-3xl text-rose-700 font-bold mb-1">
                <span>✦ 1. Your Pure Soul & Nature 🥺✨</span>
              </div>
              <p className="mt-1">
                Firstly, I want to talk about your nature. Bachaa, you are genuinely such a pure soul naa, main explain bhi nahi kar sakta 🥺. You are one of the most kind-hearted, caring and loving people I know, especially with me 💗. The way you care for me, the way you listen to me, meri stupid se stupid baatein bhi patiently sunti ho, everything about you feels exceptional 🫶🥹. Theek hai bachaa? Never change this beautiful heart of yours. I love you sooo much 💖💗🌹.
              </p>
            </div>

            {/* 2. Personality */}
            <div>
              <div className="inline-flex items-center gap-2 font-cursive text-2xl sm:text-3xl text-purple-700 font-bold mb-1">
                <span>✦ 2. Heart-Melting Personality 🤭💞</span>
              </div>
              <p className="mt-1">
                Second, your personality 🤭🤭. I know the way you sometimes give me control is just… heart-melting 😭🤭💗. But apart from that, your whole personality is so welcoming, energetic, cute and most importantly, beautiful. Aapke around rehna hi achha lagta hai 🥹. And always remember, I'm here for you. I'm here to make you happy, support you and stand beside you whenever you need me. Okay bachaa? I love you sooo much 🌺🧿🌹💗.
              </p>
            </div>

            {/* 3. Body */}
            <div>
              <div className="inline-flex items-center gap-2 font-cursive text-2xl sm:text-3xl text-rose-700 font-bold mb-1">
                <span>✦ 3. Perfect Exactly The Way You Are 🧿💗</span>
              </div>
              <p className="mt-1">
                Third, I want to talk about your body. For me, you are already perfect exactly the way you are 🧿💗. Aap jaisi ho, mujhe bilkul vaisi hi pasand ho. I'm never here to judge you or make you feel like you need to change anything. Agar kabhi <span className="font-bold underline decoration-wavy decoration-rose-400 text-rose-700">*aapko khud*</span> lage ki you want to improve something for yourself, then I'll be right there helping and supporting you 🌺. But please never think ki main aapko judge karta hu or I don't like something about you. Aap meri ho, aap jaisi ho meri favourite ho 😌💗. I'm here to support you at every point.
              </p>
            </div>

            {/* Floral Callout Divider */}
            <div className="text-center py-2 text-rose-400/80 font-serif select-none">
              ❦ ──────── ❀ ──────── ❦
            </div>

            {/* 4. Deep Head to Toe Description */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-cursive text-3xl sm:text-4xl text-rose-800 font-extrabold">
                <span>✦ 4. Described Deeply: Head to Toe 😏🌹🔥</span>
              </div>
              <p className="italic font-semibold text-rose-600 text-xl sm:text-2xl font-cursive">
                And fourth… ab thoda deeply describe karte hain 🤭🤭🫣. Head to toe 😏🌹.
              </p>

              {/* Face */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Face & Lips:</strong> Let's start with your face. I swear, I just can't get over it 🥺. Aisa mann karta hai ki poore time bas aapko dekhta rahu 😭💗. Your eyes are sooo beautiful 🫣, and your lips… don't even get me started 🤭. They look so damn kissable, mann karta hai bas pakad ke kiss karta rahu 😭🤭💋. And your cheeks are sooo soft and cute, I literally want to eat them 😭🫣—samajh rahi ho naa what I mean 🤭🤭.
              </p>

              {/* Neck */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Neck:</strong> Then your neck… 😏🫣. Mujhe toh seriously lagta hai woh bani hi meri kisses aur little love bites ke liye hai 🤭💗.
              </p>

              {/* Chest / Curves */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Curves:</strong> And then thoda aur neeche… 🫣🫣 you know what's there naa 🤭. Your boobs 😮💨🤭. I haven't properly seen them yet, but still I already know they'll be beautiful because they're yours 🧿. Mann karta hai unhe hold karu, squeeze karu, kiss karu, give them all my love and leave cute little love bites and hickeys 🤭🫣😮💨. They'd look sooo pretty 😏💗.
              </p>

              {/* Waist */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Waist & Belly:</strong> Then your belly and waist 🥹. Iska toh kya hi bolu… whenever I'm standing beside you, mann karta hai bas waist hold karke rakhu 😭💗. It genuinely feels sooo good, so comforting, like you're exactly where you're supposed to be 🥹. I feel so secure holding you like that, and I really hope you feel that same comfort and safety with me too 🥺🧿.
              </p>

              {/* Deep Intimacy */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Intimacy:</strong> Then thoda aur neeche… 🤭🫣 you know again 😏. Your pussy hehe 🤭. I haven't seen it either, but obviously mere liye toh woh bhi beautiful hi hogi 🧿💗. I want to make you feel amazing, give you pleasure, make you feel comfortable and safe with me, and when we're both ready and want it, I definitely want to be that close to you 🫣💗. Not just because of attraction, but because it's <span className="font-bold text-rose-700 underline decoration-wavy decoration-rose-400">*you*</span>. I only want you, because when I look at you, I don't just think about today… I genuinely imagine a future with you 😌🧿🌺.
              </p>

              {/* Thighs & Hair */}
              <p>
                <strong className="text-rose-700 font-bold font-serif">• Thighs & Hair:</strong> Then your thighs and legs 🤭🤭. And you already know naa—I love thick thighs 😏😭, and you literally have everything I like 🤭💗. And waittt, how could I forget your hair 😭😂. You have such beautiful hair bachaa 😌🥹💗. I love everything about it, and honestly everything about you.
              </p>
            </div>

            {/* Floral Callout Divider */}
            <div className="text-center py-2 text-rose-400/80 font-serif select-none">
              ❦ ──────── ❀ ──────── ❦
            </div>

            {/* 5. Insecurities & Sacred Promise */}
            <div className="space-y-3">
              <p>
                So yaa… abb almost sab kuch explain kar diya 🤭🤭. From your hair, your face, your eyes, your lips, your body, all the way down to your legs… every little part of you 💗🌺.
              </p>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-100/70 via-pink-100/60 to-rose-100/70 rounded-2xl border border-rose-300/70 font-semibold text-[#881337] shadow-2xs">
                And especially the parts of yourself that you sometimes feel insecure about—I want to kiss those parts a little more 🥹💗. I want you to slowly see yourself the way I see you. Beautiful, attractive, lovable and completely worthy of being loved 🧿🥺.
              </div>
              <p>
                I want you to feel like the most secure girl whenever you're with me. Never sit alone and overthink about yourself, okay bachaa? 🥺🥹 Because I'm here for you. Always. 🌺🧿💗
              </p>
            </div>

            {/* Grand Finale Sign-off */}
            <div className="pt-4 border-t-2 border-rose-200/70 space-y-3">
              <p className="font-bold text-rose-700 text-2xl sm:text-3xl font-cursive">
                Abb insecure nahi hona 😌😌 because your boy is here for you, always and forever 🧿🌺💗.
              </p>
              <p className="font-bold text-[#881337] leading-relaxed text-xl sm:text-2xl">
                I love you sooo sooo much, my baby doll, my bachaa, my everything, my queen, my princess, my world, my better half, my favourite person and the best part of my life 🧿🌺💗🌹🌹🌹🌹🌹🌹🌹🌹
              </p>
              <p className="font-cursive text-3xl sm:text-4xl font-extrabold text-rose-600">
                I love youuuuu sooo muchhhh meri jaan 🥺💗🧿🌺🌹
              </p>
            </div>

            {/* Handwritten Signature Stamp */}
            <div className="pt-8 pb-2 flex flex-col items-end text-right">
              <p className="font-cursive text-2xl text-gray-500">
                Forever & completely yours,
              </p>
              <p className="font-brush text-5xl sm:text-6xl text-[#881337] rotate-[-4deg] mt-1 drop-shadow-xs">
                Vansh 🖋️💖
              </p>
              <p className="text-xs font-sans text-rose-400 font-semibold mt-2 tracking-wider uppercase">
                Today, Tomorrow & For All Lifetimes 💍✨
              </p>
            </div>

          </div>

        </div>
      </motion.div>

      {/* 3. Love Whispers Quote Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-purple-500/10 backdrop-blur-xl rounded-3xl p-5 border border-rose-200/70 shadow-xs font-sans"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💭</span>
            <span className="text-xs font-bold tracking-wider uppercase text-rose-800">
              Love Whispers For {config.partnerName || "Ridhima"}
            </span>
          </div>
          <span className="text-[10px] font-bold text-rose-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-rose-200">
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
            className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-rose-200/70 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                <span>{currentQuote.emoji}</span>
                <span>{currentQuote.tag}</span>
              </span>
              <span className="text-xs italic font-medium text-gray-500 font-serif">
                {currentQuote.hindi}
              </span>
            </div>
            <p className="font-serif italic text-sm sm:text-base text-gray-800 leading-relaxed mt-1">
              “{currentQuote.quote}”
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-rose-200/50">
          <button
            onClick={prevQuote}
            className="px-3.5 py-1 bg-white hover:bg-rose-50 text-gray-700 rounded-full text-xs font-bold flex items-center gap-1 border border-rose-200 transition-all cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextQuote}
            className="px-4 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            <span>Next Whisper</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

    </div>
  );
}
