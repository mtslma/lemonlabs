import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import type { UserRole } from "../../features/auth/auth.types";

type RouteGuardProps = {
    allow?: UserRole[];
};

export default function RouteGuard({ allow }: RouteGuardProps) {
    const location = useLocation();
    const { isAuthenticated, isBootstrapping, userRole } = useAuth();

    if (isBootstrapping) {
        return (
            <main className="theme-page flex min-h-[calc(100vh-72px)] items-center justify-center px-6">
                <div className="theme-surface theme-border w-full max-w-md rounded-3xl border p-8 text-center shadow-[0_20px_44px_rgba(24,24,27,0.08)]">
                    <p className="theme-text-muted text-xs font-bold uppercase tracking-[0.2em]">Sessao</p>
                    <h1 className="theme-text-primary mt-3 text-2xl font-black tracking-tight">Preparando seu acesso</h1>
                    <p className="theme-text-secondary mt-3 text-sm leading-relaxed">Estamos validando a autenticacao antes de liberar esta area.</p>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/entrar" replace state={{ redirectTo: `${location.pathname}${location.search}` }} />;
    }

    if (allow?.length && (!userRole || !allow.includes(userRole))) {
        return <Navigate to="/painel" replace />;
    }

    return <Outlet />;
}
