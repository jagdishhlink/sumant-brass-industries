"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { businessData } from "@/data/site-data";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = businessData.phone?.replace(/[^0-9+]/g, "") || "";
  const whatsappUrl =
    (businessData.socials as any)?.whatsapp ||
    `https://wa.me/${phone.startsWith("+") ? phone.slice(1) : phone}`;

  if (!phone && !(businessData.socials as any)?.whatsapp) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-72 glass-card p-5 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Chat with us</h4>
              <button onClick={() => setIsOpen(false)} className="text-foreground/50 hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-foreground/60 mb-4">
              Hi! 👋 How can we help you today? Click below to chat on WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
            >
              Start Chat →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl transition-shadow"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle size={24} fill="white" />
      </motion.button>
    </div>
  );
}
