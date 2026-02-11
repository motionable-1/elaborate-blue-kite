import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing, Img } from "remotion";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { StompStream } from "@/remotion/library/components/text/KineticStream";

const { fontFamily: headingFont } = loadManrope();

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: 15 + (i * 73) % 85,
    y: 10 + (i * 47) % 80,
    size: 2 + (i % 4) * 1.5,
    speed: 0.3 + (i % 3) * 0.2,
    delay: i * 0.15,
  }));

  const subtitleOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subtitleY = interpolate(frame, [50, 65], [20, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0118" }}>
      {/* Gradient mesh background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(124,58,237,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(16,185,129,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [0, 30], [0, 0.6], { extrapolateRight: "clamp" }),
          transform: `translateY(${frame * -0.3}px)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const delayedFrame = Math.max(0, frame - p.delay * fps);
        const floatY = Math.sin(delayedFrame * p.speed * 0.05) * 15;
        const floatX = Math.cos(delayedFrame * p.speed * 0.03) * 8;
        const particleOpacity = interpolate(delayedFrame, [0, 20], [0, 0.4 + (i % 3) * 0.15], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#7C3AED" : "#10B981",
              opacity: particleOpacity,
              transform: `translate(${floatX}px, ${floatY}px)`,
              boxShadow: `0 0 ${p.size * 4}px ${i % 2 === 0 ? "rgba(124,58,237,0.5)" : "rgba(16,185,129,0.5)"}`,
            }}
          />
        );
      })}

      {/* Central content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          {/* KineticStream for hook */}
          <div style={{ width: 1100, textAlign: "center" }}>
            <StompStream
              text="Research Write Rank Grow"
              wordsPerGroup={1}
              fontSize={130}
              fontWeight={800}
              color="white"
              style={{ fontFamily: headingFont, letterSpacing: "-0.03em" }}
            />
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              fontWeight: 500,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            SEO Content on Auto-Pilot
          </div>
        </div>
      </AbsoluteFill>

      {/* Corner accent glow */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
