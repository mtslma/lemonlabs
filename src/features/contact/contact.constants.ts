import type { ContactBriefingForm } from "./contact.types";

export const solutionLabels: Record<string, string> = {
    "presenca-digital": "Presença Digital",
    "captacao-de-clientes": "Captação de Clientes",
    "atendimento-automatizado": "Atendimento Automatizado",
    "comercial-completo": "Comercial Completo",
    "operacao-interna": "Operação Interna",
    "plataforma-completa": "Plataforma Completa",
};

export const briefingGuidelines = [
    "<strong>O objetivo principal:</strong> O que você busca resolver ou otimizar no momento.",
    "<strong>Prazos e urgência:</strong> Qual o seu cronograma ideal para o lançamento.",
    "<strong>Canais e escopo:</strong> Se haverá site, automação de WhatsApp ou sistemas.",
    "<strong>Expectativa de investimento:</strong> A faixa de orçamento estimada para o projeto.",
];

export const initialBriefingForm: ContactBriefingForm = {
    budget: "",
    companyName: "",
    contactName: "",
    deadline: "",
    email: "",
    objective: "",
    references: "",
    scope: "",
};
