import type { AuditFields } from "./shared";

export type ProjectStatus = "DELIVERED" | "IN_PROGRESS" | "ON_HOLD" | "PLANNING";

export type Project = AuditFields & {
    clientEmail: string;
    clientName: string;
    id: string;
    name: string;
    sourceBriefingId: string | null;
    status: ProjectStatus;
    summary: string | null;
};

export type UpdateProjectStatusPayload = {
    name?: string;
    status: ProjectStatus;
    summary?: string;
};
