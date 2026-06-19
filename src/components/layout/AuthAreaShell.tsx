import { LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

type AreaLink = {
    icon: LucideIcon;
    label: string;
    to: string;
};

type AuthAreaShellProps = {
    badge: string;
    title?: string;
    links: AreaLink[];
};

export default function AuthAreaShell({ badge, title, links }: AuthAreaShellProps) {
    const { logout, session } = useAuth();

    return (
        <main className="theme-page relative min-h-[calc(100vh-72px)] overflow-hidden bg-white">
            <div className="absolute inset-0 home-dot-grid opacity-70" />
            <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-35" />
            <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-25" />

            <section className="page-shell relative z-10 max-w-[92rem] pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-18 lg:pb-28">
                <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-14">
                    <aside className="lg:sticky lg:top-24">
                        <p className="theme-text-muted type-eyebrow">{badge}</p>
                        {title ? <h1 className="theme-text-primary type-panel-title mt-2 sm:mt-3 lg:text-[2.35rem]">{title}</h1> : null}

                        <div className="theme-surface theme-border mt-4 rounded-[1.75rem] border bg-white/80 p-4 shadow-xs sm:mt-6 sm:rounded-3xl sm:p-5">
                            <div className="flex items-start justify-between gap-4 sm:block">
                                <div className="min-w-0">
                                    <p className="theme-text-muted type-chip">Conta</p>
                                    <p className="theme-text-primary mt-2 truncate text-[0.98rem] font-semibold tracking-[-0.015em] sm:mt-3 sm:text-[1.02rem]">{session?.user.name}</p>
                                    <p className="theme-text-muted mt-1 max-w-[14rem] truncate text-xs sm:max-w-none sm:text-sm">{session?.user.email}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => void logout()}
                                    className="theme-border theme-text-secondary type-button inline-flex shrink-0 items-center gap-2 rounded-full border bg-white/92 px-3 py-2 transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white sm:hidden"
                                >
                                    <LogOut className="h-3.5 w-3.5" strokeWidth={2.2} />
                                    Sair
                                </button>
                            </div>

                            <p className="theme-text-secondary mt-3 text-xs leading-relaxed sm:mt-4">Seu histórico e atualizações ficam vinculados a este acesso.</p>
                        </div>

                        <nav className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mt-6 sm:flex-col sm:gap-1.5 sm:overflow-visible sm:px-0 sm:pb-0">
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === "/painel" || link.to === "/minha-area"}
                                    className={({ isActive }) =>
                                        `flex min-w-fit items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.92rem] font-medium tracking-[0.01em] whitespace-nowrap transition-colors sm:rounded-2xl sm:px-4 sm:py-3 ${
                                            isActive ? "bg-neutral-950 text-white" : "theme-border border bg-white/82 theme-text-secondary hover:bg-black/4 hover:theme-text-primary sm:border-transparent sm:bg-transparent"
                                        }`
                                    }
                                >
                                    <link.icon className="h-4 w-4" strokeWidth={2.2} />
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>

                        <button
                            type="button"
                            onClick={() => void logout()}
                            className="theme-border theme-text-secondary type-button mt-6 hidden items-center gap-2 rounded-full border bg-white/82 px-4 py-2.5 transition-all hover:-translate-y-0.5 hover:border-red-700 hover:bg-red-700 hover:text-white cursor-pointer sm:inline-flex"
                        >
                            <LogOut className="h-4 w-4" strokeWidth={2.2} />
                            Sair
                        </button>
                    </aside>

                    <Outlet />
                </div>
            </section>
        </main>
    );
}
