import Badge from "@/components/ui/Badge";

// ============================================================
// Skills data — update groups and tags to match your actual stack
// ============================================================
const SKILL_GROUPS: { category: string; tags: string[] }[] = [
  {
    category: "Languages",
    tags: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "Assembly"],
  },
  {
    category: "Web / Full-Stack",
    tags: ["React", "Next.js", "Node.js", "Express", "Vite", "HTML", "CSS", "Tailwind CSS", "REST APIs", "OAuth 2.0", "JWT",  "FastAPI"],
  },
  {
    category: "Databases",
    tags: ["PostgreSQL", "MySQL", "Prisma ORM", "SQL", "NoSQL", "SQLite"],
  },
  {
    category: "DevOps & Tools",
    tags: ["Git", "GitHub", "Docker"],
  },
  {
    category: "ML & AI",
    tags: ["PyTorch", "LangChain"],
  },
  {
    category: "Platforms",
    tags: ["Vercel", "Railway", "Windows", "UNIX", "Linux"],
  },
];
// ============================================================

/*
  Skills — a section listing technical competencies grouped by category.
  Each group renders a label followed by a row of Badge pills.
  Reuses Badge directly — same component used in ProjectCard tech stacks.
*/
export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-4xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeader />
      <SkillGroups groups={SKILL_GROUPS} />
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Skills
      </h2>
      <p className="text-base text-body">
        Technologies and tools I work with.
      </p>
    </div>
  );
}

/* Renders all skill groups stacked vertically */
function SkillGroups({
  groups,
}: {
  groups: { category: string; tags: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <SkillGroup key={group.category} group={group} />
      ))}
    </div>
  );
}

/* A single category row: label on the left, badges on the right */
function SkillGroup({
  group,
}: {
  group: { category: string; tags: string[] };
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
      <span className="w-32 shrink-0 text-sm font-semibold text-faint sm:pt-1">
        {group.category}
      </span>
      <div className="flex flex-wrap gap-2">
        {group.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
