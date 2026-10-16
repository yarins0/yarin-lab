import ContactForm from "@/components/ui/ContactForm";

// ============================================================
// Contact details — update these values to change the displayed links
// ============================================================
const CONTACT = {
  email: "yarinso39@gmail.com",
  githubUrl: "https://github.com/yarins0",
  linkedinUrl: "https://linkedin.com/in/yarin-solomon/",
};
// ============================================================

/*
  Contact — the final section with social links and a contact form.

  The shell (section, heading, links) is a Server Component.
  ContactForm is a Client Component — it imports "use client" internally,
  which creates the client boundary automatically. The rest of this file
  stays server-rendered.

  scroll-mt-20 offsets the anchor for the sticky navbar height.
*/
export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-glass-edge bg-canvas-tint/60 px-6 py-14"
    >
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader />
        <SocialLinks />
        <ContactForm />
        <Footer />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <>
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
        Get in Touch
      </h2>
      <p className="mx-auto mb-8 max-w-prose text-base text-pretty text-body">
        Open to new roles and interesting projects. Drop a message or reach out
        directly.
      </p>
    </>
  );
}

/*
  Quick-access social links above the form — for visitors who prefer
  to reach out via email or LinkedIn directly rather than the form.
*/
function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <SocialLink href={`mailto:${CONTACT.email}`} label={`Email ${CONTACT.email}`}>
        <EnvelopeIcon />
      </SocialLink>
      <SocialLink href={CONTACT.githubUrl} label="GitHub" external>
        <img src="/icons/github.svg" alt="" className="size-5" />
      </SocialLink>
      <SocialLink href={CONTACT.linkedinUrl} label="LinkedIn" external>
        <img src="/icons/linkedin.png" alt="" className="size-5 object-contain" />
      </SocialLink>
    </div>
  );
}

/*
  Icon-only round button. The visible label is gone, so aria-label and
  title carry the link name for screen readers and hover.
*/
function SocialLink({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="focus-ring flex items-center justify-center rounded p-1 text-dim opacity-80 transition duration-150 hover:text-ink hover:opacity-100 active:scale-[0.97]"
    >
      {children}
    </a>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function Footer() {
  return (
    <p className="mt-16 text-xs text-faint">
      &copy; {new Date().getFullYear()}{" "}Yarin Solomon. Built with Next.js &amp; Tailwind CSS.
    </p>
  );
}
