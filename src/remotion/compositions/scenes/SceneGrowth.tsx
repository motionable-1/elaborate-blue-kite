import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { FadeInChars } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";

const METRICS = [
  { value: 312, suffix: "%", label: "Organic Traffic Growth", prefix: "+" },
  { value: 5, suffix: "x", label: "Content Output", prefix: "" },
  { value: 68, suffix: "%", label: "Less Time on SEO", prefix: "" },
];

const GrowthChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bars = [28, 35, 42, 55, 48, 62, 75, 70, 82, 88, 92, 98];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 120,
        padding: "0 4px",
      }}
    >
      {bars.map((height, i) => {
        const barDelay = 20 + i * 3;
        const barProg = spring({
          frame,
          fps,
          delay: barDelay,
          config: { damping: 14, stiffness: 100 },
        });
        const barHeight = interpolate(barProg, [0, 1], [0, height]);
        const barOpacity = interpolate(barProg, [0, 1], [0, 1]);

        const isHighlight = i >= bars.length - 3;

        return (
          <div
            key={i}
            style={{
              width: 16,
              height: `${barHeight}%`,
              borderRadius: 4,
              background: isHighlight
                ? "linear-gradient(180deg, #A882FF, #6B3FA0)"
                : "rgba(145,93,255,0.2)",
              opacity: barOpacity,
              position: "relative",
            }}
          >
            {isHighlight && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 4,
                  boxShadow: "0 0 12px rgba(145,93,255,0.3)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const SceneGrowth: React.FC = () => {
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
        }}
      >
        {/* Section title */}
        <FadeInChars startFrom={0} stagger={0.02} duration={0.5}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              textWrap: "balance",
            }}
          >
            Real results. <span style={{ color: "#22C55E" }}>Real growth.</span>
          </span>
        </FadeInChars>

        {/* Mini chart */}
        <GrowthChart />

        {/* Metrics row */}
        <div style={{ display: "flex", gap: 60 }}>
          {METRICS.map((metric, i) => {
            const metricDelay = 15 + i * 10;
            const metricSpring = spring({
              frame,
              fps,
              delay: metricDelay,
              config: { damping: 18, stiffness: 100 },
            });
            const metricY = interpolate(metricSpring, [0, 1], [30, 0]);
            const metricOpacity = interpolate(metricSpring, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  transform: `translateY(${metricY}px)`,
                  opacity: metricOpacity,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 52,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {metric.prefix}
                  <Counter
                    from={0}
                    to={metric.value}
                    duration={1.5}
                    delay={metricDelay / fps + 0.2}
                    ease="smooth"
                  />
                  <span style={{ color: "#A882FF" }}>{metric.suffix}</span>
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {metric.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
