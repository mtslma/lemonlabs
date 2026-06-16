// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importando o Layout e as Páginas
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
// import Services from './pages/Services'; (crie os arquivos depois)

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, // O Layout abraça todas as rotas filhas
        children: [
            {
                path: "/", // A página inicial
                element: <Home />,
            },
            // Adicione as outras rotas aqui depois:
            // { path: "/servicos", element: <Services /> },
            // { path: "/sobre", element: <About /> },
            // { path: "/contato", element: <Contact /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
