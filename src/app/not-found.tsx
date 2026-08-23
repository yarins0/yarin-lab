import Link from "next/link";

/*
  not-found — the branded 404 page.

  Next.js renders this file for any unmatched route, and for any call to
  notFound() from a route handler. It reuses the site tokens and the shared
  .focus-ring, so it never reads as a framework default page.
*/
export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[80dvh] max-w-2xl flex-col items-center justify-center px-6 pt-16 text-center"
    >
      <p className="mb-4 font-mono text-sm font-medium tracking-widest text-faint">
        ERROR 404
      </p>
      <h1 className="mb-4 pb-2 text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl">
        This page <span className="text-gradient">does not exist</span>
      </h1>
      <p className="mb-10 text-base leading-relaxed text-pretty text-body">
        The link is broken, or the page moved. Every section of the site is
        reachable from the home page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="focus-ring bg-gradient-accent rounded-full px-8 py-3.5 text-sm font-semibold text-canvas shadow-lg shadow-accent-mid/25 transition duration-150 hover:shadow-xl hover:shadow-accent-mid/40 hover:brightness-110 active:scale-[0.97]"
        >
          Back to Home
        </Link>
        <Link
          href="/#projects"
          className="focus-ring rounded-full border border-glass-edge bg-glass px-8 py-3.5 text-sm font-semibold text-dim backdrop-blur-sm transition duration-150 hover:border-edge-strong hover:text-ink active:scale-[0.97]"
        >
          See the Projects
        </Link>
      </div>
    </main>
  );
}
