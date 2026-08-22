import { type Project } from "@/components/ui/ProjectCard";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// ============================================================
// Project data — add, remove, or update entries to change the grid
// ============================================================
// GitHub profile link shown in the section subtitle
const GITHUB_PROFILE_URL = "https://github.com/yarins0";

const PROJECTS: Project[] = [
  {
    name: "Job Screening Agent",
    categories: ["AI Engineering", "Backend"],
    description:
      "Personal job screening agent that monitors WhatsApp groups and Telegram channels " +
      "for job postings using Claude Haiku via the Anthropic SDK with Pydantic-enforced structured outputs. " +
      "Built on a LangGraph StateGraph with adaptive mode selection — groups automatically switch " +
      "from two-call (classify → extract) to a single combined call once they exceed a 70% job-post rate. " +
      "Delivers instant Telegram alerts with one-tap Block Role / Block City buttons, a daily digest, " +
      "semantic similarity search via ChromaDB, and a natural-language /ask command. " +
      "Includes a public Telegram bot for live querying — available when the agent is running.",
    techStack: ["Anthropic Claude API", "LangGraph", "Python", "FastAPI", "Telethon", "whatsapp-web.js", "Node.js", "ChromaDB", "SQLite", "APScheduler", "BeautifulSoup", "Pydantic"],
    githubUrl: `${GITHUB_PROFILE_URL}/whatsapp-job-screener`,
    liveDemoUrl: "https://t.me/myjobscreener_bot",
  },
  {
    name: "Backgammon AI",
    categories: ["Backend"],
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
    name: "Meeting Transcription System",
    categories: ["AI Engineering", "Fullstack"],
    description:
      "Upload an audio recording and receive a full transcript, structured summary, participant list, decisions, and action items. " +
      "Uses OpenAI Whisper for transcription via a provider-swappable interface and Claude (claude-sonnet-4-6) for structured summarization over SSE. " +
      "Handles files over 24 MB by computing an optimal FFmpeg bitrate from duration to compress audio just under the API limit before upload. " +
      "Exports results as a formatted .docx file with RTL support for Hebrew.",
    techStack: ["React", "TypeScript", "Vite", "FastAPI", "Python", "OpenAI Whisper API", "Anthropic Claude API", "python-docx", "FFmpeg", "Docker"],
    githubUrl: `${GITHUB_PROFILE_URL}/meeting-transcription-system`,
    liveDemoUrl: "https://meeting-transcription-system.vercel.app/",
  },
  {
    name: "TuneCraft",
    categories: ["Fullstack"],
    description:
      "Full-stack playlist manager for Spotify, SoundCloud, and Tidal. " +
      "Features composable shuffle algorithms (artist spread, genre spread, chronological mix), " +
      "automated reshuffles via a background cron job, and tools to merge, split, and deduplicate playlists. " +
      "Enriches every track with audio features and genre tags via the ReccoBeats and Last.fm APIs.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "OAuth 2.0", "REST APIs", "JWT", "Vite"],
    githubUrl: `${GITHUB_PROFILE_URL}/TuneCraft`,
    liveDemoUrl: "https://tune-craft-seven.vercel.app/",
  },
  {
    name: "faceb00k.com",
    categories: ["Backend"],
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

