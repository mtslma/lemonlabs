import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { CreateQuoteRequestPayload, QuoteRequest } from "../types/quote-requests";

export async function createQuoteRequest(payload: CreateQuoteRequestPayload) {
    return apiRequestData<QuoteRequest>(apiConfig.endpoints.quoteRequests.create, {
        method: "POST",
        body: payload,
    });
}
