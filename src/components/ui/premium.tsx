"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// 3D Tilt Card
export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Button
export function MagneticButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Tag = href ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block">
      <Tag href={href} style={{ x: springX, y: springY }} className={className}>
        {children}
      </Tag>
    </div>
  );
}

// Glass Card
export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
}

// Aurora Background
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] animate-pulse-soft" />
      <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent/15 blur-[100px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[80px] animate-pulse-soft" style={{ animationDelay: "4s" }} />
    </div>
  );
}

// Gradient Text
export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary ${className}`}>
      {children}
    </span>
  );
}

// Floating Badge
export function FloatingBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter
export function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        function step(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }}
      viewport={{ once: true }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
