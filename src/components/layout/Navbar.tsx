import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import Logo from "./Logo";

const navigationLinks = [
    { to: "/", label: "Início" },
    { to: "/servicos", label: "Serviços" },
    { to: "/portfolio", label: "Portfólio" },
    { to: "/contato", label: "Contato" },
    { to: "/sobre", label: "Sobre" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, userRole } = useAuth();
    const accountHref = userRole === "ADMIN" ? "/painel" : "/minha-area";
    const accountLabel = isAuthenticated ? "Minha área" : "Entrar";

    const closeMenu = () => setIsMobileMenuOpen(false);

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `cursor-pointer relative py-2 text-[0.92rem] font-medium tracking-[0.01em] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:transition-transform after:duration-300 ${
            isActive ? "theme-text-primary after:scale-x-100 after:bg-yellow-400" : "text-neutral-500 hover:text-neutral-900 after:scale-x-0 hover:after:scale-x-100 after:bg-yellow-400"
        }`;

    const mobileLinkClasses = ({ isActive }: { isActive: boolean }) => `cursor-pointer block w-full border-b border-neutral-200 py-4 text-lg font-medium tracking-[-0.01em] transition-colors ${isActive ? "text-yellow-500" : "text-neutral-900 hover:text-yellow-500"}`;

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/92 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                <div className="page-shell flex h-16 items-center justify-between sm:h-18">
                    <Link to="/" onClick={closeMenu} className="relative z-50 cursor-pointer">
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navigationLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={linkClasses}>
                                {link.label}
                            </NavLink>
                        ))}
                        <Link
                            to={isAuthenticated ? accountHref : "/entrar"}
                            className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[0.9rem] font-medium tracking-[0.01em] transition-all duration-300 ${
                                isAuthenticated
                                    ? "border border-neutral-300 bg-white text-neutral-900 shadow-[0_10px_24px_rgba(24,24,27,0.08)] hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                                    : "bg-neutral-950 text-white shadow-[0_10px_24px_rgba(24,24,27,0.12)] hover:bg-neutral-800"
                            }`}
                        >
                            {accountLabel}
                        </Link>
                    </nav>

                    <div className="flex items-center md:hidden">
                        <button className="cursor-pointer rounded-xl border border-neutral-200 bg-white/88 p-2 text-neutral-700 shadow-xs transition-colors duration-200 hover:border-yellow-400 hover:text-neutral-950" onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menu" type="button">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen ? <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-300 md:hidden" onClick={closeMenu} /> : null}

            <aside className={`fixed top-0 right-0 z-50 h-dvh w-[min(24rem,92vw)] border-l border-neutral-200 bg-white px-5 py-5 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="mb-6 flex w-full items-center justify-between border-b border-neutral-200 pb-4">
                    <Link to="/" onClick={closeMenu} className="cursor-pointer">
                        <Logo />
                    </Link>

                    <button className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-2 text-neutral-600 transition-colors hover:border-yellow-400 hover:text-neutral-950" onClick={closeMenu} aria-label="Fechar menu" type="button">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col">
                    {navigationLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} onClick={closeMenu} className={mobileLinkClasses}>
                            {link.label}
                        </NavLink>
                    ))}
                    <Link
                        to={isAuthenticated ? accountHref : "/entrar"}
                        onClick={closeMenu}
                        className={`mt-5 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-[0.92rem] font-medium tracking-[0.01em] transition-all ${
                            isAuthenticated
                                ? "border border-neutral-300 bg-white text-neutral-900 shadow-[0_10px_24px_rgba(24,24,27,0.08)] hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                                : "bg-neutral-950 text-white hover:bg-neutral-800"
                        }`}
                    >
                        {accountLabel}
                    </Link>
                </nav>
            </aside>
        </>
    );
}
