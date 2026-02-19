"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "GraphQL"],
    image: "/ecommerce-dashboard.png",
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration, WebSocket support, and message history.",
    tech: ["React", "Express.js", "MySQL", "TypeScript", "Socket.io"],
    image: "/chat-application-interface.png",
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
    color: "from-purple-500/20 to-pink-500/20",
  },
]

export function Projects() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Featured Projects" subtitle="Showcasing my best work and creative solutions" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10" />

              <div
                className={`relative overflow-hidden rounded-xl border border-secondary/50 hover:border-accent/50 bg-secondary/20 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/30 h-full flex flex-col`}
              >
                <div className={`relative h-48 md:h-56 overflow-hidden bg-gradient-to-br ${project.color}`}>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/30 font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-all"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium border border-accent/30 transition-all"
                    >
                      Live
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
