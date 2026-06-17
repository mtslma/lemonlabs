import { apiConfig } from "../core/config";
import { apiRequestData } from "../core/client";
import type { AuthSession, AuthUser, LoginPayload, RefreshTokenPayload, RegisterPayload } from "../types/auth";

export async function login(payload: LoginPayload): Promise<AuthSession> {
    return apiRequestData<AuthSession>(apiConfig.endpoints.auth.login, {
        method: "POST",
        body: payload,
    });
}

export async function register(payload: RegisterPayload): Promise<AuthSession> {
    return apiRequestData<AuthSession>(apiConfig.endpoints.auth.register, {
        method: "POST",
        body: payload,
    });
}

export async function refreshSession(payload: RefreshTokenPayload): Promise<AuthSession> {
    return apiRequestData<AuthSession>(apiConfig.endpoints.auth.refresh, {
        method: "POST",
        body: payload,
    });
}

export async function logout(payload: RefreshTokenPayload) {
    return apiRequestData<{ ok?: boolean } | null>(apiConfig.endpoints.auth.logout, {
        method: "POST",
        body: payload,
    });
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
    return apiRequestData<AuthUser>(apiConfig.endpoints.users.me, {
        token,
    });
}
