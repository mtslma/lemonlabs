import { CircleCheckBig, ClipboardList, MessageSquare, MessageSquareText } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const solutionLabels: Record<string, string> = {
    "presenca-digital": "Presença Digital",
    "captacao-de-clientes": "Captação de Clientes",
    "atendimento-automatizado": "Atendimento Automatizado",
    "comercial-completo": "Comercial Completo",
    "operacao-interna": "Operação Interna",
    "plataforma-completa": "Plataforma Completa",
};

const briefingPoints = [
    "<strong>O objetivo principal:</strong> O que você busca resolver ou otimizar no momento.",
    "<strong>Prazos e urgência:</strong> Qual o seu cronograma ideal para o lançamento.",
    "<strong>Canais e escopo:</strong> Se haverá site, automação de WhatsApp, dashboards ou sistemas.",
    "<strong>Referências visuais:</strong> Exemplos de concorrentes ou fluxos de design que você gosta.",
    "<strong>Expectativa de investimento:</strong> A faixa de orçamento estimada para o projeto.",
];

export default function Contact() {
    const [searchParams] = useSearchParams();
    const solutionSlug = searchParams.get("solucao") ?? "";
    const selectedSolution = solutionLabels[solutionSlug];

    const whatsappText = selectedSolution ? `Olá! Estava navegando pelo site e gostaria de solicitar um orçamento para a solução de ${selectedSolution}.` : "Olá! Gostaria de alinhar um orçamento para um projeto com vocês.";
    const whatsappUrl = `https://wa.me/5511991280957?text=${encodeURIComponent(whatsappText)}`;

    return (
        /* Estrutura base espelhada da Home: min-h calculada e display flex para centralização perfeita */
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-center overflow-hidden">
            {/* Brilhos estruturais ultra sutis */}
            <div className="absolute inset-0 home-dot-grid opacity-20" />
            <div className="theme-accent-soft absolute -right-18 top-20 h-24 w-24 rounded-full blur-[60px] opacity-5" />
            <div className="theme-support-soft absolute bottom-8 -left-16 h-40 w-40 rounded-full blur-[72px] opacity-10" />

            {/* Grid Principal: Alinhado com os paddings e gaps exatos da Home */}
            <section className="relative z-10 w-full mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-0">
                <div className="grid gap-6 items-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
                    {/* Lado Esquerdo: Chamada e Ação Direta */}
                    <div className="theme-surface theme-border rounded-4xl border p-6 shadow-[0_20px_44px_rgba(24,24,27,0.08)] sm:p-8">
                        <div className="mb-6 flex items-center gap-2">
                            <div className="theme-accent-fill h-1.5 w-1.5 rounded-full" />
                            <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em]">Contato</span>
                        </div>

                        <h1 className="theme-text-primary text-[clamp(2.5rem,6vw,3.85rem)] font-black leading-none tracking-tight">Vamos montar o seu orçamento.</h1>

                        <p className="theme-text-secondary mt-5 text-base font-medium leading-relaxed sm:text-lg">Escolha o seu canal de preferência abaixo para iniciar o alinhamento do seu projeto. Retornaremos o contato de forma rápida e transparente.</p>

                        {/* Card Dinâmico */}
                        {selectedSolution && (
                            <div className="mt-8 rounded-3xl border border-accent-soft-strong bg-accent/5 p-5">
                                <p className="text-accent-strong text-[0.72rem] font-bold uppercase tracking-[0.18em]">Solução de Interesse</p>
                                <p className="theme-text-primary mt-1.5 text-xl font-black">{selectedSolution}</p>
                            </div>
                        )}

                        {/* Ações */}
                        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer theme-cta-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold tracking-wide transition-all duration-200">
                                <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
                                Iniciar por WhatsApp
                            </a>

                            <Link to="/servicos" className="cursor-pointer theme-link-accent flex justify-center text-sm font-bold underline underline-offset-4 sm:ml-auto">
                                Ver serviços
                            </Link>
                        </div>
                    </div>

                    {/* Lado Direito: Caixa de Alinhamento de Briefing */}
                    <div className="theme-surface-solid rounded-4xl p-6 shadow-[0_20px_44px_rgba(24,24,27,0.14)] sm:p-8 flex flex-col justify-between min-h-full lg:self-stretch">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-white/10 p-2.5 text-accent">
                                    <ClipboardList className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent">Briefing Comercial</p>
                                    <h2 className="mt-0.5 text-lg font-black tracking-tight text-white">Informações úteis para nos enviar</h2>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-4">
                                {briefingPoints.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                                        <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} />
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mensagem de Rodapé */}
                        <div className="mt-8 rounded-3xl bg-white/5 p-4.5 border border-white/5">
                            <div className="flex items-center gap-2.5">
                                <MessageSquareText className="h-4 w-4 text-accent" strokeWidth={2} />
                                <p className="text-xs font-bold text-white uppercase tracking-wider">Processo Consultivo</p>
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-white/70">Não se preocupe se não tiver todas as respostas estruturadas agora. Esse mapeamento inicial serve apenas como ponto de partida para refinarmos os detalhes técnicos juntos na nossa primeira conversa.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
