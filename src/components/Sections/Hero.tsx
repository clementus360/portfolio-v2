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
    html, body {
        overflow-x: hidden;
    }
`;

const languages = [
    { greeting: "こんにちは,", suffix: "です", name: "Japanese" },
    { greeting: "Muraho, nitwa", suffix: "", name: "Kinyarwanda" },
    { greeting: "Bonjour, c'est", suffix: "", name: "French" },
    { greeting: "Hello, I'm", suffix: "", name: "English" },
    { greeting: "Hola, soy", suffix: "", name: "Spanish" },
    { greeting: "Jambo, ni", suffix: "", name: "Swahili" },
];

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [currentLangIndex, setCurrentLangIndex] = useState(0);
    const [animationPhase, setAnimationPhase] = useState<'static' | 'glitch-out' | 'glitch-in'>('static');
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

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
        }, 3000); // Change language every 3 seconds

        return () => clearInterval(languageInterval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const scrolled = -rect.top;
                const scrollPercent = Math.max(0, scrolled);
                document.documentElement.style.setProperty('--scroll', `${scrollPercent}`);
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
                <div className="px-4 md:px-16 lg:px-32 w-full">
                    <div className="h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
                        <div className="flex flex-col w-full lg:w-auto">
                            <h2 
                                key={`greeting-${currentLangIndex}`}
                                className={`font-sacramento font-bold text-2xl md:text-3xl lg:text-4xl text-primary ${
                                    animationPhase === 'glitch-out' ? 'language-glitch-out' : 
                                    animationPhase === 'glitch-in' ? 'language-glitch-in' : ''
                                }`}
                            >
                                {languages[currentLangIndex].greeting}
                            </h2>
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold font-nexa transition-transform duration-200 ease-out leading-tight"
                                style={{
                                    transform: `translate3d(${cursorOffset.x * 4}px, ${cursorOffset.y * 4}px, 0)`,
                                }}
                            >
                                Ishimwe Clement
                                <span 
                                    key={`suffix-${currentLangIndex}`}
                                    className={`font-sacramento font-bold text-xs md:text-sm text-primary ml-1 ${
                                        animationPhase === 'glitch-out' ? 'language-glitch-out' : 
                                        animationPhase === 'glitch-in' ? 'language-glitch-in' : ''
                                    }`}
                                >
                                    {languages[currentLangIndex].suffix}
                                </span>
                            </h1>
                        </div>
                        <p
                            className="font-roboto font-light w-full lg:w-8/12 text-sm md:text-base transition-transform duration-300 ease-out"
                            style={{
                                transform: `translate3d(${cursorOffset.x * 2}px, ${cursorOffset.y * 2}px, 0)`,
                            }}
                        >
                            I’m <span className="font-bold">Ishimwe Clement</span>, a jack of all trades in design and development. With a 360° approach, I move between branding, UI, motion, and code — always aiming for clear, purposeful results.
                        </p>
                    </div>
                </div>
                <div className="relative w-screen h-32 md:h-40 my-4 md:my-8">
                    {/* Design Strip - rotated one direction */}
                    <div className="absolute left-0 w-[120vw] -ml-[10vw] rotate-2 md:rotate-3 flex items-center overflow-hidden bg-primary p-3 md:p-4 shadow-lg">
                        <div className="marquee-container flex items-center gap-12 md:gap-20 text-white opacity-50 whitespace-nowrap">
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
                    </div>
                    
                    {/* Development Strip - rotated opposite direction */}
                    <div className="absolute left-0 top-10 md:top-12 w-[120vw] -ml-[10vw] -rotate-2 md:-rotate-3 flex items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm p-3 md:p-4 shadow-lg">
                        <div className="marquee-container-reverse flex items-center gap-12 md:gap-20 text-primary opacity-50 whitespace-nowrap">
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
                    </div>
                </div>
            </section>
        </>
    )
}