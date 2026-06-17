/* eslint-disable react-refresh/only-export-components */
import { ArrowRight, BadgeCheck, Bot, ChartColumn, CheckCircle2, CircleCheckBig, Clock, CreditCard, Globe, HardDriveUpload, Layers3, MessageSquare, MonitorCog, Network, Sparkles, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/* ────────────────────────────────────────────────────────────────────────── */
/* DATA & TYPES                                                               */
/* ────────────────────────────────────────────────────────────────────────── */

export type Plan = {
    slug: string;
    name: string;
    audience: string;
    summary: string;
    timeline: string;
    icon: LucideIcon;
    featured?: boolean;
    includes: string[];
};

export type IntegrationGroup = {
    title: string;
    icon: LucideIcon;
    items: string[];
};

type InfoSectionProps = {
    title: string;
    items: string[];
    icon: LucideIcon;
    iconColorClass: string;
};

export const plans: Plan[] = [
    {
        slug: "presenca-digital",
        name: "Presença Digital",
        audience: "Sites para marcar presença e gerar confiança.",
        summary: "Base enxuta para apresentar seu negócio e facilitar o contato.",
        timeline: "5 a 15 dias úteis",
        icon: Globe,
        includes: ["Landing page ou site institucional", "Domínio, hospedagem e SSL inclusos", "Formulário de contato e botão de WhatsApp", "Analytics básico e monitoramento", "Suporte por WhatsApp e e-mail"],
    },
    {
        slug: "captacao-de-clientes",
        name: "Captação de Clientes",
        audience: "Páginas para captar e organizar oportunidades.",
        summary: "Estrutura focada em conversão para gerar e qualificar leads.",
        timeline: "10 a 25 dias úteis",
        icon: ChartColumn,
        includes: ["Landing page ou portal focado em conversão", "Formulários integrados com alertas por e-mail", "Painel administrativo para gestão de leads", "Analytics avançado de origens e conversões", "Rotinas automáticas de backup e segurança"],
    },
    {
        slug: "comercial-completo",
        name: "Comercial Completo",
        audience: "Captação, atendimento e acompanhamento em um fluxo só.",
        summary: "Junta página, automação e painel comercial na mesma jornada.",
        timeline: "15 a 30 dias úteis",
        icon: Layers3,
        featured: true,
        includes: ["Portal web ou landing page comercial", "Automação de WhatsApp e gestão de leads", "Painel administrativo com alertas integrados", "Monitoramento completo do funil", "Hospedagem, segurança e backups inclusos"],
    },
    {
        slug: "atendimento-automatizado",
        name: "Atendimento Automatizado",
        audience: "Fluxos para atender melhor no WhatsApp.",
        summary: "Automação para responder mais rápido e encaminhar melhor.",
        timeline: "5 a 20 dias úteis",
        icon: Bot,
        includes: ["Bot de WhatsApp com fluxos personalizados", "Triagem automática de solicitações", "Encaminhamento para atendimento humano", "Ajustes de mensagens e monitoramento ativo", "Validação contínua das integrações"],
    },
    {
        slug: "operacao-interna",
        name: "Operação Interna",
        audience: "Sistemas para organizar processos e reduzir retrabalho.",
        summary: "Ferramentas sob medida para controle, rotina e operação.",
        timeline: "15 a 60 dias úteis",
        icon: MonitorCog,
        includes: ["Sistema ou aplicativo com banco de dados próprio", "Painel de controle com permissões de acesso", "Segurança local e backups automatizados", "Manutenção corretiva e suporte remoto", "Arquitetura escalável para novas funções"],
    },
    {
        slug: "plataforma-completa",
        name: "Plataforma Completa",
        audience: "Ecossistema único para atendimento, operação e gestão.",
        summary: "Centralização total de canais, sistemas e dados comerciais.",
        timeline: "Sob consulta",
        icon: Sparkles,
        includes: ["Portal institucional, sistema web e dashboards", "Desenvolvimento de API e banco relacional", "Integração total de bots e ferramentas terceiras", "Infraestrutura dedicada com suporte prioritário", "Planejamento de arquitetura de alta performance"],
    },
];

export const integrationGroups: IntegrationGroup[] = [
    {
        title: "Comunicação",
        icon: MessageSquare,
        items: ["WhatsApp", "E-mail corporativo"],
    },
    {
        title: "Pagamentos",
        icon: CreditCard,
        items: ["Links de pagamento", "Checkout transparente", "Status de transações"],
    },
    {
        title: "Analytics",
        icon: ChartColumn,
        items: ["Monitoramento de acessos", "Rastreamento de conversões", "Eventos customizados"],
    },
    {
        title: "Arquivos",
        icon: HardDriveUpload,
        items: ["Upload seguro", "Processamento de imagens", "Armazenamento em nuvem"],
    },
    {
        title: "Inteligência Artificial",
        icon: Bot,
        items: ["Atendimento conversacional", "Triagem de chamados", "Resumos automatizados"],
    },
];

export const maintenanceIncludes = [
    "<strong>Hospedagem dedicada</strong> dos sistemas e servidores contratados.",
    "<strong>Certificado SSL</strong> com emissão e renovação automática.",
    "<strong>Monitoramento ativo</strong> e correção imediata de erros críticos.",
    "<strong>Backups automáticos</strong> diários armazenados em nuvem segura.",
    "<strong>Ajustes pontuais</strong> de textos, imagens e pequenos conteúdos.",
    "<strong>Manutenção contínua</strong> de todas as integrações nativas ativas.",
];

export const maintenanceExcludes = [
    "<strong>Novas funções</strong> ou regras de negócio inéditas no escopo.",
    "<strong>Módulos adicionais</strong> ou novos painéis administrativos.",
    "<strong>Páginas extras</strong> criadas após a homologação do projeto.",
    "<strong>Novas integrações</strong> com plataformas de terceiros no futuro.",
    "<strong>Reformulação estética</strong>, redesign ou alteração de identidade visual.",
];

export const supportItems = [
    "<strong>Segunda a sexta:</strong> Atendimento regular das 09h às 18h.",
    "<strong>Sábado e domingo:</strong> Plantão para emergências das 10h às 17h.",
    "<strong>Incidentes críticos:</strong> Resposta e início do plano de ação em até 24h.",
    "<strong>Dúvidas e ajustes:</strong> Retorno e resolução de chamados em até 2 dias úteis.",
    "<strong>Canais oficiais:</strong> Acesso direto via WhatsApp, e-mail e chamados.",
];

function planHref(slug: string) {
    return `/contato?solucao=${slug}`;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* SUB-COMPONENTS                                                             */
/* ────────────────────────────────────────────────────────────────────────── */

function PlanCard({ plan }: { plan: Plan }) {
    const Icon = plan.icon;

    return (
        <article className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7 ${plan.featured ? "border-yellow-400 bg-neutral-900" : "theme-surface theme-border bg-white"}`}>
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-br via-transparent to-transparent opacity-10 transition-opacity duration-300 group-hover:opacity-15 ${plan.featured ? "from-yellow-400" : "from-yellow-500"}`} />

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                    <div className={`w-fit rounded-xl p-2.5 ${plan.featured ? "bg-white/10 text-yellow-400" : "bg-yellow-400/10 text-yellow-600"}`}>
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${plan.featured ? "bg-white/10 text-white/70" : "bg-neutral-100 theme-text-muted"}`}>{plan.timeline}</span>
                </div>

                <div className="mt-6">
                    <h2 className={`text-xl font-black leading-tight tracking-tight sm:text-2xl ${plan.featured ? "text-white" : "theme-text-primary"}`}>{plan.name}</h2>

                    <p className={`mt-2 text-sm font-semibold leading-relaxed ${plan.featured ? "text-white/60" : "theme-text-muted"}`}>{plan.audience}</p>

                    <p className={`mt-4 text-sm leading-relaxed ${plan.featured ? "text-white/80" : "theme-text-secondary"}`}>{plan.summary}</p>
                </div>

                <ul className={`mt-6 flex-1 space-y-3 border-t pt-5 ${plan.featured ? "border-white/10" : "theme-border"}`}>
                    {plan.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <CircleCheckBig className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-yellow-400" : "text-yellow-500"}`} strokeWidth={2.2} />
                            <span className={`text-sm leading-relaxed ${plan.featured ? "text-white/80" : "theme-text-secondary"}`}>{item}</span>
                        </li>
                    ))}
                </ul>

                <Link to={planHref(plan.slug)} className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.01] ${plan.featured ? "bg-yellow-400 text-neutral-950 hover:bg-yellow-500" : "theme-cta-primary"}`}>
                    Orçar esta solução
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
            </div>
        </article>
    );
}

function IntegrationCard({ group }: { group: IntegrationGroup }) {
    const Icon = group.icon;

    return (
        <article className="theme-surface theme-border flex h-full flex-col rounded-3xl border p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                <h4 className="theme-text-primary text-base font-black tracking-tight">{group.title}</h4>
            </div>

            <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                    <li key={item} className="theme-text-secondary flex items-start gap-3 text-sm leading-relaxed">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" strokeWidth={2.2} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function InfoSection({ title, items, icon: Icon, iconColorClass }: InfoSectionProps) {
    return (
        <article className="theme-surface theme-border flex h-full flex-col rounded-3xl border p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
            <h3 className="theme-text-primary theme-border border-b pb-4 text-base font-black tracking-tight">{title}</h3>

            <ul className="mt-5 space-y-3.5">
                {items.map((item, index) => (
                    <li key={index} className="theme-text-secondary flex items-start gap-3 text-sm leading-relaxed">
                        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColorClass}`} strokeWidth={2.2} />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>
        </article>
    );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                                             */
/* ────────────────────────────────────────────────────────────────────────── */

export default function Services() {
    return (
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-start overflow-hidden bg-white">
            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* BACKGROUND                                                                 */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 home-dot-grid opacity-70" />

                <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
                <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* HERO                                                                       */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-16">
                <div className="flex w-full flex-col justify-start">
                    <h1 className="theme-text-primary max-w-5xl text-[clamp(3.05rem,13vw,5rem)] font-black leading-[1.03] tracking-tight sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.6rem,5.6vw,5rem)]">
                        Soluções para
                        <br />o seu momento.
                    </h1>

                    <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <p className="text-justify theme-text-secondary max-w-2xl text-base font-medium leading-relaxed sm:text-lg">Escolha a estrutura que mais se aproxima da sua necessidade. Cada modelo funciona como uma base de contrato, mas o escopo final é ajustado conforme o projeto, integrações e nível de suporte necessário.</p>

                        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto">
                            <Link to="/contato" className="cursor-pointer theme-cta-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-lg sm:w-auto sm:px-10">
                                Montar orçamento
                                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* PLANOS                                                                     */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                    {plans.map((plan) => (
                        <div key={plan.slug} className="w-[82vw] max-w-90 shrink-0 snap-start sm:w-[44vw] sm:max-w-none lg:w-auto lg:max-w-none lg:shrink lg:snap-none">
                            <PlanCard plan={plan} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* INTEGRAÇÕES                                                                */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section id="integracoes" className="relative z-10 w-full max-w-7xl mx-auto px-5 py-6 sm:px-8 lg:px-12">
                <div className="theme-surface theme-border rounded-3xl border p-6 shadow-xs sm:p-8">
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                <Network className="h-5 w-5" strokeWidth={2.2} />
                            </div>

                            <div>
                                <h2 className="theme-text-primary text-base font-black tracking-tight sm:text-lg">Módulos e integrações</h2>
                                <p className="theme-text-muted mt-1 max-w-2xl text-sm leading-relaxed">Recursos adicionais que podem entrar em qualquer solução base, dependendo do seu fluxo comercial, operacional ou administrativo.</p>
                            </div>
                        </div>
                    </div>

                    <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
                        {integrationGroups.map((group) => (
                            <div key={group.title} className="w-[76vw] max-w-[320px] shrink-0 snap-start sm:w-[42vw] sm:max-w-none lg:w-auto lg:max-w-none lg:shrink lg:snap-none">
                                <IntegrationCard group={group} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* MANUTENÇÃO E SUPORTE                                                       */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 py-12 pb-20 sm:px-8 lg:px-12 lg:py-16 lg:pb-24">
                <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                    <div className="w-[82vw] max-w-90 shrink-0 snap-start sm:w-[44vw] sm:max-w-none lg:w-auto lg:max-w-none lg:shrink lg:snap-none">
                        <InfoSection title="Manutenção inclusa" items={maintenanceIncludes} icon={CheckCircle2} iconColorClass="text-emerald-500" />
                    </div>

                    <div className="w-[82vw] max-w-90 shrink-0 snap-start sm:w-[44vw] sm:max-w-none lg:w-auto lg:max-w-none lg:shrink lg:snap-none">
                        <InfoSection title="Fora da manutenção" items={maintenanceExcludes} icon={XCircle} iconColorClass="text-red-500" />
                    </div>

                    <div className="w-[82vw] max-w-90 shrink-0 snap-start sm:w-[44vw] sm:max-w-none lg:w-auto lg:max-w-none lg:shrink lg:snap-none">
                        <InfoSection title="Suporte e SLA" items={supportItems} icon={Clock} iconColorClass="text-yellow-500" />
                    </div>
                </div>
            </section>
        </main>
    );
}
