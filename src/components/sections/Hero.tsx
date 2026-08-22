// ============================================================
// Personal content — update these values to customise the section
// ============================================================
const CONTENT = {
  name: "Yarin Solomon",
  headline: "Full-Stack Software Developer",
  bio:
    "Computer science graduate from Ben-Gurion University (GPA: 85) with expertise in software development and artificial intelligence. " +
    "Demonstrated ability to design complex systems, including AI applications utilizing neural networks and advanced algorithms. " +
    "Particularly interested in API development, microservices architecture, and system integration, while eager to explore diverse backend development paths.",
  ctaLabel: "View My Work",
  ctaHref: "#projects",
  cvPath: "/cv.pdf",
};
// ============================================================

/*
  Hero — the first section the visitor sees.
  Contains: name, headline, short bio, "Open to work" badge, and CTA buttons.

  scroll-mt-20 offsets the section anchor for the sticky navbar height,
  so clicking "About" in the nav scrolls to the correct position.

  This is a Server Component (the default in App Router). It has no interactivity,
  so it doesn't need the "use client" directive. The browser receives pre-rendered HTML
  — faster paint and better SEO than a client-rendered component.
*/
export default function Hero() {
  return (
    <section
      id="about"
      className="mx-auto flex min-h-[90vh] max-w-4xl scroll-mt-20 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <OpenToWorkBadge />
      <Name name={CONTENT.name} />
      <Headline headline={CONTENT.headline} />
      <Bio bio={CONTENT.bio} />
      <CtaButtons ctaLabel={CONTENT.ctaLabel} ctaHref={CONTENT.ctaHref} cvPath={CONTENT.cvPath} />
    </section>
  );
}

/* The "Open to work" indicator pill */
function OpenToWorkBadge() {
  return (
    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-open-ring bg-open-bg px-4 py-1.5 text-sm font-medium text-open-text backdrop-blur-sm">
      {/* Pulsing dot — signals availability at a glance */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-open-glow opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-open-dot" />
      </span>
      Open to work
    </span>
  );
}

/*
  Primary heading. Only the name carries the accent gradient — the greeting
  stays plain. pb-2 gives the gradient text room for its descenders, which
  background-clip would otherwise cut off.
*/
function Name({ name }: { name: string }) {
  return (
    <h1 className="mb-3 pb-2 text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
      Hi, I&apos;m <span className="text-gradient">{name}</span>
    </h1>
  );
}

/* One-line role descriptor */
function Headline({ headline }: { headline: string }) {
  return (
    <p className="mb-6 font-mono text-base font-medium tracking-wide text-body sm:text-lg">
      {headline}
    </p>
  );
}

/* Short bio paragraph */
function Bio({ bio }: { bio: string }) {
  return (
    <p className="mb-10 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
      {bio}
    </p>
  );
}

/*
  Two CTAs side by side:
    - Primary: scrolls to projects (dark filled button)
    - Secondary: downloads CV PDF (outlined button)
*/
function CtaButtons({
  ctaLabel,
  ctaHref,
  cvPath,
}: {
  ctaLabel: string;
  ctaHref: string;
  cvPath: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/*
        Primary CTA. The gradient fill is the brightest element on the page,
        so it reads as the single primary action. The violet shadow ties the
        button to the glow behind it instead of casting a grey drop shadow,
        which never looks right on a dark canvas.
      */}
      <a
        href={ctaHref}
        className="bg-gradient-accent rounded-full px-8 py-3.5 text-sm font-semibold text-canvas shadow-lg shadow-accent-mid/25 transition-all duration-150 hover:shadow-xl hover:shadow-accent-mid/40 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {ctaLabel}
      </a>
      {/* Secondary CTA: glass, so the glow shows through it */}
      <a
        href={cvPath}
        download
        className="rounded-full border border-glass-edge bg-glass px-8 py-3.5 text-sm font-semibold text-dim backdrop-blur-sm transition-all duration-150 hover:border-edge-strong hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-edge-strong focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        Download CV
      </a>
    </div>
  );
}
