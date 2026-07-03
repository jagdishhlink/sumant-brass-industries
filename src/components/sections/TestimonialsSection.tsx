"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { aiContent, businessData } from "@/data/site-data";
import { fadeInUp, scaleIn, staggerContainer, staggerItem, slideInRotate } from "@/lib/animations";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = (aiContent as any).testimonials || [];
  if (testimonials.length === 0) return null;

  const isGoogleReviews = (testimonials[0] as any)?.source === "google";

  return (
    <section id="testimonials" className="py-10 md:py-16 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-card/40 pointer-events-none" />

      <div className="px-4 md:px-8 max-w-7xl mx-auto relative">
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
            {isGoogleReviews ? (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Google Reviews</span>
              </>
            ) : (
              <>
                <motion.span
                  animate={isInView ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Testimonials</span>
              </>
            )}
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
          >
            {isGoogleReviews ? "What People Say" : "What Our Clients Say"}
          </motion.h2>
          {isGoogleReviews && businessData.rating && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-background border border-border"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <Star size={15} className={i < Math.round(parseFloat(businessData.rating)) ? "text-yellow-500 fill-yellow-500" : "text-foreground/15"} />
                  </motion.span>
                ))}
              </div>
              <span className="font-bold text-sm">{businessData.rating}</span>
              <span className="text-foreground/50 text-xs">({businessData.reviewsCount} reviews)</span>
            </motion.div>
          )}
        </motion.div>

        {/* Reviews - horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial: any, i: number) => (
            <motion.div
              key={i}
              variants={slideInRotate}
              custom={i}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative p-5 md:p-7 rounded-xl md:rounded-2xl bg-background border border-border hover:border-primary/15 transition-all duration-300 group flex-shrink-0 w-[80vw] md:w-auto snap-center"
            >
              {/* Quote decoration */}
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 12, scale: 1.2 }}
                className="absolute top-5 right-5 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
              >
                <Quote size={36} className="text-primary" />
              </motion.div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating || 5)].map((_: any, j: number) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 + j * 0.05 }}
                  >
                    <Star size={13} className="text-yellow-500 fill-yellow-500" />
                  </motion.span>
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/70 text-sm leading-relaxed mb-5">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center shrink-0"
                >
                  <span className="text-white font-semibold text-xs">
                    {testimonial.name?.charAt(0) || "?"}
                  </span>
                </motion.div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{testimonial.name}</p>
                  <p className="text-xs text-foreground/45 truncate">
                    {(testimonial as any).source === "google" ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/></svg>
                        {testimonial.role}
                      </span>
                    ) : testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
