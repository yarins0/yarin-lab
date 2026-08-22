import { type Project } from "@/components/ui/ProjectCard";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

// ============================================================
// Project data — add, remove, or update entries to change the grid
// ============================================================
// GitHub profile link shown in the section subtitle
const GITHUB_PROFILE_URL = "https://github.com/yarins0";

const PROJECTS: Project[] = [
  {
    name: "AI Conductor",
    categories: ["AI Engineering", "Fullstack"],
    description:
      "A two-agent system for building and running voice AI assistants. " +
      "A Builder turns a natural-language description into a structured Assistant Spec via Claude structured outputs, " +
      "then edits that spec through a bounded tool-calling loop with self-correction and a whole-spec regeneration fallback. " +
      "The spec then runs live: the operator talks to the assistant over OpenAI Realtime via WebRTC, " +
      "and its reach tool can place a real phone call bridged server-side to a second Realtime session over Twilio Media Streams — " +
      "both sides speak G.711 mu-law, so the bridge is a byte-for-byte relay. " +
      "Tools (reach, qualify, book) are invoked non-linearly, and every outcome lands in a shared SQLite context store.",
    techStack: ["OpenAI Realtime API", "Anthropic Claude API", "WebRTC", "Twilio Media Streams", "Python", "FastAPI", "Pydantic", "SQLite", "Server-Sent Events", "Google Calendar API"],
    githubUrl: `${GITHUB_PROFILE_URL}/ai-conductor`,
  },
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
    name: "Reign & Gain",
    categories: ["Backend", "Fullstack"],
    description:
      "A mobile fitness RPG where verified real-world workouts drive turn-based roguelite progression — " +
      "XP, stats, gold, and loot. The Unity 6 client is built entirely in C# at runtime: no prefabs, one near-empty " +
      "bootstrap scene, and procedurally generated UI textures instead of art assets. " +
      "Combat rules live in a pure synchronous engine with no Unity types in the maths, driven by seeded RNG " +
      "so any run reproduces from its seed, and covered by an EditMode suite plus an autopilot that walks a full run unattended. " +
      "Behind it, the client is untrusted: a Kotlin host reads Health Connect on-device and uploads raw signals — never a verdict — " +
      "and a Fastify server re-scores them through composable signal checkers before awarding anything. " +
      "Reward formulas live in Postgres, tunable without a redeploy, with row-level security keeping every authoritative table server-write-only.",
    techStack: ["Unity 6", "C#", "Fastify", "Node.js", "TypeScript", "Kotlin", "PostgreSQL", "Supabase", "Zod", "Row-Level Security", "REST APIs", "Testcontainers"],
    liveDemoUrl: "https://getsweatygames.com/reignandgain",
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
    previewUrl: "/backgammon/backgammon_demo.gif",
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
    name: "Name Generator on AWS EKS",
    categories: ["DevOps"],
    description:
      "A small Express and MongoDB app used as the vehicle for a full production deployment to AWS EKS in Auto Mode. " +
      "Terraform provisions the VPC, the cluster, the ECR repository, and an OIDC-federated IAM role, " +
      "so GitHub Actions builds and rolls out images without any long-lived AWS keys. " +
      "MongoDB runs as a StatefulSet on an EBS-backed volume, kube-prometheus-stack supplies Prometheus and a custom Grafana dashboard, " +
      "and a scripted teardown destroys everything in dependency order so no orphaned volume keeps billing.",
    techStack: ["Terraform", "AWS EKS", "Kubernetes", "Docker", "GitHub Actions", "Helm", "Prometheus", "Grafana", "Amazon ECR", "Node.js", "Express", "MongoDB"],
    githubUrl: `${GITHUB_PROFILE_URL}/random-name-gen-app`,
  },
  {
    name: "MusicSwipe",
    categories: ["Fullstack"],
    description:
      "Swipe through a Spotify playlist Tinder-style while each track plays live; liked tracks land in one or more destination playlists. " +
      "Built in React Native (Expo) behind a platform adapter boundary — every Spotify call sits inside one adapter, " +
      "and the UI reads capability flags instead of checking which platform it is on. " +
      "Swipes write to local Zustand state first and sync fire-and-forget to an Express and Supabase backend, " +
      "while playlist writes are queued and retried with exponential backoff so they never block the swipe UI.",
    techStack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Express", "Node.js", "Zustand", "OAuth 2.0 PKCE", "Spotify Web API", "Jest"],
    githubUrl: `${GITHUB_PROFILE_URL}/music-swipe`,
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

