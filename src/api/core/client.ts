import { apiConfig } from "./config";
import type { ApiSuccessResponse } from "../types/shared";

type RequestOptions = {
    body?: unknown;
    headers?: HeadersInit;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    query?: Record<string, string | number | boolean | null | undefined>;
    token?: string | null;
};

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

function buildUrl(path: string, query?: RequestOptions["query"]) {
    const url = new URL(`${apiConfig.baseUrl}${path}`);

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value === undefined || value === null || value === "") {
                continue;
            }

            url.searchParams.set(key, String(value));
        }
    }

    return url.toString();
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetch(buildUrl(path, options.query), {
        method: options.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
        const message = typeof payload === "object" && payload && "message" in payload ? String(payload.message) : "Não foi possível concluir a requisição.";
        throw new ApiError(message, response.status);
    }

    return payload as T;
}

export async function apiRequestData<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await apiRequest<ApiSuccessResponse<T>>(path, options);
    return response.data;
}
