import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "./motionPresets";

export default function HeroContent() {
    const shouldReduceMotion = useReducedMotion();
    const initial = shouldReduceMotion ? undefined : "hidden";
    const animate = shouldReduceMotion ? undefined : "visible";

    return (
        <motion.div className="flex flex-col justify-center lg:col-span-6" variants={staggerContainer} initial={initial} animate={animate}>
            <motion.div className="mb-5 flex items-center gap-3 sm:mb-7 lg:mb-8" variants={fadeUp}>
                <div className="theme-accent-fill h-2 w-2 shrink-0 rounded-full" />
                <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:text-xs">desenvolvimento sob medida</span>
            </motion.div>

            <motion.h1 className="theme-text-primary max-w-[11ch] text-[clamp(3.05rem,13vw,5rem)] font-black leading-[1.03] tracking-tight sm:max-w-none sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.6rem,5.6vw,5rem)]" variants={fadeUp}>
                Sua ideia
                <br />
                transformada
                <br />
                <span className="hero-title-mark inline-block whitespace-nowrap">em projeto real.</span>
            </motion.h1>

            <div className="mt-7 max-w-xl space-y-4 sm:mt-8">
                <motion.p className="text-justify theme-text-secondary text-base font-medium leading-relaxed sm:text-lg" variants={fadeUp}>
                    A LemonLabs ajuda a transformar ideias, necessidades e rascunhos iniciais em soluções digitais reais, com estrutura, personalidade e atenção ao que faz sentido para o seu projeto.
                </motion.p>

                <motion.p className="text-justify theme-text-muted text-sm leading-relaxed sm:text-base" variants={fadeUp}>
                    Sites, apps de celular, apps de computador, páginas institucionais, integrações e automações criadas especialmente para o seu caso de uso.
                </motion.p>
            </div>

            <motion.div className="mt-8 flex w-full flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6" variants={fadeUp}>
                <Link to="/contato" className="theme-cta-primary group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-lg sm:w-auto sm:px-10">
                    <span className="relative z-10 flex items-center gap-2">
                        Montar minha solução
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1.5" strokeWidth={2.25} />
                    </span>
                </Link>

                <Link to="/servicos" className="theme-link-accent inline-flex justify-center text-sm font-bold opacity-80 underline underline-offset-4 transition-opacity duration-500 hover:opacity-100 sm:justify-start">
                    Ver planos de serviços
                </Link>
            </motion.div>
        </motion.div>
    );
}
