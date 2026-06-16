export const entryEase = [0.22, 1, 0.36, 1] as const;

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
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
            duration: 0.55,
            ease: entryEase,
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
            duration: 0.65,
            ease: entryEase,
        },
    },
};

export const slowFloat = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    },
};
