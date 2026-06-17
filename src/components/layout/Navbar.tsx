import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

/* Links de navegação unificados (Contato incluso na fila) */
const navigationLinks = [
    { to: "/", label: "Início" },
    { to: "/servicos", label: "Serviços" },
    { to: "/projetos", label: "Projetos" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const closeMenu = (): void => setIsMobileMenuOpen(false);

    /* Estilização dos links com efeito de linha expansível integrada */
    const linkClasses = ({ isActive }: { isActive: boolean }): string => {
        return `cursor-pointer relative py-2 text-[0.95rem] font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:transition-transform after:duration-300 ${
            isActive ? "theme-text-primary after:scale-x-100 after:bg-accent-strong" : "text-neutral-500 dark:text-neutral-400 hover:theme-text-primary after:scale-x-0 hover:after:scale-x-100 after:bg-accent-strong"
        }`;
    };

    return (
        <header className="theme-surface theme-border sticky top-0 z-50 w-full border-b">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo com link para a Home */}
                <Link to="/" onClick={closeMenu} className="cursor-pointer">
                    <Logo />
                </Link>

                {/* Navegação Desktop */}
                <nav className="hidden gap-8 md:flex">
                    {navigationLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={linkClasses}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Menu Mobile Trigger */}
                <div className="flex items-center md:hidden">
                    <button className="cursor-pointer theme-text-muted hover:theme-text-primary p-2 transition-colors duration-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Alternar menu" type="button">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Gaveta de Navegação Mobile */}
            {isMobileMenuOpen && (
                <div className="theme-surface theme-border absolute flex w-full flex-col gap-4 border-t px-6 py-5 shadow-lg md:hidden">
                    {navigationLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} onClick={closeMenu} className={linkClasses}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}
