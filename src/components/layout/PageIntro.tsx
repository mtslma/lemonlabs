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

                <div className="page-shell relative grid min-h-[calc(100vh-72px)] grid-cols-1 items-start gap-10 py-10 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-0">
                    <div className="flex max-w-3xl flex-col justify-start pt-12 sm:pt-24 lg:col-span-6 lg:pt-28">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="theme-accent-fill h-2 w-2 rounded-full" />
                            <span className="theme-text-muted type-eyebrow">{eyebrow}</span>
                        </div>

                        <h1 className="theme-text-primary page-title-display">{title}</h1>

                        <p className="theme-text-secondary mt-6 max-w-2xl text-base font-medium leading-relaxed sm:text-lg">{description}</p>

                        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
                            <Link to={primaryHref} className="theme-cta-primary type-button inline-flex w-full items-center justify-center rounded-full px-7 py-4 sm:w-auto">
                                {primaryLabel}
                            </Link>

                            <Link to={secondaryHref} className="theme-link-accent type-button inline-flex justify-center underline underline-offset-4 sm:justify-start">
                                {secondaryLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
