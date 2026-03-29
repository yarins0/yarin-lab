import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Backgammon AI — Yarin Solomon",
  description:
    "Backgammon engine with five AI opponents: random, heuristic, minimax, MCTS, and neural network.",
};

const BOTS = [
  {
    rank: "Level 1",
    name: "Random",
    desc: "Plays legal moves at random — useful as a baseline.",
  },
  {
    rank: "Level 2",
    name: "Heuristic",
    desc: "Six-feature weighted evaluation function — hit blots, prime builders, home-board coverage.",
  },
  {
    rank: "Level 3",
    name: "Minimax",
    desc: "Depth-limited minimax search over the heuristic evaluator.",
  },
  {
    rank: "Level 4",
    name: "MCTS",
    desc: "Monte Carlo Tree Search with UCB1 selection — balances exploration and exploitation.",
  },
  {
    rank: "Level 5",
    name: "Neural Network",
    desc: "PyTorch model trained to outperform the heuristic bot — ~60% win rate against it.",
  },
];

const TECH = ["Python", "PyTorch", "Tkinter", "Docker"];

export default function BackgammonPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-8">

      <BackLink />
      <Hero />
      <DownloadCard />
      <DemoPreview />

      <SectionLabel>AI Opponents</SectionLabel>
      <BotsGrid />

      <SectionLabel>Tech Stack</SectionLabel>
      <TechTags />

      <PageFooter />
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="mb-10 inline-flex items-center gap-1.5 text-sm text-faint hover:text-ink transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back to portfolio
    </Link>
  );
}

function Hero() {
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
        Project Demo
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink">
        Backgammon AI
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-body">
        A full Backgammon engine with five AI opponents of increasing
        sophistication, a tournament mode that runs any combination of bots
        round-robin, and per-bot parameter tuning via a setup UI — no code
        changes required.
      </p>
    </div>
  );
}

function DemoPreview() {
  return (
    <div className="mb-12 overflow-hidden rounded-xl border border-edge bg-canvas-tint">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backgammon/backgammon_demo.gif"
        alt="Backgammon AI gameplay demo"
        className="mx-auto block max-h-[600px] w-auto"
      />
    </div>
  );
}

const DOWNLOAD_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

type DownloadOption = {
  platform: string;
  label: string;
  filename: string;
  note: string;
  href: string | null; // null = coming soon
};

const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    platform: "Windows",
    label: "Download (zip)",
    filename: "BackgammonAI_windows.zip",
    note: "Extract and run from inside the folder · Launches instantly",
    href: "https://github.com/yarins0/Backgammon_Mini/releases/download/v1.0.0/BackgammonAI_windows.zip",
  },
  {
    platform: "Windows",
    label: "Download (portable .exe)",
    filename: "BackgammonAI.exe",
    note: "Single file, run from anywhere · First launch takes ~60 s",
    href: "https://github.com/yarins0/Backgammon_Mini/releases/download/v1.0.0/BackgammonAI.exe",
  },
  {
    platform: "macOS",
    label: "Download (.app zip)",
    filename: "BackgammonAI_mac.zip",
    note: "Extract and double-click BackgammonAI.app to run",
    href: "https://github.com/yarins0/Backgammon_Mini/releases/download/v1.0.0/BackgammonAI_macos.zip",
  },
];

function DownloadCard() {
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-faint">
        Downloads &middot; Windows 10+ &middot; No install needed
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {DOWNLOAD_OPTIONS.map((opt) => (
          <DownloadOption key={opt.filename} opt={opt} />
        ))}
      </div>
    </div>
  );
}

function DownloadOption({ opt }: { opt: DownloadOption }) {
  const isAvailable = opt.href !== null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-edge bg-canvas-tint px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-faint">
          {opt.platform}
        </span>
        <span className="text-sm font-semibold text-ink">{opt.filename}</span>
        <span className="text-xs leading-relaxed text-body">{opt.note}</span>
      </div>
      {isAvailable ? (
        <a
          href={opt.href!}
          download
          className="mt-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {DOWNLOAD_ICON}
          {opt.label}
        </a>
      ) : (
        <span className="mt-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-edge px-4 py-2 text-xs font-semibold text-faint">
          {opt.label}
        </span>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-faint">
      {children}
    </h2>
  );
}

function BotsGrid() {
  return (
    <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {BOTS.map((bot) => (
        <div
          key={bot.name}
          className="rounded-xl border border-edge bg-canvas-tint p-4"
        >
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
            {bot.rank}
          </div>
          <div className="mb-1 text-sm font-semibold text-ink">{bot.name}</div>
          <div className="text-xs leading-relaxed text-body">{bot.desc}</div>
        </div>
      ))}
    </div>
  );
}

function TechTags() {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {TECH.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-edge bg-divider px-2.5 py-1 text-xs font-medium text-body"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-5 text-xs text-faint">
      <span>Backgammon AI &copy; 2025</span>
      <a
        href="https://github.com/yarins0/Backgammon_Mini"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-ink"
      >
        View source on GitHub
      </a>
    </footer>
  );
}
