import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export const HamburgerButton = ({ isOpen, toggle }: HamburgerButtonProps) => {
  return (
    <button
      onClick={toggle}
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-gray-600 focus:outline-none"
      aria-label="Toggle Menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-gray-600 rounded-full block transform origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-0.5 bg-gray-600 rounded-full block"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-gray-600 rounded-full block transform origin-center"
      />
    </button>
  );
};
