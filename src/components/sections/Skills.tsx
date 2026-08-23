import Badge from "@/components/ui/Badge";

// ============================================================
// Skills data — update groups and tags to match your actual stack
// ============================================================
const SKILL_GROUPS: { category: string; tags: string[] }[] = [
  {
    category: "Languages",
    tags: ["Python", "TypeScript", "JavaScript", "Java", "C#", "Kotlin"],
  },
  {
    category: "Web & Full-Stack",
    tags: ["React", "Next.js", "Node.js", "Express", "FastAPI", "REST APIs"],
  },
  {
    category: "AI & ML",
    tags: ["Anthropic Claude API", "PyTorch", "LangChain", "LangGraph", "OpenAI Realtime API", "OpenAI Whisper API"],
  },
  {
    category: "Databases",
    tags: ["PostgreSQL", "Supabase", "SQLite", "MongoDB", "ChromaDB"],
  },
  {
    category: "DevOps & Cloud",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
];
// ============================================================

/*
  Skills — a curated grid of category cards, each a short highlight list rather
  than an exhaustive inventory (the project cards already carry full tech stacks).
  Reuses Badge directly — same component used in ProjectCard tech stacks.
*/
export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14"
    >
      <SectionHeader />
      <SkillGroups groups={SKILL_GROUPS} />
    </section>
  );
}

function SectionHeader() {
  return (
    /* Left-aligned to match Projects, so both section headers share one edge */
    <div className="mb-10">
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
        Skills
      </h2>
      <p className="max-w-prose text-base text-pretty text-body">
        Technologies and tools I work with.
      </p>
    </div>
  );
}

/* Renders skill groups as cards in a responsive grid */
function SkillGroups({
  groups,
}: {
  groups: { category: string; tags: string[] }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <SkillGroup key={group.category} group={group} />
      ))}
    </div>
  );
}

/* A single category card: heading on top, badges flowing below — mirrors ProjectCard's glass style */
function SkillGroup({
  group,
}: {
  group: { category: string; tags: string[] };
}) {
  return (
    <div className="rounded-2xl border border-glass-edge bg-glass p-6 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-accent-mid/40 hover:shadow-lg hover:shadow-accent-mid/10">
      <h3 className="mb-3 text-sm font-semibold text-faint">{group.category}</h3>
      <div className="flex flex-wrap gap-2">
        {group.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
