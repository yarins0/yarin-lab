"use client";
import { useState } from "react";
import Badge from "./Badge";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  internalDemo?: boolean;
};

const DESCRIPTION_EXPAND_THRESHOLD = 220;
const VISIBLE_BADGE_COUNT = 5;

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-edge bg-canvas p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <ProjectHeader name={project.name} />
      <ProjectDescription description={project.description} />
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
  githubUrl: string;
  liveDemoUrl?: string;
  internalDemo?: boolean;
}) {
  return (
    <div className="mt-auto flex items-center gap-4 text-sm font-medium">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-dim underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        GitHub →
      </a>
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
