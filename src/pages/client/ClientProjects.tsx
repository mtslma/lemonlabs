import { useEffect, useState } from "react";
import InlineNotice from "../../components/feedback/InlineNotice";
import { listMyProjects } from "../../api/resources/projects";
import type { Project } from "../../api/types/projects";
import { useAuth } from "../../features/auth/useAuth";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "../admin/admin.utils";

export default function ClientProjects() {
    const { session } = useAuth();
    const [items, setItems] = useState<Project[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadProjects() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const response = await listMyProjects(session.accessToken, { sortBy: "updatedAt", order: "desc" });
                if (isMounted) {
                    setItems(response.items);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar seus projetos.");
                }
            }
        }

        void loadProjects();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    return (
        <section className="space-y-4 sm:space-y-5">
            {errorMessage ? <InlineNotice message={errorMessage} tone="error" /> : null}

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-8">
                <p className="theme-text-muted type-eyebrow">Projetos</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                    <h1 className="theme-text-primary type-section-title">Seus projetos em execução.</h1>
                    <span className="theme-text-muted type-chip rounded-full border border-neutral-200 bg-white/82 px-2.5 py-1">
                        {items.length} {items.length === 1 ? "item" : "itens"}
                    </span>
                </div>
                <p className="theme-text-secondary mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">Tudo que já passou da etapa de briefing e virou entrega real aparece aqui com status próprio.</p>
            </section>

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 shadow-xs">
                {items.length ? (
                    <div className="divide-y divide-neutral-200">
                        {items.map((item) => (
                            <article key={item.id} className="p-5 sm:p-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="theme-text-primary type-card-title sm:text-xl">{item.name}</h2>
                                    <span className={`type-chip rounded-full px-2.5 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                                </div>
                                <p className="theme-text-secondary mt-3 text-sm leading-relaxed">{item.summary || "Sem resumo interno publicado até o momento."}</p>
                                <div className="mt-4 grid gap-x-5 gap-y-2 text-xs sm:grid-cols-2">
                                    <span className="theme-text-muted">Cliente: <strong className="theme-text-secondary">{item.clientName}</strong></span>
                                    <span className="theme-text-muted">Atualizado em: <strong className="theme-text-secondary">{formatDate(item.updatedAt)}</strong></span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 sm:p-8">
                        <p className="theme-text-primary text-sm font-bold">Nenhum projeto ativo ainda.</p>
                        <p className="theme-text-secondary mt-2 text-sm">Quando um briefing for promovido para projeto, ele aparecerá aqui.</p>
                    </div>
                )}
            </section>
        </section>
    );
}
