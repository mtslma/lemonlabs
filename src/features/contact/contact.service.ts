import { createBriefing } from "../../api/resources/briefings";
import type { CreateBriefingPayload } from "../../api/types/briefings";
import { siteConfig } from "../../config/site";
import type { ContactBriefingForm } from "./contact.types";

type SubmitBriefingInput = {
    formData: ContactBriefingForm;
    solutionLabel?: string;
    solutionSlug?: string;
    token: string;
};

export function buildWhatsappUrl(solutionLabel?: string) {
    const whatsappText = solutionLabel ? `Olá! Gostaria de um orçamento para a solução de ${solutionLabel}.` : "Olá! Gostaria de alinhar um orçamento para um projeto com vocês.";
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
}

export async function submitBriefing({ formData, solutionLabel, solutionSlug, token }: SubmitBriefingInput) {
    const scopeValue = formData.scope.join(", ").trim();
    const companyName = formData.companyName.trim();
    const budget = formData.budget.trim();
    const references = formData.references.trim();
    const deadline = formData.deadline.trim();
    const objective = formData.objective.trim();

    const payload: CreateBriefingPayload = {
        contactName: formData.contactName,
        ...(budget ? { budget } : {}),
        ...(companyName ? { companyName } : {}),
        deadline,
        email: formData.email,
        objective,
        ...(references ? { references } : {}),
        ...(scopeValue ? { scope: scopeValue } : {}),
        solutionLabel: solutionLabel || "Contato geral",
        solutionSlug: solutionSlug || "contato-geral",
        source: "site-briefing-form",
    };

    return createBriefing(payload, token);
}
