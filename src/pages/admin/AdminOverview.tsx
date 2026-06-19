import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBriefings } from "../../api/resources/briefings";
import { listProjects } from "../../api/resources/projects";
import type { Briefing } from "../../api/types/briefings";
import type { Project } from "../../api/types/projects";
import { useAuth } from "../../features/auth/useAuth";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "./admin.utils";

type OverviewData = {
    briefings: Briefing[];
    projects: Project[];
};

export default function AdminOverview() {
    const { session } = useAuth();
    const [data, setData] = useState<OverviewData>({ briefings: [], projects: [] });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadOverview() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const [briefingsResponse, projectsResponse] = await Promise.all([
                    listBriefings(session.accessToken, { limit: 50, sortBy: "createdAt", order: "desc" }),
                    listProjects(session.accessToken, { limit: 50, sortBy: "createdAt", order: "desc" }),
                ]);

                if (isMounted) {
                    setData({
                        briefings: briefingsResponse.items,
                        projects: projectsResponse.items,
                    });
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar o resumo do painel.");
                }
            }
        }

        void loadOverview();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    const newBriefings = data.briefings.filter((item) => item.status === "NEW").length;
    const activeProjects = data.projects.filter((item) => item.status !== "DELIVERED").length;
    const promotedBriefings = data.briefings.filter((item) => item.projectId).length;

    return (
        <section className="space-y-4 sm:space-y-5">
            {errorMessage ? <p className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">{errorMessage}</p> : null}

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-9">
                <p className="theme-text-muted type-eyebrow">Resumo</p>
                <h1 className="theme-text-primary type-panel-title mt-3">Acompanhe briefings e projetos em um só fluxo.</h1>
                <p className="theme-text-secondary mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
                    O painel agora fica concentrado no que realmente importa: entradas qualificadas, feedback ao cliente e os projetos que já saíram da fase de briefing.
                </p>

                <div className="mt-8 grid gap-5 border-t border-neutral-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Metric label="Briefings totais" value={String(data.briefings.length)} />
                    <Metric label="Briefings novos" value={String(newBriefings)} />
                    <Metric label="Já promovidos" value={String(promotedBriefings)} />
                    <Metric label="Projetos ativos" value={String(activeProjects)} />
                </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-2">
                <SimpleList
                    title="Briefings"
                    href="/painel/briefings"
                    emptyText="Nenhum briefing recebido ainda."
                    items={data.briefings.slice(0, 4).map((item) => ({
                        id: item.id,
                        title: item.companyName || item.contactName,
                        subtitle: item.solutionLabel,
                        meta: formatDate(item.createdAt),
                        status: item.status,
                    }))}
                />
                <SimpleList
                    title="Projetos"
                    href="/painel/projetos"
                    emptyText="Nenhum projeto promovido ainda."
                    items={data.projects.slice(0, 4).map((item) => ({
                        id: item.id,
                        title: item.name,
                        subtitle: item.clientName,
                        meta: formatDate(item.createdAt),
                        status: item.status,
                    }))}
                />
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

function SimpleList({
    emptyText,
    href,
    items,
    title,
}: {
    emptyText: string;
    href: string;
    items: Array<{ id: string; meta: string; status: string; subtitle: string; title: string }>;
    title: string;
}) {
    return (
        <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="theme-text-primary type-section-title">{title}</h2>
                <Link to={href} className="theme-link-accent type-button underline underline-offset-4">Ver tudo</Link>
            </div>

            <div className="mt-5 space-y-3">
                {items.length ? (
                    items.map((item) => (
                        <div key={item.id} className="border-t border-neutral-200 pt-3 first:border-t-0 first:pt-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="theme-text-primary type-card-title text-sm">{item.title}</p>
                                <span className={`type-chip rounded-full px-2 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                            </div>
                            <p className="theme-text-secondary mt-1 text-sm">{item.subtitle}</p>
                            <p className="theme-text-muted mt-1 text-xs">{item.meta}</p>
                        </div>
                    ))
                ) : (
                    <p className="theme-text-secondary text-sm">{emptyText}</p>
                )}
            </div>
        </section>
    );
}
