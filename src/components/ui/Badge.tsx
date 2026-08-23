/*
  Badge — a small pill label used to display a single tech stack tag.

  Props:
    - label: string — the text to display (e.g. "React", "TypeScript")

  Returns a styled <span> with a subtle background and rounded corners.
  The `inline-flex` ensures the badge sizes to its content rather than
  stretching to fill its container.
*/
export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-glass-edge bg-divider px-3 py-1 text-xs font-medium text-body transition duration-150 hover:-translate-y-0.5 hover:border-accent-mid/40 hover:text-accent">
      {label}
    </span>
  );
}
