'use client';

import { useEffect, useRef, useState } from 'react';
import React from '@/components/Icons/tools/React';
import JavaScript from '@/components/Icons/tools/JavaScript';
import NextJS from '@/components/Icons/tools/NextJS';
import NodeJS from '@/components/Icons/tools/NodeJS';
import TailwindCSS from '@/components/Icons/tools/TailwindCSS';
import Figma from '@/components/Icons/tools/Figma';
import Go from '@/components/Icons/tools/Go';
import AdobeAE from '@/components/Icons/tools/AdobeAE';
import AdobeAI from '@/components/Icons/tools/AdobeAI';
import AdobeID from '@/components/Icons/tools/AdobeID';
import AdobePR from '@/components/Icons/tools/AdobePR';
import AdobePS from '@/components/Icons/tools/AdobePS';

// Toggle glitch effect on/off
const ENABLE_SKILL_GLITCH = true;

const marqueeStyle = `
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-33.333%);
        }
    }
    @keyframes marqueeReverse {
        0% {
            transform: translateX(-33.333%);
        }
        100% {
            transform: translateX(0);
        }
    }
    @keyframes glitchOut {
        0% {
            opacity: 1;
            transform: translateX(0) skew(0deg);
            clip-path: inset(0 0 0 0);
        }
        20% {
            opacity: 0.8;
            transform: translateX(-5px) skew(-2deg);
            clip-path: inset(40% 0 30% 0);
        }
        40% {
            opacity: 0.5;
            transform: translateX(5px) skew(2deg);
            clip-path: inset(20% 0 60% 0);
        }
        60% {
            opacity: 0.3;
            transform: translateX(-3px) skew(-1deg);
            clip-path: inset(60% 0 10% 0);
            filter: blur(1px);
        }
        80% {
            opacity: 0.1;
            transform: translateX(3px) skew(1deg);
            clip-path: inset(10% 0 80% 0);
        }
        100% {
            opacity: 0;
            transform: translateX(0) skew(0deg);
            clip-path: inset(50% 0 50% 0);
        }
    }
    @keyframes glitchIn {
        0% {
            opacity: 0;
            transform: translateX(0) skew(0deg);
            clip-path: inset(50% 0 50% 0);
        }
        20% {
            opacity: 0.3;
            transform: translateX(3px) skew(2deg);
            clip-path: inset(80% 0 10% 0);
        }
        40% {
            opacity: 0.5;
            transform: translateX(-5px) skew(-2deg);
            clip-path: inset(10% 0 70% 0);
            filter: blur(1px);
        }
        60% {
            opacity: 0.7;
            transform: translateX(4px) skew(1deg);
            clip-path: inset(30% 0 40% 0);
        }
        80% {
            opacity: 0.9;
            transform: translateX(-2px) skew(-1deg);
            clip-path: inset(60% 0 20% 0);
        }
        100% {
            opacity: 1;
            transform: translateX(0) skew(0deg);
            clip-path: inset(0 0 0 0);
        }
    }
    .marquee-container {
        animation: marquee 60s linear infinite;
    }
    .marquee-container-reverse {
        animation: marqueeReverse 60s linear infinite;
    }
    .language-glitch-out {
        animation: glitchOut 0.6s ease-in-out forwards;
    }
    .language-glitch-in {
        animation: glitchIn 0.6s ease-in-out forwards;
    }
    @keyframes skillGlitchIn {
        0% {
            opacity: 0;
            transform: translateX(0) skew(0deg);
            clip-path: inset(50% 0 50% 0);
        }
        20% {
            opacity: 0.3;
            transform: translateX(4px) skew(3deg);
            clip-path: inset(80% 0 10% 0);
        }
        40% {
            opacity: 0.6;
            transform: translateX(-6px) skew(-3deg);
            clip-path: inset(10% 0 70% 0);
            filter: blur(1px);
        }
        60% {
            opacity: 0.8;
            transform: translateX(5px) skew(2deg);
            clip-path: inset(30% 0 40% 0);
        }
        80% {
            opacity: 0.95;
            transform: translateX(-3px) skew(-1deg);
            clip-path: inset(60% 0 20% 0);
        }
        100% {
            opacity: 1;
            transform: translateX(0) skew(0deg);
            clip-path: inset(0 0 0 0);
        }
    }
    @keyframes skillGlitchOut {
        0% {
            opacity: 1;
            transform: translateX(0) skew(0deg);
            clip-path: inset(0 0 0 0);
        }
        20% {
            opacity: 0.8;
            transform: translateX(-6px) skew(-3deg);
            clip-path: inset(40% 0 30% 0);
        }
        40% {
            opacity: 0.5;
            transform: translateX(5px) skew(3deg);
            clip-path: inset(20% 0 60% 0);
        }
        60% {
            opacity: 0.2;
            transform: translateX(-4px) skew(-2deg);
            clip-path: inset(60% 0 10% 0);
            filter: blur(2px);
        }
        80% {
            opacity: 0.05;
            transform: translateX(4px) skew(2deg);
            clip-path: inset(10% 0 80% 0);
        }
        100% {
            opacity: 0;
            transform: translateX(0) skew(0deg);
            clip-path: inset(50% 0 50% 0);
        }
    }
    .skill-glitch-in {
        animation: skillGlitchIn 0.5s ease-in-out forwards;
    }
    .skill-glitch-out {
        animation: skillGlitchOut 0.5s ease-in-out forwards;
    }
    html, body {
        overflow-x: hidden;
    }
`;

const languages = [
    { greeting: "CASE NO. 360 — OPEN | SUBJECT:", suffix: "| STATUS: UNDER INVESTIGATION", name: "English" },
    { greeting: "DOSSIER № 360 — OUVERT | SUJET :", suffix: "| STATUT : SOUS SURVEILLANCE", name: "French" },
    { greeting: "DOSIYE Nº 360 — IFUNGUYE | UWIGWA:", suffix: "| ICYICIRO: ARAGENZURWA", name: "Kinyarwanda" },
    { greeting: "CASO N. 360 — ABIERTO | SUJETO:", suffix: "| ESTADO: BAJO INVESTIGACIÓN", name: "Spanish" },
    { greeting: "FALL NR. 360 — OFFEN | SUBJEKT:", suffix: "| STATUS: IN UNTERSUCHUNG", name: "German" },
    { greeting: "案件番号 360 — 公開 | 対象：", suffix: "| 状態：捜査中", name: "Japanese" },
    { greeting: "DOSSIÊ Nº 360 — ABERTO | SUJEITO:", suffix: "| ESTADO: SOB INVESTIGAÇÃO", name: "Portuguese" },
    { greeting: "사건 번호 360 — 열림 | 대상:", suffix: "| 상태: 조사 중", name: "Korean" },
    { greeting: "DELO № 360 — OTKRYTO | OB'YEKT:", suffix: "| STATUS: POD SLEDSTVIYEM", name: "Russian" }
];

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [currentLangIndex, setCurrentLangIndex] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<'static' | 'glitch-out' | 'glitch-in'>('static');
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Skill glitch state
    const [designGlitchPhase, setDesignGlitchPhase] = useState<'normal' | 'glitch-in' | 'glitch-out'>('normal');
    const [devGlitchPhase, setDevGlitchPhase] = useState<'normal' | 'glitch-in' | 'glitch-out'>('normal');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const languageInterval = setInterval(() => {
            setAnimationPhase('glitch-out');
            setTimeout(() => {
                setCurrentLangIndex((prev) => (prev + 1) % languages.length);
                setAnimationPhase('glitch-in');
            }, 600); // Change language after glitch out completes
            setTimeout(() => {
                setAnimationPhase('static');
            }, 1200); // Reset after glitch in completes
        }, 5000); // Change language every 3 seconds

        return () => clearInterval(languageInterval);
    }, []);

    // Skill glitch effect
    useEffect(() => {
        if (!ENABLE_SKILL_GLITCH) return;

        const glitchInterval = setInterval(() => {
            // Random glitch for design strip
            const designGlitch = Math.random() > 0.8; // 20% chance every cycle
            if (designGlitch) {
                setDesignGlitchPhase('glitch-in');
                const displayDuration = 2500 + Math.random() * 1000; // Visible for 2.5-3.5 seconds
                setTimeout(() => {
                    setDesignGlitchPhase('glitch-out');
                }, displayDuration);
                setTimeout(() => {
                    setDesignGlitchPhase('normal');
                }, displayDuration + 500); // 500ms for glitch-out animation
            }

            // Random glitch for dev strip
            const devGlitch = Math.random() > 0.8; // 20% chance every cycle
            if (devGlitch) {
                setDevGlitchPhase('glitch-in');
                const displayDuration = 2500 + Math.random() * 1000; // Visible for 2.5-3.5 seconds
                setTimeout(() => {
                    setDevGlitchPhase('glitch-out');
                }, displayDuration);
                setTimeout(() => {
                    setDevGlitchPhase('normal');
                }, displayDuration + 500); // 500ms for glitch-out animation
            }
        }, 5000); // Check for glitch every 10 seconds

        return () => clearInterval(glitchInterval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const scrolled = -rect.top;
                const scrollPercent = Math.max(0, scrolled);
                document.documentElement.style.setProperty('--scroll', `${scrollPercent}`);
                setScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    return (
        <>
            <style>{marqueeStyle}</style>
            <section ref={heroRef} className="relative flex flex-col gap-8 md:gap-12 lg:gap-20 items-center justify-between pt-0">
                <div className="px-4 max-w-[1440px] mx-auto md:px-16 lg:px-32 w-full">
                    <div 
                        className="h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12"
                        style={{
                            transform: `translateY(${scrollY * -0.02}px)`,
                        }}
                    >
                        <div className="flex flex-col">
                            <h2
                                key={`greeting-${currentLangIndex}`}
                                className={`whitespace-nowrap font-space-mono font-bold text-sm md:text-xl text-primary ${animationPhase === 'glitch-out' ? 'language-glitch-out' :
                                    animationPhase === 'glitch-in' ? 'language-glitch-in' : ''
                                    }`}
                                style={{
                                    fontFamily: 'var(--font-space-mono)',
                                }}
                            >
                                {languages[currentLangIndex].greeting}
                            </h2>
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold font-nexa transition-transform duration-200 ease-out leading-"
                                style={{
                                    transform: (isMounted && typeof window !== 'undefined' && window.innerWidth >= 768) ? `translate3d(${cursorOffset.x * 4}px, ${cursorOffset.y * 4}px, 0)` : 'none',
                                }}
                            >
                                Ishimwe Clement
                                <span
                                    key={`suffix-${currentLangIndex}`}
                                    className={`inline-block w-[80px] md:w-[100px] align-bottom font-space-mono font-bold text-xs text-primary ml-1 ${animationPhase === 'glitch-out' ? 'language-glitch-out' :
                                        animationPhase === 'glitch-in' ? 'language-glitch-in' : ''
                                        }`}
                                    style={{
                                        fontFamily: 'var(--font-space-mono)',
                                    }}
                                >
                                    {languages[currentLangIndex].suffix}
                                </span>
                            </h1>
                        </div>
                        <p
                            className="font-space-mono font-light w-full lg:w-8/12 max-w-3xl text-sm md:text-base transition-transform duration-300 ease-out"
                            style={{
                                transform: (isMounted && typeof window !== 'undefined' && window.innerWidth >= 768) ? `translate3d(${cursorOffset.x * 2}px, ${cursorOffset.y * 2}px, 0)` : 'none',
                            }}
                        >
                            <span className="block"><span className="font-bold">Subject:</span> Ishimwe Clement.</span>
                            <span className="block"><span className="font-bold">Known for:</span> Multi-disciplinary execution.</span>
                            <span className="block"><span className="font-bold">Current Status:</span> Under Investigation for high-fidelity output.</span>
                        </p>
                    </div>
                </div>
                <div className="relative w-full h-32 md:h-40 my-4 md:my-8">
                    {/* Design Strip - rotated one direction */}
                    <div 
                        className="absolute left-0 w-[120vw] -ml-[10vw] flex items-center overflow-hidden bg-primary p-3 md:p-4 shadow-lg"
                        style={{
                            transform: `translateY(${scrollY * 0.05}px) rotate(2deg)`,
                        }}
                    >
                        <div className={`marquee-container flex items-center gap-12 md:gap-20 text-white whitespace-nowrap transition-opacity duration-300 ${ENABLE_SKILL_GLITCH && designGlitchPhase !== 'normal' ? 'opacity-0' : 'opacity-50'
                            }`}>
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Figma className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAI className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeID className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobeAE className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <AdobePR className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                        </div>
                        {/* Glitch overlay text */}
                        {ENABLE_SKILL_GLITCH && designGlitchPhase !== 'normal' && (
                            <div className={`absolute inset-0 flex items-center overflow-hidden ${designGlitchPhase === 'glitch-in' ? 'skill-glitch-in' : 'skill-glitch-out'
                                }`}>
                                <div className="marquee-container flex items-center gap-8 md:gap-12 text-white opacity-100 whitespace-nowrap font-bold text-sm md:text-xl tracking-widest pointer-events-none">
                                    {Array(12).fill(0).map((_, i) => (
                                        <span key={i} className="flex-shrink-0">CRIME SCENE DO NOT CROSS</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Development Strip - rotated opposite direction */}
                    <div 
                        className="absolute left-0 top-10 md:top-12 w-[120vw] -ml-[10vw] flex items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm p-3 md:p-4 shadow-lg"
                        style={{
                            transform: `translateY(${scrollY * 0.08}px) rotate(-2deg)`,
                        }}
                    >
                        <div className={`marquee-container-reverse flex items-center gap-12 md:gap-20 text-primary whitespace-nowrap transition-opacity duration-300 ${ENABLE_SKILL_GLITCH && devGlitchPhase !== 'normal' ? 'opacity-0' : 'opacity-50'
                            }`}>
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <React className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NextJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <JavaScript className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <TailwindCSS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <NodeJS className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                            <Go className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                        </div>
                        {/* Glitch overlay text */}
                        {ENABLE_SKILL_GLITCH && devGlitchPhase !== 'normal' && (
                            <div className={`absolute inset-0 flex items-center overflow-hidden ${devGlitchPhase === 'glitch-in' ? 'skill-glitch-in' : 'skill-glitch-out'
                                }`}>
                                <div className="marquee-container-reverse flex items-center gap-8 md:gap-12 text-primary opacity-100 whitespace-nowrap font-bold text-sm md:text-xl tracking-widest pointer-events-none">
                                    {Array(12).fill(0).map((_, i) => (
                                        <span key={i} className="flex-shrink-0">CRIME SCENE DO NOT CROSS</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}