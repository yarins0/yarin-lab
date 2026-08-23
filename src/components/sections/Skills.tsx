import Badge from "@/components/ui/Badge";

// ============================================================
// Skills data — update groups and tags to match your actual stack
// ============================================================
const SKILL_GROUPS: { category: string; tags: string[] }[] = [
  {
    category: "Languages",
    tags: ["Python", "Java", "Kotlin", "C", "C#", "C++", "JavaScript", "TypeScript", "Assembly"],
  },
  {
    category: "Web / Full-Stack",
    tags: ["React", "React Native", "Expo", "Next.js", "Node.js", "Express", "Fastify", "Vite", "HTML", "CSS", "Tailwind CSS", "REST APIs", "OAuth 2.0", "JWT",  "FastAPI", "WebRTC", "Twilio"],
  },
  {
    category: "Databases",
    tags: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Prisma ORM", "SQL", "NoSQL", "SQLite", "ChromaDB"],
  },
  {
    category: "DevOps & Tools",
    tags: ["AWS", "AWS EKS", "Terraform (IaC)", "Docker", "Kubernetes", "Helm", "Prometheus", "Grafana", "Git", "GitHub", "GitHub Actions", "CI/CD", "Linux Servers & VMs", "Networks", "Claude Code", "Cursor"],
  },
  {
    category: "ML & AI",
    tags: ["PyTorch", "LangChain", "LangGraph", "Anthropic Claude API", "OpenAI Realtime API", "OpenAI Whisper API"],
  },
  {
    category: "Operating Systems & Platforms",
    tags: ["Windows", "UNIX", "Linux", "Unity 6", "VS Code", "PyCharm"],
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
      {/* Right-aligned so short labels sit next to the pills instead of leaving a ragged gutter */}
      <span className="shrink-0 text-sm font-semibold text-faint sm:w-40 sm:pt-1 sm:text-right">
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
