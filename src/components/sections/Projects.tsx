import ProjectCard, { type Project } from "@/components/ui/ProjectCard";

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
    techStack: ["React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Railway", "Vercel"],
    githubUrl: `${GITHUB_PROFILE_URL}/TuneCraft`,
    liveDemoUrl: "https://tune-craft-seven.vercel.app/",
  },
  {
    name: "Backgammon Bots",
    description:
      "Playable Backgammon with five interchangeable AI players: random, heuristic (weighted board evaluation), " +
      "minimax with alpha-beta pruning, Monte Carlo Tree Search, and a trained PyTorch neural network. " +
      "Supports human vs. AI and AI vs. AI modes with a Tkinter GUI. Containerised with Docker.",
    techStack: ["Python", "PyTorch", "Docker"],
    githubUrl: `${GITHUB_PROFILE_URL}/Backgammon_Mini`,
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
      <ProjectGrid projects={PROJECTS} />
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

/* Renders the responsive card grid */
function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
