import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

interface ButtonProps {
  children: ReactNode;
  to: string;
  variant?: "primary" | "secondary" | "text";
  className?: string;
}

export const Button = ({
  children,
  to,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 shadow-sm border";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent",
    secondary:
      "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 active:bg-gray-100",
    text: "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 shadow-none border-transparent px-4",
  };

  return (
    <MotionLink
      to={to}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
};
