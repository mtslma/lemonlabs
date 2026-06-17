export const motionTokens = {
    durationMicro: 0.15,
    durationBase: 0.4, // Aumentado sutilmente para o movimento ser mais suave e perceptível
    durationEnter: 0.4, // Alinhado com a base para consistência visual
    staggerChildren: 0.08, // Intervalo curto e dinâmico entre o surgimento de cada card
    delayChildren: 0.02, // Praticamente instantâneo ao carregar a página
    easeStandard: [0.4, 0, 0.2, 1] as const,
    easeEmphasized: [0.22, 1, 0.36, 1] as const, // Excelente curva de desaceleração (suave no final)
} as const;

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: motionTokens.staggerChildren,
            delayChildren: motionTokens.delayChildren,
        },
    },
};

export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: motionTokens.durationEnter,
            ease: motionTokens.easeEmphasized,
        },
    },
};

export const softScale = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.97, // Sutil para não parecer um estouro na tela
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: motionTokens.durationBase,
            ease: motionTokens.easeEmphasized,
        },
    },
};

export const slowFloat = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 9,
            repeat: Infinity,
            ease: motionTokens.easeStandard,
        },
    },
};
