import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { Briefing, CreateBriefingPayload, PromoteBriefingPayload, PromoteBriefingResult, UpdateBriefingPayload } from "../types/briefings";
import type { PaginatedResult, PaginationParams } from "../types/shared";

export async function createBriefing(payload: CreateBriefingPayload, token?: string) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.create, {
        method: "POST",
        token,
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

export async function listMyBriefings(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<Briefing>>(apiConfig.endpoints.briefings.mine, {
        token,
        query: params,
    });
}

export async function getMyBriefingById(token: string, id: string) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.mineById(id), {
        token,
    });
}

export async function updateBriefing(token: string, id: string, payload: UpdateBriefingPayload) {
    return apiRequestData<Briefing>(apiConfig.endpoints.briefings.updateStatus(id), {
        method: "PATCH",
        token,
        body: payload,
    });
}

export async function promoteBriefing(token: string, id: string, payload: PromoteBriefingPayload = {}) {
    return apiRequestData<PromoteBriefingResult>(apiConfig.endpoints.briefings.promote(id), {
        method: "POST",
        token,
        body: payload,
    });
}
