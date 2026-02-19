"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

const experiences = [
  {
    role: "Software Developer",
    company: "Macleods Pharmaceuticals.",
    duration: "Jan 2024 - Dec 2025",
    location: "Mumbai, Maharashtra",
    description:
      "Developed and maintained full-stack web applications. Led frontend architecture decisions and implemented GraphQL API integration.",
    achievements: [
      "Developed and maintained full-stack web applications.",
      "Led frontend architecture decisions and implemented GraphQL API integration.",
      "Developed and maintained full-stack web applications.",
    ],
    tech: ["React", "React Native", "Node.js", "TypeScript", "JavaScript", "Express.js", "Tailwind CSS", "GraphQL", "MongoDB", "Firebase", "Git", "GitHub", "Linux"],
  },
  {
    role: "Software Development Engineer - 1",
    company: "NUVR Private Limited.",
    duration: "Jan 2026 - Present",
    location: "Bengaluru, Karnataka",
    description:
      "Contributed to building and debugging web applications. Worked with REST APIs and MySQL databases while learning modern development practices.",
    achievements: [
      "Fixed critical bugs in production environment",
      "Developed 5+ REST API endpoints",
      "Improved database query performance by 35%",
    ],
    tech: ["JavaScript", "Express.js", "MySQL", "React"],
  },
]

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Professional Experience" subtitle="My journey in full-stack development" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 rounded-full bg-accent border-4 border-background relative z-10 cursor-pointer"
                  />
                  {index !== experiences.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-accent to-transparent mt-2" />
                  )}
                </div>

                <div className="pb-8 flex-1">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-xl border border-secondary/50 hover:border-accent/50 bg-secondary/20 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{exp.role}</h3>
                        <p className="text-accent font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Key Achievements:</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/30 font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
