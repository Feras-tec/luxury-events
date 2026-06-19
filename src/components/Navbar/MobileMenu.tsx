import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { navLinks, menuVariants, linkVariants } from "./navbar.config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="md:hidden absolute left-0 right-0 z-50 bg-base-100 border-b border-base-200 p-4 shadow-2xl"
        >
          <ul className="menu w-full gap-1">
            {navLinks.map((link) => (
              <motion.li key={link.to} variants={linkVariants}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  activeProps={{
                    className:
                      "active bg-primary text-primary-content font-bold",
                  }}
                  className="rounded-lg text-sm font-medium hover:bg-base-200"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
