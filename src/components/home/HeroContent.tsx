import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "./motionPresets";

export default function HeroContent() {
    const shouldReduceMotion = useReducedMotion();
    const initial = shouldReduceMotion ? undefined : "hidden";
    const animate = shouldReduceMotion ? undefined : "visible";

    return (
        <motion.div
            className="flex flex-col justify-center lg:col-span-6"
            variants={staggerContainer}
            initial={initial}
            animate={animate}
        >
            <motion.div className="mb-5 flex items-center gap-3 sm:mb-7 lg:mb-8" variants={fadeUp}>
                <div className="h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">desenvolvimento sob medida</span>
            </motion.div>

            <motion.h1 className="max-w-[11ch] text-[clamp(3.05rem,13vw,5rem)] font-black leading-[0.98] tracking-tight text-zinc-950 sm:max-w-none sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.6rem,5.6vw,5rem)]" variants={fadeUp}>
                Sua ideia
                <br />
                transformada
                <br />
                <span className="relative z-0 inline-block whitespace-nowrap">
                    em projeto real.
                    <span className="absolute bottom-1 left-0 -z-10 h-3 w-full -skew-x-12 bg-yellow-400 sm:bottom-2 sm:h-5" />
                </span>
            </motion.h1>

            <div className="mt-7 max-w-xl space-y-4 sm:mt-8">
                <motion.p className="text-base font-medium leading-relaxed text-zinc-600 sm:text-lg" variants={fadeUp}>A LemonLabs ajuda a transformar ideias, necessidades e rascunhos iniciais em soluções digitais reais, com estrutura, personalidade e atenção ao que faz sentido para cada projeto.</motion.p>

                <motion.p className="text-sm leading-relaxed text-zinc-500 sm:text-base" variants={fadeUp}>Sites, sistemas, páginas institucionais, integrações e automações criadas para resolver problemas de forma clara, sem fórmulas prontas, sem exageros e sem perder o toque pessoal da sua ideia.</motion.p>
            </div>

            <motion.div className="mt-8 flex w-full flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6" variants={fadeUp}>
                <Link to="/contato" className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_10px_34px_rgb(0,0,0,0.16)] sm:w-auto sm:px-8">
                    <span className="relative z-10 flex items-center gap-2">
                        Tirar ideia do papel
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </Link>

                <Link to="/servicos" className="inline-flex justify-center text-sm font-bold text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-950 sm:justify-start">
                    Ver formas de trabalho
                </Link>
            </motion.div>
        </motion.div>
    );
}
