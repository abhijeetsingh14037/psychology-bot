import { CalculateMetadataFunction, Composition } from "remotion";
import { PsychComponent } from "./Composition";

type ClipType = {
  src: string;
  start: number;
  length: number;
};

type Props = {
  clips: ClipType[];
  audioUrl: string;
  overlayTitle: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = ({ props }) => {
  const fps = 30;

  const totalDuration = props.clips.reduce(
    (max, clip) => Math.max(max, clip.start + clip.length),
    0
  );

  return {
    durationInFrames: Math.max(1, Math.round(totalDuration * fps)),
    fps,
    width: 1080,
    height: 1920,
  };
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PsychComp"
        component={PsychComponent}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={calculateMetadata}
        defaultProps={{
          clips: [
            {
              src: "https://videos.pexels.com/video-files/6961974/6961974-hd_1280_720_25fps.mp4",
              start: 0,
              length: 5,
            },
          ],
          audioUrl: "",
          overlayTitle: "Test *Title*",
        }}
      />
    </>
  );
};