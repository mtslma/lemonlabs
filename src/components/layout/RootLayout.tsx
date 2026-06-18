import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootLayout() {
    return (
        <div className="theme-page flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
