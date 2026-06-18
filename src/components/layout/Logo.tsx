import "../../styles/Logo.css";

type LogoProps = {
    suffix?: string;
};

export default function Logo({ suffix = "Labs" }: LogoProps) {
    return (
        <div className="logo-wrapper group relative flex items-center cursor-pointer select-none py-2">
            {/* O ecossistema de bolhas frenéticas voltou */}
            <div className="logo-bubbles absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <div className="bubble b1" />
                <div className="bubble b2" />
                <div className="bubble b3" />
                <div className="bubble b4" />
                <div className="bubble b5" />
                <div className="bubble b6" />
                <div className="bubble b7" />
                <div className="bubble b8" />
                <div className="bubble b9" />
                <div className="bubble b10" />
            </div>

            <h1 className="logo-wordmark theme-text-primary relative z-10 flex items-center text-4xl font-black tracking-[-0.045em] drop-shadow-sm">
                {/* Começo do nome: Lim */}
                <span className="text-lem relative z-10">Lim</span>

                {/* Ícone do Limão substituindo o 'o' */}
                <span className="lemon-o mx-0.75 flex h-[0.82em] w-[0.82em] items-center justify-center relative z-10 top-[0.08em]">
                    <span className="lemon-inner flex items-center justify-center w-full h-full">
                        <svg viewBox="0 0 1024 1024" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <path d="M516.15744 518.77888m-489.12384 0a489.12384 489.12384 0 1 0 978.24768 0 489.12384 489.12384 0 1 0-978.24768 0Z" fill="#FFE000" />
                            <path d="M516.15744 518.77888m-432.07168 0a432.07168 432.07168 0 1 0 864.14336 0 432.07168 432.07168 0 1 0-864.14336 0Z" fill="#FFFFFF" />
                            <path
                                d="M537.99424 142.52032v331.8016l233.14944-233.14944c-62.16192-57.11872-143.37024-93.50144-233.14944-98.65216zM501.16608 142.17728c-90.76224 3.57376-173.12768 39.06048-236.40576 95.73888l236.40576 236.40576V142.17728zM475.12064 537.1904H139.72992c4.40832 91.136 40.98048 173.62432 98.82624 236.5696l236.56448-236.5696zM475.12576 500.36224L238.55616 263.79264C180.70528 326.73792 144.13824 409.23136 139.72992 500.36224h335.39584zM501.16608 563.23072L264.76032 799.6416c63.27808 56.68352 145.6384 92.17024 236.40576 95.744v-332.15488zM564.03456 537.1904l232.9856 232.9856c55.97184-62.48448 91.24352-143.56992 95.56992-232.9856h-328.55552zM537.99424 563.23072v331.8016c89.78432-5.15072 170.99264-41.52832 233.14944-98.65216l-233.14944-233.14944z"
                                fill="#FFE000"
                            />
                            <path d="M564.03456 500.36224h328.55552c-4.3264-89.41568-39.6032-170.50112-95.56992-232.9856l-232.9856 232.9856z" fill="#FFB600" />
                        </svg>
                    </span>
                </span>

                {/* Final do nome principal: sin */}
                <span className="text-n relative z-10">sin</span>

                {/* Sufixo dinâmico integrado (Padrão: Labs) */}
                {suffix && (
                    <span className="brand-suffix relative z-10" aria-label={suffix}>
                        {suffix}
                    </span>
                )}
            </h1>
        </div>
    );
}
