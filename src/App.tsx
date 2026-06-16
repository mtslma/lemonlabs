import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Services from "./pages/Services";

const router = createBrowserRouter([
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
                path: "projetos",
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
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
