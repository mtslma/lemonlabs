import { useState } from "react";
import type { FormEvent } from "react";
import { CircleCheckBig, ClipboardList, Send, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { ApiError } from "../api/core/client";
import { briefingGuidelines, initialBriefingForm, solutionLabels } from "../features/contact/contact.constants";
import { buildWhatsappUrl, submitBriefing } from "../features/contact/contact.service";
import type { ContactBriefingForm, ContactMode } from "../features/contact/contact.types";

export default function Contact() {
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState<ContactMode>("quote");
    const [formData, setFormData] = useState<ContactBriefingForm>(initialBriefingForm);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const solutionSlug = searchParams.get("solucao") ?? "";
    const selectedSolution = solutionLabels[solutionSlug];
    const whatsappUrl = buildWhatsappUrl(selectedSolution);

    async function handleBriefingSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFeedback("");
        setIsSubmitting(true);

        try {
            await submitBriefing({
                formData,
                solutionLabel: selectedSolution,
                solutionSlug,
            });

            setFormData(initialBriefingForm);
            setFeedback("Briefing enviado com sucesso! Retornaremos o contato em breve.");
        } catch (error) {
            setFeedback(error instanceof ApiError ? error.message : "Erro ao enviar briefing. Por favor, tente novamente ou entre em contato via WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-start overflow-hidden bg-white">
            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* BACKGROUND                                                                 */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 home-dot-grid opacity-70" />

                <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
                <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* ────────────────────────────────────────────────────────────────────────── */}
            {/* GRID CONTAINER                                                             */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-0">
                <div className="grid grid-cols-1 items-start gap-14 min-h-[calc(100vh-72px)] lg:grid-cols-12 lg:gap-8">
                    {/* LADO ESQUERDO - TEXTO E ABAS */}
                    <div className="flex flex-col justify-start w-full pt-4 sm:pt-6 lg:col-span-6 lg:sticky lg:top-0 lg:pt-12">
                        <h1 className="theme-text-primary max-w-[11ch] text-[clamp(3.05rem,13vw,5rem)] font-black leading-[1.03] tracking-tight sm:max-w-none sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.6rem,5.6vw,5rem)]">
                            Vamos montar
                            <br />o seu orçamento.
                        </h1>

                        <p className="text-justify theme-text-secondary mt-7 text-base font-medium leading-relaxed sm:text-lg max-w-xl">Escolha entre o atendimento expresso para abrir o WhatsApp agora, ou preencha o nosso briefing para adiantar o escopo do projeto.</p>

                        <div className="mt-8 grid gap-4 sm:max-w-xl sm:grid-cols-2">
                            <button type="button" onClick={() => setMode("quote")} className={`cursor-pointer rounded-2xl border p-5 text-left transition duration-200 ${mode === "quote" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />
                                    <span className="theme-text-primary text-base font-black">Orçamento expresso</span>
                                </div>
                                <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Fale diretamente com nosso time comercial por WhatsApp.</p>
                            </button>

                            <button type="button" onClick={() => setMode("briefing")} className={`cursor-pointer rounded-2xl border p-5 text-left transition duration-200 ${mode === "briefing" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                <div className="flex items-center gap-3">
                                    <ClipboardList className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />
                                    <span className="theme-text-primary text-base font-black">Briefing detalhado</span>
                                </div>
                                <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Adiantar os requisitos e especificações da entrega.</p>
                            </button>
                        </div>

                        {mode === "quote" && (
                            <div className="mt-8 flex w-full flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer theme-cta-primary group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-none bg-emerald-500 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-emerald-600 hover:shadow-lg sm:w-auto sm:px-10"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FaWhatsapp className="h-5 w-5" />
                                        Iniciar por WhatsApp
                                    </span>
                                </a>

                                <Link to="/servicos" className="theme-link-accent inline-flex justify-center text-sm font-bold opacity-80 underline underline-offset-4 transition-opacity duration-500 hover:opacity-100 sm:justify-start">
                                    Ver planos de serviços
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* LADO DIREITO - FORMULÁRIO OU COMPONENTE COMERCIAL */}
                    <div className="w-full lg:col-span-5 lg:col-start-8 flex flex-col justify-start pt-4 sm:pt-6 lg:pt-12">
                        {mode === "quote" && (
                            <div className="grid w-full gap-5">
                                {selectedSolution && (
                                    <div className="theme-surface theme-border rounded-3xl border p-6 shadow-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                            <p className="theme-text-muted text-[10px] font-bold uppercase tracking-[0.14em]">Solução de interesse</p>
                                        </div>
                                        <p className="theme-text-primary mt-2 text-lg font-bold tracking-tight">{selectedSolution}</p>
                                    </div>
                                )}

                                <div className="theme-surface theme-border rounded-3xl border p-6 shadow-xs sm:p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                            <ClipboardList className="h-5 w-5" />
                                        </div>
                                        <h2 className="theme-text-primary text-base font-black tracking-tight">O que vamos alinhar na conversa:</h2>
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
                            <form onSubmit={handleBriefingSubmit} className="theme-surface theme-border grid w-full gap-4 rounded-3xl border p-6 shadow-md sm:p-8">
                                {selectedSolution && (
                                    <div className="theme-border mb-2 border-b pb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">Alinhando escopo para:</span>
                                        <p className="theme-text-primary text-base font-black">{selectedSolution}</p>
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Nome</span>
                                        <input value={formData.contactName} onChange={(event) => setFormData((current) => ({ ...current, contactName: event.target.value }))} placeholder="Seu nome completo" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Empresa</span>
                                        <input value={formData.companyName} onChange={(event) => setFormData((current) => ({ ...current, companyName: event.target.value }))} placeholder="Nome da empresa ou projeto" className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">E-mail</span>
                                        <input value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} type="email" placeholder="seuemail@exemplo.com" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Prazo ideal</span>
                                        <input value={formData.deadline} onChange={(event) => setFormData((current) => ({ ...current, deadline: event.target.value }))} placeholder="Ex: 30 dias, urgente..." className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                </div>

                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Objetivo principal e problema</span>
                                    <textarea value={formData.objective} onChange={(event) => setFormData((current) => ({ ...current, objective: event.target.value }))} placeholder="Descreva o que deseja solucionar ou criar." required rows={3} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                </label>

                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Escopo e canais</span>
                                    <textarea value={formData.scope} onChange={(event) => setFormData((current) => ({ ...current, scope: event.target.value }))} placeholder="Ex: App mobile, site, automação do WhatsApp..." rows={2} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                </label>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Referências</span>
                                        <textarea value={formData.references} onChange={(event) => setFormData((current) => ({ ...current, references: event.target.value }))} placeholder="Ex: links de concorrentes" rows={2} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Investimento estimado</span>
                                        <textarea value={formData.budget} onChange={(event) => setFormData((current) => ({ ...current, budget: event.target.value }))} placeholder="Faixa de orçamento prevista" rows={2} className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" />
                                    </label>
                                </div>

                                {feedback && <p className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-xs font-medium text-yellow-800">{feedback}</p>}

                                {/* Ações do formulário unificadas horizontalmente para o mobile */}
                                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
                                    <button type="submit" disabled={isSubmitting} className="cursor-pointer theme-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-transform duration-500 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 w-full sm:w-auto">
                                        <Send className="h-4 w-4" strokeWidth={2.2} />
                                        {isSubmitting ? "Enviando..." : "Enviar briefing"}
                                    </button>

                                    <Link to="/servicos" className="theme-link-accent inline-flex justify-center text-sm font-bold opacity-80 underline underline-offset-4 transition-opacity duration-500 hover:opacity-100 whitespace-nowrap text-center">
                                        Ver planos de serviços
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
