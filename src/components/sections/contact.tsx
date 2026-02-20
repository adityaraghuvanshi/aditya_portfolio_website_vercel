"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, ExternalLink, Send, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { validateAndSanitizeForm, RATE_LIMIT_CONFIG } from "@/utils/security";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field for bot detection
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { checkLimit, remaining, getTimeUntilReset, error: rateLimitError } = useRateLimit();

  // WhatsApp phone number (replace with your actual WhatsApp number, include country code without +)
  const whatsappNumber = "919767975386"; // Example: Replace with your actual number

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "raghuvanshiaditya2211@gmail.com",
      href: "mailto:raghuvanshiaditya2211@gmail.com",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      // Honeypot check - if filled, it's likely a bot
      if (formState.website) {
        // Silently fail - don't alert bots
        setIsSubmitting(false);
        return;
      }

      // Check rate limit first
      if (!checkLimit()) {
        setErrors([rateLimitError || "Rate limit exceeded. Please wait before trying again."]);
        setIsSubmitting(false);
        return;
      }

      // Validate and sanitize input
      const validation = validateAndSanitizeForm(
        formState.name,
        formState.email,
        formState.message
      );

      if (!validation.valid) {
        setErrors(validation.errors);
        setIsSubmitting(false);
        return;
      }

      // Format the message for WhatsApp (using sanitized data)
      let whatsappMessage = `Hello! My name is ${validation.sanitized.name}`;
      if (validation.sanitized.email) {
        whatsappMessage += `\nEmail: ${validation.sanitized.email}`;
      }
      whatsappMessage += `\n\nMessage:\n${validation.sanitized.message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Reset form and show success
      setFormState({ name: "", email: "", message: "", website: "" });
      setSubmitSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors(["An error occurred. Please try again later."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    // Apply length limits
    let trimmedValue = value;
    if (name === "name" && value.length > RATE_LIMIT_CONFIG.maxNameLength) {
      trimmedValue = value.slice(0, RATE_LIMIT_CONFIG.maxNameLength);
    } else if (name === "email" && value.length > RATE_LIMIT_CONFIG.maxEmailLength) {
      trimmedValue = value.slice(0, RATE_LIMIT_CONFIG.maxEmailLength);
    } else if (name === "message" && value.length > RATE_LIMIT_CONFIG.maxMessageLength) {
      trimmedValue = value.slice(0, RATE_LIMIT_CONFIG.maxMessageLength);
    }

    setFormState((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));
  };

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Let's Connect" subtitle="I'm always open to interesting conversations and opportunities" />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {/* Contact Me Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Contact me</h3>

            <div className="flex flex-col gap-4">
              {contactMethods.map((method, index) => {
                const isMailto = method.href?.startsWith('mailto:');

                return (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={isMailto ? undefined : "_blank"}
                    rel={isMailto ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group w-full flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/20 transition-all duration-300 text-left"
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
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-xl border border-secondary/50 bg-background/50 backdrop-blur-sm">
              <h4 className="font-semibold mb-4">Response Time</h4>
              <p className="text-sm text-muted-foreground mb-4">
                I typically respond within 24 hours. Let me know how I can help!
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Available for new projects</span>
              </div>
            </div>
          </motion.div>

          {/* Get in Touch Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Get in touch</h3>

            {/* Error Messages */}
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-500 mb-2">Please fix the following errors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-400">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-400">
                    Message prepared! WhatsApp should open shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Rate Limit Indicator */}
            <div className="p-3 rounded-lg bg-secondary/30 border border-secondary/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Rate limit: {remaining} of {RATE_LIMIT_CONFIG.maxRequests} requests remaining</span>
                {remaining === 0 && (
                  <span className="text-accent">
                    Resets in {getTimeUntilReset()}s
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  maxLength={RATE_LIMIT_CONFIG.maxNameLength}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your name"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formState.name.length}/{RATE_LIMIT_CONFIG.maxNameLength} characters
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  maxLength={RATE_LIMIT_CONFIG.maxEmailLength}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="your.email@example.com"
                />
                {formState.email && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {formState.email.length}/{RATE_LIMIT_CONFIG.maxEmailLength} characters
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  maxLength={RATE_LIMIT_CONFIG.maxMessageLength}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Your message here..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formState.message.length}/{RATE_LIMIT_CONFIG.maxMessageLength} characters
                </p>
              </div>

              {/* Honeypot field - hidden from users, visible to bots */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <label htmlFor="website">Website (leave blank)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formState.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || remaining === 0}
                whileHover={!isSubmitting && remaining > 0 ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && remaining > 0 ? { scale: 0.98 } : {}}
                className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isSubmitting || remaining === 0
                    ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                    : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/50"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Send via WhatsApp
                  </>
                )}
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Clicking "Send via WhatsApp" will open WhatsApp with your message
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
