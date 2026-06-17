import { Link } from "react-router-dom";

type PageIntroProps = {
    eyebrow: string;
    title: string;
    description: string;
    primaryHref?: string;
    primaryLabel?: string;
    secondaryHref?: string;
    secondaryLabel?: string;
};

export default function PageIntro({ eyebrow, title, description, primaryHref = "/contato", primaryLabel = "Falar com a LemonLabs", secondaryHref = "/", secondaryLabel = "Voltar para a home" }: PageIntroProps) {
    return (
        <section className="theme-page relative overflow-hidden">
            <div className="absolute inset-0 home-dot-grid opacity-30" />
            <div className="theme-accent-soft absolute -right-24 top-16 h-72 w-72 rounded-full blur-[100px]" />
            <div className="theme-support-soft absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-[100px]" />

            <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl items-center px-5 py-16 sm:px-8 lg:px-12">
                <div className="max-w-3xl">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="theme-accent-fill h-2 w-2 rounded-full" />
                        <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:text-xs">{eyebrow}</span>
                    </div>

                    <h1 className="theme-text-primary text-[clamp(2.8rem,10vw,4.9rem)] font-black leading-[0.98] tracking-tight">
                        {title}
                    </h1>

                    <p className="theme-text-secondary mt-6 max-w-2xl text-base font-medium leading-relaxed sm:text-lg">
                        {description}
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <Link to={primaryHref} className="theme-cta-primary inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold tracking-wide">
                            {primaryLabel}
                        </Link>

                        <Link to={secondaryHref} className="theme-link-accent inline-flex justify-center text-sm font-bold underline underline-offset-4 sm:justify-start">
                            {secondaryLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
