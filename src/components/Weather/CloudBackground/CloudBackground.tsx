"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Coverage of the sky, from a few faint wisps to a packed overcast lid:
 *   minimal → clear skies (sunny / clear night)        ~4 clouds
 *   light   → partly cloudy                            ~7 clouds
 *   full    → cloudy / snow                            ~11 clouds
 *   heavy   → overcast rain & thunderstorms            all 15 clouds
 */
type CloudDensity = "minimal" | "light" | "full" | "heavy";

type CloudBackgroundProps = {
    enabled?: boolean;
    isDay: boolean;
    windKph?: number;
    density?: CloudDensity;
};

type CloudLayer = {
    id: string;
    asset: string;
    left: string;
    top: string;
    size: string;
    scale: number;
    opacity: number;
    rotation: number;
    driftOffset: number;
    bobOffset: number;
    parallax: number;
    layer: "far" | "mid" | "near";
    /** Lowest density level at which this cloud appears (1 = always, 4 = heavy only). */
    tier: 1 | 2 | 3 | 4;
};

function cloudFilter(isDay: boolean, windKph: number, layer: CloudLayer["layer"]) {
    if (isDay) {
        const contrast = layer === "far" ? 0.96 : layer === "mid" ? 1 : 1.03;
        const brightness = windKph > 18 ? 0.98 : 1.03;

        return `brightness(${brightness}) contrast(${contrast}) saturate(0.02) invert(0.08) drop-shadow(0 0 8px rgba(75, 75, 75, 0.03))`;
    }

    const contrast = layer === "far" ? 0.96 : layer === "mid" ? 1.04 : 1.1;
    const saturation = windKph > 18 ? 0.7 : 0.55;

    return `brightness(1.06) contrast(${contrast}) saturate(${saturation}) sepia(1) hue-rotate(220deg) invert(0.82) drop-shadow(0 0 12px rgba(255, 255, 255, 0.06))`;
}

const cloudStyle = `
.cloud-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    isolation: isolate;
}

.cloud-background__atmosphere {
    position: absolute;
    inset: 0;
}

.cloud-background__overcast {
    position: absolute;
    inset: 0;
}

.cloud-layer {
    position: absolute;
    inset: 0;
    will-change: transform;
    transform: translate3d(0, calc(var(--cloud-scroll, 0) * var(--p, 0) * 1px), 0);
}

.cloud-track {
    position: absolute;
    transform: translate3d(-8vw, 0, 0);
    animation-name: cloud-glide;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform;
}

.cloud-bob {
    width: 100%;
    height: 100%;
    animation-name: cloud-bob;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    will-change: transform;
}

.cloud-glyph {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center;
    transform-origin: center;
    filter: blur(0.25px);
}

.cloud-layer--far .cloud-glyph {
    filter: blur(0.55px);
}

.cloud-layer--mid .cloud-glyph {
    filter: blur(0.35px);
}

.cloud-layer--near .cloud-glyph {
    filter: blur(0.2px);
}

@keyframes cloud-glide {
    from {
        transform: translate3d(-38vw, 0, 0);
    }

    to {
        transform: translate3d(138vw, 0, 0);
    }
}

@keyframes cloud-bob {
    from {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: translate3d(0, 5px, 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .cloud-track,
    .cloud-bob {
        animation: none !important;
        transform: none !important;
    }
}
`;

const CLOUD_ASSETS = [
    "/clouds/Asset 1.svg",
    "/clouds/Asset 2.svg",
    "/clouds/Asset 3.svg",
    "/clouds/Asset 4.svg",
    "/clouds/Asset 5.svg",
    "/clouds/Asset 6.svg",
    "/clouds/Asset 7.svg",
    "/clouds/Asset 8.svg",
    "/clouds/Asset 9.svg",
    "/clouds/Asset 10.svg",
    "/clouds/Asset 11.svg",
    "/clouds/Asset 12.svg",
    "/clouds/Asset 13.svg",
    "/clouds/Asset 14.svg",
    "/clouds/Asset 15.svg",
];

const CLOUD_LAYERS: CloudLayer[] = [
    // ── FAR: high, small, faint. Tier 1-2 so even clear skies keep a few wisps. ──
    {
        id: "far-1",
        asset: CLOUD_ASSETS[0],
        left: "-6vw",
        top: "8vh",
        size: "17vw",
        scale: 0.58,
        opacity: 0.16,
        rotation: -4,
        driftOffset: 0,
        bobOffset: 0,
        parallax: 0.0025,
        layer: "far",
        tier: 1,
    },
    {
        id: "far-2",
        asset: CLOUD_ASSETS[1],
        left: "30vw",
        top: "5vh",
        size: "19vw",
        scale: 0.64,
        opacity: 0.15,
        rotation: 2,
        driftOffset: 7,
        bobOffset: 4,
        parallax: 0.003,
        layer: "far",
        tier: 1,
    },
    {
        id: "far-3",
        asset: CLOUD_ASSETS[2],
        left: "64vw",
        top: "9vh",
        size: "18vw",
        scale: 0.62,
        opacity: 0.16,
        rotation: -2,
        driftOffset: 12,
        bobOffset: 2,
        parallax: 0.0035,
        layer: "far",
        tier: 2,
    },
    {
        id: "far-4",
        asset: CLOUD_ASSETS[3],
        left: "86vw",
        top: "4vh",
        size: "16vw",
        scale: 0.56,
        opacity: 0.15,
        rotation: 5,
        driftOffset: 4,
        bobOffset: 8,
        parallax: 0.004,
        layer: "far",
        tier: 2,
    },
    {
        id: "far-5",
        asset: CLOUD_ASSETS[4],
        left: "14vw",
        top: "12vh",
        size: "15vw",
        scale: 0.55,
        opacity: 0.15,
        rotation: -3,
        driftOffset: 19,
        bobOffset: 11,
        parallax: 0.0045,
        layer: "far",
        tier: 3,
    },
    // ── MID: the body of the cloud cover. Tier 1-4. ──
    {
        id: "mid-1",
        asset: CLOUD_ASSETS[5],
        left: "-4vw",
        top: "23vh",
        size: "15vw",
        scale: 0.7,
        opacity: 0.22,
        rotation: 3,
        driftOffset: 11,
        bobOffset: 6,
        parallax: 0.005,
        layer: "mid",
        tier: 1,
    },
    {
        id: "mid-2",
        asset: CLOUD_ASSETS[6],
        left: "24vw",
        top: "19vh",
        size: "16vw",
        scale: 0.74,
        opacity: 0.24,
        rotation: -3,
        driftOffset: 2,
        bobOffset: 10,
        parallax: 0.006,
        layer: "mid",
        tier: 2,
    },
    {
        id: "mid-3",
        asset: CLOUD_ASSETS[7],
        left: "54vw",
        top: "23vh",
        size: "17vw",
        scale: 0.78,
        opacity: 0.23,
        rotation: 1,
        driftOffset: 16,
        bobOffset: 3,
        parallax: 0.0065,
        layer: "mid",
        tier: 1,
    },
    {
        id: "mid-4",
        asset: CLOUD_ASSETS[8],
        left: "80vw",
        top: "20vh",
        size: "15vw",
        scale: 0.68,
        opacity: 0.2,
        rotation: -1,
        driftOffset: 9,
        bobOffset: 12,
        parallax: 0.007,
        layer: "mid",
        tier: 3,
    },
    {
        id: "mid-5",
        asset: CLOUD_ASSETS[9],
        left: "40vw",
        top: "27vh",
        size: "16vw",
        scale: 0.72,
        opacity: 0.21,
        rotation: 4,
        driftOffset: 23,
        bobOffset: 15,
        parallax: 0.0075,
        layer: "mid",
        tier: 4,
    },
    // ── NEAR: low, large, most opaque, fastest parallax. Tier 3-4. ──
    {
        id: "near-1",
        asset: CLOUD_ASSETS[10],
        left: "6vw",
        top: "40vh",
        size: "13vw",
        scale: 0.82,
        opacity: 0.27,
        rotation: 4,
        driftOffset: 14,
        bobOffset: 7,
        parallax: 0.0085,
        layer: "near",
        tier: 3,
    },
    {
        id: "near-2",
        asset: CLOUD_ASSETS[11],
        left: "34vw",
        top: "37vh",
        size: "14vw",
        scale: 0.86,
        opacity: 0.29,
        rotation: -2,
        driftOffset: 5,
        bobOffset: 1,
        parallax: 0.009,
        layer: "near",
        tier: 3,
    },
    {
        id: "near-3",
        asset: CLOUD_ASSETS[12],
        left: "64vw",
        top: "41vh",
        size: "13vw",
        scale: 0.8,
        opacity: 0.26,
        rotation: 1,
        driftOffset: 18,
        bobOffset: 9,
        parallax: 0.0095,
        layer: "near",
        tier: 4,
    },
    {
        id: "near-4",
        asset: CLOUD_ASSETS[13],
        left: "88vw",
        top: "36vh",
        size: "12vw",
        scale: 0.76,
        opacity: 0.24,
        rotation: -4,
        driftOffset: 8,
        bobOffset: 13,
        parallax: 0.01,
        layer: "near",
        tier: 4,
    },
    {
        id: "near-5",
        asset: CLOUD_ASSETS[14],
        left: "48vw",
        top: "44vh",
        size: "14vw",
        scale: 0.84,
        opacity: 0.27,
        rotation: 2,
        driftOffset: 26,
        bobOffset: 17,
        parallax: 0.0105,
        layer: "near",
        tier: 4,
    },
];

// How many clouds each density level keeps, and a global opacity multiplier so
// heavier weather reads as a thicker, more solid cover.
const DENSITY_MAX_TIER: Record<CloudDensity, CloudLayer["tier"]> = {
    minimal: 1,
    light: 2,
    full: 3,
    heavy: 4,
};

const DENSITY_OPACITY: Record<CloudDensity, number> = {
    minimal: 0.55,
    light: 0.8,
    full: 1,
    heavy: 1.4,
};

// Strength of the overcast wash that sits behind the puffs to fill sky gaps.
const DENSITY_OVERCAST: Record<CloudDensity, number> = {
    minimal: 0,
    light: 0.05,
    full: 0.18,
    heavy: 0.42,
};

// Far clouds drift slowest (most distant), near clouds a touch faster.
const layerSpeed = (layer: CloudLayer["layer"]) =>
    layer === "far" ? 1.2 : layer === "mid" ? 1 : 0.82;

// Starting phase offset per layer so the three depths don't align horizontally.
const LAYER_PHASE_SHIFT: Record<CloudLayer["layer"], number> = {
    far: 0,
    mid: 0.37,
    near: 0.71,
};

const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
};

export default function CloudBackground({
    enabled = true,
    isDay,
    windKph = 0,
    density = "full",
}: CloudBackgroundProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        let frame = 0;
        const updateScroll = () => {
            frame = 0;
            rootRef.current?.style.setProperty("--cloud-scroll", String(window.scrollY));
        };
        const handleScroll = () => {
            // Write the scroll position to a CSS variable inside a single rAF
            // instead of re-rendering every cloud node on each scroll event —
            // this keeps the parallax buttery and free of sub-pixel jitter.
            if (frame) return;
            frame = window.requestAnimationFrame(updateScroll);
        };

        updateScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        const visibilityFrame = window.requestAnimationFrame(() => setIsVisible(true));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
            window.cancelAnimationFrame(visibilityFrame);
        };
    }, [enabled]);

    const cloudLayers = CLOUD_LAYERS.filter(
        (cloud) => cloud.tier <= DENSITY_MAX_TIER[density],
    );
    const opacityScale = DENSITY_OPACITY[density];

    const atmosphereTint = isDay
        ? "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(223, 229, 236, 0.08) 40%, rgba(205, 214, 226, 0.02) 100%)"
        : "linear-gradient(180deg, rgba(46, 58, 83, 0.14) 0%, rgba(23, 30, 44, 0.16) 40%, rgba(16, 20, 29, 0.04) 100%)";

    // A broad overcast wash behind the individual puffs fills the gaps between
    // them so heavier weather actually reads as a covered sky instead of a few
    // scattered clouds. Strength scales with density (none for clear skies).
    const overcastStrength = DENSITY_OVERCAST[density];
    const overcastTint = isDay
        ? `linear-gradient(180deg, rgba(146, 154, 168, ${overcastStrength}) 0%, rgba(120, 130, 146, ${overcastStrength * 0.85}) 55%, rgba(104, 114, 132, ${overcastStrength * 0.5}) 100%)`
        : `linear-gradient(180deg, rgba(26, 33, 50, ${overcastStrength * 1.1}) 0%, rgba(18, 24, 38, ${overcastStrength}) 55%, rgba(12, 16, 26, ${overcastStrength * 0.6}) 100%)`;

    // Drift duration (seconds for a full ~176vw glide). Calm air is a slow,
    // serene ~240s; wind ramps it up steeply (5s per km/h) so the change in
    // speed is clearly noticeable, but it's floored at 80s so even a gale stays
    // gentle rather than distracting.
    const baseDrift = clamp(240 - windKph * 5, 80, 240);

    // Spread each layer's clouds at equal phase intervals along the shared glide
    // loop. Clouds in a layer move at the same speed, so even spacing is held
    // forever — each layer is a uniform conveyor that always covers its band
    // rather than bunching on one side. A per-layer phase shift keeps far/mid/
    // near clouds from lining up into a visible grid.
    const layerCounts: Record<string, number> = {};
    for (const cloud of cloudLayers) {
        layerCounts[cloud.layer] = (layerCounts[cloud.layer] ?? 0) + 1;
    }
    const layerIndex: Record<string, number> = {};
    const cloudPhase: Record<string, number> = {};
    for (const cloud of cloudLayers) {
        const index = layerIndex[cloud.layer] ?? 0;
        layerIndex[cloud.layer] = index + 1;
        cloudPhase[cloud.id] =
            ((index + LAYER_PHASE_SHIFT[cloud.layer]) / layerCounts[cloud.layer]) % 1;
    }

    if (!enabled) return null;

    return (
        <>
            <style>{cloudStyle}</style>
            <div ref={rootRef} className={`cloud-background ${isDay ? "cloud-background--day" : "cloud-background--night"}`} aria-hidden="true">
            <div
                className="cloud-background__atmosphere"
                style={{
                    background: atmosphereTint,
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1200ms ease",
                }}
            />

            {overcastStrength > 0 && (
                <div
                    className="cloud-background__overcast"
                    style={{
                        background: overcastTint,
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 1400ms ease",
                    }}
                />
            )}

            {cloudLayers.map((cloud) => {
                const driftDuration = baseDrift * layerSpeed(cloud.layer);
                const bobDuration = driftDuration * 0.55;
                // Even phase along the loop → uniform horizontal spacing.
                const driftDelay = cloudPhase[cloud.id] * driftDuration;

                return (
                    <div
                        key={cloud.id}
                        className={`cloud-layer cloud-layer--${cloud.layer}`}
                        style={{
                            ["--p" as string]: cloud.parallax,
                            opacity: isVisible ? 1 : 0,
                            transition: "opacity 1400ms ease",
                        } as React.CSSProperties}
                    >
                        <div
                            className="cloud-track"
                            style={{
                                left: 0,
                                top: cloud.top,
                                width: cloud.size,
                                height: cloud.size,
                                opacity: cloud.opacity * opacityScale,
                                animationDuration: `${driftDuration}s`,
                                animationDelay: `-${driftDelay}s`,
                                animationTimingFunction: "linear",
                                transition: "opacity 1100ms ease",
                            }}
                        >
                            <div
                                className="cloud-bob"
                                style={{
                                    animationDuration: `${bobDuration}s`,
                                    animationDelay: `-${cloud.bobOffset}s`,
                                }}
                            >
                                <img
                                    className="cloud-glyph"
                                    src={encodeURI(cloud.asset)}
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                        filter: cloudFilter(isDay, windKph, cloud.layer),
                                        transform: `scale(${cloud.scale}) rotate(${cloud.rotation}deg)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
        </>
    );
}