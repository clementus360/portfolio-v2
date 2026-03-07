import Github from "./Icons/social/Github";
import Instagram from "./Icons/social/Instagram";
import LinkedIn from "./Icons/social/LinkedIn";
import XLogo from "./Icons/social/XLogo";

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/clementus360",
        icon: Github,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/clementus360",
        icon: LinkedIn,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/clementus360/",
        icon: Instagram,
    },
    {
        label: "X",
        href: "https://x.com/clementus360",
        icon: XLogo,
    },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-[var(--menu-border)] py-6 mt-12">
            <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-32">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-[var(--foreground)]/70">
                        © {new Date().getFullYear()} Ishimwe Clement
                    </p>

                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="text-[var(--foreground)]/70 hover:text-primary transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
