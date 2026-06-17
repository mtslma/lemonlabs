import { useEffect, useState } from "react";
import { listBriefings } from "../../api/resources/briefings";
import type { Briefing } from "../../api/types/briefings";
import { useAuth } from "../../features/auth/useAuth";

export default function AdminBriefings() {
    const { session } = useAuth();
    const [items, setItems] = useState<Briefing[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadBriefings() {
            if (!session?.accessToken) {
                return;
            }

            try {
                const response = await listBriefings(session.accessToken);
                const nextItems = response.items;

                if (isMounted) {
                    setItems(nextItems);
                }
            } catch {
                if (isMounted) {
                    setErrorMessage("Conecte o módulo de briefings na API para listar os registros reais aqui.");
                }
            }
        }

        void loadBriefings();

        return () => {
            isMounted = false;
        };
    }, [session?.accessToken]);

    return (
        <section className="flex flex-col gap-5">
            <div className="theme-surface theme-border rounded-[2rem] border p-6 shadow-[0_20px_44px_rgba(24,24,27,0.08)]">
                <p className="theme-text-muted text-[0.7rem] font-bold uppercase tracking-[0.2em]">Briefings</p>
                <h1 className="theme-text-primary mt-2 text-3xl font-black tracking-tight">Pedidos com contexto detalhado</h1>
                <p className="theme-text-secondary mt-3 text-sm leading-relaxed">Aqui entram as entradas do formulário de discovery, para organizar escopo, urgência, canais e expectativa de investimento.</p>
            </div>

            {errorMessage ? <p className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-800">{errorMessage}</p> : null}

            <div className="grid gap-4">
                {items.length ? (
                    items.map((item) => (
                        <article key={item.id} className="theme-surface theme-border rounded-[1.6rem] border p-5 shadow-[0_16px_30px_rgba(24,24,27,0.06)]">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="theme-text-primary text-lg font-black tracking-tight">{item.companyName || item.contactName || "Briefing sem título"}</h2>
                                <span className="rounded-full bg-yellow-400/14 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-yellow-700">{item.status || "novo"}</span>
                            </div>
                            <p className="theme-text-secondary mt-3 text-sm leading-relaxed">{item.objective || "Defina no backend os campos retornados por /briefings para exibir o resumo comercial aqui."}</p>
                        </article>
                    ))
                ) : (
                    <article className="theme-surface theme-border rounded-[1.6rem] border border-dashed p-6 text-sm leading-relaxed shadow-[0_16px_30px_rgba(24,24,27,0.04)]">
                        <p className="theme-text-primary font-bold">Nenhum briefing carregado ainda.</p>
                        <p className="theme-text-secondary mt-2">Assim que o módulo estiver no Express template, esta lista pode consumir <code>GET /briefings</code> com paginação e filtros.</p>
                    </article>
                )}
            </div>
        </section>
    );
}
