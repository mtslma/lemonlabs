import { motion, useReducedMotion } from "motion/react";
import { motionTokens, softScale, staggerContainer } from "./motionPresets";

export default function HeroVisual() {
    const shouldReduceMotion = useReducedMotion();
    const initial = shouldReduceMotion ? undefined : "hidden";
    const animate = shouldReduceMotion ? undefined : "visible";
    const delayedReveal = shouldReduceMotion ? undefined : { duration: motionTokens.durationBase, delay: motionTokens.delayMedium, ease: motionTokens.easeEmphasized };
    const cardReveal = shouldReduceMotion ? undefined : { duration: motionTokens.durationBase, delay: motionTokens.delayLarge, ease: motionTokens.easeEmphasized };

    return (
        <motion.div className="relative mx-auto w-full max-w-105 pb-12 sm:max-w-130 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none lg:pb-0" variants={staggerContainer} initial={initial} animate={animate}>
            {/* Elementos de fundo */}
            <div className="theme-accent-soft pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-4xl blur-2xl sm:h-40 sm:w-40" />
            <div className="theme-support-soft pointer-events-none absolute -left-8 bottom-10 h-28 w-28 rounded-full blur-2xl sm:h-32 sm:w-32" />

            <div className="lemon-border-yellow pointer-events-none absolute -top-8 left-8 z-0 hidden h-12 w-12 rounded-full border sm:block" />
            <div className="lemon-border-green pointer-events-none absolute right-0 top-24 z-0 hidden h-8 w-8 rotate-45 border sm:block lg:-right-8" />

            {/* Imagem Principal */}
            <motion.div className="cursor-pointer theme-border relative z-10 mx-auto aspect-4/3 w-full overflow-hidden rounded-[1.75rem] border bg-[color-mix(in_srgb,var(--color-canvas-strong)_72%,white)] shadow-2xl sm:aspect-3/4 sm:max-w-85 sm:rounded-4xl lg:ml-auto lg:mr-0" variants={softScale}>
                <img src="https://images.pexels.com/photos/19354252/pexels-photo-19354252.jpeg" alt="Elemento gráfico abstrato" className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105" />
            </motion.div>

            {/* Imagem Secundária */}
            <motion.div
                className="cursor-pointer theme-border relative z-20 mx-auto -mt-16 aspect-16/10 w-[80%] overflow-hidden rounded-[1.75rem] border bg-[color-mix(in_srgb,var(--color-canvas-strong)_72%,white)] shadow-2xl transition-transform duration-500 ease-in-out hover:scale-[1.02] sm:absolute sm:-bottom-12 sm:-left-8 sm:mt-0 sm:aspect-square sm:w-52 sm:rounded-4xl lg:-left-14 lg:w-56"
                variants={softScale}
                transition={delayedReveal}
            >
                <img src="https://images.pexels.com/photos/11295023/pexels-photo-11295023.jpeg" alt="Textura de hardware tecnológico" className="h-full w-full object-cover" />
            </motion.div>

            {/* Card flutuante de texto */}
            <motion.div className="group cursor-pointer theme-surface relative z-30 mx-auto -mt-2 max-w-52 rounded-2xl border px-5 py-5 shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl sm:absolute sm:left-2 sm:top-12 sm:mx-0 sm:mt-0 sm:max-w-44 lg:-left-6 lg:max-w-48" variants={softScale} transition={cardReveal}>
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent,#eab308) transition-transform duration-500 ease-in-out group-hover:scale-110" />
                    <p className="theme-text-muted text-[10px] font-bold uppercase tracking-[0.14em]">LemonLabs</p>
                </div>
                <p className="theme-text-primary mt-2.5 text-sm font-bold leading-snug tracking-tight">Ideia, estrutura, desenvolvimento e distribuição.</p>
            </motion.div>
        </motion.div>
    );
}
