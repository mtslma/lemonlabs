import { useEffect, useState } from "react";
import { listQuoteRequests } from "../../api/resources/quote-requests";
import type { QuoteRequest } from "../../api/types/quote-requests";
import { useAuth } from "../../features/auth/useAuth";

export default function AdminOpportunities() {
    const { session } = useAuth();
    const [items, setItems] = useState<QuoteRequest[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadItems() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const response = await listQuoteRequests(session.accessToken);
                const nextItems = response.items;

                if (isMounted) {
                    setItems(nextItems);
                }
            } catch {
                if (isMounted) {
                    setErrorMessage("Conecte o módulo de oportunidades para transformar o CTA de contato em pipeline real.");
                }
            }
        }

        void loadItems();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    return (
        <section className="flex flex-col gap-5">
            <div className="theme-surface theme-border rounded-[2rem] border p-6 shadow-[0_20px_44px_rgba(24,24,27,0.08)]">
                <p className="theme-text-muted text-[0.7rem] font-bold uppercase tracking-[0.2em]">Oportunidades</p>
                <h1 className="theme-text-primary mt-2 text-3xl font-black tracking-tight">Orçamentos captados direto do site</h1>
                <p className="theme-text-secondary mt-3 text-sm leading-relaxed">Fluxo para leads que só querem iniciar a conversa rápido e ir para atendimento comercial sem briefing longo.</p>
            </div>

            {errorMessage ? <p className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">{errorMessage}</p> : null}

            <div className="grid gap-4">
                {items.length ? (
                    items.map((item) => (
                        <article key={item.id} className="theme-surface theme-border rounded-[1.6rem] border p-5 shadow-[0_16px_30px_rgba(24,24,27,0.06)]">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="theme-text-primary text-lg font-black tracking-tight">{item.contactName || "Lead sem nome"}</h2>
                                <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-700">{item.status || "recebido"}</span>
                            </div>
                            <p className="theme-text-secondary mt-3 text-sm leading-relaxed">Solução: {item.solutionLabel || "mapear no backend"} • Origem: {item.source || "site"}</p>
                        </article>
                    ))
                ) : (
                    <article className="theme-surface theme-border rounded-[1.6rem] border border-dashed p-6 text-sm leading-relaxed shadow-[0_16px_30px_rgba(24,24,27,0.04)]">
                        <p className="theme-text-primary font-bold">Nenhuma oportunidade carregada ainda.</p>
                        <p className="theme-text-secondary mt-2">Assim que o módulo existir, esta tela pode ler <code>GET /quote-requests</code> e virar a mesa de acompanhamento comercial.</p>
                    </article>
                )}
            </div>
        </section>
    );
}
