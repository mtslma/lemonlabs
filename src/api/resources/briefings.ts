import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { Briefing, CreateBriefingPayload, UpdateBriefingStatusPayload } from "../types/briefings";
import type { PaginatedResult, PaginationParams } from "../types/shared";

export async function createBriefing(payload: CreateBriefingPayload) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.create, {
        method: "POST",
        body: payload,
    });
}

export async function listBriefings(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<Briefing>>(apiConfig.endpoints.briefings.list, {
        token,
        query: params,
    });
}

export async function getBriefingById(token: string, id: string) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.byId(id), {
        token,
    });
}

export async function updateBriefingStatus(token: string, id: string, payload: UpdateBriefingStatusPayload) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.updateStatus(id), {
        method: "PATCH",
        token,
        body: payload,
    });
}
