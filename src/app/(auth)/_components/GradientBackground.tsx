import React from "react";

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient
            id="Gradient1"
            cx="50%"
            cy="50%"
            r="80%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFFDD0" /> {/* cream */}
            <stop offset="50%" stopColor="#D2B48C" /> {/* tan */}
            <stop offset="100%" stopColor="#8B4513" /> {/* rich-brown */}
          </radialGradient>
          <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />{" "}
            {/* autumn-gold */}
            <stop offset="100%" stopColor="#36454F" stopOpacity="0.5" />{" "}
            {/* charcoal */}
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#Gradient1)" />
        <rect width="100%" height="100%" fill="url(#Gradient2)" />
      </svg>
    </div>
  );
}
