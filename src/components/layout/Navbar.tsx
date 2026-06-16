import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
    // Tipagem explícita do estado como boolean
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // Tipagem do retorno da função
    const closeMenu = (): void => setIsMobileMenuOpen(false);

    // Tipagem das props injetadas pelo NavLink (isActive) e do retorno (string)
    const linkClasses = ({ isActive }: { isActive: boolean }): string => `transition-colors font-semibold text-[0.95rem] ${isActive ? "text-black" : "text-zinc-500 hover:text-zinc-900"}`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* --- LOGO --- */}
                <Link to="/" onClick={closeMenu}>
                    <Logo />
                </Link>

                {/* --- NAVEGAÇÃO DESKTOP --- */}
                <nav className="hidden md:flex gap-8">
                    <NavLink to="/servicos" className={linkClasses}>
                        Serviços
                    </NavLink>
                    <NavLink to="/experimentos" className={linkClasses}>
                        Experimentos
                    </NavLink>
                    <NavLink to="/sobre" className={linkClasses}>
                        Sobre
                    </NavLink>
                </nav>

                {/* --- CTA & MENU MOBILE TOGGLE --- */}
                <div className="flex items-center gap-4">
                    <Link to="/contato" className="hidden sm:flex items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md">
                        Começar Projeto
                    </Link>

                    <button className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Alternar menu" type="button">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- MENU MOBILE --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-zinc-200 bg-white px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full">
                    <NavLink to="/servicos" onClick={closeMenu} className={linkClasses}>
                        Serviços
                    </NavLink>
                    <NavLink to="/experimentos" onClick={closeMenu} className={linkClasses}>
                        Experimentos
                    </NavLink>
                    <NavLink to="/sobre" onClick={closeMenu} className={linkClasses}>
                        Sobre
                    </NavLink>

                    <Link to="/contato" onClick={closeMenu} className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95">
                        Começar Projeto
                    </Link>
                </div>
            )}
        </header>
    );
}
