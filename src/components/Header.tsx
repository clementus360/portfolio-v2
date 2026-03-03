"use client";

import Logo from "./Icons/Logo";
import Menu from "./Icons/Menu";
import { useEffect, useState } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed w-screen px-32 py-12 z-50">
            <div
                className={`flex m-auto justify-between items-center px-8 py-4 rounded-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/10 backdrop-blur-md border border-white/80 shadow-inner"
                        : ""
                }`}
            >
                <Logo className="w-16 text-[var(--foreground)]" />
                <ul className="flex gap-16 text-xs text-center">
                    <li className="text-[var(--foreground)] hover:font-bold hover:text-primary cursor-pointer">ABOUT</li>
                    <li className="text-[var(--foreground)] hover:font-bold hover:text-primary cursor-pointer">WORKS</li>
                    <li className="text-[var(--foreground)] hover:font-bold hover:text-primary cursor-pointer">PLAYGROUND</li>
                    <li className="text-[var(--foreground)] hover:font-bold hover:text-primary cursor-pointer">CONTACT</li>
                </ul>
                <Menu className="w-8 text-[var(--foreground)] hover:text-primary cursor-pointer" />
            </div>
        </div>
    );
}