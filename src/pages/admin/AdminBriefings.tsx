import { useEffect, useState } from "react";
import InlineNotice from "../../components/feedback/InlineNotice";
import { listBriefings, promoteBriefing, updateBriefing } from "../../api/resources/briefings";
import type { Briefing } from "../../api/types/briefings";
import { useAuth } from "../../features/auth/useAuth";
import { briefingStatusOptions, formatDate, getStatusBadgeClass, getStatusLabel } from "./admin.utils";

export default function AdminBriefings() {
    const { session } = useAuth();
    const [items, setItems] = useState<Briefing[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [savingId, setSavingId] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadBriefings() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const response = await listBriefings(session.accessToken);
                if (isMounted) {
                    setItems(response.items);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar os briefings.");
                }
            }
        }

        void loadBriefings();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    async function handleSave(item: Briefing) {
        if (!session?.accessToken) {
            return;
        }

        setSavingId(item.id);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const updatedItem = await updateBriefing(session.accessToken, item.id, {
                status: item.status,
                clientFeedback: item.clientFeedback || "",
            });

            setItems((current) => current.map((entry) => (entry.id === item.id ? updatedItem : entry)));
            setSuccessMessage("Briefing atualizado com sucesso.");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Não foi possível atualizar o briefing agora.");
        } finally {
            setSavingId("");
        }
    }

    async function handlePromote(item: Briefing) {
        if (!session?.accessToken) {
            return;
        }

        setSavingId(item.id);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const result = await promoteBriefing(session.accessToken, item.id, {
                name: item.companyName || item.solutionLabel,
            });
            setItems((current) => current.map((entry) => (entry.id === item.id ? result.briefing : entry)));
            setSuccessMessage(`Projeto criado com sucesso a partir do briefing "${result.project.name}".`);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Não foi possível promover o briefing agora.");
        } finally {
            setSavingId("");
        }
    }

    return (
        <section className="space-y-4 sm:space-y-5">
            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-5 shadow-xs sm:p-9">
                <p className="theme-text-muted type-eyebrow">Briefings</p>
                <h1 className="theme-text-primary type-section-title mt-3">Pedidos com mais contexto.</h1>
                <p className="theme-text-secondary mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
                    Aqui entram os envios mais completos, com objetivo, prazo e retorno visível para o cliente. Quando fizer sentido, um briefing pode ser promovido para projeto e seguir com acompanhamento próprio.
                </p>
            </section>

            {successMessage ? <InlineNotice message={successMessage} tone="success" /> : null}
            {errorMessage ? <InlineNotice message={errorMessage} tone="error" /> : null}

            <section className="theme-surface theme-border rounded-3xl border bg-white/88 shadow-xs">
                {items.length ? (
                    <div className="divide-y divide-neutral-200">
                        {items.map((item) => (
                            <article key={item.id} className="p-5 sm:p-8 lg:p-9">
                                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_30rem]">
                                    <div className="max-w-3xl">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="theme-text-primary type-card-title sm:text-xl">{item.companyName || item.contactName || "Briefing sem título"}</h2>
                                            <span className={`type-chip rounded-full px-2.5 py-1 ${getStatusBadgeClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                                            {item.projectId ? <span className="type-chip rounded-full bg-neutral-950 px-2.5 py-1 text-white">Projeto criado</span> : null}
                                        </div>
                                        <p className="theme-text-secondary mt-3 text-sm leading-relaxed">{item.objective}</p>
                                        <div className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                                            <span className="theme-text-muted">Contato: <strong className="theme-text-secondary">{item.contactName}</strong></span>
                                            <span className="theme-text-muted">E-mail: <strong className="theme-text-secondary">{item.email}</strong></span>
                                            <span className="theme-text-muted">Prazo: <strong className="theme-text-secondary">{item.deadline || "Não informado"}</strong></span>
                                            <span className="theme-text-muted">Entrada: <strong className="theme-text-secondary">{formatDate(item.createdAt)}</strong></span>
                                            {item.projectPromotedAt ? <span className="theme-text-muted">Promovido em: <strong className="theme-text-secondary">{formatDate(item.projectPromotedAt)}</strong></span> : null}
                                        </div>
                                    </div>

                                    <div className="grid w-full gap-4">
                                        <label className="block">
                                            <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Status</span>
                                            <select
                                                value={item.status}
                                                className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                                onChange={(event) => {
                                                    const status = event.target.value as Briefing["status"];
                                                    setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, status } : entry)));
                                                }}
                                            >
                                                {briefingStatusOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="block">
                                            <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Feedback para o cliente</span>
                                            <textarea
                                                value={item.clientFeedback || ""}
                                                rows={5}
                                                className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                                onChange={(event) => {
                                                    const clientFeedback = event.target.value;
                                                    setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, clientFeedback } : entry)));
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-3">
                                    {!item.projectId ? (
                                        <button
                                            type="button"
                                            disabled={savingId === item.id}
                                            onClick={() => void handlePromote(item)}
                                            className="theme-border theme-text-secondary type-button inline-flex w-full items-center justify-center rounded-full border px-5 py-3 transition-colors hover:bg-neutral-950 hover:text-white disabled:opacity-70 sm:w-auto"
                                        >
                                            {savingId === item.id ? "Processando..." : "Promover para projeto"}
                                        </button>
                                    ) : null}
                                    <button
                                        type="button"
                                        disabled={savingId === item.id}
                                        onClick={() => void handleSave(item)}
                                        className="theme-cta-primary type-button inline-flex w-full items-center justify-center rounded-full px-5 py-3 transition-opacity disabled:opacity-70 sm:w-auto"
                                    >
                                        {savingId === item.id ? "Salvando..." : "Salvar briefing"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 sm:p-8">
                        <p className="theme-text-primary text-sm font-bold">Nenhum briefing carregado ainda.</p>
                        <p className="theme-text-secondary mt-2 text-sm">Assim que novos envios chegarem, eles aparecerão aqui.</p>
                    </div>
                )}
            </section>
        </section>
    );
}
