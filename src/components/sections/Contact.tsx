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
      className="scroll-mt-20 border-t border-divider bg-canvas-tint px-6 py-24"
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
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Get in Touch
      </h2>
      <p className="mb-8 text-base text-body">
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
      <SocialLink href={`mailto:${CONTACT.email}`} label={CONTACT.email} />
      <SocialLink href={CONTACT.githubUrl} label="GitHub" external />
      <SocialLink href={CONTACT.linkedinUrl} label="LinkedIn" external />
    </div>
  );
}

function SocialLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="rounded-full border border-edge-mid bg-canvas px-6 py-2.5 text-sm font-medium text-dim shadow-sm transition-all duration-150 hover:border-edge-strong hover:shadow-md"
    >
      {label}
    </a>
  );
}

function Footer() {
  return (
    <p className="mt-16 text-xs text-faint">
      &copy; {new Date().getFullYear()}{" "}Yarin Solomon. Built with Next.js &amp; Tailwind CSS.
    </p>
  );
}
