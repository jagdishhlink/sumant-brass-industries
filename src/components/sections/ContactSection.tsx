"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight } from "lucide-react";
import { businessData, aiContent } from "@/data/site-data";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-3 md:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">Contact</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            Get In Touch
          </h2>
          <p className="text-foreground/55 mt-2 md:mt-3 text-sm md:text-base max-w-md mx-auto">
            Have a question or want to work together? Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Mobile: stacked layout / Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Mobile: horizontal scroll cards / Desktop: stacked */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0 lg:space-y-3 lg:gap-0" style={{ scrollbarWidth: "none" }}>
              {businessData.address && (
                <ContactCard icon={<MapPin size={16} />} title="Address" text={businessData.address} />
              )}
              {businessData.phone && (
                <a href={`tel:${businessData.phone}`} className="block flex-shrink-0 lg:flex-shrink">
                  <ContactCard icon={<Phone size={16} />} title="Phone" text={businessData.phone} interactive />
                </a>
              )}
              {businessData.email && (
                <a href={`mailto:${businessData.email}`} className="block flex-shrink-0 lg:flex-shrink">
                  <ContactCard icon={<Mail size={16} />} title="Email" text={businessData.email} interactive />
                </a>
              )}
              {businessData.openingHours && (
                <ContactCard icon={<Clock size={16} />} title="Hours" text={businessData.openingHours} />
              )}
            </div>

            {/* Map */}
            {businessData.latitude && businessData.longitude && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="rounded-xl overflow-hidden border border-border h-36 lg:h-44 mt-4 hidden lg:block"
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form className="p-5 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border space-y-4 md:space-y-5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2 text-foreground/70">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs md:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2 text-foreground/70">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Your phone"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs md:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2 text-foreground/70">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs md:text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2 text-foreground/70">Service Interested In</label>
                <select
                  id="contact-service"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs md:text-sm"
                >
                  <option value="">Select a service</option>
                  {(aiContent as any).services?.map((s: any, i: number) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2 text-foreground/70">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your requirements..."
                  rows={3}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-xs md:text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 md:py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <Send size={14} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, interactive }: { icon: React.ReactNode; title: string; text: string; interactive?: boolean }) {
  return (
    <div className={`flex items-start gap-3 p-3 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-200 flex-shrink-0 w-[200px] lg:w-auto ${interactive ? "hover:border-primary/20 cursor-pointer group" : ""}`}>
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[10px] md:text-xs text-foreground/50 uppercase tracking-wide">{title}</h4>
        <p className="text-xs md:text-sm text-foreground/80 mt-0.5 truncate">{text}</p>
      </div>
      {interactive && <ArrowUpRight size={12} className="text-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />}
    </div>
  );
}
