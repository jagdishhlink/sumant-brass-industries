"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aiContent, siteConfig } from "@/data/site-data";
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem, scaleIn, cardHover } from "@/lib/animations";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const layout = siteConfig.layout;
  const services = aiContent.services || [];

  if (services.length === 0) return null;

  if (["bento-grid", "asymmetrical", "editorial", "futuristic", "glassmorphism", "dark-premium"].includes(layout)) return <ServicesCards services={services} isInView={isInView} sectionRef={ref} />;
  if (["minimal", "swiss-typography", "apple-inspired", "organic-shapes", "elegant"].includes(layout)) return <ServicesList services={services} isInView={isInView} sectionRef={ref} />;
  if (["brutalist", "retro", "high-contrast", "monochrome"].includes(layout)) return <ServicesNumbered services={services} isInView={isInView} sectionRef={ref} />;
  return <ServicesGrid services={services} isInView={isInView} sectionRef={ref} />;
}

interface ServiceProps {
  services: any[];
  isInView: boolean;
  sectionRef: React.RefObject<any>;
}

function ServicesGrid({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-10 md:py-16 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader isInView={isInView} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={cardHover}
              className="group relative p-4 md:p-7 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-5 group-hover:bg-primary/15 transition-all duration-300"
                >
                  {s.icon}
                </motion.div>
                <h3 className="font-heading text-sm md:text-lg font-bold mb-1 md:mb-2.5">{s.title}</h3>
                <p className="text-foreground/60 text-xs md:text-sm leading-relaxed line-clamp-3">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesCards({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-10 md:py-16 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader isInView={isInView} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3 md:gap-5"
        >
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } } : { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start gap-3 md:gap-5 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center text-lg md:text-xl shrink-0 group-hover:bg-primary/15 transition-colors"
              >
                {s.icon}
              </motion.div>
              <div>
                <h3 className="font-heading font-bold text-xs md:text-base mb-0.5 md:mb-1.5">{s.title}</h3>
                <p className="text-foreground/55 text-[10px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesList({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-10 md:py-16 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-14"
        >
          <motion.p
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-primary text-sm font-medium mb-3 tracking-wider uppercase"
          >
            Services
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold"
          >
            What We Offer
          </motion.h2>
        </motion.div>
        <div className="divide-y divide-border/60">
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i + 1}
              whileHover={{ x: 8, backgroundColor: "rgba(var(--color-primary-rgb, 0 0 0) / 0.02)" }}
              className="group py-7 md:py-8 flex items-start gap-5 md:gap-6 transition-all duration-300 rounded-lg px-2"
            >
              <motion.span
                whileHover={{ scale: 1.3, rotate: 10 }}
                className="text-2xl mt-1 shrink-0 group-hover:scale-110 transition-transform"
              >
                {s.icon}
              </motion.span>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{s.description}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesNumbered({ services, isInView, sectionRef }: ServiceProps) {
  return (
    <section id="services" className="py-10 md:py-16 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-4 mb-14"
        >
          <motion.div
            animate={isInView ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 bg-primary rounded-full"
          />
          <span className="text-foreground/60 uppercase tracking-widest text-xs font-medium">Our Services</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 h-px bg-border origin-left"
          />
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 md:gap-10"
        >
          {services.map((s: any, i: number) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ x: 4 }}
              className="flex gap-5 md:gap-6 group"
            >
              <motion.div
                whileHover={{ scale: 1.1, color: "var(--color-primary)" }}
                className="text-3xl font-heading font-bold text-primary/20 group-hover:text-primary/60 transition-colors duration-300 tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.div>
              <div className="border-l border-border/60 pl-5 md:pl-6 group-hover:border-primary/30 transition-colors">
                <h3 className="font-heading text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={0}
      className="text-center mb-8 md:mb-14"
    >
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 mb-3 md:mb-5"
      >
        <motion.span
          animate={isInView ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
        <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">Services</span>
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1}
        className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
      >
        What We Offer
      </motion.h2>
    </motion.div>
  );
}
