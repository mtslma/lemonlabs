import type { AuditFields } from "./shared";

export type AdminNote = AuditFields & {
    id: string;
    name: string;
};

export type CreateAdminNotePayload = {
    active?: boolean;
    name: string;
};

export type UpdateAdminNotePayload = Partial<CreateAdminNotePayload>;
