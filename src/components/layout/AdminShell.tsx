import { BriefcaseBusiness, LayoutDashboard, SquareStack } from "lucide-react";
import AuthAreaShell from "./AuthAreaShell";

const adminLinks = [
    { icon: LayoutDashboard, label: "Resumo", to: "/painel" },
    { icon: SquareStack, label: "Briefings", to: "/painel/briefings" },
    { icon: BriefcaseBusiness, label: "Projetos", to: "/painel/projetos" },
];

export default function AdminShell() {
    return <AuthAreaShell badge="Admin" title="Gestão de atendimento" links={adminLinks} />;
}
