'use client';

import { useEffect, useRef, useState } from 'react';

type RedactedTextProps = {
    children: string;
};

function RedactedText({ children }: RedactedTextProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const tiltA = (children.length % 5) - 2;
    const tiltB = (children.length % 7) - 3;

    return (
        <button
            type="button"
            onClick={() => setIsRevealed((prev) => !prev)}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            className="relative inline-block align-baseline"
            aria-pressed={isRevealed}
        >
            <span className="invisible px-1">{children}</span>
            <span
                className={`absolute inset-0 px-1 border border-primary/40 bg-primary/10 text-primary rounded-sm transition-all duration-250 ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0.5'
                }`}
            >
                {children}
            </span>
            <span
                className={`absolute inset-0 px-1 transition-all duration-250 ${
                    isRevealed ? 'opacity-0 -translate-y-0.5' : 'opacity-100 translate-y-0'
                }`}
            >
                <span
                    className="redaction-bar block h-[1em] w-full rounded-[1px] bg-foreground"
                    style={{ transform: `rotate(${tiltA}deg)` }}
                />
            </span>
        </button>
    );
}

type StatusBadgeProps = {
    status: 'ongoing' | 'active' | 'closed';
};

function StatusBadge({ status }: StatusBadgeProps) {
    const config = {
        ongoing: { 
            bgColor: 'bg-green-500', 
            label: 'ONGOING', 
            textClass: 'text-green-600',
            animate: true 
        },
        active: { 
            bgColor: 'bg-yellow-500', 
            label: 'ACTIVE', 
            textClass: 'text-yellow-600',
            animate: false 
        },
        closed: { 
            bgColor: 'bg-foreground/40', 
            label: 'CLOSED — SUCCESSFUL', 
            textClass: 'text-foreground/60',
            animate: false 
        },
    };
    const { bgColor, label, textClass, animate } = config[status];

    return (
        <span className={`inline-flex items-center gap-2 font-space-mono text-xs uppercase tracking-wider ${textClass}`}>
            <span className={`w-2 h-2 rounded-full ${bgColor} ${animate ? 'animate-pulse' : ''}`} />
            {label}
        </span>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [typewriterVisible, setTypewriterVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'field' | 'capabilities' | 'operations' | 'projects' | 'credentials'>('field');
    const [stampsDropped, setStampsDropped] = useState(false);
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTypewriterVisible(true);
                        setTimeout(() => setStampsDropped(true), 800);
                    }
                });
            },
            { threshold: 0.2 },
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
            const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

            setCursorOffset({
                x: normalizedX,
                y: normalizedY,
            });
        };

        const handleMouseLeave = () => {
            setCursorOffset({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const scrolled = -rect.top;
                setScrollY(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="about" className="w-full pt-20 md:pt-16 overflow-x-hidden">
            <div 
                className="w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-32"
                style={{
                    transform: `translateY(${scrollY * -0.05}px)`,
                }}
            >
                {/* Typewriter Header */}
                <div className="mb-8 space-y-2">
                    <div 
                        className={`font-space-mono text-xs md:text-sm text-primary/80 transition-opacity duration-500 ${typewriterVisible ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transform: window.innerWidth < 768 ? 'none' : `translate3d(${cursorOffset.x * 2}px, ${cursorOffset.y * 2 + scrollY * -0.03}px, 0)`,
                            transition: 'transform 0.2s ease-out',
                        }}
                    >
                        <p className="typewriter-line" style={{ animationDelay: '0ms' }}>&gt; ACCESSING FILE... CASE NO. 360</p>
                        <p className="typewriter-line" style={{ animationDelay: '800ms' }}>&gt; IDENTITY CONFIRMED. LOADING SUBJECT PROFILE...</p>
                        <p className="typewriter-line" style={{ animationDelay: '1600ms' }}>&gt; CLEARANCE LEVEL: GRANTED ✓</p>
                    </div>
                    <h2 
                        className={`text-3xl md:text-5xl font-extrabold font-nexa uppercase tracking-[0.04em] mt-4 transition-all duration-700 ${typewriterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                        style={{ 
                            transitionDelay: '2200ms',
                            transform: window.innerWidth < 768 ? 'none' : `translate3d(${cursorOffset.x * 3}px, ${cursorOffset.y * 3 + scrollY * -0.04}px, 0)`,
                        }}
                    >
                        Subject Profile
                    </h2>
                </div>

                {/* Dossier Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start z-50">
                    {/* Left Column - ID Card */}
                    <div className="space-y-4">
                        <div 
                            className="relative rotate-[-2deg] transition-transform duration-300 hover:rotate-0"
                            style={{
                                transform: window.innerWidth < 768 ? 'rotate(-2deg)' : `translate3d(${cursorOffset.x * 4}px, ${cursorOffset.y * 4 + scrollY * -0.08}px, 0) rotate(-2deg)`,
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <div className="rounded-sm border-2 border-foreground/30 bg-[var(--polaroid-bg)] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                                {/* Photo */}
                                <div className="relative overflow-hidden border-2 border-foreground/20 bg-foreground/5 mb-4">
                                    <img
                                        src="https://res.cloudinary.com/dpfonnjv3/image/upload/v1772715708/1662017769994_oebajm.jpg"
                                        alt="Ishimwe Clement"
                                        className="h-[280px] w-full object-cover"
                                    />
                                </div>

                                {/* ID Details */}
                                <div className="space-y-1.5 font-space-mono text-xs md:text-sm">
                                    <p className="flex justify-between">
                                        <span className="text-foreground/60">NAME:</span>
                                        <span className="font-semibold">ISHIMWE, CLEMENT</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-foreground/60">ALIAS:</span>
                                        <span className="font-semibold">"Clementus360"</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-foreground/60">ORIGIN:</span>
                                        <span className="font-semibold">KIGALI, RWANDA</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-foreground/60">STATUS:</span>
                                        <span className="font-semibold text-primary">ACTIVE OPERATIVE</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-foreground/60">THREAT LEVEL:</span>
                                        <span className="font-semibold">CREATIVE</span>
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t border-foreground/20 flex justify-between items-center">
                                    <span className="font-space-mono text-[10px] text-foreground/60">CASE NO. 360</span>
                                    <span className={`inline-block border-2 border-primary px-2 py-0.5 font-space-mono text-[9px] uppercase text-primary rotate-[3deg] ${stampsDropped ? 'stamp-drop-small' : 'opacity-0'}`}>
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Red String Tag */}
                        <div className="relative">
                            <div className="absolute -top-2 left-4 w-px h-4 bg-primary" />
                            <div className="rounded border border-primary/30 bg-primary/5 p-3">
                                <p className="font-space-mono text-primary text-base italic leading-snug">
                                    "Subject operates across disciplines. Do not attempt to categorize."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - File Tabs */}
                    <div 
                        className="relative"
                        style={{
                            transform: window.innerWidth < 768 ? 'none' : `translate3d(${cursorOffset.x * 2}px, ${cursorOffset.y * 2 + scrollY * -0.06}px, 0)`,
                            transition: 'transform 0.2s ease-out',
                        }}
                    >
                        <div className="relative z-10 flex flex-wrap items-end gap-1.5 px-3 mb-[-1px]">
                            <button
                                type="button"
                                onClick={() => setActiveTab('field')}
                                className={`rounded-t border border-b-0 px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-wider font-space-mono transition-colors ${
                                    activeTab === 'field' ? 'bg-background text-foreground border-foreground/25 z-10' : 'bg-foreground/10 text-foreground/60 border-foreground/15'
                                }`}
                            >
                                01 — Field Report
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('capabilities')}
                                className={`rounded-t border border-b-0 px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-wider font-space-mono transition-colors ${
                                    activeTab === 'capabilities' ? 'bg-background text-foreground border-foreground/25 z-10' : 'bg-foreground/10 text-foreground/60 border-foreground/15'
                                }`}
                            >
                                02 — Capabilities
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('operations')}
                                className={`rounded-t border border-b-0 px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-wider font-space-mono transition-colors ${
                                    activeTab === 'operations' ? 'bg-background text-foreground border-foreground/25 z-10' : 'bg-foreground/10 text-foreground/60 border-foreground/15'
                                }`}
                            >
                                03 — Operations
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('projects')}
                                className={`rounded-t border border-b-0 px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-wider font-space-mono transition-colors ${
                                    activeTab === 'projects' ? 'bg-background text-foreground border-foreground/25 z-10' : 'bg-foreground/10 text-foreground/60 border-foreground/15'
                                }`}
                            >
                                04 — Projects
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('credentials')}
                                className={`rounded-t border border-b-0 px-3 py-1.5 text-[10px] md:text-[11px] uppercase tracking-wider font-space-mono transition-colors ${
                                    activeTab === 'credentials' ? 'bg-background text-foreground border-foreground/25 z-10' : 'bg-foreground/10 text-foreground/60 border-foreground/15'
                                }`}
                            >
                                05 — Credentials
                            </button>
                        </div>

                        <div className="rounded-sm border border-foreground/25 bg-background p-5 md:p-6 shadow-xl">{activeTab === 'field' && (
                                <div className="space-y-4">
                                    <div className="border-b border-foreground/15 pb-3">
                                        <h3 className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-primary">Subject Profile — Field Assessment</h3>
                                        <p className="font-space-mono text-[10px] text-foreground/60 mt-1">Compiled by: Internal Intelligence Unit | Updated: 2026</p>
                                    </div>
                                    <div className="space-y-3 font-roboto text-sm md:text-base leading-relaxed text-foreground/90">
                                        <p>
                                            Subject Ishimwe Clement is a <span className="font-semibold">full-spectrum operative</span> with <span className="font-semibold">5+ years</span> of confirmed field activity across engineering and design. Deployed across Rwanda and international operations. Demonstrates an unusual and well-documented ability to inhabit both the creative and technical sides of a mission simultaneously.
                                        </p>
                                        <p>
                                            Unlike most operatives who specialize, subject has built a rare <span className="font-semibold">360° capability</span> — equally dangerous with a Figma canvas or a Go backend. Has successfully executed missions spanning brand identity, product design, performance engineering, and SEO warfare.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-space-mono text-xs border-t border-foreground/10">
                                            <p><span className="text-foreground/60">Field HQ:</span> <span className="font-semibold">Kigali, Rwanda</span></p>
                                            <p><span className="text-foreground/60">Active Since:</span> <span className="font-semibold">2021</span></p>
                                            <p className="md:col-span-2"><span className="text-foreground/60">Threat to mediocre work:</span> <span className="font-semibold text-primary">Severe</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'capabilities' && (
                                <div className="space-y-5">
                                    <div className="border-b border-foreground/15 pb-3">
                                        <h3 className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-primary">Capabilities Log</h3>
                                        <p className="font-space-mono text-[10px] text-foreground/60 mt-1">Formatted as evidence intake form — three confirmed categories</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded border border-foreground/20 bg-foreground/5 p-4">
                                            <p className="font-space-mono text-[11px] uppercase tracking-wider text-foreground/70 mb-2">Category A — Engineering Capabilities</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {['Go (Golang)', 'Next.js', 'SvelteKit', 'JavaScript ES6+', 'HTML5/CSS3', 'Tailwind CSS'].map((skill) => (
                                                    <span key={skill} className="px-2 py-1 bg-background border border-foreground/20 rounded text-xs font-space-mono">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="font-space-mono text-[10px] text-foreground/60 italic">Status: Operationally confirmed across multiple live deployments.</p>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-foreground/5 p-4">
                                            <p className="font-space-mono text-[11px] uppercase tracking-wider text-foreground/70 mb-2">Category B — Design Capabilities</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {['UI/UX Design', 'Design Systems', 'Figma', 'Graphic Design', 'Software Design', 'Framer'].map((skill) => (
                                                    <span key={skill} className="px-2 py-1 bg-background border border-foreground/20 rounded text-xs font-space-mono">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="font-space-mono text-[10px] text-foreground/60 italic">Status: Visual identity operations confirmed. Brand-level clearance achieved.</p>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-foreground/5 p-4">
                                            <p className="font-space-mono text-[11px] uppercase tracking-wider text-foreground/70 mb-2">Category C — Intelligence & Optimization</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {['SEO Engineering', 'Core Web Vitals', 'Google Search Console', 'Performance Optimization'].map((skill) => (
                                                    <span key={skill} className="px-2 py-1 bg-background border border-foreground/20 rounded text-xs font-space-mono">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="font-space-mono text-[10px] text-foreground/60 italic">Status: Data-driven. Results quantified. See mission reports for evidence.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'operations' && (
                                <div className="space-y-5">
                                    <div className="border-b border-foreground/15 pb-3">
                                        <h3 className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-primary">Operation History</h3>
                                        <p className="font-space-mono text-[10px] text-foreground/60 mt-1">Each role is a confirmed mission entry</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h4 className="font-space-mono text-sm font-bold uppercase">Operation: Grow Rwanda Advisors</h4>
                                                <StatusBadge status="ongoing" />
                                            </div>
                                            <div className="space-y-1 font-space-mono text-xs text-foreground/75">
                                                <p><span className="text-foreground/60">ROLE:</span> Web UI Designer</p>
                                                <p><span className="text-foreground/60">LOCATION:</span> Kigali, Rwanda</p>
                                                <p><span className="text-foreground/60">DURATION:</span> May 2024 – Present</p>
                                            </div>
                                            <p className="mt-3 text-sm text-foreground/85 italic">Subject embedded within client organization. Executing UI design operations for an active, growing advisory firm.</p>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h4 className="font-space-mono text-sm font-bold uppercase">Operation: Pinn Creative Hub</h4>
                                                <StatusBadge status="active" />
                                            </div>
                                            <div className="space-y-1 font-space-mono text-xs text-foreground/75">
                                                <p><span className="text-foreground/60">ROLE:</span> Lead Developer & Designer</p>
                                                <p><span className="text-foreground/60">LOCATION:</span> Kigali, Rwanda</p>
                                                <p><span className="text-foreground/60">DURATION:</span> 2025</p>
                                            </div>
                                            <p className="mt-3 text-sm text-foreground/85 italic">Subject assumed lead position. Oversaw creative and technical operations for local and international brand clients. Designed and developed high-end agency site in Next.js — ultra-fast load times confirmed.</p>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h4 className="font-space-mono text-sm font-bold uppercase">Operation: iBlue Concepts Ltd.</h4>
                                                <StatusBadge status="closed" />
                                            </div>
                                            <div className="space-y-1 font-space-mono text-xs text-foreground/75">
                                                <p><span className="text-foreground/60">ROLE:</span> Graphic/Web Designer</p>
                                                <p><span className="text-foreground/60">LOCATION:</span> Kigali, Rwanda</p>
                                                <p><span className="text-foreground/60">DURATION:</span> Jan 2023 – Jan 2024</p>
                                            </div>
                                            <p className="mt-3 text-sm text-foreground/85 italic">Transformed complex designs into responsive web products. Optimized performance for competitive Rwandan market targets.</p>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h4 className="font-space-mono text-sm font-bold uppercase">Operation: Tap Bits</h4>
                                                <StatusBadge status="closed" />
                                            </div>
                                            <div className="space-y-1 font-space-mono text-xs text-foreground/75">
                                                <p><span className="text-foreground/60">ROLE:</span> Frontend Developer</p>
                                                <p><span className="text-foreground/60">LOCATION:</span> Kigali, Rwanda</p>
                                                <p><span className="text-foreground/60">DURATION:</span> Oct 2019 – Jan 2023</p>
                                            </div>
                                            <p className="mt-3 text-sm text-foreground/85 italic">First confirmed field deployment. Origin of subject's full-stack trajectory.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <div className="space-y-4">
                                    <div className="border-b border-foreground/15 pb-3">
                                        <h3 className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-primary">Personal Project Dossier</h3>
                                    </div>

                                    <div className="rounded border-2 border-primary/30 bg-primary/5 p-5">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <h4 className="font-space-mono text-sm font-bold uppercase text-primary">Classified Project — Internal Operation</h4>
                                                <p className="font-space-mono text-xs text-foreground/70 mt-1">CODENAME: AI HELPER | YEAR: 2025</p>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/20 border border-primary/50 rounded font-space-mono text-[10px] text-primary uppercase whitespace-nowrap">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                Personal Initiative
                                            </span>
                                        </div>

                                        <p className="text-sm leading-relaxed text-foreground/90 mb-3">
                                            Subject independently designed and engineered an AI-driven coaching platform. Built a concurrent backend in <RedactedText>Go</RedactedText> and a responsive frontend in <RedactedText>SvelteKit</RedactedText> — entirely self-directed. Purpose: help users untangle thoughts and generate actionable tasks.
                                        </p>

                                        <div className="border-t border-primary/20 pt-3">
                                            <p className="font-space-mono text-xs text-foreground/75 uppercase tracking-wide">
                                                <span className="text-foreground/60">Assessment:</span> High initiative. No instructions required.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'credentials' && (
                                <div className="space-y-5">
                                    <div className="border-b border-foreground/15 pb-3">
                                        <h3 className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-primary">Credentials File</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <p className="font-space-mono text-[11px] uppercase tracking-wider text-foreground/70 mb-3">Academic Intelligence</p>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-space-mono text-xs text-foreground/60">DEGREE:</span> Bachelor of Creative Arts (Honors)</p>
                                                <p><span className="font-space-mono text-xs text-foreground/60">FIELD:</span> Communication & Media Studies</p>
                                                <p><span className="font-space-mono text-xs text-foreground/60">INSTITUTION:</span> University of Rwanda</p>
                                                <p><span className="font-space-mono text-xs text-foreground/60">YEAR FILED:</span> 2024</p>
                                            </div>
                                        </div>

                                        <div className="rounded border border-foreground/20 bg-background/60 p-4">
                                            <p className="font-space-mono text-[11px] uppercase tracking-wider text-foreground/70 mb-3">Certified Operations</p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-0.5">✓</span>
                                                    <span>Google — Foundations of UX Design</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary mt-0.5">✓</span>
                                                    <span>Google — Fundamentals of Digital Marketing</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="font-space-mono text-xs text-foreground/60 italic text-center pt-2">All credentials verified. No forgeries detected.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .typewriter-line {
                    opacity: 0;
                    animation: typewriter 0.8s ease forwards;
                }

                @keyframes typewriter {
                    0% {
                        opacity: 0;
                        transform: translateX(-4px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .redaction-bar {
                    transform-origin: left center;
                }

                .stamp-drop {
                    animation: stampDrop 650ms cubic-bezier(0.2, 1, 0.24, 1) forwards;
                }

                .stamp-drop-small {
                    animation: stampDropSmall 500ms cubic-bezier(0.2, 1, 0.24, 1) forwards;
                }

                @keyframes stampDrop {
                    0% {
                        opacity: 0;
                        transform: translateY(-90px) rotate(-16deg) scale(1.08);
                    }
                    72% {
                        opacity: 1;
                        transform: translateY(0) rotate(-7deg) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotate(-8deg) scale(1);
                    }
                }

                @keyframes stampDropSmall {
                    0% {
                        opacity: 0;
                        transform: translateY(-30px) rotate(8deg) scale(1.2);
                    }
                    70% {
                        opacity: 1;
                        transform: translateY(0) rotate(2deg) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotate(3deg) scale(1);
                    }
                }
            `}</style>
        </section>
    );
}
