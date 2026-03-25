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
      "A full-stack web app with user authentication, real-time updates, and a REST API. Built to explore end-to-end TypeScript across the entire stack.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Railway", "Vercel"],
    githubUrl: `${GITHUB_PROFILE_URL}/TuneCraft`,
    liveDemoUrl: "https://tune-craft-seven.vercel.app/",
  },
  {
    name: "Backgammon Bots",
    description:
      "A Python implementation of the classic board game Backgammon, featuring both human and AI players. This project allows you to play against an AI opponent or watch two AI players compete against each other. The AI uses different strategies for decision making.",
    techStack: ["Python"],
    githubUrl: `${GITHUB_PROFILE_URL}/Backgammon_Mini`,
  },
  {
    name: "faceb00k.com",
    description:
      "A demonstration web application that mimics the login and registration flow of Facebook. Collects user information and securely stores it in a MySQL database using a Node.js backend. The frontend is designed to resemble Facebook's familiar interface.",
    techStack: ["Node.js", "MySQL", "HTML5"],
    githubUrl: `${GITHUB_PROFILE_URL}/faceb00k.com`,
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
