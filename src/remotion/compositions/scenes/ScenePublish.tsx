import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { FadeInChars } from "../../library/components/text/TextAnimation";

const INTEGRATIONS = [
  {
    name: "WordPress",
    icon: "https://api.iconify.design/logos/wordpress-icon.svg?width=48",
    color: "#21759B",
  },
  {
    name: "Webflow",
    icon: "https://api.iconify.design/logos/webflow.svg?width=48",
    color: "#4353FF",
  },
  {
    name: "Shopify",
    icon: "https://api.iconify.design/logos/shopify.svg?width=48",
    color: "#96BF48",
  },
  {
    name: "Ghost",
    icon: "https://api.iconify.design/simple-icons/ghost.svg?color=%23FFFFFF&width=42",
    color: "#738A94",
  },
];

export const ScenePublish: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Center "Outrank" hub
  const hubSpring = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 16, stiffness: 100 },
  });
  const hubScale = interpolate(hubSpring, [0, 1], [0.5, 1]);
  const hubOpacity = interpolate(hubSpring, [0, 1], [0, 1]);

  // Hub pulse
  const hubPulse = 1 + Math.sin(time * 2) * 0.03;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
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
            Publish <span style={{ color: "#A882FF" }}>everywhere</span>,
            instantly
          </span>
        </FadeInChars>

        {/* Integration hub layout */}
        <div
          style={{
            position: "relative",
            width: 500,
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Center hub */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #915DFF, #6B3FA0)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `scale(${hubScale * hubPulse})`,
              opacity: hubOpacity,
              boxShadow: "0 0 40px rgba(145,93,255,0.35)",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: "#FFF",
                letterSpacing: "-0.02em",
              }}
            >
              OR
            </span>
          </div>

          {/* Radiating pulse ring */}
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: "2px solid rgba(145,93,255,0.3)",
              transform: `scale(${hubScale * (1 + (time % 2) * 0.8)})`,
              opacity: Math.max(0, 1 - (time % 2) * 0.6) * hubOpacity,
              zIndex: 1,
            }}
          />

          {/* Integration nodes */}
          {INTEGRATIONS.map((integration, i) => {
            const angle = (i / INTEGRATIONS.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 160;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const nodeDelay = 15 + i * 8;
            const nodeSpring = spring({
              frame,
              fps,
              delay: nodeDelay,
              config: { damping: 14, stiffness: 120 },
            });
            const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
            const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);

            // Connection line progress
            const lineDelay = nodeDelay + 5;
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

            // Data pulse traveling along line
            const pulseActive = frame > lineDelay + 15;
            const pulseCycle = pulseActive
              ? ((frame - lineDelay - 15) / (fps * 1.5)) % 1
              : 0;

            return (
              <React.Fragment key={i}>
                {/* Connection line */}
                <svg
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 0,
                    height: 0,
                    overflow: "visible",
                    zIndex: 0,
                  }}
                >
                  <line
                    x1={0}
                    y1={0}
                    x2={x * lineProg}
                    y2={y * lineProg}
                    stroke="rgba(145,93,255,0.2)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  {/* Data pulse dot */}
                  {pulseActive && (
                    <circle
                      cx={x * pulseCycle}
                      cy={y * pulseCycle}
                      r={3}
                      fill="#915DFF"
                      opacity={0.8}
                    />
                  )}
                </svg>

                {/* Integration node */}
                <div
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) scale(${nodeScale})`,
                    opacity: nodeOpacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Img
                      src={integration.icon}
                      style={{ width: 36, height: 36 }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {integration.name}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
