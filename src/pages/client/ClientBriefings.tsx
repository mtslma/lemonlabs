import { useEffect, useState } from "react";
import { ClipboardList, FileText } from "lucide-react";
import InlineNotice from "../../components/feedback/InlineNotice";
import { getMyBriefingById, listMyBriefings } from "../../api/resources/briefings";
import type { Briefing } from "../../api/types/briefings";
import { useAuth } from "../../features/auth/useAuth";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "../admin/admin.utils";

function getBriefingTitle(item: Briefing) {
    return item.solutionLabel || "Briefing enviado";
}

function getBriefingOwner(item: Briefing) {
    return item.companyName || item.contactName || "Sem identificação";
}

export default function ClientBriefings() {
    const { session } = useAuth();
    const [items, setItems] = useState<Briefing[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const [selectedItem, setSelectedItem] = useState<Briefing | null>(null);
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadBriefings() {
            if (!session?.accessToken) {
                setIsLoadingList(false);
                return;
            }

            setIsLoadingList(true);
            setErrorMessage("");

            try {
                const response = await listMyBriefings(session.accessToken);

                if (!isMounted) {
                    return;
                }

                setItems(response.items);
                if (response.items[0]) {
                    setSelectedId((current) => current || response.items[0].id);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar seus briefings agora.");
                }
            } finally {
                if (isMounted) {
                    setIsLoadingList(false);
                }
            }
        }

        void loadBriefings();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    useEffect(() => {
        let isMounted = true;

        async function loadBriefingDetail() {
            if (!session?.accessToken || !selectedId) {
                if (isMounted) {
                    setSelectedItem(null);
                }
                return;
            }

            setIsLoadingDetail(true);
            setErrorMessage("");

            try {
                const response = await getMyBriefingById(session.accessToken, selectedId);
                if (isMounted) {
                    setSelectedItem(response);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar os detalhes do briefing.");
                }
            } finally {
                if (isMounted) {
                    setIsLoadingDetail(false);
                }
            }
        }

        void loadBriefingDetail();

        return () => {
            isMounted = false;
        };
    }, [selectedId, session?.accessToken]);

    if (isLoadingList) {
        return (
            <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-6 shadow-xs sm:p-8">
                <p className="theme-text-secondary text-sm">Carregando briefings...</p>
            </section>
        );
    }

    return (
        <section className="space-y-4 sm:space-y-5">
            {errorMessage ? <InlineNotice message={errorMessage} tone="error" /> : null}

            {!items.length ? (
                <section className="theme-surface theme-border rounded-3xl border bg-white/88 p-8 text-center shadow-xs">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-600">
                        <ClipboardList className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h1 className="theme-text-primary type-section-title mt-5">Nenhum briefing encontrado.</h1>
                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Quando um briefing for enviado com o mesmo e-mail da sua conta, ele aparecerá aqui.</p>
                </section>
            ) : (
                <section className="theme-surface theme-border overflow-hidden rounded-3xl border bg-white/88 shadow-xs">
                    <div className="grid lg:grid-cols-[320px_1fr]">
                        <aside className="border-b border-neutral-200 bg-white/55 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                            <p className="theme-text-muted type-eyebrow">Briefings</p>
                            <div className="mt-3 flex items-end justify-between gap-3">
                                <h1 className="theme-text-primary type-section-title sm:text-2xl">Seus envios</h1>
                                <span className="theme-text-muted type-chip rounded-full border border-neutral-200 bg-white/82 px-2.5 py-1">
                                    {items.length} {items.length === 1 ? "item" : "itens"}
                                </span>
                            </div>

                            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-5 lg:grid lg:gap-1.5 lg:overflow-visible lg:pb-0">
                                {items.map((item) => {
                                    const isSelected = selectedId === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedId(item.id)}
                                            className={`min-w-[15rem] rounded-2xl border px-4 py-3 text-left transition-colors lg:w-full lg:min-w-0 ${
                                                isSelected
                                                    ? "border-neutral-950 bg-neutral-950 text-white"
                                                    : "border-neutral-200 bg-white/88 hover:bg-black/4"
                                            }`}
                                        >
                                            <p className={`type-card-title truncate text-sm ${isSelected ? "text-white" : "theme-text-primary"}`}>{getBriefingTitle(item)}</p>
                                            <p className={`mt-1 truncate text-xs ${isSelected ? "text-white/65" : "theme-text-muted"}`}>{getBriefingOwner(item)}</p>
                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <span className={`type-chip rounded-full px-2 py-1 ${isSelected ? "bg-white/12 text-white" : getStatusBadgeClass(item.status)}`}>
                                                    {getStatusLabel(item.status)}
                                                </span>
                                                <span className={`text-[0.68rem] ${isSelected ? "text-white/70" : "theme-text-muted"}`}>{formatDate(item.updatedAt)}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </aside>

                        <section className="p-4 sm:p-7 lg:p-8">
                            {isLoadingDetail ? (
                                <p className="theme-text-secondary text-sm">Carregando detalhes...</p>
                            ) : selectedItem ? (
                                <article className="space-y-5 sm:space-y-6">
                                    <header className="border-b border-neutral-200 pb-5 sm:pb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                                <FileText className="h-5 w-5" strokeWidth={2.2} />
                                            </div>
                                            <p className="theme-text-muted type-eyebrow">Detalhes</p>
                                        </div>

                                        <h2 className="theme-text-primary type-section-title mt-4 sm:text-3xl">{getBriefingTitle(selectedItem)}</h2>
                                        <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                            <span className={`type-chip rounded-full px-2.5 py-1 ${getStatusBadgeClass(selectedItem.status)}`}>{getStatusLabel(selectedItem.status)}</span>
                                            {selectedItem.projectId ? <span className="type-chip rounded-full bg-neutral-950 px-2.5 py-1 text-white">Projeto criado</span> : null}
                                        </div>
                                        <p className="theme-text-secondary mt-3 text-sm">{getBriefingOwner(selectedItem)}</p>
                                    </header>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <DetailField label="Objetivo" value={selectedItem.objective} />
                                        <DetailField label="Escopo informado" value={selectedItem.scope} />
                                        <DetailField label="Prazo" value={selectedItem.deadline} />
                                        <DetailField label="Atualizado em" value={formatDate(selectedItem.updatedAt)} />
                                        <DetailField label="Projeto criado em" value={selectedItem.projectPromotedAt ? formatDate(selectedItem.projectPromotedAt) : null} />
                                    </div>

                                    <section className="border-t border-neutral-200 pt-5 sm:pt-6">
                                        <p className="theme-text-muted type-eyebrow">Retorno da equipe</p>
                                        <p className="theme-text-secondary mt-3 text-sm leading-relaxed">
                                            {selectedItem.clientFeedback || "Ainda não há retorno publicado para este briefing. Quando houver atualização, ela aparecerá aqui."}
                                        </p>
                                    </section>
                                </article>
                            ) : (
                                <p className="theme-text-secondary text-sm">Selecione um briefing para ver os detalhes.</p>
                            )}
                        </section>
                    </div>
                </section>
            )}
        </section>
    );
}

function DetailField({ label, value }: { label: string; value?: string | null }) {
    if (!value) {
        return null;
    }

    return (
        <div>
            <p className="theme-text-muted type-eyebrow">{label}</p>
            <p className="theme-text-secondary mt-2 text-sm leading-relaxed">{value}</p>
        </div>
    );
}
