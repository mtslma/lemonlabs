import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { AdminNote, CreateAdminNotePayload, UpdateAdminNotePayload } from "../types/admin-notes";
import type { PaginatedResult, PaginationParams } from "../types/shared";

export async function listAdminNotes(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<AdminNote>>(apiConfig.endpoints.adminNotes.list, {
        token,
        query: params,
    });
}

export async function createAdminNote(token: string, payload: CreateAdminNotePayload) {
    return apiRequestData<AdminNote>(apiConfig.endpoints.adminNotes.create, {
        method: "POST",
        token,
        body: payload,
    });
}

export async function getAdminNoteById(token: string, id: string) {
    return apiRequestData<AdminNote>(apiConfig.endpoints.adminNotes.byId(id), {
        token,
    });
}

export async function updateAdminNote(token: string, id: string, payload: UpdateAdminNotePayload) {
    return apiRequestData<AdminNote>(apiConfig.endpoints.adminNotes.byId(id), {
        method: "PUT",
        token,
        body: payload,
    });
}

export async function deleteAdminNote(token: string, id: string) {
    return apiRequestData<AdminNote>(apiConfig.endpoints.adminNotes.byId(id), {
        method: "DELETE",
        token,
    });
}

export async function restoreAdminNote(token: string, id: string) {
    return apiRequestData<AdminNote>(`${apiConfig.endpoints.adminNotes.byId(id)}/restore`, {
        method: "PATCH",
        token,
    });
}
