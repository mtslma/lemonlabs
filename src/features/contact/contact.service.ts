import { createBriefing } from "../../api/resources/briefings";
import type { CreateBriefingPayload } from "../../api/types/briefings";
import { siteConfig } from "../../config/site";
import type { ContactBriefingForm } from "./contact.types";

type SubmitBriefingInput = {
    formData: ContactBriefingForm;
    solutionLabel?: string;
    solutionSlug?: string;
};

export function buildWhatsappUrl(solutionLabel?: string) {
    const whatsappText = solutionLabel ? `Olá! Gostaria de um orçamento para a solução de ${solutionLabel}.` : "Olá! Gostaria de alinhar um orçamento para um projeto com vocês.";
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
}

export async function submitBriefing({ formData, solutionLabel, solutionSlug }: SubmitBriefingInput) {
    const payload: CreateBriefingPayload = {
        ...formData,
        solutionLabel: solutionLabel || "Contato geral",
        solutionSlug: solutionSlug || "contato-geral",
        source: "site-briefing-form",
    };

    return createBriefing(payload);
}
