import { motion, useReducedMotion } from "motion/react";
import { softScale, staggerContainer } from "./motionPresets";

export default function HeroVisual() {
    const shouldReduceMotion = useReducedMotion();
    const initial = shouldReduceMotion ? undefined : "hidden";
    const animate = shouldReduceMotion ? undefined : "visible";
    const delayedReveal = shouldReduceMotion ? undefined : { duration: 0.65, delay: 0.15 };
    const cardReveal = shouldReduceMotion ? undefined : { duration: 0.65, delay: 0.25 };

    return (
        <motion.div
            className="relative mx-auto w-full max-w-105 pb-8 sm:max-w-130 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none lg:pb-0"
            variants={staggerContainer}
            initial={initial}
            animate={animate}
        >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-4xl bg-yellow-400/10 blur-2xl pointer-events-none sm:h-40 sm:w-40" />
            <div className="absolute -left-8 bottom-10 h-28 w-28 rounded-full bg-lime-400/10 blur-2xl pointer-events-none sm:h-32 sm:w-32" />

            <div className="hidden sm:block absolute -top-8 left-8 z-0 h-12 w-12 rounded-full border border-yellow-400/25 pointer-events-none" />
            <div className="hidden sm:block absolute right-0 top-24 z-0 h-8 w-8 rotate-45 border border-lime-400/30 pointer-events-none lg:-right-8" />

            <motion.div className="relative z-10 mx-auto aspect-4/3 w-full overflow-hidden rounded-[1.75rem] border border-white/70 bg-zinc-200 shadow-2xl sm:aspect-3/4 sm:max-w-85 sm:rounded-4xl lg:ml-auto lg:mr-0" variants={softScale}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Interface de sistema digital" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
                className="relative z-20 mx-auto -mt-14 aspect-16/10 w-[78%] overflow-hidden rounded-3xl border-4 border-zinc-50 bg-zinc-800 shadow-[0_20px_40px_rgb(0,0,0,0.15)] transition-transform duration-700 hover:scale-105 sm:absolute sm:-bottom-10 sm:-left-6 sm:mt-0 sm:aspect-square sm:w-52 lg:-left-12 lg:w-56"
                variants={softScale}
                transition={delayedReveal}
            >
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" alt="Detalhes de desenvolvimento" className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-all duration-500 hover:mix-blend-normal" />
            </motion.div>

            <motion.div
                className="relative z-30 mx-auto -mt-6 max-w-57.5 rounded-2xl border border-zinc-200 bg-white/90 px-5 py-4 text-center shadow-xl backdrop-blur transition-transform hover:-translate-y-1 sm:absolute sm:left-0 sm:top-8 sm:mx-0 sm:mt-0 sm:max-w-47.5 sm:text-left lg:-left-10"
                variants={softScale}
                transition={cardReveal}
            >
                <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-zinc-400">LemonLabs</p>
                <p className="mt-2 text-sm font-bold leading-snug text-zinc-900">Ideia, estrutura, desenvolvimento e distribuição.</p>
            </motion.div>
        </motion.div>
    );
}
