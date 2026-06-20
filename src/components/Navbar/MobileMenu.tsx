import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { navLinks } from "./navbar.config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const dropDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
          />

          <motion.div
            variants={dropDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute left-0 right-0 z-50 bg-base-100 border-b border-base-200 p-2 shadow-xl rounded-b-2xl"
          >
            <ul className="menu w-full gap-1 p-1">
              {navLinks.map((link) => (
                <motion.li key={link.to} variants={itemVariants}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    activeProps={{
                      className: "active bg-primary/10 text-primary font-bold",
                    }}
                    className="rounded-xl text-sm font-medium py-2.5 px-4 hover:bg-base-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
