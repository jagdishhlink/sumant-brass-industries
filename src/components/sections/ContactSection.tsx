"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight } from "lucide-react";
import { businessData, aiContent } from "@/data/site-data";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-10 md:py-16 px-4 md:px-8" ref={ref}>
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-5"
          >
            <motion.span
              animate={isInView ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Contact</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="text-foreground/55 mt-4 max-w-md mx-auto"
          >
            Have a question or want to work together? Reach out and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="lg:col-span-2"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {businessData.address && (
                <motion.div variants={staggerItem}>
                  <ContactCard icon={<MapPin size={18} />} title="Address" text={businessData.address} />
                </motion.div>
              )}
              {businessData.phone && (
                <motion.div variants={staggerItem}>
                  <a href={`tel:${businessData.phone}`} className="block">
                    <ContactCard icon={<Phone size={18} />} title="Phone" text={businessData.phone} interactive />
                  </a>
                </motion.div>
              )}
              {businessData.email && (
                <motion.div variants={staggerItem}>
                  <a href={`mailto:${businessData.email}`} className="block">
                    <ContactCard icon={<Mail size={18} />} title="Email" text={businessData.email} interactive />
                  </a>
                </motion.div>
              )}
              {businessData.openingHours && (
                <motion.div variants={staggerItem}>
                  <ContactCard icon={<Clock size={18} />} title="Hours" text={businessData.openingHours} />
                </motion.div>
              )}
            </motion.div>

            {/* Map */}
            {businessData.latitude && businessData.longitude && (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={5}
                className="rounded-xl overflow-hidden border border-border h-44 mt-4"
              >
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${businessData.longitude}!3d${businessData.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business location"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="lg:col-span-3"
          >
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-5"
            >
              <motion.div variants={staggerItem} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium mb-2 text-foreground/80">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Your phone"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="contact-service" className="block text-sm font-medium mb-2 text-foreground/80">Service Interested In</label>
                <select
                  id="contact-service"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                >
                  <option value="">Select a service</option>
                  {(aiContent as any).services?.map((s: any, i: number) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm resize-none"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/15"
                >
                  <Send size={15} />
                  Send Message
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, interactive }: { icon: React.ReactNode; title: string; text: string; interactive?: boolean }) {
  return (
    <motion.div
      whileHover={interactive ? { y: -2, scale: 1.01, borderColor: "var(--color-primary)" } : { y: -1 }}
      className={`flex items-start gap-4 p-4 rounded-xl bg-card border border-border transition-all duration-200 ${interactive ? "cursor-pointer group" : ""}`}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"
      >
        {icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-xs text-foreground/50 uppercase tracking-wide">{title}</h4>
        <p className="text-sm text-foreground/80 mt-0.5 truncate">{text}</p>
      </div>
      {interactive && <ArrowUpRight size={14} className="text-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />}
    </motion.div>
  );
}
