import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { LoadingScreen } from "@/components/ui/loading-screen";

// Toggle to show/hide Projects section
const SHOW_PROJECTS = false;

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <section id="hero">
          <Hero />
        </section>
        {SHOW_PROJECTS && (
          <section id="projects">
            <Projects />
          </section>
        )}
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}
