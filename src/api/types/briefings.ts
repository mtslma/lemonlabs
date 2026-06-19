import type { AuditFields } from "./shared";

export type BriefingStatus = "ARCHIVED" | "CLOSED" | "CONTACTED" | "IN_REVIEW" | "NEW" | "PROPOSAL_SENT";

export type Briefing = AuditFields & {
    budget: string | null;
    clientFeedback: string | null;
    companyName: string | null;
    contactName: string;
    email: string;
    id: string;
    objective: string;
    projectId: string | null;
    projectPromotedAt: string | null;
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
    scope?: string;
    solutionLabel: string;
    solutionSlug: string;
    source?: string;
};

export type UpdateBriefingPayload = {
    clientFeedback?: string;
    status?: BriefingStatus;
};

export type PromoteBriefingPayload = {
    name?: string;
    summary?: string;
};

export type PromoteBriefingResult = {
    briefing: Briefing;
    project: {
        id: string;
        name: string;
        status: string;
    };
};
