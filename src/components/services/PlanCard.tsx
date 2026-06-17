import { ArrowRight, CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";
import { type Plan } from "./data";

function planHref(slug: string) {
    return `/contato?solucao=${slug}`;
}

type PlanCardProps = {
    plan: Plan;
};

/* Componente de Bloco/Card de Soluções Base */
export default function PlanCard({ plan }: PlanCardProps) {
    const Icon = plan.icon;

    return (
        <article
            className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                plan.featured ? "theme-surface-solid border-accent-soft-strong shadow-[0_18px_36px_rgba(24,24,27,0.12)] hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(24,24,27,0.16)]" : "theme-surface theme-border shadow-[0_14px_30px_rgba(24,24,27,0.06)] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(24,24,27,0.10)]"
            }`}
        >
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 opacity-10 transition-opacity duration-300 group-hover:opacity-15 ${plan.featured ? "bg-linear-to-br from-accent via-transparent to-transparent" : "bg-linear-to-br from-accent-strong via-transparent to-transparent"}`} />

            <div className="relative z-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className={`w-fit rounded-xl p-2.5 ${plan.featured ? "bg-white/10 text-accent" : "bg-[rgba(250,204,21,0.08)] text-accent-strong"}`}>
                        <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className={`w-fit rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider ${plan.featured ? "bg-white/10 text-white/72" : "bg-[rgba(24,24,27,0.05)] theme-text-muted"}`}>{plan.timeline}</span>
                </div>

                <div className="mt-5">
                    <h2 className={`text-xl font-black tracking-tight sm:text-2xl ${plan.featured ? "text-white" : "theme-text-primary"}`}>{plan.name}</h2>
                    <p className={`mt-1.5 text-xs font-semibold capitalize tracking-wider ${plan.featured ? "text-white/56" : "theme-text-muted"}`}>{plan.audience}</p>
                    <p className={`mt-3 text-sm leading-relaxed sm:text-[0.95rem] ${plan.featured ? "text-white/82" : "theme-text-secondary"}`}>{plan.summary}</p>
                </div>

                <ul className={`mt-5 space-y-2.5 border-t pt-4 ${plan.featured ? "border-white/10" : "border-[rgba(24,24,27,0.07)]"}`}>
                    {plan.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                            <CircleCheckBig className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-accent" : "text-accent-strong"}`} strokeWidth={2.2} />
                            <span className={`text-sm leading-relaxed ${plan.featured ? "text-white/82" : "theme-text-secondary"}`}>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative z-10 mt-6 pt-2">
                <Link to={planHref(plan.slug)} className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${plan.featured ? "bg-accent text-accent-contrast hover:bg-accent-strong" : "theme-cta-primary shadow-none"}`}>
                    Orçar esta solução
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
            </div>
        </article>
    );
}
