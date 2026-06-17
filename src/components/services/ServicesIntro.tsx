/* Componente de Introdução/Cabeçalho da Página de Serviços */
export default function ServicesIntro() {
    return (
        <section className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-14 sm:px-8 lg:px-12">
            <div className="w-full">
                <div className="mb-4 flex items-center gap-2">
                    <div className="theme-accent-fill h-1.5 w-1.5 rounded-full" />
                    <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em]">Serviços</span>
                </div>
                <h1 className="theme-text-primary text-[clamp(2.4rem,7vw,3.85rem)] font-black leading-none tracking-tight lg:whitespace-nowrap">Soluções prontas para o seu momento.</h1>
                <p className="theme-text-secondary mt-3 text-base font-medium leading-relaxed sm:text-lg lg:whitespace-nowrap">Escolha a estrutura que mais se aproxima da sua necessidade e personalize o restante no orçamento.</p>
            </div>
        </section>
    );
}
