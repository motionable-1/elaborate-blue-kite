import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import {
  FadeInWords,
  TypewriterText,
} from "../../library/components/text/TextAnimation";

export const SceneContentEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Article card entrance
  const cardSpring = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 18, stiffness: 100 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [60, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.95, 1]);

  // Floating tags
  const tags = ["On-Brand", "SEO-Optimized", "Long-Form", "Publish-Ready"];

  // Shimmer line animation
  const shimmerX = interpolate(frame % (fps * 3), [0, fps * 3], [-100, 500], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          maxWidth: 1000,
        }}
      >
        {/* Headline */}
        <FadeInWords startFrom={0} stagger={0.07} duration={0.5}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              textWrap: "balance",
              lineHeight: 1.2,
            }}
          >
            Content that{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #915DFF, #C4A1FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              writes itself
            </span>
          </span>
        </FadeInWords>

        {/* Mock Article Card */}
        <div
          style={{
            width: 700,
            padding: 32,
            borderRadius: 20,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(145,93,255,0.18)",
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            opacity: cardOpacity,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 100,
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(145,93,255,0.06), transparent)",
              transform: "skewX(-15deg)",
              pointerEvents: "none",
            }}
          />

          {/* Article header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              AI Generated Article
            </span>
          </div>

          {/* Title line */}
          <div style={{ marginBottom: 16 }}>
            <TypewriterText
              speed={0.04}
              cursor={true}
              cursorColor="#915DFF"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.3,
              }}
            >
              10 Advanced Strategies to Scale Organic Traffic in 2025
            </TypewriterText>
          </div>

          {/* Mock paragraph lines */}
          {[85, 92, 70].map((width, i) => {
            const lineDelay = 45 + i * 8;
            const lineProg = interpolate(
              frame,
              [lineDelay, lineDelay + 15],
              [0, 1],
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
                  width: `${width}%`,
                  height: 10,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: 8,
                  opacity: lineProg,
                  transform: `scaleX(${lineProg})`,
                  transformOrigin: "left",
                }}
              />
            );
          })}
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag, i) => {
            const tagDelay = 30 + i * 7;
            const tagSpring = spring({
              frame,
              fps,
              delay: tagDelay,
              config: { damping: 14, stiffness: 150 },
            });
            const tagScale = interpolate(tagSpring, [0, 1], [0.7, 1]);
            const tagOpacity = interpolate(tagSpring, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  padding: "8px 18px",
                  borderRadius: 100,
                  background: "rgba(145,93,255,0.12)",
                  border: "1px solid rgba(145,93,255,0.25)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#C4A1FF",
                  transform: `scale(${tagScale})`,
                  opacity: tagOpacity,
                }}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
