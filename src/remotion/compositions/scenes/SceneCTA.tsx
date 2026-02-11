import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from "remotion";
import {
  FadeInWords,
  BlurReveal,
} from "../../library/components/text/TextAnimation";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/outrank/1770818743426_6q0fcbqitga_outrank_logo.png";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    delay: 0,
    config: { damping: 14, stiffness: 100 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // CTA button entrance
  const btnDelay = 30;
  const btnSpring = spring({
    frame,
    fps,
    delay: btnDelay,
    config: { damping: 16, stiffness: 120 },
  });
  const btnScale = interpolate(btnSpring, [0, 1], [0.8, 1]);
  const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1]);

  // Button shimmer
  const shimmerPos = ((time * 80) % 400) - 100;

  // Glow pulse
  const glowScale = 1 + Math.sin(time * 1.5) * 0.08;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Big glow behind */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(145,93,255,0.2), transparent 60%)",
          transform: `scale(${glowScale * logoSpring})`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Img
          src={LOGO_URL}
          style={{
            width: 80,
            height: 80,
            objectFit: "contain",
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        />

        {/* Headline */}
        <BlurReveal startFrom={8} stagger={0.04} duration={0.6}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 56,
              fontWeight: 800,
              color: "#FFFFFF",
              textAlign: "center",
              textWrap: "balance",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            Start outranking
            <br />
            your competition
          </span>
        </BlurReveal>

        {/* Subline */}
        <FadeInWords startFrom={22} stagger={0.06} duration={0.5}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
            }}
          >
            AI-powered SEO content, fully automated.
          </span>
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 12,
            transform: `scale(${btnScale})`,
            opacity: btnOpacity,
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "18px 48px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #915DFF, #7B3FE4)",
              boxShadow:
                "0 8px 30px rgba(145,93,255,0.4), 0 2px 8px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: shimmerPos,
                width: 60,
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
                position: "relative",
                zIndex: 1,
              }}
            >
              Try Outrank Free →
            </span>
          </div>
        </div>

        {/* URL */}
        <FadeInWords startFrom={38} stagger={0.05} duration={0.4}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "rgba(145,93,255,0.7)",
              letterSpacing: "0.03em",
            }}
          >
            outrank.so
          </span>
        </FadeInWords>
      </div>
    </AbsoluteFill>
  );
};
