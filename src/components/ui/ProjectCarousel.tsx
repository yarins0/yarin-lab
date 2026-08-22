"use client";
import { useMemo, useRef, useState, type ReactNode } from "react";
import ProjectCard, { type Category, type Project } from "@/components/ui/ProjectCard";

interface ProjectCarouselProps {
  projects: Project[];
}

function toggleValue<T>(selected: T[], value: T): T[] {
  return selected.includes(value)
    ? selected.filter((selectedValue) => selectedValue !== value)
    : [...selected, value];
}

const SKILLS_PREVIEW_COUNT = 15;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const availableCategories = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.categories))),
    [projects],
  );
  // Skill options narrow to the selected categories, one-directional: category filters skills, not the reverse.
  const categoryFilteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          selectedCategories.length === 0 ||
          project.categories.some((category) => selectedCategories.includes(category)),
      ),
    [projects, selectedCategories],
  );
  // Relevance = how many of the currently visible projects use the skill; most-used first.
  const availableSkills = useMemo(() => {
    const skillCounts = new Map<string, number>();
    categoryFilteredProjects.forEach((project) =>
      project.techStack.forEach((skill) => skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1)),
    );
    return Array.from(skillCounts.keys()).sort(
      (a, b) => skillCounts.get(b)! - skillCounts.get(a)! || a.localeCompare(b),
    );
  }, [categoryFilteredProjects]);
  const visibleSkillOptions = showAllSkills ? availableSkills : availableSkills.slice(0, SKILLS_PREVIEW_COUNT);
  // Drops selections that fell out of range when the category filter narrowed the skill options.
  const activeSkills = useMemo(
    () => selectedSkills.filter((skill) => availableSkills.includes(skill)),
    [selectedSkills, availableSkills],
  );
  const visibleProjects = categoryFilteredProjects.filter((project) => {
    const matchesSkill =
      activeSkills.length === 0 || project.techStack.some((skill) => activeSkills.includes(skill));
    return matchesSkill;
  });

  const hasActiveFilters = selectedCategories.length > 0 || selectedSkills.length > 0;

  function scroll(direction: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * container.offsetWidth, behavior: "smooth" });
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedSkills([]);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <FilterBar
          options={availableCategories}
          selected={selectedCategories}
          onToggle={(category) => setSelectedCategories((current) => toggleValue(current, category))}
          onClear={() => setSelectedCategories([])}
          className=""
        />
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="shrink-0 text-sm font-medium text-dim underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
      <FilterBar
        options={visibleSkillOptions}
        selected={activeSkills}
        onToggle={(skill) => setSelectedSkills((current) => toggleValue(current, skill))}
        onClear={() => setSelectedSkills([])}
        className="mb-6"
        trailing={
          availableSkills.length > SKILLS_PREVIEW_COUNT ? (
            <button
              onClick={() => setShowAllSkills((current) => !current)}
              className="rounded-full border border-edge px-4 py-1.5 text-sm font-medium text-dim transition-colors hover:border-ink hover:text-ink"
            >
              {showAllSkills ? "Show less" : `Show more (+${availableSkills.length - SKILLS_PREVIEW_COUNT})`}
            </button>
          ) : null
        }
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
  trailing,
}: {
  options: T[];
  selected: T[];
  onToggle: (option: T) => void;
  onClear: () => void;
  className: string;
  trailing?: ReactNode;
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
      {trailing}
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
