import { BriefcaseBusiness, FileText, Shield, Workflow } from "lucide-react";

const cards = [
    {
        description: "Entradas captadas pelo CTA rápido do site para resposta comercial ágil.",
        icon: BriefcaseBusiness,
        title: "Orçamentos diretos",
    },
    {
        description: "Solicitações com contexto mais completo para discovery, escopo e proposta.",
        icon: FileText,
        title: "Briefings estruturados",
    },
    {
        description: "Rotas administrativas protegidas por sessão e role alinhadas ao template Express.",
        icon: Shield,
        title: "Guards ativos",
    },
    {
        description: "Espaço pronto para plugar módulos novos gerados com make:module ou --admin.",
        icon: Workflow,
        title: "Escala de módulos",
    },
];

export default function AdminOverview() {
    return (
        <section className="flex flex-col gap-6">
            <div className="theme-surface theme-border rounded-[2rem] border p-6 shadow-[0_20px_44px_rgba(24,24,27,0.08)] sm:p-7">
                <p className="theme-text-muted text-[0.7rem] font-bold uppercase tracking-[0.2em]">Painel</p>
                <h1 className="theme-text-primary mt-2 text-[clamp(2rem,4vw,3rem)] font-black tracking-tight">Operação comercial preparada para auth.</h1>
                <p className="theme-text-secondary mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
                    Esta área já separa o que será público do que precisa de autenticação: captação no site, qualificação com briefing e acompanhamento interno do pipeline.
                </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
                {cards.map((card) => (
                    <article key={card.title} className="theme-surface theme-border rounded-[1.8rem] border p-5 shadow-[0_18px_34px_rgba(24,24,27,0.06)]">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/14 text-yellow-500">
                            <card.icon className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <h2 className="theme-text-primary text-xl font-black tracking-tight">{card.title}</h2>
                        <p className="theme-text-secondary mt-3 text-sm leading-relaxed">{card.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
