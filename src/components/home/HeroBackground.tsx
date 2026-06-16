import { motion, useReducedMotion } from "motion/react";
import { slowFloat } from "./motionPresets";

export default function HeroBackground() {
    const shouldReduceMotion = useReducedMotion();
    const floatingProps = shouldReduceMotion ? {} : slowFloat;
    const alternateFloat = shouldReduceMotion
        ? {}
        : {
            animate: {
                y: [0, 6, 0],
                transition: {
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                },
            },
        };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 home-dot-grid" />

            <div className="absolute -right-40 top-24 h-96 w-96 rounded-full bg-lime-400/8 blur-[90px]" />
            <div className="absolute -bottom-48 left-12 h-105 w-105 rounded-full bg-yellow-400/6 blur-[100px]" />

            <motion.div className="absolute left-[7%] top-[16%] h-12 w-12 rounded-full border border-yellow-400/20 sm:h-16 sm:w-16" {...floatingProps} />
            <motion.div className="absolute bottom-[14%] right-[10%] h-16 w-16 rounded-full border border-lime-400/20 sm:h-24 sm:w-24" {...alternateFloat} />
            <div className="absolute right-[20%] top-[12%] h-5 w-5 rotate-135 border border-yellow-400/25" />

            <div className="hidden md:block absolute right-[45%] top-[26%] h-10 w-10 rotate-45 border border-zinc-300/60" />
            <div className="hidden md:block absolute right-[8%] top-[42%] h-8 w-8 rotate-45 border border-lime-400/20" />
            <div className="hidden md:block absolute left-[28%] top-[31%] h-3 w-3 rounded-full bg-lime-400/35" />
            <div className="hidden md:block absolute bottom-[15%] right-[25%] font-mono text-lg text-yellow-500/35 select-none">+</div>
            <div className="hidden md:block absolute left-[12%] top-[40%] font-mono text-lg text-lime-500/35 select-none">+</div>

            <svg className="hidden md:block absolute bottom-[12%] left-[8%] h-7 w-7 rotate-22 text-yellow-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3L22 20H2L12 3z" />
            </svg>
        </div>
    );
}
