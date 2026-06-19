/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Code2, ExternalLink, FolderGit2, Layers, Palette, ShieldAlert, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────── */
/* DATA & TYPES                                                               */
/* ────────────────────────────────────────────────────────────────────────── */

export type Project = {
    slug: string;
    name: string;
    category: "Sistemas" | "Design" | "Mobile";
    description: string;
    stack: string[];
    icon: LucideIcon;
    liveUrl?: string;
    repoUrl?: string;
    imageUrl?: string;
};

export const projects: Project[] = [
    {
        slug: "busca-cores",
        name: "Busca Cores",
        category: "Design",
        description: "Plataforma minimalista para gerenciamento e exploração pública de paletas de cores, equipada com sistema rápido de curtidas.",
        stack: ["Angular", "Java", "Spring Boot", "Tailwind CSS"],
        icon: Palette,
        repoUrl: "https://github.com",
        liveUrl: "https://",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=80",
    },
    {
        slug: "medix",
        name: "Medix",
        category: "Sistemas",
        description: "Ecossistema de saúde voltado para suporte clínico e agendamento inteligente de consultas integrando microsserviços em nuvem.",
        stack: ["Angular", "Azure Services", "Oracle DB", "TypeScript"],
        icon: Stethoscope,
        liveUrl: "https://medix.limosin.com.br",
        imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=80",
    },
    {
        slug: "sigma-core",
        name: "Sigma Core",
        category: "Sistemas",
        description: "Plataforma de ensino voltada para a gestão de módulos pedagógicos estruturados e evolução de aprendizado de idiomas.",
        stack: ["React", "Node.js", "Supabase", "Tailwind CSS"],
        icon: Layers,
    },
];

const categories: ("Todos" | Project["category"])[] = ["Todos", "Sistemas", "Design", "Mobile"];

/* ────────────────────────────────────────────────────────────────────────── */
/* COMPONENTE DO CARD                                                         */
/* ────────────────────────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
    const Icon = project.icon;
    const hasAnyLink = project.liveUrl || project.repoUrl;

    return (
        <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-xl theme-surface theme-border">
            {/* TOPO CORTADO EM CLIP-PATH - RECORTE MAIOR (h-36) E SEM HOVER AMARELO */}
            <div className="relative h-36 w-full bg-zinc-950 overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)" }}>
                {project.imageUrl && (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover opacity-25 grayscale contrast-115 transition-all duration-700 ease-in-out group-hover:scale-102 group-hover:opacity-40 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                    </div>
                )}

                <div className="absolute inset-0 home-dot-grid opacity-10 pointer-events-none z-10" />

                {/* Ícone discreto e fixo no topo */}
                <div className="absolute bottom-5 left-6 rounded-xl bg-white/10 backdrop-blur-md p-2.5 text-zinc-300 border border-white/10 z-20">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
            </div>

            {/* CONTEÚDO (TEXTO SELECIONÁVEL) */}
            <div className="flex flex-1 flex-col p-5 pt-4 sm:p-6">
                <div>
                    <span className="type-chip bg-zinc-100 theme-text-muted rounded-md px-2.5 py-1 text-zinc-500">{project.category}</span>
                </div>

                <div className="mt-4 flex-1">
                    <h2 className="theme-text-primary type-card-title sm:text-xl">{project.name}</h2>
                    <p className="theme-text-secondary mt-2.5 text-sm leading-relaxed text-zinc-600">{project.description}</p>
                </div>

                {/* TECH STACK */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                        <span key={tech} className="text-[11px] font-semibold text-zinc-600 bg-zinc-50 border border-zinc-200/60 px-2 py-0.5 rounded-md">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* RODAPÉ MULTI-URL COM BOTÕES DE ALTO DESTAQUE */}
                <div className="mt-6 border-t theme-border border-zinc-100 pt-4 flex items-center">
                    {hasAnyLink ? (
                        <div className="type-button flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                            {/* Link de Produção - Botão Principal Preto */}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-zinc-950 text-white px-4 py-2.5 rounded-xl transition-all hover:bg-zinc-800 active:scale-[0.98] group/live shadow-xs">
                                    <span className="truncate">Acessar aplicação</span>
                                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" strokeWidth={2.2} />
                                </a>
                            )}

                            {/* Link do Repositório - Botão Secundário Estruturado */}
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-zinc-50 border border-zinc-200 text-zinc-700 px-4 py-2.5 rounded-xl transition-all hover:bg-zinc-100 hover:text-zinc-950 active:scale-[0.98] group/repo">
                                    <FolderGit2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                                    <span className="truncate">Ver código-fonte</span>
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 select-none">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            Código privado corporativo
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* COMPONENTE PRINCIPAL                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<string>("Todos");

    const filteredProjects = projects.filter((project) => activeCategory === "Todos" || project.category === activeCategory);

    return (
        <main className="theme-page relative flex min-h-[calc(100vh-72px)] w-full flex-col justify-start overflow-hidden bg-white">
            {/* BACKGROUND NO MESMO RESPIRO DA SERVICES */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 home-dot-grid opacity-70" />

                <div className="theme-support-soft absolute -right-32 top-16 h-72 w-72 rounded-full blur-[110px] opacity-40" />
                <div className="theme-accent-soft absolute -bottom-36 left-12 h-80 w-80 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* HEADER COM A MESMA ESCALA DA SERVICES, SEM ALTERAR FILTROS */}
            <section className="page-shell relative z-10 pt-10 sm:pt-16 lg:pt-16">
                <div className="flex w-full flex-col justify-start">
                    <h1 className="theme-text-primary page-title-display max-w-5xl lg:text-[clamp(4.6rem,5.6vw,5rem)]">
                        Portfólio de
                        <br />
                        Projetos.
                    </h1>

                    <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between sm:mt-7 sm:gap-6">
                        <p className="theme-text-secondary max-w-2xl text-base text-zinc-500 leading-relaxed sm:text-lg">Confira alguns projetos desenvolvidos pela Limosin. O catálogo engloba ferramentas internas, serviços em nuvem e aplicações criadas sob demanda.</p>

                        {/* FILTROS ORIGINAIS MANTIDOS */}
                        <div className="mobile-chip-row -mx-1 flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-zinc-200/60 bg-zinc-100 p-1.5 shadow-xs">
                            {categories.map((category) => (
                                <button key={category} onClick={() => setActiveCategory(category)} className="type-button cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 transition-all active:scale-95 text-zinc-600 hover:text-zinc-950 data-[active=true]:bg-zinc-950 data-[active=true]:text-white data-[active=true]:shadow-md" data-active={activeCategory === category}>
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* GRID DE PROJETOS COM ESPAÇAMENTO MAIS ALINHADO À SERVICES */}
            <section className="page-shell relative z-10 py-8 pb-20 sm:py-10 lg:py-12 lg:pb-24">
                {filteredProjects.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.slug} className="flex h-full w-full">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="theme-surface theme-border mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center sm:p-12">
                        <Code2 className="h-9 w-9 text-zinc-400 stroke-[1.5] mb-3" />
                        <h3 className="theme-text-primary text-sm font-bold text-zinc-800">Nenhum repositório nesta área</h3>
                        <p className="theme-text-muted mt-1 text-xs text-zinc-500 leading-relaxed">As aplicações desta categoria estão passando por homologação ou pertencem a escopos privados.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
