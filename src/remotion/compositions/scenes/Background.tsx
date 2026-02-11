import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slow drifting gradient positions
  const gradX1 = 25 + Math.sin(time * 0.15) * 15;
  const gradY1 = 20 + Math.cos(time * 0.12) * 10;
  const gradX2 = 70 + Math.cos(time * 0.1) * 15;
  const gradY2 = 65 + Math.sin(time * 0.13) * 12;

  // Subtle purple glow pulse
  const glowOpacity = 0.18 + Math.sin(time * 0.4) * 0.05;

  return (
    <AbsoluteFill>
      {/* Deep dark base */}
      <AbsoluteFill style={{ backgroundColor: "#06060F" }} />

      {/* Animated gradient orbs */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(circle at ${gradX1}% ${gradY1}%, rgba(145, 93, 255, ${glowOpacity}) 0%, transparent 50%),
            radial-gradient(circle at ${gradX2}% ${gradY2}%, rgba(99, 60, 200, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 85% 15%, rgba(168, 130, 255, 0.06) 0%, transparent 35%)
          `,
        }}
      />

      {/* Subtle grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(145, 93, 255, 0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(145, 93, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: interpolate(Math.sin(time * 0.2), [-1, 1], [0.3, 0.6]),
        }}
      />

      {/* Floating ambient particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const seed = i * 137.5;
        const x =
          (Math.sin(seed + time * 0.2 * (0.5 + (i % 3) * 0.3)) * 0.5 + 0.5) *
          100;
        const y =
          (Math.cos(seed * 1.3 + time * 0.15 * (0.4 + (i % 4) * 0.2)) * 0.5 +
            0.5) *
          100;
        const size = 2 + (i % 4) * 1.5;
        const opacity = 0.08 + (i % 5) * 0.03 + Math.sin(time * 0.5 + i) * 0.03;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "#915DFF" : "#A882FF",
              opacity,
              filter: `blur(${1 + (i % 3)}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Top fade for polish */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,15,0.5) 0%, transparent 20%, transparent 80%, rgba(6,6,15,0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
