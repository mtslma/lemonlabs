import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "../../styles/Logo.css";
import { siteConfig } from "../../config/site";

const currentYear = new Date().getFullYear();
const email = siteConfig.contactEmail;
const whatsappMessage = encodeURIComponent(siteConfig.whatsappDefaultMessage);

const socialLinks = [
    {
        label: "WhatsApp",
        href: `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`,
        icon: FaWhatsapp,
        external: true,
    },
    {
        label: "Instagram",
        href: siteConfig.instagramUrl,
        icon: FaInstagram,
        external: true,
    },
    {
        label: "Email",
        href: `mailto:${email}`,
        icon: MdOutlineEmail,
        external: false,
    },
];

export default function Footer() {
    return (
        <footer className="theme-page border-t border-neutral-200 bg-white">
            <div className="page-shell flex flex-col gap-4 py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="logo-wordmark theme-text-primary flex items-center text-[1.3rem] font-black tracking-[-0.045em]">
                            <span className="text-lem">{siteConfig.brandName}</span>

                            <span className="brand-suffix ml-1.5 translate-x-0! font-semibold! text-neutral-500! after:hidden">{siteConfig.brandSuffix}</span>
                        </p>

                        <p className="theme-text-muted text-xs font-medium leading-none">© {currentYear}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        <a href={`mailto:${email}`} className="theme-text-muted text-sm transition-colors duration-200 hover:text-neutral-950">
                            {email}
                        </a>

                        <div className="flex items-center gap-2">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} aria-label={item.label} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors duration-200 hover:border-neutral-950 hover:text-neutral-950">
                                        <Icon className="h-3.75 w-3.75" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
