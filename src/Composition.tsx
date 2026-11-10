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

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
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

      {overlayTitle ? (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 100 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              fontFamily: "sans-serif",
              textShadow:
                "3px 3px 0 black, -3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 0 3px 0 black, 0 -3px 0 black, 3px 0 0 black, -3px 0 0 black",
              display: "flex",
              gap: 14,
              textAlign: "center",
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
        </AbsoluteFill>
      ) : null}

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
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
      </AbsoluteFill>

      {audioUrl ? (
        <Audio src={audioUrl.startsWith("http") ? audioUrl : staticFile(audioUrl)} />
      ) : null}
    </AbsoluteFill>
  );
};