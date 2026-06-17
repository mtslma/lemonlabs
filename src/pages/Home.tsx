import HeroBackground from "../components/home/HeroBackground";
import HeroContent from "../components/home/HeroContent";
import HeroVisual from "../components/home/HeroVisual";

export default function Home() {
    return (
        <main className="theme-page relative min-h-[calc(100vh-72px)] overflow-hidden">
            <HeroBackground />

            <section className="relative z-10 w-full">
                <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-0">
                    <HeroContent />
                    <HeroVisual />
                </div>
            </section>
        </main>
    );
}
