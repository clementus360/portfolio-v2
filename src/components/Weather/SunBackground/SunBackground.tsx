"use client";

import React from "react";
import "./SunBackground.css";

type SunBackgroundProps = {
    enabled?: boolean;
    opacity?: number; // global fade
};

const SunBackground: React.FC<SunBackgroundProps> = ({
    enabled = true,
    opacity = 0.8,
}) => {
    if (!enabled) return null;

    return (
        <div className="sun-background" style={{ opacity }}>
            <div className="sun-core"></div>
            <div className="sun-halo"></div>
            <div className="flare-horizontal"></div>
            <div className="flare-circle-1"></div>
            <div className="flare-circle-2"></div>
        </div>
    );
};

export default SunBackground;