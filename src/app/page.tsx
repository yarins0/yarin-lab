import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

/*
  Home — the root page of the portfolio (rendered at "/").

  This file is intentionally thin: it only composes the page sections.
  All markup and logic lives inside each section component.
*/
export default function Home() {
  return (
    <main className="pt-16">
      {/* pt-16 offsets the fixed navbar so the first section isn't hidden behind it */}
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
