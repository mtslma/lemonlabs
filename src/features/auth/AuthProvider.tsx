import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fetchCurrentUser, login as loginRequest, logout as logoutRequest, refreshSession } from "./auth.service";
import { readStoredSession, writeStoredSession } from "./auth.storage";
import type { AuthSession, LoginPayload, UserRole } from "./auth.types";

type AuthContextValue = {
    isAuthenticated: boolean;
    isBootstrapping: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    session: AuthSession | null;
    userRole: UserRole | null;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<AuthSession | null>(() => readStoredSession());
    const [isBootstrapping, setIsBootstrapping] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function bootstrapSession() {
            const storedSession = readStoredSession();

            if (!storedSession) {
                if (isMounted) {
                    setIsBootstrapping(false);
                }
                return;
            }

            try {
                const user = await fetchCurrentUser(storedSession.accessToken);

                if (isMounted) {
                    const hydratedSession = { ...storedSession, user };
                    setSession(hydratedSession);
                    writeStoredSession(hydratedSession);
                }
            } catch {
                try {
                    const nextSession = await refreshSession({ refreshToken: storedSession.refreshToken });

                    if (isMounted) {
                        setSession(nextSession);
                        writeStoredSession(nextSession);
                    }
                } catch {
                    if (isMounted) {
                        setSession(null);
                        writeStoredSession(null);
                    }
                }
            } finally {
                if (isMounted) {
                    setIsBootstrapping(false);
                }
            }
        }

        void bootstrapSession();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleLogin(payload: LoginPayload) {
        const nextSession = await loginRequest(payload);
        setSession(nextSession);
        writeStoredSession(nextSession);
    }

    async function handleLogout() {
        const currentSession = readStoredSession();
        setSession(null);
        writeStoredSession(null);

        if (!currentSession) {
            return;
        }

        try {
            await logoutRequest({ refreshToken: currentSession.refreshToken });
        } catch {
            // A saida local segue suficiente quando a API ainda nao esta no ar.
        }
    }

    const value = useMemo<AuthContextValue>(
        () => ({
            isAuthenticated: Boolean(session?.accessToken),
            isBootstrapping,
            login: handleLogin,
            logout: handleLogout,
            session,
            userRole: session?.user.role ?? null,
        }),
        [isBootstrapping, session],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
