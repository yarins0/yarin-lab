"use client";
import { useState } from "react";
import Badge from "./Badge";
import ProjectPreview from "./ProjectPreview";

export type Category = "Fullstack" | "AI Engineering" | "Backend" | "DevOps";

export type Project = {
  name: string;
  description: string;
  categories: Category[];
  techStack: string[];
  // Omitted for projects whose repos are private — the card then shows only the demo link
  githubUrl?: string;
  liveDemoUrl?: string;
  internalDemo?: boolean;
  // Picture, GIF, or video shown in the place of the description. Without it the card shows the text.
  previewUrl?: string;
};

const DESCRIPTION_EXPAND_THRESHOLD = 220;
const VISIBLE_BADGE_COUNT = 5;

export default function ProjectCard({ project }: { project: Project }) {
  return (
    /*
      A glass card: translucent, so the glow behind the page shows through it.
      On hover the border brightens and a violet glow replaces the grey drop
      shadow that would be invisible on a dark canvas.
    */
    <article className="group flex h-full flex-col rounded-2xl border border-glass-edge bg-glass p-6 backdrop-blur-md transition-all duration-200 hover:border-accent-mid/40 hover:shadow-lg hover:shadow-accent-mid/10">
      <ProjectHeader name={project.name} />
      <CategoryBadges categories={project.categories} />
      {project.previewUrl ? (
        <ProjectPreview
          previewUrl={project.previewUrl}
          description={project.description}
          projectName={project.name}
        />
      ) : (
        <ProjectDescription description={project.description} />
      )}
      <TechStack tags={project.techStack} />
      <ProjectLinks
        githubUrl={project.githubUrl}
        liveDemoUrl={project.liveDemoUrl}
        internalDemo={project.internalDemo}
      />
    </article>
  );
}

function ProjectHeader({ name }: { name: string }) {
  return (
    <h3 className="mb-2 text-lg font-semibold text-ink transition-colors duration-150 group-hover:text-accent">
      {name}
    </h3>
  );
}

function CategoryBadges({ categories }: { categories: Category[] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function ProjectDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > DESCRIPTION_EXPAND_THRESHOLD;

  return (
    <div className="mb-4">
      <p className={`text-sm leading-relaxed text-body${isExpanded ? "" : " line-clamp-6"}`}>
        {description}
      </p>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-xs font-medium text-accent hover:underline"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

function TechStack({ tags }: { tags: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = tags.length > VISIBLE_BADGE_COUNT;
  const visibleTags = isExpanded ? tags : tags.slice(0, VISIBLE_BADGE_COUNT);
  const hiddenCount = tags.length - VISIBLE_BADGE_COUNT;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {visibleTags.map((tag) => (
        <Badge key={tag} label={tag} />
      ))}
      {hasMore && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="inline-flex items-center rounded-full bg-divider px-3 py-1 text-xs font-medium text-accent hover:bg-edge"
        >
          +{hiddenCount} more
        </button>
      )}
      {hasMore && isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="inline-flex items-center rounded-full bg-divider px-3 py-1 text-xs font-medium text-accent hover:bg-edge"
        >
          Show less
        </button>
      )}
    </div>
  );
}

function ProjectLinks({
  githubUrl,
  liveDemoUrl,
  internalDemo,
}: {
  githubUrl?: string;
  liveDemoUrl?: string;
  internalDemo?: boolean;
}) {
  return (
    <div className="mt-auto flex items-center gap-4 text-sm font-medium">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim underline-offset-2 transition-colors hover:text-ink hover:underline"
        >
          GitHub →
        </a>
      )}
      {liveDemoUrl && <DemoLink href={liveDemoUrl} internal={internalDemo} />}
    </div>
  );
}

function DemoLink({ href, internal }: { href: string; internal?: boolean }) {
  return (
    <a
      href={href}
      {...(!internal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-accent underline-offset-2 transition-colors hover:text-accent-dark hover:underline"
    >
      Live Demo →
    </a>
  );
}
