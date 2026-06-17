export const motionTokens = {
    durationMicro: 0.15,
    durationBase: 0.3,
    durationEnter: 0.3,
    staggerChildren: 0.08,
    delayChildren: 0.08,
    delayMedium: 0.15,
    delayLarge: 0.25,
    easeStandard: [0.4, 0, 0.2, 1] as const,
    easeEmphasized: [0.22, 1, 0.36, 1] as const,
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
        y: 18,
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
        y: 24,
        scale: 0.96,
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
