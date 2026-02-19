"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Code2, Menu, X } from "lucide-react";

// Toggle to show/hide Projects section
const SHOW_PROJECTS = false;

const navItems = [
  { name: "Hero", href: "#hero" },
  ...(SHOW_PROJECTS ? [{ name: "Projects", href: "#projects" }] : []),
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    color: "#ffffff",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "#1DA1F2",
  },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email", color: "#FF6B6B" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:fixed md:right-0 md:top-0 md:h-screen md:w-20 md:flex md:flex-col md:items-center md:justify-between md:py-8 md:px-4 md:border-l md:border-border md:bg-background/50 md:backdrop-blur-sm md:z-40"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/60 cursor-pointer group"
        >
          <Code2 className="w-6 h-6 text-foreground" />
        </motion.div>

        <motion.div className="flex flex-col gap-6 items-center">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: -8 }}
              className="group relative flex items-center justify-center"
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === item.name.toLowerCase()
                    ? "bg-accent scale-150"
                    : "bg-muted-foreground hover:bg-accent"
                }`}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: -20 }}
                className="absolute right-12 text-xs font-medium whitespace-nowrap pointer-events-none"
              >
                {item.name}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="flex flex-col gap-4 items-center">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              title={social.label}
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 bg-black/50 z-30 md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ x: 400 }}
        animate={{ x: isOpen ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-lg z-40 md:hidden flex flex-col p-8 gap-8"
      >
        <div className="flex flex-col gap-6">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8 }}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.name.toLowerCase()
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
