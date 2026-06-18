import { LayoutDashboard, LogOut, ShieldCheck, SquareStack, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

const adminLinks = [
    { icon: LayoutDashboard, label: "Visão geral", to: "/painel" },
    { icon: SquareStack, label: "Briefings", to: "/painel/briefings" },
    { icon: UserRound, label: "Oportunidades", to: "/painel/oportunidades" },
];

export default function AdminShell() {
    const { logout, session } = useAuth();

    return (
        <main className="theme-page relative min-h-[calc(100vh-72px)] overflow-hidden">
            <div className="absolute inset-0 home-dot-grid opacity-20" />
            <div className="theme-accent-soft absolute right-0 top-12 h-28 w-28 rounded-full blur-[70px] opacity-10" />

            <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-0">
                <div className="grid gap-6 pt-20 sm:pt-24 lg:grid-cols-[280px_1fr] lg:pt-28">
                    <aside className="theme-surface theme-border h-fit rounded-4xl border p-5 shadow-[0_20px_44px_rgba(24,24,27,0.08)]">
                        <div className="rounded-[1.6rem] bg-neutral-950 px-4 py-5 text-white">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-yellow-400/12 p-2.5 text-yellow-300">
                                    <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
                                </div>
                                <div>
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-yellow-200/70">Admin</p>
                                    <h1 className="text-lg font-black tracking-tight">Limosin Panel</h1>
                                </div>
                            </div>
                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm font-semibold">{session?.user.name}</p>
                                <p className="mt-1 text-xs text-white/65">{session?.user.email}</p>
                                <p className="mt-3 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-yellow-200">{session?.user.role}</p>
                            </div>
                        </div>

                        <nav className="mt-5 flex flex-col gap-2">
                            {adminLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === "/painel"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                                            isActive ? "bg-yellow-400 text-neutral-950" : "theme-text-secondary hover:bg-black/4 hover:theme-text-primary"
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
                            className="theme-border theme-text-secondary mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-colors hover:bg-neutral-950 hover:text-white"
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
