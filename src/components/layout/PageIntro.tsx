    import { Link } from "react-router-dom";

    type PageIntroProps = {
        description: string;
        eyebrow: string;
        primaryHref?: string;
        primaryLabel?: string;
        secondaryHref?: string;
        secondaryLabel?: string;
        title: string;
    };

    export default function PageIntro({ eyebrow, title, description, primaryHref = "/contato", primaryLabel = "Falar com a Limosin", secondaryHref = "/", secondaryLabel = "Voltar para a home" }: PageIntroProps) {
        return (
            <section className="theme-page relative overflow-hidden">
                <div className="absolute inset-0 home-dot-grid opacity-30" />
                <div className="theme-accent-soft absolute -right-24 top-16 h-72 w-72 rounded-full blur-[100px]" />
                <div className="theme-support-soft absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-[100px]" />

                <div className="relative mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl grid-cols-1 items-start gap-14 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-0">
                    <div className="flex max-w-3xl flex-col justify-start pt-20 sm:pt-24 lg:col-span-6 lg:pt-28">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="theme-accent-fill h-2 w-2 rounded-full" />
                            <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:text-xs">{eyebrow}</span>
                        </div>

                        <h1 className="theme-text-primary text-[clamp(2.8rem,10vw,4.9rem)] font-black leading-[0.98] tracking-tight">{title}</h1>

                        <p className="theme-text-secondary mt-6 max-w-2xl text-base font-medium leading-relaxed sm:text-lg">{description}</p>

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
