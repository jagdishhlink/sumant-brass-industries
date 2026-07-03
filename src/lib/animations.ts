import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 100 },
  }),
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

export const slideInRotate: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const cardHover = {
  y: -6,
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" },
};

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const buttonTap = {
  scale: 0.97,
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 200, damping: 15 },
  }),
};
