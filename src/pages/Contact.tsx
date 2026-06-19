import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CircleCheckBig, ClipboardList, LockKeyhole, Send, Sparkles } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import { ApiError } from "../api/core/client";
import { useAuth } from "../features/auth/useAuth";
import {
    briefingGuidelines,
    briefingScopeOptions,
    CONTACT_BRIEFING_DRAFT_KEY,
    initialBriefingForm,
    solutionLabels,
} from "../features/contact/contact.constants";
import { buildWhatsappUrl, submitBriefing } from "../features/contact/contact.service";
import type { ContactBriefingForm, ContactMode } from "../features/contact/contact.types";

const conversationSteps = ["O primeiro contato ajuda a entender o momento do projeto.", "A Limosin organiza prioridades, possibilidades e próximos passos.", "Depois disso, o escopo pode ser definido com mais clareza."];

function readBriefingDraft() {
    if (typeof window === "undefined") {
        return initialBriefingForm;
    }

    try {
        const rawValue = window.localStorage.getItem(CONTACT_BRIEFING_DRAFT_KEY);
        if (!rawValue) {
            return initialBriefingForm;
        }

        const parsed = JSON.parse(rawValue) as Partial<ContactBriefingForm>;

        return {
            ...initialBriefingForm,
            ...parsed,
            scope: Array.isArray(parsed.scope) ? parsed.scope : [],
        };
    } catch {
        return initialBriefingForm;
    }
}

function writeBriefingDraft(formData: ContactBriefingForm) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(CONTACT_BRIEFING_DRAFT_KEY, JSON.stringify(formData));
}

function clearBriefingDraft() {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(CONTACT_BRIEFING_DRAFT_KEY);
}

export default function Contact() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isAuthenticated, session } = useAuth();
    const [mode, setMode] = useState<ContactMode>(searchParams.get("modo") === "briefing" ? "briefing" : "quote");
    const [formData, setFormData] = useState<ContactBriefingForm>(() => readBriefingDraft());
    const [feedback, setFeedback] = useState("");
    const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const solutionSlug = searchParams.get("solucao") ?? "";
    const selectedSolution = solutionLabels[solutionSlug];
    const whatsappUrl = buildWhatsappUrl(selectedSolution);

    useEffect(() => {
        if (!session?.user) {
            return;
        }

        setFormData((current) => ({
            ...current,
            contactName: session.user.name,
            email: session.user.email,
        }));
    }, [session?.user]);

    useEffect(() => {
        writeBriefingDraft(formData);
    }, [formData]);

    useEffect(() => {
        if (searchParams.get("modo") === "briefing") {
            setMode("briefing");
        }
    }, [searchParams]);

    useEffect(() => {
        if (redirectCountdown === null) {
            return;
        }

        if (redirectCountdown === 0) {
            navigate("/minha-area/briefings", { replace: true });
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setRedirectCountdown((current) => (current === null ? null : current - 1));
        }, 1000);

        return () => window.clearTimeout(timeoutId);
    }, [navigate, redirectCountdown]);

    function updateField<K extends keyof ContactBriefingForm>(field: K, value: ContactBriefingForm[K]) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function toggleScopeOption(option: string) {
        setFormData((current) => ({
            ...current,
            scope: current.scope.includes(option) ? current.scope.filter((item) => item !== option) : [...current.scope, option],
        }));
    }

    function handleClearBriefingForm() {
        const nextForm = {
            ...initialBriefingForm,
            contactName: session?.user.name ?? "",
            email: session?.user.email ?? "",
        };

        setFeedback("");
        setRedirectCountdown(null);
        setFormData(nextForm);
        clearBriefingDraft();
    }

    async function handleBriefingSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setFeedback("");
        setRedirectCountdown(null);

        if (!isAuthenticated || !session?.accessToken) {
            writeBriefingDraft(formData);
            navigate(`/entrar`, {
                state: {
                    redirectTo: `/contato?modo=briefing${solutionSlug ? `&solucao=${solutionSlug}` : ""}`,
                },
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await submitBriefing({
                formData,
                solutionLabel: selectedSolution,
                solutionSlug,
                token: session.accessToken,
            });

            const nextForm = {
                ...initialBriefingForm,
                contactName: session.user.name,
                email: session.user.email,
            };

            setFormData(nextForm);
            clearBriefingDraft();
            setFeedback("Briefing recebido com sucesso. Você será redirecionado para a sua área de acompanhamento.");
            setRedirectCountdown(4);
        } catch (error) {
            setFeedback(error instanceof ApiError ? error.message : "Não foi possível enviar o briefing agora. Tente novamente ou use o contato por WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-start overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 home-dot-grid opacity-70" />
                <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
                <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />
            </div>

            <section className="page-shell relative z-10 pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-16 lg:pb-28">
                <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
                    <div className="flex w-full flex-col justify-start lg:sticky lg:top-24 lg:col-span-6">
                        <h1 className="theme-text-primary page-title-display max-w-6xl lg:text-[clamp(4.4rem,5.8vw,5.4rem)]">
                            Nos conte <br />a sua ideia.
                        </h1>

                        <p className="theme-text-secondary mt-5 max-w-2xl text-base font-medium leading-relaxed sm:mt-7 sm:text-lg">Escolha como prefere iniciar: uma conversa rápida para tirar dúvidas ou um briefing mais completo para adiantar o escopo. O objetivo é entender o cenário antes de propor qualquer caminho.</p>

                        <div className="mt-6 max-w-2xl sm:mt-8">
                            <p className="theme-text-muted type-chip mb-3">Como começar</p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <button type="button" onClick={() => setMode("quote")} className={`cursor-pointer rounded-2xl border p-4 text-left transition-colors duration-200 sm:p-5 ${mode === "quote" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />
                                        <span className="theme-text-primary type-card-title">Conversar primeiro</span>
                                    </div>
                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Para explicar a ideia de forma direta e receber uma primeira orientação.</p>
                                </button>

                                <button type="button" onClick={() => setMode("briefing")} className={`cursor-pointer rounded-2xl border p-4 text-left transition-colors duration-200 sm:p-5 ${mode === "briefing" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                    <div className="flex items-center gap-3">
                                        <ClipboardList className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />
                                        <span className="theme-text-primary type-card-title">Enviar briefing</span>
                                    </div>
                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Para deixar as informações organizadas desde o primeiro contato.</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col justify-start lg:col-span-6">
                        {mode === "quote" && (
                            <div className="grid w-full gap-4 sm:gap-5">
                                <div className="theme-surface theme-border rounded-3xl border p-5 shadow-md sm:p-8">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                            <FaWhatsapp className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="theme-text-primary type-section-title">Inicie pelo WhatsApp.</h2>
                                            <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Caminho mais rápido para apresentar a ideia, tirar dúvidas iniciais e entender se já existe um formato de serviço adequado.</p>
                                        </div>
                                    </div>

                                    {selectedSolution && (
                                        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50/70 p-4">
                                            <p className="theme-text-muted type-chip">Interesse selecionado</p>
                                            <p className="theme-text-primary type-card-title mt-2">{selectedSolution}</p>
                                        </div>
                                    )}

                                    <ul className="mt-6 space-y-3.5">
                                        {conversationSteps.map((item) => (
                                            <li key={item} className="theme-text-secondary flex items-start gap-3 text-sm leading-relaxed">
                                                <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" strokeWidth={2.2} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="type-button mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-white shadow-xs transition-colors duration-300 hover:bg-neutral-800 hover:shadow-md">
                                        <FaWhatsapp className="h-5 w-5" />
                                        Iniciar conversa
                                        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                                    </a>
                                </div>

                                <div className="theme-surface theme-border rounded-3xl border p-5 shadow-xs sm:p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                            <ClipboardList className="h-5 w-5" />
                                        </div>
                                        <h2 className="theme-text-primary type-card-title">Pontos que ajudam no direcionamento:</h2>
                                    </div>

                                    <ul className="mt-5 space-y-3.5">
                                        {briefingGuidelines.map((item) => (
                                            <li key={item} className="theme-text-secondary flex items-start gap-3 text-sm leading-relaxed">
                                                <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" strokeWidth={2.2} />
                                                <span dangerouslySetInnerHTML={{ __html: item }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {mode === "briefing" && (
                            <form onSubmit={handleBriefingSubmit} className="theme-surface theme-border grid w-full gap-4 rounded-3xl border p-4 shadow-md sm:p-8 lg:p-9">
                                <div>
                                    <h2 className="theme-text-primary type-section-title">Envie o briefing do projeto.</h2>
                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">As informações serão salvas e preenchidas quando você fizer login.</p>
                                </div>

                                {!isAuthenticated ? (
                                    <div className="rounded-2xl border border-yellow-200/80 bg-yellow-50/45 px-4 py-3">
                                        <div className="flex items-start gap-2.5">
                                            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-yellow-700/85" strokeWidth={2.2} />
                                            <div>
                                                <p className="type-chip text-yellow-800/75">Acesso na etapa final</p>
                                                <p className="mt-1 text-sm leading-relaxed text-yellow-900/80">O login só será pedido no envio, e suas respostas continuam salvas.</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {selectedSolution && (
                                    <div className="theme-border border-b pb-4">
                                        <span className="type-chip text-yellow-600">Interesse inicial</span>
                                        <p className="theme-text-primary type-card-title">{selectedSolution}</p>
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Nome <span className="theme-text-muted">(obrigatório)</span></span>
                                        <input value={formData.contactName} readOnly placeholder="Seu nome" className="theme-border w-full rounded-xl border bg-neutral-50 px-4 py-2.5 text-sm outline-none" />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">E-mail <span className="theme-text-muted">(obrigatório)</span></span>
                                        <input value={formData.email} readOnly type="email" placeholder="seuemail@exemplo.com" className="theme-border w-full rounded-xl border bg-neutral-50 px-4 py-2.5 text-sm outline-none" />
                                    </label>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Empresa ou projeto <span className="theme-text-muted">(opcional)</span></span>
                                        <input value={formData.companyName} onChange={(event) => updateField("companyName", event.target.value)} placeholder="Nome da empresa, marca ou ideia" className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Prazo ideal <span className="text-red-500">(obrigatório)</span></span>
                                        <input value={formData.deadline} onChange={(event) => updateField("deadline", event.target.value)} placeholder="Ex: sem pressa, 30 dias, urgente..." required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                </div>

                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">O que precisa ser resolvido? <span className="text-red-500">(obrigatório)</span></span>
                                    <textarea value={formData.objective} onChange={(event) => updateField("objective", event.target.value)} placeholder="Ex: captar clientes, automatizar atendimento, organizar pedidos, criar um site mais profissional..." required rows={4} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                </label>

                                <div className="block w-full">
                                    <span className="theme-text-primary mb-2 block text-xs font-semibold">O que a solução pode envolver? <span className="theme-text-muted">(opcional)</span></span>
                                    <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                                        {briefingScopeOptions.map((option) => {
                                            const checked = formData.scope.includes(option);

                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => toggleScopeOption(option)}
                                                    className={`rounded-2xl border px-3.5 py-3 text-left text-sm font-semibold leading-snug transition-colors sm:px-4 ${checked ? "border-yellow-400 bg-yellow-50 text-neutral-950" : "theme-border bg-white text-neutral-700 hover:bg-neutral-50"}`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Referências <span className="theme-text-muted">(opcional)</span></span>
                                        <textarea value={formData.references} onChange={(event) => updateField("references", event.target.value)} placeholder="Sites, concorrentes ou estilos de referência" rows={2} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Investimento previsto <span className="theme-text-muted">(opcional)</span></span>
                                        <textarea value={formData.budget} onChange={(event) => updateField("budget", event.target.value)} placeholder="Pode ser uma faixa aproximada" rows={2} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                </div>

                                {feedback ? (
                                    <p
                                        className={`rounded-xl px-4 py-3 text-sm font-medium ${
                                            redirectCountdown !== null ? "border border-emerald-200 bg-emerald-50 text-emerald-800" : "border border-yellow-200 bg-yellow-50 text-yellow-800"
                                        }`}
                                    >
                                        {feedback}
                                        {redirectCountdown !== null ? ` Redirecionando em ${redirectCountdown}s.` : ""}
                                    </p>
                                ) : null}

                                <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                                        <button type="submit" disabled={isSubmitting} className="theme-cta-primary type-button inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                                            <Send className="h-4 w-4" strokeWidth={2.2} />
                                            {isSubmitting ? "Enviando..." : isAuthenticated ? "Enviar briefing" : "Entrar para enviar"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleClearBriefingForm}
                                            className="theme-border theme-text-secondary type-button inline-flex w-full cursor-pointer items-center justify-center rounded-full border px-6 py-3.5 transition-colors hover:bg-neutral-950 hover:text-white sm:w-auto"
                                        >
                                            Limpar formulário
                                        </button>
                                    </div>

                                    <Link to="/servicos" className="theme-link-accent type-button inline-flex justify-center whitespace-nowrap text-center opacity-80 underline underline-offset-4 transition-opacity duration-300 hover:opacity-100">
                                        Ver modelos de serviço
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
