"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { businessData, siteConfig } from "@/data/site-data";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", "")).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-[72px] px-4 md:px-8">
          {/* Logo */}
          <a href="#" className="relative z-10 flex items-center gap-2">
            {businessData.logo ? (
              <img src={businessData.logo} alt={businessData.name} className="h-8 md:h-9 w-auto" />
            ) : (
              <span className="text-lg md:text-xl font-heading font-bold text-foreground">
                {businessData.name}
              </span>
            )}
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                    isActive
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-primary/5 rounded-lg"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Get In Touch
            </motion.a>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: 180 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />
            <nav className="relative h-full flex flex-col justify-center px-8">
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl font-heading font-bold text-foreground/80 hover:text-primary transition-colors py-3"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg"
                >
                  Get In Touch
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
