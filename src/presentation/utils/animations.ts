import { Variants } from "framer-motion";

export const M3_EASING = {
  standard: [0.2, 0.0, 0, 1.0] as [number, number, number, number],
  emphasized: [0.05, 0.7, 0.1, 1.0] as [number, number, number, number],
  decelerate: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  accelerate: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
};

export const M3_TRANSITION = {
  emphasized: {
    duration: 0.5,
    ease: M3_EASING.emphasized,
  },
  standard: {
    duration: 0.3,
    ease: M3_EASING.standard,
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: M3_EASING.emphasized,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: M3_EASING.accelerate,
    },
  },
};

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: M3_EASING.emphasized,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: M3_EASING.standard,
    },
  },
};
