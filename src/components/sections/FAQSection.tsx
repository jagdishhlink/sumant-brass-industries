"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { aiContent } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from "@/lib/animations";

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const faq = (aiContent as any).faq;
  if (!faq || !faq.items) return null;

  return (
    <section id="faq" className="py-10 md:py-16 relative" ref={ref}>
      <div className="absolute inset-0 bg-card/30 pointer-events-none" />

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
            <motion.span
              animate={isInView ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">FAQ</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            className="text-foreground/55 mt-3 text-sm md:text-base max-w-md mx-auto"
          >
            Everything you need to know. Can&apos;t find an answer? Reach out to us.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faq.items.map((item: any, i: number) => (
            <FAQItem key={i} item={item} index={i} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ item, index, isInView }: { item: any; index: number; isInView: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "rounded-xl border bg-background overflow-hidden transition-all duration-200",
        isOpen ? "border-primary/20 shadow-sm shadow-primary/5" : "border-border"
      )}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm md:text-base pr-4 group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200",
            isOpen ? "bg-primary/10 text-primary" : "bg-card text-foreground/40"
          )}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2 }}
              className="px-5 md:px-6 pb-5 md:pb-6"
            >
              <p className="text-sm text-foreground/65 leading-relaxed">{item.answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
