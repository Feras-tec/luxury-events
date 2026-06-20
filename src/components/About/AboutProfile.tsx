import React from "react";
import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface AboutProfileProps {
  variants: Variants;
}

export const AboutProfile: React.FC<AboutProfileProps> = ({ variants }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      whileHover={{ y: -6 }}
      className="card bg-base-100 border border-base-200 shadow-sm"
    >
      <div className="card-body items-center text-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/profile.jpg" alt="Feras Profilbild" />
          </div>
        </div>

        <h2 className="card-title text-2xl">Feras</h2>
        <p className="text-primary text-xs font-bold uppercase">
          Full-Stack Entwickler
        </p>

        <p className="text-sm text-base-content/70 leading-relaxed">
          "Als Full-Stack-Entwickler kombiniere ich sauberen Code mit moderner
          Architektur. Dieses Projekt wurde als performante SPA mit React 19,
          TypeScript und Tailwind CSS realisiert – optimiert für ein nahtloses
          Nutzererlebnis."
        </p>

        <div className="divider" />

        <div className="w-full space-y-2">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://github.com/Feras-tec"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm w-full gap-2"
          >
            <FaGithub />
            GitHub Profil ansehen
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:your-email@example.com"
            className="btn btn-outline btn-primary btn-sm w-full gap-2"
          >
            <Mail size={16} />
            E-Mail schreiben
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
