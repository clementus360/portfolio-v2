"use client";

import Logo from "./Icons/Logo";
import Menu from "./Icons/Menu";
import { useEffect, useState } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Prevent scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const menuItems = [
        { label: "ABOUT", href: "#about" },
        { label: "WORKS", href: "#works" },
        { label: "PLAYGROUND", href: "#playground" },
        { label: "CONTACT", href: "#contact" },
    ];

    const externalLinks = [
        { label: "Portfolio", href: "https://res.cloudinary.com/dpfonnjv3/image/upload/v1772527831/Design_Portfolio_compressed_qcltut.pdf", external: true },
        { label: "Resume", href: "https://res.cloudinary.com/dpfonnjv3/image/upload/v1772527608/Resume_muvcf9.ai", external: true },
        { label: "QR Code Tool", href: "https://qr.ishimwe.dev", external: true },
        { label: "GitHub", href: "https://github.com/clementus360", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/clementus360", external: true },
    ];

    return (
        <>
            <div className="fixed w-screen px-4 md:px-16 lg:px-32 py-6 md:py-12 z-50">
                <div
                    className={`flex m-auto justify-between items-center px-4 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 ${isScrolled
                            ? "bg-white/10 backdrop-blur-md border border-white/80 shadow-inner"
                            : ""
                        }`}
                >
                    <Logo className="w-12 md:w-16 text-[var(--foreground)]" />

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex gap-16 text-xs text-center">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="text-[var(--foreground)] hover:font-bold hover:text-primary cursor-pointer transition-all"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 md:w-8 text-[var(--foreground)] hover:text-primary cursor-pointer transition-colors" />
                    </button>
                </div>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 h-screen w-full sm:w-96 backdrop-blur-xl shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    backgroundColor: 'var(--menu-bg)',
                    borderLeft: '1px solid var(--menu-border)'
                }}
            >
                <div className="flex flex-col h-full p-8">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="self-end mb-8 text-[var(--foreground)] hover:text-primary transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Navigation Links - Mobile/Tablet */}
                    <nav className="flex flex-col gap-6 mb-12 lg:hidden">
                        <h3 className="text-xs font-bold text-[var(--foreground)]/60 mb-2">NAVIGATION</h3>
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-medium text-[var(--foreground)] hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Divider for mobile */}
                    <div className="h-px mb-8 lg:hidden" style={{ backgroundColor: 'var(--menu-divider)' }} />

                    {/* External Links */}
                    <nav className="flex flex-col gap-6">
                        <h3 className="text-xs font-bold text-[var(--foreground)]/60 mb-2">RESOURCES</h3>
                        {externalLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-lg font-medium text-[var(--foreground)] hover:text-primary transition-colors group"
                            >
                                {item.label}
                                <svg
                                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-8">
                        <p className="text-xs text-[var(--foreground)]/60">
                            © {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}