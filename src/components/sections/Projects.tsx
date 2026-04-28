import { type Project } from "@/components/ui/ProjectCard";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// ============================================================
// Project data — add, remove, or update entries to change the grid
// ============================================================
// GitHub profile link shown in the section subtitle
const GITHUB_PROFILE_URL = "https://github.com/yarins0";

const PROJECTS: Project[] = [
  {
    name: "TuneCraft",
    description:
      "Full-stack playlist manager for Spotify, SoundCloud, and Tidal. " +
      "Features composable shuffle algorithms (artist spread, genre spread, chronological mix), " +
      "automated reshuffles via a background cron job, and tools to merge, split, and deduplicate playlists. " +
      "Enriches every track with audio features and genre tags via the ReccoBeats and Last.fm APIs.",
    techStack: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Railway", "Vercel", "REST APIs", "OAuth 2.0", "JWT"],
    githubUrl: `${GITHUB_PROFILE_URL}/TuneCraft`,
    liveDemoUrl: "https://tune-craft-seven.vercel.app/",
  },
  {
    name: "Backgammon AI",
    description:
      "Full Backgammon engine with five AI opponents of increasing sophistication: random, " +
      "heuristic (six-feature weighted evaluation), depth-limited minimax, MCTS with UCB1, " +
      "and a PyTorch neural network trained to outperform the heuristic (~60% win rate). " +
      "Includes a tournament mode that runs any combination of bots round-robin, " +
      "with per-bot parameter tuning via a setup UI — no code changes required.",
    techStack: ["Python", "PyTorch", "Tkinter", "PyInstaller"],
    githubUrl: `${GITHUB_PROFILE_URL}/Backgammon_Mini`,
    liveDemoUrl: "/backgammon/",
    internalDemo: true,
  },
  {
    name: "WhatsApp Job Screener",
    description:
      "LangChain agent that monitors WhatsApp groups for job postings, classifies each message with Claude Haiku, " +
      "extracts structured fields (title, company, location, skills, salary, remote), " +
      "deduplicates via SQLite hash checks, and filters against personal preferences. " +
      "Forwards matches as instant Telegram alerts and a scheduled daily digest. " +
      "Covers the core LangChain primitives: LCEL chains, AgentExecutor tools, Pydantic output parsers, and LangSmith tracing.",
    techStack: ["Python", "LangChain", "FastAPI", "Claude Haiku", "SQLite", "APScheduler", "Node.js", "whatsapp-web.js", "Telegram Bot API", "LangSmith"],
    githubUrl: "https://github.com/yarins0/whatsapp-job-screener",
  },
  {
    name: "faceb00k.com",
    description:
      "A BGU university security assignment replicating Facebook's login and registration UI. " +
      "Demonstrates credential harvesting techniques, SQL injection prevention via parameterised queries, " +
      "and HTTP security headers (helmet.js) — built to explore the gap between a convincing phishing " +
      "interface and secure backend practices.",
    techStack: ["Node.js", "Express", "MySQL", "HTML5", "CSS3"],
    githubUrl: `${GITHUB_PROFILE_URL}/faceb00k.com`,
    liveDemoUrl: "/faceb00k/",
  },
];
// ============================================================

/*
  Projects — a section displaying a grid of project cards.

  Layout: a two-column grid on medium screens and up, single column on mobile.
  Cards size naturally to their content, which looks better with varying descriptions.
*/
export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-4xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeader githubUrl={GITHUB_PROFILE_URL} />
      <ProjectCarousel projects={PROJECTS} />
    </section>
  );
}

/* Section title and subtitle */
function SectionHeader({ githubUrl }: { githubUrl: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Projects
      </h2>
      <p className="text-base text-body">
        A selection of things I&apos;ve built. More on{" "}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}

