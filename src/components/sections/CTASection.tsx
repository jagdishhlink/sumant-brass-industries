"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { aiContent, businessData } from "@/data/site-data";
import { fadeInUp, scaleIn } from "@/lib/animations";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-10 md:py-16 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="relative p-6 md:p-14 lg:p-16 rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />

          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={isInView ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={1}
                className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-tight"
              >
                {aiContent.ctaTitle || "Ready to Get Started?"}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={2}
                className="text-white/70 text-base md:text-lg mt-3 max-w-lg"
              >
                {aiContent.ctaDescription || "Contact us today and let's make it happen."}
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className="flex flex-col sm:flex-row items-center gap-3 shrink-0"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-white/95 transition-all hover:shadow-xl"
              >
                {aiContent.ctaButtonText || "Contact Us"}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>
              {businessData.phone && (
                <motion.a
                  href={`tel:${businessData.phone}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <Phone size={14} />
                  Call Now
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
