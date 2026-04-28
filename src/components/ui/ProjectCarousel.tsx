"use client";
import { useRef } from "react";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * container.offsetWidth, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="w-[80%] flex-none snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous projects"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-dim transition-colors hover:border-ink hover:text-ink"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next projects"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-dim transition-colors hover:border-ink hover:text-ink"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
