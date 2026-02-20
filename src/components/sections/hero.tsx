"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
    }),
  };

  const textRevealVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden pt-24 md:pt-32 pb-12">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 opacity-50"
        />
      </div>

      {/* Name Banner */}
      <motion.div
        variants={nameVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="mb-8 md:mb-12 w-full px-2 md:px-4"
      >
        <svg
          className="w-full h-auto min-h-[10px] md:min-h-[150px]"
          viewBox="0 0 1400 280"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          <defs>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap');
              .name-text {
                font-family: 'Poppins', sans-serif;
                font-size: 120px;
                font-weight: 800;
                letter-spacing: -4px;
                fill: none;
                stroke: currentColor;
                stroke-width: 2.5;
                stroke-linecap: round;
                stroke-linejoin: round;
              }
              @media (max-width: 768px) {
                .name-text {
                  font-size: 110px;
                  letter-spacing: -3px;
                  stroke-width: 2.2;
                }
              }
              @media (max-width: 640px) {
                .name-text {
                  font-size: 150px;
                  letter-spacing: -2.5px;
                  stroke-width: 2;
                }
              }
            `}</style>
          </defs>
          <motion.text
            x="50%"
            y="160"
            textAnchor="middle"
            dominantBaseline="middle"
            className="name-text text-accent"
            initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            Aditya Raghuvanshi
          </motion.text>
        </svg>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto z-10"
      >
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm"
          >
            <motion.div animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-accent">Full-Stack Developer</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-4">
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              Crafting Digital Experiences
            </motion.span>{" "}
            <br />
            <span className="text-accent">with Clean Code</span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          I transform ideas into robust, scalable web applications. 2 years of experience building full-stack solutions
          with React, Node.js, and modern technologies. Let's build something amazing together.
        </motion.p>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap"
        >
          {/* <motion.button
            onClick={() => {
              // Toggle: Change "projects" to "skills" when projects section is hidden
              const element = document.getElementById("skills");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-accent/50"
          >
            View My Work
            <ArrowRight className="w-5 h-5" />
          </motion.button> */}

          <motion.button
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg border border-accent/50 hover:border-accent hover:bg-accent/5 font-semibold transition-all"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Scroll to explore indicator */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="flex flex-col items-center justify-center mt-12 md:mt-16 mb-8 md:mb-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.4, 0, 0.6, 1] as const }}
            className="text-xs md:text-sm text-muted-foreground mb-4 font-medium"
          >
            Scroll to explore
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.4, 0, 0.6, 1] as const }}
            className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center items-start p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.4, 0, 0.6, 1] as const }}
              className="w-1.5 h-3 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto px-4"
        >
          {[
            { label: "2+ Years", value: "Experience" },
            { label: "2", value: "Projects" },
            { label: "5", value: "Tech Stacks" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 md:p-8 rounded-xl bg-secondary/40 border border-secondary/60 backdrop-blur-sm text-center hover:border-accent/50 transition-all duration-300 shadow-lg"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">{stat.label}</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
