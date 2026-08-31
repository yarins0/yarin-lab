"use client";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const VIDEO_EXTENSIONS = [".mp4", ".webm"];

type ProjectPreviewProps = {
  previewUrl: string;
  description: string;
  projectName: string;
};

function isVideoFile(url: string): boolean {
  return VIDEO_EXTENSIONS.some((extension) => url.toLowerCase().endsWith(extension));
}

/*
  ProjectPreview — shows a picture, GIF, or video in the place of the description.

  Input: the media URL, the description text, and the project name (used for the alt text).
  Output: a 16:9 media box. The description covers the media on hover, on keyboard focus,
  and on tap. A touch screen has no hover, so the click handler toggles the same overlay.
*/
export default function ProjectPreview({
  previewUrl,
  description,
  projectName,
}: ProjectPreviewProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    /* Not `relative`: the overlay below anchors to the card, so the card must stay the positioned ancestor */
    <div className="mb-4">
      <button
        type="button"
        aria-expanded={isDescriptionVisible}
        aria-label={`Show the description of ${projectName}`}
        onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
        onMouseEnter={() => setIsDescriptionVisible(true)}
        onMouseLeave={() => setIsDescriptionVisible(false)}
        onFocus={() => setIsDescriptionVisible(true)}
        onBlur={() => setIsDescriptionVisible(false)}
        className="focus-ring block aspect-video w-full overflow-hidden rounded-xl border border-edge bg-divider"
      >
        <PreviewMedia previewUrl={previewUrl} projectName={projectName} />
      </button>
      {/*
        The overlay covers the whole card, not just the media box. A box sized to
        the media grew past the card to fit a long description, and that overflow
        made the carousel row scrollable on the vertical axis.
      */}
      <span
        aria-hidden={!isDescriptionVisible}
        className={`pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl border border-glass-edge bg-canvas/90 p-6 text-sm leading-relaxed text-body shadow-lg backdrop-blur-xl transition-opacity duration-200 ${
          isDescriptionVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {description}
      </span>
    </div>
  );
}

/* Picks the element for the file type. The extension decides: video files play, everything else is an image. */
function PreviewMedia({
  previewUrl,
  projectName,
}: {
  previewUrl: string;
  projectName: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (isVideoFile(previewUrl)) {
    return (
      <video
        src={previewUrl}
        muted
        loop
        // A decorative loop must not play on its own when the visitor asked for
        // reduced motion. The controls then let them start it deliberately.
        autoPlay={!prefersReducedMotion}
        controls={prefersReducedMotion}
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    // next/image is not used here: it re-encodes animated GIFs and loses the animation
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={previewUrl}
      alt={`${projectName} preview`}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );
}
