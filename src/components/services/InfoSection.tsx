import type { ComponentType } from "react";

type InfoSectionProps = {
    title: string;
    items: string[];
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    iconColorClass: string;
};

export default function InfoSection({ title, items, icon: Icon, iconColorClass }: InfoSectionProps) {
    return (
        <div className="theme-surface theme-border rounded-2xl border p-5 shadow-[0_14px_30px_rgba(24,24,27,0.06)] transition-all duration-300 hover:scale-[1.005] sm:p-6">
            <h3 className="theme-text-primary theme-border mb-4 border-b pb-3 text-xs font-bold uppercase tracking-wider">{title}</h3>
            <ul className="space-y-3.5">
                {items.map((item, index) => (
                    <li key={index} className="theme-text-secondary flex items-start gap-3 text-sm font-medium leading-relaxed">
                        <Icon className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${iconColorClass}`} strokeWidth={2.2} />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
