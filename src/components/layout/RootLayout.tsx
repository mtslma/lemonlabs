import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
