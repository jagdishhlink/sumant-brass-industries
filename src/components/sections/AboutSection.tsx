"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aiContent, businessData } from "@/data/site-data";
import { getReliableStockImage } from "@/lib/stock-images";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem, popIn } from "@/lib/animations";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const hasImages = businessData.images && businessData.images.length > 0;

  return (
    <section id="about" className="py-10 md:py-16 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-bg pointer-events-none" />

      <div className="px-4 md:px-8 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="space-y-4 md:space-y-6"
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15"
            >
              <motion.span
                animate={isInView ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">About Us</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight"
            >
              {aiContent.aboutTitle || "Our Story"}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="text-sm md:text-base text-foreground/65 leading-relaxed"
            >
              {aiContent.aboutText}
            </motion.p>

            {/* Why choose us - mobile optimized grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-2.5 md:gap-3 pt-2"
            >
              {(aiContent.whyChooseUs || []).slice(0, 4).map((item: any, i: number) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -3, borderColor: "var(--color-primary)" }}
                  className="flex flex-col gap-2 p-3 md:p-4 rounded-xl bg-card/60 border border-border/50 transition-colors"
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-lg md:text-xl"
                  >
                    {item.icon}
                  </motion.span>
                  <div>
                    <h4 className="font-semibold text-xs md:text-sm leading-tight">{item.title}</h4>
                    <p className="text-[10px] md:text-xs text-foreground/55 mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="relative"
          >
            {hasImages && businessData.images.length > 2 ? (
              <div className="grid grid-cols-12 gap-2.5 md:gap-4">
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={2}
                  whileHover={{ scale: 1.03 }}
                  className="col-span-7 rounded-2xl overflow-hidden"
                >
                  <img src={businessData.images[1]} alt={businessData.name} className="w-full h-48 md:h-72 object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={3}
                  whileHover={{ scale: 1.03 }}
                  className="col-span-5 rounded-2xl overflow-hidden mt-6 md:mt-8"
                >
                  <img src={businessData.images[2]} alt={businessData.name} className="w-full h-40 md:h-64 object-cover transition-transform duration-700 hover:scale-110" />
                </motion.div>
                {businessData.images[3] && (
                  <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={4}
                    whileHover={{ scale: 1.03 }}
                    className="col-span-5 rounded-2xl overflow-hidden -mt-2 md:-mt-4"
                  >
                    <img src={businessData.images[3]} alt={businessData.name} className="w-full h-36 md:h-52 object-cover transition-transform duration-700 hover:scale-110" />
                  </motion.div>
                )}
                {businessData.images[4] && (
                  <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={5}
                    whileHover={{ scale: 1.03 }}
                    className="col-span-7 rounded-2xl overflow-hidden -mt-2 md:-mt-4"
                  >
                    <img src={businessData.images[4]} alt={businessData.name} className="w-full h-36 md:h-52 object-cover transition-transform duration-700 hover:scale-110" />
                  </motion.div>
                )}
              </div>
            ) : hasImages && businessData.images.length >= 1 ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden"
              >
                <img src={businessData.images[0]} alt={businessData.name} className="w-full h-56 md:h-80 object-cover transition-transform duration-700 hover:scale-110" />
              </motion.div>
            ) : (
              /* No images — use stock category image */
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={2}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden"
              >
                <img
                  src={getReliableStockImage(businessData.category, 10, 800, 600)}
                  alt={businessData.category}
                  className="w-full h-56 md:h-80 object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            )}

            {/* Rating badge */}
            {businessData.rating && (
              <motion.div
                variants={popIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={6}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="absolute -bottom-3 -left-2 md:-bottom-4 md:-left-4 bg-background border border-border rounded-xl p-2.5 md:p-3.5 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm md:text-lg font-bold text-primary">{businessData.rating}</span>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-[10px] md:text-xs">{"★".repeat(Math.min(5, Math.round(parseFloat(businessData.rating))))}</div>
                    <span className="text-[9px] md:text-[11px] text-foreground/55">{businessData.reviewsCount} reviews</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
