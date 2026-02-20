"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, ExternalLink, Send } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "raghuvanshiaditya2211@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&to=raghuvanshiaditya2211@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/raghuvanshiaditya",
      href: "https://www.linkedin.com/in/raghuvanshiaditya/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/adityaraghuvanshi",
      href: "https://github.com/adityaraghuvanshi",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@adityaraghuv",
      href: "https://x.com/adityaraghuv",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Let's Connect" subtitle="I'm always open to interesting conversations and opportunities" />

        <div className="flex justify-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Get in touch</h3>

            <div className="flex flex-col items-center gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group w-full max-w-md flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/20 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <method.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{method.label}</p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                      {method.value}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl border border-secondary/50 bg-background/50 backdrop-blur-sm max-w-md mx-auto">
              <h4 className="font-semibold mb-4 text-center">Response Time</h4>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                I typically respond within 24 hours. Let me know how I can help!
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Available for new projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
