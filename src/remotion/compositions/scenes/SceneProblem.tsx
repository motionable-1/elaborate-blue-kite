import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { FadeInChars } from "../../library/components/text/TextAnimation";

const PAIN_POINTS = [
  { icon: "⏱", text: "Hours of manual keyword research" },
  { icon: "📉", text: "Content that never ranks" },
  { icon: "🔄", text: "Publishing bottlenecks" },
];

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
          maxWidth: 900,
        }}
      >
        {/* Headline */}
        <FadeInChars startFrom={0} stagger={0.02} duration={0.5}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 52,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              textWrap: "balance",
              lineHeight: 1.15,
            }}
          >
            SEO shouldn't feel like a{" "}
            <span style={{ color: "#FF6B6B" }}>full-time job</span>
          </span>
        </FadeInChars>

        {/* Pain points */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          {PAIN_POINTS.map((point, i) => {
            const delayFrames = 20 + i * 10;
            const prog = spring({
              frame,
              fps,
              delay: delayFrames,
              config: { damping: 18, stiffness: 120 },
            });
            const x = interpolate(prog, [0, 1], [-40, 0]);
            const opacity = interpolate(prog, [0, 1], [0, 1]);

            // Strike-through animation
            const strikeDelay = delayFrames + 25;
            const strikeProg = interpolate(
              frame,
              [strikeDelay, strikeDelay + 12],
              [0, 100],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              },
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transform: `translateX(${x}px)`,
                  opacity,
                }}
              >
                <span style={{ fontSize: 28 }}>{point.icon}</span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    position: "relative",
                  }}
                >
                  {point.text}
                  {/* Animated strike-through */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      height: 2,
                      width: `${strikeProg}%`,
                      backgroundColor: "#FF6B6B",
                      transform: "translateY(-50%)",
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
