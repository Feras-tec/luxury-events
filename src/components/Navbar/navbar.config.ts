import type { Variants } from "framer-motion";

export const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/events", label: "Workshops" },
  { to: "/calendar", label: "Calendar" },
  { to: "/about", label: "About" },
];

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      duration: 0.4,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};
