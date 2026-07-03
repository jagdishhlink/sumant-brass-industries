"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";
import { aiContent, businessData } from "@/data/site-data";
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

export function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const booking = (aiContent as any).booking;
  if (!booking) return null;

  return (
    <section id="booking" className="py-10 md:py-16 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="relative max-w-4xl mx-auto p-6 md:p-12 rounded-2xl md:rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/20 rounded-3xl" />

          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={isInView ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
          />

          <div className="relative text-center">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Calendar size={28} className="text-primary" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              {booking.title || "Book an Appointment"}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="text-foreground/70 max-w-xl mx-auto mb-8"
            >
              {booking.description || "Schedule your visit with us today."}
            </motion.p>

            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="max-w-md mx-auto space-y-4"
            >
              <motion.input
                variants={staggerItem}
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <motion.input
                variants={staggerItem}
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <motion.input
                variants={staggerItem}
                type="date"
                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <motion.textarea
                variants={staggerItem}
                placeholder="Any special requests?"
                rows={3}
                className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
              <motion.button
                variants={staggerItem}
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Book Now
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
