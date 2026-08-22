/*
  GlowBackdrop — the two coloured light fields behind the whole page.

  Input: none. Output: a fixed, full-viewport layer holding two blurred blobs.

  It renders once in the root layout, not once per section, so the blobs stay
  fixed to the viewport and drift as the visitor scrolls.

  This is a Server Component. All of the motion lives in CSS (`.glow` in
  globals.css), so no client-side JavaScript ships for it.

  -z-10 places the layer behind the page content but still above the body
  background. pointer-events-none keeps it from intercepting any click.
  overflow-hidden stops the oversized blobs from creating a scrollbar.
*/
export default function GlowBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="glow glow-a" />
      <div className="glow glow-b" />
    </div>
  );
}
