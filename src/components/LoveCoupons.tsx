import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Sparkles, Heart, Check, Send, Gift, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { ProposalConfig } from "../types";
import { romanticAudio } from "../utils/audio";

interface LoveCouponsProps {
  config: ProposalConfig;
}

interface Coupon {
  id: string;
  title: string;
  emoji: string;
  description: string;
  perk: string;
  color: string;
  bgGradient: string;
  border: string;
  textColor: string;
}

const COUPONS: Coupon[] = [
  {
    id: "kisses",
    title: "Unlimited Kisses Pass",
    emoji: "💋",
    description: "Redeemable for endless forehead kisses, gentle neck kisses, cheek bites & deep cuddles.",
    perk: "Never expires • Unlimited refills",
    color: "rose",
    bgGradient: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    textColor: "text-rose-700"
  },
  {
    id: "snack",
    title: "Your Snack is Ready!",
    emoji: "🍟",
    description: "Whenever cravings hit—midnight pizza, fries, ice cream, or chocolates delivered right to you.",
    perk: "Zero cooking for you • Chef Vansh on duty",
    color: "amber",
    bgGradient: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    textColor: "text-amber-800"
  },
  {
    id: "massage",
    title: "Free Back & Neck Massage",
    emoji: "💆‍♀️",
    description: "30 minutes of soothing, relaxing pampering with soft music to melt all your stress away.",
    perk: "Ultimate relaxation • On-demand",
    color: "purple",
    bgGradient: "from-purple-50 to-pink-50",
    border: "border-purple-200",
    textColor: "text-purple-800"
  },
  {
    id: "drive",
    title: "Midnight Long Drive & Ice Cream",
    emoji: "🍦",
    description: "Late night quiet drive, holding hands while playing our favourite songs, followed by sweet ice cream.",
    perk: "Romantic vibes • Open window breeze",
    color: "pink",
    bgGradient: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    textColor: "text-pink-800"
  },
  {
    id: "argument",
    title: "Win Any Argument Instantly",
    emoji: "👑",
    description: "One golden pass where Vansh surrenders immediately and admits you are 100% right with zero questions.",
    perk: "Princess privilege • Instant victory",
    color: "yellow",
    bgGradient: "from-amber-50 to-yellow-50",
    border: "border-yellow-200",
    textColor: "text-yellow-800"
  },
  {
    id: "cuddles",
    title: "Endless Warm Cuddles Pass",
    emoji: "🫂",
    description: "Wrapped tightly in blankets with Vansh holding your waist close until you fall asleep peacefully.",
    perk: "100% Cozy • Pure warmth & comfort",
    color: "rose",
    bgGradient: "from-rose-50 to-purple-50",
    border: "border-rose-200",
    textColor: "text-rose-800"
  }
];

export default function LoveCoupons({ config }: LoveCouponsProps) {
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const handleRedeem = (coupon: Coupon) => {
    if (!redeemed.includes(coupon.id)) {
      setRedeemed((prev) => [...prev, coupon.id]);
      romanticAudio.playCelebration();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#f43f5e", "#ec4899", "#fda4af", "#ffbf00"]
      });
    }
  };

  const getWhatsAppLink = (coupon: Coupon) => {
    const text = encodeURIComponent(
      `Hey Vansh! 💖 I am redeeming my Love Coupon:\n\n🎟️ "${coupon.title} ${coupon.emoji}"\n${coupon.description}\n\nYou owe me this right now! 😘🌸`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="w-full font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800 font-sans">
              Romantic Love Coupons 🎟️
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Special treats for {config.partnerName || "Ridhima"} — redeem anytime & send to Vansh
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
          {redeemed.length} / {COUPONS.length} Redeemed
        </span>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {COUPONS.map((coupon) => {
          const isRedeemed = redeemed.includes(coupon.id);

          return (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`relative bg-gradient-to-br ${coupon.bgGradient} backdrop-blur-md rounded-2xl p-4 border ${coupon.border} shadow-2xs flex flex-col justify-between overflow-hidden`}
            >
              {/* Decorative Coupon Cutout circles on sides */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#fffefb] rounded-full border-r border-rose-200 pointer-events-none" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#fffefb] rounded-full border-l border-rose-200 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{coupon.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                    COUPON #{coupon.id.toUpperCase()}
                  </span>
                </div>

                <h4 className={`font-serif font-bold text-sm sm:text-base ${coupon.textColor}`}>
                  {coupon.title}
                </h4>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  {coupon.description}
                </p>
                <div className="mt-2 text-[10px] font-medium text-gray-400 italic">
                  ✨ {coupon.perk}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between gap-2">
                {isRedeemed ? (
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Redeemed! 💕</span>
                    </span>
                    <a
                      href={getWhatsAppLink(coupon)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Claim on WA 📲</span>
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRedeem(coupon)}
                    className="w-full py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full text-xs font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Redeem Treat 🎟️</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
