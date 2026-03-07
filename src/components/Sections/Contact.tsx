"use client";

import { useState, useEffect, useRef } from "react";
import { useWeather } from "@/context/WeatherContext";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Initialize EmailJS (make sure to set your public key in environment variables)
if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

export default function Contact() {
    const { theme } = useWeather();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Send email using EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    reply_to: formData.email,
                }
            );

            setSubmitStatus("success");
            
            // Reset form after success
            setTimeout(() => {
                setFormData({ name: "", email: "", subject: "", message: "" });
                setSubmitStatus("idle");
            }, 3000);
        } catch (error) {
            console.error("Failed to send email:", error);
            setSubmitStatus("error");
            
            // Reset error state after 5 seconds
            setTimeout(() => {
                setSubmitStatus("idle");
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const getLineCount = () => {
        let count = 1; // Opening brace
        Object.entries(formData).forEach(([_, value]) => {
            if (value) count++;
        });
        count++; // Closing brace
        return count;
    };

    return (
        <section id="contact" className="py-12 sm:py-20 md:py-28 md:pt-0" ref={sectionRef}>
            <div 
                className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 lg:px-32"
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
                            Secure Channel — Encrypted Transmission
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-nexa uppercase tracking-[0.04em]">
                            Establish Contact
                        </h2>
                        <p className="font-space-mono text-xs sm:text-sm text-[var(--foreground)]/60 max-w-2xl">
                            Transmit inquiry via secure form. All communications are logged and encrypted.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full"
                        style={{
                            transform: `translate3d(${cursorOffset.x * 3}px, ${cursorOffset.y * 3 + scrollY * -0.04}px, 0)`,
                            transition: 'transform 0.2s ease-out',
                        }}
                    >
                        {/* IDE Window */}
                        <div
                            className={`border transition-colors duration-300 ${
                                theme === "night"
                                    ? "bg-[#1e1e1e] border-[#3c3c3c] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                                    : "bg-[#f5f5f5] border-[var(--foreground)]/20 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                            }`}
                        >
                            {/* IDE Header */}
                            <div
                                className={`flex items-center justify-between px-3 sm:px-4 py-2 border-b font-space-mono text-[10px] sm:text-xs ${
                                    theme === "night"
                                        ? "bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc]"
                                        : "bg-[#e8e8e8] border-[var(--foreground)]/15 text-[var(--foreground)]"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <span className="ml-2 sm:ml-3 truncate">contact_form.json</span>
                                </div>
                                <span className="text-[10px] opacity-60">JSON</span>
                            </div>

                            {/* IDE Content */}
                            <form onSubmit={handleSubmit} className="relative">
                                <div className="flex">
                                    {/* Line Numbers */}
                                    <div
                                        className={`select-none py-3 sm:py-4 px-2 sm:px-3 font-space-mono text-[10px] sm:text-xs text-right border-r ${
                                            theme === "night"
                                                ? "bg-[#1e1e1e] border-[#3c3c3c] text-[#858585]"
                                                : "bg-[#eeeeee] border-[var(--foreground)]/10 text-[var(--foreground)]/40"
                                        }`}
                                    >
                                        {Array.from({ length: getLineCount() + Object.keys(formData).length }, (_, i) => (
                                            <div key={i} className="leading-5 sm:leading-6">
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Code Content */}
                                    <div className="flex-1 py-3 sm:py-6 px-3 sm:px-6 font-space-mono text-xs sm:text-sm overflow-x-auto">
                                        <div className="space-y-1 sm:space-y-1.5 leading-6 sm:leading-8">
                                            {/* Opening brace */}
                                            <div className={theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"}>
                                                {"{"}
                                            </div>

                                            {/* Name Field */}
                                            <div className="pl-3 sm:pl-6 flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0">
                                                <span className={`${theme === "night" ? "text-[#9cdcfe]" : "text-[#c41c3b]"} shrink-0 text-[10px] sm:text-xs md:text-sm`}>
                                                    "name"
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    :
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField("name")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="Agent_Name"
                                                    required
                                                    className={`flex-1 min-w-0 bg-transparent outline-none placeholder:opacity-60 text-xs sm:text-sm md:text-base ${
                                                        theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"
                                                    }`}
                                                />
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    ,
                                                </span>
                                            </div>

                                            {/* Email Field */}
                                            <div className="pl-3 sm:pl-6 flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0">
                                                <span className={`${theme === "night" ? "text-[#9cdcfe]" : "text-[#c41c3b]"} shrink-0 text-[10px] sm:text-xs md:text-sm`}>
                                                    "email"
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    :
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField("email")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="secure@channel.net"
                                                    required
                                                    className={`flex-1 min-w-0 bg-transparent outline-none placeholder:opacity-60 text-xs sm:text-sm md:text-base ${
                                                        theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"
                                                    }`}
                                                />
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    ,
                                                </span>
                                            </div>

                                            {/* Subject Field */}
                                            <div className="pl-3 sm:pl-6 flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0">
                                                <span className={`${theme === "night" ? "text-[#9cdcfe]" : "text-[#c41c3b]"} shrink-0 text-[10px] sm:text-xs md:text-sm`}>
                                                    "subject"
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    :
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField("subject")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="PRIORITY_LEVEL"
                                                    required
                                                    className={`flex-1 min-w-0 bg-transparent outline-none placeholder:opacity-60 text-xs sm:text-sm md:text-base ${
                                                        theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"
                                                    }`}
                                                />
                                                <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                    "
                                                </span>
                                                <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                    ,
                                                </span>
                                            </div>

                                            {/* Message Field */}
                                            <div className="pl-3 sm:pl-6 flex gap-1 sm:gap-2 md:gap-3 min-w-0">
                                                <div className="flex items-start gap-1 sm:gap-2 md:gap-3 flex-1 pt-1 min-w-0">
                                                    <span className={`${theme === "night" ? "text-[#9cdcfe]" : "text-[#c41c3b]"} shrink-0 text-[10px] sm:text-xs md:text-sm`}>
                                                        "message"
                                                    </span>
                                                    <span className={`${theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"} shrink-0`}>
                                                        :
                                                    </span>
                                                    <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                        "
                                                    </span>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField("message")}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="Transmit classified intel..."
                                                        required
                                                        rows={5}
                                                        className={`flex-1 min-w-0 bg-transparent outline-none resize-none placeholder:opacity-60 text-xs sm:text-sm md:text-base leading-relaxed ${
                                                            theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"
                                                        }`}
                                                    />
                                                    <span className={`${theme === "night" ? "text-[#ce9178]" : "text-[#1b5e20]"} shrink-0`}>
                                                        "
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Closing brace */}
                                            <div className={theme === "night" ? "text-[#d4d4d4]" : "text-[#1a1a1a]"}>
                                                {"}"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* IDE Footer / Submit Bar */}
                                <div
                                    className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t font-space-mono text-[10px] sm:text-xs gap-3 sm:gap-0 ${
                                        theme === "night"
                                            ? "bg-[#2d2d2d] border-[#3c3c3c] text-[#cccccc]"
                                            : "bg-[#e8e8e8] border-[var(--foreground)]/15 text-[var(--foreground)]"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 sm:gap-6 justify-center sm:justify-start">
                                        <span className="opacity-50">UTF-8</span>
                                        <span className="opacity-50">LF</span>
                                        <span className="opacity-50">JSON</span>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || submitStatus === "success"}
                                        className={`px-4 sm:px-6 py-2 sm:py-2.5 font-space-mono font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 border-2 relative overflow-hidden group ${
                                            submitStatus === "success"
                                                ? "bg-[#27c93f] border-[#27c93f] text-white cursor-default"
                                                : isSubmitting
                                                ? "opacity-60 cursor-wait border-primary text-primary"
                                                : `border-primary text-primary hover:bg-primary hover:text-white active:scale-95 cursor-pointer shadow-[0_2px_8px_rgba(207,15,15,0.1)] hover:shadow-[0_4px_12px_rgba(207,15,15,0.25)]`
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <span className="inline-block animate-spin">⟳</span>
                                                    <span className="hidden sm:inline">Transmitting...</span>
                                                    <span className="sm:hidden">Sending...</span>
                                                </>
                                            ) : submitStatus === "success" ? (
                                                <>
                                                    ✓ <span className="hidden sm:inline">Transmitted</span><span className="sm:hidden">Sent</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="hidden sm:inline">Execute Transmission</span>
                                                    <span className="sm:hidden">Send Message</span>
                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Status Message */}
                        {submitStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`mt-4 sm:mt-6 p-3 sm:p-5 border-2 font-space-mono text-xs sm:text-sm font-medium tracking-wider uppercase ${
                                    theme === "night"
                                        ? "bg-[#27c93f]/15 border-[#27c93f] text-[#27c93f]"
                                        : "bg-[#27c93f]/10 border-[#27c93f] text-[#27c93f]"
                                }`}
                                style={{
                                    transform: `translate3d(${cursorOffset.x * 4}px, ${cursorOffset.y * 4 + scrollY * -0.06}px, 0)`,
                                    transition: 'transform 0.2s ease-out',
                                }}
                            >
                                ✓ TRANSMISSION SUCCESSFUL — <span className="hidden sm:inline">Message received and logged</span><span className="sm:inline">Sent!</span>
                            </motion.div>
                        )}

                        {submitStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`mt-4 sm:mt-6 p-3 sm:p-5 border-2 font-space-mono text-xs sm:text-sm font-medium tracking-wider uppercase ${
                                    theme === "night"
                                        ? "bg-[#ff5f56]/15 border-[#ff5f56] text-[#ff5f56]"
                                        : "bg-[#ff5f56]/10 border-[#ff5f56] text-[#ff5f56]"
                                }`}
                                style={{
                                    transform: `translate3d(${cursorOffset.x * 4}px, ${cursorOffset.y * 4 + scrollY * -0.06}px, 0)`,
                                    transition: 'transform 0.2s ease-out',
                                }}
                            >
                                ⚠ TRANSMISSION FAILED — <span className="hidden sm:inline">Please check your connection and try again</span><span className="sm:inline">Try again</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
