import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiError } from "../api/core/client";
import { useAuth } from "../features/auth/useAuth";

type AuthMode = "login" | "register";

function getDashboardRoute(role: "ADMIN" | "USER") {
    return role === "ADMIN" ? "/painel" : "/minha-area";
}

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [mode, setMode] = useState<AuthMode>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            if (mode === "register") {
                const nextSession = await register({ name, email, password });
                navigate(getDashboardRoute(nextSession.user.role), { replace: true });
                return;
            }

            const nextSession = await login({ email, password });
            const redirectTo = (location.state as { redirectTo?: string; role?: "ADMIN" | "USER" } | null)?.redirectTo;
            navigate(redirectTo ?? getDashboardRoute(nextSession.user.role), { replace: true });
        } catch (error) {
            setErrorMessage(error instanceof ApiError ? error.message : mode === "register" ? "Não foi possível criar sua conta agora." : "Não foi possível entrar agora.");
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

            <section className="page-shell relative z-10 py-10 sm:py-16 lg:py-0">
                <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                    <div className="flex w-full flex-col justify-start pt-6 sm:pt-16 lg:col-span-6 lg:sticky lg:top-0 lg:pt-28">
                        <div className="mb-5 flex items-center gap-3 sm:mb-7 lg:mb-8">
                            <div className="theme-accent-fill h-2 w-2 shrink-0 rounded-full" />
                            <span className="theme-text-muted type-eyebrow">acesso e acompanhamento</span>
                        </div>

                        <h1 className="theme-text-primary page-title-display max-w-[11ch] sm:max-w-none lg:text-[clamp(4.6rem,5.6vw,5rem)]">
                            Entre ou crie
                            <br />
                            sua conta para
                            <br />
                            acompanhar.
                        </h1>

                        <p className="text-justify theme-text-secondary mt-7 text-base font-medium leading-relaxed sm:text-lg max-w-xl">
                            Clientes podem acompanhar briefings e retornos da equipe usando o mesmo e-mail informado no formulário de contato. O acesso administrativo continua separado.
                        </p>
                    </div>

                    <div className="w-full pb-8 sm:pb-16 lg:col-span-5 lg:col-start-8 lg:pb-0 lg:pt-28">
                        <form onSubmit={handleSubmit} className="theme-surface theme-border grid w-full gap-4 rounded-3xl border p-5 shadow-md sm:p-8">
                            <div className="mb-2">
                                <div className="inline-flex rounded-full bg-neutral-100 p-1">
                                    <button type="button" onClick={() => setMode("login")} className={`type-button rounded-full px-4 py-2 transition-colors ${mode === "login" ? "bg-neutral-950 text-white" : "text-neutral-600"}`}>
                                        Entrar
                                    </button>
                                    <button type="button" onClick={() => setMode("register")} className={`type-button rounded-full px-4 py-2 transition-colors ${mode === "register" ? "bg-neutral-950 text-white" : "text-neutral-600"}`}>
                                        Criar conta
                                    </button>
                                </div>

                                <h2 className="theme-text-primary type-section-title mt-4">{mode === "login" ? "Acesso à sua área" : "Cadastro rápido"}</h2>
                                <p className="theme-text-secondary mt-2 text-sm leading-relaxed">
                                    {mode === "login"
                                        ? "Use suas credenciais para abrir sua área de acompanhamento."
                                        : "Crie sua conta com o mesmo e-mail usado no briefing para vincular seus envios."}
                                </p>
                            </div>

                            {mode === "register" ? (
                                <label className="block w-full">
                                    <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Nome</span>
                                    <input value={name} onChange={(event) => setName(event.target.value)} required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" placeholder="Seu nome" />
                                </label>
                            ) : null}

                            <label className="block w-full">
                                <span className="theme-text-primary mb-1.5 block text-xs font-semibold">E-mail</span>
                                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" placeholder="seuemail@empresa.com" />
                            </label>

                            <label className="block w-full">
                                <span className="theme-text-primary mb-1.5 block text-xs font-semibold">Senha</span>
                                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="theme-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-yellow-400" placeholder="Digite sua senha" />
                            </label>

                            {errorMessage ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">{errorMessage}</p> : null}

                            <button type="submit" disabled={isSubmitting} className="cursor-pointer theme-cta-primary type-button mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 transition-transform duration-500 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                                {isSubmitting ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
