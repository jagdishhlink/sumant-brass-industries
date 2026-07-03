"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { aiContent } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const pricing = (aiContent as any).pricing;
  if (!pricing || !pricing.packages) return null;

  return (
    <section id="pricing" className="py-10 md:py-16 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Pricing</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
          >
            Our Packages
          </motion.h2>
          {pricing.description && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="text-foreground/55 max-w-md mx-auto mt-4"
            >
              {pricing.description}
            </motion.p>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-auto md:px-0 snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as any}
        >
          {pricing.packages.map((pkg: any, i: number) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className={cn(
                "relative p-5 md:p-7 rounded-xl md:rounded-2xl border transition-all duration-300 flex-shrink-0 w-[75vw] md:w-auto snap-center",
                pkg.popular
                  ? "bg-primary/[0.03] border-primary/30 shadow-lg shadow-primary/5 ring-1 ring-primary/10"
                  : "bg-card border-border hover:border-primary/20"
              )}
            >
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-primary text-white text-[11px] font-semibold rounded-full tracking-wide uppercase"
                >
                  Popular
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-heading font-bold mb-1.5">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-sm text-foreground/50">{pkg.description}</p>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                className="flex items-baseline gap-1 mb-6"
              >
                <span className="text-3xl md:text-4xl font-bold">{pkg.price}</span>
                {pkg.period && (
                  <span className="text-sm text-foreground/45">/{pkg.period}</span>
                )}
              </motion.div>

              {/* Features */}
              <ul className="space-y-2.5 mb-7">
                {(pkg.features || []).map((feature: string, j: number) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05, type: "spring", stiffness: 300 }}
                      className="w-4.5 h-4.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <Check size={11} className="text-primary" />
                    </motion.div>
                    <span className="text-foreground/65">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                  pkg.popular
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/15 hover:shadow-lg"
                    : "bg-background border border-border hover:border-primary/30 hover:text-primary"
                )}
              >
                {pkg.cta || "Get Started"}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
