import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteGuard from "./components/auth/RouteGuard";
import AdminShell from "./components/layout/AdminShell";
import ClientShell from "./components/layout/ClientShell";
import RootLayout from "./components/layout/RootLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import AdminBriefings from "./pages/admin/AdminBriefings";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminProjects from "./pages/admin/AdminProjects";
import ClientBriefings from "./pages/client/ClientBriefings";
import ClientOverview from "./pages/client/ClientOverview";
import ClientProjects from "./pages/client/ClientProjects";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "servicos",
                    element: <Services />,
                },
                {
                    path: "portfolio",
                    element: <Projects />,
                },
                {
                    path: "sobre",
                    element: <About />,
                },
                {
                    path: "contato",
                    element: <Contact />,
                },
                {
                    path: "entrar",
                    element: <Login />,
                },
                {
                    element: <RouteGuard allow={["USER"]} />,
                    children: [
                        {
                            path: "minha-area",
                            element: <ClientShell />,
                            children: [
                                {
                                    index: true,
                                    element: <ClientOverview />,
                                },
                                {
                                    path: "briefings",
                                    element: <ClientBriefings />,
                                },
                                {
                                    path: "projetos",
                                    element: <ClientProjects />,
                                },
                            ],
                        },
                    ],
                },
                {
                    element: <RouteGuard allow={["ADMIN"]} />,
                    children: [
                        {
                            path: "painel",
                            element: <AdminShell />,
                            children: [
                                {
                                    index: true,
                                    element: <AdminOverview />,
                                },
                                {
                                    path: "briefings",
                                    element: <AdminBriefings />,
                                },
                                {
                                    path: "projetos",
                                    element: <AdminProjects />,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ],
    {
        basename: routerBasename,
    },
);

export default function App() {
    return <RouterProvider router={router} />;
}
