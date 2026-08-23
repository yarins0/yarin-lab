import { ImageResponse } from "next/og";

/*
  opengraph-image — the picture Slack, LinkedIn, and iMessage show for a link
  to the site.

  This is a Next.js file convention: the framework calls the default export at
  build time, injects the resulting <meta property="og:image"> tags, and serves
  the PNG. No image file is committed, so the card can never drift from the site.

  `next/og` renders through Satori, which supports a subset of CSS. Keep the
  markup to flexbox, plain colours, and the gradient below.
*/
export const alt = "Yarin Solomon — Full-Stack Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CANVAS = "#0a0a0f";
const INK = "#f4f4f5";
const BODY = "#a1a1aa";
const ACCENT_RAMP = "linear-gradient(100deg, #a78bfa 0%, #22d3ee 100%)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: CANVAS,
          // Stands in for the two glow blobs, which Satori cannot blur
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(124,58,237,0.45) 0%, transparent 45%), radial-gradient(circle at 92% 96%, rgba(8,145,178,0.40) 0%, transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: INK }}>
          Yarin Solomon
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 44,
            fontWeight: 600,
            backgroundImage: ACCENT_RAMP,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Full-Stack Software Developer
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 27, color: BODY }}>
          AI systems · APIs · Microservices · DevOps
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 54,
            height: 6,
            width: 210,
            borderRadius: 3,
            backgroundImage: ACCENT_RAMP,
          }}
        />
      </div>
    ),
    size,
  );
}
