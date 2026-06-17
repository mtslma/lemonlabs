import { Bot, ChartColumn, CreditCard, Globe, HardDriveUpload, Layers3, MessageSquare, MonitorCog, Network, Sparkles } from "lucide-react";

export type Plan = {
    slug: string;
    name: string;
    audience: string;
    summary: string;
    timeline: string;
    icon: typeof Globe;
    featured?: boolean;
    includes: string[];
};

export type IntegrationGroup = {
    title: string;
    icon: typeof Network;
    items: string[];
};

export const plans: Plan[] = [
    {
        slug: "presenca-digital",
        name: "Presença Digital",
        audience: "Sites para marcar presença e gerar confiança.",
        summary: "Base enxuta para apresentar seu negócio e facilitar o contato.",
        timeline: "5 a 15 dias úteis",
        icon: Globe,
        includes: ["Landing page ou site institucional", "Domínio, hospedagem e SSL inclusos", "Formulário de contato e botão de WhatsApp", "Analytics básico e monitoramento", "Suporte por WhatsApp e e-mail"],
    },
    {
        slug: "captacao-de-clientes",
        name: "Captação de Clientes",
        audience: "Páginas para captar e organizar oportunidades.",
        summary: "Estrutura focada em conversão para gerar e qualificar leads.",
        timeline: "10 a 25 dias úteis",
        icon: ChartColumn,
        includes: ["Landing page ou portal focado em conversão", "Formulários integrados com alertas por e-mail", "Painel administrativo para gestão de leads", "Analytics avançado de origens e conversões", "Rotinas automáticas de backup e segurança"],
    },
    {
        slug: "comercial-completo",
        name: "Comercial Completo",
        audience: "Captação, atendimento e acompanhamento em um fluxo só.",
        summary: "Junta página, automação e painel comercial na mesma jornada.",
        timeline: "15 a 30 dias úteis",
        icon: Layers3,
        featured: true,
        includes: ["Portal web ou landing page comercial", "Automação de WhatsApp e gestão de leads", "Painel administrativo com alertas integrados", "Monitoramento completo do funil", "Hospedagem, segurança e backups inclusos"],
    },
    {
        slug: "atendimento-automatizado",
        name: "Atendimento Automatizado",
        audience: "Fluxos para atender melhor no WhatsApp.",
        summary: "Automação para responder mais rápido e encaminhar melhor.",
        timeline: "5 a 20 dias úteis",
        icon: Bot,
        includes: ["Bot de WhatsApp com fluxos personalizados", "Triagem automática de solicitações", "Encaminhamento para atendimento humano", "Ajustes de mensagens e monitoramento ativo", "Validação contínua das integrações"],
    },
    {
        slug: "operacao-interna",
        name: "Operação Interna",
        audience: "Sistemas para organizar processos e reduzir retrabalho.",
        summary: "Ferramentas sob medida para controle, rotina e operação.",
        timeline: "15 a 60 dias úteis",
        icon: MonitorCog,
        includes: ["Sistema ou aplicativo com banco de dados próprio", "Painel de controle com permissões de acesso", "Segurança local e backups automatizados", "Manutenção corretiva e suporte remoto", "Arquitetura escalável para novas funções"],
    },
    {
        slug: "plataforma-completa",
        name: "Plataforma Completa",
        audience: "Ecossistema único para atendimento, operação e gestão.",
        summary: "Centralização total de canais, sistemas e dados comerciais.",
        timeline: "Sob consulta",
        icon: Sparkles,
        includes: ["Portal institucional, sistema web e dashboards", "Desenvolvimento de API e banco relacional", "Integração total de bots e ferramentas terceiras", "Infraestrutura dedicada com suporte prioritário", "Planejamento de arquitetura de alta performance"],
    },
];

export const integrationGroups: IntegrationGroup[] = [
    { title: "Comunicação", icon: MessageSquare, items: ["WhatsApp", "E-mail corporativo"] },
    { title: "Pagamentos", icon: CreditCard, items: ["Links de pagamento", "Checkout transparente", "Status de transações"] },
    { title: "Analytics", icon: ChartColumn, items: ["Monitoramento de acessos", "Rastreamento de conversões", "Eventos customizados"] },
    { title: "Arquivos", icon: HardDriveUpload, items: ["Upload seguro", "Processamento de imagens", "Armazenamento em nuvem"] },
    { title: "Inteligência Artificial", icon: Bot, items: ["Atendimento conversacional", "Triagem de chamados", "Resumos automatizados"] },
];

export const maintenanceIncludes = [
    "<strong>Hospedagem dedicada</strong> dos sistemas e servidores contratados.",
    "<strong>Certificado SSL</strong> com emissão e renovação automática.",
    "<strong>Monitoramento ativo</strong> e correção imediata de erros críticos.",
    "<strong>Backups automáticos</strong> diários armazenados em nuvem segura.",
    "<strong>Ajustes pontuais</strong> de textos, imagens e pequenos conteúdos.",
    "<strong>Manutenção contínua</strong> de todas as integrações nativas ativas.",
];

export const maintenanceExcludes = [
    "<strong>Novas funções</strong> ou regras de negócio inéditas no escopo.",
    "<strong>Módulos adicionais</strong> ou novos painéis administrativos.",
    "<strong>Páginas extras</strong> criadas após a homologação do projeto.",
    "<strong>Novas integrações</strong> com plataformas de terceiros no futuro.",
    "<strong>Reformulação estética</strong>, redesign ou alteração de identidade visual.",
];

export const supportItems = [
    "<strong>Segunda a sexta:</strong> Atendimento regular das 09h às 18h.",
    "<strong>Sábado e domingo:</strong> Plantão para emergências das 10h às 17h.",
    "<strong>Incidentes críticos:</strong> Resposta e início do plano de ação em até 24h.",
    "<strong>Dúvidas e ajustes:</strong> Retorno e resolução de chamados em até 2 dias úteis.",
    "<strong>Canais oficiais:</strong> Acesso direto via WhatsApp, e-mail e chamados.",
];
