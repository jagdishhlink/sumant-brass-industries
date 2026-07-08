"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aiContent, siteConfig } from "@/data/site-data";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const layout = siteConfig.layout;
  const services = aiContent.services || [];

  if (services.length === 0) return null;

  const useMinimal = layout.includes("minimal") || layout.includes("swiss");

  if (useMinimal) return <MinimalList services={services} isInView={isInView} sectionRef={ref} />;
  return <PremiumGrid services={services} isInView={isInView} sectionRef={ref} />;
}

interface ServiceProps {
  services: any[];
  isInView: boolean;
  sectionRef: React.RefObject<any>;
}

function PremiumGrid({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-12 md:py-20 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-4 md:mb-5"
          >
            <motion.span
              animate={isInView ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">
              Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-heading font-bold mb-2 md:mb-3"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-foreground/50 text-sm md:text-base max-w-2xl mx-auto"
          >
            Premium solutions crafted with precision and care
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
              whileHover={{
                y: -4,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: 1000 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-2xl md:text-3xl mb-3 md:mb-4"
                >
                  {s.icon}
                </motion.div>

                {/* Title */}
                <h3 className="font-heading text-sm md:text-base font-bold mb-1 md:mb-2 text-foreground group-hover:text-foreground transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] md:text-sm text-foreground/60 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinimalList({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-12 md:py-20 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary text-sm font-medium mb-3 tracking-wider uppercase"
          >
            Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-heading font-bold"
          >
            What We Offer
          </motion.h2>
        </motion.div>

        {/* Numbered List */}
        <div className="divide-y divide-border/50">
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ x: 8 }}
              className="group py-5 md:py-7 flex items-start gap-4 md:gap-6 transition-all duration-300 rounded-lg px-2 hover:bg-primary/[0.02]"
            >
              {/* Number */}
              <span className="text-xl md:text-2xl font-heading font-bold text-primary/20 group-hover:text-primary/50 transition-colors duration-300 tabular-nums shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-sm md:text-base font-bold mb-0.5 md:mb-1">
                  {s.title}
                </h3>
                <p className="text-[11px] md:text-sm text-foreground/50 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {s.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mt-1">
                &rarr;
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
