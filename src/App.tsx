import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { AnimatedAsteroids } from "@/components/ui/animated-asteroids";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CrackEffect } from "@/components/ui/crack-effect";

// Toggle to show/hide Projects section
const SHOW_PROJECTS = false;

export default function App() {
  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      <CustomCursor />
      <CrackEffect />
      <AnimatedAsteroids />
      <LoadingScreen />
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden relative z-10">
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
