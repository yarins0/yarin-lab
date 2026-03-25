/*
  not-found.tsx — rendered whenever Next.js encounters a 404.
  Named `not-found.tsx` by App Router convention — the filename is the trigger.
*/
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-6xl font-bold text-ink">404</p>
      <p className="mb-8 text-lg text-body">This page doesn&apos;t exist.</p>
      <a
        href="/"
        className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-canvas shadow-sm transition-all hover:bg-ink-soft"
      >
        Back to home
      </a>
    </main>
  );
}
