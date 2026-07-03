"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Twitter, ArrowUpRight, Heart } from "lucide-react";
import { businessData, siteConfig } from "@/data/site-data";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const socialIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
};

function getSocials() {
  const socials = businessData.socials || {};
  return Object.entries(socials).filter(([platform, url]) => socialIcons[platform] && url);
}

export function Footer() {
  const layout = siteConfig.layout;

  if (["minimal", "swiss-typography", "apple-inspired", "elegant"].includes(layout)) return <FooterMinimal />;
  if (["brutalist", "high-contrast", "monochrome", "retro"].includes(layout)) return <FooterBold />;
  if (["dark-premium", "futuristic", "glassmorphism", "immersive-fullscreen"].includes(layout)) return <FooterDark />;
  if (["magazine-style", "editorial", "asymmetrical"].includes(layout)) return <FooterEditorial />;
  return <FooterDefault />;
}

// ─── Default: adaptive grid (4-col with socials, 3-col without) ───
function FooterDefault() {
  const year = new Date().getFullYear();
  const socials = getSocials();
  const hasSocials = socials.length > 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="border-t border-border bg-card/40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid grid-cols-1 md:grid-cols-2 ${hasSocials ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-10 md:gap-8`}
        >
          <motion.div variants={staggerItem} className="space-y-4">
            {businessData.logo ? (
              <img src={businessData.logo} alt={businessData.name} className="h-9 w-auto" />
            ) : (
              <h3 className="text-xl font-heading font-bold">{businessData.name}</h3>
            )}
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              {businessData.description || `${businessData.category} — Trusted by our community.`}
            </p>
            {!hasSocials && <RatingBlock />}
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/70">Quick Links</h4>
            <nav className="space-y-2.5">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 4, color: "var(--color-primary)" }}
                  className="block text-sm text-foreground/50 hover:text-primary transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/70">Contact</h4>
            <ContactInfo />
          </motion.div>

          {hasSocials && (
            <motion.div variants={staggerItem} className="space-y-5">
              <SocialBlock socials={socials} />
              <RatingBlock />
            </motion.div>
          )}
        </motion.div>

        <BottomBar year={year} isInView={isInView} />
      </div>
    </footer>
  );
}

// ─── Minimal: centered single column ───
function FooterMinimal() {
  const year = new Date().getFullYear();
  const socials = getSocials();
  const hasSocials = socials.length > 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="border-t border-border" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 md:py-20 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mb-8"
        >
          {businessData.logo ? (
            <img src={businessData.logo} alt={businessData.name} className="h-8 w-auto mx-auto" />
          ) : (
            <h3 className="text-lg font-heading font-bold">{businessData.name}</h3>
          )}
        </motion.div>

        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8"
        >
          {["About", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
            <motion.a
              key={link}
              variants={staggerItem}
              whileHover={{ y: -2, color: "var(--color-primary)" }}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>

        {hasSocials && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="flex items-center justify-center gap-3 mb-8"
          >
            {socials.map(([platform, url]) => {
              const Icon = socialIcons[platform];
              return (
                <motion.a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label={platform}
                >
                  <Icon size={15} />
                </motion.a>
              );
            })}
          </motion.div>
        )}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-foreground/40"
        >
          {businessData.phone && (
            <a href={`tel:${businessData.phone}`} className="hover:text-primary transition-colors">{businessData.phone}</a>
          )}
          {businessData.phone && businessData.email && <span className="hidden sm:block">·</span>}
          {businessData.email && (
            <a href={`mailto:${businessData.email}`} className="hover:text-primary transition-colors">{businessData.email}</a>
          )}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={4}
          className={`${hasSocials ? "mt-8" : "mt-6"} pt-8 border-t border-border/50`}
        >
          <p className="text-xs text-foreground/35">&copy; {year} {businessData.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

// ─── Bold: large type, stacked ───
function FooterBold() {
  const year = new Date().getFullYear();
  const socials = getSocials();
  const hasSocials = socials.length > 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="border-t-2 border-foreground/10 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20"
        >
          <motion.div variants={staggerItem}>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">{businessData.name}</h3>
            <p className="text-foreground/50 text-base leading-relaxed max-w-md mb-6">
              {businessData.description || `Premium ${businessData.category} — serving our community with excellence.`}
            </p>
            {businessData.address && (
              <p className="text-foreground/40 text-sm">{businessData.address}</p>
            )}
            {!hasSocials && <div className="mt-5"><RatingBlock /></div>}
          </motion.div>

          <motion.div variants={staggerItem} className={hasSocials ? "grid sm:grid-cols-2 gap-8" : ""}>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Navigate</h4>
              <nav className="space-y-2">
                {["About", "Services", "Gallery", "Contact"].map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 4, color: "var(--color-primary)" }}
                    className="block text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 mt-8 sm:mt-0">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Reach Us</h4>
              <div className="space-y-2.5">
                {businessData.phone && (
                  <a href={`tel:${businessData.phone}`} className="block text-base font-medium text-foreground/70 hover:text-primary transition-colors">
                    {businessData.phone}
                  </a>
                )}
                {businessData.email && (
                  <a href={`mailto:${businessData.email}`} className="block text-base font-medium text-foreground/70 hover:text-primary transition-colors">
                    {businessData.email}
                  </a>
                )}
              </div>
              {hasSocials && (
                <div className="flex gap-2 pt-2">
                  {socials.map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    return (
                      <motion.a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                        aria-label={platform}
                      >
                        <Icon size={15} />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 pt-7 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 origin-left"
        >
          <p className="text-xs text-foreground/35">&copy; {year} {businessData.name}</p>
          <MapLink />
        </motion.div>
      </div>
    </footer>
  );
}

// ─── Dark: premium gradient background ───
function FooterDark() {
  const year = new Date().getFullYear();
  const socials = getSocials();
  const hasSocials = socials.length > 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative overflow-hidden border-t border-border" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/80 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-center mb-12"
        >
          {businessData.logo ? (
            <img src={businessData.logo} alt={businessData.name} className="h-10 w-auto mx-auto mb-4" />
          ) : (
            <h3 className="text-2xl font-heading font-bold mb-4 gradient-text">{businessData.name}</h3>
          )}
          <p className="text-foreground/45 text-sm max-w-sm mx-auto">
            {businessData.description || businessData.category}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
        >
          {businessData.phone && (
            <motion.a
              variants={staggerItem}
              href={`tel:${businessData.phone}`}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all"
            >
              <Phone size={16} className="mx-auto mb-2 text-primary" />
              <span className="text-xs text-foreground/60 block">{businessData.phone}</span>
            </motion.a>
          )}
          {businessData.email && (
            <motion.a
              variants={staggerItem}
              href={`mailto:${businessData.email}`}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all"
            >
              <Mail size={16} className="mx-auto mb-2 text-primary" />
              <span className="text-xs text-foreground/60 block">{businessData.email}</span>
            </motion.a>
          )}
          {businessData.address && (
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
            >
              <MapPin size={16} className="mx-auto mb-2 text-primary" />
              <span className="text-xs text-foreground/60 block truncate">{businessData.address.split(",")[0]}</span>
            </motion.div>
          )}
        </motion.div>

        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
        >
          {["About", "Services", "Gallery", "Testimonials", "Contact"].map((link) => (
            <motion.a
              key={link}
              variants={staggerItem}
              whileHover={{ y: -2, color: "var(--color-primary)" }}
              href={`#${link.toLowerCase()}`}
              className="text-xs uppercase tracking-wider text-foreground/40 hover:text-primary transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>

        {hasSocials && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3}
            className="flex items-center justify-center gap-2.5 mb-10"
          >
            {socials.map(([platform, url]) => {
              const Icon = socialIcons[platform];
              return (
                <motion.a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all"
                  aria-label={platform}
                >
                  <Icon size={14} />
                </motion.a>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className={`text-center pt-8 border-t border-border/40 ${!hasSocials ? "mt-4" : ""}`}
        >
          <p className="text-[11px] text-foreground/30">&copy; {year} {businessData.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

// ─── Editorial: asymmetric two-column ───
function FooterEditorial() {
  const year = new Date().getFullYear();
  const socials = getSocials();
  const hasSocials = socials.length > 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid lg:grid-cols-12 gap-10 lg:gap-6`}
        >
          <motion.div variants={staggerItem} className={`${hasSocials ? "lg:col-span-5" : "lg:col-span-6"} space-y-5`}>
            {businessData.logo ? (
              <img src={businessData.logo} alt={businessData.name} className="h-9 w-auto" />
            ) : (
              <h3 className="text-xl font-heading font-bold">{businessData.name}</h3>
            )}
            <p className="text-foreground/50 text-sm leading-relaxed max-w-sm">
              {businessData.description || `${businessData.category} — Trusted by our community.`}
            </p>
            <RatingBlock />
          </motion.div>

          <motion.div variants={staggerItem} className={`${hasSocials ? "lg:col-span-3 lg:col-start-7" : "lg:col-span-3 lg:col-start-8"}`}>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground/70">Pages</h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {["About", "Services", "Gallery", "Testimonials", "Pricing", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 3, color: "var(--color-primary)" }}
                  className="text-sm text-foreground/45 hover:text-primary transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={staggerItem} className={`${hasSocials ? "lg:col-span-4" : "lg:col-span-3"}`}>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground/70">Get in Touch</h4>
            <ContactInfo />
            {hasSocials && (
              <div className="flex gap-2 mt-5">
                {socials.map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  return (
                    <motion.a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
                      aria-label={platform}
                    >
                      <Icon size={14} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-7 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-foreground/35">&copy; {year} {businessData.name}. All rights reserved.</p>
          <MapLink />
        </motion.div>
      </div>
    </footer>
  );
}

// ─── Shared Sub-components ───

function ContactInfo() {
  return (
    <div className="space-y-2.5">
      {businessData.address && (
        <div className="flex items-start gap-2.5 text-sm text-foreground/50">
          <MapPin size={13} className="mt-0.5 flex-shrink-0 text-primary/60" />
          <span className="leading-relaxed">{businessData.address}</span>
        </div>
      )}
      {businessData.phone && (
        <a href={`tel:${businessData.phone}`} className="flex items-center gap-2.5 text-sm text-foreground/50 hover:text-primary transition-colors">
          <Phone size={13} className="flex-shrink-0 text-primary/60" />
          <span>{businessData.phone}</span>
        </a>
      )}
      {businessData.email && (
        <a href={`mailto:${businessData.email}`} className="flex items-center gap-2.5 text-sm text-foreground/50 hover:text-primary transition-colors">
          <Mail size={13} className="flex-shrink-0 text-primary/60" />
          <span>{businessData.email}</span>
        </a>
      )}
      {businessData.openingHours && (
        <div className="flex items-start gap-2.5 text-sm text-foreground/50">
          <Clock size={13} className="mt-0.5 flex-shrink-0 text-primary/60" />
          <span className="leading-relaxed">{businessData.openingHours}</span>
        </div>
      )}
    </div>
  );
}

function SocialBlock({ socials }: { socials: [string, unknown][] }) {
  if (socials.length === 0) return null;
  return (
    <>
      <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/70">Follow Us</h4>
      <div className="flex gap-2.5">
        {socials.map(([platform, url]) => {
          const Icon = socialIcons[platform];
          return (
            <motion.a
              key={platform}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
              aria-label={platform}
            >
              <Icon size={15} />
            </motion.a>
          );
        })}
      </div>
    </>
  );
}

function RatingBlock() {
  if (!businessData.rating) return null;
  return (
    <div className="inline-flex items-center gap-2.5 p-3 rounded-xl bg-card/80 border border-border">
      <span className="text-xl font-bold text-primary">{businessData.rating}</span>
      <div>
        <div className="text-yellow-500 text-xs leading-none">{"★".repeat(Math.round(parseFloat(businessData.rating)))}</div>
        <span className="text-[11px] text-foreground/40 mt-0.5 block">{businessData.reviewsCount} reviews</span>
      </div>
    </div>
  );
}

function BottomBar({ year, isInView }: { year: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5 }}
      className="mt-12 pt-7 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p className="text-xs text-foreground/35">&copy; {year} {businessData.name}. All rights reserved.</p>
      <MapLink />
    </motion.div>
  );
}

function MapLink() {
  if (!businessData.mapUrl) return null;
  return (
    <motion.a
      href={businessData.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 3 }}
      className="inline-flex items-center gap-1.5 text-xs text-foreground/35 hover:text-primary transition-colors"
    >
      View on Google Maps
      <ArrowUpRight size={10} />
    </motion.a>
  );
}
