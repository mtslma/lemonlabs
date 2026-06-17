import type { AuditFields } from "./shared";

export type BriefingStatus = "ARCHIVED" | "CLOSED" | "CONTACTED" | "IN_REVIEW" | "NEW" | "PROPOSAL_SENT";

export type Briefing = AuditFields & {
    budget: string | null;
    companyName: string | null;
    contactName: string;
    email: string;
    id: string;
    objective: string;
    references: string | null;
    scope: string;
    solutionLabel: string;
    solutionSlug: string;
    source: string | null;
    status: BriefingStatus;
    deadline: string | null;
};

export type CreateBriefingPayload = {
    budget?: string;
    companyName?: string;
    contactName: string;
    deadline?: string;
    email: string;
    objective: string;
    references?: string | string[];
    scope: string;
    solutionLabel: string;
    solutionSlug: string;
    source?: string;
};

export type UpdateBriefingStatusPayload = {
    status: BriefingStatus;
};
