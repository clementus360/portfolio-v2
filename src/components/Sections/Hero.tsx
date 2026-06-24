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
import WeatherBackground from '@/components/Weather/WeatherBackground';
import { useWeather } from '@/context/WeatherContext';

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
    .hero-window {
        position: relative;
        width: 100%;
        margin: 0;
        padding: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        overflow: hidden;
    }
    .hero-window::before {
        content: none;
    }
    .hero-window__opening {
        position: relative;
        width: 100%;
        min-height: clamp(640px, 96vh, 1040px);
        border-radius: 0;
        overflow: hidden;
        background: transparent;
    }
    .hero-window__scene {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        will-change: transform;
        transform: translate3d(0, calc(var(--hero-scroll, 0) * -0.03px), 0);
    }
    .hero-window__layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        will-change: transform;
    }
    .hero-window__layer--far {
        background:
            radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.16) 14%, rgba(255, 255, 255, 0) 38%),
            radial-gradient(circle at 78% 22%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 16%, rgba(255, 255, 255, 0) 40%),
            linear-gradient(180deg, rgba(248, 248, 248, 0.5) 0%, rgba(225, 225, 225, 0.12) 100%);
        opacity: 0.52;
        transform: translate3d(0, calc(var(--hero-scroll, 0) * 0.04px), 0);
    }
    .hero-window__layer--mid {
        background:
            radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.08) 24%, rgba(255, 255, 255, 0) 52%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%);
        mix-blend-mode: multiply;
        opacity: 0.7;
        transform: translate3d(0, calc(var(--hero-scroll, 0) * 0.09px), 0);
    }
    .hero-window__layer--near {
        background:
            radial-gradient(circle at 50% 65%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 22%, rgba(255, 255, 255, 0) 48%),
            linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.14) 100%);
        opacity: 0.82;
        transform: translate3d(0, calc(var(--hero-scroll, 0) * 0.16px), 0);
    }
    .hero-window__content {
        position: relative;
        z-index: 4;
        padding-top: clamp(9rem, 16vw, 13rem);
        padding-bottom: clamp(3rem, 5vw, 4rem);
    }
    /* Constrains the hero copy to the same centered column as every other
       section (max-w-[1440px] + px-4 / md:px-16 / lg:px-32). */
    .hero-window__container {
        width: 100%;
        max-width: 1440px;
        margin-inline: auto;
        padding-inline: 1rem;
        transform: translate3d(0, calc(var(--hero-scroll, 0) * -0.02px), 0);
    }
    @media (min-width: 768px) {
        .hero-window__container {
            padding-inline: 4rem;
        }
    }
    @media (min-width: 1024px) {
        .hero-window__container {
            padding-inline: 8rem;
        }
    }
    .hero-window__name {
        transition: transform 200ms ease-out;
    }
    .hero-window__subject {
        transition: transform 300ms ease-out;
    }
    @media (min-width: 768px) {
        .hero-window__name {
            transform: translate3d(calc(var(--cursor-x, 0) * 4px), calc(var(--cursor-y, 0) * 4px), 0);
        }
        .hero-window__subject {
            transform: translate3d(calc(var(--cursor-x, 0) * 2px), calc(var(--cursor-y, 0) * 2px), 0);
        }
    }
    /* The far/mid/near layers are white depth-glows for the future scene; on the
       dark night sky they wash the hero lighter than the rest of the page, so we
       knock them back when the night theme is active. */
    html.night .hero-window__layer--far {
        opacity: 0.1;
    }
    html.night .hero-window__layer--mid {
        opacity: 0.5;
    }
    html.night .hero-window__layer--near {
        opacity: 0.45;
    }
    /* Gap between the copy and the ribbons scales with viewport height: ~9rem on
       a laptop, growing only on tall/large monitors where a fixed rem looked
       cramped. */
    .hero-window__ribbons {
        margin-top: clamp(6rem, 16vh, 20rem);
        margin-bottom: 1rem;
    }
    @media (min-width: 768px) {
        .hero-window__ribbons {
            margin-bottom: 2rem;
        }
    }
    .hero-ribbon--top {
        transform: translate3d(0, calc(var(--hero-scroll, 0) * 0.05px), 0) rotate(2deg);
    }
    .hero-ribbon--bottom {
        transform: translate3d(0, calc(var(--hero-scroll, 0) * 0.08px), 0) rotate(-2deg);
    }
    @media (prefers-reduced-motion: reduce) {
        .hero-window__scene,
        .hero-window__layer,
        .hero-window__container,
        .hero-window__name,
        .hero-window__subject,
        .hero-ribbon--top,
        .hero-ribbon--bottom {
            transform: none !important;
        }
        .hero-ribbon--top {
            transform: rotate(2deg) !important;
        }
        .hero-ribbon--bottom {
            transform: rotate(-2deg) !important;
        }
    }
    .hero-window__vignette {
        display: none;
    }
    .hero-window__inner-shadow {
        display: none;
    }
    .hero-window__bottom-separator {
        display: none;
    }
    html, body {
        overflow-x: hidden;
    }
`;

const languages = [
    { greeting: 'CASE NO. 360 — OPEN | SUBJECT:', suffix: '| STATUS: UNDER INVESTIGATION', name: 'English' },
    { greeting: 'DOSSIER № 360 — OUVERT | SUJET :', suffix: '| STATUT : SOUS SURVEILLANCE', name: 'French' },
    { greeting: 'DOSIYE Nº 360 — IFUNGUYE | UWIGWA:', suffix: '| ICYICIRO: ARAGENZURWA', name: 'Kinyarwanda' },
    { greeting: 'CASO N. 360 — ABIERTO | SUJETO:', suffix: '| ESTADO: BAJO INVESTIGACIÓN', name: 'Spanish' },
    { greeting: 'FALL NR. 360 — OFFEN | SUBJEKT:', suffix: '| STATUS: IN UNTERSUCHUNG', name: 'German' },
    { greeting: '案件番号 360 — 公開 | 対象：', suffix: '| 状態：捜査中', name: 'Japanese' },
    { greeting: 'DOSSIÊ Nº 360 — ABERTO | SUJEITO:', suffix: '| ESTADO: SOB INVESTIGAÇÃO', name: 'Portuguese' },
    { greeting: '사건 번호 360 — 열림 | 대상:', suffix: '| 상태: 조사 중', name: 'Korean' },
    { greeting: 'DELO № 360 — OTKRYTO | OB\'YEKT:', suffix: '| STATUS: POD SLEDSTVIYEM', name: 'Russian' },
];

const designIcons = [Figma, AdobePS, AdobeAI, AdobeID, AdobeAE, AdobePR];
const devIcons = [React, NextJS, JavaScript, TailwindCSS, NodeJS, Go];

const designStripIcons = Array.from({ length: 7 }, () => designIcons).flat();
const devStripIcons = Array.from({ length: 7 }, () => devIcons).flat();

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { weather } = useWeather();
    const [currentLangIndex, setCurrentLangIndex] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<'static' | 'glitch-out' | 'glitch-in'>('static');
    const [designGlitchPhase, setDesignGlitchPhase] = useState<'normal' | 'glitch-in' | 'glitch-out'>('normal');
    const [devGlitchPhase, setDevGlitchPhase] = useState<'normal' | 'glitch-in' | 'glitch-out'>('normal');

    useEffect(() => {
        const languageInterval = window.setInterval(() => {
            setAnimationPhase('glitch-out');
            window.setTimeout(() => {
                setCurrentLangIndex((prev) => (prev + 1) % languages.length);
                setAnimationPhase('glitch-in');
            }, 600);
            window.setTimeout(() => {
                setAnimationPhase('static');
            }, 1200);
        }, 5000);

        return () => window.clearInterval(languageInterval);
    }, []);

    useEffect(() => {
        if (!ENABLE_SKILL_GLITCH) return;

        const glitchInterval = window.setInterval(() => {
            const designGlitch = Math.random() > 0.8;
            if (designGlitch) {
                setDesignGlitchPhase('glitch-in');
                const displayDuration = 2500 + Math.random() * 1000;
                window.setTimeout(() => setDesignGlitchPhase('glitch-out'), displayDuration);
                window.setTimeout(() => setDesignGlitchPhase('normal'), displayDuration + 500);
            }

            const devGlitch = Math.random() > 0.8;
            if (devGlitch) {
                setDevGlitchPhase('glitch-in');
                const displayDuration = 2500 + Math.random() * 1000;
                window.setTimeout(() => setDevGlitchPhase('glitch-out'), displayDuration);
                window.setTimeout(() => setDevGlitchPhase('normal'), displayDuration + 500);
            }
        }, 5000);

        return () => window.clearInterval(glitchInterval);
    }, []);

    // Parallax + cursor drift are written straight to CSS custom properties
    // inside a single rAF. Keeping them out of React state means scroll/mouse
    // movement never re-renders the (heavy) hero tree, so every layer stays in
    // lockstep and the parallax reads perfectly smooth — ready for the future
    // skyline / road / foreground scene to be slotted in as more depth layers.
    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;

        let scrollFrame = 0;
        let mouseFrame = 0;
        let mouseX = 0;
        let mouseY = 0;

        const applyScroll = () => {
            scrollFrame = 0;
            const scrolled = Math.max(0, -el.getBoundingClientRect().top);
            el.style.setProperty('--hero-scroll', `${scrolled}`);
            document.documentElement.style.setProperty('--scroll', `${scrolled}`);
        };

        const applyMouse = () => {
            mouseFrame = 0;
            el.style.setProperty('--cursor-x', `${mouseX}`);
            el.style.setProperty('--cursor-y', `${mouseY}`);
        };

        const handleScroll = () => {
            if (scrollFrame) return;
            scrollFrame = window.requestAnimationFrame(applyScroll);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
            if (mouseFrame) return;
            mouseFrame = window.requestAnimationFrame(applyMouse);
        };

        const handleMouseLeave = () => {
            mouseX = 0;
            mouseY = 0;
            if (mouseFrame) return;
            mouseFrame = window.requestAnimationFrame(applyMouse);
        };

        applyScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
            if (mouseFrame) window.cancelAnimationFrame(mouseFrame);
        };
    }, []);

    return (
        <>
            <style>{marqueeStyle}</style>
            <section ref={heroRef} className="relative overflow-hidden pt-0 pb-0">
                <div className="hero-window">
                    <div className="hero-window__opening">
                        <div className="hero-window__scene">
                            {weather?.condition && (
                                <WeatherBackground
                                    condition={weather.condition}
                                    isDay={weather.isDay}
                                    windKph={weather.windKph}
                                />
                            )}

                            <div className="hero-window__layer hero-window__layer--far" />
                            <div className="hero-window__layer hero-window__layer--mid" />
                            <div className="hero-window__layer hero-window__layer--near" />

                            <div className="hero-window__content">
                                <div className="hero-window__container">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
                                        <div className="flex flex-col">
                                            <h2
                                                key={`greeting-${currentLangIndex}`}
                                                className={`whitespace-nowrap font-space-mono font-bold text-sm md:text-sm text-primary ${animationPhase === 'glitch-out' ? 'language-glitch-out' : animationPhase === 'glitch-in' ? 'language-glitch-in' : ''}`}
                                                style={{ fontFamily: 'var(--font-space-mono)' }}
                                            >
                                                {languages[currentLangIndex].greeting}
                                            </h2>
                                            <h1 className="hero-window__name uppercase text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold font-nippo">
                                                Ishimwe Clement
                                                <span
                                                    key={`suffix-${currentLangIndex}`}
                                                    className={`inline-block w-[80px] md:w-[100px] align-bottom font-space-mono font-bold text-xs text-primary ml-1 ${animationPhase === 'glitch-out' ? 'language-glitch-out' : animationPhase === 'glitch-in' ? 'language-glitch-in' : ''}`}
                                                    style={{ fontFamily: 'var(--font-space-mono)' }}
                                                >
                                                    {languages[currentLangIndex].suffix}
                                                </span>
                                            </h1>
                                        </div>
                                        <p className="hero-window__subject font-space-mono font-light w-full lg:w-8/12 max-w-3xl text-sm md:text-base">
                                            <span className="block"><span className="font-bold">Subject:</span> Ishimwe Clement.</span>
                                            <span className="block"><span className="font-bold">Known for:</span> Multi-disciplinary execution.</span>
                                            <span className="block"><span className="font-bold">Current Status:</span> Under Investigation for high-fidelity output.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="hero-window__ribbons relative w-full h-32 md:h-40">
                                    <div
                                        className="hero-ribbon--top absolute left-0 w-[120vw] -ml-[10vw] flex items-center overflow-hidden bg-primary p-3 md:p-4 shadow-lg"
                                    >
                                            <div className={`marquee-container flex items-center gap-12 md:gap-20 text-white whitespace-nowrap transition-opacity duration-300 ${ENABLE_SKILL_GLITCH && designGlitchPhase !== 'normal' ? 'opacity-0' : 'opacity-50'}`}>
                                                {designStripIcons.map((Icon, index) => (
                                                    <Icon key={`design-${index}`} className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                                                ))}
                                            </div>
                                            {ENABLE_SKILL_GLITCH && designGlitchPhase !== 'normal' && (
                                                <div className={`absolute inset-0 flex items-center overflow-hidden ${designGlitchPhase === 'glitch-in' ? 'skill-glitch-in' : 'skill-glitch-out'}`}>
                                                    <div className="marquee-container flex items-center gap-8 md:gap-12 text-white opacity-100 whitespace-nowrap font-bold text-sm md:text-xl tracking-widest pointer-events-none">
                                                        {Array.from({ length: 12 }).map((_, i) => (
                                                            <span key={i} className="flex-shrink-0">CRIME SCENE DO NOT CROSS</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className="hero-ribbon--bottom absolute left-0 top-14 md:top-16 w-[120vw] -ml-[10vw] flex items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm p-3 md:p-4 shadow-lg"
                                        >
                                            <div className={`marquee-container-reverse flex items-center gap-12 md:gap-20 text-primary whitespace-nowrap transition-opacity duration-300 ${ENABLE_SKILL_GLITCH && devGlitchPhase !== 'normal' ? 'opacity-0' : 'opacity-50'}`}>
                                                {devStripIcons.map((Icon, index) => (
                                                    <Icon key={`dev-${index}`} className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
                                                ))}
                                            </div>
                                            {ENABLE_SKILL_GLITCH && devGlitchPhase !== 'normal' && (
                                                <div className={`absolute inset-0 flex items-center overflow-hidden ${devGlitchPhase === 'glitch-in' ? 'skill-glitch-in' : 'skill-glitch-out'}`}>
                                                    <div className="marquee-container-reverse flex items-center gap-8 md:gap-12 text-primary opacity-100 whitespace-nowrap font-bold text-sm md:text-xl tracking-widest pointer-events-none">
                                                        {Array.from({ length: 12 }).map((_, i) => (
                                                            <span key={i} className="flex-shrink-0">CRIME SCENE DO NOT CROSS</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            <div className="hero-window__vignette" aria-hidden="true" />
                            <div className="hero-window__inner-shadow" />
                            <div className="hero-window__bottom-separator" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
