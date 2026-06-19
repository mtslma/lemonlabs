import { BriefcaseBusiness, ClipboardList, LayoutDashboard } from "lucide-react";
import AuthAreaShell from "./AuthAreaShell";

const clientLinks = [
    { icon: LayoutDashboard, label: "Resumo", to: "/minha-area" },
    { icon: ClipboardList, label: "Meus briefings", to: "/minha-area/briefings" },
    { icon: BriefcaseBusiness, label: "Meus projetos", to: "/minha-area/projetos" },
];

export default function ClientShell() {
    return <AuthAreaShell badge="Área do cliente" links={clientLinks} />;
}
