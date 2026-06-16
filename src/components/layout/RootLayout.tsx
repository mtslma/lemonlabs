// src/components/layout/RootLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Aquele header que fizemos antes

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            {/* A Navbar fica fixa em todas as páginas */}
            <Navbar />

            {/* O conteúdo dinâmico (Home, Sobre, etc) será injetado aqui */}
            <main>
                <Outlet />
            </main>

            {/* Se você tiver um Footer no futuro, ele entra aqui embaixo */}
        </div>
    );
}
