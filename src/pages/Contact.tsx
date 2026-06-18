import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CircleCheckBig, ClipboardList, Send, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import { ApiError } from "../api/core/client";
import { briefingGuidelines, initialBriefingForm, solutionLabels } from "../features/contact/contact.constants";
import { buildWhatsappUrl, submitBriefing } from "../features/contact/contact.service";
import type { ContactBriefingForm, ContactMode } from "../features/contact/contact.types";

const conversationSteps = ["O primeiro contato ajuda a entender o momento do projeto.", "A Limosin organiza prioridades, possibilidades e próximos passos.", "Depois disso, o escopo pode ser definido com mais clareza."];

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
            setFeedback("Briefing recebido. As informações serão analisadas e o retorno será feito pelo contato informado.");
        } catch (error) {
            setFeedback(error instanceof ApiError ? error.message : "Não foi possível enviar o briefing agora. Tente novamente ou use o contato por WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-start overflow-hidden bg-white">
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 home-dot-grid opacity-70" />

                <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
                <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* CONTEÚDO */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-24 lg:px-12 lg:pt-16 lg:pb-28">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
                    {/* LADO ESQUERDO */}
                    <div className="flex w-full flex-col justify-start lg:sticky lg:top-24 lg:col-span-7">
                        <h1 className="theme-text-primary max-w-6xl text-[clamp(3.05rem,13vw,5rem)] font-black leading-[1.03] tracking-tight sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.4rem,5.8vw,5.4rem)]">
                            Nos conte <br />a sua ideia.
                        </h1>

                        <p className="theme-text-secondary mt-7 max-w-2xl text-justify text-base font-medium leading-relaxed sm:text-lg">Escolha como prefere iniciar: uma conversa rápida para tirar dúvidas ou um briefing mais completo para adiantar o escopo. O objetivo é entender o cenário antes de propor qualquer caminho.</p>

                        <div className="mt-8 max-w-2xl">
                            <p className="theme-text-muted mb-3 text-[10px] font-bold uppercase tracking-[0.14em]">Como começar</p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <button type="button" onClick={() => setMode("quote")} className={`cursor-pointer rounded-2xl border p-5 text-left transition-colors duration-200 ${mode === "quote" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />

                                        <span className="theme-text-primary text-base font-black">Conversar primeiro</span>
                                    </div>

                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Para explicar a ideia de forma direta e receber uma primeira orientação.</p>
                                </button>

                                <button type="button" onClick={() => setMode("briefing")} className={`cursor-pointer rounded-2xl border p-5 text-left transition-colors duration-200 ${mode === "briefing" ? "border-yellow-400 bg-yellow-400/5 shadow-xs" : "theme-border bg-white hover:bg-neutral-50"}`}>
                                    <div className="flex items-center gap-3">
                                        <ClipboardList className="h-5 w-5 text-yellow-500" strokeWidth={2.2} />

                                        <span className="theme-text-primary text-base font-black">Enviar briefing</span>
                                    </div>

                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Para deixar as informações organizadas desde o primeiro contato.</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* LADO DIREITO */}
                    <div className="flex w-full flex-col justify-start lg:col-span-5">
                        {mode === "quote" && (
                            <div className="grid w-full gap-5">
                                <div className="theme-surface theme-border rounded-3xl border p-6 shadow-md sm:p-8">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                            <FaWhatsapp className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="theme-text-primary text-xl font-black tracking-tight">Inicie pelo WhatsApp.</h2>

                                            <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Caminho mais rápido para apresentar a ideia, tirar dúvidas iniciais e entender se já existe um formato de serviço adequado.</p>
                                        </div>
                                    </div>

                                    {selectedSolution && (
                                        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50/70 p-4">
                                            <p className="theme-text-muted text-[10px] font-bold uppercase tracking-[0.14em]">Interesse selecionado</p>

                                            <p className="theme-text-primary mt-2 text-base font-black tracking-tight">{selectedSolution}</p>
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

                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-xs transition-colors duration-300 hover:bg-neutral-800 hover:shadow-md">
                                        <FaWhatsapp className="h-5 w-5" />
                                        Iniciar conversa
                                        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                                    </a>
                                </div>

                                <div className="theme-surface theme-border rounded-3xl border p-6 shadow-xs sm:p-8">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-yellow-400/10 p-2 text-yellow-600">
                                            <ClipboardList className="h-5 w-5" />
                                        </div>

                                        <h2 className="theme-text-primary text-base font-black tracking-tight">Pontos que ajudam no direcionamento:</h2>
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
                                <div>
                                    <h2 className="theme-text-primary text-xl font-black tracking-tight">Envie o básico do projeto.</h2>

                                    <p className="theme-text-secondary mt-2 text-sm leading-relaxed">As informações abaixo estruturam o primeiro contato e deixam o fluxo pronto para integração com a API de briefings.</p>
                                </div>

                                {selectedSolution && (
                                    <div className="theme-border border-b pb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">Interesse inicial</span>

                                        <p className="theme-text-primary text-base font-black">{selectedSolution}</p>
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Nome</span>

                                        <input
                                            value={formData.contactName}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    contactName: event.target.value,
                                                }))
                                            }
                                            placeholder="Seu nome"
                                            required
                                            className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Empresa ou projeto</span>

                                        <input
                                            value={formData.companyName}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    companyName: event.target.value,
                                                }))
                                            }
                                            placeholder="Nome da empresa, marca ou ideia"
                                            className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">E-mail</span>

                                        <input
                                            value={formData.email}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    email: event.target.value,
                                                }))
                                            }
                                            type="email"
                                            placeholder="seuemail@exemplo.com"
                                            required
                                            className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Prazo ideal</span>

                                        <input
                                            value={formData.deadline}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    deadline: event.target.value,
                                                }))
                                            }
                                            placeholder="Ex: sem pressa, 30 dias, urgente..."
                                            className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>
                                </div>

                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">O que precisa ser resolvido?</span>

                                    <textarea
                                        value={formData.objective}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                objective: event.target.value,
                                            }))
                                        }
                                        placeholder="Ex: captar clientes, automatizar atendimento, organizar pedidos, criar um site mais profissional..."
                                        required
                                        rows={3}
                                        className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                    />
                                </label>

                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">O que a solução pode envolver?</span>

                                    <textarea
                                        value={formData.scope}
                                        onChange={(event) =>
                                            setFormData((current) => ({
                                                ...current,
                                                scope: event.target.value,
                                            }))
                                        }
                                        placeholder="Ex: site, landing page, sistema interno, WhatsApp, painel administrativo, integração com pagamento..."
                                        rows={2}
                                        className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                    />
                                </label>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Referências</span>

                                        <textarea
                                            value={formData.references}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    references: event.target.value,
                                                }))
                                            }
                                            placeholder="Sites, concorrentes ou estilos de referência"
                                            rows={2}
                                            className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>

                                    <label className="block w-full">
                                        <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Investimento previsto</span>

                                        <textarea
                                            value={formData.budget}
                                            onChange={(event) =>
                                                setFormData((current) => ({
                                                    ...current,
                                                    budget: event.target.value,
                                                }))
                                            }
                                            placeholder="Pode ser uma faixa aproximada"
                                            rows={2}
                                            className="theme-border w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400"
                                        />
                                    </label>
                                </div>

                                {feedback && <p className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-xs font-medium text-yellow-800">{feedback}</p>}

                                <div className="mt-2 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <button type="submit" disabled={isSubmitting} className="theme-cta-primary inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                                        <Send className="h-4 w-4" strokeWidth={2.2} />
                                        {isSubmitting ? "Enviando..." : "Enviar briefing"}
                                    </button>

                                    <Link to="/servicos" className="theme-link-accent inline-flex justify-center whitespace-nowrap text-center text-sm font-bold opacity-80 underline underline-offset-4 transition-opacity duration-300 hover:opacity-100">
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
