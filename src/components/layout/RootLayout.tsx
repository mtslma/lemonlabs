import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
    return (
        <div className="theme-page min-h-screen font-sans">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
