import { CheckCircle2, Clock, Network, XCircle } from "lucide-react";
import InfoSection from "../components/services/InfoSection";
import IntegrationCard from "../components/services/IntegrationCard";
import PlanCard from "../components/services/PlanCard";
import ServicesIntro from "../components/services/ServicesIntro";
import { integrationGroups, maintenanceExcludes, maintenanceIncludes, plans, supportItems } from "../components/services/data";

export default function Services() {
    return (
        <main className="theme-page relative overflow-hidden">
            {/* Elementos de background e brilho sutil */}
            <div className="absolute inset-0 home-dot-grid opacity-20" />
            <div className="theme-accent-soft absolute right-0 top-12 h-24 w-24 rounded-full blur-[60px] opacity-5" />
            <div className="theme-support-soft absolute bottom-12 left-0 h-40 w-40 rounded-full blur-[72px] opacity-10" />

            {/* Cabeçalho de Introdução */}
            <ServicesIntro />

            {/* Grid de Soluções Base (Planos) */}
            <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <PlanCard key={plan.slug} plan={plan} />
                    ))}
                </div>
            </section>

            {/* Seção de Módulos e Integrações Adicionais */}
            <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
                <div className="theme-surface theme-border rounded-2xl border p-5 shadow-[0_14px_30px_rgba(24,24,27,0.06)] sm:p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="w-fit rounded-xl bg-[rgba(250,204,21,0.12)] p-2.5 text-accent-strong">
                            <Network className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div>
                            <h3 className="theme-text-primary text-base font-bold tracking-tight sm:text-lg">Módulos e Integrações</h3>
                            <p className="theme-text-muted text-sm leading-relaxed">Recursos adicionais disponíveis para implementação em qualquer plano base.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {integrationGroups.map((group) => (
                            <IntegrationCard key={group.title} group={group} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção de Manutenção Técnica, Escopo Extra e SLA */}
            <section className="relative mx-auto max-w-7xl px-5 py-6 pb-16 sm:px-8 sm:py-8 lg:px-12">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <InfoSection title="Manutenção: O que está incluso" items={maintenanceIncludes} icon={CheckCircle2} iconColorClass="text-emerald-500" />
                    <InfoSection title="Manutenção: O que não está incluso" items={maintenanceExcludes} icon={XCircle} iconColorClass="text-red-500" />
                    <InfoSection title="Suporte Técnico e SLA" items={supportItems} icon={Clock} iconColorClass="text-accent-strong" />
                </div>
            </section>
        </main>
    );
}
