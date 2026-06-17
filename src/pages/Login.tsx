import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiError } from "../api/core/client";
import { useAuth } from "../features/auth/useAuth";

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await login({ email, password });
            const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo ?? "/painel";
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setErrorMessage(error instanceof ApiError ? error.message : "Não foi possível entrar agora.");
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
            {/* GRID CONTAINER (ESPELHADO DA HOME E CONTATO)                               */}
            {/* ────────────────────────────────────────────────────────────────────────── */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-0">
                {/* items-start impede flutuações e oscilações entre conteúdos de alturas diferentes */}
                <div className="grid grid-cols-1 items-start gap-14 min-h-[calc(100vh-72px)] lg:grid-cols-12 lg:gap-8">
                    {/* LADO ESQUERDO - TEXTO INSTITUCIONAL (NIVELADO NO TOPO) */}
                    <div className="flex flex-col justify-start w-full pt-12 sm:pt-16 lg:col-span-6 lg:sticky lg:top-0 lg:pt-28">
                        <div className="mb-5 flex items-center gap-3 sm:mb-7 lg:mb-8">
                            <div className="theme-accent-fill h-2 w-2 shrink-0 rounded-full" />
                            <span className="theme-text-muted font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:text-xs">acesso interno</span>
                        </div>

                        <h1 className="theme-text-primary max-w-[11ch] text-[clamp(3.05rem,13vw,5rem)] font-black leading-[1.03] tracking-tight sm:max-w-none sm:text-[clamp(4rem,9vw,5.6rem)] lg:text-[clamp(4.6rem,5.6vw,5rem)]">
                            Gestão comercial
                            <br />
                            com visão
                            <br />
                            <span className="hero-title-mark inline-block whitespace-nowrap">em tempo real.</span>
                        </h1>

                        <p className="text-justify theme-text-secondary mt-7 text-base font-medium leading-relaxed sm:text-lg max-w-xl">Acesse o painel para acompanhar briefings, oportunidades e o andamento dos contatos captados pelo site.</p>
                    </div>

                    {/* LADO DIREITO - FORMULÁRIO DE LOGIN (NIVELADO NO TOPO COOPUANDO LARGURA TOTAL) */}
                    <div className="w-full pb-12 sm:pb-16 lg:col-span-5 lg:col-start-8 lg:pb-0 lg:pt-28">
                        <form onSubmit={handleSubmit} className="theme-surface theme-border grid w-full gap-4 rounded-3xl border p-6 shadow-md sm:p-8">
                            <div className="mb-2">
                                <p className="theme-text-muted text-[10px] font-bold uppercase tracking-wider text-yellow-600">Entrar</p>
                                <h2 className="theme-text-primary mt-1.5 text-2xl font-black tracking-tight">Acesso ao painel</h2>
                                <p className="theme-text-secondary mt-2 text-sm leading-relaxed">Use suas credenciais para abrir a área de acompanhamento da operação.</p>
                            </div>

                            <label className="block w-full">
                                <span className="theme-text-primary mb-1.5 block text-xs font-semibold">E-mail</span>
                                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" placeholder="seuemail@empresa.com" />
                            </label>

                            <label className="block w-full">
                                <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Senha</span>
                                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" placeholder="Digite sua senha de acesso" />
                            </label>

                            {errorMessage && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">{errorMessage}</p>}

                            <button type="submit" disabled={isSubmitting} className="cursor-pointer theme-cta-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-transform duration-500 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 mt-2">
                                {isSubmitting ? "Entrando..." : "Entrar no painel"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
