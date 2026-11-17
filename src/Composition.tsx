import { Sequence, OffthreadVideo, Audio, AbsoluteFill, staticFile } from "remotion";

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

export const PsychComponent: React.FC<Props> = ({ clips, audioUrl, overlayTitle }) => {
  const fps = 30;
  const videoSize = 1080;
  const topOffset = (1920 - videoSize) / 2; // 420

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <div
        style={{
          position: "absolute",
          top: topOffset,
          left: 0,
          width: videoSize,
          height: videoSize,
          overflow: "hidden",
        }}
      >
        {clips.map((clip, index) => {
          const startFrame = Math.round(clip.start * fps);
          const durationFrames = Math.round(clip.length * fps);

          return (
            <Sequence key={index} from={startFrame} durationInFrames={durationFrames}>
              <OffthreadVideo
                src={clip.src}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Sequence>
          );
        })}
      </div>

      {overlayTitle ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: videoSize,
            height: topOffset,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 30,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              fontFamily: "sans-serif",
              textShadow:
                "3px 3px 0 black, -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 0 3px 0 black, 0 -3px 0 black, 3px 0 0 black, -3px 0 0 black",
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              textAlign: "center",
              maxWidth: 950,
              justifyContent: "center",
            }}
          >
            {overlayTitle.split(/\*(.+?)\*/).map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} style={{ color: "#ff3b30" }}>{part}</span>
              ) : (
                <span key={i} style={{ color: "white" }}>{part}</span>
              )
            )}
          </div>
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          top: topOffset + videoSize,
          left: 0,
          width: videoSize,
          height: topOffset,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            fontFamily: "sans-serif",
            textShadow:
              "2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black",
            letterSpacing: 2,
          }}
        >
          BRAINBOOST
        </div>
      </div>

      {audioUrl ? (
        <Audio src={audioUrl.startsWith("http") ? audioUrl : staticFile(audioUrl)} />
      ) : null}
    </AbsoluteFill>
  );
};