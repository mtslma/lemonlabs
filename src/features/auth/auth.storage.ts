import type { AuthSession } from "./auth.types";

const AUTH_STORAGE_KEY = "lemonlabs.auth.session";

export function readStoredSession(): AuthSession | null {
    if (typeof window === "undefined") {
        return null;
    }

    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue) as AuthSession;
    } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
}

export function writeStoredSession(session: AuthSession | null) {
    if (typeof window === "undefined") {
        return;
    }

    if (!session) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}
