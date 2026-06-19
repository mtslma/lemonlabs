import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listMyBriefings } from "../../api/resources/briefings";
import { listMyProjects } from "../../api/resources/projects";
import type { Briefing } from "../../api/types/briefings";
import type { Project } from "../../api/types/projects";
import { useAuth } from "../../features/auth/useAuth";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "../admin/admin.utils";

export default function ClientOverview() {
    const { session } = useAuth();
    const [briefings, setBriefings] = useState<Briefing[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadOverview() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const [briefingsResponse, projectsResponse] = await Promise.all([
                    listMyBriefings(session.accessToken, { limit: 4, sortBy: "updatedAt", order: "desc" }),
                    listMyProjects(session.accessToken, { limit: 4, sortBy: "updatedAt", order: "desc" }),
                ]);
                if (isMounted) {
                    setBriefings(briefingsResponse.items);
                    setProjects(projectsResponse.items);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar seu resumo agora.");
                }
            }
        }

        void loadOverview();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    const activeBriefings = briefings.filter((item) => item.status !== "CLOSED" && item.status !== "ARCHIVED").length;

    return (
        <section className="space-y-4 sm:space-y-5">
            {errorMessage ? <p className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">{errorMessage}</p> : null}

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-8">
                <p className="theme-text-muted type-eyebrow">Resumo</p>
                <h1 className="theme-text-primary type-panel-title mt-3">Seu acompanhamento em um só lugar.</h1>
                <p className="theme-text-secondary mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
                    Consulte o que já foi enviado, veja o status atual e acompanhe o retorno publicado pela equipe.
                </p>

                <div className="mt-8 grid gap-4 border-t border-neutral-200 pt-6 sm:grid-cols-3 sm:gap-5">
                    <Metric label="Briefings recentes" value={String(briefings.length)} />
                    <Metric label="Em andamento" value={String(activeBriefings)} />
                    <Metric label="Projetos ativos" value={String(projects.length)} />
                </div>
            </section>

            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="theme-text-primary type-section-title">Meus briefings</h2>
                        <Link to="/minha-area/briefings" className="theme-link-accent type-button underline underline-offset-4">Abrir lista</Link>
                    </div>

                    <div className="mt-5 space-y-3">
                        {briefings.length ? (
                            briefings.map((item) => (
                                <div key={item.id} className="border-t border-neutral-200 pt-3 first:border-t-0 first:pt-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="theme-text-primary type-card-title text-sm">{item.solutionLabel}</p>
                                        <span className={`type-chip rounded-full px-2 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                                    </div>
                                    <p className="theme-text-secondary mt-1 text-sm">{item.companyName || item.contactName}</p>
                                    <p className="theme-text-muted mt-1 text-xs">Atualizado em {formatDate(item.updatedAt)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="theme-text-secondary text-sm">Nenhum briefing enviado com esta conta ainda.</p>
                        )}
                    </div>
                </section>

                    <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="theme-text-primary type-section-title">Meus projetos</h2>
                            <Link to="/minha-area/projetos" className="theme-link-accent type-button underline underline-offset-4">Abrir área</Link>
                        </div>
                        <div className="mt-5 space-y-3">
                            {projects.length ? (
                                projects.map((item) => (
                                    <div key={item.id} className="border-t border-neutral-200 pt-3 first:border-t-0 first:pt-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="theme-text-primary type-card-title text-sm">{item.name}</p>
                                            <span className={`type-chip rounded-full px-2 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                                        </div>
                                        <p className="theme-text-secondary mt-1 text-sm">{item.clientName}</p>
                                        <p className="theme-text-muted mt-1 text-xs">Atualizado em {formatDate(item.updatedAt)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="theme-text-secondary text-sm">Quando um briefing avançar para execução, ele aparece aqui com etapas e andamento.</p>
                            )}
                        </div>
                    </section>
                </div>
            </section>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="theme-text-muted type-eyebrow">{label}</p>
            <p className="theme-text-primary type-metric mt-2">{value}</p>
        </div>
    );
}
