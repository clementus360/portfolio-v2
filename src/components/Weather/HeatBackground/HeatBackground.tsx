"use client";

import React from "react";
import "./HeatBackground.css";

type HeatBackgroundProps = {
  enabled?: boolean;
  opacity?: number; // global fade
};

const HeatBackground: React.FC<HeatBackgroundProps> = ({
  enabled = true,
  opacity = 0.6,
}) => {
  if (!enabled) return null;

  return (
    <div className="lens-flare-background" style={{ opacity }}>
      <div className="lens-center"></div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="circle-3"></div>
      <div className="circle-4"></div>
      <div className="left-flare horizontal-flare"></div>
      <div className="right-flare horizontal-flare"></div>
      <div className="full-flare horizontal-flare"></div>
      <div className="conic-1"></div>
      <div className="conic-2"></div>
      <div className="conic-3"></div>
    </div>
  );
};

export default HeatBackground;