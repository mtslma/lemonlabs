// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="relative min-h-[calc(100vh-72px)] bg-zinc-50 flex items-center selection:bg-yellow-400 selection:text-black">
            {/* --- LINHAS ESTRUTURAIS (Grid minimalista de fundo) --- */}
            <div className="absolute inset-0 pointer-events-none border-x border-zinc-200/50 max-w-7xl mx-auto w-full" />

            <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
                    {/* --- ESQUERDA: Título Massivo e Limpo --- */}
                    <div className="lg:col-span-7 flex flex-col justify-end">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[1.05] tracking-tight text-zinc-950">
                            A solução digital
                            <br />
                            que você
                            <br />
                            {/* 
                              CORREÇÃO DA SELEÇÃO:
                              1. 'z-0' cria uma barreira para os z-indexes internos.
                              2. 'whitespace-nowrap' impede quebra de linha estranha.
                              3. O '-z-10' e 'pointer-events-none' garantem que a tarja amarela 
                                 fique atrás do texto e seja "invisível" para o mouse.
                            */}
                            <span className="relative inline-block mt-2 z-0 whitespace-nowrap">
                                precisa.
                                <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-4 sm:h-5 bg-yellow-400 -z-10 transform -skew-x-12 pointer-events-none" />
                            </span>
                        </h1>
                    </div>

                    {/* --- DIREITA: Informação estruturada --- */}
                    <div className="lg:col-span-5 flex flex-col lg:pl-12 border-t border-zinc-200 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pb-3">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-yellow-400" />
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">LemonLabs Studio</span>
                        </div>

                        <p className="text-lg leading-relaxed text-zinc-600 mb-10 max-w-md">Soluções customizadas de alta performance. Do design refinado à arquitetura escalável, entregamos tecnologia que resolve os problemas reais do seu dia a dia.</p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Link to="/contato" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-8 py-3.5 font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg">
                                <span className="relative z-10 flex items-center gap-2">
                                    Iniciar Projeto
                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>

                            <Link to="/experimentos" className="text-sm font-bold text-zinc-400 transition-colors hover:text-zinc-950 underline underline-offset-4">
                                Explorar soluções
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
