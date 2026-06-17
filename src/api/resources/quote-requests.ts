import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { CreateQuoteRequestPayload, QuoteRequest, UpdateQuoteRequestStatusPayload } from "../types/quote-requests";
import type { PaginatedResult, PaginationParams } from "../types/shared";

export async function createQuoteRequest(payload: CreateQuoteRequestPayload) {
    return apiRequestData<QuoteRequest>(apiConfig.endpoints.quoteRequests.create, {
        method: "POST",
        body: payload,
    });
}

export async function listQuoteRequests(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<QuoteRequest>>(apiConfig.endpoints.quoteRequests.list, {
        token,
        query: params,
    });
}

export async function getQuoteRequestById(token: string, id: string) {
    return apiRequestData<QuoteRequest>(apiConfig.endpoints.quoteRequests.byId(id), {
        token,
    });
}

export async function updateQuoteRequestStatus(token: string, id: string, payload: UpdateQuoteRequestStatusPayload) {
    return apiRequestData<QuoteRequest>(apiConfig.endpoints.quoteRequests.updateStatus(id), {
        method: "PATCH",
        token,
        body: payload,
    });
}
