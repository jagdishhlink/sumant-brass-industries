"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { businessData } from "@/data/site-data";
import { getReliableStockImages } from "@/lib/stock-images";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const businessImages = businessData.images || [];
  const hasOwnImages = businessImages.length > 0;

  // Use stock images when no business images available
  const images = hasOwnImages
    ? businessImages
    : getReliableStockImages(businessData.category, 6);

  const displayImages = images.slice(0, 6);
  const hasMore = hasOwnImages && images.length > 6;

  return (
    <section id="gallery" className="py-10 md:py-16" ref={ref}>
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header - compact for mobile */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center justify-between mb-5 md:mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <motion.span
                animate={isInView ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              <span className="text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">
                {hasOwnImages ? "Gallery" : "Our Work"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
              {hasOwnImages ? "Our Work" : `${businessData.category}`}
            </h2>
          </div>
          {hasMore && (
            <motion.a
              href="/gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-primary font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight size={14} />
            </motion.a>
          )}
        </motion.div>

        {/* Mobile: horizontal scroll strip / Desktop: grid */}
        <div className="md:hidden">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayImages.map((img: string, i: number) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className="flex-shrink-0 w-[70vw] snap-center"
                onClick={() => hasOwnImages && setLightboxImage(img)}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={img}
                    alt={`${businessData.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                  {hasOwnImages && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 active:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {displayImages.slice(0, 6).map((_: string, i: number) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-foreground/15" />
            ))}
          </div>
        </div>

        {/* Desktop: masonry grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:block md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {displayImages.map((img: string, i: number) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ scale: 1.02 }}
              className={`break-inside-avoid group ${hasOwnImages ? "cursor-pointer" : ""}`}
              onClick={() => hasOwnImages && setLightboxImage(img)}
            >
              <div className="relative rounded-xl overflow-hidden">
                <motion.img
                  src={img}
                  alt={`${businessData.name} ${i + 1}`}
                  className="w-full h-auto object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />
                {hasOwnImages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-4"
                  >
                    <span className="text-white text-sm font-medium flex items-center gap-1">
                      View <ArrowRight size={14} />
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All button - mobile */}
        {hasMore && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={4}
            className="text-center mt-6 md:mt-10"
          >
            <motion.a
              href="/gallery"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              View All Photos ({images.length})
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Lightbox - only for own images */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={20} className="text-white" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={lightboxImage}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
