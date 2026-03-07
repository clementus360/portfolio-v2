"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import { useWeather } from "@/context/WeatherContext";
import { useEffect, useState, useRef } from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

type CaseStudyCardProps = {
    project: (typeof caseStudies)[number];
    index: number;
    theme: "day" | "night";
};

function CaseStudyCard({ project, index, theme }: CaseStudyCardProps) {
    const impactConfig = {
        high: "HIGH IMPACT",
        notable: "NOTABLE",
        personal: "PERSONAL INITIATIVE",
    };

    const impact = impactConfig[project.impact || "personal"];
    const caseNumber = String(index + 1).padStart(3, "0");

    return (
        <motion.article
            variants={cardVariants}
            transition={{ duration: 0.45, delay: index * 0.06 + 0.1 }}
            className="group"
        >
            <Link href={`/projects/${project.slug}`} className="block">
                <div
                    className={`relative border p-4 md:p-5 transition-all duration-250 group-hover:-translate-y-1 group-hover:border-primary/70 ${
                        theme === "night"
                            ? "bg-[var(--weather-card-bg)] border-[var(--menu-border)] shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
                            : "bg-[var(--weather-card-bg)] border-[var(--foreground)]/20 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                    }`}
                >
                    <div className="absolute -top-3 left-4 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-[var(--background)] border-[var(--menu-border)] text-primary">
                        File
                    </div>

                    <div className="flex items-center justify-between pt-2 pb-3 mb-4 border-b border-[var(--foreground)]/10">
                        <span className="font-space-mono text-xs md:text-sm font-bold text-[var(--foreground)]/70">
                            CASE #{caseNumber}
                        </span>
                        <span className="font-space-mono text-[10px] md:text-xs font-semibold uppercase text-[var(--foreground)]/60">
                            {project.year}
                        </span>
                    </div>

                    <div className="relative w-full aspect-[5/3] mb-4 overflow-hidden border border-[var(--foreground)]/15 bg-[var(--foreground)]/5">
                        <Image
                            src={project.coverImage.src}
                            alt={project.coverImage.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-102"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="space-y-3">
                        <div>
                            <p className="font-space-mono text-[10px] text-[var(--foreground)]/55 uppercase tracking-[0.14em] mb-1">
                                Operation
                            </p>
                            <h3 className="font-space-mono text-sm md:text-base font-bold text-[var(--foreground)] uppercase leading-tight">
                                {project.title}
                            </h3>
                        </div>

                        <div>
                            <p className="font-space-mono text-[10px] text-[var(--foreground)]/55 uppercase tracking-[0.14em] mb-1">
                                Discipline
                            </p>
                            <p className="font-space-mono text-xs text-[var(--foreground)]/80">
                                {project.discipline || project.role.join(" + ")}
                            </p>
                        </div>

                        <div>
                            <p className="font-space-mono text-[10px] text-[var(--foreground)]/55 uppercase tracking-[0.14em] mb-1">
                                Mission Objective
                            </p>
                            <p className="font-space-mono text-xs text-[var(--foreground)]/70 leading-relaxed min-h-[3.2rem]">
                                {project.mission || project.summary}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--foreground)]/10">
                        <p className="font-space-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                            {impact}
                        </p>
                        <div className="flex items-center gap-1 text-primary transition-transform group-hover:translate-x-1">
                            <span className="font-space-mono text-xs font-bold uppercase">
                                Open File
                            </span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function ProjectsSection() {
    const { theme } = useWeather();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

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
        <section id="works" className="py-20 md:py-28 md:pb-20 " ref={sectionRef}>
            <div 
                className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-32"
                style={{
                    transform: `translateY(${scrollY * -0.05}px)`,
                }}
            >
                <div className="space-y-12">
                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{
                            transform: `translate3d(${cursorOffset.x * 2}px, ${cursorOffset.y * 2 + scrollY * -0.03}px, 0)`,
                            transition: 'transform 0.2s ease-out',
                        }}
                    >
                        <p className="text-xs text-primary uppercase tracking-[0.2em] font-medium font-space-mono">
                            Evidence Files — Active Case Studies
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-nexa uppercase">
                            Open Investigations
                        </h2>
                        <p className="font-space-mono text-sm text-[var(--foreground)]/60 max-w-2xl">
                            A curated selection of design and engineering operations. Each file contains strategic work, measurable impact, and documented outcomes.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{
                            transform: `translate3d(${cursorOffset.x * 3}px, ${cursorOffset.y * 3 + scrollY * -0.04}px, 0)`,
                            transition: 'transform 0.2s ease-out',
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {caseStudies.map((project, index) => (
                                <CaseStudyCard
                                    key={project.slug}
                                    project={project}
                                    index={index}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
