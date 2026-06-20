import React from "react";
import { motion, type Variants } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";

const technologies = [
  { name: "React 19", icon: FaReact, color: "text-info" },
  { name: "TypeScript", icon: SiTypescript, color: "text-primary" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-accent" },
  { name: "Vite", icon: SiVite, color: "text-warning" },
  { name: "TanStack Router", icon: FaReact, color: "text-error" },
];

interface AboutTechStackProps {
  variants: Variants;
}

export const AboutTechStack: React.FC<AboutTechStackProps> = ({ variants }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      className="card bg-base-100 border border-base-200 p-6"
    >
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        Technologien
      </h3>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex items-center gap-2 badge badge-lg bg-base-200 px-4 py-4 cursor-pointer"
            >
              <Icon className={`text-xl ${tech.color}`} />
              <span>{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
