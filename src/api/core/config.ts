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
            updateStatus: (id: string) => `/briefings/${id}/status`,
        },
        quoteRequests: {
            byId: (id: string) => `/quote-requests/${id}`,
            create: "/quote-requests",
            list: "/quote-requests",
            updateStatus: (id: string) => `/quote-requests/${id}/status`,
        },
        adminNotes: {
            byId: (id: string) => `/admin-notes/${id}`,
            create: "/admin-notes",
            list: "/admin-notes",
        },
    },
};
