import type { BriefingStatus } from "../../api/types/briefings";
import type { ProjectStatus } from "../../api/types/projects";

export const briefingStatusOptions: Array<{ label: string; value: BriefingStatus }> = [
    { value: "NEW", label: "Novo" },
    { value: "CONTACTED", label: "Contato iniciado" },
    { value: "IN_REVIEW", label: "Em análise" },
    { value: "PROPOSAL_SENT", label: "Proposta enviada" },
    { value: "CLOSED", label: "Concluído" },
    { value: "ARCHIVED", label: "Arquivado" },
];

export const projectStatusOptions: Array<{ label: string; value: ProjectStatus }> = [
    { value: "PLANNING", label: "Planejamento" },
    { value: "IN_PROGRESS", label: "Em execução" },
    { value: "ON_HOLD", label: "Em espera" },
    { value: "DELIVERED", label: "Entregue" },
];

const sharedStatusLabels: Record<string, string> = {
    NEW: "Novo",
    CONTACTED: "Contato iniciado",
    IN_REVIEW: "Em análise",
    PROPOSAL_SENT: "Proposta enviada",
    QUALIFIED: "Qualificado",
    PLANNING: "Planejamento",
    IN_PROGRESS: "Em execução",
    ON_HOLD: "Em espera",
    DELIVERED: "Entregue",
    CLOSED: "Concluído",
    ARCHIVED: "Arquivado",
};

const sharedStatusClasses: Record<string, string> = {
    NEW: "bg-sky-500/12 text-sky-700",
    CONTACTED: "bg-amber-500/12 text-amber-700",
    IN_REVIEW: "bg-violet-500/12 text-violet-700",
    PROPOSAL_SENT: "bg-blue-500/12 text-blue-700",
    QUALIFIED: "bg-emerald-500/12 text-emerald-700",
    PLANNING: "bg-stone-500/12 text-stone-700",
    IN_PROGRESS: "bg-blue-500/12 text-blue-700",
    ON_HOLD: "bg-rose-500/12 text-rose-700",
    DELIVERED: "bg-emerald-500/12 text-emerald-700",
    CLOSED: "bg-zinc-900/8 text-zinc-700",
    ARCHIVED: "bg-zinc-400/15 text-zinc-600",
};

export function getStatusLabel(status: string) {
    return sharedStatusLabels[status] ?? status;
}

export function getStatusBadgeClass(status: string) {
    return sharedStatusClasses[status] ?? "bg-zinc-200 text-zinc-700";
}

export function formatDate(value: string | null | undefined) {
    if (!value) {
        return "Sem data";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(value));
}
