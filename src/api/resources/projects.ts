import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { Project, UpdateProjectStatusPayload } from "../types/projects";
import type { PaginatedResult, PaginationParams } from "../types/shared";

export async function listProjects(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<Project>>(apiConfig.endpoints.projects.list, {
        token,
        query: params,
    });
}

export async function listMyProjects(token: string, params: PaginationParams = {}) {
    return apiRequestData<PaginatedResult<Project>>(apiConfig.endpoints.projects.mine, {
        token,
        query: params,
    });
}

export async function getMyProjectById(token: string, id: string) {
    return apiRequestData<Project>(apiConfig.endpoints.projects.mineById(id), {
        token,
    });
}

export async function updateProjectStatus(token: string, id: string, payload: UpdateProjectStatusPayload) {
    return apiRequestData<Project>(apiConfig.endpoints.projects.updateStatus(id), {
        method: "PATCH",
        token,
        body: payload,
    });
}
