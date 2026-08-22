"use client";
import { useMemo, useRef, useState } from "react";
import ProjectCard, { type Category, type Project } from "@/components/ui/ProjectCard";

interface ProjectCarouselProps {
  projects: Project[];
}

function toggleValue<T>(selected: T[], value: T): T[] {
  return selected.includes(value)
    ? selected.filter((selectedValue) => selectedValue !== value)
    : [...selected, value];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const availableCategories = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.categories))),
    [projects],
  );
  const availableSkills = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.techStack))).sort(),
    [projects],
  );
  const visibleProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      project.categories.some((category) => selectedCategories.includes(category));
    const matchesSkill =
      selectedSkills.length === 0 ||
      project.techStack.some((skill) => selectedSkills.includes(skill));
    return matchesCategory && matchesSkill;
  });

  function scroll(direction: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * container.offsetWidth, behavior: "smooth" });
  }

  return (
    <div>
      <FilterBar
        options={availableCategories}
        selected={selectedCategories}
        onToggle={(category) => setSelectedCategories((current) => toggleValue(current, category))}
        onClear={() => setSelectedCategories([])}
        className="mb-3"
      />
      <FilterBar
        options={availableSkills}
        selected={selectedSkills}
        onToggle={(skill) => setSelectedSkills((current) => toggleValue(current, skill))}
        onClear={() => setSelectedSkills([])}
        className="mb-6"
      />
      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {visibleProjects.map((project) => (
          <div
            key={project.name}
            className="flex w-[80%] flex-none snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
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

function FilterBar<T extends string>({
  options,
  selected,
  onToggle,
  onClear,
  className,
}: {
  options: T[];
  selected: T[];
  onToggle: (option: T) => void;
  onClear: () => void;
  className: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <FilterButton isActive={selected.length === 0} onClick={onClear} label="All" />
      {options.map((option) => (
        <FilterButton
          key={option}
          isActive={selected.includes(option)}
          onClick={() => onToggle(option)}
          label={option}
        />
      ))}
    </div>
  );
}

function FilterButton({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "border-accent bg-accent text-white"
          : "border-edge text-dim hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
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
