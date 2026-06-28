"use client";

import { type RefObject, useEffect } from "react";

/**
 * Drives scroll + cursor parallax through CSS custom properties instead of React
 * state, so neither scrolling nor mouse movement ever re-renders the component.
 * Reads/writes are batched into a single rAF per frame, and the listeners are
 * passive so they never block the scroll thread.
 *
 * It writes three variables onto `ref`'s element:
 *   --sx  how far the section's top sits above the viewport top, in px (≥ 0)
 *   --cx  cursor X across the viewport, -1 … 1
 *   --cy  cursor Y across the viewport, -1 … 1
 *
 * Transforms then read them with calc(), e.g.
 *   transform: translate3d(calc(var(--cx, 0) * 4px),
 *                          calc(var(--sx, 0) * -0.08px + var(--cy, 0) * 4px), 0);
 *
 * Honors prefers-reduced-motion by doing nothing (the vars stay at their 0
 * defaults, so every transform resolves to its rest position).
 */
export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scrollFrame = 0;
    let mouseFrame = 0;
    let mouseX = 0;
    let mouseY = 0;

    const applyScroll = () => {
      scrollFrame = 0;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      el.style.setProperty("--sx", `${scrolled}`);
    };

    const applyMouse = () => {
      mouseFrame = 0;
      el.style.setProperty("--cx", `${mouseX}`);
      el.style.setProperty("--cy", `${mouseY}`);
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (mouseFrame) window.cancelAnimationFrame(mouseFrame);
    };
  }, [ref]);
}
