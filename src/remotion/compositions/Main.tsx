import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Artifact,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";

import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";

import { Background } from "./scenes/Background";
import { SceneHero } from "./scenes/SceneHero";
import { SceneProblem } from "./scenes/SceneProblem";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneContentEngine } from "./scenes/SceneContentEngine";
import { ScenePublish } from "./scenes/ScenePublish";
import { SceneGrowth } from "./scenes/SceneGrowth";
import { SceneCTA } from "./scenes/SceneCTA";

// Load Inter font globally
loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Audio URLs
const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770819204396_9y8zmnirjrj_music_Modern_tech_startup_.mp3";
const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770818738993_bcgdz7vin57_sfx_modern_tech_startup_video_intr.mp3";
const CHIME_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770818751087_ud6eof33tmp_sfx_gentle_rising_digital_chime__s.mp3";

// Scene durations in frames (at 30fps)
const SCENE_HERO = 110; // ~3.7s
const SCENE_PROBLEM = 120; // 4s
const SCENE_FEATURES = 120; // 4s
const SCENE_CONTENT = 130; // ~4.3s
const SCENE_PUBLISH = 120; // 4s
const SCENE_GROWTH = 120; // 4s
const SCENE_CTA = 130; // ~4.3s + buffer

// Transition duration
const T_DUR = 18; // 0.6s transition

// Total = sum of scenes - (number of transitions * transition duration)
// 7 scenes, 6 transitions: 850 - 6*18 = 742 frames ≈ 24.7s + 30 extra = 772
export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Persistent animated background */}
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      {/* Scene transitions */}
      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Hero / Logo Reveal */}
          <TransitionSeries.Sequence durationInFrames={SCENE_HERO}>
            <SceneHero />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 2: Problem Statement */}
          <TransitionSeries.Sequence durationInFrames={SCENE_PROBLEM}>
            <SceneProblem />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 3: Feature Showcase */}
          <TransitionSeries.Sequence durationInFrames={SCENE_FEATURES}>
            <SceneFeatures />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 4: Content Engine */}
          <TransitionSeries.Sequence durationInFrames={SCENE_CONTENT}>
            <SceneContentEngine />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 5: Publishing Integrations */}
          <TransitionSeries.Sequence durationInFrames={SCENE_PUBLISH}>
            <ScenePublish />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 6: Growth Metrics */}
          <TransitionSeries.Sequence durationInFrames={SCENE_GROWTH}>
            <SceneGrowth />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          {/* Scene 7: CTA */}
          <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
            <SceneCTA />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>

      {/* Background Music */}
      <Audio
        src={MUSIC_URL}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(
            f,
            [durationInFrames - 60, durationInFrames - 10],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return 0.35 * fadeIn * fadeOut;
        }}
        loop
      />

      {/* Whoosh SFX on intro */}
      <Sequence from={5} layout="none">
        <Audio src={WHOOSH_SFX} volume={0.25} />
      </Sequence>

      {/* Chime SFX on CTA scene appearance */}
      <Sequence
        from={
          SCENE_HERO +
          SCENE_PROBLEM +
          SCENE_FEATURES +
          SCENE_CONTENT +
          SCENE_PUBLISH +
          SCENE_GROWTH -
          5 * T_DUR
        }
        layout="none"
      >
        <Audio src={CHIME_SFX} volume={0.2} />
      </Sequence>
    </>
  );
};
