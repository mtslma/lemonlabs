import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const navigationLinks = [
    { to: "/servicos", label: "Serviços" },
    { to: "/projetos", label: "Projetos" },
    { to: "/sobre", label: "Sobre" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const closeMenu = (): void => setIsMobileMenuOpen(false);

    const linkClasses = ({ isActive }: { isActive: boolean }): string =>
        `transition-colors font-semibold text-[0.95rem] ${isActive ? "text-black" : "text-zinc-500 hover:text-zinc-900"}`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link to="/" onClick={closeMenu}>
                    <Logo />
                </Link>

                <nav className="hidden gap-8 md:flex">
                    {navigationLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={linkClasses}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/contato" className="hidden items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 sm:flex">
                        Começar Projeto
                    </Link>

                    <button className="p-2 text-zinc-600 transition-colors hover:text-zinc-900 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Alternar menu" type="button">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute flex w-full flex-col gap-4 border-t border-zinc-200 bg-white px-6 py-4 shadow-lg md:hidden">
                    {navigationLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} onClick={closeMenu} className={linkClasses}>
                            {link.label}
                        </NavLink>
                    ))}

                    <Link to="/contato" onClick={closeMenu} className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95">
                        Começar Projeto
                    </Link>
                </div>
            )}
        </header>
    );
}
