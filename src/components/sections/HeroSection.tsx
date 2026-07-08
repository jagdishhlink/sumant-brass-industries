"use client";

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { Star, ArrowDown, Phone, MapPin, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { businessData, aiContent, siteConfig } from "@/data/site-data";
import { useEffect, useRef, useState, useCallback } from "react";
import { getReliableStockImages } from "@/lib/stock-images";

export function HeroSection() {
  const heroVariant = (siteConfig as any).heroVariant || "minimal-centered";
  const layout = siteConfig.layout;
  const hasImages = businessData.images && businessData.images.length > 0;

  // If business has images, always use carousel hero (priority)
  if (hasImages) return <HeroCarousel />;

  if (heroVariant === "split-screen" || heroVariant === "left-aligned-content" || heroVariant === "floating-cards") return <HeroSplit />;
  if (heroVariant === "large-typography-only" || heroVariant === "centered-typography") return <HeroTypography />;
  if (heroVariant === "animated-statistics" || heroVariant === "before-after-showcase") return <HeroBold />;
  if (heroVariant === "diagonal-layout" || heroVariant === "masonry-layout") return <HeroDiagonal />;
  if (heroVariant === "carousel-hero" || heroVariant === "image-collage") return <HeroParticles />;
  if (heroVariant === "fullscreen-image") return <HeroCinematic />;

  if (["split", "bento-grid", "asymmetrical", "editorial"].includes(layout)) return <HeroSplit />;
  if (["minimal", "swiss-typography", "apple-inspired"].includes(layout)) return <HeroTypography />;
  if (["brutalist", "high-contrast", "retro"].includes(layout)) return <HeroBold />;
  if (["dark-premium", "futuristic", "glassmorphism"].includes(layout)) return <HeroCinematic />;

  // No images: use stock images carousel
  return <HeroCarousel />;
}

// ─── Layout: Image Carousel (default when images available) ───
function HeroCarousel() {
  const businessImages = businessData.images || [];
  const hasOwnImages = businessImages.length > 0;
  const images = hasOwnImages ? businessImages.slice(0, 5) : getReliableStockImages(businessData.category, 5);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    startAutoplay();
  };

  const goNext = () => { setDirection(1); setCurrent((prev) => (prev + 1) % images.length); startAutoplay(); };
  const goPrev = () => { setDirection(-1); setCurrent((prev) => (prev - 1 + images.length) % images.length); startAutoplay(); };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-black">
      {/* Background carousel with ken-burns zoom */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <motion.img
              src={images[current]}
              alt={`${businessData.name} ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 5, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Frosted glass navigation indicator on the side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3"
      >
        <div className="px-2.5 py-4 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] flex flex-col items-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative flex items-center justify-center"
            >
              <motion.div
                className={`rounded-full transition-all duration-500 ${i === current ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                layoutId={undefined}
              />
              {i === current && (
                <motion.div
                  layoutId="sideIndicator"
                  className="absolute inset-[-3px] rounded-full border border-white/50"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
        <motion.span
          className="text-[10px] text-white/40 font-medium tracking-widest uppercase mt-1"
          style={{ writingMode: "vertical-rl" }}
        >
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </motion.span>
      </motion.div>

      {/* Main content with glassmorphism card */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: Glassmorphism content card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-7 xl:col-span-7"
            >
              <div className="relative p-6 md:p-10 lg:p-12 rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] shadow-2xl shadow-black/20">
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-xl opacity-50 -z-10" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] mb-5 md:mb-7"
                >
                  <Sparkles size={13} className="text-primary" />
                  <span className="text-[11px] md:text-xs font-semibold text-white/90 uppercase tracking-[0.15em]">{businessData.category}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-[1.05] mb-4 md:mb-6"
                >
                  <span className="gradient-text">{aiContent.tagline}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-sm md:text-base lg:text-lg text-white/60 max-w-xl mb-7 md:mb-9 leading-relaxed"
                >
                  {aiContent.heroDescription}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-3 md:gap-4"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(var(--color-primary-rgb, 99, 102, 241), 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 md:px-10 md:py-4.5 bg-primary text-white rounded-full font-bold text-sm md:text-base shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
                  >
                    {aiContent.ctaButtonText || "Get Started"}
                  </motion.a>
                  {businessData.phone && (
                    <motion.a
                      href={`tel:${businessData.phone.replace(/[^+\d]/g, "")}`}
                      whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.12)" }}
                      whileTap={{ scale: 0.97 }}
                      className="px-7 py-3.5 md:px-10 md:py-4.5 rounded-full border border-white/20 text-white font-bold text-sm md:text-base backdrop-blur-sm hover:border-white/40 transition-all flex items-center gap-2.5"
                    >
                      <Phone size={16} />
                      Call Now
                    </motion.a>
                  )}
                </motion.div>

                {/* Location badge inside card */}
                {businessData.address && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-6 md:mt-8 flex items-center gap-2 text-white/40 text-xs md:text-sm"
                  >
                    <MapPin size={14} className="text-white/50" />
                    <span>{businessData.address}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right: Floating glass stat cards */}
            <div className="lg:col-span-5 xl:col-span-5 hidden lg:flex flex-col gap-4 items-end">
              {businessData.rating && (
                <motion.div
                  initial={{ opacity: 0, x: 60, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, x: -5 }}
                  className="w-full max-w-[280px] p-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase tracking-wider font-medium">Rating</p>
                      <p className="text-white text-xl font-bold">{businessData.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(parseFloat(businessData.rating)) ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                    ))}
                  </div>
                </motion.div>
              )}

              {businessData.reviewsCount && (
                <motion.div
                  initial={{ opacity: 0, x: 60, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, x: -5 }}
                  className="w-full max-w-[280px] p-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Sparkles size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase tracking-wider font-medium">Reviews</p>
                      <p className="text-white text-xl font-bold">{businessData.reviewsCount}+</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <p className="text-white/40 text-[11px] mt-2">Satisfaction rate</p>
                </motion.div>
              )}

              {businessData.phone && (
                <motion.div
                  initial={{ opacity: 0, x: 60, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, x: -5 }}
                  className="w-full max-w-[280px] p-5 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-400/20 flex items-center justify-center">
                      <Phone size={18} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-[11px] uppercase tracking-wider font-medium">Available Now</p>
                      <p className="text-white text-sm font-semibold">{businessData.phone}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom carousel controls and premium dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={goPrev}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-white hover:bg-white/[0.15] transition-all"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Premium pill-shaped dots */}
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-2.5 flex items-center"
            >
              <motion.div
                animate={{
                  width: i === current ? 32 : 10,
                  backgroundColor: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-2.5 rounded-full hover:bg-white/50 transition-colors"
              />
              {i === current && (
                <motion.div
                  layoutId="dotGlow"
                  className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={goNext}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-white hover:bg-white/[0.15] transition-all"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span className="text-[10px] text-white/40 uppercase tracking-widest font-medium" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Animated counter hook ───
function useAnimatedCounter(target: number, duration = 2) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [target]);

  return display;
}

// ─── Floating particles background ───
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "var(--color-primary)", top: "-10%", left: "-10%" }}
        animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--color-accent)", bottom: "-10%", right: "-5%" }}
        animate={{ x: [0, -80, -30, 0], y: [0, -60, -120, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-[80px]"
        style={{ background: "var(--color-secondary)", top: "40%", right: "20%" }}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{ top: `${15 + i * 15}%`, left: `${10 + i * 16}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, var(--color-text) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </div>
  );
}

// ─── Animated text reveal ───
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.3em]"
        >
          <span className="gradient-text">{word}</span>
        </motion.span>
      ))}
    </h1>
  );
}

// ─── Layout: Default (animated orbs + text reveal) ───
function HeroDefault() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <AnimatedBackground />
      <div className="container-custom relative z-10 text-center px-4 pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">{businessData.category}</span>
          </motion.div>

          <AnimatedHeadline text={aiContent.tagline} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 mt-6"
          >
            {aiContent.heroDescription}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
            <CTAButtons />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <RatingBadge className="mt-10" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-foreground/30" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Split (left animated text, right animated cards) ───
function HeroSplit() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatedBackground />
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4 pt-24">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 overflow-hidden"
          >
            {businessData.category}
          </motion.span>

          <AnimatedHeadline text={aiContent.tagline} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg text-foreground/60 mb-8 max-w-lg mt-6"
          >
            {aiContent.heroDescription}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <CTAButtons />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            <RatingBadge className="mt-8" />
          </motion.div>
        </motion.div>

        {/* Right side: animated floating info cards */}
        <div className="hidden lg:flex flex-col gap-5 relative">
          {[
            { icon: <MapPin size={22} />, title: "Visit Us", text: businessData.address, delay: 0.4 },
            { icon: <Phone size={22} />, title: "Call Us", text: businessData.phone || "Contact us", delay: 0.6 },
            { icon: <Star size={22} />, title: "Rated", text: businessData.rating ? `${businessData.rating} stars on Google` : "Trusted locally", delay: 0.8 },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: card.delay, duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.02, x: -5 }}
              className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-lg flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">{card.icon}</div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-foreground/60 text-sm">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Layout: Typography-focused (massive text + kinetic animation) ───
function HeroTypography() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-end pb-20 overflow-hidden bg-background">
      <AnimatedBackground />

      {/* Animated lines */}
      <motion.div
        className="absolute top-1/3 left-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="absolute top-2/3 left-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />

      <div className="container-custom relative z-10 px-4 w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-mono text-sm mb-6 tracking-wider uppercase flex items-center gap-2"
          >
            <motion.span className="inline-block w-8 h-px bg-primary" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
            {businessData.category}
          </motion.p>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-bold leading-none tracking-tight mb-8">
            {aiContent.tagline.split(" ").map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block mr-[0.25em]"
              >
                {i === 0 ? <span className="gradient-text">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="max-w-md text-foreground/50 text-lg"
            >
              {aiContent.heroDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <CTAButtons />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <RatingBadge className="mt-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Bold (stats + strong lines) ───
function HeroBold() {
  const rating = parseFloat(businessData.rating) || 0;
  const reviews = parseInt(businessData.reviewsCount) || 0;
  const animatedRating = useAnimatedCounter(rating * 10, 2);
  const animatedReviews = useAnimatedCounter(reviews, 2.5);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatedBackground />

      {/* Animated top accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="container-custom relative z-10 px-4 grid lg:grid-cols-12 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-8">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-foreground/60 uppercase tracking-widest text-xs">{businessData.category}</span>
          </motion.div>

          <AnimatedHeadline text={aiContent.tagline} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl text-foreground/40 font-light italic mb-8 mt-4"
          >
            {aiContent.heroDescription}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <a href="#contact" className="inline-block px-10 py-5 bg-primary text-white font-bold text-lg uppercase tracking-wide hover:opacity-90 transition-all hover:shadow-2xl hover:shadow-primary/20 rounded-lg">
              {aiContent.ctaButtonText || "Contact Now"}
            </a>
          </motion.div>
        </motion.div>

        {/* Animated stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {businessData.rating && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="border-l-2 border-primary pl-6"
            >
              <div className="text-5xl font-heading font-bold">{(animatedRating / 10).toFixed(1)}</div>
              <div className="text-foreground/40 text-sm mt-1">Google Rating</div>
            </motion.div>
          )}
          {businessData.reviewsCount && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="border-l-2 border-secondary pl-6"
            >
              <div className="text-5xl font-heading font-bold">{animatedReviews}+</div>
              <div className="text-foreground/40 text-sm mt-1">Happy Customers</div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="border-l-2 border-accent pl-6"
          >
            <div className="text-5xl font-heading font-bold">24/7</div>
            <div className="text-foreground/40 text-sm mt-1">Support</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Layout: Diagonal (asymmetric with animated shapes) ───
function HeroDiagonal() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatedBackground />

      <motion.div
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full border border-primary/10"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full border border-accent/10"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-custom relative z-10 px-4 pt-24">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">{businessData.category}</span>
            </motion.div>

            <AnimatedHeadline text={aiContent.tagline} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-lg text-foreground/60 max-w-lg mt-6 mb-8"
            >
              {aiContent.heroDescription}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <CTAButtons />
            </motion.div>
          </div>

          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center gap-4">
            {[
              { label: businessData.rating ? `${businessData.rating} Rated` : "Premium", icon: "star" },
              { label: businessData.phone || "Always Available", icon: "phone" },
              { label: businessData.address?.split(",")[0] || "Local", icon: "pin" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-lg text-center w-full max-w-[240px]"
              >
                <p className="font-semibold text-sm">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <RatingBadge className="mt-12" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Layout: Showcase (left-aligned text + right feature grid) ───
function HeroParticles() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="container-custom relative z-10 px-4 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">{businessData.category}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            >
              <span className="gradient-text">{aiContent.tagline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-foreground/60 max-w-lg mb-8"
            >
              {aiContent.heroDescription}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <CTAButtons />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              <RatingBadge className="mt-8" />
            </motion.div>
          </div>

          {/* Right: Feature grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {(aiContent.services || []).slice(0, 4).map((service: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-sm"
              >
                <span className="text-2xl block mb-3">{service.icon}</span>
                <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{service.description?.slice(0, 60)}...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Layout: Cinematic (full-width left-aligned with gradient accent) ───
function HeroCinematic() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 20% 50%, var(--color-primary), transparent 50%)" }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 80% 80%, var(--color-accent), transparent 50%)" }}
          animate={{ opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, var(--color-text) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="container-custom relative z-10 px-4 pt-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full mb-8 origin-top"
          />

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-primary font-medium uppercase tracking-widest mb-4"
          >
            {businessData.category}
          </motion.p>

          <AnimatedHeadline text={aiContent.tagline} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-foreground/55 max-w-xl text-lg mt-6 mb-10 leading-relaxed"
          >
            {aiContent.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition-all hover:shadow-xl hover:shadow-primary/20">
              {aiContent.ctaButtonText || "Get Started"}
            </a>
            {businessData.phone && (
              <a href={`tel:${businessData.phone.replace(/[^+\d]/g, "")}`} className="px-8 py-4 rounded-2xl border border-border font-semibold hover:bg-card transition-all">
                Call Now
              </a>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            <RatingBadge className="mt-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Shared Sub-components ───
function RatingBadge({ className = "" }: { className?: string }) {
  if (!businessData.rating) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card border border-border shadow-sm ${className}`}
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < Math.round(parseFloat(businessData.rating)) ? "text-yellow-500 fill-yellow-500" : "text-foreground/20"} />
        ))}
      </div>
      <span className="font-bold text-sm">{businessData.rating}</span>
      {businessData.reviewsCount && <span className="text-foreground/50 text-xs">({businessData.reviewsCount} reviews)</span>}
    </motion.div>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
      >
        {aiContent.ctaButtonText || "Get Started"}
      </motion.a>
      <motion.a
        href="#services"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 rounded-full border border-border font-semibold text-lg hover:bg-card transition-all"
      >
        Our Services
      </motion.a>
    </div>
  );
}
