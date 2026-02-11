import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from "remotion";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { FadeInWords } from "@/remotion/library/components/text/TextAnimation";

const { fontFamily: headingFont } = loadManrope();
const { fontFamily: bodyFont } = loadInter();

const PainCard: React.FC<{ icon: string; label: string; value: string; color: string; delay: number }> = ({ icon, label, value, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  const scale = spring({ fps, frame: delayedFrame, config: { damping: 12, stiffness: 180 } });
  const opacity = interpolate(delayedFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 28px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        opacity,
        transform: `scale(${scale}) translateY(${(1 - scale) * 20}px)`,
      }}
    >
      <img
        src={icon}
        alt=""
        style={{ width: 32, height: 32 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: bodyFont, fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: headingFont, fontSize: 22, color, fontWeight: 700 }}>{value}</span>
      </div>
    </div>
  );
};

export const PainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineScale = spring({ fps, frame, config: { damping: 14, stiffness: 160 } });
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#FAFAFA" }}>
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Red warning gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(180deg, rgba(239,68,68,0.06) 0%, transparent 100%)",
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
          {/* Headline */}
          <div
            style={{
              textAlign: "center",
              transform: `scale(${headlineScale})`,
            }}
          >
            <FadeInWords
              stagger={0.08}
              duration={0.4}
              ease="power3.out"
              style={{ fontFamily: headingFont, fontSize: 64, fontWeight: 800, color: "#1A1A2E", letterSpacing: "-0.03em", lineHeight: 1.1, textWrap: "balance" }}
            >
              Still Writing SEO Content Manually?
            </FadeInWords>
          </div>

          {/* Pain metrics */}
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <PainCard
              icon="https://api.iconify.design/lucide/clock.svg?color=%23EF4444&width=32"
              label="Hours per article"
              value="4-6 hrs"
              color="#EF4444"
              delay={20}
            />
            <PainCard
              icon="https://api.iconify.design/lucide/trending-down.svg?color=%23F59E0B&width=32"
              label="First-page rankings"
              value="< 5%"
              color="#F59E0B"
              delay={26}
            />
            <PainCard
              icon="https://api.iconify.design/lucide/dollar-sign.svg?color=%23EF4444&width=32"
              label="Content ROI"
              value="Negative"
              color="#EF4444"
              delay={32}
            />
          </div>

          {/* Sub text */}
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 22,
              color: "rgba(26,26,46,0.5)",
              fontWeight: 500,
              textAlign: "center",
              opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
              transform: `translateY(${interpolate(frame, [40, 55], [15, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            }}
          >
            Keyword research, writing, optimizing — it drains your team.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
