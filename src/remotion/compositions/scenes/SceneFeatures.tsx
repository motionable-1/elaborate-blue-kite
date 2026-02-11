import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import { FadeInChars } from "../../library/components/text/TextAnimation";

const FEATURES = [
  {
    icon: "https://api.iconify.design/lucide/search.svg?color=%23915DFF&width=40",
    title: "Keyword Intelligence",
    desc: "AI finds high-impact keywords your competitors miss",
  },
  {
    icon: "https://api.iconify.design/lucide/bar-chart-3.svg?color=%23915DFF&width=40",
    title: "SERP Analysis",
    desc: "Decode what Google rewards — in real time",
  },
  {
    icon: "https://api.iconify.design/lucide/file-text.svg?color=%23915DFF&width=40",
    title: "AI Content Engine",
    desc: "Long-form articles that match your brand voice",
  },
  {
    icon: "https://api.iconify.design/lucide/send.svg?color=%23915DFF&width=40",
    title: "Auto-Publish",
    desc: "Ship to WordPress, Webflow, and more instantly",
  },
];

const FeatureCard: React.FC<{
  feature: (typeof FEATURES)[number];
  index: number;
}> = ({ feature, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 8 + index * 8;
  const prog = spring({
    frame,
    fps,
    delay,
    config: { damping: 16, stiffness: 100 },
  });

  const y = interpolate(prog, [0, 1], [50, 0]);
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const scale = interpolate(prog, [0, 1], [0.92, 1]);

  // Glow pulse per card
  const glowOpacity = 0.06 + Math.sin((frame / fps) * 1.8 + index * 1.2) * 0.03;

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        padding: "28px 20px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(145, 93, 255, 0.15)",
        backdropFilter: "blur(8px)",
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        textAlign: "center",
      }}
    >
      {/* Card glow */}
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 16,
          background: `radial-gradient(ellipse at 50% 0%, rgba(145,93,255,${glowOpacity}), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Img src={feature.icon} style={{ width: 40, height: 40 }} />
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 17,
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </span>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.45,
        }}
      >
        {feature.desc}
      </span>
    </div>
  );
};

export const SceneFeatures: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            One platform.{" "}
            <span style={{ color: "#A882FF" }}>Everything you need.</span>
          </span>
        </FadeInChars>

        {/* Feature cards grid */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
