import type { AuditFields } from "./shared";

export type QuoteRequestStatus = "ARCHIVED" | "CLOSED" | "CONTACTED" | "NEW" | "QUALIFIED";

export type QuoteRequest = AuditFields & {
    channel: string | null;
    contactName: string;
    email: string;
    id: string;
    solutionLabel: string;
    solutionSlug: string;
    source: string | null;
    status: QuoteRequestStatus;
};

export type CreateQuoteRequestPayload = {
    channel?: string;
    contactName: string;
    email: string;
    solutionLabel: string;
    solutionSlug: string;
    source?: string;
};
