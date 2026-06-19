const DEFAULT_API_URL = "http://localhost:3333";

export const apiConfig = {
    baseUrl: (import.meta.env.VITE_API_URL as string | undefined)?.trim() || DEFAULT_API_URL,
    endpoints: {
        auth: {
            login: "/auth/login",
            logout: "/auth/logout",
            refresh: "/auth/refresh",
            register: "/auth/register",
        },
        users: {
            me: "/users/me",
        },
        briefings: {
            byId: (id: string) => `/briefings/${id}`,
            create: "/briefings",
            list: "/briefings",
            mine: "/briefings/me",
            mineById: (id: string) => `/briefings/me/${id}`,
            promote: (id: string) => `/projects/from-briefing/${id}`,
            updateStatus: (id: string) => `/briefings/${id}/status`,
        },
        projects: {
            list: "/projects",
            mine: "/projects/me",
            mineById: (id: string) => `/projects/me/${id}`,
            updateStatus: (id: string) => `/projects/${id}/status`,
        },
        quoteRequests: {
            create: "/quote-requests",
        },
    },
};
