import Badge from "./Badge";

/*
  The shape of data a ProjectCard expects.
  Defining it as a TypeScript `type` here means:
    1. The component is self-documenting — you can see exactly what it needs.
    2. TypeScript will error if you forget a required field.
  Exporting it allows the Projects section (and future pages) to reuse this type.
*/
export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string; // optional — not every project has a live demo
};

/*
  ProjectCard — displays a single project with its name, description,
  tech stack badges, and action links.

  Props: a single `project` object of type Project (defined above).

  Layout breakdown:
    - The outer <article> is the card shell with border, shadow, and hover lift.
    - Inside: a flex column with the content at the top and links pinned to the bottom.
    - `group` on the article enables the `group-hover:` variant on child elements.
*/
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-edge bg-canvas p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <ProjectHeader name={project.name} />
      <ProjectDescription description={project.description} />
      <TechStack tags={project.techStack} />
      <ProjectLinks githubUrl={project.githubUrl} liveDemoUrl={project.liveDemoUrl} />
    </article>
  );
}

/* Renders the project name */
function ProjectHeader({ name }: { name: string }) {
  return (
    <h3 className="mb-2 text-lg font-semibold text-ink transition-colors duration-150 group-hover:text-accent">
      {name}
    </h3>
  );
}

/* Renders the short description paragraph */
function ProjectDescription({ description }: { description: string }) {
  return (
    <p className="mb-4 flex-1 text-sm leading-relaxed text-body">
      {description}
    </p>
  );
}

/* Renders the row of tech stack Badge pills */
function TechStack({ tags }: { tags: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} label={tag} />
      ))}
    </div>
  );
}

/* Renders the GitHub and Live Demo links */
function ProjectLinks({
  githubUrl,
  liveDemoUrl,
}: {
  githubUrl: string;
  liveDemoUrl?: string;
}) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-dim underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        GitHub →
      </a>
      {liveDemoUrl && (
        <a
          href={liveDemoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 transition-colors hover:text-accent-dark hover:underline"
        >
          Live Demo →
        </a>
      )}
    </div>
  );
}
