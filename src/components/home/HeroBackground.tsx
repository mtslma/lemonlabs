import { motion, useReducedMotion } from "motion/react";
import { motionTokens, slowFloat } from "./motionPresets";

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
                      repeatType: "reverse" as const,
                      ease: motionTokens.easeStandard,
                  },
              },
          };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Grid de fundo */}
            <div className="absolute inset-0 home-dot-grid opacity-70" />

            {/* Brilhos de fundo suavizados e reduzidos */}
            <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
            <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />

            {/* LADO ESQUERDO - Elementos Principais e Suporte */}
            <motion.div className="lemon-border-yellow absolute left-[6%] top-[18%] h-12 w-12 rounded-full border sm:h-14 sm:w-14" {...floatingProps} />
            <div className="lemon-text-green absolute left-[4%] top-[45%] hidden select-none font-mono text-xl md:block opacity-60">+</div>
            <div className="lemon-dot-green absolute left-[15%] top-[28%] hidden h-2 w-2 rounded-full md:block opacity-50" />
            <div className="lemon-border-zinc absolute left-[22%] top-[12%] hidden h-5 w-5 rotate-12 border md:block opacity-40" />

            {/* ZONA CENTRAL - Distribuídos estrategicamente para não cobrir o texto */}
            <div className="lemon-border-zinc absolute left-[38%] top-[22%] hidden h-8 w-8 rotate-45 border md:block opacity-30" />
            <div className="lemon-dot-green absolute left-[32%] top-[65%] hidden h-1.5 w-1.5 rounded-full md:block opacity-40" />
            <div className="lemon-text-yellow-light absolute left-[48%] bottom-[20%] hidden select-none font-mono text-lg md:block opacity-40">+</div>

            {/* LADO DIREITO - Balanço visual com o HeroVisual */}
            <motion.div className="lemon-border-green absolute bottom-[16%] right-[8%] h-14 w-14 rounded-full border sm:h-20 sm:w-20" {...alternateFloat} />
            <div className="lemon-border-yellow-light absolute right-[18%] top-[10%] h-5 w-5 rotate-135 border opacity-70" />
            <div className="lemon-border-green absolute right-[6%] top-[38%] hidden h-7 w-7 rotate-12 border md:block opacity-40" />
            <div className="lemon-dot-yellow absolute right-[28%] top-[25%] hidden h-2 w-2 rounded-full md:block opacity-40" />
            <div className="lemon-text-yellow-light absolute right-[14%] bottom-[38%] hidden select-none font-mono text-xl md:block opacity-50">+</div>

            {/* ESTRUTURAS INFERIORES - Rodapé da dobra */}
            <svg className="lemon-text-yellow hidden absolute bottom-[14%] left-[7%] h-6 w-6 rotate-12 md:block opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3L22 20H2L12 3z" />
            </svg>

            <svg className="lemon-text-green hidden absolute top-[8%] right-[35%] h-5 w-5 -rotate-12 md:block opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3L22 20H2L12 3z" />
            </svg>
        </div>
    );
}
