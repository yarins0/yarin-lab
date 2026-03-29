"use client";

import { useState, useEffect } from "react";

/*
  The navigation links and the section IDs they point to.
  Adding a new section to the page only requires adding an entry here.
*/
const NAV_LINKS = [
  { label: "About",    href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills",   href: "/#skills" },
  { label: "Contact",  href: "/#contact" },
] as const;

/*
  The section IDs watched by IntersectionObserver to determine
  which nav link should appear active.
*/
// Strip the leading "/#" to get bare section IDs (e.g. "/#about" → "about")
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(2));

/*
  Navbar — sticky top navigation bar with:
    - Site name on the left
    - Anchor links + CV download on the right (desktop)
    - Hamburger toggle + dropdown menu (mobile)
    - Active link highlight driven by IntersectionObserver

  Marked "use client" because it uses useState (hamburger toggle)
  and useEffect (IntersectionObserver setup).
*/
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-divider bg-canvas/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <SiteName />
        <DesktopLinks activeSection={activeSection} />
        <MobileControls isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
      </nav>
      {isOpen && <MobileMenu activeSection={activeSection} onClose={() => setIsOpen(false)} />}
    </header>
  );
}

/* Left side: site owner name */
function SiteName() {
  return (
    <a
      href="/#about"
      className="text-sm font-semibold text-ink transition-colors hover:text-accent"
    >
      Yarin Solomon
    </a>
  );
}

/* Desktop: anchor links + CV button, hidden on mobile */
function DesktopLinks({ activeSection }: { activeSection: string }) {
  return (
    <div className="hidden items-center gap-6 sm:flex">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={activeSection === link.href.slice(2)}
        />
      ))}
      <CvButton />
    </div>
  );
}

/* Mobile: hamburger icon button, hidden on desktop */
function MobileControls({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className="flex items-center justify-center rounded-md p-2 text-dim transition-colors hover:text-ink sm:hidden"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {/* Three-bar hamburger icon, animates to X when open */}
      <span className="flex h-5 w-5 flex-col justify-between">
        <span className={`block h-0.5 w-full bg-current transition-all duration-200 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-full bg-current transition-all duration-200 ${isOpen ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-full bg-current transition-all duration-200 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </span>
    </button>
  );
}

/* Mobile: full-width dropdown menu */
function MobileMenu({
  activeSection,
  onClose,
}: {
  activeSection: string;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-divider bg-canvas px-6 py-4 sm:hidden">
      <ul className="flex flex-col gap-3">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink
              href={link.href}
              label={link.label}
              isActive={activeSection === link.href.slice(2)}
              onClick={onClose}
            />
          </li>
        ))}
        <li className="pt-2">
          <CvButton />
        </li>
      </ul>
    </div>
  );
}

/* A single nav anchor link, with active highlight styling */
function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm transition-colors ${
        isActive
          ? "font-semibold text-accent"
          : "font-medium text-body hover:text-ink"
      }`}
    >
      {label}
    </a>
  );
}

/* CV download button — links to the PDF in /public */
function CvButton() {
  return (
    <a
      href="/cv.pdf"
      download
      className="rounded-full border border-edge-mid bg-canvas px-4 py-1.5 text-xs font-semibold text-dim transition-all hover:border-edge-strong hover:shadow-sm"
    >
      Download CV
    </a>
  );
}

/*
  useActiveSection — custom hook that returns the ID of the section
  currently visible in the viewport.

  How it works:
    1. An IntersectionObserver watches all four section elements.
    2. When a section crosses the threshold (20% visible), it's recorded.
    3. The hook returns the ID of the topmost currently-intersecting section.

  Using a Map<string, boolean> means multiple sections can be "intersecting"
  at once (e.g. on a tall screen). We pick the first one in document order.
*/
function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const intersecting = new Map<string, boolean>(
      SECTION_IDS.map((id) => [id, false])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersecting.set(entry.target.id, entry.isIntersecting);
        });

        // Pick the first section (in document order) that is currently visible
        const first = SECTION_IDS.find((id) => intersecting.get(id));
        if (first) setActiveSection(first);
      },
      { threshold: 0.2 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
