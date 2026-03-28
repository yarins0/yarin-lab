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
    desc: "Depth-limited minimax search with alpha-beta pruning over the heuristic evaluator.",
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
        className="mx-auto block max-h-80 w-auto"
      />
    </div>
  );
}

function DownloadCard() {
  return (
    <div className="mb-12 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-edge bg-canvas-tint px-7 py-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-faint">
          Windows executable
        </span>
        <span className="text-base font-semibold text-ink">BackgammonAI.exe</span>
        <span className="text-sm text-body">
          Requires Windows 10 or later &middot; No install needed
        </span>
      </div>
      <a
        href="/backgammon/BackgammonAI.exe"
        download
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
      </a>
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
