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
import { LogoReveal } from "../../library/components/effects/LogoReveal";

const LOGO_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/outrank/1770818743426_6q0fcbqitga_outrank_logo.png";

export const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo reveal animation
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Wordmark entrance
  const wordmarkSpring = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 16, stiffness: 120 },
  });
  const wordmarkY = interpolate(wordmarkSpring, [0, 1], [30, 0]);
  const wordmarkOpacity = interpolate(wordmarkSpring, [0, 1], [0, 1]);

  // Tagline entrance
  const taglineDelay = 28;

  // Decorative ring
  const ringSpring = spring({
    frame,
    fps,
    delay: 6,
    config: { damping: 20, stiffness: 80 },
  });
  const ringScale = interpolate(ringSpring, [0, 1], [0, 1]);
  const ringOpacity = interpolate(ringSpring, [0, 1], [0, 0.15]);
  const ringRotation = frame * 0.15;

  // Subtle purple pulse behind logo
  const pulseScale = 1 + Math.sin((frame / fps) * 1.5) * 0.06;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Decorative rotating ring */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1.5px solid rgba(145, 93, 255, 0.3)",
          transform: `scale(${ringScale}) rotate(${ringRotation}deg)`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "1px solid rgba(145, 93, 255, 0.15)",
          transform: `scale(${ringScale}) rotate(${-ringRotation * 0.7}deg)`,
          opacity: ringOpacity * 0.6,
        }}
      />

      {/* Glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(145, 93, 255, 0.35), transparent 70%)",
          transform: `scale(${pulseScale * logoProgress})`,
          filter: "blur(40px)",
        }}
      />

      {/* Logo + Wordmark group */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo Icon */}
        <LogoReveal
          revealStyle="glow"
          glowColor="#915DFF"
          duration={1}
          glowIntensity={1.2}
        >
          <Img
            src={LOGO_URL}
            style={{
              width: 110,
              height: 110,
              objectFit: "contain",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          />
        </LogoReveal>

        {/* Wordmark */}
        <div
          style={{
            transform: `translateY(${wordmarkY}px)`,
            opacity: wordmarkOpacity,
          }}
        >
          <BlurReveal startFrom={10} stagger={0.04} duration={0.6}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 72,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              Outrank
            </span>
          </BlurReveal>
        </div>

        {/* Tagline */}
        <div style={{ marginTop: 8 }}>
          <FadeInWords startFrom={taglineDelay} stagger={0.08} duration={0.5}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 26,
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.02em",
              }}
            >
              AI-Powered SEO on Autopilot
            </span>
          </FadeInWords>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 40,
          height: 40,
          borderLeft: "2px solid rgba(145, 93, 255, 0.25)",
          borderTop: "2px solid rgba(145, 93, 255, 0.25)",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 40,
          height: 40,
          borderRight: "2px solid rgba(145, 93, 255, 0.25)",
          borderBottom: "2px solid rgba(145, 93, 255, 0.25)",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
