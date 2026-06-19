import { useEffect, useState } from "react";
import InlineNotice from "../../components/feedback/InlineNotice";
import { listProjects, updateProjectStatus } from "../../api/resources/projects";
import type { Project } from "../../api/types/projects";
import { useAuth } from "../../features/auth/useAuth";
import { formatDate, getStatusBadgeClass, getStatusLabel, projectStatusOptions } from "./admin.utils";

export default function AdminProjects() {
    const { session } = useAuth();
    const [items, setItems] = useState<Project[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [savingId, setSavingId] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadProjects() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const response = await listProjects(session.accessToken, { sortBy: "updatedAt", order: "desc" });
                if (isMounted) {
                    setItems(response.items);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar os projetos.");
                }
            }
        }

        void loadProjects();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    async function handleSave(item: Project) {
        if (!session?.accessToken) {
            return;
        }

        setSavingId(item.id);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const updatedItem = await updateProjectStatus(session.accessToken, item.id, {
                name: item.name,
                status: item.status,
                summary: item.summary || "",
            });
            setItems((current) => current.map((entry) => (entry.id === item.id ? updatedItem : entry)));
            setSuccessMessage(`Projeto "${updatedItem.name}" atualizado com sucesso.`);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Não foi possível atualizar o projeto agora.");
        } finally {
            setSavingId("");
        }
    }

    return (
        <section className="space-y-4 sm:space-y-5">
            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-9">
                <p className="theme-text-muted type-eyebrow">Projetos</p>
                <h1 className="theme-text-primary type-section-title mt-3">Projetos já convertidos em execução.</h1>
                <p className="theme-text-secondary mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
                    Tudo que saiu da fase de briefing passa a ser acompanhado aqui, com nome, status e resumo atualizado para o cliente.
                </p>
            </section>

            {successMessage ? <InlineNotice message={successMessage} tone="success" /> : null}
            {errorMessage ? <InlineNotice message={errorMessage} tone="error" /> : null}

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 shadow-xs">
                {items.length ? (
                    <div className="divide-y divide-neutral-200">
                        {items.map((item) => (
                            <article key={item.id} className="p-5 sm:p-8 lg:p-9">
                                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="theme-text-primary type-card-title sm:text-xl">{item.name}</h2>
                                            <span className={`type-chip rounded-full px-2.5 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                                        </div>

                                        <div className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                                            <span className="theme-text-muted">Cliente: <strong className="theme-text-secondary">{item.clientName}</strong></span>
                                            <span className="theme-text-muted">E-mail: <strong className="theme-text-secondary">{item.clientEmail}</strong></span>
                                            <span className="theme-text-muted">Criado em: <strong className="theme-text-secondary">{formatDate(item.createdAt)}</strong></span>
                                            <span className="theme-text-muted">Atualizado em: <strong className="theme-text-secondary">{formatDate(item.updatedAt)}</strong></span>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <label className="block">
                                            <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Nome do projeto</span>
                                            <input
                                                value={item.name}
                                                className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                                onChange={(event) => {
                                                    const name = event.target.value;
                                                    setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, name } : entry)));
                                                }}
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Status do projeto</span>
                                            <select
                                                value={item.status}
                                                className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                                onChange={(event) => {
                                                    const status = event.target.value as Project["status"];
                                                    setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, status } : entry)));
                                                }}
                                            >
                                                {projectStatusOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="block">
                                            <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Resumo para acompanhamento</span>
                                            <textarea
                                                value={item.summary || ""}
                                                rows={4}
                                                className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                                onChange={(event) => {
                                                    const summary = event.target.value;
                                                    setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, summary } : entry)));
                                                }}
                                            />
                                        </label>

                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                disabled={savingId === item.id}
                                                onClick={() => void handleSave(item)}
                                                className="theme-cta-primary type-button inline-flex w-full items-center justify-center rounded-full px-5 py-3 transition-opacity disabled:opacity-70 sm:w-auto"
                                            >
                                                {savingId === item.id ? "Salvando..." : "Salvar projeto"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 sm:p-8">
                        <p className="theme-text-primary text-sm font-bold">Nenhum projeto criado ainda.</p>
                        <p className="theme-text-secondary mt-2 text-sm">Quando um briefing for promovido, ele passa a aparecer aqui para acompanhamento.</p>
                    </div>
                )}
            </section>
        </section>
    );
}
