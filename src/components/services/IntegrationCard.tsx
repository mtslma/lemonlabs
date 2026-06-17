import { BadgeCheck } from "lucide-react";
import { type IntegrationGroup } from "./data";

type IntegrationCardProps = {
    group: IntegrationGroup;
};

/* Componente de Módulos e Integrações com tokens estruturais nativos */
export default function IntegrationCard({ group }: IntegrationCardProps) {
    const Icon = group.icon;

    return (
        <div className="theme-surface theme-border rounded-xl border p-4 transition-all duration-300 hover:scale-[1.01]">
            <div className="mb-3.5 flex items-center gap-2.5">
                <Icon className="h-5 w-5 text-accent-strong" strokeWidth={2} />
                <h4 className="theme-text-primary text-sm font-bold uppercase tracking-wider">{group.title}</h4>
            </div>
            <ul className="space-y-2">
                {group.items.map((item) => (
                    <li key={item} className="theme-text-secondary flex items-start gap-2 text-sm font-medium leading-relaxed">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" strokeWidth={2.2} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
