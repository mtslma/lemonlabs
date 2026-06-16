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
        <section className="relative overflow-hidden bg-zinc-50 selection:bg-yellow-400 selection:text-black">
            <div className="absolute inset-0 home-dot-grid opacity-30" />
            <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px]" />
            <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-lime-400/10 blur-[100px]" />

            <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl items-center px-5 py-16 sm:px-8 lg:px-12">
                <div className="max-w-3xl">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-yellow-400" />
                        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">{eyebrow}</span>
                    </div>

                    <h1 className="text-[clamp(2.8rem,10vw,4.9rem)] font-black leading-[0.98] tracking-tight text-zinc-950">
                        {title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-zinc-600 sm:text-lg">
                        {description}
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <Link to={primaryHref} className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_10px_34px_rgb(0,0,0,0.16)]">
                            {primaryLabel}
                        </Link>

                        <Link to={secondaryHref} className="inline-flex justify-center text-sm font-bold text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-950 sm:justify-start">
                            {secondaryLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
