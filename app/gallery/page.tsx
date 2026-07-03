"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Grid, LayoutGrid } from "lucide-react";
import { businessData } from "@/data/site-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function GalleryPage() {
  const images = businessData.images || [];
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function openLightbox(img: string, index: number) {
    setLightboxImage(img);
    setLightboxIndex(index);
  }

  function nextImage() {
    const next = (lightboxIndex + 1) % images.length;
    setLightboxIndex(next);
    setLightboxImage(images[next]);
  }

  function prevImage() {
    const prev = (lightboxIndex - 1 + images.length) % images.length;
    setLightboxIndex(prev);
    setLightboxImage(images[prev]);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <a
              href="/#gallery"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Home
            </a>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
            >
              Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 text-lg"
            >
              {images.length} photos from {businessData.name}
            </motion.p>
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((img: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(img, i)}
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${businessData.name} photo ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white text-sm font-medium">View</span>
                    <span className="text-white/70 text-xs">{i + 1}/{images.length}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm"
            >
              {lightboxIndex + 1} / {images.length}
            </motion.div>

            {/* Previous */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>

            {/* Image */}
            <motion.img
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={lightboxImage}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors rotate-180"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
